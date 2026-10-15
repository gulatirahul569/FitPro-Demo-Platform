import Link from "next/link";
import { ArrowRight, Home, User } from "lucide-react";
import { formatPrice } from "@/lib/packages";
import PackageImage from "./PackageImage";

export default function PackageCard({ pkg, isDemo = false }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-44 overflow-hidden">
        <PackageImage
          src={pkg.image}
          alt={pkg.name}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        {isDemo && (
          <span className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-xs font-bold text-white">
            Demo
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-black">{pkg.name}</h3>
        <p className="mt-1 text-sm text-black/60">{pkg.description}</p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-black/60">
          <span className="flex items-center gap-1.5">
            <User size={14} /> {pkg.level}
          </span>
          <span className="flex items-center gap-1.5">
            <Home size={14} /> {pkg.format}
          </span>
        </div>

        {pkg.benefits && (
          <ul className="mt-4 space-y-1.5 text-sm text-black/70">
            {pkg.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-black" />
                {benefit}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-end justify-between border-t border-black/10 pt-4">
          <p className="text-2xl font-black text-black">
            {formatPrice(pkg.price)}
          </p>
          <p className="text-xs text-black/50">{pkg.sessions}</p>
        </div>

        <Link
          href={`/book-demo?package=${pkg.slug}`}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800"
        >
          {isDemo ? "Book Demo" : "Request a Demo"}
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}