import { CalendarCheck, ClipboardList, Home, PhoneCall } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { BRAND } from "@/lib/brand";
import PackageImage from "@/components/packages/PackageImage";
import { OrbitRing } from "@/components/ui/Decor";

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
    <section className="relative overflow-hidden bg-[#e6e8f2] px-6 py-8 sm:py-8 md:px-8 lg:px-12">
      {/* Rotating orbit in the empty space beside the heading (xl screens only) */}
      <OrbitRing className="right-[6%] top-4 hidden xl:block" />

      <div className="relative z-10 mx-auto max-w-full">
        {/* ================= HEADING: FULL WIDTH ================= */}
        <Reveal>
          <div className="max-w-3xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-600 sm:text-xs">
              Our Service
            </p>

            <h2 className="text-3xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              From your request
              <br />
              <span className="bg-gradient-to-r from-slate-500 to-slate-400 bg-clip-text text-transparent">
                to your home demo.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              {BRAND.name} coordinates in-home fitness demos based on your
              goals, location, and preferred timings.
            </p>
          </div>
        </Reveal>

        {/* ================= MAIN GRID: IMAGE LEFT + CARDS RIGHT ================= */}
        <div className="mt-10 grid grid-cols-1 items-center gap-8 sm:mt-12 lg:grid-cols-2 lg:gap-12">
          {/* LEFT: IMAGE */}
          <Reveal>
            <div className="relative h-64 w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-xl shadow-slate-900/10 sm:h-80 lg:h-[430px]">
              <PackageImage
                src="https://images.pexels.com/photos/3757374/pexels-photo-3757374.jpeg"
                alt="Trainer coaching a client at home"
                width={1200}
                className="h-full w-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent" />

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
                  <div className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-md shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/10 sm:p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-slate-500 group-hover:to-slate-400 group-hover:text-white">
                      <Icon size={20} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold text-slate-500">
                          {service.number}
                        </span>

                        <h3 className="text-base font-bold text-slate-900">
                          {service.title}
                        </h3>
                      </div>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
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
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 sm:mt-12 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
              Important: a request is not a confirmed booking
            </h3>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">
              Submitting a demo request does not confirm a demo. A demo is
              confirmed only after a suitable trainer and time are agreed
              between you and our team and, where applicable, the demo booking
              fee is completed.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-bold text-slate-900">
                  Request received
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Your details and preferred slots are recorded.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-bold text-slate-900">
                  Team follows up
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  We contact you to check availability and options.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-bold text-slate-900">
                  Demo confirmed
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
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