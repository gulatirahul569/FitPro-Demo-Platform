import Link from "next/link";
import { ArrowRight, Home, User } from "lucide-react";
import { formatPrice } from "@/lib/packages";
import PackageImage from "./PackageImage";

export default function PackageCard({ pkg, isDemo = false, showPrice = true }) {
  return (
    <div className="group relative isolate flex h-[440px] min-w-0 transform-gpu flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-[#0f1a2b] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-white hover:shadow-xl hover:shadow-black/40 sm:h-auto sm:min-h-[500px]">
      {/* Full-card background image */}
      <PackageImage
        src={pkg.image}
        alt={pkg.name}
        width={700}
        className="absolute inset-0 -z-20 h-full w-full transition-transform duration-700 will-change-transform group-hover:scale-105"
      />

      {/* Dark fade so the text stays readable on any photo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/70 to-black/5 sm:via-black/60" />

      {isDemo && (
        <span className="absolute left-3 top-3 rounded-md bg-white px-2.5 py-1 text-[11px] font-bold text-black">
          Demo
        </span>
      )}

      {/* Content over the image */}
      <div className="min-w-0 px-4 pb-5 pt-4 sm:p-5">
        <h3 className="truncate text-lg font-bold text-white sm:overflow-visible sm:whitespace-normal sm:text-xl">
          {pkg.name}
        </h3>

        {/* Mobile: max 2 lines, then "..." */}
        <p className="mt-1 line-clamp-2 break-words text-sm leading-5 text-white/75 sm:line-clamp-none sm:leading-6 sm:text-white/70">
          {pkg.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-white/80 sm:mt-4 sm:gap-y-2">
          <p className="flex min-w-0 items-center gap-1.5">
            <User size={14} className="shrink-0 text-white" />
            <span className="truncate sm:overflow-visible">{pkg.level}</span>
          </p>
          <p className="flex min-w-0 items-center gap-1.5">
            <Home size={14} className="shrink-0 text-white" />
            <span className="truncate sm:overflow-visible">{pkg.format}</span>
          </p>
        </div>

        {pkg.benefits && (
          <ul className="mt-3 space-y-1 text-sm text-white/80 sm:mt-4 sm:space-y-1.5">
            {pkg.benefits.map((benefit) => (
              <li key={benefit} className="flex min-w-0 items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                <span className="truncate sm:overflow-visible sm:whitespace-normal">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        )}

        {showPrice && (
          <div className="mt-4 flex items-end justify-between sm:mt-5">
            <p className="text-2xl font-extrabold text-white">
              {formatPrice(pkg.price)}
            </p>
            <p className="text-xs text-white/60">{pkg.sessions}</p>
          </div>
        )}

        <Link
          href={`/book-demo?package=${pkg.slug}`}
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-gray-100 sm:mt-4"
        >
          {isDemo ? "Book Demo" : "Request a Demo"}
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}