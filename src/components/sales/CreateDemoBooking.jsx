"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarPlus } from "lucide-react";

const input =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-black focus:outline-none";

export default function CreateDemoBooking({ lead }) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [trainers, setTrainers] = useState([]);
  const [trainerId, setTrainerId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("Waiting for Customer");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;

    const load = async () => {
      try {
        const res = await fetch("/api/trainers/public");

        if (!res.ok) return;

        const data = await res.json();
        setTrainers(data.trainers || []);
      } catch {
        setTrainers([]);
      }
    };

    load();
  }, [open]);

  async function submit() {
    setError("");
    setBusy(true);

    try {
      const res = await fetch("/api/sales/demo-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: lead.leadId,
          trainerId,
          date,
          time,
          status,
          amount,
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Could not create booking.");
        setBusy(false);
        return;
      }

      setOpen(false);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-black">
          Demo booking
        </h2>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          <CalendarPlus size={16} />
          Create booking
        </button>
      </div>

      {open && (
        <div className="mt-5 space-y-4 border-t border-gray-100 pt-5">
          <div>
            <label className="mb-1.5 block text-sm font-semibold">
              Trainer *
            </label>

            <select
              value={trainerId}
              onChange={(e) => setTrainerId(e.target.value)}
              className={input}
            >
              <option value="">Select trainer</option>

              {trainers.map((trainer) => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.name}
                  {trainer.location ? ` — ${trainer.location}` : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-semibold">
                Date *
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={input}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold">
                Time *
              </label>

              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={input}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-semibold">
                Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={input}
              >
                <option>Waiting for Customer</option>
                <option>Waiting for Trainer</option>
                <option>Pending Payment</option>
                <option>Confirmed</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold">
                Amount
              </label>

              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className={input}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold">
              Notes
            </label>

            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any booking instructions"
              className={input}
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              disabled={
                busy || !trainerId || !date || !time
              }
              onClick={submit}
              className="flex-1 rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-60"
            >
              {busy ? "Creating..." : "Create booking"}
            </button>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}