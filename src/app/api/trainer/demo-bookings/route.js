import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDb } from "@/lib/db";

export async function GET() {
  const session = await auth();
  const user = session?.user;

  if (!user?.id || !["trainer", "admin"].includes(user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await getDb();

  const bookings = await db
    .collection("demoBookings")
    .find({ trainerId: user.id })
    .sort({ date: 1, time: 1 })
    .limit(100)
    .toArray();

  return NextResponse.json({
    bookings: JSON.parse(JSON.stringify(bookings)),
  });
}