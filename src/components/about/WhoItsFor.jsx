import {
  Activity,
  HeartPulse,
  Scale,
  Sparkles,
  StretchHorizontal,
  Timer,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { BRAND } from "@/lib/brand";
import PackageImage from "@/components/packages/PackageImage";


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
      "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg",
    alt: "Person exercising for general fitness",
  },
  {
    icon: Scale,
    title: "Weight-management goals",
    description:
      "For people whose goal is weight management and who want guidance suited to their routine.",
    image:
      "https://images.pexels.com/photos/5714344/pexels-photo-5714344.jpeg",
    alt: "Fitness consultation and planning",
  },
  {
    icon: StretchHorizontal,
    title: "Flexibility and mobility",
    description:
      "For people interested in improving flexibility, mobility, or movement comfort.",
    image:
      "https://images.pexels.com/photos/5384558/pexels-photo-5384558.jpeg",
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


export default function WhoItsFor() {
  return (
    <section className="bg-[#070d17] px-6 py-10 sm:py-14 md:px-8 lg:px-12">
      <div className="mx-auto max-w-full">
        <Reveal>
          <div className="max-w-3xl">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white/40 sm:text-xs">
              Who It Is For
            </p>


            <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
              Designed for people who want
              <br />
              <span className="text-white/30">guidance before committing.</span>
            </h2>


            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
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
                <div className="group relative flex h-full min-h-[240px] flex-col overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-white/30">
                  {/* Background image */}
                  <PackageImage
                    src={item.image}
                    alt={item.alt}
                    width={800}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />


                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070d17] via-[#070d17]/60 to-[#070d17]/30" />


                  {/* Card content */}
                  <div className="relative flex h-full flex-col p-6">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                      <Icon size={20} />
                    </div>


                    <h3 className="text-lg font-bold text-white">
                      {item.title}
                    </h3>


                    <p className="mt-2 text-sm leading-6 text-white/70">
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