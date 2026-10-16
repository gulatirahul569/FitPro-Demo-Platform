import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { BRAND } from "@/lib/brand";

export const metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about requesting an in-home fitness demo, trainer availability, demo scheduling, payments, accounts, and your data.",
  alternates: { canonical: "/faq" },
};

// Keep answers as plain text (no JSX/links) so they can also feed the
// FAQPage structured data below. Edit freely; the page and JSON-LD update together.
const groups = [
  {
    title: "About FitPro",
    items: [
      {
        q: `What is ${BRAND.name}?`,
        a: `${BRAND.name} helps you request an in-home fitness demo. You share your goals, location, and preferred timings, and our team coordinates with a suitable trainer to arrange a demo at your home.`,
      },
      {
        q: "Is submitting a demo request the same as booking a demo?",
        a: "No. Submitting a request only shares your requirements and preferred timings. A demo is confirmed only after our team coordinates a suitable time with you and a trainer.",
      },
      {
        q: "Do I need an account to request a demo?",
        a: "No. You can request a demo without creating an account. An account may be useful later for managing your bookings and training information.",
      },
    ],
  },
  {
    title: "Demo requests",
    items: [
      {
        q: "What details do I need to submit?",
        a: "You will be asked for your name, phone number, email, location or PIN code, fitness goal, package interest, and three preferred time slots.",
      },
      {
        q: "How will I know if a trainer is available?",
        a: "Our team checks trainer availability based on your location and preferred timings, then contacts you to discuss the available options.",
      },
      {
        q: "Can I choose the date and time of my demo?",
        a: "You can share three preferred time slots in order of priority. Our team will contact you to agree on a time that works for you and a suitable trainer.",
      },
      {
        q: "What happens after I submit a request?",
        a: "Our team reviews your request, checks suitable trainer availability, and contacts you to coordinate the next steps.",
      },
    ],
  },
  {
    title: "Demos and payments",
    items: [
      {
        q: "Is the demo free?",
        a: "Demo availability and any demo booking fee depend on the current offering. If a fee applies, our team will explain the amount and terms before payment is collected.",
      },
      {
        q: "When is payment collected?",
        a: "Where applicable, payment is collected only after a suitable trainer and demo time have been agreed. Submitting a request does not require payment.",
      },
      {
        q: "What happens after the demo?",
        a: "After the demo, our team follows up to understand your experience and help you choose a package that suits your goals.",
      },
    ],
  },
  {
    title: "Health, account, and privacy",
    items: [
      {
        q: "Is it safe to start a new workout programme?",
        a: "Content on FitPro is general information, not medical advice. Consult a qualified healthcare professional before starting any programme, especially if you have a medical condition or injury.",
      },
      {
        q: "How is my personal data used?",
        a: "We use your information to coordinate your demo request, improve our services, and communicate with you. We do not sell your personal data. Our Privacy Policy explains what we collect and how you can access, correct, or delete it.",
      },
      {
        q: "How can I delete my account or data?",
        a: "Contact us with the subject Privacy request and we will process your request in line with our Privacy Policy and applicable law.",
      },
      {
        q: "I could not find my answer. What should I do?",
        a: "Contact us through the Contact page. Our team will be happy to help.",
      },
    ],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: groups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    }))
  ),
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#070d17] pt-8 text-white lg:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-5xl px-6 pb-20 md:px-12">
        <Reveal>
          <h1 className="text-3xl font-black text-white sm:text-4xl">
            Frequently Asked Questions
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
            Quick answers to common questions about requesting an in-home
            fitness demo with {BRAND.name}.
          </p>

          <div className="mt-10 space-y-10">
            {groups.map((group) => (
              <section key={group.title} aria-labelledby={group.title}>
                <h2
                  id={group.title}
                  className="text-xs font-bold uppercase tracking-widest text-white/40"
                >
                  {group.title}
                </h2>

                <div className="mt-3 space-y-3">
                  {group.items.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-2xl border border-white/10 bg-[#0f1a2b] transition-colors open:border-white/30"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-5 text-sm font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 [&::-webkit-details-marker]:hidden">
                        {item.q}

                        <span
                          aria-hidden="true"
                          className="shrink-0 text-lg font-normal leading-none text-white/40 transition-transform duration-200 group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>

                      <p className="px-5 pb-5 text-sm leading-6 text-white/60">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-5 rounded-3xl border border-white/10 bg-[#0f1a2b] p-6 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-sm font-bold text-white">
                Still have questions?
              </p>

              <p className="mt-1 text-sm text-white/60">
                Our team is happy to help.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-gray-100 sm:w-auto"
            >
              Contact us
            </Link>
          </div>

          <nav
            aria-label="Legal pages"
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-sm font-semibold"
          >
            <Link
              href="/privacy"
              className="text-white transition-colors hover:text-white/60"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-white transition-colors hover:text-white/60"
            >
              Terms of Service
            </Link>

            <Link
              href="/cookies"
              className="text-white transition-colors hover:text-white/60"
            >
              Cookie Policy
            </Link>
          </nav>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-white/60"
          >
            ← Back to home
          </Link>
        </Reveal>
      </div>
    </main>
  );
}