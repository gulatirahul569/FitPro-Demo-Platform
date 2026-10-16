import Link from "next/link";
import { ArrowRight, Home, User } from "lucide-react";
import { formatPrice } from "@/lib/packages";
import PackageImage from "./PackageImage";

export default function PackageCard({ pkg, isDemo = false }) {
  return (
    <div className="group relative isolate flex min-h-[460px] transform-gpu flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-[#0f1a2b] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-white hover:shadow-xl hover:shadow-black/40 sm:min-h-[500px]">
      {/* Full-card background image */}
      <PackageImage
        src={pkg.image}
        alt={pkg.name}
        width={700}
        className="absolute inset-0 -z-20 h-full w-full transition-transform duration-700 will-change-transform group-hover:scale-105"
      />

      {/* Dark fade so the text stays readable on any photo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/60 to-black/5" />

      {isDemo && (
        <span className="absolute left-3 top-3 rounded-md bg-white px-2.5 py-1 text-[11px] font-bold text-black">
          Demo
        </span>
      )}

      {/* Content over the image */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
        <p className="mt-1 text-sm leading-6 text-white/70">
          {pkg.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/80">
          <p className="flex items-center gap-1.5">
            <User size={14} className="text-white" />
            {pkg.level}
          </p>
          <p className="flex items-center gap-1.5">
            <Home size={14} className="text-white" />
            {pkg.format}
          </p>
        </div>

        {pkg.benefits && (
          <ul className="mt-4 space-y-1.5 text-sm text-white/80">
            {pkg.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white-400" />
                {benefit}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex items-end justify-between">
          <p className="text-2xl font-extrabold text-white">
            {formatPrice(pkg.price)}
          </p>
          <p className="text-xs text-white/60">{pkg.sessions}</p>
        </div>

        <Link
          href={`/book-demo?package=${pkg.slug}`}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-white"
        >
          {isDemo ? "Book Demo" : "Request a Demo"}
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
