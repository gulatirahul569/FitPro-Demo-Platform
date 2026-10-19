import { auth } from "@/auth";

// Returns the user if they are sales or admin, otherwise null
export async function requireSales() {
  const session = await auth();
  const user = session?.user;
  if (!user) return null;
  if (user.role !== "sales" && user.role !== "admin") return null;
  return user;
}