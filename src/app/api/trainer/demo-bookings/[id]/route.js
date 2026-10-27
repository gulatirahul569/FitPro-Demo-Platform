import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDb } from "@/lib/db";

const ALLOWED_ACTIONS = {
  accept: {
    bookingStatus: "Confirmed",
    leadStatus: "Demo Confirmed",
    allowedFrom: [
      "Waiting for Trainer",
      "Waiting for Customer",
      "Pending Payment",
    ],
  },

  decline: {
    bookingStatus: "Declined by Trainer",
    leadStatus: "Availability Check",
    allowedFrom: [
      "Waiting for Trainer",
      "Waiting for Customer",
      "Pending Payment",
    ],
  },

  reschedule: {
    bookingStatus: "Rescheduled",
    leadStatus: "Availability Check",
    allowedFrom: [
      "Waiting for Trainer",
      "Waiting for Customer",
      "Pending Payment",
      "Confirmed",
      "Rescheduled",
    ],
  },
};

function errorResponse(error, status = 400) {
  return NextResponse.json({ error }, { status });
}

function parseSlot(date, time) {
  if (
    typeof date !== "string" ||
    typeof time !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)
  ) {
    return null;
  }

  const calendarDate = new Date(`${date}T00:00:00.000Z`);

  if (
    Number.isNaN(calendarDate.getTime()) ||
    calendarDate.toISOString().slice(0, 10) !== date
  ) {
    return null;
  }

  // Booking times use Asia/Kolkata (IST).
  const slot = new Date(`${date}T${time}:00+05:30`);

  return Number.isNaN(slot.getTime()) ? null : slot;
}

export async function PATCH(request, { params }) {
  const session = await auth();
  const user = session?.user;

  if (!user?.id) {
    return errorResponse("Unauthorized.", 401);
  }

  if (!["trainer", "admin"].includes(user.role)) {
    return errorResponse("You cannot update demo bookings.", 403);
  }

  const { id } = await params;

  let body;

  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid request.");
  }

  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body) ||
    typeof body.action !== "string" ||
    !Object.prototype.hasOwnProperty.call(
      ALLOWED_ACTIONS,
      body.action
    )
  ) {
    return errorResponse("Unknown action.");
  }

  const action = ALLOWED_ACTIONS[body.action];

  try {
    const db = await getDb();
    const bookings = db.collection("demoBookings");

    const booking = await bookings.findOne({
      bookingId: id,
    });

    if (!booking) {
      return errorResponse("Booking not found.", 404);
    }

    if (
      user.role !== "admin" &&
      booking.trainerId !== user.id
    ) {
      return errorResponse(
        "You cannot update this booking.",
        403
      );
    }

    if (!action.allowedFrom.includes(booking.status)) {
      return errorResponse(
        "This action is not allowed in the booking's current status.",
        409
      );
    }

    if (
      typeof booking.trainerId !== "string" ||
      !booking.trainerId.trim()
    ) {
      return errorResponse(
        "The booking has no valid trainer assignment.",
        409
      );
    }

    const now = new Date();

    const updateData = {
      status: action.bookingStatus,
      trainerResponseAt: now,
      updatedAt: now,
    };

    if (body.action === "reschedule") {
      const proposedSlot = parseSlot(body.date, body.time);

      if (!proposedSlot) {
        return errorResponse(
          "Please select a valid proposed date and time."
        );
      }

      if (proposedSlot.getTime() <= now.getTime()) {
        return errorResponse(
          "Please select a future date and time."
        );
      }

      const clash = await bookings.findOne({
        bookingId: { $ne: id },
        trainerId: booking.trainerId,
        date: body.date,
        time: body.time,
        status: { $in: ["Confirmed", "Completed"] },
      });

      if (clash) {
        return errorResponse(
          "You already have a confirmed demo at the proposed time.",
          409
        );
      }

      // Save the proposal without changing the original slot.
      updateData.proposedDate = body.date;
      updateData.proposedTime = body.time;
    }

    if (body.action === "accept") {
      const clash = await bookings.findOne({
        bookingId: { $ne: id },
        trainerId: booking.trainerId,
        date: booking.date,
        time: booking.time,
        status: { $in: ["Confirmed", "Completed"] },
      });

      if (clash) {
        return errorResponse(
          "You already have a confirmed demo at this time.",
          409
        );
      }
    }

    const historyEntry = {
      status: action.bookingStatus,
      action: body.action,
      at: now,
      by: user.name || user.id,
    };

    if (body.action === "reschedule") {
      historyEntry.proposedDate = body.date;
      historyEntry.proposedTime = body.time;
    }

    const update = {
      $set: updateData,
      $push: {
        history: historyEntry,
      },
    };

    // Remove any stale proposal when accepting or declining.
    if (body.action !== "reschedule") {
      update.$unset = {
        proposedDate: "",
        proposedTime: "",
      };
    }

    const result = await bookings.findOneAndUpdate(
      {
        bookingId: id,
        trainerId: booking.trainerId,
        status: booking.status,
        updatedAt: booking.updatedAt,
      },
      update,
      { returnDocument: "after" }
    );

    if (!result) {
      return errorResponse(
        "The booking changed. Refresh and try again.",
        409
      );
    }

    // Booking and lead updates are separate writes.
    let warning = "";

    if (booking.leadId) {
      try {
        const leadResult = await db.collection("leads").updateOne(
          { leadId: booking.leadId },
          {
            $set: {
              status: action.leadStatus,
              updatedAt: now,
            },
            $push: {
              history: {
                status: action.leadStatus,
                bookingId: id,
                action: body.action,
                at: now,
                by: user.name || user.id,
              },
            },
          }
        );

        if (!leadResult.matchedCount) {
          warning =
            "Booking updated, but the related lead was not found.";
        }
      } catch (error) {
        console.error("Trainer booking lead sync failed:", {
          bookingId: id,
          error,
        });

        warning =
          "Booking updated, but the lead status could not be synced. Please inform Sales.";
      }
    }

    return NextResponse.json({
      booking: JSON.parse(JSON.stringify(result)),
      warning,
    });
  } catch (error) {
    console.error("Trainer demo booking update failed:", error);

    return errorResponse(
      "Could not update the booking. Please try again.",
      500
    );
  }
}