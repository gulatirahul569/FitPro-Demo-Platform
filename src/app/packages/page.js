import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getImageProps } from "next/image";

import PackagesView from "@/components/packages/PackagesView";
import PackageImage from "@/components/packages/PackageImage";

import {
  PACKAGES_BANNER_IMAGE,
  PACKAGES_BANNER_IMAGE_MOBILE,
  PACKAGES_CTA_IMAGE,
} from "@/lib/packages";

import {
  DriftBlobs,
  OrbitRing,
} from "@/components/ui/Decor";

export const metadata = {
  title: "Packages",
  description:
    "Explore demo and full training packages. Request a demo and our team will guide you.",
};

export default function PackagesPage() {
  const common = {
    alt: "Personal training",
    fill: true,
    sizes: "100vw",
    priority: true,
  };

  const desktop = PACKAGES_BANNER_IMAGE
    ? getImageProps({ ...common, src: PACKAGES_BANNER_IMAGE })
    : null;

  const mobile = PACKAGES_BANNER_IMAGE_MOBILE
    ? getImageProps({ ...common, src: PACKAGES_BANNER_IMAGE_MOBILE })
    : null;

  return (
    <main className="min-h-screen bg-[#e6e8f2] text-slate-900">
      {/* ================= HERO ================= */}
      <section className="relative isolate overflow-hidden border-b border-slate-300/70 bg-[#e6e8f2]">
        {desktop && (
          <picture>
            {mobile && (
              <source
                media="(max-width: 767px)"
                srcSet={mobile.props.srcSet}
              />
            )}
            <img
              {...desktop.props}
              className="absolute inset-0 -z-20 h-full w-full object-cover object-right"
            />
          </picture>
        )}

        {/* Restrained image treatment */}
        <div className="absolute inset-0 -z-10 bg-[#e6e8f2]/5" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/40 via-black/15 to-black/5" />

        {/* Subtle decorations */}
        <DriftBlobs className="opacity-25" />
        <OrbitRing className="-right-24 top-12 opacity-20 sm:right-0 md:top-16" />

        <div className="relative z-10 mx-auto max-w-full px-6 pb-12 pt-16 md:px-12 md:pb-20 md:pt-36">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white">
            Find Your Fit
          </p>

          <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-7xl">
            Our Packages
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-200 sm:text-base sm:leading-8">
            Flexible options for every goal. Start with a demo package or
            explore our full training programs for lasting results.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#demo-packages"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-slate-700"
            >
              Explore Demo Packages
              <ArrowRight size={16} className="ml-2" />
            </Link>

            <Link
              href="#main-packages"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-white"
            >
              View Main Packages
            </Link>
          </div>
        </div>
      </section>

      {/* ================= PACKAGE LIST ================= */}
      <section className="relative isolate overflow-hidden bg-[#e6e8f2]">
        <DriftBlobs className="opacity-15" />

        <div className="relative z-10 mx-auto max-w-full px-6 py-10 md:px-12 md:py-14">
          <PackagesView />

          {/* ================= CLOSING CTA ================= */}
          <section className="group relative isolate mt-14 overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-lg shadow-slate-900/10 md:mt-20">
            {PACKAGES_CTA_IMAGE && (
              <PackageImage
                src={PACKAGES_CTA_IMAGE}
                alt=""
                width={1400}
                className="absolute inset-0 -z-20 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />
            )}

            {/* Keep white text readable over any image */}
            <div className="absolute inset-0 -z-10 bg-slate-950/30" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/40 via-slate-950/30 to-slate-950/10" />

            <OrbitRing
              dark
              className="-right-24 -top-16 opacity-20 sm:right-4 sm:top-0"
            />

            <div className="relative z-10 max-w-3xl p-7 sm:p-10 md:p-14">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-300">
                Start Your Journey
              </p>

              <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                Stronger. Healthier.
                <span className="block text-slate-300">Happier.</span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-slate-200 sm:text-base">
                Your goals. Our support. Real results. Book a demo and let our
                team help you find the right training program.
              </p>

              <Link
                href="/book-demo"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-200"
              >
                Book a Demo
                <ArrowRight size={17} />
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}