import Link from "next/link";
import { ArrowRight, FileText, Mic, Award, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { SignedIn, SignedOut } from "@clerk/nextjs";

function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-black"></div>

      {/* Animated dots pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-0 top-0 h-full w-full">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
                animation: `pulse ${Math.random() * 4 + 4}s infinite`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:gap-12">
          {/* Content Column */}
          <div className="mb-16 max-w-2xl text-center lg:mb-0 lg:max-w-none lg:flex-1 lg:text-left">
            <Badge className="mb-4 bg-indigo-600 px-3 py-1 text-sm font-medium text-white dark:bg-indigo-500">
              <Sparkles className="mr-1 h-3.5 w-3.5" /> NEW FEATURE
            </Badge>

            <h1 className="mb-6 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent dark:from-indigo-400 dark:to-violet-400 md:text-6xl">
              Nail Your Job Interviews with AI-Powered Practice
            </h1>

            <p className="mx-auto mb-8 max-w-lg text-xl leading-relaxed text-gray-700 dark:text-gray-300 lg:mx-0">
              Boost your career prospects with AI voice interviews and
              ATS-optimized resumes. Get real-time feedback and improve your
              interview skills from anywhere.
            </p>

            <div className="mb-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <SignedIn>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-indigo-600 px-8 font-medium text-white hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                >
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </SignedIn>
              <SignedOut>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-indigo-600 px-8 font-medium text-white hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                >
                  <Link href="/sign-up">
                    Start free trial <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-gray-300 font-medium hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  <Link href="/demo">See demo</Link>
                </Button>
              </SignedOut>
            </div>

            {/* <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 lg:justify-start">
              <div className="flex items-center">
                <svg
                  className="mr-1 h-4 w-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>4.9/5 from 2,000+ reviews</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="mr-1 h-4 w-4 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Trusted by 10,000+ job seekers</span>
              </div>
            </div> */}
          </div>

          {/* Feature Cards Column */}
          <div className="w-full max-w-md lg:flex-1">
            <div className="relative">
              {/* Glowing background effect */}
              <div className="absolute -left-4 top-20 h-64 w-64 rounded-full bg-indigo-600/30 blur-3xl filter dark:bg-indigo-600/20"></div>
              <div className="absolute -right-10 top-40 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl filter dark:bg-violet-600/10"></div>

              {/* Main feature card */}
              <div className="relative mb-6 transform rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                  <Mic className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  AI Voice Interviews
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Practice with realistic AI interviewers who ask
                  industry-specific questions and provide real-time feedback.
                </p>
                <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                  Most Popular
                </Badge>
              </div>

              {/* Secondary feature card */}
              <div className="relative transform rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900">
                  <FileText className="h-8 w-8 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  ATS-Optimized Resumes
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Create professionally designed resumes that pass through
                  Applicant Tracking Systems with our AI-powered builder.
                </p>
              </div>

              {/* Floating achievement badge */}
              <div className="absolute -right-4 -top-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-amber-400 to-amber-600 text-center text-xs font-bold uppercase text-white shadow-lg dark:border-gray-900">
                <div>
                  <Award className="mx-auto mb-1 h-6 w-6" />
                  <span>Industry Leading</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
