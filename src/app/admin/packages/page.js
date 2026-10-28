import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/lib/adminAuth";
import { listPackages } from "@/lib/models/package";
import { formatPrice } from "@/lib/packages";

export const metadata = { title: "Packages" };
export const dynamic = "force-dynamic";

export default async function AdminPackagesPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/login");

  const packages = await listPackages({ activeOnly: false });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-black">Packages</h1>
          <p className="mt-1 text-gray-500">
            {packages.length} package{packages.length === 1 ? "" : "s"}
          </p>
        </div>

        <Link
          href="/admin/packages/new"
          className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          <Plus size={16} />
          Add package
        </Link>
      </div>

      {packages.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center text-sm text-gray-400">
          No packages yet. Run the seed script or add one.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Sessions</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {packages.map((pkg) => (
                <tr key={pkg.slug}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-black">{pkg.name}</p>
                    <p className="text-xs text-gray-400">{pkg.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        pkg.type === "main"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-sky-100 text-sky-700"
                      }`}
                    >
                      {pkg.type === "main" ? "Main" : "Demo"}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-black">{formatPrice(pkg.price)}</td>
                  <td className="px-4 py-3 text-gray-600">{pkg.sessions || "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        pkg.active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {pkg.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/packages/${pkg.slug}`}
                      className="text-sm font-semibold text-gray-700 underline-offset-2 hover:text-black hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}