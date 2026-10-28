import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/adminAuth";
import { updatePackage, validatePackageInput } from "@/lib/models/package";

export async function PATCH(request, { params }) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Slug is never changed after creation (old leads/bookings point to it).
  const { data, error } = validatePackageInput(body, { creating: false });
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  try {
    const found = await updatePackage(slug, data);
    if (!found) {
      return NextResponse.json({ error: "Package not found." }, { status: 404 });
    }
  } catch (err) {
    console.error("Update package failed:", err);
    return NextResponse.json(
      { error: "Could not save the package." },
      { status: 500 }
    );
  }

  revalidatePath("/packages");
  revalidatePath("/book-demo");
  revalidatePath("/admin/packages");

  return NextResponse.json({ ok: true });
}