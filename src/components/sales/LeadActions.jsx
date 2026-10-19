"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const box = "rounded-2xl border border-gray-200 bg-white p-6";
const input =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-black focus:outline-none";
const btn =
  "rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-60";

export default function LeadActions({ lead, statuses, currentUserId, followUpLabel }) {
  const router = useRouter();
  const [status, setStatus] = useState(lead.status);
  const [date, setDate] = useState(
    lead.nextFollowUpAt
      ? new Date(lead.nextFollowUpAt).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })
      : ""
  );
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const mine = lead.assignedTo && lead.assignedTo === currentUserId;

  async function send(body, done) {
    setBusy(true);
    setMessage("");
    try {
      const res = await fetch(`/api/sales/leads/${lead.leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Something went wrong.");
      } else {
        done?.();
        router.refresh();
      }
    } catch {
      setMessage("Network error. Please try again.");
    }
    setBusy(false);
  }

  return (
    <div className="space-y-6">
      {/* Owner */}
      <div className={box}>
        <h2 className="mb-3 text-lg font-semibold text-black">Owner</h2>
        <p className="mb-4 text-sm text-gray-600">
          {lead.assignedToName ? `Assigned to ${lead.assignedToName}` : "Not assigned yet"}
        </p>
        <button
          type="button"
          disabled={busy}
          onClick={() => send({ action: "assign", assign: !mine })}
          className={btn}
        >
          {mine ? "Release lead" : "Assign to me"}
        </button>
      </div>

      {/* Status */}
      <div className={box}>
        <h2 className="mb-3 text-lg font-semibold text-black">Status</h2>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={input}>
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button
          type="button"
          disabled={busy || status === lead.status}
          onClick={() => send({ action: "status", status })}
          className={`${btn} mt-3 w-full`}
        >
          Update status
        </button>
        <p className="mt-3 text-xs leading-5 text-gray-400">
          Move to Demo Confirmed only when the customer, trainer and payment are all in place.
        </p>
      </div>

      {/* Follow-up */}
      <div className={box}>
        <h2 className="mb-1 text-lg font-semibold text-black">Next follow-up</h2>
        <p className="mb-3 text-sm text-gray-500">Currently: {followUpLabel}</p>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={input} />
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            disabled={busy || !date}
            onClick={() => send({ action: "followUp", date })}
            className={`${btn} flex-1`}
          >
            Save
          </button>
          <button
            type="button"
            disabled={busy || !lead.nextFollowUpAt}
            onClick={() => send({ action: "followUp", date: null }, () => setDate(""))}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-60"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Note */}
      <div className={box}>
        <h2 className="mb-3 text-lg font-semibold text-black">Add call note</h2>
        <textarea
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What did the customer say?"
          className={input}
        />
        <button
          type="button"
          disabled={busy || !note.trim()}
          onClick={() => send({ action: "note", text: note }, () => setNote(""))}
          className={`${btn} mt-3 w-full`}
        >
          Save note
        </button>
      </div>

      {message && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {message}
        </p>
      )}
    </div>
  );
}