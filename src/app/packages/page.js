import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PackagesView from "@/components/packages/PackagesView";
import PackageImage from "@/components/packages/PackageImage";
import { getImageProps } from "next/image";
import {
  PACKAGES_BANNER_IMAGE,
  PACKAGES_BANNER_IMAGE_MOBILE,
  PACKAGES_CTA_IMAGE,
} from "@/lib/packages";

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
    <main className="bg-[#070d17] pb-20 text-white">
      {/* ================= TOP BANNER ================= */}
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#0f1a2b] via-[#0a1220] to-black">
        {desktop && (
          <picture>
            {mobile && (
              <source media="(max-width: 767px)" srcSet={mobile.props.srcSet} />
            )}
            <img
              {...desktop.props}
              className="absolute inset-0 -z-10 h-full w-full object-contain object-right"
            />
          </picture>
        )}

        {/* Dark fade keeps the text readable on any photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/20" />

        <div className="relative z-10 mx-auto max-w-full px-6 pb-12 pt-16 md:px-12 md:pb-16 md:pt-40">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-8xl">
            Our Packages
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
            Flexible options for every goal. Choose a demo package to try, or
            explore our full programs for long-term results.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="#demo-packages"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-white"
            >
              Demo Packages
            </Link>
            <Link
              href="#main-packages"
              className="rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Main Packages
            </Link>
          </div>
        </div>
      </section>

      {/* ================= PACKAGES ================= */}
      <div className="mx-auto max-w-full px-6 pt-12 md:px-12">
        <PackagesView />

        {/* ================= CLOSING BANNER ================= */}
        <section className="relative isolate mt-16 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f1a2b] to-black">
          {PACKAGES_CTA_IMAGE && (
            <PackageImage
              src={PACKAGES_CTA_IMAGE}
              alt=""
              width={1400}
              className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

          <div className="relative z-10 p-8 md:p-14">
            <h2 className="text-3xl font-bold md:text-4xl">
              Stronger. Healthier. <span className="text-white">Happier.</span>
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-white/70">
              Your goals. Our support. Real results. Book a demo and let our
              team help you find the right program.
            </p>

            <Link
              href="/book-demo"
              className="group mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-white"
            >
              Book a Demo
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
