import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import {
  createDemoBooking,
  listDemoBookings,
  DEMO_BOOKING_STATUSES,
} from "@/lib/models/demoBooking";
import { getTrainerProfile } from "@/lib/models/trainerProfile";

export async function GET(request) {
  const user = await requireSalesUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  const bookings = await listDemoBookings({
    status: searchParams.get("status") || "",
    date: searchParams.get("date") || "",
    q: searchParams.get("q") || "",
  });

  return NextResponse.json({ bookings });
}

export async function POST(request) {
  const user = await requireSalesUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }

  const required = [
    "leadId",
    "trainerId",
    "date",
    "time",
  ];

  const missing = required.filter((key) => !body?.[key]);

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  try {
    const db = await getDb();

    const lead = await db.collection("leads").findOne({
      leadId: body.leadId,
    });

    if (!lead) {
      return NextResponse.json(
        { error: "Lead not found." },
        { status: 404 }
      );
    }

    const trainerProfile = await getTrainerProfile(body.trainerId);

    if (!trainerProfile) {
      return NextResponse.json(
        { error: "Trainer not found." },
        { status: 404 }
      );
    }

    const result = await createDemoBooking({
      leadId: lead.leadId,

      customerName: lead.name,
      customerPhone: lead.phone,
      customerEmail: lead.email,
      address: lead.address,
      pinCode: lead.pinCode,
      goal: lead.goal,

      trainerId: body.trainerId,
      trainerName: trainerProfile.name,

      date: body.date,
      time: body.time,

      status: body.status || "Waiting for Customer",
      paymentStatus: body.paymentStatus || "Not Required",
      amount: body.amount,
      notes: body.notes,

      createdBy: user.id,
      createdByName: user.name,
    });

    return NextResponse.json(result);
  } catch (error) {
    if (error.message === "TRAINER_ALREADY_BOOKED") {
      return NextResponse.json(
        {
          error:
            "This trainer already has a confirmed demo at the selected time.",
        },
        { status: 409 }
      );
    }

    console.error("Create demo booking error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

async function requireSalesUser() {
  const session = await auth();
  const user = session?.user;

  if (!user?.id) return null;

  if (!["sales", "admin"].includes(user.role)) return null;

  return user;
}