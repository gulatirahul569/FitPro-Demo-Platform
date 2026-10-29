import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import PackageImage from "@/components/packages/PackageImage";
import { HeartbeatLine } from "@/components/ui/Decor";

export default function AboutFinalCta() {
  return (
    <section className="bg-[#e6e8f2] px-6 py-16 sm:py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-full">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-slate-200 px-6 py-12 text-center shadow-xl shadow-slate-900/10 sm:px-10 sm:py-16">
            {/* Background image */}
            <PackageImage
              src="https://images.pexels.com/photos/5810663/pexels-photo-5810663.jpeg"
              alt="Trainer conducting an in-home fitness demo"
              width={1600}
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

            {/* Lavender overlay so the slate text stays readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/35 to-black/25" />


            {/* CTA content */}
            <div className="relative z-10">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white sm:text-xs">
                Get Started
              </p>

              <h2 className="mx-auto max-w-3xl text-3xl font-black leading-tight text-gray-100 sm:text-4xl md:text-5xl">
                Ready to experience a
                <br />
                <span className="bg-gradient-to-r from-slate-300 to-slate-200 bg-clip-text text-transparent">
                  fitness demo at home?
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                Request a demo and our team will contact you to check trainer
                availability and agree on a suitable time.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/book-demo"
                  className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-slate-900 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl active:scale-[0.98] sm:w-auto"
                >
                  {/* Shine sweep on hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[400%]"
                  />
                  <span className="relative">Book a Demo</span>
                  <ArrowRight
                    size={18}
                    className="relative transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/packages"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/80 px-7 py-3.5 text-sm font-bold text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 hover:bg-white hover:text-slate-600 hover:shadow-md active:scale-[0.98] sm:w-auto"
                >
                  <Package size={18} />
                  View Packages
                </Link>
              </div>

              <p className="mt-6 text-xs text-slate-300 sm:text-sm">
                Submitting a request does not confirm a demo. Our team will
                contact you to coordinate the next steps.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}