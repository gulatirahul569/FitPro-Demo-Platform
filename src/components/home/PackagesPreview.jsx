import Link from "next/link";
import { ArrowRight, Home, User } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { listPackages } from "@/lib/models/package";
import PackageImage from "@/components/packages/PackageImage";
import { SpinStar } from "@/components/ui/Decor";

// Server component: reads active DEMO packages straight from the database.
export default async function PackagesPreview() {
  const packages = await listPackages({ type: "demo" });

  // Nothing to show (e.g. all demo packages switched off in admin): hide the section.
  if (packages.length === 0) return null;

  return (
    <section
      id="packages"
      className="relative scroll-mt-24 overflow-hidden bg-[#e6e8f2] px-4 py-12 sm:px-6 md:px-12 md:py-16"
    >

      {/* Two slowly turning stars flanking the heading (large screens only) */}
      <SpinStar className="left-[5%] top-6 hidden lg:block" />
      <SpinStar className="right-[6%] top-16 hidden origin-center scale-75 lg:block" />

      <div className="relative z-10 mx-auto max-w-full">
        <Reveal>
          <div className="mb-8 text-center md:mb-10">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Our{" "}
              <span className="bg-slate-600 bg-clip-text text-transparent">
                Packages
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
              Choose what suits your goals and request a demo. Our team will
              guide you through the rest.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-6">
          {packages.map((pkg, index) => (
            <Reveal key={pkg.slug} delay={index * 120} className="h-full">
              {/* Full-card image: it fills the whole card and the text sits on top. */}
              <div className="group relative isolate flex h-full min-h-[340px] min-w-0 flex-col justify-end overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1.5  hover:shadow-2xl hover:shadow-slate-900/20 sm:min-h-[400px] md:min-h-[440px]">
                <PackageImage
                  src={pkg.image}
                  alt={pkg.name}
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="absolute inset-0 -z-20 h-full w-full transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark fade so the text stays readable on any photo */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-transparent" />

                <span className="absolute left-3 top-3 rounded-md bg-gray-50 px-2.5 py-1 text-[11px] font-bold text-black shadow-md">
                  Demo
                </span>

                <div className="min-w-0 px-3 pb-4 pt-3 sm:px-4 md:p-5">
                  <h3 className="truncate text-sm font-bold text-white sm:text-base md:overflow-visible md:whitespace-normal md:text-lg">
                    {pkg.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 break-words text-xs leading-5 text-white/80 sm:text-sm md:line-clamp-none">
                    {pkg.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-white/80 sm:text-xs md:mt-4 md:gap-x-4 md:gap-y-2">
                    <span className="flex min-w-0 items-center gap-1.5">
                      <User size={13} className="shrink-0 text-orange-300" />
                      <span className="truncate md:overflow-visible">
                        {pkg.level}
                      </span>
                    </span>
                    <span className="flex min-w-0 items-center gap-1.5">
                      <Home size={13} className="shrink-0 text-orange-300" />
                      <span className="truncate md:overflow-visible">
                        {pkg.format}
                      </span>
                    </span>
                  </div>

                  <div className="pt-4 md:pt-5">
                    <Link
                      href={`/book-demo?package=${pkg.slug}`}
                      className="group/btn relative inline-flex min-h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-3 py-2.5 text-xs font-bold text-slate-900 transition-all duration-300 hover:bg-slate-500 hover:text-white active:scale-[0.98] sm:px-5 sm:text-sm md:py-3"
                    >
                      {/* Shine sweep on hover */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-[400%]"
                      />
                      <span className="relative">Book a Demo</span>
                      <ArrowRight
                        size={15}
                        className="relative transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
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
            className="group/link relative inline-block text-sm font-semibold text-slate-600 transition-colors hover:text-slate-700"
          >
            See package details and prices
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-100 bg-slate-500 transition-transform duration-300 group-hover/link:scale-x-50"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}