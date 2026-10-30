import "./globals.css";
import SessionWrapper from "@/components/providers/SessionWrapper";
import Chrome from "@/components/layout/Chrome";
import WhatsAppButton from "@/components/WhatsAppButton";
import { BRAND } from "@/lib/brand";

export const metadata = {
  title: {
    default: `${BRAND.name} | Book an In-Home Fitness Demo`,
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
          <Chrome>{children}</Chrome>
        </SessionWrapper>
        <WhatsAppButton />
      </body>
    </html>
  );
}