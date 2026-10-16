import { CalendarCheck, ClipboardList, Home, PhoneCall } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { BRAND } from "@/lib/brand";
import PackageImage from "@/components/packages/PackageImage";

const services = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Demo request handling",
    description:
      "Share your goals, location, and preferred time slots. Our team begins the coordination process.",
  },
  {
    number: "02",
    icon: PhoneCall,
    title: "Availability coordination",
    description:
      "We check suitable trainer availability near your location and contact you with options.",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Demo scheduling",
    description:
      "Once you and a suitable trainer agree on a time, the demo appointment can be confirmed.",
  },
  {
    number: "04",
    icon: Home,
    title: "In-home demo support",
    description:
      "The assigned trainer visits your home, and our team supports you through onboarding.",
  },
];

export default function WhatWeDo() {
  return (
    <section className="bg-[#070d17] px-6 py-8 sm:py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-full">
        {/* ================= HEADING: FULL WIDTH ================= */}
        <Reveal>
          <div className="max-w-3xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white/40 sm:text-xs">
              Our Service
            </p>

            <h2 className="text-3xl font-black leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
              From your request
              <br />
              <span className="text-white/30">to your home demo.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              {BRAND.name} coordinates in-home fitness demos based on your
              goals, location, and preferred timings.
            </p>
          </div>
        </Reveal>

        {/* ================= MAIN GRID: IMAGE LEFT + CARDS RIGHT ================= */}
        <div className="mt-10 grid grid-cols-1 items-center gap-8 sm:mt-12 lg:grid-cols-2 lg:gap-12">
          {/* LEFT: IMAGE */}
          <Reveal>
            <div className="relative h-64 w-full overflow-hidden rounded-3xl border border-white/10 sm:h-80 lg:h-[430px]">
              <PackageImage
                src="https://images.pexels.com/photos/3757374/pexels-photo-3757374.jpeg"
                alt="Trainer coaching a client at home"
                width={1200}
                className="h-full w-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#070d17]/90 via-black/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="max-w-xs text-lg font-bold leading-snug text-white sm:text-xl">
                  A coordinated path from request to demo.
                </p>
              </div>
            </div>
          </Reveal>

          {/* RIGHT: FOUR SERVICE CARDS */}
          <div className="space-y-3">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <Reveal key={service.number} delay={index * 70}>
                  <div className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-[#0f1a2b] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 sm:p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                      <Icon size={20} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold text-white/60">
                          {service.number}
                        </span>

                        <h3 className="text-base font-bold text-white">
                          {service.title}
                        </h3>
                      </div>

                      <p className="mt-1 text-sm leading-6 text-white/60">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* ================= FULL-WIDTH CAUTION ================= */}
        <Reveal delay={120}>
          <div className="mt-10 rounded-3xl border border-white/10 bg-[#0f1a2b] p-6 sm:mt-12 sm:p-8">
            <h3 className="text-lg font-bold text-white sm:text-xl">
              Important: a request is not a confirmed booking
            </h3>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-white/65 sm:text-base">
              Submitting a demo request does not confirm a demo. A demo is
              confirmed only after a suitable trainer and time are agreed
              between you and our team and, where applicable, the demo booking
              fee is completed.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-[#070d17] p-4">
                <p className="text-sm font-bold text-white">
                  Request received
                </p>

                <p className="mt-1 text-xs leading-5 text-white/50">
                  Your details and preferred slots are recorded.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#070d17] p-4">
                <p className="text-sm font-bold text-white">Team follows up</p>

                <p className="mt-1 text-xs leading-5 text-white/50">
                  We contact you to check availability and options.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#070d17] p-4">
                <p className="text-sm font-bold text-white">Demo confirmed</p>

                <p className="mt-1 text-xs leading-5 text-white/50">
                  Only after the time and requirements are agreed.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}