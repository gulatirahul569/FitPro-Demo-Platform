"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Package,
} from "lucide-react";
import { BRAND } from "@/lib/brand";

// Keep trust points to claims the client can back up
const trustPoints = [
  "Trainer matched to your goals",
  "Training at your home",
  "Personalized plans",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-50 text-black md:min-h-screen">
      {/* ================= BACKGROUND IMAGE ================= */}
      <div className="absolute inset-0 h-full w-full">
        <picture>
          {/* Mobile background */}
          <source
            media="(max-width: 767px)"
            srcSet="https://images.pexels.com/photos/6811166/pexels-photo-6811166.jpeg"
          />

          {/* Desktop background */}
          <img
            src="https://images.pexels.com/photos/6311509/pexels-photo-6311509.jpeg"
            alt="Fitness trainer working out"
            className="h-full w-full object-cover object-center animate-kenburns"
          />
        </picture>

        <div className="absolute inset-0 bg-white/2" />
      </div>

      {/* ================= HERO CONTENT ================= */}
      <div className="relative mx-auto flex max-w-7xl items-center px-6 sm:px-6 sm:py-16 md:mt-0 md:min-h-0 lg:min-h-screen lg:px-8 lg:py-20">
        <div className="mt-12 w-full max-w-2xl">
          {/* Badge */}
          <div
            className="animate-fade-up mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3.5 py-2 text-xs font-medium text-black shadow-sm backdrop-blur-md sm:mb-6 sm:px-4 sm:text-sm"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-dark" />
            </span>

            Home fitness demo, coordinated by our team
          </div>

          {/* Heading */}
          <h1
            className="animate-fade-up text-[42px] font-black leading-[0.94] tracking-[-0.045em] text-black sm:text-6xl md:text-7xl xl:text-[82px]"
            style={{ animationDelay: "0.25s" }}
          >
            YOUR FITNESS
            <br />
            JOURNEY
            <br />
            STARTS <span className="text-brand-dark">HERE.</span>
          </h1>

          {/* Description */}
          <p
            className="animate-fade-up mt-6 max-w-xl text-sm leading-6 text-black/70 sm:mt-7 sm:text-lg sm:leading-7"
            style={{ animationDelay: "0.4s" }}
          >
            Personalized coaching with a trainer suited to your goals and
            location. Book a demo and experience it at home before you commit.
          </p>

          {/* Buttons */}
          <div
            className="animate-fade-up mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row"
            style={{ animationDelay: "0.55s" }}
          >
            <Link
              href="/book-demo"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-white bg-black transition-all duration-300 hover:-translate-y-1 hover:bg-brand-hover hover:shadow-xl active:scale-[0.98] sm:w-auto sm:px-7 sm:py-4"
            >
              Book a Demo

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/packages"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-black/15 bg-white/80 px-6 py-3.5 text-sm font-bold text-black backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-black hover:bg-black hover:text-white hover:shadow-lg active:scale-[0.98] sm:w-auto sm:px-7 sm:py-4"
            >
              <Package size={18} />
              Explore Packages
            </Link>
          </div>

          {/* Trust points */}
          <div
            className="animate-fade-up mt-10 grid grid-cols-1 gap-2.5 text-sm font-medium text-black/80 sm:flex sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3 sm:text-base"
            style={{ animationDelay: "0.7s" }}
          >
            {trustPoints.map((point) => (
              <div key={point} className="flex items-center gap-2">
                <CheckCircle2
                  size={17}
                  className="shrink-0 text-black"
                />
                {point}
              </div>
            ))}
          </div>

          <p className="sr-only">{BRAND.tagline}</p>
        </div>

        {/* Scroll indicator */}
        <div className="animate-soft-bounce absolute bottom-8 right-8 hidden flex-col items-center gap-2 text-black/45 lg:flex">
          <span className="text-xs uppercase tracking-widest [writing-mode:vertical-rl]">
            Scroll
          </span>

          <ChevronDown size={18} />
        </div>
      </div>
    </section>
  );
}