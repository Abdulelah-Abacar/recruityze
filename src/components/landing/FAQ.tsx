"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Search, HelpCircle, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const faqCategories = [
    { id: "all", name: "All Questions" },
    { id: "features", name: "Features" },
    { id: "pricing", name: "Pricing" },
    { id: "security", name: "Security" },
  ];

  // Categorized FAQ items
  const faqItems = [
    {
      id: "item-1",
      category: "features",
      question: "What is an ATS-optimized resume?",
      answer:
        "An ATS (Applicant Tracking System) optimized resume is designed to pass through automated screening software used by employers. Recruityze helps you create resumes with the right keywords, formatting, and structure to increase your chances of getting past these systems and into the hands of actual recruiters.",
      highlight: "Improve interview chances by up to 70%",
    },
    {
      id: "item-2",
      category: "features",
      question: "How does the AI interview practice work?",
      answer:
        "Our AI interview practice lets you have realistic voice conversations with our AI interviewer. You can specify the number of questions, interview type (technical, behavioral, or mixed), and industry focus. After completing the interview, you'll receive detailed feedback on your performance, including strengths and areas for improvement.",
      highlight: "Prepare with industry-specific questions",
    },
    {
      id: "item-3",
      category: "pricing",
      question: "Can I switch between plans?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle. When upgrading, you'll immediately gain access to all the features of your new plan.",
      highlight: "Flexible options for every career stage",
    },
    {
      id: "item-4",
      category: "security",
      question: "Is my data secure?",
      answer:
        "We take data security seriously. All your resume content and interview recordings are encrypted and stored securely. We never share your personal information with third parties without your explicit consent.",
      highlight: "Enterprise-grade security protocols",
    },
    {
      id: "item-5",
      category: "pricing",
      question: "What if I'm not satisfied with the service?",
      answer:
        "We offer a 14-day money-back guarantee for all paid plans. If you're not completely satisfied with Recruityze, contact our support team within 14 days of your purchase for a full refund.",
      highlight: "Risk-free trial with money-back guarantee",
    },
    {
      id: "item-6",
      category: "features",
      question: "Can I get personalized feedback from real recruiters?",
      answer:
        "Yes! Our Premium and Pro plans include personalized resume reviews and feedback sessions with experienced industry recruiters who can provide tailored advice for your specific career goals.",
      highlight: "Get insights from industry professionals",
    },
  ];

  // Filter items based on search query and active category
  const filteredItems = faqItems.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-24 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
            <HelpCircle className="mb-0.5 mr-2 inline-block h-4 w-4" />
            Knowledge Base
          </div>

          <h2 className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent dark:from-blue-400 dark:to-indigo-400 md:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-700 dark:text-gray-300">
            Find answers to common questions about how Recruityze can help
            accelerate your job search and career growth
          </p>

          {/* Search box */}
          <div className="relative mx-auto mb-10 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full rounded-lg border border-gray-200 bg-white px-10 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  onClick={() => setSearchQuery("")}
                >
                  &times;
                </button>
              )}
            </div>
          </div>

          {/* Category tabs */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white dark:bg-blue-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          {filteredItems.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-4">
              {filteredItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <AccordionTrigger className="dark:hover:bg-gray-750 px-6 py-4 text-left text-lg font-medium hover:bg-gray-50 hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-2">
                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                      {item.answer}
                    </p>
                    {item.highlight && (
                      <div className="mt-4 rounded border-l-4 border-blue-500 bg-blue-50 p-3 text-sm text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                        <strong>Pro Tip:</strong> {item.highlight}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="rounded-lg bg-white py-10 text-center shadow-sm dark:bg-gray-800">
              <p className="text-gray-600 dark:text-gray-400">
                No results found for &quot;{searchQuery}&quot;
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                Try different keywords or browse all categories
              </p>
            </div>
          )}

          {/* Contact support section */}
          <div className="mt-16 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center text-white shadow-lg">
            <h3 className="mb-4 text-2xl font-bold">Still have questions?</h3>
            <p className="mb-6">
              Our support team is here to help you with any questions you might
              have
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                variant="secondary"
                className="bg-white px-6 text-blue-600 hover:bg-gray-100"
              >
                <Link href="/contact">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white bg-transparent px-6 text-white hover:bg-white/10"
              >
                <Link href="/docs">
                  View Documentation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Usage statistics */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-center">
          <div className="p-4">
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              93%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              User satisfaction rate
            </p>
          </div>
          <div className="p-4">
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              24hr
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Average support response time
            </p>
          </div>
          <div className="p-4">
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              1k+
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Questions answered monthly
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
