import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, Mail, MapPin, ShieldCheck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { BRAND } from "@/lib/brand";


export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with our team for demo bookings, support, partnerships, or privacy requests. We respond as soon as possible.",
  alternates: { canonical: "/contact" },
};


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
      "Help with your account, training sessions, or reporting a problem.",
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


      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-12">
        {/* ================= HERO ================= */}
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f1a2b] via-[#0b1424] to-[#070d17] p-8 sm:p-12">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />


            <div className="relative">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white/50">
                Get in touch
              </p>


              <h1 className="max-w-3xl text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
                Contact Us
              </h1>


              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                Have a question or feedback? Choose the topic that fits best
                and send us an email. We will respond as soon as possible.
              </p>


              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100"
                >
                  <Mail size={16} />
                  Email Support
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>


                <Link
                  href="/book-demo"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                  Book a Demo
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>


        {/* ================= TOPIC CARDS ================= */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {topics.map((topic, index) => (
            <Reveal key={topic.title} delay={index * 70}>
              <a
                href={mailto(topic.email, topic.subject)}
                className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-[#0f1a2b] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:p-7"
              >
                <div>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                    <Mail size={18} />
                  </div>


                  <h2 className="text-lg font-bold text-white">
                    {topic.title}
                  </h2>


                  <p className="mt-2 text-sm leading-6 text-white/60">
                    {topic.description}
                  </p>
                </div>


                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white/80 transition-colors group-hover:text-white">
                  Email us
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </div>


        {/* ================= CONTACT DETAILS ================= */}
        <Reveal delay={120}>
          <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-[#0f1a2b]">
            <div className="grid gap-px bg-white/10 md:grid-cols-3">
              <div className="bg-[#0f1a2b] p-6 md:p-8">
                <p className="flex items-center gap-2 text-sm font-bold text-white">
                  <Mail size={16} />
                  Email
                </p>


                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-3 block break-all text-sm text-white/65 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {EMAIL}
                </a>
              </div>


              <div className="bg-[#0f1a2b] p-6 md:p-8">
                <p className="flex items-center gap-2 text-sm font-bold text-white">
                  <MapPin size={16} />
                  Office
                </p>


                <address className="mt-3 text-sm not-italic leading-6 text-white/65">
                  {COMPANY}
                  <br />
                  {ADDRESS.street}, {ADDRESS.city}
                  <br />
                  {ADDRESS.region}, {ADDRESS.country}
                </address>
              </div>


              <div className="bg-[#0f1a2b] p-6 md:p-8">
                <p className="flex items-center gap-2 text-sm font-bold text-white">
                  <Clock size={16} />
                  Response time
                </p>


                <p className="mt-3 text-sm leading-6 text-white/65">
                  We aim to reply within 2 business days. Privacy and data
                  requests are acknowledged within 48 hours.
                </p>
              </div>
            </div>


            <div className="flex items-start gap-3 border-t border-white/10 bg-[#070d17] p-6 md:p-8">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-white/60" />


              <p className="text-xs leading-5 text-white/50 sm:text-sm">
                For partnership queries, mention your use case in the subject
                line. Please do not send sensitive personal or health
                information by email.
              </p>
            </div>
          </div>
        </Reveal>


        {/* ================= DEMO CTA ================= */}
        <Reveal delay={150}>
          <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f1a2b] to-black p-7 sm:flex-row sm:items-center md:p-9">
            <div>
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                Want to try a session first?
              </h2>


              <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">
                Request a demo and our team will contact you to check
                availability and agree on a suitable time.
              </p>
            </div>


            <Link
              href="/book-demo"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 hover:shadow-xl active:scale-[0.98]"
            >
              Book a Demo
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>


        {/* ================= LEGAL LINKS ================= */}
        <Reveal delay={180}>
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