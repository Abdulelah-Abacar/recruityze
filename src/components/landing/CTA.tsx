"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, Users } from "lucide-react";

function CTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [userCount, setUserCount] = useState(9843);

  useEffect(() => {
    // Animation trigger on component mount
    setIsVisible(true);

    // Simulate real-time user count updates
    const interval = setInterval(() => {
      setUserCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const benefits = [
    "AI-powered resume optimization",
    "Interview practice with industry experts",
    "Access to exclusive job opportunities",
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 py-24 dark:from-gray-900 dark:to-gray-800">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-100/30 dark:bg-blue-900/20"></div>
        <div className="absolute -left-12 bottom-12 h-48 w-48 rounded-full bg-blue-100/40 dark:bg-blue-900/30"></div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`mx-auto max-w-4xl rounded-2xl border border-gray-100 bg-white p-4 shadow-lg transition-all duration-700 dark:border-gray-700 dark:bg-gray-800 md:p-8 lg:p-12 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          {/* Real-time social proof */}
          <div className="mx-auto mb-6 flex w-fit items-center justify-center rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <Users size={16} className="mr-2" />
            <span className="mr-1">
              {userCount.toLocaleString()}+ professionals
            </span>{" "}
            have joined this month
          </div>

          <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-blue-400 dark:to-indigo-400 md:text-4xl lg:text-5xl">
            Ready to Transform Your Job Search?
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-700 dark:text-gray-300">
            Join thousands of students and career changers who&apos;ve used{" "}
            <span className="font-semibold">Recruityze</span> to land their
            dream jobs faster than ever before.
          </p>

          {/* Key benefits */}
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-left">
                <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <Button
              asChild
              size="lg"
              className="group relative max-w-full transform overflow-hidden bg-blue-600 px-8 py-6 text-lg font-medium shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <Link href="/sign-up" className="flex items-center">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <p className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle className="mr-1.5 h-4 w-4 text-green-500" />
              No credit card required. Start building your career today.
            </p>
          </div>

          {/* Social proof */}
          <div className="mt-10 border-t border-gray-100 pt-6 dark:border-gray-700">
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Trusted by professionals from companies like:
            </p>
            <div className="flex flex-wrap justify-center gap-6 opacity-80">
              <span className="font-semibold text-gray-400">Google</span>
              <span className="font-semibold text-gray-400">Microsoft</span>
              <span className="font-semibold text-gray-400">Amazon</span>
              <span className="font-semibold text-gray-400">Apple</span>
              <span className="font-semibold text-gray-400">Meta</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
