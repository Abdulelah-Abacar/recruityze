import { Footer } from "@/components/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import InterviewPractice from "@/components/landing/InterviewPractice";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Navbar from "@/components/landing/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <InterviewPractice />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
