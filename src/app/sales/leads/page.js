import Link from "next/link";
import { redirect } from "next/navigation";
import { Search, CalendarClock, UserRound } from "lucide-react";
import { requireSales } from "@/lib/salesAuth";
import { listLeads } from "@/lib/models/lead";
import { getDb } from "@/lib/db";
import { LEAD_STATUSES } from "@/lib/leadOptions";
import StatusBadge from "@/components/sales/StatusBadge";
import { fmtDate, fmtSlot, isDue } from "@/components/sales/format";

export const metadata = { title: "Leads" };

const card = "rounded-2xl border border-gray-200 bg-white";

function getDemoMeta(status) {
  switch (status) {
    case "Confirmed":
      return {
        label: "Confirmed",
        className: "bg-emerald-50 text-emerald-700 border-emerald-200",
        dot: "bg-emerald-500",
      };

    case "Completed":
      return {
        label: "Completed",
        className: "bg-teal-50 text-teal-700 border-teal-200",
        dot: "bg-teal-500",
      };

    case "Declined by Trainer":
      return {
        label: "Declined",
        className: "bg-red-50 text-red-700 border-red-200",
        dot: "bg-red-500",
      };

    case "Rescheduled":
      return {
        label: "Reschedule requested",
        className: "bg-blue-50 text-blue-700 border-blue-200",
        dot: "bg-blue-500",
      };

    case "Cancelled":
    case "No Show":
      return {
        label: status,
        className: "bg-gray-50 text-gray-600 border-gray-200",
        dot: "bg-gray-400",
      };

    case "Pending Payment":
      return {
        label: "Pending payment",
        className: "bg-amber-50 text-amber-700 border-amber-200",
        dot: "bg-amber-500",
      };

    default:
      return {
        label: status || "Booked",
        className: "bg-yellow-50 text-yellow-700 border-yellow-200",
        dot: "bg-yellow-500",
      };
  }
}

export default async function SalesLeadsPage({ searchParams }) {
  const user = await requireSales();
  if (!user) redirect("/login");

  const params = await searchParams;
  const status = typeof params?.status === "string" ? params.status : "";
  const q = typeof params?.q === "string" ? params.q : "";

  const [leads, db] = await Promise.all([
    listLeads({ status, q }),
    getDb(),
  ]);

  const leadIds = leads.map((lead) => lead.leadId);

  const rawBookings = leadIds.length
    ? await db
        .collection("demoBookings")
        .find({ leadId: { $in: leadIds } })
        .sort({ createdAt: -1 })
        .toArray()
    : [];

  const bookings = JSON.parse(JSON.stringify(rawBookings));

  const latestBookingByLead = new Map();

  bookings.forEach((booking) => {
    if (!latestBookingByLead.has(booking.leadId)) {
      latestBookingByLead.set(booking.leadId, booking);
    }
  });

  const filters = [
    { value: "", label: "All" },
    { value: "due", label: "Follow-ups due" },
    ...LEAD_STATUSES.map((s) => ({ value: s, label: s })),
  ];

  const chipHref = (value) => {
    const sp = new URLSearchParams();
    if (value) sp.set("status", value);
    if (q) sp.set("q", q);

    const qs = sp.toString();
    return qs ? `/sales/leads?${qs}` : "/sales/leads";
  };

  return (
    <div className="max-w-7xl">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-black">
            Leads
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {leads.length} result{leads.length === 1 ? "" : "s"}
            {q ? ` for “${q}”` : ""}
          </p>
        </div>
      </div>

      {/* Search and filters */}
      <div className="mb-6 space-y-4">
        <form method="get" className="flex flex-col gap-3 sm:flex-row">
          {status && (
            <input type="hidden" name="status" value={status} />
          )}

          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              name="q"
              defaultValue={q}
              placeholder="Search name, phone, email or lead ID"
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-black placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/5"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Search
          </button>
        </form>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((f) => (
            <Link
              key={f.label}
              href={chipHref(f.value)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition ${
                status === f.value
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-black/30 hover:text-black"
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>
      </div>

      {leads.length === 0 ? (
        <div className={`${card} py-20 text-center`}>
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <Search size={20} className="text-gray-400" />
          </div>

          <p className="text-sm font-medium text-gray-700">
            No leads found
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Try a different search term or status filter.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className={`${card} hidden overflow-hidden md:block`}>
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-100 bg-gray-50/60 text-[11px] uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-6 py-3.5 font-semibold">Lead</th>
                  <th className="px-6 py-3.5 font-semibold">Customer</th>
                  <th className="px-6 py-3.5 font-semibold">Goal</th>
                  <th className="px-6 py-3.5 font-semibold">Preferred slot</th>
                  <th className="px-6 py-3.5 font-semibold">Lead status</th>
                  <th className="px-6 py-3.5 font-semibold">Demo</th>
                  <th className="px-6 py-3.5 font-semibold">Follow-up</th>
                  <th className="px-6 py-3.5 font-semibold">Owner</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => {
                  const booking = latestBookingByLead.get(lead.leadId);
                  const demo = booking ? getDemoMeta(booking.status) : null;

                  return (
                    <tr
                      key={lead.leadId}
                      className="group transition-colors hover:bg-gray-50/70"
                    >
                      <td className="px-6 py-4">
                        <Link
                          href={`/sales/leads/${lead.leadId}`}
                          className="font-semibold text-black group-hover:underline"
                        >
                          {lead.leadId}
                        </Link>

                        <p className="mt-0.5 text-xs text-gray-400">
                          {fmtDate(lead.createdAt)}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-black">
                            {lead.name}
                          </p>

                          {lead.isDuplicate && (
                            <span className="rounded-md bg-orange-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-orange-700">
                              Duplicate
                            </span>
                          )}
                        </div>

                        <p className="mt-0.5 text-xs text-gray-500">
                          {lead.phone}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {lead.goal}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                        {fmtSlot(lead.slots?.[0])}
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={lead.status} />
                      </td>

                      <td className="px-6 py-4">
                        {booking && demo ? (
                          <div className="min-w-[180px]">
                            <div
                              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${demo.className}`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${demo.dot}`}
                              />

                              {demo.label}
                            </div>

                            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500">
                              <UserRound size={12} />
                              {booking.trainerName}
                            </p>

                            {booking.status === "Rescheduled" &&
                              booking.proposedDate && (
                                <p className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-blue-600">
                                  <CalendarClock size={12} />
                                  {booking.proposedDate} ·{" "}
                                  {booking.proposedTime}
                                </p>
                              )}
                          </div>
                        ) : (
                          <span className="inline-flex items-center rounded-full border border-dashed border-gray-300 px-2.5 py-1 text-[11px] font-medium text-gray-400">
                            Not booked
                          </span>
                        )}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={
                            isDue(lead)
                              ? "font-semibold text-red-600"
                              : "text-gray-600"
                          }
                        >
                          {fmtDate(lead.nextFollowUpAt)}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {lead.assignedToName || (
                          <span className="text-gray-400">Unassigned</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="space-y-3 md:hidden">
            {leads.map((lead) => {
              const booking = latestBookingByLead.get(lead.leadId);
              const demo = booking ? getDemoMeta(booking.status) : null;

              return (
                <Link
                  key={lead.leadId}
                  href={`/sales/leads/${lead.leadId}`}
                  className={`${card} block p-5 transition hover:border-black/20 hover:shadow-sm`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate font-semibold text-black">
                          {lead.name}
                        </p>

                        {lead.isDuplicate && (
                          <span className="rounded-md bg-orange-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-orange-700">
                            Duplicate
                          </span>
                        )}
                      </div>

                      <p className="mt-0.5 text-xs text-gray-500">
                        {lead.phone}
                      </p>
                    </div>

                    <StatusBadge status={lead.status} />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                    <div>
                      <p className="text-gray-400">Preferred slot</p>

                      <p className="mt-0.5 font-medium text-gray-800">
                        {fmtSlot(lead.slots?.[0])}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">Follow-up</p>

                      <p
                        className={`mt-0.5 font-medium ${
                          isDue(lead) ? "text-red-600" : "text-gray-800"
                        }`}
                      >
                        {fmtDate(lead.nextFollowUpAt)}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">Goal</p>

                      <p className="mt-0.5 truncate font-medium text-gray-800">
                        {lead.goal}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">Owner</p>

                      <p className="mt-0.5 font-medium text-gray-800">
                        {lead.assignedToName || "Unassigned"}
                      </p>
                    </div>
                  </div>

                  {/* Demo booking */}
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    {booking && demo ? (
                      <>
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-xs font-semibold text-black">
                            {booking.trainerName}
                          </p>

                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${demo.className}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${demo.dot}`}
                            />

                            {demo.label}
                          </span>
                        </div>

                        {booking.status === "Rescheduled" &&
                          booking.proposedDate && (
                            <p className="mt-2 flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-[11px] font-medium text-blue-700">
                              <CalendarClock size={13} />
                              Proposed: {booking.proposedDate} ·{" "}
                              {booking.proposedTime}
                            </p>
                          )}
                      </>
                    ) : (
                      <p className="text-xs text-gray-400">
                        No demo booking yet
                      </p>
                    )}
                  </div>

                  <p className="mt-4 text-[11px] text-gray-400">
                    {lead.leadId} · {fmtDate(lead.createdAt)}
                  </p>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
} 