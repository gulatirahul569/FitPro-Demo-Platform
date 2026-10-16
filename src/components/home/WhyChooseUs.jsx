import {
  CalendarCheck,
  ClipboardCheck,
  Home,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { BRAND } from "@/lib/brand";
import PackageImage from "@/components/packages/PackageImage";

// Keep these to claims the client can back up.
// Add "Certified Trainers" or "Verified Profiles" back only once the client confirms them.
const benefits = [
  {
    title: "Trainer matched to your needs",
    icon: UserRoundCheck,
  },
  {
    title: "Matched to your area",
    icon: MapPin,
  },
  {
    title: "Appointments confirmed with you",
    icon: CalendarCheck,
  },
  {
    title: "Training at your home",
    icon: Home,
  },
  {
    title: "Personalized plans",
    icon: ClipboardCheck,
  },
  {
    title: "Support through onboarding",
    icon: MessageCircle,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#070d17] px-6 sm:px-6 sm:py-16 md:px-8 md:py-12 lg:px-6">
      <div className="mx-auto grid max-w-full grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-2 md:gap-12 lg:gap-16 lg:px-6">
        {/* ================= BENEFITS / LEFT ================= */}
        <Reveal>
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40 sm:mb-4 sm:text-xs">
              The {BRAND.name} Difference
            </p>

            <h2 className="text-2xl font-black uppercase leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              Built for
              <br />
              <span className="text-white/30">better training.</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-6 text-white/65 sm:mt-6 sm:text-base sm:leading-7">
              Our team matches you with a suitable trainer, coordinates the
              demo time with you, and supports you from your first session
              onwards.
            </p>

            {/* Benefit grid */}
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-3">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="group flex items-center gap-2.5 rounded-lg border border-white/10 bg-[#0f1a2b] px-3 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:shadow-sm sm:rounded-xl sm:px-4 sm:py-4"
                    style={{
                      transitionDelay: `${index * 30}ms`,
                    }}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black sm:h-10 sm:w-10">
                      <Icon size={18} strokeWidth={2} />
                    </div>

                    <span className="text-xs font-semibold text-white sm:text-sm">
                      {benefit.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bottom message */}
            <div className="mt-6 border-t border-white/10 pt-5 sm:mt-8 sm:pt-6 md:mt-10 md:pt-7">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black sm:h-11 sm:w-11 md:h-12 md:w-12">
                  <Sparkles size={18} />
                </div>

                <div>
                  <p className="text-sm font-bold text-white sm:text-base">
                    Your fitness, made simpler.
                  </p>

                  <p className="mt-1 text-xs text-white/45 sm:text-sm">
                    Try a demo first, then choose the package that fits you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ================= IMAGE / RIGHT ================= */}
        <Reveal delay={120}>
          <div className="relative mx-auto w-full max-w-md sm:max-w-lg md:mb-0 lg:max-w-none">
            {/* Offset background frame */}
            <div className="absolute -right-3 -top-3 h-full w-full rounded-2xl border border-white/10 bg-[#0f1a2b] sm:-right-4 sm:-top-4 sm:rounded-3xl" />

            <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a1220] sm:h-80 md:h-96 lg:h-[580px]">
              {/* Mobile image */}
              <PackageImage
                src="https://images.pexels.com/photos/3757937/pexels-photo-3757937.jpeg"
                alt="Personal trainer coaching a client during a workout"
                width={800}
                className="block h-full w-full object-cover sm:hidden"
              />

              {/* Desktop image */}
              <PackageImage
                src="https://images.pexels.com/photos/6827092/pexels-photo-6827092.jpeg"
                alt="Personal trainer coaching a client during a workout"
                width={1200}
                className="hidden h-full w-full object-cover sm:block"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#070d17]/85 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-5 md:p-6 lg:p-8">
                <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-white/70 sm:text-xs">
                  Training that fits your life
                </p>

                <h3 className="max-w-sm text-lg font-bold leading-tight text-white sm:text-xl md:text-2xl lg:text-3xl">
                  The right trainer for your goals, at your door.
                </h3>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-4 left-3 right-3 flex items-center gap-3 rounded-xl border border-white/10 bg-[#0f1a2b] p-3.5 shadow-lg sm:-bottom-5 sm:left-4 sm:right-auto sm:w-72 sm:rounded-2xl sm:p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black sm:h-11 sm:w-11">
                <ShieldCheck size={20} />
              </div>

              <div>
                <p className="text-xs font-bold text-white sm:text-sm">
                  Confirmed with you first
                </p>

                <p className="mt-0.5 text-[10px] text-white/50 sm:text-xs">
                  No demo is booked without your agreement.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}