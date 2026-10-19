"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";

export default function DemoBookingActions({ booking }) {
  const router = useRouter();

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const canRespond = [
    "Waiting for Trainer",
    "Waiting for Customer",
    "Pending Payment",
  ].includes(booking.status);

  async function respond(action) {
    setBusy(true);
    setError("");

    try {
      const res = await fetch(
        `/api/trainer/demo-bookings/${booking.bookingId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setBusy(false);
        return;
      }

      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setBusy(false);
    }
  }

  if (!canRespond) return null;

  return (
    <div className="mt-4">
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
          onClick={() => respond("decline")}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-60"
        >
          <X size={16} />
          Decline
        </button>
      </div>

      {error && (
        <p className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}