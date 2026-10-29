import { CalendarCheck, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { BRAND } from "@/lib/brand";
import PackageImage from "@/components/packages/PackageImage";
import { DriftBlobs } from "@/components/ui/Decor";

const promises = [
  {
    icon: MessageCircle,
    title: "We contact you after your request",
    description:
      "Once you submit a demo request, our team reviews the details and contacts you to discuss suitable options.",
    image:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    alt: "Team reviewing and responding to a request",
  },
  {
    icon: MapPin,
    title: "We check location-based availability",
    description:
      "We consider your location or PIN code while checking whether a suitable trainer may be available for your demo.",
    image:
      "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg",
    alt: "Location mapping concept",
  },
  {
    icon: CalendarCheck,
    title: "Demos are confirmed with you",
    description:
      "A demo time is confirmed only after it works for you and a suitable trainer. Submitting a request does not confirm a booking.",
    image:
      "https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg",
    alt: "Calendar scheduling concept",
  },
  {
    icon: ShieldCheck,
    title: "Clear next steps",
    description:
      "After the demo, our team follows up to help you understand the available package options and decide what suits you.",
    image:
      "https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg",
    alt: "Fitness consultation and planning",
  },
];

export default function ServicePromise() {
  return (
    <section className="relative overflow-hidden bg-[#e6e8f2] px-6 py-8 sm:py-12 md:px-8 lg:px-12">
      {/* Soft drifting glows behind the content */}
      <DriftBlobs />

      <div className="relative z-10 mx-auto max-w-full">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left: heading */}
          <Reveal>
            <div className="flex flex-col justify-center">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-600 sm:text-xs">
                Our Service Promise
              </p>

              <h2 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl md:text-5xl">
                Clear communication.
                <br />
                <span className="bg-gradient-to-r from-slate-500 to-slate-400 bg-clip-text text-transparent">
                  Coordinated demos.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                {BRAND.name} keeps the demo process straightforward: you share
                your requirements, our team coordinates availability, and a
                demo is confirmed only when the time works for both you and the
                trainer.
              </p>

              <div className="mt-8 rounded-2xl border border-slate-200 border-l-4 border-l-slate-400 bg-white p-6 shadow-md shadow-slate-900/5">
                <h3 className="text-lg font-bold text-slate-900">
                  What we do not promise
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  We do not guarantee trainer availability for every location
                  or time slot. Availability depends on trainer coverage and
                  scheduling.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right: promise cards */}
          <Reveal delay={120}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {promises.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group relative flex h-full min-h-[240px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/15"
                  >
                    {/* Background image */}
                    <PackageImage
                      src={item.image}
                      alt={item.alt}
                      width={800}
                      sizes="(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 100vw"
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Dark fade so the white text stays readable */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-slate-900/30" />

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
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}