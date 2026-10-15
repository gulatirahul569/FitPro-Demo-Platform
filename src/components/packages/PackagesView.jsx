"use client";

import PackageCard from "./PackageCard";
import { DEMO_PACKAGES, MAIN_PACKAGES } from "@/lib/packages";

export default function PackagesView() {
  return (
    <>
      {/* DEMO PACKAGES */}
      <section
        id="demo-packages"
        className="scroll-mt-28 pt-6"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/40">
            Start Here
          </p>

          <h2 className="mt-2 text-2xl font-bold text-black md:text-3xl">
            Demo Packages
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-black/60">
            Try before you commit with a single session. Experience our
            training style and find the right program for your goals.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {DEMO_PACKAGES.map((pkg) => (
            <PackageCard
              key={pkg.slug}
              pkg={pkg}
              isDemo
            />
          ))}
        </div>
      </section>

      {/* MAIN PACKAGES */}
      <section
        id="main-packages"
        className="scroll-mt-28 pt-14 md:pt-20"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/40">
            Long-Term Training
          </p>

          <h2 className="mt-2 text-2xl font-bold text-black md:text-3xl">
            Main Packages
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-black/60">
            Structured training programs designed for long-term results,
            with personal coaching and benefits tailored to your goals.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {MAIN_PACKAGES.map((pkg) => (
            <PackageCard
              key={pkg.slug}
              pkg={pkg}
            />
          ))}
        </div>
      </section>
    </>
  );
}
