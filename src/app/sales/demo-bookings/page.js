import Link from "next/link";
import { redirect } from "next/navigation";
import { requireSales } from "@/lib/salesAuth";
import { listDemoBookings } from "@/lib/models/demoBooking";
import { DEMO_BOOKING_STATUSES } from "@/lib/models/demoBooking";

export const metadata = { title: "Demo Bookings" };

export default async function DemoBookingsPage({ searchParams }) {
  const user = await requireSales();
  if (!user) redirect("/login");

  const params = await searchParams;

  let date = typeof params?.date === "string" ? params.date : "";
  const status = typeof params?.status === "string" ? params.status : "";

  if (date === "today") {
    date = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    });
  }

  const bookings = await listDemoBookings({ status, date });

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-black">
        Demo Bookings
      </h1>

      <p className="mb-6 text-gray-500">
        {bookings.length} booking{bookings.length === 1 ? "" : "s"}
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/sales/demo-bookings"
          className={`rounded-full border px-4 py-1.5 text-xs font-semibold ${
            !status && !date
              ? "border-black bg-black text-white"
              : "border-gray-200 bg-white text-gray-600"
          }`}
        >
          All
        </Link>

        <Link
          href="/sales/demo-bookings?date=today"
          className={`rounded-full border px-4 py-1.5 text-xs font-semibold ${
            date && !status
              ? "border-black bg-black text-white"
              : "border-gray-200 bg-white text-gray-600"
          }`}
        >
          Today
        </Link>

        {DEMO_BOOKING_STATUSES.map((s) => (
          <Link
            key={s}
            href={`/sales/demo-bookings?status=${encodeURIComponent(s)}`}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold ${
              status === s
                ? "border-black bg-black text-white"
                : "border-gray-200 bg-white text-gray-600"
            }`}
          >
            {s}
          </Link>
        ))}
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center text-sm text-gray-400">
          No demo bookings found.
        </div>
      ) : (
        <div className="space-y-3">
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

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {booking.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-600 sm:grid-cols-4">
                <p>
                  Trainer:{" "}
                  <span className="font-medium text-black">
                    {booking.trainerName}
                  </span>
                </p>

                <p>
                  Date:{" "}
                  <span className="font-medium text-black">
                    {booking.date}
                  </span>
                </p>

                <p>
                  Time:{" "}
                  <span className="font-medium text-black">
                    {booking.time}
                  </span>
                </p>

                <p>
                  Payment:{" "}
                  <span className="font-medium text-black">
                    {booking.paymentStatus}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}