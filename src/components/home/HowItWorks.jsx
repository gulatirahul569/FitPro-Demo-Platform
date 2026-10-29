import { Package, ClipboardList, PhoneCall, Dumbbell } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { PulseRings, TravelDot } from "@/components/ui/Decor";

const steps = [
  {
    number: "01",
    title: "Choose a package",
    description: "Pick the package that suits your goals.",
    icon: Package,
  },
  {
    number: "02",
    title: "Request a demo",
    description: "Share your location and three preferred time slots.",
    icon: ClipboardList,
  },
  {
    number: "03",
    title: "We contact you",
    description:
      "Our team calls to agree a time and check trainer availability.",
    icon: PhoneCall,
  },
  {
    number: "04",
    title: "Meet your trainer",
    description:
      "Confirm your booking and train with your trainer at home.",
    icon: Dumbbell,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 overflow-hidden bg-[#e6e8f2] px-6 py-20 pt-3 md:px-12"
    >
      {/* Heartbeat ripples in the empty corner beside the heading (xl screens only) */}
      <PulseRings className="right-[4%] top-0 hidden origin-center scale-75 xl:block" />

      <div className="relative z-10 mx-auto max-w-full">
        <Reveal>
          <h2 className="mb-16 text-center text-3xl font-bold text-slate-900 md:text-4xl">
            How It{" "}
            <span className="bg-slate-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
        </Reveal>

        <div className="relative grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line, desktop only */}
          <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-0 border-t-2 border-dashed border-slate-300 lg:block" />

          {/* Dot travelling along the line, from step 1 to step 4 */}
          <TravelDot className="left-[12.5%] right-[12.5%] top-8 hidden lg:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.number} delay={index * 150}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="group relative mb-4">
                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-lg shadow-slate-900/10 transition-all duration-300 ease-out group-hover:scale-110 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-slate-500 group-hover:to-slate-400 group-hover:text-white group-hover:shadow-slate-500/30">
                      <Icon size={26} />
                    </div>
                    <span className="absolute -right-2 -top-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-slate-600 text-xs font-bold text-white shadow-md">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mb-1 text-lg font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="max-w-[220px] text-sm text-slate-600">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}