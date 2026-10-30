"use client";

import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { ArrowRight, ChevronDown } from "lucide-react";
import PackageImage from "@/components/packages/PackageImage";

export default function AboutHero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#e6e8f2] text-slate-900 sm:min-h-screen">
      {/* ================= BACKGROUND IMAGE ================= */}
      <div className="absolute inset-0 -z-10">
        {/* Mobile background: focus on the upper part so her face stays visible */}
        <PackageImage
          src="https://images.pexels.com/photos/39134627/pexels-photo-39134627.jpeg"
          alt="Fitness training at home"
          width={900}
          sizes="100vw"
          priority
          className="block h-full w-full object-cover object-[center_15%] sm:hidden"
        />

        {/* Desktop background */}
        <PackageImage
          src="https://images.pexels.com/photos/3838705/pexels-photo-3838705.jpeg"
          alt="Fitness training at home"
          width={1600}
          sizes="100vw"
          priority
          className="hidden h-full w-full object-cover  sm:block"
        />

        {/* Overlay.
            Mobile: clear at the top (image visible), getting darker towards the bottom
            where the text sits, so the text is easy to read.
            sm and up: unchanged. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/20 max-sm:bg-gradient-to-t max-sm:from-black/90 max-sm:via-black/60 max-sm:via-45% max-sm:to-transparent" />
      </div>

      {/* ================= HERO CONTENT ================= */}
      {/* Mobile: content sits at the bottom (items-end) so the image shows above it.
          sm and up: centred as before. */}
      <div className="relative mx-auto flex min-h-[100svh] max-w-full items-end justify-center px-6 pb-28 pt-[max(2.5rem,env(safe-area-inset-top))] sm:min-h-screen sm:items-center sm:justify-start sm:px-6 sm:py-16 lg:min-h-screen lg:px-12 lg:py-14">
        {/* Mobile: block centred on screen, text left-aligned inside it */}
        <div className="mx-auto w-full max-w-sm text-left sm:mx-0 sm:max-w-2xl md:mt-16">
          {/* Badge */}
          <div
            className="animate-fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3.5 py-2 text-[11px] font-medium text-slate-800 shadow-sm sm:mb-6 sm:px-4 sm:text-sm"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-slate-500" />
            </span>

            About {BRAND.name}
          </div>

          {/* Heading */}
          <h1
            className="animate-fade-up text-[36px] font-black leading-[1] tracking-[-0.04em] text-white max-sm:[text-shadow:0_2px_14px_rgba(0,0,0,0.55)] sm:text-6xl md:text-6xl xl:text-7xl"
            style={{ animationDelay: "0.25s" }}
          >
            FITNESS GUIDANCE,
            <br />
            COORDINATED
            <br />
            FOR YOUR <span className="text-slate-300 sm:text-slate-700">HOME.</span>
          </h1>

          {/* Description */}
          <p
            className="animate-fade-up mt-5 max-w-xl text-[15px] leading-[1.65] text-white max-sm:[text-shadow:0_1px_8px_rgba(0,0,0,0.6)] sm:mt-7 sm:text-lg sm:leading-7 sm:text-slate-100"
            style={{ animationDelay: "0.4s" }}
          >
            {BRAND.name} helps you request an in-home fitness demo. Share your
            goals, location, and preferred times, and our team coordinates with
            a suitable trainer to arrange a demo at your home.
          </p>

          {/* Buttons */}
          <div
            className="animate-fade-up mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:gap-3"
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
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-bold text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 hover:bg-white hover:shadow-md active:scale-[0.98] sm:w-auto sm:px-7 sm:py-4"
            >
              Contact Us
            </Link>
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