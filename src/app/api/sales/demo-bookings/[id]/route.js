import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  updateDemoBookingStatus,
  DEMO_BOOKING_STATUSES,
} from "@/lib/models/demoBooking";

export async function PATCH(request, { params }) {
  const session = await auth();
  const user = session?.user;

  if (!user?.id || !["sales", "admin"].includes(user.role)) {
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

  try {
    if (body.action !== "status") {
      return NextResponse.json(
        { error: "Unknown action." },
        { status: 400 }
      );
    }

    const booking = await updateDemoBookingStatus(
      id,
      body.status,
      user.id,
      user.name
    );

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ booking });
  } catch (error) {
    if (error.message === "Invalid status") {
      return NextResponse.json(
        { error: "Invalid status." },
        { status: 400 }
      );
    }

    console.error("Update demo booking error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}