"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock3, Dumbbell, Mail, MapPin, Phone, User } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { FITNESS_GOALS } from "@/lib/leadOptions";

// Mobile-first sizing (below lg); lg: values match the original desktop design.
// text-base on mobile also stops iOS from zooming when an input is focused.
const inputBase =
  "w-full rounded-lg border border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 [color-scheme:dark]";

const inputClass = `${inputBase} px-4 py-2.5 text-base lg:py-3 lg:text-sm`;
const slotInputClass = `${inputBase} min-w-0 px-3 py-2.5 text-base sm:px-4 lg:py-3 lg:text-sm`;
const iconInputClass = `${inputClass} pl-11`;
const labelClass = "mb-1.5 block text-sm font-medium text-slate-200 lg:mb-2";
const SLOT_LABELS = ["First choice", "Second choice", "Third choice"];

function SectionHeading({ title, description }) {
  return (
    <div className="mb-4 lg:mb-5">
      <h3 className="text-base font-semibold text-white">{title}</h3>
      {description && (
        <p className="mt-1 text-[13px] leading-5 text-slate-400 lg:text-sm lg:leading-6">{description}</p>
      )}
    </div>
  );
}

export default function DemoRequestForm({ source = "", medium = "", campaign = "" }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    goal: "",
    notes: "",
    consent: false,
    website: "",
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
    setForm((current) => ({
      ...current,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const setSlot = (index, key) => (e) =>
    setSlots((current) =>
      current.map((slot, i) =>
        i === index ? { ...slot, [key]: e.target.value } : slot
      )
    );

  // Existing backend connection — unchanged.
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
    <div className="mt-4 overflow-visible rounded-xl border border-slate-700/80 bg-slate-950 shadow-xl shadow-black/20 lg:mt-8 lg:rounded-2xl">
      <div className="grid items-start lg:grid-cols-[0.8fr_1.2fr]">
        {/* Info panel: hidden on mobile/tablet, visible and sticky on desktop (lg and up). */}
        <aside className="hidden border-slate-800 bg-slate-900/70 p-9 lg:sticky lg:top-6 lg:block lg:self-start lg:border-r">
          <div className="flex items-center gap-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-400/10 text-gray-300">
              <Dumbbell size={22} />
            </div>
            <p className="text-sm font-medium text-gray-300">In-home fitness demo</p>
          </div>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white">
            Let’s find a time that works for you.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            Share a few details about yourself and your fitness goals. Our team will get in touch to discuss trainer availability and arrange your demo.
          </p>

          <div className="my-7 border-t border-slate-800" />
          <div className="space-y-5">
            <div className="flex gap-3">
              <Dumbbell size={19} className="mt-0.5 shrink-0 text-gray-300" />
              <div>
                <p className="text-sm font-medium text-white">Built around your goals</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Tell us what you’re working towards so we can understand what kind of support you need.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <CalendarDays size={19} className="mt-0.5 shrink-0 text-gray-300" />
              <div>
                <p className="text-sm font-medium text-white">Your preferred schedule</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Add up to three date and time options that suit you. Our team will confirm availability with you.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin size={19} className="mt-0.5 shrink-0 text-gray-300" />
              <div>
                <p className="text-sm font-medium text-white">Trainer availability near you</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  We’ll use your area to check whether a trainer is available nearby.
                </p>
              </div>
            </div>
          </div>
          <p className="mt-8 rounded-lg border border-slate-800 bg-slate-950/70 p-4 text-sm leading-6 text-slate-300">
            <span className="font-medium text-white">No payment is taken now.</span> If a demo booking fee applies, our team will confirm the amount with you before you pay.
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            We’ll contact you to discuss availability, answer any questions, and confirm the arrangements before your demo.
          </p>
        </aside>

        {/* The form remains in normal page flow and scrolls while the left panel sticks on desktop. */}
        <div className="min-w-0 p-4 sm:p-6 lg:p-9">
          <div className="mb-5 lg:mb-8">
            <h2 className="text-xl font-semibold tracking-tight text-white lg:text-2xl">Request a demo</h2>
            <p className="mt-1 text-[13px] leading-5 text-slate-400 lg:mt-2 lg:text-sm lg:leading-6">
              Fill in the form and we’ll contact you to take it from there.
            </p>
          </div>

          {/* Honeypot — preserved */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={setField("website")}
            />
          </div>

          <div className="space-y-6 lg:space-y-8">
            <section>
              <SectionHeading title="Your details" description="Enter your contact information below." />
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 lg:gap-5">
                <div>
                  <label className={labelClass}>Full name *</label>
                  <div className="relative">
                    <User size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input className={iconInputClass} placeholder="Your name" autoComplete="name" value={form.name} onChange={setField("name")} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Phone number *</label>
                  <div className="relative">
                    <Phone size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input className={iconInputClass} type="tel" inputMode="numeric" placeholder="Your phone number" autoComplete="tel" value={form.phone} onChange={setField("phone")} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Email address *</label>
                  <div className="relative">
                    <Mail size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input className={iconInputClass} type="email" placeholder="you@example.com" autoComplete="email" value={form.email} onChange={setField("email")} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Address / PIN code *</label>
                  <div className="relative">
                    <MapPin size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input className={iconInputClass} placeholder="Area, city and PIN code" autoComplete="street-address" value={form.address} onChange={setField("address")} />
                  </div>
                  <p className="mt-1.5 text-xs leading-5 text-slate-500 lg:mt-2">This helps us check local trainer availability.</p>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>What’s your fitness goal? *</label>
                  <select className={inputClass} value={form.goal} onChange={setField("goal")}>
                    <option value="">Choose a goal</option>
                    {FITNESS_GOALS.map((goal) => (
                      <option key={goal} value={goal}>{goal}</option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <section className="border-t border-slate-800 pt-5 lg:pt-7">
              <SectionHeading title="When would you like your demo?" description="Add three options if possible. We’ll confirm the final time with you." />
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
                {slots.map((slot, i) => (
                  <div key={i} className="min-w-0 rounded-xl border border-slate-800 bg-slate-900/50 p-3 sm:p-4">
                    <p className="mb-2.5 text-sm font-medium text-white sm:mb-4">{SLOT_LABELS[i]}</p>
                    {/* Mobile: date and time sit side by side to save height. sm and up: stacked, as before. */}
                    <div className="grid grid-cols-2 gap-2.5 sm:block sm:space-y-3">
                      <div className="min-w-0">
                        <label className="mb-1.5 flex items-center gap-2 text-xs text-slate-400 sm:mb-2"><CalendarDays size={14} />Date</label>
                        <input className={slotInputClass} type="date" min={today} value={slot.date} onChange={setSlot(i, "date")} />
                      </div>
                      <div className="min-w-0">
                        <label className="mb-1.5 flex items-center gap-2 text-xs text-slate-400 sm:mb-2"><Clock3 size={14} />Time</label>
                        <input className={slotInputClass} type="time" value={slot.time} onChange={setSlot(i, "time")} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-slate-800 pt-5 lg:pt-7">
              <SectionHeading title="Anything else we should know?" description="Optional — add any requests or details that may help us plan your demo." />
              <label className={labelClass}>Notes</label>
              <textarea className={`${inputClass} resize-y`} rows={3} placeholder="Write a note (optional)" value={form.notes} onChange={setField("notes")} />
            </section>

            <section className="space-y-3.5 border-t border-slate-800 pt-5 lg:space-y-4 lg:pt-7">
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-800 p-3.5 lg:p-4">
                <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-gray-500" checked={form.consent} onChange={setField("consent")} />
                <span className="text-[13px] leading-5 text-slate-400 lg:text-sm lg:leading-6">
                  I agree that <span className="font-medium text-slate-200">{BRAND.name}</span> may contact me by phone or email about this demo request and use my details to arrange it.
                </span>
              </label>

              {error && (
                <p role="alert" className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm leading-6 text-red-300">{error}</p>
              )}

              <button type="button" onClick={handleSubmit} disabled={submitting} className="flex w-full items-center justify-center rounded-lg bg-gray-400 px-6 py-3 text-base font-semibold text-slate-950 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-60 lg:py-3.5 lg:text-sm">
                {submitting ? "Submitting…" : "Send demo request"}
              </button>
              <p className="text-center text-xs leading-5 text-slate-500 lg:text-left">Our team will contact you to discuss availability and next steps.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}