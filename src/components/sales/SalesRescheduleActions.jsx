"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarClock, Check, Loader2 } from "lucide-react";

export default function SalesRescheduleActions({
  bookingId,
  proposedDate,
  proposedTime,
}) {
  const router = useRouter();

  const [customerConfirmed, setCustomerConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [approved, setApproved] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  async function approve() {
    if (busy || approved || !customerConfirmed) return;

    setBusy(true);
    setError("");
    setWarning("");

    try {
      const res = await fetch(
        `/api/sales/demo-bookings/${encodeURIComponent(bookingId)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "approve-reschedule",
            customerConfirmed: true,
            proposedDate,
            proposedTime,
          }),
        }
      );

      let data = {};

      try {
        data = await res.json();
      } catch {
        setError(
          `Server error (${res.status}). Check the terminal for details.`
        );
        return;
      }

      if (!res.ok) {
        setError(data.error || "Could not approve the reschedule.");
        return;
      }

      setApproved(true);

      if (data.warning) {
        // Keep the warning visible until the user refreshes.
        setWarning(data.warning);
      } else {
        router.refresh();
      }
    } catch {
      setError(
        "Could not confirm the result. Refresh the page before trying again."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-blue-200 bg-blue-50">
      <div className="flex items-start gap-3 p-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-700">
          <CalendarClock size={18} aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-blue-950">
            Trainer proposed a new time
          </p>

          <p className="mt-1 text-sm font-medium text-blue-800">
            {proposedDate} at {proposedTime} IST
          </p>

          <p className="mt-1 text-xs leading-5 text-blue-700">
            Contact the customer before confirming this change.
          </p>
        </div>
      </div>

      <div className="border-t border-blue-100 bg-white/70 p-4">
        <label className="flex items-start gap-2.5 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={customerConfirmed}
            disabled={busy || approved}
            onChange={(event) =>
              setCustomerConfirmed(event.target.checked)
            }
            className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-black"
          />

          <span>The customer agreed to this proposed date and time.</span>
        </label>

        <button
          type="button"
          disabled={!customerConfirmed || busy || approved}
          onClick={approve}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {busy ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Check size={16} />
          )}

          {busy
            ? "Confirming..."
            : approved
              ? "Reschedule confirmed"
              : "Confirm proposed time"}
        </button>

        {error && (
          <p
            role="alert"
            className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {warning && (
          <div
            role="status"
            className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-800"
          >
            <p>{warning}</p>

            <button
              type="button"
              onClick={() => router.refresh()}
              className="mt-2 font-semibold underline underline-offset-2"
            >
              Refresh booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
}