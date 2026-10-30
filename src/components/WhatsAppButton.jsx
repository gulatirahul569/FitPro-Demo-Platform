"use client";

import { usePathname } from "next/navigation";
import { BRAND } from "@/lib/brand";

// Digits only, with country code, no "+" (e.g. 919876543210)
const NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
const MESSAGE = "Hi! I'd like to know more about the in-home fitness demo.";

// Routes where the button should NOT appear. Change these to your real internal URLs.
const HIDE_ON = ["/admin", "/sales", "/dashboard", "/login"];

function WhatsAppIcon({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zM20.52 3.45A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const pathname = usePathname();

  if (!NUMBER) return null;
  if (HIDE_ON.some((p) => pathname?.startsWith(p))) return null;

  const href = `https://wa.me/${NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <div className="group fixed bottom-18 right-6 z-50 sm:bottom-10 sm:right-6">
      {/* Message: appears to the LEFT of the button on hover (or keyboard focus),
          so it never covers a scroll-to-top button above. The pr-3 keeps hover
          continuous between the button and the bubble. */}
      <div className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 pr-3 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          className="block w-60 rounded-2xl rounded-r-sm border border-slate-700 bg-slate-900 p-4 text-sm text-slate-200 shadow-xl shadow-black/40 sm:w-64"
        >
          <span className="block font-medium text-white">{BRAND.name}</span>
          <span className="mt-1 block leading-5 text-slate-300">
            Hi 👋 Have a question about the demo? Chat with us on WhatsApp.
          </span>
        </a>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition hover:scale-105 hover:bg-[#1ebe5a] focus:outline-none focus:ring-2 focus:ring-[#25D366]/50"
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}