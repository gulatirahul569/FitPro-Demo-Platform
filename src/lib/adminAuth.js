// NOTE: change this import to wherever your NextAuth file exports `auth`
// (the file that has `export const { handlers, auth, signIn, signOut } = NextAuth(...)`).
import { auth } from "@/auth";

/**
 * Returns the session user if they are an admin, otherwise null.
 * Use in pages and API routes. Never rely on hiding the menu link alone.
 */
export async function requireAdmin() {
  const session = await auth();
  const user = session?.user;

  if (!user || user.role !== "admin") return null;

  return user;
}