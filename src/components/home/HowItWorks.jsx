import { Package, ClipboardList, PhoneCall, Dumbbell } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

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
    description: "Our team calls to agree a time and check trainer availability.",
    icon: PhoneCall,
  },
  {
    number: "04",
    title: "Meet your trainer",
    description: "Confirm your booking and train with your trainer at home.",
    icon: Dumbbell,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-gray-50 px-6 py-20 pt-3 md:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="mb-16 text-center text-3xl font-bold text-black md:text-4xl">
            How It Works
          </h2>
        </Reveal>

        <div className="relative grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line, desktop only */}
          <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-gray-200 lg:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.number} delay={index * 150}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="group relative mb-4">
                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-black transition-transform duration-300 ease-out group-hover:scale-110">
                      <Icon size={26} className="text-white" />
                    </div>
                    <span className="absolute -right-2 -top-2 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-black bg-white text-xs font-bold">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-black">
                    {step.title}
                  </h3>
                  <p className="max-w-[220px] text-sm text-gray-500">
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