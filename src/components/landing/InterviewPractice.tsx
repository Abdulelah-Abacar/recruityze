"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Mic,
  MicOff,
  Play,
  BarChart,
  ChevronRight,
  Star,
  MessageCircle,
  PauseCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";

function InterviewPractice() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const interviewQuestions = [
    "Tell me about a challenging project you've worked on.",
    "How do you handle tight deadlines?",
    "What are your greatest strengths?",
  ];

  const interviewResponses = [
    "I'm hearing good points about your project management skills...",
    "Good job explaining your approach to deadlines! Consider adding more about prioritization.",
    "Strong answer! You clearly articulated your technical expertise.",
  ];

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % interviewQuestions.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAnimating, interviewQuestions.length]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-24 dark:from-gray-900 dark:to-gray-800">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-blue-100 opacity-60 dark:bg-blue-900"></div>
        <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-purple-100 opacity-40 dark:bg-purple-900"></div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center lg:flex-row">
          {/* Left Content */}
          <div className="mb-16 lg:mb-0 lg:w-1/2 lg:pr-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
              New Feature
            </Badge>
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Master Your{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Interviews
              </span>{" "}
              with AI
            </h2>
            <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">
              Prepare confidently for your next job interview with our
              AI-powered voice conversation system. Practice makes perfect, and
              our intelligent assistant helps you get there.
            </p>

            <div className="mb-10 space-y-6">
              <div className="transform rounded-lg border border-blue-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-blue-900 dark:bg-gray-800">
                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0">
                    <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                      <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                      Industry-Specific Questions
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Choose from technical, behavioral, or role-specific
                      interview questions tailored to your industry.
                    </p>
                  </div>
                </div>
              </div>

              <div className="transform rounded-lg border border-blue-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-blue-900 dark:bg-gray-800">
                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0">
                    <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                      <Mic className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                      Natural Voice Conversations
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Practice speaking naturally with our AI interviewer that
                      responds to your answers in real-time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="transform rounded-lg border border-blue-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-blue-900 dark:bg-gray-800">
                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0">
                    <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                      <BarChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                      Actionable Feedback
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Receive personalized scores, feedback, and improvement
                      tips after each practice session.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-6 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button
                size="lg"
                className={`group relative overflow-hidden bg-blue-600 px-8 text-white transition-all duration-300 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 ${
                  isHovering ? "animate-pulse" : ""
                }`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                asChild
              >
                <Link href="/interviews">
                  <span className="flex items-center">
                    Start Practicing Now
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>

              {/* <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <div className="mr-2 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span>4.9/5 from 2,000+ users</span>
              </div> */}
            </div>
          </div>

          {/* Right Content - Interactive Interview Mockup */}
          <div className="lg:w-1/2">
            <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-xl dark:border-blue-900 dark:bg-gray-800">
              {/* Header */}
              <div className="border-b border-blue-100 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-900/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Badge className="mr-2 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200">
                      LIVE
                    </Badge>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      AI Interview Session
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsAnimating(!isAnimating)}
                      className="flex items-center"
                    >
                      {isAnimating ? (
                        <>
                          <PauseCircle className="mr-1 h-4 w-4" />
                          Pause Demo
                        </>
                      ) : (
                        <>
                          <Play className="mr-1 h-4 w-4" />
                          Play Demo
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Interview Area */}
              <div className="p-6">
                {/* AI Interviewer */}
                <div className="mb-8 flex items-start">
                  <div className="mr-4 flex-shrink-0">
                    <div className="relative">
                      <div className="size-12 overflow-hidden rounded-full border-2 border-blue-100 bg-blue-50 shadow-md dark:border-blue-800 dark:bg-blue-900/30">
                        <Image
                          src="/api/placeholder/40/40"
                          alt="AI Interviewer"
                          width={40}
                          height={40}
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 rounded-full bg-green-500 p-1">
                        <Mic className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        AI Interviewer
                      </h4>
                      <Badge className="ml-2 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                        Bot
                      </Badge>
                    </div>
                    <div className="rounded-lg rounded-tl-none bg-blue-50 p-4 dark:bg-blue-900/20">
                      <p className="text-gray-700 dark:text-gray-300">
                        {interviewQuestions[currentStep]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* User Response */}
                <div className="mb-8 flex items-start justify-end">
                  <div className="flex-1 text-right">
                    <div className="mb-1 flex items-center justify-end">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        You
                      </h4>
                    </div>
                    <div className="rounded-lg rounded-tr-none bg-blue-600 p-4 text-white dark:bg-blue-700">
                      <p>
                        {isAnimating
                          ? "I'm responding to the question with clear examples from my experience..."
                          : "Click 'Play Demo' to see the interview in action"}
                      </p>
                    </div>
                    <div
                      className={`mt-2 flex items-center justify-end ${isAnimating ? "" : "invisible"}`}
                    >
                      <div className="mr-2 size-2 animate-pulse rounded-full bg-red-500"></div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Recording...
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <div className="relative">
                      <div className="size-12 overflow-hidden rounded-full border-2 border-blue-100 shadow-md dark:border-blue-800">
                        <Image
                          src="/api/placeholder/40/40"
                          alt="User"
                          width={40}
                          height={40}
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 rounded-full bg-red-500 p-1">
                        <Mic className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feedback Area */}
                <div
                  className={`transition-opacity duration-500 ${isAnimating ? "opacity-100" : "opacity-50"}`}
                >
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                    <h5 className="mb-2 font-medium text-gray-900 dark:text-gray-100">
                      Feedback
                    </h5>
                    <p className="text-gray-700 dark:text-gray-300">
                      {interviewResponses[currentStep]}
                    </p>
                    <div className="mt-3 flex items-center">
                      <div className="flex w-full max-w-xs flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-2 bg-green-500 transition-all duration-1000"
                          style={{
                            width: isAnimating
                              ? `${75 + currentStep * 5}%`
                              : "65%",
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {isAnimating ? `${75 + currentStep * 5}%` : "65%"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="border-t border-blue-100 bg-gray-50 p-4 dark:border-blue-900 dark:bg-gray-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" disabled={!isAnimating}>
                      <MicOff className="mr-1 h-4 w-4" />
                      Mute
                    </Button>
                    <Button size="sm" variant="outline" disabled={!isAnimating}>
                      Skip
                    </Button>
                  </div>
                  <div>
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                      Question {currentStep + 1}/{interviewQuestions.length}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="mt-6 rounded-lg border border-blue-100 bg-white p-4 shadow-md dark:border-blue-900 dark:bg-gray-800">
              <div className="flex items-center">
                <div className="mr-3 flex-shrink-0">
                  <Image
                    src="/api/placeholder/32/32"
                    alt="User"
                    width={32}
                    height={32}
                    className="size-8 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    &quot;After practicing with this AI interviewer, I felt so
                    much more confident. I nailed my interview and got the
                    job!&quot;
                  </p>
                  <p className="mt-1 text-xs font-medium text-gray-600 dark:text-gray-400">
                    — Sarah K., Software Developer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InterviewPractice;
