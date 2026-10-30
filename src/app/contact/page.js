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
  street: "example",
  city: "panchkula",
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
    <main className="min-h-screen bg-[#070d17] pt-24 text-slate-900 md:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />


      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-12">
        {/* ================= HERO ================= */}
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[#e6e8f2] p-8 shadow-xl shadow-slate-900/5 sm:p-12">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#e6e8f2] blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#e6e8f2] blur-3xl" />


            <div className="relative">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                Get in touch
              </p>


              <h1 className="max-w-3xl text-3xl font-black leading-tight text-slate-900 sm:text-4xl md:text-5xl">
                Contact Us
              </h1>


              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Have a question or feedback? Choose the topic that fits best
                and send us an email. We will respond as soon as possible.
              </p>


              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800"
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
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-[#e6e8f2] px-6 py-3 text-sm font-bold text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 hover:shadow-md"
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
                className="group flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-[#e6e8f2] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 hover:shadow-xl hover:shadow-slate-900/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 sm:p-7"
              >
                <div>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-[#e6e8f2] text-slate-900 transition-colors duration-300 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white">
                    <Mail size={18} />
                  </div>


                  <h2 className="text-lg font-bold text-slate-900">
                    {topic.title}
                  </h2>


                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {topic.description}
                  </p>
                </div>


                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-700 transition-colors group-hover:text-slate-900">
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
          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-[#e6e8f2]">
            <div className="grid gap-px bg-slate-200 md:grid-cols-3">
              <div className="bg-[#e6e8f2] p-6 md:p-8">
                <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Mail size={16} />
                  Email
                </p>


                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-3 block break-all text-sm text-slate-600 underline-offset-4 transition-colors hover:text-slate-900 hover:underline"
                >
                  {EMAIL}
                </a>
              </div>


              <div className="bg-[#e6e8f2] p-6 md:p-8">
                <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <MapPin size={16} />
                  Office
                </p>


                <address className="mt-3 text-sm not-italic leading-6 text-slate-600">
                  {COMPANY}
                  <br />
                  {ADDRESS.street}, {ADDRESS.city}
                  <br />
                  {ADDRESS.region}, {ADDRESS.country}
                </address>
              </div>


              <div className="bg-[#e6e8f2] p-6 md:p-8">
                <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Clock size={16} />
                  Response time
                </p>


                <p className="mt-3 text-sm leading-6 text-slate-600">
                  We aim to reply within 2 business days. Privacy and data
                  requests are acknowledged within 48 hours.
                </p>
              </div>
            </div>


            <div className="flex items-start gap-3 border-t border-slate-200 bg-[#e6e8f2] p-6 md:p-8">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-slate-500" />


              <p className="text-xs leading-5 text-slate-600 sm:text-sm">
                For partnership queries, mention your use case in the subject
                line. Please do not send sensitive personal or health
                information by email.
              </p>
            </div>
          </div>
        </Reveal>


        {/* ================= DEMO CTA ================= */}
        <Reveal delay={150}>
          <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-3xl bg-slate-900 p-7 shadow-xl shadow-slate-900/20 sm:flex-row sm:items-center md:p-9">
            <div>
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                Want to try a session first?
              </h2>


              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                Request a demo and our team will contact you to check
                availability and agree on a suitable time.
              </p>
            </div>


            <Link
              href="/book-demo"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#e6e8f2] px-7 py-3.5 text-sm font-bold text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-100 hover:shadow-xl active:scale-[0.98]"
            >
              Book a Demo
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}