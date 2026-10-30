import { Heart, Home, Flame, Trophy, Activity } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { BRAND } from "@/lib/brand";
import PackageImage from "@/components/packages/PackageImage";
import { FloatingChips } from "@/components/ui/Decor";

// Chips float in the margins of the story column (md and up only).
// Tweak the `pos` classes if one lands on top of the text.
const STORY_CHIPS = [
  { Icon: Flame, pos: "right-0 -top-2 lg:top-2", delay: 0, duration: 6 },
  { Icon: Activity, pos: "right-[34%] -top-6 lg:top-0", delay: 1.6, duration: 7 },
  { Icon: Trophy, pos: "right-2 -bottom-2 lg:bottom-2", delay: 0.8, duration: 6.5 },
];

export default function OurStory() {
  return (
    <section
      id="our-story"
      className="relative scroll-mt-24 overflow-hidden bg-[#e6e8f2] px-6 py-12  sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-6"
    >
      <div className="mx-auto grid max-w-full grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-2 md:gap-12 lg:gap-16 lg:px-6">
        {/* ================= VISUAL ================= */}
        <Reveal className="order-2 md:order-none">
          <div className="group relative">
            <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-slate-200 shadow-xl shadow-slate-900/10 sm:h-80 md:h-96 lg:h-[580px]">
              {/* Mobile image */}
              <PackageImage
                src="https://images.pexels.com/photos/38576479/pexels-photo-38576479.jpeg"
                alt="Trainer coaching a client"
                width={800}
                className="block h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 sm:hidden"
              />

              {/* Desktop image */}
              <PackageImage
                src="https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg"
                alt="Trainer coaching a client"
                width={1200}
                className="hidden h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 sm:block"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
            </div>

            <div className="group/card absolute -bottom-4 left-3 right-3 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-xl shadow-slate-900/10 transition-transform duration-300 hover:-translate-y-1 sm:-bottom-5 sm:left-4 sm:right-auto sm:w-72 sm:rounded-2xl sm:p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-600 text-white transition-transform duration-300 group-hover/card:scale-110 sm:h-11 sm:w-11">
                <Home size={18} />
              </div>

              <div>
                <p className="text-sm font-black text-slate-900 sm:text-base">
                  Training at your home
                </p>
                <p className="text-[10px] text-slate-500 sm:text-xs">
                  A trainer matched to your location
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ================= STORY ================= */}
        <Reveal delay={120} className="order-1 md:order-none">
          <div className="relative flex flex-col justify-center md:min-h-[460px] lg:min-h-[580px]">
            {/* Floating icon chips (decoration, behind the text) */}
            <FloatingChips items={STORY_CHIPS} className="hidden md:block" />

            <div className="relative z-10 flex flex-col justify-center">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-orange-600 sm:mb-4 sm:text-xs">
                The {BRAND.name} Story
              </p>

              <h2 className="text-2xl font-black uppercase leading-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl">
                Built for
                <br />
                <span className="bg-slate-600 bg-clip-text text-transparent">
                  real progress.
                </span>
              </h2>

              <div className="mt-5 space-y-4 text-sm leading-6 text-slate-600 sm:mt-6 sm:space-y-5 sm:text-base sm:leading-7">
                <p>
                  We created {BRAND.name} around a simple idea: everyone should
                  have access to the right fitness guidance, in the comfort of
                  their own home.
                </p>

                <p>
                  Instead of searching for trainers on your own, you tell us
                  your goals and location. Our team finds a suitable trainer and
                  agrees a demo time that works for you.
                </p>

                <p>
                  Try a demo session first. If you like it, we help you choose
                  the package that fits and get you started with your trainer.
                </p>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-5 sm:mt-8 sm:pt-6 md:mt-10 md:pt-7">
                <div className="group/heart flex items-center gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white transition-transform duration-300 group-hover/heart:scale-110 sm:h-11 sm:w-11 md:h-12 md:w-12">
                    <Heart
                      size={16}
                      className="transition-colors duration-300 group-hover/heart:fill-orange-400 group-hover/heart:text-orange-400"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900 sm:text-base">
                      Health. Strength. Confidence.
                    </p>

                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                      Everything starts with taking the first step.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}