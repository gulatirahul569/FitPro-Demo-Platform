import Link from "next/link";
import { redirect } from "next/navigation";
import {
  AlertTriangle,
  Calendar,
  CalendarClock,
  Clock,
  MapPin,
  User,
} from "lucide-react";
import SalesRescheduleActions from "@/components/sales/SalesRescheduleActions";
import { requireSales } from "@/lib/salesAuth";
import {
  listDemoBookings,
  DEMO_BOOKING_STATUSES,
} from "@/lib/models/demoBooking";

export const metadata = { title: "Demo Bookings" };
export const dynamic = "force-dynamic";

function getStatusStyle(status) {
  switch (status) {
    case "Confirmed":
      return "bg-green-100 text-green-700";
    case "Completed":
      return "bg-teal-100 text-teal-700";
    case "Declined by Trainer":
      return "bg-red-100 text-red-700";
    case "Rescheduled":
      return "bg-blue-100 text-blue-700";
    case "Cancelled":
    case "No Show":
      return "bg-gray-100 text-gray-600";
    case "Pending Payment":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-yellow-100 text-yellow-700";
  }
}

function getStatusLabel(status) {
  return status === "Rescheduled"
    ? "Reschedule requested"
    : status;
}

export default async function DemoBookingsPage({ searchParams }) {
  const user = await requireSales();

  if (!user) redirect("/login");

  const params = await searchParams;

  const dateParam =
    typeof params?.date === "string" ? params.date : "";

  const status =
    typeof params?.status === "string" ? params.status : "";

  const isTodayFilter = dateParam === "today";

  const date = isTodayFilter
    ? new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
      })
    : dateParam;

  const bookings = await listDemoBookings({ status, date });

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-black">
        Demo Bookings
      </h1>

      <p className="mb-6 text-gray-500">
        {bookings.length} booking
        {bookings.length === 1 ? "" : "s"}
      </p>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/sales/demo-bookings"
          className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
            !status && !date
              ? "border-black bg-black text-white"
              : "border-gray-200 bg-white text-gray-600 hover:border-black/30"
          }`}
        >
          All
        </Link>

        <Link
          href="/sales/demo-bookings?date=today"
          className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
            isTodayFilter && !status
              ? "border-black bg-black text-white"
              : "border-gray-200 bg-white text-gray-600 hover:border-black/30"
          }`}
        >
          Today
        </Link>

        {DEMO_BOOKING_STATUSES.map((s) => (
          <Link
            key={s}
            href={`/sales/demo-bookings?status=${encodeURIComponent(s)}`}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
              status === s
                ? "border-black bg-black text-white"
                : "border-gray-200 bg-white text-gray-600 hover:border-black/30"
            }`}
          >
            {getStatusLabel(s)}
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center text-sm text-gray-400">
          No demo bookings found.
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => {
            const hasProposal = Boolean(
              booking.proposedDate && booking.proposedTime
            );

            return (
              <div
                key={booking.bookingId}
                className="rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-lg"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-black">
                      {booking.customerName}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {booking.bookingId} ·{" "}
                      <Link
                        href={`/sales/leads/${booking.leadId}`}
                        className="font-medium text-gray-600 underline-offset-2 hover:text-black hover:underline"
                      >
                        Lead {booking.leadId}
                      </Link>
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                      booking.status
                    )}`}
                  >
                    {getStatusLabel(booking.status)}
                  </span>
                </div>

                {/* Trainer declined */}
                {booking.status === "Declined by Trainer" && (
                  <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                    <AlertTriangle
                      size={17}
                      className="mt-0.5 shrink-0"
                      aria-hidden="true"
                    />

                    <p>
                      The trainer declined this demo. Create a new
                      booking with another available trainer.
                    </p>
                  </div>
                )}

                {/* Trainer proposed a reschedule */}
                {booking.status === "Rescheduled" &&
                  (hasProposal ? (
                    <SalesRescheduleActions
                      key={`${booking.bookingId}-${booking.proposedDate}-${booking.proposedTime}`}
                      bookingId={booking.bookingId}
                      proposedDate={booking.proposedDate}
                      proposedTime={booking.proposedTime}
                    />
                  ) : (
                    <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                      <AlertTriangle
                        size={17}
                        className="mt-0.5 shrink-0"
                        aria-hidden="true"
                      />

                      <p>
                        This booking is marked as rescheduled, but no
                        proposed time was saved. A new trainer
                        proposal is needed before approval.
                      </p>
                    </div>
                  ))}

                <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-gray-600 sm:grid-cols-2 lg:grid-cols-4">
                  <p className="flex items-center gap-2">
                    <User
                      size={15}
                      className="shrink-0 text-gray-400"
                      aria-hidden="true"
                    />

                    <span>
                      Trainer:{" "}
                      <span className="font-medium text-black">
                        {booking.trainerName}
                      </span>
                    </span>
                  </p>

                  <p className="flex items-center gap-2">
                    <Calendar
                      size={15}
                      className="shrink-0 text-gray-400"
                      aria-hidden="true"
                    />

                    <span>
                      Date:{" "}
                      <span className="font-medium text-black">
                        {booking.date}
                      </span>
                    </span>
                  </p>

                  <p className="flex items-center gap-2">
                    <Clock
                      size={15}
                      className="shrink-0 text-gray-400"
                      aria-hidden="true"
                    />

                    <span>
                      Time:{" "}
                      <span className="font-medium text-black">
                        {booking.time}
                      </span>
                    </span>
                  </p>

                  <p>
                    Payment:{" "}
                    <span className="font-medium text-black">
                      {booking.paymentStatus}
                    </span>
                  </p>
                </div>

                {/* Proposed slot, always visible when present */}
                {hasProposal && (
                  <p className="mt-3 flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-sm text-blue-800">
                    <CalendarClock
                      size={15}
                      className="shrink-0"
                      aria-hidden="true"
                    />

                    <span>
                      Proposed:{" "}
                      <span className="font-semibold">
                        {booking.proposedDate} at{" "}
                        {booking.proposedTime} IST
                      </span>
                    </span>
                  </p>
                )}

                {booking.address && (
                  <p className="mt-3 flex items-start gap-2 text-sm text-gray-600">
                    <MapPin
                      size={15}
                      className="mt-0.5 shrink-0 text-gray-400"
                      aria-hidden="true"
                    />

                    <span>{booking.address}</span>
                  </p>
                )}

                {booking.notes && (
                  <p className="mt-3 whitespace-pre-wrap rounded-xl bg-gray-50 p-3 text-sm leading-6 text-gray-600">
                    {booking.notes}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}