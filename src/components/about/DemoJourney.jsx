import {
  CalendarCheck,
  ClipboardList,
  Home,
  PhoneCall,
  UserCheck,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { BRAND } from "@/lib/brand";
import PackageImage from "@/components/packages/PackageImage";


const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "You tell us what you need",
    description:
      "Share your goals, location or PIN code, preferred timings, and the kind of training you are interested in. Three time slots help us find an option that works for you.",
    highlight: "Takes just a few minutes",
    image:
      "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg",
    alt: "Person planning fitness goals",
  },
  {
    number: "02",
    icon: PhoneCall,
    title: "We reach out personally",
    description:
      "Our team reviews your request, checks suitable trainer availability near your area, and calls or emails you to understand your requirements better.",
    highlight: "No automated booking",
    image:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    alt: "Team coordinating a request",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "We find a time that works",
    description:
      "We coordinate with you and a suitable trainer to agree on a demo time. Nothing is treated as confirmed until everyone is aligned.",
    highlight: "Confirmed with you first",
    image:
      "https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg",
    alt: "Calendar scheduling concept",
  },
  {
    number: "04",
    icon: UserCheck,
    title: "We complete the final details",
    description:
      "Where applicable, we share the demo booking details and payment requirements. Once completed, your appointment is ready.",
    highlight: "Clear before you pay",
    image:
      "https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg",
    alt: "Fitness consultation and planning",
  },
  {
    number: "05",
    icon: Home,
    title: "Your trainer comes to you",
    description:
      "The assigned trainer visits your home for the demo. Afterwards, our team follows up to understand your experience and help you decide what works next.",
    highlight: "Training in your space",
    image:
      "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg",
    alt: "Trainer conducting an in-home fitness session",
  },
];


export default function DemoJourney() {
  return (
    <section className="bg-[#070d17] px-6 py-8 sm:py-14 md:px-8 lg:px-12">
      <div className="mx-auto max-w-full">
        {/* ================= INTRO ================= */}
        <Reveal>
          <div className="max-w-3xl">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white/40 sm:text-xs">
              The Demo Journey
            </p>


            <h2 className="text-3xl font-black leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl">
              A simple process,
              <br />
              <span className="text-white/30">handled by real people.</span>
            </h2>


            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
              You do not have to search for a trainer or manage the scheduling
              yourself. Tell us what you are looking for, and our team helps
              coordinate an in-home demo at a time that suits you.
            </p>
          </div>
        </Reveal>


        {/* ================= JOURNEY ================= */}
        <div className="mt-14 space-y-6 sm:mt-20 sm:space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isReversed = index % 2 === 1;


            return (
              <Reveal key={step.number} delay={index * 80}>
                <div
                  className={`flex flex-col gap-5 lg:flex-row lg:items-center ${
                    isReversed ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Number / icon panel */}
                  <div className="flex items-center gap-4 lg:w-64 lg:shrink-0">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#0f1a2b] text-white">
                      <Icon size={24} />
                    </div>


                    <div>
                      <p className="text-3xl font-black leading-none text-white/15 sm:text-4xl">
                        {step.number}
                      </p>


                      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/45">
                        {step.highlight}
                      </p>
                    </div>
                  </div>


                  {/* Content card with background image */}
                  <div className="group relative flex-1 overflow-hidden rounded-3xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-xl">
                    <PackageImage
                      src={step.image}
                      alt={step.alt}
                      width={1400}
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />


                    <div className="absolute inset-0 bg-gradient-to-r from-[#070d17] via-[#070d17]/30 to-[#070d17]/10" />


                    <div className="relative p-6 sm:p-8">
                      <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">
                        {step.title}
                      </h3>


                      <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                        {step.description}
                      </p>
                    </div>
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