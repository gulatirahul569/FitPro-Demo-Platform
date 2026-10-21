"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Clock, X } from "lucide-react";

export default function DemoBookingActions({ booking }) {
  const router = useRouter();

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [showReschedule, setShowReschedule] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const canRespond = [
    "Waiting for Trainer",
    "Waiting for Customer",
    "Pending Payment",
    "Confirmed",
  ].includes(booking.status);

  async function respond(action, extra = {}) {
    setBusy(true);
    setError("");

    try {
      const res = await fetch(
        `/api/trainer/demo-bookings/${booking.bookingId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action, ...extra }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setBusy(false);
        return;
      }

      setShowReschedule(false);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (!canRespond) return null;

  return (
    <div className="mt-4 border-t border-gray-100 pt-4">
      {!showReschedule ? (
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            disabled={busy}
            onClick={() => respond("accept")}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-60"
          >
            <Check size={16} />
            Accept booking
          </button>

          <button
            type="button"
            disabled={busy}
            onClick={() => setShowReschedule(true)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-60"
          >
            <Clock size={16} />
            Reschedule
          </button>

          <button
            type="button"
            disabled={busy}
            onClick={() => respond("decline")}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-60"
          >
            <X size={16} />
            Decline
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="mb-3 text-sm font-semibold text-black">
            Propose a new time
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-black focus:outline-none"
            />

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-black focus:outline-none"
            />
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              disabled={busy || !date || !time}
              onClick={() => respond("reschedule", { date, time })}
              className="flex-1 rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-60"
            >
              {busy ? "Saving..." : "Send reschedule request"}
            </button>

            <button
              type="button"
              onClick={() => setShowReschedule(false)}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}