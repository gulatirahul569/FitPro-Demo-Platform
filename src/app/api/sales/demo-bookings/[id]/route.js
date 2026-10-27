import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDb } from "@/lib/db";
import { updateDemoBookingStatus } from "@/lib/models/demoBooking";

function errorResponse(error, status = 400) {
  return NextResponse.json({ error }, { status });
}

function parseProposedSlot(date, time) {
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

  // Booking times are interpreted in Asia/Kolkata.
  const slot = new Date(`${date}T${time}:00+05:30`);

  return Number.isNaN(slot.getTime()) ? null : slot;
}

export async function PATCH(request, { params }) {
  const session = await auth();
  const user = session?.user;

  if (!user?.id) {
    return errorResponse("Unauthorized.", 401);
  }

  if (!["sales", "admin"].includes(user.role)) {
    return errorResponse("You cannot manage demo bookings.", 403);
  }

  const { id } = await params;

  let body;

  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid request.");
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return errorResponse("Invalid request.");
  }

  try {
    if (body.action === "approve-reschedule") {
      if (body.customerConfirmed !== true) {
        return errorResponse(
          "Confirm that the customer agreed to the proposed time."
        );
      }

      const db = await getDb();
      const col = db.collection("demoBookings");

      const booking = await col.findOne({ bookingId: id });

      if (!booking) {
        return errorResponse("Booking not found.", 404);
      }

      if (booking.status !== "Rescheduled") {
        return errorResponse(
          "This booking no longer has a pending reschedule request.",
          409
        );
      }

      if (
        typeof booking.trainerId !== "string" ||
        !booking.trainerId.trim()
      ) {
        return errorResponse(
          "This booking has no valid trainer assignment.",
          409
        );
      }

      // Reject approval from a stale browser view.
      if (
        body.proposedDate !== booking.proposedDate ||
        body.proposedTime !== booking.proposedTime
      ) {
        return errorResponse(
          "The proposal changed. Refresh and review the new time.",
          409
        );
      }

      const proposedSlot = parseProposedSlot(
        booking.proposedDate,
        booking.proposedTime
      );

      if (!proposedSlot) {
        return errorResponse(
          "A valid proposed date and time are missing. Ask the trainer for a new proposal."
        );
      }

      if (proposedSlot.getTime() <= Date.now()) {
        return errorResponse(
          "The proposed time has passed. Ask the trainer for a new proposal."
        );
      }

      const clash = await col.findOne({
        bookingId: { $ne: id },
        trainerId: booking.trainerId,
        date: booking.proposedDate,
        time: booking.proposedTime,
        status: { $in: ["Confirmed", "Completed"] },
      });

      if (clash) {
        return errorResponse(
          "The trainer already has a confirmed demo at this time.",
          409
        );
      }

      const now = new Date();

      const updatedBooking = await col.findOneAndUpdate(
        {
          bookingId: id,
          trainerId: booking.trainerId,
          status: "Rescheduled",
          proposedDate: booking.proposedDate,
          proposedTime: booking.proposedTime,
          updatedAt: booking.updatedAt,
        },
        {
          $set: {
            date: booking.proposedDate,
            time: booking.proposedTime,
            status: "Confirmed",
            rescheduleApprovedAt: now,
            rescheduleApprovedBy: user.id,
            rescheduleApprovedByName: user.name || user.id,
            updatedAt: now,
          },
          $unset: {
            proposedDate: "",
            proposedTime: "",
          },
          $push: {
            history: {
              action: "approve-reschedule",
              status: "Confirmed",
              previousDate: booking.date,
              previousTime: booking.time,
              date: booking.proposedDate,
              time: booking.proposedTime,
              customerConfirmed: true,
              at: now,
              by: user.name || user.id,
            },
          },
        },
        { returnDocument: "after" }
      );

      if (!updatedBooking) {
        return errorResponse(
          "The booking changed during approval. Refresh and try again.",
          409
        );
      }

      // This is a separate write, not a multi-document transaction.
      let warning = "";

      if (booking.leadId) {
        try {
          const leadResult = await db.collection("leads").updateOne(
            { leadId: booking.leadId },
            {
              $set: {
                status: "Demo Confirmed",
                updatedAt: now,
              },
              $push: {
                history: {
                  status: "Demo Confirmed",
                  action: "approve-demo-reschedule",
                  bookingId: id,
                  at: now,
                  by: user.name || user.id,
                },
              },
            }
          );

          if (!leadResult.matchedCount) {
            warning =
              "Booking confirmed, but the related lead was not found.";
          }
        } catch (error) {
          console.error("Reschedule lead sync failed:", {
            bookingId: id,
            error,
          });

          warning =
            "Booking confirmed, but the lead status could not be synced. Please review the lead.";
        }
      }

      return NextResponse.json({
        booking: JSON.parse(JSON.stringify(updatedBooking)),
        warning,
      });
    }

    // Preserve the existing status-update action.
    if (body.action === "status") {
      // Avoid bypassing approval by changing only the status.
      if (
        body.status === "Confirmed" ||
        body.status === "Rescheduled"
      ) {
        return errorResponse(
          "Use the dedicated confirmation or reschedule workflow."
        );
      }

      const booking = await updateDemoBookingStatus(
        id,
        body.status,
        user.id,
        user.name
      );

      if (!booking) {
        return errorResponse("Booking not found.", 404);
      }

      return NextResponse.json({ booking });
    }

    return errorResponse("Unknown action.");
  } catch (error) {
    if (error.message === "Invalid status") {
      return errorResponse("Invalid status.");
    }

    console.error("Update demo booking error:", error);

    return errorResponse("Something went wrong.", 500);
  }
}