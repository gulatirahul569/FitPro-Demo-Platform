import Link from "next/link";
import { ArrowRight, Dumbbell, Package, Sparkles } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import PackageImage from "@/components/packages/PackageImage";

export default function FinalCta() {
  return (
    // overflow-hidden stops the rotating shapes from causing horizontal scroll
    <section className="overflow-hidden bg-[#e6e8f2] px-6 py-12 pt-0 sm:px-6 sm:py-16 md:px-8 md:py-4 md:pb-10
    .
    
     lg:px-6">
      <div className="mx-auto grid max-w-full grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-2 md:gap-12 lg:gap-16 lg:px-6">
        {/* ================= CONTENT / LEFT ================= */}
        <Reveal>
          <div className="relative flex min-h-[420px] flex-col items-start justify-center md:min-h-[520px] lg:min-h-[580px]">
            {/* ---------- Decorative motion layer (behind the text) ---------- */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0"
            >
              {/* Orbit: dashed outer ring with a dumbbell travelling around it */}
              <div className="absolute -right-10 top-0 h-56 w-56 sm:right-0 sm:h-64 sm:w-64 lg:h-72 lg:w-72">
                {/* outer ring */}
                <div className="absolute inset-0 animate-[spin_40s_linear_infinite] rounded-full border-2 border-dashed border-slate-300/70 motion-reduce:animate-none">
                  <span className="absolute left-1/2 top-0 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg shadow-slate-900/20">
                    <Dumbbell size={18} />
                  </span>
                </div>

                {/* inner ring, spins the opposite way */}
                <div className="absolute inset-8 animate-[spin_26s_linear_infinite_reverse] rounded-full border border-slate-300 motion-reduce:animate-none">
                  <span className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-orange-500" />
                  <span className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400" />
                </div>

                {/* soft glow in the middle */}
                <div className="absolute inset-[38%] rounded-full bg-gradient-to-br from-orange-400/30 to-slate-300/30 blur-xl" />
              </div>

              {/* Rotating text badge, bottom of the column */}
              <div className="absolute bottom-2 right-4 hidden h-28 w-28 sm:block lg:bottom-6 lg:right-10 lg:h-32 lg:w-32">
                <svg
                  viewBox="0 0 100 100"
                  className="h-full w-full animate-[spin_18s_linear_infinite] motion-reduce:animate-none"
                >
                  <defs>
                    <path
                      id="fitpro-badge-circle"
                      d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    />
                  </defs>
                  <text
                    className="fill-slate-700"
                    style={{ fontSize: 9, fontWeight: 700 }}
                  >
                    <textPath
                      href="#fitpro-badge-circle"
                      textLength="236"
                      lengthAdjust="spacing"
                    >
                      Book a demo • Trainers at your home •{" "}
                    </textPath>
                  </text>
                </svg>
                <span className="absolute inset-0 m-auto flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white shadow-md shadow-orange-500/30 lg:h-12 lg:w-12">
                  <Dumbbell size={18} />
                </span>
              </div>
            </div>

            {/* ---------- Actual content ---------- */}
            <div className="relative z-10 flex flex-col items-start">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-2 text-xs font-semibold text-orange-700 sm:mb-5 sm:px-4">
                <Sparkles size={15} className="animate-pulse text-orange-500" />
                Your next step starts here
              </div>

              <h2 className="text-2xl font-black leading-[1.02] tracking-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl">
                Your Fitness Journey
                <br />
                <span className="bg-slate-600 bg-clip-text text-transparent">
                  Starts Today.
                </span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-6 text-slate-600 sm:mt-6 sm:text-base sm:leading-7 md:text-lg">
                Request a demo, and our team will contact you to agree a time
                and match you with a suitable trainer at your home.
              </p>

              <div className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row md:mt-9">
                <Link
                  href="/book-demo"
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl active:scale-[0.98] sm:w-auto sm:px-8 sm:py-4"
                >
                  {/* Shine sweep on hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[400%]"
                  />
                  <span className="relative">Request Your Demo</span>

                  <ArrowRight
                    size={18}
                    className="relative transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/packages"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 hover:text-slate-600 hover:shadow-md active:scale-[0.98] sm:w-auto sm:px-8 sm:py-4"
                >
                  <Package size={18} />
                  View Packages
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ================= IMAGE / RIGHT ================= */}
        <Reveal delay={120}>
          <div className="group relative mx-auto w-full max-w-md sm:max-w-lg md:max-w-none">
            {/* Offset frame */}
            <div className="absolute -right-3 -top-3 h-full w-full rounded-2xl border border-slate-200 bg-white sm:-right-4 sm:-top-4 sm:rounded-3xl" />

            <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-xl shadow-slate-900/10 sm:h-80 md:h-96 lg:h-[580px]">
              {/* Mobile image */}
              <PackageImage
                src="https://images.pexels.com/photos/34100808/pexels-photo-34100808.jpeg"
                alt="Person exercising in a fitness gym"
                width={800}
                className="block h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 sm:hidden"
              />

              {/* Desktop image */}
              <PackageImage
                src="https://images.pexels.com/photos/36986181/pexels-photo-36986181.jpeg"
                alt="Person exercising in a fitness gym"
                width={1200}
                className="hidden h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 sm:block"
              />

              {/* Dark fade so the white caption stays readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-5 md:p-6 lg:p-8">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/80 sm:text-xs">
                  Stronger every day
                </p>

                <p className="max-w-xs text-base font-bold leading-tight text-white sm:text-lg md:text-xl lg:text-2xl">
                  Start with a trainer who understands your goals.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}