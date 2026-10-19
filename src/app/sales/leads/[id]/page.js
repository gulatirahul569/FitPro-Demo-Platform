import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Phone, Mail, MapPin, AlertTriangle } from "lucide-react";
import { requireSales } from "@/lib/salesAuth";
import { getLeadByLeadId } from "@/lib/models/lead";
import { LEAD_STATUSES } from "@/lib/leadOptions";
import StatusBadge from "@/components/sales/StatusBadge";
import LeadActions from "@/components/sales/LeadActions";
import { fmtDate, fmtDateTime, fmtSlot } from "@/components/sales/format";
import CreateDemoBooking from "@/components/sales/CreateDemoBooking";

export const metadata = { title: "Lead" };

const card = "rounded-2xl border border-gray-200 bg-white p-6";

export default async function LeadDetailPage({ params }) {
  const user = await requireSales();
  if (!user) redirect("/login");

  const { id } = await params;
  const lead = await getLeadByLeadId(id);
  if (!lead) notFound();

  const notes = [...(lead.callNotes || [])].reverse();
  const history = [...(lead.history || [])].reverse();

  return (
    <div>
      <Link
        href="/sales/leads"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-black"
      >
        <ArrowLeft size={16} /> Back to leads
      </Link>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-black">{lead.name}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {lead.leadId} · received {fmtDateTime(lead.createdAt)}
          </p>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      {lead.isDuplicate && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-4 text-sm text-orange-800">
          <AlertTriangle size={18} className="mt-0.5 shrink-0" />
          <p>
            This phone or email has submitted before
            {lead.duplicateOfLeadId && (
              <>
                {" "}
                (first lead:{" "}
                <Link
                  href={`/sales/leads/${lead.duplicateOfLeadId}`}
                  className="font-semibold underline"
                >
                  {lead.duplicateOfLeadId}
                </Link>
                )
              </>
            )}
            . Check before calling, so the customer isn&apos;t contacted twice.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* LEFT: details */}
        <div className="space-y-6 lg:col-span-2">
          <div className={card}>
            <h2 className="mb-4 text-lg font-semibold text-black">Customer</h2>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:+91${lead.phone}`}
                className="flex items-center gap-3 text-gray-700 hover:text-black"
              >
                <Phone size={16} className="text-gray-400" /> {lead.phone}
              </a>
              <a
                href={`mailto:${lead.email}`}
                className="flex items-center gap-3 break-all text-gray-700 hover:text-black"
              >
                <Mail size={16} className="shrink-0 text-gray-400" />{" "}
                {lead.email}
              </a>
              <p className="flex items-start gap-3 text-gray-700">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gray-400" />
                <span>
                  {lead.address}
                  {lead.pinCode && (
                    <span className="text-gray-400"> (PIN {lead.pinCode})</span>
                  )}
                </span>
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5 text-sm">
              <div>
                <p className="text-xs text-gray-400">Fitness goal</p>
                <p className="mt-0.5 font-medium text-black">{lead.goal}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Source</p>
                <p className="mt-0.5 font-medium capitalize text-black">
                  {lead.source}
                  {lead.campaign && (
                    <span className="font-normal text-gray-500">
                      {" "}
                      · {lead.campaign}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {lead.notes && (
              <div className="mt-5 border-t border-gray-100 pt-5 text-sm">
                <p className="text-xs text-gray-400">Customer notes</p>
                <p className="mt-1 whitespace-pre-wrap text-gray-700">
                  {lead.notes}
                </p>
              </div>
            )}
          </div>

          <div className={card}>
            <h2 className="mb-4 text-lg font-semibold text-black">
              Preferred slots
            </h2>
            <ol className="space-y-2">
              {(lead.slots || []).map((slot) => (
                <li
                  key={slot.priority}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                    {slot.priority}
                  </span>
                  <span className="text-gray-700">{fmtSlot(slot)}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className={card}>
            <h2 className="mb-4 text-lg font-semibold text-black">
              Call notes
            </h2>
            {notes.length === 0 ? (
              <p className="text-sm text-gray-400">No notes yet.</p>
            ) : (
              <div className="space-y-4">
                {notes.map((note, i) => (
                  <div key={i} className="border-l-2 border-gray-200 pl-4">
                    <p className="whitespace-pre-wrap text-sm text-gray-800">
                      {note.text}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {note.byName} · {fmtDateTime(note.at)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={card}>
            <h2 className="mb-4 text-lg font-semibold text-black">History</h2>
            <div className="space-y-3">
              {history.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-gray-700">{h.status}</span>
                  <span className="text-right text-xs text-gray-400">
                    {h.by} · {fmtDateTime(h.at)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: actions */}
        <div className="lg:col-span-1 space-y-6">
          <CreateDemoBooking
            lead={{
              leadId: lead.leadId,
            }}
          />
          <LeadActions
            lead={{
              leadId: lead.leadId,
              status: lead.status,
              nextFollowUpAt: lead.nextFollowUpAt,
              assignedTo: lead.assignedTo,
              assignedToName: lead.assignedToName,
            }}
            statuses={LEAD_STATUSES}
            currentUserId={user.id}
            followUpLabel={fmtDate(lead.nextFollowUpAt)}
          />
        </div>
      </div>
    </div>
  );
}
