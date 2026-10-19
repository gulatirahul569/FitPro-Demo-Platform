"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  ClipboardList,
  ArrowLeft,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { BRAND } from "@/lib/brand";

const navItems = [
  { href: "/sales/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/sales/leads", label: "Leads", icon: ClipboardList },
  { href: "/sales/demo-bookings", label: "Demo-booking", icon: ClipboardList },
];

export default function SalesShell({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    setSidebarOpen(false);
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-x-0 top-0 bottom-16 z-30 bg-black/50 md:bottom-0 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed bottom-16 left-0 top-0 z-40 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 md:bottom-0 lg:sticky lg:h-screen ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-18 items-center justify-between border-b border-gray-100 px-6">
          <Link href="/" className="text-xl font-extrabold text-black">
            {BRAND.nameParts[0]}
            <span className="text-gray-400">{BRAND.nameParts[1]}</span>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 transition-colors hover:text-black lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-100 p-4">
          <Link
            href="/"
            className="hidden items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-black lg:flex"
          >
            <ArrowLeft size={18} />
            Back to Website
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 lg:hidden"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="sticky top-0 z-20 flex h-16 items-center border-b border-gray-200 bg-white px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 transition-colors hover:text-black"
          >
            <Menu size={24} />
          </button>
          <span className="ml-4 font-semibold text-black">Sales Dashboard</span>
        </div>

        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}