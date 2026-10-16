"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CalendarDays, CheckCircle2, Mail, MapPin, Phone, User } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { FITNESS_GOALS } from "@/lib/leadOptions";


const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#070d17] px-4 py-3 pl-11 text-sm text-white placeholder:text-white/30 transition-all focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/10 [color-scheme:dark]";


const inputWithoutIconClass =
  "w-full rounded-xl border border-white/10 bg-[#070d17] px-4 py-3 text-sm text-white placeholder:text-white/30 transition-all focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/10 [color-scheme:dark]";


const labelClass = "mb-1.5 block text-sm font-semibold text-white/90";


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
      current.map((s, i) =>
        i === index ? { ...s, [key]: e.target.value } : s
      )
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


      router.push(
        `/demo-request-success?id=${encodeURIComponent(data.leadId)}`
      );
    } catch {
      setError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  }


  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#0f1a2b] shadow-xl shadow-black/30">
      {/* Form header */}
      <div className="border-b border-white/10 bg-white/[0.03] px-6 py-6 md:px-8">
        <h2 className="text-xl font-black text-white sm:text-2xl">
          Request your in-home demo
        </h2>


        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
          Share your goals, location, and preferred timings. Our team will
          contact you to coordinate a suitable demo.
        </p>
      </div>


      <div className="p-6 md:p-8">
        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={setField("website")}
          />
        </div>


        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {/* Name */}
          <div>
            <label className={labelClass}>Full name *</label>


            <div className="relative">
              <User
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
              />


              <input
                className={inputClass}
                placeholder="Enter your name"
                value={form.name}
                onChange={setField("name")}
              />
            </div>
          </div>


          {/* Phone */}
          <div>
            <label className={labelClass}>Phone number *</label>


            <div className="relative">
              <Phone
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
              />


              <input
                className={inputClass}
                type="tel"
                inputMode="numeric"
                placeholder="98765 43210"
                value={form.phone}
                onChange={setField("phone")}
              />
            </div>
          </div>


          {/* Email */}
          <div>
            <label className={labelClass}>Email address *</label>


            <div className="relative">
              <Mail
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
              />


              <input
                className={inputClass}
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={setField("email")}
              />
            </div>
          </div>


          {/* Address */}
          <div>
            <label className={labelClass}>Address / PIN code *</label>


            <div className="relative">
              <MapPin
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
              />


              <input
                className={inputClass}
                placeholder="Area, city and 6-digit PIN code"
                value={form.address}
                onChange={setField("address")}
              />
            </div>


            <p className="mt-1.5 text-xs text-white/45">
              Used only to check trainer availability near you.
            </p>
          </div>


          {/* Goal */}
          <div className="md:col-span-2">
            <label className={labelClass}>Fitness goal *</label>


            <select
              className={inputWithoutIconClass}
              value={form.goal}
              onChange={setField("goal")}
            >
              <option value="">Select your goal</option>


              {FITNESS_GOALS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>


          {/* Time slots */}
          <div className="md:col-span-2">
            <div className="mb-3 flex items-center gap-2">
              <CalendarDays size={17} className="text-white/50" />


              <p className={labelClass + " mb-0"}>
                Preferred time slots *
              </p>
            </div>


            <p className="mb-4 text-xs text-white/45">
              Pick three options in order of preference. We will confirm the
              best match with you.
            </p>


            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {slots.map((slot, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-[#070d17] p-4"
                >
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-white/50">
                    {SLOT_LABELS[i]}
                  </p>


                  <div className="space-y-3">
                    <input
                      className={inputWithoutIconClass}
                      type="date"
                      min={today}
                      value={slot.date}
                      onChange={setSlot(i, "date")}
                    />


                    <input
                      className={inputWithoutIconClass}
                      type="time"
                      value={slot.time}
                      onChange={setSlot(i, "time")}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Notes */}
          <div className="md:col-span-2">
            <label className={labelClass}>Notes (optional)</label>


            <textarea
              className={inputWithoutIconClass}
              rows={3}
              placeholder="Any special requirements"
              value={form.notes}
              onChange={setField("notes")}
            />
          </div>


          {/* Consent */}
          <div className="md:col-span-2">
            <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#070d17] p-4 text-xs leading-5 text-white/70 sm:text-sm">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 shrink-0 accent-white"
                checked={form.consent}
                onChange={setField("consent")}
              />


              <span>
                I agree that {BRAND.name} may contact me by phone and email
                about this demo request, and use my details to arrange it.
              </span>
            </label>
          </div>


          {/* Payment note */}
          <div className="md:col-span-2">
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <CheckCircle2
                size={17}
                className="mt-0.5 shrink-0 text-white/60"
              />


              <p className="text-xs leading-5 text-white/60 sm:text-sm">
                No payment is taken now. A demo booking fee applies once a time
                is agreed, and our team will confirm the amount with you before
                you pay.
              </p>
            </div>
          </div>


          {/* Error */}
          {error && (
            <div className="md:col-span-2">
              <p
                role="alert"
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                {error}
              </p>
            </div>
          )}


          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 hover:shadow-xl disabled:translate-y-0 disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Request"}


              {!submitting && (
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}