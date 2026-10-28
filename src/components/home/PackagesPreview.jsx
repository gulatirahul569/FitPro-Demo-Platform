import Link from "next/link";
import { ArrowRight, Home, User } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { listPackages } from "@/lib/models/package";
import PackageImage from "@/components/packages/PackageImage";

// Server component: reads active DEMO packages straight from the database.
export default async function PackagesPreview() {
  const packages = await listPackages({ type: "demo" });

  // Nothing to show (e.g. all demo packages switched off in admin): hide the section.
  if (packages.length === 0) return null;

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
          {packages.map((pkg, index) => (
            <Reveal key={pkg.slug} delay={index * 120} className="h-full">
              {/* Full-card image: it fills the whole card and the text sits on top. */}
              <div className="group relative isolate flex h-full min-h-[340px] min-w-0 flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-[#0f1a2b] transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-lg sm:min-h-[400px] md:min-h-[440px]">
                <PackageImage
                  src={pkg.image}
                  alt={pkg.name}
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="absolute inset-0 -z-20 h-full w-full transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark fade so the text stays readable on any photo */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/70 to-black/5" />

                <span className="absolute left-3 top-3 rounded-md bg-white px-2.5 py-1 text-[11px] font-bold text-black">
                  Demo
                </span>

                <div className="min-w-0 px-3 pb-4 pt-3 sm:px-4 md:p-5">
                  <h3 className="truncate text-sm font-bold text-white sm:text-base md:overflow-visible md:whitespace-normal md:text-lg">
                    {pkg.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 break-words text-xs leading-5 text-white/70 sm:text-sm md:line-clamp-none">
                    {pkg.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-white/70 sm:text-xs md:mt-4 md:gap-x-4 md:gap-y-2">
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

                  <div className="pt-4 md:pt-5">
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