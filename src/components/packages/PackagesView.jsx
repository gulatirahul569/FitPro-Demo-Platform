import PackageCard from "./PackageCard";
import { DEMO_PACKAGES, MAIN_PACKAGES } from "@/lib/packages";

export default function PackagesView() {
  return (
    <>
      <section id="demo-packages" className="scroll-mt-28">
        <h2 className="text-2xl font-bold text-white">Demo Packages</h2>
        <p className="mt-1 text-sm text-white/60">
          Try before you commit. Experience our training style with a 1 session
          demo.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DEMO_PACKAGES.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} isDemo />
          ))}
        </div>
      </section>

      <section id="main-packages" className="scroll-mt-28 pt-16">
        <h2 className="text-2xl font-bold text-white">Our Main Packages</h2>
        <p className="mt-1 text-sm text-white/60">
          Long-term programs for real results.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 " >
          {MAIN_PACKAGES.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      </section>
    </>
  );
}