import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import PackageForm from "@/components/admin/PackageForm";

export const metadata = { title: "Add Package" };

export default async function NewPackagePage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/login");

  return (
    <div>
      <Link href="/admin/packages" className="text-sm text-gray-500 hover:text-black">
        ← Back to packages
      </Link>
      <h1 className="mb-6 mt-2 text-2xl font-bold text-black">Add package</h1>
      <PackageForm />
    </div>
  );
}