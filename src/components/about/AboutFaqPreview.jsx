import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import PackageImage from "@/components/packages/PackageImage";
import { SpinBadge } from "@/components/ui/Decor";

const faqs = [
  {
    question: "Is submitting a demo request the same as booking a demo?",
    answer:
      "No. Submitting a request only shares your requirements and preferred timings. A demo is confirmed after our team coordinates a suitable time with you and a trainer.",
    image:
      "https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg",
    alt: "Calendar scheduling concept",
  },
  {
    question: "What details do I need to submit?",
    answer:
      "You will be asked for your name, phone number, email, location or PIN code, fitness goal, package interest, and three preferred time slots.",
    image:
      "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg",
    alt: "Person preparing fitness goals",
  },
  {
    question: "How will I know if a trainer is available?",
    answer:
      "Our team checks trainer availability based on your location and preferred timings, then contacts you to discuss the available options.",
    image:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    alt: "Team checking availability",
  },
  {
    question: "What happens after the demo?",
    answer:
      "After the demo, our team follows up to understand your experience and help you choose a package that suits your goals.",
    image:
      "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg",
    alt: "Trainer and client after an in-home session",
  },
];

export default function AboutFaqPreview() {
  return (
    <section className="bg-[#e6e8f2] px-6 py-16 sm:py-20 md:px-8 lg:px-12">
      <div className="mx-auto max-w-full">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* ================= HEADING (first on mobile, right on desktop) ================= */}
          <Reveal delay={120} className="order-1 lg:order-2">
            <div className="relative flex flex-col justify-center lg:min-h-[360px]">
              {/* Rotating badge in the empty corner under the paragraph (lg and up) */}
              <SpinBadge
                text="Ask our team • Any question •"
                className="bottom-0 right-4 hidden lg:block"
              />

              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-600 sm:text-xs">
                Common Questions
              </p>

              <h2 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl md:text-5xl">
                Before you
                <br />
                <span className="bg-gradient-to-r from-slate-500 to-slate-400 bg-clip-text text-transparent">
                  request a demo.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                Here are a few common questions about how the FitPro demo
                process works.
              </p>

              <Link
                href="/faq"
                className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 hover:text-slate-600 hover:shadow-md"
              >
                View All FAQs
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>

          {/* ================= FAQ CARDS (after the button on mobile, left on desktop) ================= */}
          <Reveal className="order-2 lg:order-1">
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/15"
                >
                  {/* Background image */}
                  <PackageImage
                    src={faq.image}
                    alt={faq.alt}
                    width={1200}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Dark fade so the white text stays readable */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/65 to-slate-900/35" />

                  {/* FAQ content */}
                  <div className="relative p-6">
                    <h3 className="text-base font-bold text-white sm:text-lg">
                      {faq.question}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/80">
                      {faq.answer}
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