import Link from "next/link";
import { ArrowRight, Home, User } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { MAIN_PACKAGES } from "@/lib/packages";
import PackageImage from "@/components/packages/PackageImage";

export default function PackagesPreview() {
  return (
    <section
      id="packages"
      className="scroll-mt-24 bg-[#070d17] px-6 py-16 md:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Our Packages
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/60 sm:text-base">
              Choose what suits your goals and request a demo. Our team will
              guide you through the rest.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {MAIN_PACKAGES.map((pkg, index) => (
            <Reveal key={pkg.slug} delay={index * 120}>
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f1a2b] transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-lg">
                <div className="h-48 overflow-hidden bg-[#0a1220]">
                  <PackageImage
                    src={pkg.image}
                    alt={pkg.name}
                    width={800}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
                  <p className="mt-1 text-sm text-white/60">
                    {pkg.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/55">
                    <span className="flex items-center gap-1.5">
                      <User size={14} /> {pkg.level}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Home size={14} /> {pkg.format}
                    </span>
                  </div>

                  <Link
                    href={`/book-demo?package=${pkg.slug}`}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-gray-100"
                  >
                    Book a Demo
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/packages"
            className="text-sm font-semibold text-white underline underline-offset-4 transition-colors hover:text-white/60"
          >
            See package details and prices
          </Link>
        </div>
      </div>
    </section>
  );
}