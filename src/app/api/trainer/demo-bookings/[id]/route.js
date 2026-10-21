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
  ],
},
};


export async function PATCH(request, { params }) {
  const session = await auth();
  const user = session?.user;


  if (!user?.id || !["trainer", "admin"].includes(user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }


  const { id } = await params;


  let body;


  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }


  const action = ALLOWED_ACTIONS[body?.action];


  if (!action) {
    return NextResponse.json(
      { error: "Unknown action." },
      { status: 400 }
    );
  }


  const db = await getDb();


  const booking = await db.collection("demoBookings").findOne({
    bookingId: id,
  });


  if (!booking) {
    return NextResponse.json(
      { error: "Booking not found." },
      { status: 404 }
    );
  }


  // A trainer can act only on their own booking.
  if (user.role !== "admin" && booking.trainerId !== user.id) {
    return NextResponse.json(
      { error: "You cannot update this booking." },
      { status: 403 }
    );
  }


  if (!action.allowedFrom.includes(booking.status)) {
    return NextResponse.json(
      {
        error: `This booking cannot be ${body.action}ed in its current status.`,
      },
      { status: 400 }
    );
  }


  const now = new Date();

  const updateData = {
  status: action.bookingStatus,
  trainerResponseAt: now,
  updatedAt: now,
};

// For reschedule, require and store the proposed slot.
if (body.action === "reschedule") {
  const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
  const TIME_RE = /^\d{2}:\d{2}$/;

  if (!DATE_RE.test(body.date || "") || !TIME_RE.test(body.time || "")) {
    return NextResponse.json(
      { error: "Please select a valid new date and time." },
      { status: 400 }
    );
  }

  // Prevent the trainer from having another confirmed demo at the new slot.
  const clash = await db.collection("demoBookings").findOne({
    bookingId: { $ne: id },
    trainerId: booking.trainerId,
    date: body.date,
    time: body.time,
    status: { $in: ["Confirmed", "Completed"] },
  });

  if (clash) {
    return NextResponse.json(
      {
        error:
          "You already have a confirmed demo at the selected time.",
      },
      { status: 409 }
    );
  }

  updateData.proposedDate = body.date;
  updateData.proposedTime = body.time;
}


  const result = await db
    .collection("demoBookings")
    .findOneAndUpdate(
      { bookingId: id },
      {
        $set: {
          status: action.bookingStatus,
          trainerResponseAt: now,
          updatedAt: now,
        },
        $push: {
          history: {
            status: action.bookingStatus,
            at: now,
            by: user.name || user.id,
          },
        },
      },
      { returnDocument: "after" }
    );


  // Keep the related lead status in sync.
  if (booking.leadId) {
    await db.collection("leads").findOneAndUpdate(
      { leadId: booking.leadId },
      {
        $set: {
          status: action.leadStatus,
          updatedAt: now,
        },
        $push: {
          history: {
            status: action.leadStatus,
            at: now,
            by: user.name || user.id,
          },
        },
      }
    );
  }


  return NextResponse.json({
    booking: JSON.parse(JSON.stringify(result)),
  });
}