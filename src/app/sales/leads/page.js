import Link from "next/link";
import { redirect } from "next/navigation";
import { Search } from "lucide-react";
import { requireSales } from "@/lib/salesAuth";
import { listLeads } from "@/lib/models/lead";
import { LEAD_STATUSES } from "@/lib/leadOptions";
import StatusBadge from "@/components/sales/StatusBadge";
import { fmtDate, fmtSlot, isDue } from "@/components/sales/format";

export const metadata = { title: "Leads" };

export default async function SalesLeadsPage({ searchParams }) {
  const user = await requireSales();
  if (!user) redirect("/login");

  const params = await searchParams;
  const status = typeof params?.status === "string" ? params.status : "";
  const q = typeof params?.q === "string" ? params.q : "";

  const leads = await listLeads({ status, q });

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
    <div>
      <h1 className="mb-1 text-2xl font-bold text-black">Leads</h1>
      <p className="mb-6 text-gray-500">
        {leads.length} result{leads.length === 1 ? "" : "s"}
      </p>

      {/* Search */}
      <form method="get" className="mb-4 flex gap-2">
        {status && <input type="hidden" name="status" value={status} />}
        <div className="relative flex-1 md:max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Search name, phone, email or lead ID"
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm focus:border-black focus:outline-none"
          />
        </div>
        <button className="rounded-lg bg-black px-5 text-sm font-semibold text-white hover:bg-gray-800">
          Search
        </button>
      </form>

      {/* Status filters */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <Link
            key={f.label}
            href={chipHref(f.value)}
            className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
              status === f.value
                ? "border-black bg-black text-white"
                : "border-gray-200 bg-white text-gray-600 hover:border-black/30"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {leads.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center text-sm text-gray-400">
          No leads found.
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-2xl border border-gray-200 bg-white md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                <tr>
                  <th className="px-5 py-3 font-medium">Lead</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">PIN</th>
                  <th className="px-5 py-3 font-medium">Goal</th>
                  <th className="px-5 py-3 font-medium">1st slot</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Follow-up</th>
                  <th className="px-5 py-3 font-medium">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => (
                  <tr key={lead.leadId} className="transition-colors hover:bg-gray-50">
                    <td className="px-5 py-3.5">
                      <Link href={`/sales/leads/${lead.leadId}`} className="font-semibold text-black hover:underline">
                        {lead.leadId}
                      </Link>
                      <p className="text-xs text-gray-400">{fmtDate(lead.createdAt)}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-black">
                        {lead.name}
                        {lead.isDuplicate && (
                          <span className="ml-2 text-[10px] font-semibold text-orange-600">DUPLICATE</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">{lead.phone}</p>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">{lead.pinCode || "—"}</td>
                    <td className="px-5 py-3.5 text-gray-600">{lead.goal}</td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-gray-600">{fmtSlot(lead.slots?.[0])}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={lead.status} /></td>
                    <td className={`whitespace-nowrap px-5 py-3.5 ${isDue(lead) ? "font-semibold text-red-600" : "text-gray-600"}`}>
                      {fmtDate(lead.nextFollowUpAt)}
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">{lead.assignedToName || "Unassigned"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {leads.map((lead) => (
              <Link
                key={lead.leadId}
                href={`/sales/leads/${lead.leadId}`}
                className="block rounded-2xl border border-gray-200 bg-white p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-black">{lead.name}</p>
                    <p className="text-xs text-gray-500">{lead.phone}</p>
                  </div>
                  <StatusBadge status={lead.status} />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <p>PIN: <span className="text-gray-800">{lead.pinCode || "—"}</span></p>
                  <p className="truncate">Goal: <span className="text-gray-800">{lead.goal}</span></p>
                  <p>1st slot: <span className="text-gray-800">{fmtSlot(lead.slots?.[0])}</span></p>
                  <p className={isDue(lead) ? "font-semibold text-red-600" : ""}>
                    Follow-up: <span className={isDue(lead) ? "" : "text-gray-800"}>{fmtDate(lead.nextFollowUpAt)}</span>
                  </p>
                </div>

                <p className="mt-3 text-[11px] text-gray-400">
                  {lead.leadId} · {lead.assignedToName || "Unassigned"}
                  {lead.isDuplicate && <span className="ml-2 font-semibold text-orange-600">DUPLICATE</span>}
                </p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}