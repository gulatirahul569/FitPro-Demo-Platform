import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/adminAuth";
import { createPackage, validatePackageInput } from "@/lib/models/package";

export async function POST(request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { data, error } = validatePackageInput(body, { creating: true });
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  try {
    await createPackage(data);
  } catch (err) {
    if (err?.code === 11000) {
      return NextResponse.json(
        { error: "A package with this slug already exists." },
        { status: 409 }
      );
    }
    console.error("Create package failed:", err);
    return NextResponse.json(
      { error: "Could not save the package." },
      { status: 500 }
    );
  }

  revalidatePath("/packages");
  revalidatePath("/book-demo");
  revalidatePath("/admin/packages");

  return NextResponse.json({ slug: data.slug }, { status: 201 });
}