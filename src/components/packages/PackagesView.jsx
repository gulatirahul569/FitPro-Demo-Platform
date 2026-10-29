
import PackageCard from "./PackageCard";
import { listPackages } from "@/lib/models/package";
import {
  DriftBlobs,
  OrbitRing,
  FloatingChips,
} from "@/components/ui/Decor";

// Server component: reads active packages straight from the database.
export default async function PackagesView() {
  const [demoPackages, mainPackages] = await Promise.all([
    listPackages({ type: "demo" }),
    listPackages({ type: "main" }),
  ]);

  return (
    <div className="space-y-16">
      {/* Demo Packages */}
      <section
        id="demo-packages"
        className="relative isolate scroll-mt-28"
      >
        {/* Animated decorations */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <DriftBlobs className="opacity-50" />

          <OrbitRing className="right-0 top-0 -translate-y-1/4 translate-x-1/4 opacity-25" />

          <FloatingChips className="hidden opacity-30 md:block" />
        </div>

        {/* Section content */}
        <div className="relative z-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Start Here
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
            Demo Packages
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Try before you commit. Experience our training style with a
            one-session demo.
          </p>

          {demoPackages.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-slate-200 bg-white/70 p-5 text-sm text-slate-600">
              No demo packages available right now.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {demoPackages.map((pkg) => (
                <div
                  key={pkg.slug}
                  className="transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transform-none"
                >
                  <PackageCard pkg={pkg} isDemo />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Packages */}
      <section
        id="main-packages"
        className="relative isolate scroll-mt-28"
      >
        {/* Animated decorations */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <DriftBlobs className="opacity-40" />

          <OrbitRing className="left-0 top-8 -translate-x-1/3 opacity-20" />

          <FloatingChips className="hidden opacity-25 md:block" />
        </div>

        {/* Section content */}
        <div className="relative z-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Long-Term Training
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
            Our Main Packages
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Long-term programs designed to help you build consistency and
            achieve real results.
          </p>

          {mainPackages.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-slate-200 bg-white/70 p-5 text-sm text-slate-600">
              No main packages available right now.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {mainPackages.map((pkg) => (
                <div
                  key={pkg.slug}
                  className="transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transform-none"
                >
                  <PackageCard pkg={pkg} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
