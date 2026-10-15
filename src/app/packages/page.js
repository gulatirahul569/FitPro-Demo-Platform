import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  PACKAGES_BANNER_IMAGE,
  PACKAGES_BANNER_IMAGE_MOBILE,
} from "@/lib/packages";
import PackagesView from "@/components/packages/PackagesView";

export const metadata = {
  title: "Packages",
  description:
    "Explore demo and full training packages. Request a demo and our team will guide you.",
};

export default function PackagesPage() {
  return (
    <main className="bg-gray-50 pb-20">
      {/* TOP BANNER */}
      <section className="relative isolate overflow-hidden border-b border-black/5 bg-gray-100 text-black">
        {PACKAGES_BANNER_IMAGE && (
          <picture>
            {PACKAGES_BANNER_IMAGE_MOBILE && (
              <source
                media="(max-width: 767px)"
                srcSet={PACKAGES_BANNER_IMAGE_MOBILE}
              />
            )}

            <img
              src={PACKAGES_BANNER_IMAGE}
              alt="FitPro personal training"
              className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
            />
          </picture>
        )}

        <div className="absolute inset-0 -z-0 bg-gradient-to-r from-black/40 via-black/30 to-black/20" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-14 pt-14 md:px-12 md:pb-20 md:pt-40">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white sm:text-xs">
            FitPro Programs
          </p>

          <h1 className="text-4xl text-white font-bold leading-tight sm:text-5xl md:text-6xl">
            Our Packages
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-white sm:text-base sm:leading-7">
            Start with a single demo session or choose a complete training
            program. Find the right fitness plan for your goals.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#demo-packages"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg"
            >
              Explore Demo Packages
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="#main-packages"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/20 bg-white/90 px-6 py-3.5 text-sm font-bold text-black transition-colors hover:bg-white"
            >
              View Full Programs
              <ChevronDown size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* BOTH PACKAGE TYPES ON THE SAME PAGE */}
      <div className="mx-auto max-w-7xl px-6 pt-10 md:px-12">
        <PackagesView />

        {/* CLOSING CTA */}
        <section className="mt-16 rounded-2xl border border-black/10 bg-white p-8 text-center shadow-sm md:p-12">
          <h2 className="text-2xl font-bold text-black md:text-3xl">
            Ready to get started?
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-black/60">
            Book a demo session and let our team help you find the right
            training program.
          </p>

          <Link
            href="/book-demo"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800"
          >
            Book a Demo
            <ArrowRight size={17} />
          </Link>
        </section>
      </div>
    </main>
  );
}
