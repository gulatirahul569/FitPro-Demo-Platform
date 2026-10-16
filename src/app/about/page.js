import AboutHero from "@/components/about/AboutHero";
import OurStoryDetail from "@/components/about/OurStoryDetail";
import WhatWeDo from "@/components/about/WhatWeDo";
import WhoItsFor from "@/components/about/WhoItsFor";
import ServicePromise from "@/components/about/ServicePromise";
import AboutFaqPreview from "@/components/about/AboutFaqPreview";
import AboutFinalCta from "@/components/about/AboutFinalCta";

export const metadata = {
  title: "About Us",
  description:
    "Learn how FitPro coordinates in-home fitness demos with suitable trainers based on your goals, location, and preferred timings.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#070d17] text-white">
      <AboutHero />
      <OurStoryDetail />
      <WhatWeDo />
      
      <ServicePromise />
      <WhoItsFor />
      <AboutFaqPreview />
      <AboutFinalCta />
    </main>
  );
}