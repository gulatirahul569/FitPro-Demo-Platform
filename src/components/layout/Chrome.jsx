"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/Bottomnav";
import ScrollToTop from "@/components/ui/ScrollToTop";

// Pages that should render without navbar, footer and bottom nav
const BARE_ROUTES = ["/login", "/register"];

export default function Chrome({ children }) {
  const pathname = usePathname();

  if (BARE_ROUTES.includes(pathname)) {
    return <div className="bg-[#070d17]">{children}</div>;
  }

  return (
    <>
      <Navbar />

      {/* pb-16 keeps content clear of the fixed mobile BottomNav */}
      <div className="bg-[#070d17] pb-16 md:pb-0">
        {children}
        <ScrollToTop />
        <Footer />
      </div>

      <BottomNav />
    </>
  );
}