import { Heart, Home } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { BRAND } from "@/lib/brand";
import PackageImage from "@/components/packages/PackageImage";

export default function OurStory() {
  return (
    <section
      id="our-story"
      className="scroll-mt-24 bg-[#070d17] px-6 py-12 pt-0 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-2 md:gap-12 lg:gap-16 lg:px-6">
        {/* ================= VISUAL ================= */}
        <Reveal className="order-2 md:order-none">
          <div className="relative">
            <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-white/10 sm:h-80 md:h-96 lg:h-[580px]">
              {/* Mobile image */}
              <PackageImage
                src="https://images.pexels.com/photos/38576479/pexels-photo-38576479.jpeg"
                alt="Trainer coaching a client"
                width={800}
                className="block h-full w-full object-cover sm:hidden"
              />

              {/* Desktop image */}
              <PackageImage
                src="https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg"
                alt="Trainer coaching a client"
                width={1200}
                className="hidden h-full w-full object-cover sm:block"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1220]/70 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-4 left-3 right-3 flex items-center gap-3 rounded-xl border border-white/10 bg-[#0f1a2b] p-3.5 shadow-lg sm:-bottom-5 sm:left-4 sm:right-auto sm:w-72 sm:rounded-2xl sm:p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black sm:h-11 sm:w-11">
                <Home size={18} />
              </div>

              <div>
                <p className="text-sm font-black text-white sm:text-base">
                  Training at your home
                </p>
                <p className="text-[10px] text-white/50 sm:text-xs">
                  A trainer matched to your location
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ================= STORY ================= */}
        <Reveal delay={120} className="order-1 md:order-none">
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40 sm:mb-4 sm:text-xs">
              The {BRAND.name} Story
            </p>

            <h2 className="text-2xl font-black uppercase leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              Built for
              <br />
              <span className="text-white/30">real progress.</span>
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-6 text-white/65 sm:mt-6 sm:space-y-5 sm:text-base sm:leading-7">
              <p>
                We created {BRAND.name} around a simple idea: everyone should
                have access to the right fitness guidance, in the comfort of
                their own home.
              </p>

              <p>
                Instead of searching for trainers on your own, you tell us your
                goals and location. Our team finds a suitable trainer and agrees
                a demo time that works for you.
              </p>

              <p>
                Try a demo session first. If you like it, we help you choose
                the package that fits and get you started with your trainer.
              </p>
            </div>

            <div className="mt-6 border-t border-white/10 pt-5 sm:mt-8 sm:pt-6 md:mt-10 md:pt-7">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black sm:h-11 sm:w-11 md:h-12 md:w-12">
                  <Heart size={16} />
                </div>

                <div>
                  <p className="text-sm font-bold text-white sm:text-base">
                    Health. Strength. Confidence.
                  </p>

                  <p className="mt-1 text-xs text-white/45 sm:text-sm">
                    Everything starts with taking the first step.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}