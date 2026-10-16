"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Dumbbell, Mail, Lock, ArrowRight } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-[#070d17] py-3 pl-11 pr-4 text-white placeholder:text-white/30 transition-all focus:border-white focus:outline-none focus:ring-2 focus:ring-white";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }

    // Fetch the session to check the role and redirect accordingly
    const sessionRes = await fetch("/api/auth/session");
    const session = await sessionRes.json();
    const role = session?.user?.role;

    if (role === "admin") {
      router.push("/admin/dashboard");
    } else if (role === "trainer") {
      router.push("/trainer/dashboard");
    } else if (role === "sales") {
      router.push("/sales/dashboard");
    } else {
      router.push("/");
    }
    router.refresh();
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#070d17] px-6 py-16 pt-28 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black">
            <Dumbbell size={24} />
          </div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="mt-1 text-sm text-white/55">
            Log in to continue your fitness journey
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
            <label className="mb-1.5 block text-sm font-medium text-white/80">
              Email
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
              />
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
            <label className="mb-1.5 block text-sm font-medium text-white/80">
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
              />
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={inputClass}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 font-bold text-black transition-all duration-300 hover:bg-white disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log In"}
            {!loading && (
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            )}
          </button>

          <p className="mt-6 text-center text-sm text-white/55">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-white hover:text-white hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}