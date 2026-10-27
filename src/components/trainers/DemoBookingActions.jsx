"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Clock, Loader2, X } from "lucide-react";

export default function DemoBookingActions({ booking }) {
  const router = useRouter();

  const [busy, setBusy] = useState(false);
  const [pendingAction, setPendingAction] = useState("");
  const [error, setError] = useState("");
  const [showReschedule, setShowReschedule] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const canAcceptOrDecline = [
    "Waiting for Trainer",
    "Waiting for Customer",
    "Pending Payment",
  ].includes(booking.status);

  const canRespond =
  canAcceptOrDecline ||
  booking.status === "Confirmed" ||
  booking.status === "Rescheduled";

  async function respond(action, extra = {}) {
    if (busy) return;

    setBusy(true);
    setPendingAction(action);
    setError("");

    try {
      const res = await fetch(
        `/api/trainer/demo-bookings/${encodeURIComponent(
          booking.bookingId
        )}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action, ...extra }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setShowReschedule(false);
      setDate("");
      setTime("");
      router.refresh();
    } catch {
      setError(
        "Could not confirm the result. Refresh the page before trying again."
      );
    } finally {
      setBusy(false);
      setPendingAction("");
    }
  }

  if (!canRespond) return null;

  return (
    <div className="mt-4 border-t border-gray-100 pt-4">
      {!showReschedule ? (
        <div className="flex flex-col gap-2 sm:flex-row">
          {canAcceptOrDecline && (
            <button
              type="button"
              disabled={busy}
              onClick={() => respond("accept")}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pendingAction === "accept" ? (
                <Loader2
                  size={16}
                  className="animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <Check size={16} aria-hidden="true" />
              )}

              {pendingAction === "accept"
                ? "Accepting..."
                : "Accept booking"}
            </button>
          )}

          <button
            type="button"
            disabled={busy}
            onClick={() => {
              setError("");
              setShowReschedule(true);
            }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Clock size={16} aria-hidden="true" />
            Reschedule
          </button>

          {canAcceptOrDecline && (
            <button
              type="button"
              disabled={busy}
              onClick={() => respond("decline")}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pendingAction === "decline" ? (
                <Loader2
                  size={16}
                  className="animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <X size={16} aria-hidden="true" />
              )}

              {pendingAction === "decline"
                ? "Declining..."
                : "Decline"}
            </button>
          )}
        </div>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            respond("reschedule", { date, time });
          }}
          className="rounded-xl border border-gray-200 bg-gray-50 p-4"
        >
          <p className="text-sm font-semibold text-black">
            Propose a new time
          </p>

          <p className="mb-4 mt-1 text-xs leading-5 text-gray-500">
            Sales will confirm the proposed time with the customer.
            All times are in IST.
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block text-xs font-medium text-gray-600">
              Proposed date

              <input
                type="date"
                required
                disabled={busy}
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-black focus:border-black focus:outline-none disabled:opacity-60"
              />
            </label>

            <label className="block text-xs font-medium text-gray-600">
              Proposed time (IST)

              <input
                type="time"
                required
                disabled={busy}
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-black focus:border-black focus:outline-none disabled:opacity-60"
              />
            </label>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              type="submit"
              disabled={busy || !date || !time}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy && (
                <Loader2
                  size={16}
                  className="animate-spin"
                  aria-hidden="true"
                />
              )}

              {busy ? "Sending..." : "Send reschedule request"}
            </button>

            <button
              type="button"
              disabled={busy}
              onClick={() => {
                setShowReschedule(false);
                setError("");
              }}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {error && (
        <p
          role="alert"
          className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}