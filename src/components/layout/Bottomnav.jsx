"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Home,
  Users,
  PlayCircle,
  Building2,
  User,
  LogIn,
  Package,
  CalendarPlus,
  Info,
} from "lucide-react";
import { FEATURES } from "@/lib/features";

export default function BottomNav() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isLoggedIn = status === "authenticated";
  const role = session?.user?.role;

  const profileHref = isLoggedIn ? `/${role}/dashboard` : "/login";

  const isDashboard =
    pathname.startsWith("/user/") ||
    pathname.startsWith("/trainer/") ||
    pathname.startsWith("/admin/") ||
    pathname.startsWith("/sales/") ||
    pathname.startsWith("/gym-owner/");

  const isDarkPage = !isDashboard;

  const showBookDemo = !isLoggedIn || role === "user";

  const optionalTabs = [
    FEATURES.publicTrainerDirectory && {
      href: "/trainers",
      label: "Trainers",
      icon: Users,
      isActive: pathname.startsWith("/trainers"),
    },
    FEATURES.publicVideoLibrary && {
      href: "/videos",
      label: "Videos",
      icon: PlayCircle,
      isActive: pathname.startsWith("/videos"),
    },
    FEATURES.gyms && {
      href: "/gyms",
      label: "Gyms",
      icon: Building2,
      isActive: pathname.startsWith("/gyms"),
    },
  ].filter(Boolean);

  const homeTab = {
    href: "/",
    label: "Home",
    icon: Home,
    isActive: pathname === "/",
  };

  const packagesTab = {
    href: "/packages",
    label: "Packages",
    icon: Package,
    isActive: pathname.startsWith("/packages"),
  };

  const aboutTab = {
    href: "/about",
    label: "About",
    icon: Info,
    isActive: pathname === "/about" || (pathname === "/" && false),
  };

  const demoTab = {
    href: "/book-demo",
    label: "Book Demo",
    icon: CalendarPlus,
    isActive: pathname.startsWith("/book-demo"),
    highlight: true,
  };

  const profileTab = {
    href: profileHref,
    label: isLoggedIn ? "Dashboard" : "Login",
    icon: isLoggedIn ? User : LogIn,
    isActive: isLoggedIn ? isDashboard : pathname === "/login",
  };

  // Keep Book Demo in the center whenever it is available.
  // Five tabs: Home | Packages | Book Demo | About | Login/Dashboard
  const tabs = showBookDemo
    ? [homeTab, packagesTab, demoTab, aboutTab, profileTab]
    : [homeTab, packagesTab, aboutTab, profileTab];

  // Use optional feature tabs only if there is room.
  const finalTabs =
    optionalTabs.length > 0
      ? [
          ...tabs.slice(0, 2),
          ...optionalTabs.slice(0, Math.max(0, 5 - tabs.length)),
          ...tabs.slice(2),
        ].slice(0, 5)
      : tabs;

  const activeColor = isDarkPage ? "text-white" : "text-black";

  const idleColor = isDarkPage ? "text-white/50" : "text-gray-400";

  return (
    <nav
      className={`fixed inset-x-0 bottom-0 z-50 border-t md:hidden ${
        isDarkPage ? "border-white/10 bg-[#070d17]" : "border-gray-200 bg-white"
      }`}
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="flex h-16 items-stretch justify-around px-1">
        {finalTabs.map((tab) => {
          const Icon = tab.icon;

          if (tab.highlight) {
            return (
              <Link
                key={tab.label}
                href={tab.href}
                className="flex flex-1 flex-col items-center justify-center gap-1"
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition-transform ${
                    isDarkPage ? "bg-white text-black" : "bg-black text-white"
                  } ${tab.isActive ? "scale-110" : ""}`}
                >
                  <Icon size={20} strokeWidth={2.4} />
                </span>

                <span
                  className={`text-[10px] font-semibold ${
                    isDarkPage ? "text-white" : "text-black"
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={tab.label}
              href={tab.href}
              className="flex flex-1 flex-col items-center justify-center gap-1"
            >
              <Icon
                size={22}
                className={tab.isActive ? activeColor : idleColor}
                strokeWidth={tab.isActive ? 2.4 : 2}
              />

              <span
                className={`whitespace-nowrap text-[10px] font-medium ${
                  tab.isActive ? activeColor : idleColor
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
