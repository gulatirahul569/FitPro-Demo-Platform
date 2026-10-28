import PackageCard from "./PackageCard";
import { listPackages } from "@/lib/models/package";

// Server component: reads active packages straight from the database.
export default async function PackagesView() {
  const [demoPackages, mainPackages] = await Promise.all([
    listPackages({ type: "demo" }),
    listPackages({ type: "main" }),
  ]);

  return (
    <>
      <section id="demo-packages" className="scroll-mt-28">
        <h2 className="text-2xl font-bold text-white">Demo Packages</h2>
        <p className="mt-1 text-sm text-white/60">
          Try before you commit. Experience our training style with a 1 session
          demo.
        </p>

        {demoPackages.length === 0 ? (
          <p className="mt-6 text-sm text-white/50">
            No demo packages available right now.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {demoPackages.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} isDemo />
            ))}
          </div>
        )}
      </section>

      <section id="main-packages" className="scroll-mt-28 pt-16">
        <h2 className="text-2xl font-bold text-white">Our Main Packages</h2>
        <p className="mt-1 text-sm text-white/60">
          Long-term programs for real results.
        </p>

        {mainPackages.length === 0 ? (
          <p className="mt-6 text-sm text-white/50">
            No main packages available right now.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mainPackages.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}