"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { FITNESS_GOALS } from "@/lib/leadOptions";

const inputClass =
  "w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-black placeholder:text-black/35 focus:border-black focus:outline-none";
const labelClass = "mb-1.5 block text-sm font-semibold text-black";
const SLOT_LABELS = ["First priority", "Second priority", "Third priority"];

export default function DemoRequestForm({
  source = "",
  medium = "",
  campaign = "",
}) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    goal: "",
    notes: "",
    consent: false,
    website: "", // honeypot
  });
  const [slots, setSlots] = useState([
    { date: "", time: "" },
    { date: "", time: "" },
    { date: "", time: "" },
  ]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const today = new Date().toLocaleDateString("en-CA");

  const setField = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const setSlot = (index, key) => (e) =>
    setSlots((current) =>
      current.map((s, i) => (i === index ? { ...s, [key]: e.target.value } : s))
    );

  async function handleSubmit() {
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/demo-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, slots, source, medium, campaign }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      router.push(`/demo-request-success?id=${encodeURIComponent(data.leadId)}`);
    } catch {
      setError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-8 space-y-5 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      {/* Honeypot: hidden from people */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={setField("website")}
        />
      </div>

      <div>
        <label className={labelClass}>Full name *</label>
        <input className={inputClass} placeholder="Enter your name" value={form.name} onChange={setField("name")} />
      </div>

      <div>
        <label className={labelClass}>Phone number *</label>
        <input className={inputClass} type="tel" inputMode="numeric" placeholder="98765 43210" value={form.phone} onChange={setField("phone")} />
      </div>

      <div>
        <label className={labelClass}>Email address *</label>
        <input className={inputClass} type="email" placeholder="you@example.com" value={form.email} onChange={setField("email")} />
      </div>

      <div>
        <label className={labelClass}>Address / PIN code *</label>
        <input className={inputClass} placeholder="Area, city and 6-digit PIN code" value={form.address} onChange={setField("address")} />
        <p className="mt-1 text-xs text-black/50">
          Used only to check trainer availability near you.
        </p>
      </div>
      <div>
        <label className={labelClass}>Fitness goal *</label>
        <select className={inputClass} value={form.goal} onChange={setField("goal")}>
          <option value="">Select your goal</option>
          {FITNESS_GOALS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      <div>
        <p className={labelClass}>Preferred time slots *</p>
        <p className="mb-3 text-xs text-black/50">
          Pick three options in order of preference. We will confirm the best match with you.
        </p>
        <div className="space-y-3">
          {slots.map((slot, i) => (
            <div key={i}>
              <p className="mb-1 text-xs font-semibold text-black/60">{SLOT_LABELS[i]}</p>
              <div className="grid grid-cols-2 gap-3">
                <input className={inputClass} type="date" min={today} value={slot.date} onChange={setSlot(i, "date")} />
                <input className={inputClass} type="time" value={slot.time} onChange={setSlot(i, "time")} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>Notes (optional)</label>
        <textarea className={inputClass} rows={3} placeholder="Any special requirements" value={form.notes} onChange={setField("notes")} />
      </div>

      <label className="flex items-start gap-3 text-xs leading-5 text-black/70">
        <input type="checkbox" className="mt-1 h-4 w-4 accent-black" checked={form.consent} onChange={setField("consent")} />
        I agree that FitPro may contact me by phone and email about this demo
        request, and use my details to arrange it.
      </label>

      <div className="rounded-xl bg-gray-50 p-4 text-xs leading-5 text-black/60">
        No payment is taken now. A demo booking fee applies once a time is
        agreed, and our team will confirm the amount with you before you pay.
      </div>

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full rounded-full bg-black px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-gray-800 disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Submit Request"}
      </button>
    </div>
  );
}