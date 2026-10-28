import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import { getPackageBySlug } from "@/lib/models/package";
import PackageForm from "@/components/admin/PackageForm";

export const metadata = { title: "Edit Package" };
export const dynamic = "force-dynamic";

export default async function EditPackagePage({ params }) {
  const admin = await requireAdmin();
  if (!admin) redirect("/login");

  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);

  if (!pkg) notFound();

  return (
    <div>
      <Link href="/admin/packages" className="text-sm text-gray-500 hover:text-black">
        ← Back to packages
      </Link>
      <h1 className="mb-6 mt-2 text-2xl font-bold text-black">Edit {pkg.name}</h1>
      <PackageForm pkg={pkg} />
    </div>
  );
}