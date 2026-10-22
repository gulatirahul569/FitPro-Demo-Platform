"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import {
  Dumbbell,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
} from "lucide-react";

const inputClass =
  "w-full border border-white/10 bg-[#070d17] py-3 pl-11 pr-11 text-white placeholder:text-white/30 transition focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40";

const ROLE_HOME = {
  admin: "/admin/dashboard",
  trainer: "/trainer/dashboard",
  sales: "/sales/dashboard",
};

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z"
      />
      <path
        fill="#FBBC05"
        d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.1z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"
      />
    </svg>
  );
}

function BrandLogo({ className = "" }) {
  return (
    <Link
      href="/"
      aria-label="FITPRO home"
      className={`inline-flex w-fit items-center gap-2 text-2xl font-extrabold tracking-widest text-white transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${className}`}
    >
      <Dumbbell size={26} strokeWidth={2.5} />
      FITPRO
    </Link>
  );
}

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const busy = loading || googleLoading;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Email or password is incorrect.");
        setLoading(false);
        return;
      }

      // Redirect based on the authenticated user's role.
      const session = await fetch("/api/auth/session").then((r) => r.json());

      router.push(ROLE_HOME[session?.user?.role] ?? "/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

const handleGoogle = async () => {
  setError("");
  setGoogleLoading(true);

  await signIn("google", {
    callbackUrl: "/",
    prompt: "select_account",
  });
};

  return (
    <section className="relative grid h-dvh overflow-hidden bg-[#070d17] text-white lg:grid-cols-[60%_40%]">
      {/* Mobile background image */}
      <img
        src="https://images.pexels.com/photos/29392546/pexels-photo-29392546.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover grayscale lg:hidden"
      />

      {/* Mobile dark overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#070d17]/80 lg:hidden"
      />

      {/* Mobile FITPRO logo */}
      <BrandLogo className="absolute left-6 top-6 z-20 text-xl lg:hidden" />

      {/* Desktop brand panel */}
      <div className="relative hidden overflow-hidden border-r border-white/10 bg-[#0b1424] lg:flex lg:flex-col lg:justify-between lg:p-12">
        <img
          src="https://images.pexels.com/photos/29392546/pexels-photo-29392546.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover grayscale"
        />

        {/* Blue tint overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#070d17]/50 via-[#0b1d3a]/20 to-[#0b2a5c]/10"
        />

        {/* Desktop FITPRO logo */}
        <BrandLogo className="relative z-10" />

        {/* Brand message */}
        <div className="relative z-10">
          <h2 className="max-w-md text-4xl font-bold leading-tight">
            Your next session starts here.
          </h2>

          <p className="mt-4 max-w-sm text-white/70">
            Check your schedule, track your progress and stay in touch with your
            trainer.
          </p>
        </div>

        {/* Copyright */}
        <p className="relative z-10 text-sm text-white/50">
          &copy; {new Date().getFullYear()} FITPRO
        </p>
      </div>

      {/* Login form panel */}
      <div className="relative z-10 flex items-center justify-center overflow-y-auto px-4 py-6 pt-24 lg:px-6 lg:pt-6">
        <div className="w-full max-w-sm border border-white/15 bg-white/5 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none">
          <h1 className="text-2xl font-bold sm:text-3xl">Log in</h1>

          <p className="mt-1 text-sm text-white/55">
            Welcome back. Enter your details to continue.
          </p>

          {/* Google login */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={busy}
            className="mt-6 flex w-full items-center justify-center gap-3 border border-white/15 bg-white/5 py-3 font-medium transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {googleLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            Continue with Google
          </button>

          {/* Divider */}
          <div className="my-4 flex items-center gap-4 text-xs text-white/35">
            <span className="h-px flex-1 bg-white/10" />
            or log in with email
            <span className="h-px flex-1 bg-white/10" />
          </div>

          {/* Email and password form */}
          <form onSubmit={handleSubmit}>
            {error && (
              <div
                role="alert"
                className="mb-4 border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300"
              >
                {error}
              </div>
            )}

            {/* Email */}
            <div className="mb-3">
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-white/80"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-white/80"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={inputClass}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/40 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={busy}
              className="group flex w-full items-center justify-center gap-2 bg-white py-3 font-bold text-black transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070d17] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  Log in
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          {/* Registration link */}
          <p className="mt-5 text-center text-sm text-white/55">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-white underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
