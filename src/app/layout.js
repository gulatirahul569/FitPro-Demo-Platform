import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SessionWrapper from "@/components/providers/SessionWrapper";
import ScrollToTop from "@/components/ui/ScrollToTop";
import BottomNav from "@/components/layout/Bottomnav";
import { BRAND } from "@/lib/brand";

export const metadata = {
  title: {
    default: `${BRAND.name} | Book a Free Home Fitness Demo`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Book an in-home fitness demo with a trainer matched to your goals and location. Personalized coaching, coordinated by our team.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070d17",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="bg-[#070d17]">
      <body className="bg-[#070d17]">
        <SessionWrapper>
          <Navbar />

          {/* pb-16 keeps content clear of the fixed mobile BottomNav */}
          <div className="bg-[#070d17] pb-16 md:pb-0">
            {children}
            <ScrollToTop />
            <Footer />
          </div>

          <BottomNav />
        </SessionWrapper>
      </body>
    </html>
  );
}