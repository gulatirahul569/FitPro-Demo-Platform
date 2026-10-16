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
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#070d17] text-white sm:min-h-screen">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        {/* Mobile background */}
        <PackageImage
          src="https://images.pexels.com/photos/17273480/pexels-photo-17273480.jpeg"
          alt="Fitness trainer working out"
          width={900}
          priority
          className="block h-full w-full object-cover object-center sm:hidden"
        />

        {/* Desktop background */}
        <PackageImage
          src="https://images.pexels.com/photos/163351/girl-boxer-ring-boxing-pear-163351.jpeg"
          alt="Fitness trainer working out"
          width={1600}
          priority
          className="hidden h-full w-full object-cover object-center sm:block"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/10" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#070d17] to-transparent" />
      </div>

      {/* Hero content */}
      <div className="relative mx-auto flex min-h-[100svh] max-w-full items-start justify-center px-5 pb-28 pt-[max(2.5rem,env(safe-area-inset-top))] sm:min-h-screen sm:items-center sm:justify-start sm:px-6 sm:py-16 lg:min-h-screen lg:px-12 lg:py-14">
        <div className="w-full max-w-2xl md:mt-16">

          {/* Badge */}
          <div
            className="animate-fade-up mb-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-[11px] font-medium text-white shadow-sm sm:mb-6 sm:px-4 sm:text-sm"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Home fitness demo, coordinated by our team
          </div>

          {/* Heading */}
          <h1
            className="animate-fade-up text-[40px] font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl md:text-full xl:text-[82px]"
            style={{ animationDelay: "0.25s" }}
          >
            YOUR FITNESS
            <br />
            JOURNEY
            <br />
            STARTS <span className="text-white/30">HERE.</span>
          </h1>

          {/* Description */}
          <p
            className="animate-fade-up mt-9 max-w-xl text-[14px] leading-[1.7] text-white/80 sm:mt-7 sm:text-lg sm:leading-7"
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
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 hover:shadow-xl active:scale-[0.98] sm:w-auto sm:px-7 sm:py-4"
            >
              Book a Demo
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/packages"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 active:scale-[0.98] sm:w-auto sm:px-7 sm:py-4"
            >
              <Package size={18} />
              Explore Packages
            </Link>
          </div>

          {/* Trust points */}
          <div
            className="animate-fade-up mt-10 grid grid-cols-1 gap-4 text-[12px] font-medium text-white/90 sm:mt-10 sm:flex sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3 sm:text-base"
            style={{ animationDelay: "0.7s" }}
          >
            {trustPoints.map((point) => (
              <div key={point} className="flex items-center gap-2">
                <CheckCircle2
                  size={17}
                  className="shrink-0 text-white"
                />
                {point}
              </div>
            ))}
          </div>

          <p className="sr-only">{BRAND.tagline}</p>
        </div>

        {/* Desktop scroll indicator */}
        <div className="animate-soft-bounce absolute bottom-8 right-8 hidden flex-col items-center gap-2 text-white/50 lg:flex">
          <span className="text-xs uppercase tracking-widest [writing-mode:vertical-rl]">
            Scroll
          </span>
          <ChevronDown size={18} />
        </div>
      </div>
    </section>
  );
}