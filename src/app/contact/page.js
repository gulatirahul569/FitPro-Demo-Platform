import Link from "next/link";
import { ArrowRight, Mail, MapPin, Clock } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { BRAND } from "@/lib/brand";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with our team for demo bookings, support, partnerships, or privacy requests. We respond as soon as possible.",
  alternates: { canonical: "/contact" },
};

// TODO: replace with your real details before launch.
// You can point each topic to its own address later (e.g. partners@, privacy@).
const EMAIL = "support@fitpro.example";
const COMPANY = "FitPro Fitness Pvt. Ltd.";
const ADDRESS = {
  street: "Sector 15",
  city: "Panchkula",
  region: "Haryana",
  country: "India",
};

const topics = [
  {
    title: "Demo bookings",
    description:
      "Questions about your demo request, rescheduling, or the demo booking fee.",
    email: EMAIL,
    subject: "Demo booking enquiry",
  },
  {
    title: "General support",
    description:
      "Help with your account, your training sessions, or reporting a problem.",
    email: EMAIL,
    subject: "Support request",
  },
  {
    title: "Partnerships",
    description:
      "Collaborations, sponsorships, media, or business opportunities.",
    email: EMAIL,
    subject: "Partnership enquiry",
  },
  {
    title: "Privacy and data requests",
    description:
      "Access, correct, or delete your data, or contact our Grievance Officer.",
    email: EMAIL,
    subject: "Privacy request",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${BRAND.name}`,
  mainEntity: {
    "@type": "Organization",
    name: COMPANY,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.region,
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: EMAIL,
      availableLanguage: ["English", "Hindi"],
    },
  },
};

function mailto(email, subject) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#070d17] pt-24 text-white md:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-5xl px-6 pb-20 md:px-12">
        <Reveal>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white sm:text-xs">
            Get in touch
          </p>
          <h1 className="text-3xl font-black sm:text-4xl md:text-5xl">
            Contact Us
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
            Have a question or feedback? Choose the topic that fits best and
            send us an email. We will respond as soon as possible.
          </p>

          {/* Topic cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {topics.map((topic) => (
              <a
                key={topic.title}
                href={mailto(topic.email, topic.subject)}
                className="group rounded-2xl border border-white/10 bg-[#0f1a2b] p-5 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <h2 className="text-sm font-bold text-white">{topic.title}</h2>
                <p className="mt-1 text-sm leading-6 text-white/60">
                  {topic.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors group-hover:text-white">
                  Email us
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </a>
            ))}
          </div>

          {/* Details card */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-[#0f1a2b] p-6 md:p-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Mail size={16} className="text-white" />
                  Email
                </p>
                <p className="mt-2 text-sm text-white/60">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="underline underline-offset-4 transition-colors hover:text-white"
                  >
                    {EMAIL}
                  </a>
                </p>
              </div>

              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-white">
                  <MapPin size={16} className="text-white" />
                  Office
                </p>
                <address className="mt-2 text-sm not-italic leading-6 text-white/60">
                  {COMPANY}
                  <br />
                  {ADDRESS.street}, {ADDRESS.city}
                  <br />
                  {ADDRESS.region}, {ADDRESS.country}
                </address>
              </div>

              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Clock size={16} className="text-white" />
                  Response time
                </p>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  We aim to reply within 2 business days. Privacy and data
                  requests are acknowledged within 48 hours.
                </p>
              </div>
            </div>

            <p className="mt-8 border-t border-white/10 pt-5 text-xs leading-5 text-white/40">
              For partnership queries, mention your use case in the subject
              line. Please do not send sensitive personal or health information
              by email.
            </p>
          </div>

          {/* Book a demo nudge */}
          <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f1a2b] to-black p-6 sm:flex-row sm:items-center md:p-8">
            <div>
              <h2 className="text-lg font-bold">Want to try a session first?</h2>
              <p className="mt-1 text-sm text-white/60">
                Request a demo and our team will contact you to agree a time.
              </p>
            </div>
            <Link
              href="/book-demo"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white-400 px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-white"
            >
              Book a Demo
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Legal links */}
          <nav
            aria-label="Legal pages"
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-sm font-semibold"
          >
            <Link href="/privacy" className="text-white/70 transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/70 transition-colors hover:text-white">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-white/70 transition-colors hover:text-white">
              Cookie Policy
            </Link>
          </nav>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white"
          >
            ← Back to home
          </Link>
        </Reveal>
      </div>
    </main>
  );
}