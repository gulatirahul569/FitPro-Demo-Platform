"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Dumbbell,
  User,
  Calendar,
  BookOpen,
  Settings,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  PlayCircle,
  Building2,
  ChevronDown,
  Briefcase,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { FEATURES } from "@/lib/features";

const allLinks = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/#our-story", label: "About" },
  { href: "/contact", label: "Contact" },
  // Hidden by feature flags (code kept for later phases)
  { href: "/trainers", label: "Trainers", flag: "publicTrainerDirectory" },
  { href: "/videos", label: "Videos", flag: "publicVideoLibrary" },
  { href: "/gyms", label: "Gyms", flag: "gyms" },
];

const navLinks = allLinks.filter((link) => !link.flag || FEATURES[link.flag]);

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const [profileMenu, setProfileMenu] = useState(false);

  const isLoggedIn = status === "authenticated";
  const user = session?.user;
  const firstName = user?.name?.split(" ")[0];

  const role = user?.role;

  const isNormalUser = role === "user";
  const isTrainer = role === "trainer";
  const isAdmin = role === "admin";
  const isGymOwner = role === "gym-owner";
  const isSales = role === "sales";

  const isDashboard =
    pathname.startsWith("/user/") ||
    pathname.startsWith("/trainer/") ||
    pathname.startsWith("/admin/") ||
    pathname.startsWith("/sales/") ||
    pathname.startsWith("/gym-owner/");

  const showBecomeTrainer =
    FEATURES.becomeTrainer && (!isLoggedIn || isNormalUser);

  // Book a Demo is for visitors and customers, not staff
  const showBookDemo = !isLoggedIn || isNormalUser;

  // Every public page uses the same dark navbar. Dashboards keep the white one.
  const isDarkPage = !isDashboard;

  const handleLogout = async () => {
    setProfileMenu(false);

    await signOut({
      callbackUrl: "/",
    });
  };

  const closeMenu = () => setProfileMenu(false);

  const bookDemoButton = (
    <Link
      href="/book-demo"
      className={`rounded-full px-5 py-2.5 text-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
        isDarkPage
          ? "bg-white text-black hover:bg-gray-100"
          : "bg-black text-white hover:bg-gray-800"
      }`}
    >
      Book a Demo
    </Link>
  );

  return (
    // Mobile uses BottomNav instead of a top header, so this is desktop-only.
    <header
      className={`z-50 hidden transition-colors duration-300 md:block ${
        isDashboard
          ? "relative border-b border-gray-200 bg-white"
          : "fixed inset-x-0 top-0 border-b border-white/10 bg-[#070d17]"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-full items-center justify-between px-12">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ease-out group-hover:rotate-12 ${
              isDarkPage
                ? "border border-white/20 bg-white/10 text-white"
                : "bg-black text-white"
            }`}
          >
            <Dumbbell size={22} />
          </div>

          <span
            className={`text-3xl font-extrabold tracking-tight transition-colors duration-300 ${
              isDarkPage ? "text-white" : "text-black"
            }`}
          >
            {BRAND.nameParts[0]}
            <span className={isDarkPage ? "text-white/50" : "text-gray-500"}>
              {BRAND.nameParts[1]}
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative text-lg font-medium transition-colors duration-300 ${
                isDarkPage
                  ? "text-white hover:text-white"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              {link.label}

              <span
                className={`absolute -bottom-1 left-0 h-[1.5px] w-0 transition-all duration-300 ease-out group-hover:w-full ${
                  isDarkPage ? "bg-white" : "bg-black"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          {!isLoggedIn && (
            <>
              {showBecomeTrainer && (
                <Link
                  href="/become-trainer"
                  className={`rounded-full px-5 py-2.5 text-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                    isDarkPage
                      ? "bg-white text-black hover:bg-gray-100"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  Become a Trainer
                </Link>
              )}

              <Link
                href="/login"
                className={`rounded-full border px-5 py-2.5 text-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                  isDarkPage
                    ? "border-white/50 text-white hover:bg-white hover:text-black"
                    : "border-black text-black hover:bg-black hover:text-white"
                }`}
              >
                Login
              </Link>

              {bookDemoButton}
            </>
          )}

          {isLoggedIn && (
            <div className="flex items-center gap-3">
              {showBecomeTrainer && (
                <Link
                  href="/become-trainer"
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                    isDarkPage
                      ? "border border-white/40 text-white hover:bg-white hover:text-black"
                      : "border border-black text-black hover:bg-black hover:text-white"
                  }`}
                >
                  Become a Trainer
                </Link>
              )}

              {showBookDemo && bookDemoButton}

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileMenu((current) => !current)}
                  className={`flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 transition-colors duration-300 ${
                    isDarkPage
                      ? "border border-white/30 bg-white/10 hover:border-white/50"
                      : "border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                      isDarkPage ? "bg-white text-black" : "bg-black text-white"
                    }`}
                  >
                    {firstName?.charAt(0)?.toUpperCase()}
                  </div>

                  <span
                    className={`text-sm font-medium ${
                      isDarkPage ? "text-white" : "text-black"
                    }`}
                  >
                    {firstName}
                  </span>

                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      profileMenu ? "rotate-180" : ""
                    } ${isDarkPage ? "text-white/80" : "text-gray-500"}`}
                  />
                </button>

                {profileMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={closeMenu} />

                    <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
                      <div className="border-b border-gray-100 px-4 py-4">
                        <p className="font-semibold text-black">{user?.name}</p>

                        <p className="text-sm text-gray-500">{user?.email}</p>

                        {role && (
                          <p className="mt-1 text-xs capitalize text-gray-400">
                            {role}
                          </p>
                        )}
                      </div>

                      <div className="py-2">
                        {isNormalUser && (
                          <>
                            <ProfileMenuItem href="/user/profile" icon={User} label="My Profile" onClick={closeMenu} />
                            <ProfileMenuItem href="/user/bookings" icon={Calendar} label="My Bookings" onClick={closeMenu} />
                            <ProfileMenuItem href="/user/training" icon={BookOpen} label="My Training" onClick={closeMenu} />
                            <ProfileMenuItem href="/user/videos" icon={PlayCircle} label="Session Videos" onClick={closeMenu} />
                            <ProfileMenuItem href="/user/settings" icon={Settings} label="Settings" onClick={closeMenu} />
                          </>
                        )}

                        {isTrainer && (
                          <>
                            <ProfileMenuItem href="/trainer/profile" icon={User} label="My Profile" onClick={closeMenu} />
                            <ProfileMenuItem href="/trainer/dashboard" icon={LayoutDashboard} label="Trainer Dashboard" onClick={closeMenu} />
                            <ProfileMenuItem href="/trainer/settings" icon={Settings} label="Settings" onClick={closeMenu} />
                          </>
                        )}

                        {isSales && (
                          <ProfileMenuItem href="/sales/dashboard" icon={Briefcase} label="Sales Dashboard" onClick={closeMenu} />
                        )}

                        {FEATURES.gyms && isGymOwner && (
                          <>
                            <ProfileMenuItem href="/gym-owner/dashboard" icon={Building2} label="Gym Owner Dashboard" onClick={closeMenu} />
                            <ProfileMenuItem href="/gym-owner/profile" icon={Building2} label="Gym Profile" onClick={closeMenu} />
                            <ProfileMenuItem href="/gym-owner/trainers" icon={Calendar} label="Trainer Requests" onClick={closeMenu} />
                            <ProfileMenuItem href="/gym-owner/settings" icon={Settings} label="Settings" onClick={closeMenu} />
                          </>
                        )}

                        {isAdmin && (
                          <>
                            <ProfileMenuItem href="/admin/profile" icon={User} label="My Profile" onClick={closeMenu} />
                            <ProfileMenuItem href="/admin/dashboard" icon={ShieldCheck} label="Admin Dashboard" onClick={closeMenu} />
                            <ProfileMenuItem href="/admin/settings" icon={Settings} label="Settings" onClick={closeMenu} />
                          </>
                        )}
                      </div>

                      <div className="border-t border-gray-100 py-2">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                        >
                          <LogOut size={17} />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function ProfileMenuItem({ href, icon: Icon, label, onClick, light = false }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
        light
          ? "text-white/90 hover:bg-white/10 hover:text-white"
          : "text-gray-700 hover:bg-gray-50 hover:text-black"
      }`}
    >
      <Icon size={17} />
      {label}
    </Link>
  );
}