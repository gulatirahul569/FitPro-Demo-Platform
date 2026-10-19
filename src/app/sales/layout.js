import { redirect } from "next/navigation";
import { auth } from "@/auth";
import SalesShell from "@/components/sales/SalesShell";

export default async function SalesLayout({ children }) {
  const session = await auth();
  const role = session?.user?.role;

  if (!session?.user) redirect("/login");
  if (role !== "sales" && role !== "admin") redirect("/");

  return <SalesShell>{children}</SalesShell>;
}