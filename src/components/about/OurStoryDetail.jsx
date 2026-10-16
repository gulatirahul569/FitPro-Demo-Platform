import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { BRAND } from "@/lib/brand";
import PackageImage from "@/components/packages/PackageImage";

const principles = [
  {
    title: "Start with your goals",
    description:
      "Your fitness goal, location, and preferred timings help us understand what kind of demo may suit you.",
    image:
      "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg",
    alt: "Person setting fitness goals",
  },
  {
    title: "Coordinated by our team",
    description:
      "Our team checks availability and contacts you to agree on a suitable demo time.",
    image:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    alt: "Team coordinating schedules",
  },
  {
    title: "Experience it at home",
    description:
      "A demo lets you understand the training experience in your own space before making a longer-term decision.",
    image:
      "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg",
    alt: "Trainer conducting an in-home fitness session",
  },
  {
    title: "Clear next steps",
    description:
      "After the demo, our team follows up to help you choose the package that fits your needs.",
    image:
      "https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg",
    alt: "Fitness consultation and planning",
  },
];

export default function OurStoryDetail() {
  return (
    <section className="bg-[#070d17] px-8 py-8 sm:py-14 md:px-8 lg:px-12">
      <div className="mx-auto max-w-full">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: heading and intro */}
          <Reveal>
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white/40 sm:text-xs">
                Our Story
              </p>

              <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
                Making quality fitness guidance
                <br />
                <span className="text-white/30">easier to access.</span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
                {BRAND.name} was built around a simple idea: finding the right
                fitness guidance should not feel complicated. Instead of
                searching on your own, you share your goals, location, and
                preferred timings, and our team helps coordinate the next step.
              </p>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
                We focus on in-home demos so you can experience personalized
                training in your own space before deciding whether to continue.
              </p>
            </div>
          </Reveal>

          {/* Right: image-background cards */}
          <Reveal delay={120}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {principles.map((item) => (
                <div
                  key={item.title}
                  className="group relative min-h-[220px] overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-white/30"
                >
                  {/* Background image */}
                  <PackageImage
                    src={item.image}
                    alt={item.alt}
                    width={800}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070d17] via-[#070d17]/50 to-[#070d17]/30" />

                  {/* Content */}
                  <div className="relative flex h-full flex-col justify-end p-5 sm:p-6">
                    <h3 className="text-lg font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/70">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}