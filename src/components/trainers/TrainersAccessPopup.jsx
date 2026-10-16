"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, PackageCheck, CalendarCheck } from "lucide-react";

export default function TrainersPackageGate() {
  const [hasCompletedPackage, setHasCompletedPackage] = useState(null);

  useEffect(() => {
    const checkPackage = async () => {
      try {
        // Replace with your real package-status API.
        const response = await fetch("/api/user/package-status");
        const data = await response.json();

        setHasCompletedPackage(Boolean(data?.hasCompletedMainPackage));
      } catch {
        setHasCompletedPackage(false);
      }
    };

    checkPackage();
  }, []);

  // While checking access, block the trainer page completely.
  if (hasCompletedPackage === null) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070d17]/95">
        <div className="flex flex-col items-center gap-4 text-white">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />

          <p className="text-sm text-white/60">Checking access...</p>
        </div>
      </div>
    );
  }

  // Main package completed: allow normal trainer page access.
  if (hasCompletedPackage) return null;

  // Main package not completed: show popup over a partly visible page.
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070d17]/70 px-4 py-10 backdrop-blur-[3px] sm:px-6">
      <div
        className="relative max-h-full w-full max-w-md overflow-y-auto rounded-3xl border border-white/10 bg-[#0f1a2b] p-6 text-white shadow-2xl sm:max-w-lg sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="trainers-gate-title"
      >
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
          <Lock size={22} />
        </div>

        <h1
          id="trainers-gate-title"
          className="text-2xl font-black leading-tight sm:text-3xl"
        >
          Complete your main package
          <br />
          <span className="text-white/40">to access trainers.</span>
        </h1>

        <p className="mt-4 text-sm leading-7 text-white/65 sm:text-base">
          Trainer profiles and main session details are available after you
          complete your main package. This helps us match you with a
          personalized trainer based on your goals and requirements.
        </p>

        <div className="mt-6 space-y-3">
          <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#070d17] p-4">
            <PackageCheck size={18} className="mt-0.5 shrink-0 text-white/70" />

            <p className="text-sm leading-6 text-white/70">
              Complete your main package to unlock trainer profiles.
            </p>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#070d17] p-4">
            <CalendarCheck size={18} className="mt-0.5 shrink-0 text-white/70" />

            <p className="text-sm leading-6 text-white/70">
              After completion, choose a personalized trainer and view their
              session details.
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/packages"
            className="inline-flex flex-1 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100"
          >
            Complete Main Package
          </Link>

          <Link
            href="/"
            className="inline-flex flex-1 items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-white/10"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}