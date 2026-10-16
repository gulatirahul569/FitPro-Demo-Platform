import Hero from "@/components/home/Hero";
import FeaturedTrainers from "@/components/home/FeaturedTrainers";
import HowItWorks from "@/components/home/HowItWorks";
import Categories from "@/components/home/Categories";
import VideoSection from "@/components/home/VideoSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import BecomeTrainer from "@/components/home/BecomeTrainer";
import FinalCta from "@/components/home/FinalCta";
import OurStory from "@/components/home/Ourstory";
import { FEATURES } from "@/lib/features";
import PackagesPreview from "@/components/home/PackagesPreview";
import DemoJourney from "@/components/about/DemoJourney";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070d17] text-white">
      <Hero />

      {/* Hidden for Phase 1 (flip the flag in lib/features.js to bring back) */}
      {/* {FEATURES.publicTrainerDirectory && <FeaturedTrainers />} */}

      <OurStory />
      <DemoJourney />

      <PackagesPreview />

      <HowItWorks />

      {FEATURES.publicVideoLibrary && <VideoSection />}

      <WhyChooseUs />
      <Testimonials />

      {FEATURES.becomeTrainer && <BecomeTrainer />}
      {FEATURES.homeCategories && <Categories />}

      <FinalCta />
    </main>
  );
}