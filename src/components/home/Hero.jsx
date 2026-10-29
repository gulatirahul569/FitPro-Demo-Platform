"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronDown, Package } from "lucide-react";
import { BRAND } from "@/lib/brand";
import PackageImage from "@/components/packages/PackageImage";

const trustPoints = [
  "Trainer matched to your goals",
  "Training at your home",
  "Personalized plans",
];

export default function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-gradient-to-b from-[#dcdfec] via-[#e6e8f2] to-[#f1f2f8] text-slate-900 sm:min-h-screen">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        {/* Slow zoom wrapper (transform only, GPU friendly) */}
        <div className="animate-hero-zoom absolute inset-0">
          {/* Mobile background */}
          <PackageImage
            src="https://images.pexels.com/photos/17273480/pexels-photo-17273480.jpeg"
            alt="Fitness trainer working out"
            width={900}
            sizes="100vw"
            priority
            className="block h-full w-full object-cover object-center sm:hidden"
          />

          {/* Desktop background */}
          <PackageImage
            src="https://images.pexels.com/photos/7312372/pexels-photo-7312372.jpeg"
            // src="https://images.pexels.com/photos/17572135/pexels-photo-17572135.jpeg"
            alt="Fitness trainer working out"
            width={1600}
            sizes="100vw"
            priority
            className="hidden h-full w-full object-contain  sm:block"
          />
        </div>

        {/* Lavender overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-white/0 sm:bg-gradient-to-r sm:from-[#dcdfec]/30 sm:via-[#dcdfec]/10 sm:to-transparent" />

        {/* Bottom fade into next section (removes the hard line) */}
        <div className="absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-white/40 via-white/20 to-transparent" />
      </div>

      {/* Hero content */}
      <div className="relative mx-auto flex min-h-[100svh] max-w-full items-start justify-center px-5 pb-28 pt-[max(2.5rem,env(safe-area-inset-top))] sm:min-h-screen sm:items-center sm:justify-start sm:px-6 sm:py-16 lg:min-h-screen lg:px-12 lg:py-14">
        <div className="w-full max-w-2xl md:mt-16">
          {/* Badge */}
          <div
            className="animate-fade-up mb-10 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3.5 py-2 text-[11px] font-medium text-slate-800 shadow-sm sm:mb-6 sm:px-4 sm:text-sm"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
            </span>
            Your Goals - Your Transformation
          </div>

          {/* Heading */}
          <h1
            className="animate-fade-up text-[40px] font-black leading-[0.98] tracking-[-0.04em] text-slate-900 sm:text-6xl md:text-full xl:text-[82px]"
            style={{ animationDelay: "0.25s" }}
          >
            YOUR FITNESS
            <br />
            JOURNEY
            <br />
            STARTS{" "}
            <span className="bg-slate-600 bg-clip-text text-transparent">
              HERE.
            </span>
          </h1>

          {/* Description */}
          <p
            className="animate-fade-up mt-9 max-w-xl text-[14px] leading-[1.7] text-slate-700 sm:mt-7 sm:text-lg sm:leading-7"
            style={{ animationDelay: "0.4s" }}
          >
            Personalized coaching with a trainer suited to your goals and
            location. Book a demo and experience it at home before you commit.
          </p>

          {/* Buttons */}
          <div
            className="animate-fade-up mt-9 flex flex-col gap-4 sm:mt-9 sm:flex-row sm:gap-3"
            style={{ animationDelay: "0.55s" }}
          >
            <Link
              href="/book-demo"
              className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl active:scale-[0.98] sm:w-auto sm:px-7 sm:py-4"
            >
              {/* Shine sweep on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[400%]"
              />
              <span className="relative">Book a Demo</span>
              <ArrowRight
                size={18}
                className="relative transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/packages"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-bold text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 hover:bg-white hover:shadow-md active:scale-[0.98] sm:w-auto sm:px-7 sm:py-4"
            >
              <Package size={18} />
              Explore Packages
            </Link>
          </div>

          {/* Trust points */}
          <div className="mt-10 grid grid-cols-1 gap-4 text-[12px] font-medium text-slate-800 sm:mt-10 sm:flex sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3 sm:text-base">
            {trustPoints.map((point, i) => (
              <div
                key={point}
                className="animate-fade-up flex items-center gap-2"
                style={{ animationDelay: `${0.7 + i * 0.12}s` }}
              >
                <CheckCircle2 size={17} className="shrink-0 text-orange-600" />
                {point}
              </div>
            ))}
          </div>

          <p className="sr-only">{BRAND.tagline}</p>
        </div>

        {/* Desktop scroll indicator */}
        <div className="animate-soft-bounce absolute bottom-8 right-8 hidden flex-col items-center gap-2 text-slate-500 lg:flex">
          <span className="text-xs uppercase tracking-widest [writing-mode:vertical-rl]">
            Scroll
          </span>
          <ChevronDown size={18} />
        </div>
      </div>
    </section>
  );
}