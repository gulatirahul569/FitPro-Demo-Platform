import {
  Activity,
  Flame,
  Heart,
  HeartPulse,
  Scale,
  Sparkles,
  StretchHorizontal,
  Timer,
  Trophy,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { BRAND } from "@/lib/brand";
import PackageImage from "@/components/packages/PackageImage";
import { FloatingChips } from "@/components/ui/Decor";

const audience = [
  {
    icon: Activity,
    title: "New to structured training",
    description:
      "For people who want guidance on how to begin training in a structured and sustainable way.",
    image:
      "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg",
    alt: "Person beginning a fitness routine",
  },
  {
    icon: Timer,
    title: "Busy schedules",
    description:
      "For people who prefer training at home and want a demo scheduled around their available time.",
    image:
      "https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg",
    alt: "Calendar and scheduling concept",
  },
  {
    icon: HeartPulse,
    title: "General fitness goals",
    description:
      "For people working toward improved fitness, energy, mobility, or consistency.",
    image:
      "https://images.pexels.com/photos/3931224/pexels-photo-3931224.jpeg",
    alt: "Person exercising for general fitness",
  },
  {
    icon: Scale,
    title: "Weight-management goals",
    description:
      "For people whose goal is weight management and who want guidance suited to their routine.",
    image:
      "https://images.pexels.com/photos/8846348/pexels-photo-8846348.jpeg",
    alt: "Fitness consultation and planning",
  },
  {
    icon: StretchHorizontal,
    title: "Flexibility and mobility",
    description:
      "For people interested in improving flexibility, mobility, or movement comfort.",
    image:
      "https://images.pexels.com/photos/40020710/pexels-photo-40020710.jpeg",
    alt: "Person stretching and improving mobility",
  },
  {
    icon: Sparkles,
    title: "Personalized guidance",
    description:
      "For people who want a demo experience before choosing a longer-term training package.",
    image:
      "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg",
    alt: "Trainer providing personalized in-home guidance",
  },
];

// Chips float in the empty space to the right of the heading (xl screens only).
const HEADING_CHIPS = [
  { Icon: Flame, pos: "right-[8%] top-10", delay: 0, duration: 6 },
  { Icon: Heart, pos: "right-[20%] top-28", delay: 1.4, duration: 7 },
  { Icon: Trophy, pos: "right-[31%] top-12", delay: 0.7, duration: 6.5 },
];

export default function WhoItsFor() {
  return (
    <section className="relative overflow-hidden bg-[#e6e8f2] px-6 py-10 sm:py-14 md:px-8 lg:px-12">
      <FloatingChips items={HEADING_CHIPS} className="hidden xl:block" />

      <div className="relative z-10 mx-auto max-w-full">
        <Reveal>
          <div className="max-w-3xl">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-600 sm:text-xs">
              Who It Is For
            </p>

            <h2 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Designed for people who want
              <br />
              <span className="bg-gradient-to-r from-slate-500 to-slate-400 bg-clip-text text-transparent">
                guidance before committing.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              {BRAND.name} is for people who want to experience an in-home
              fitness demo before deciding on a training package. You share
              your goals and preferences, and our team helps coordinate the
              next step.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {audience.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal key={item.title} delay={index * 80}>
                <div className="group relative flex h-full min-h-[240px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/15">
                  {/* Background image */}
                  <PackageImage
                    src={item.image}
                    alt={item.alt}
                    width={800}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Dark fade so the white text stays readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/50 to-slate-900/30" />

                  {/* Card content */}
                  <div className="relative flex h-full flex-col p-6">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:border-transparent group-hover:bg-slate-500">
                      <Icon size={20} />
                    </div>

                    <h3 className="text-lg font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}