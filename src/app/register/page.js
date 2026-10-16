"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Dumbbell, User, Mail, Lock, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/brand";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-[#070d17] py-3 pl-11 pr-4 text-white placeholder:text-white/30 transition-all focus:border-white focus:outline-none focus:ring-2 focus:ring-white";
const labelClass = "mb-1.5 block text-sm font-medium text-white/80";
const iconClass =
  "absolute left-4 top-1/2 -translate-y-1/2 text-white/35";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      // Auto sign-in right after successful registration
      await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      router.push("/");
      router.refresh();
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#070d17] px-6 py-16 pt-28 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black">
            <Dumbbell size={24} />
          </div>
          <h1 className="text-2xl font-bold">Create Your Account</h1>
          <p className="mt-1 text-sm text-white/55">
            Start your fitness journey with {BRAND.name}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-[#0f1a2b] p-8 shadow-xl shadow-black/30"
        >
          {error && (
            <div
              role="alert"
              className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className={labelClass}>Full Name</label>
            <div className="relative">
              <User size={18} className={iconClass} />
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className={labelClass}>Email</label>
            <div className="relative">
              <Mail size={18} className={iconClass} />
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className={labelClass}>Password</label>
            <div className="relative">
              <Lock size={18} className={iconClass} />
              <input
                type="password"
                name="password"
                required
                minLength={6}
                value={form.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className={inputClass}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 font-bold text-black transition-all duration-300 hover:bg-white disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
            {!loading && (
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            )}
          </button>

          <p className="mt-6 text-center text-sm text-white/55">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-white hover:text-white hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}