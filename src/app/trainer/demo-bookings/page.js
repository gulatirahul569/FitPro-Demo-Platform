import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getDb } from "@/lib/db";
import { Calendar, MapPin, Phone } from "lucide-react";

import DemoBookingActions from "@/components/trainers/DemoBookingActions";

export const metadata = { title: "Demo Bookings" };

export default async function TrainerDemoBookingsPage() {
  const session = await auth();

  if (
    !session?.user ||
    (session.user.role !== "trainer" && session.user.role !== "admin")
  ) {
    redirect("/login");
  }

  const db = await getDb();

  const rawBookings = await db
    .collection("demoBookings")
    .find({ trainerId: session.user.id })
    .sort({ date: 1, time: 1 })
    .limit(100)
    .toArray();

  // Convert MongoDB ObjectIds and Dates into plain JSON-safe objects
  const bookings = JSON.parse(JSON.stringify(rawBookings));

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-black">
        Demo Bookings
      </h1>

      <p className="mb-6 text-sm text-gray-500">
        Demo requests assigned to you by the FitPro sales team.
      </p>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <Calendar size={22} className="text-gray-400" />
          </div>

          <p className="mt-4 text-sm text-gray-400">
            No demo bookings yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.bookingId}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-black">
                    {booking.customerName}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {booking.bookingId} · Lead {booking.leadId}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    booking.status === "Confirmed"
                      ? "bg-green-50 text-green-700"
                      : booking.status === "Completed"
                      ? "bg-teal-50 text-teal-700"
                      : booking.status === "Declined by Trainer"
                      ? "bg-red-50 text-red-700"
                      : booking.status === "Cancelled" ||
                        booking.status === "No Show"
                      ? "bg-gray-100 text-gray-500"
                      : "bg-yellow-50 text-yellow-700"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-gray-600 sm:grid-cols-3">
                <p className="flex items-center gap-2">
                  <Calendar size={15} className="text-gray-400" />
                  {booking.date} · {booking.time}
                </p>

                <p className="flex items-start gap-2">
                  <MapPin
                    size={15}
                    className="mt-0.5 shrink-0 text-gray-400"
                  />
                  <span>{booking.address}</span>
                </p>

                <p className="flex items-center gap-2">
                  <Phone size={15} className="text-gray-400" />
                  {booking.customerPhone}
                </p>
              </div>

              {booking.goal && (
                <p className="mt-3 text-sm text-gray-600">
                  Goal:{" "}
                  <span className="font-medium text-black">
                    {booking.goal}
                  </span>
                </p>
              )}

              {booking.notes && (
                <p className="mt-3 rounded-xl bg-gray-50 p-3 text-sm text-gray-600">
                  {booking.notes}
                </p>
              )}

              {/* Trainer accept / decline actions */}
              <DemoBookingActions booking={booking} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}