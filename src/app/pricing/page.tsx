import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Hero from "@/components/pricing/Hero";
import Pricing from "@/components/pricing/Pricing";
import FeatureComparison from "@/components/pricing/FeatureComparison";
import FAQ from "@/components/pricing/FAQ";
import CTA from "@/components/pricing/CTA";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Choose the perfect plan for your job search needs",
};

const plans: PricingPlan[] = [
  {
    name: "Free",
    price: {
      monthly: "$0",
      yearly: "$0",
    },
    description: "Essential tools to get started",
    features: [
      { name: "Create 1 resume", available: true },
      { name: "Basic templates", available: true },
      { name: "AI features", available: false },
      { name: "Design customization", available: false },
    ],
    cta: "Get Started",
    variant: "outline",
  },
  {
    name: "Pro",
    price: {
      monthly: "$9.99",
      yearly: "$95.90",
    },
    description: "For serious job seekers",
    features: [
      { name: "Create up to 3 resumes", available: true },
      { name: "AI resume suggestions", available: true },
      { name: "ATS optimization", available: true },
      { name: "Design customization", available: false },
    ],
    isPopular: true,
    cta: "Upgrade Now",
  },
  {
    name: "Pro Plus",
    price: {
      monthly: "$19.99",
      yearly: "$191.90",
    },
    description: "Complete career toolkit",
    features: [
      { name: "Unlimited resumes", available: true },
      { name: "Advanced AI features", available: true },
      { name: "Full design customization", available: true },
      { name: "Priority support", available: true },
    ],
    cta: "Get Pro Plus",
    variant: "outline",
  },
];

const faqs = [
  {
    question: "Can I switch plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "All paid plans come with a 7-day free trial. No credit card required.",
  },
  {
    question: "How does billing work?",
    answer:
      "Monthly plans are billed monthly. Yearly plans are billed annually with a 20% discount.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards and PayPal.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          <Pricing plans={plans} />
          <FeatureComparison plans={plans} />
          <FAQ faqs={faqs} />
          <CTA />
        </div>
      </main>
      <Footer />
    </>
  );
}
