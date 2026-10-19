import Link from "next/link";
import { ArrowRight, Home, User } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { MAIN_PACKAGES } from "@/lib/packages";
import PackageImage from "@/components/packages/PackageImage";

export default function PackagesPreview() {
  return (
    <section
      id="packages"
      className="scroll-mt-24 bg-[#070d17] px-4 py-12 sm:px-6 md:px-12 md:py-16"
    >
      <div className="mx-auto max-w-full">
        <Reveal>
          <div className="mb-8 text-center md:mb-10">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Our Packages
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/60 sm:text-base">
              Choose what suits your goals and request a demo. Our team will
              guide you through the rest.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-6">
          {MAIN_PACKAGES.map((pkg, index) => (
            <Reveal key={pkg.slug} delay={index * 120} className="h-full">
              <div className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f1a2b] transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-lg">
                <div className="h-36 overflow-hidden bg-[#0a1220] sm:h-44 md:h-48">
                  <PackageImage
                    src={pkg.image}
                    alt={pkg.name}
                    width={800}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col px-3 pb-4 pt-3 sm:px-4 md:p-5">
                  <h3 className="truncate text-sm font-bold text-white sm:text-base md:overflow-visible md:whitespace-normal md:text-lg">
                    {pkg.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 break-words text-xs leading-5 text-white/60 sm:text-sm md:line-clamp-none">
                    {pkg.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-white/55 sm:text-xs md:mt-4 md:gap-x-4 md:gap-y-2">
                    <span className="flex min-w-0 items-center gap-1.5">
                      <User size={13} className="shrink-0" />
                      <span className="truncate md:overflow-visible">
                        {pkg.level}
                      </span>
                    </span>
                    <span className="flex min-w-0 items-center gap-1.5">
                      <Home size={13} className="shrink-0" />
                      <span className="truncate md:overflow-visible">
                        {pkg.format}
                      </span>
                    </span>
                  </div>

                  <div className="mt-auto pt-4 md:pt-5">
                    <Link
                      href={`/book-demo?package=${pkg.slug}`}
                      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-3 py-2.5 text-xs font-bold text-black transition-colors hover:bg-gray-100 sm:px-5 sm:text-sm md:py-3"
                    >
                      Book a Demo
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 text-center md:mt-8">
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