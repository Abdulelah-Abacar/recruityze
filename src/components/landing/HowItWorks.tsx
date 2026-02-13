import { ArrowDown, User, FileText, Mic, Award } from "lucide-react";
import Image from "next/image";

function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Sign Up",
      description:
        "Create your free account in seconds to get started with Recruityze.",
      icon: <User className="h-6 w-6 dark:text-white" />,
      image: "/sign-up.png",
      imageAlt: "Person signing up on a laptop",
      // color: "from-indigo-600 to-blue-500",
    },
    {
      number: 2,
      title: "Create Your Resume",
      description:
        "Build an ATS-optimized resume with our AI-powered tools and professional templates.",
      icon: <FileText className="h-6 w-6 dark:text-white" />,
      image:
        "https://image.shutterstock.com/image-photo/businessman-working-on-resume-laptop-600w-1051077839.jpg",
      imageAlt: "Person creating resume on laptop",
      // color: "from-violet-600 to-purple-500",
    },
    {
      number: 3,
      title: "Practice Interviews",
      description:
        "Prepare with AI voice interviews tailored to your industry and receive instant feedback.",
      icon: <Mic className="h-6 w-6 dark:text-white" />,
      image: "/interview.png",
      imageAlt: "Woman doing video interview",
      // color: "from-emerald-600 to-teal-500",
    },
    {
      number: 4,
      title: "Land Your Dream Job",
      description:
        "Apply with confidence using your optimized materials and interview skills.",
      icon: <Award className="h-6 w-6 dark:text-white" />,
      image:
        "https://image.shutterstock.com/image-photo/handshake-job-interview-success-business-600w-1421998542.jpg",
      imageAlt: "Job interview handshake",
      // color: "from-amber-600 to-orange-500",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900"></div>
      <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-br from-indigo-50 to-transparent opacity-70 dark:from-indigo-900/10 dark:to-transparent"></div>
      <div className="absolute bottom-0 right-0 h-full w-1/3 bg-gradient-to-tl from-violet-50 to-transparent opacity-70 dark:from-violet-900/10 dark:to-transparent"></div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">
            SIMPLE PROCESS
          </span>
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            How It{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
              Works
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-700 dark:text-gray-300">
            Four simple steps to transform your job application journey and
            increase your chances of landing interviews
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* Steps container with connected timeline */}
          <div className="relative">
            {/* Vertical line connecting steps - only visible on medium screens and up */}
            {/* <div className="absolute left-8 top-8 hidden h-[calc(100%-4rem)] w-1 rounded-full bg-gradient-to-b from-indigo-500 via-violet-500 to-emerald-500 md:block lg:left-10"></div> */}

            {/* Steps */}
            {steps.map((step, index) => (
              <div
                key={index}
                className={`group mb-16 last:mb-0 md:mb-24 ${index % 2 === 0 ? "" : "md:pl-16 lg:pl-24"}`}
              >
                <div
                  className={`flex flex-col items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Step content */}
                  <div
                    className={`relative mb-8 w-full md:mb-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8 lg:pr-16" : "md:pl-8 lg:pl-16"}`}
                  >
                    <div
                      className={`relative z-10 text-center transition-all duration-500 md:text-${index % 2 === 0 ? "left" : "right"}`}
                    >
                      {/* Step number circle */}
                      <div
                        className={`relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${step.color} shadow-lg md:absolute md:top-0 md:mx-0 ${index % 2 === 0 ? "md:-left-8 lg:-left-20" : "md:-right-8 lg:-right-20"} transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl`}
                      >
                        {step.icon}
                        <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold text-gray-900 ring-2 ring-indigo-500 dark:bg-gray-800 dark:text-white">
                          {step.number}
                        </div>
                      </div>

                      {/* Step content */}
                      <div className="md:pt-2">
                        <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                          {step.title}
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step image */}
                  <div className="w-full md:w-1/2">
                    <div
                      className={`overflow-hidden rounded-xl bg-gradient-to-br ${step.color} p-1 shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl`}
                    >
                      <div className="overflow-hidden rounded-lg">
                        <Image
                          src={step.image}
                          alt={step.imageAlt}
                          width={600}
                          height={400}
                          className="h-64 w-full object-cover transition-all duration-700 group-hover:rotate-1 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connector arrow for all but last step */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-6 md:hidden">
                    <ArrowDown className="h-8 w-8 animate-bounce text-indigo-500 dark:text-indigo-400" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 flex justify-center">
            <div className="group overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 p-1 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="flex flex-col items-center gap-8 rounded-lg bg-white px-8 py-6 dark:bg-gray-800 sm:flex-row sm:justify-between">
                <div className="flex flex-col items-center sm:flex-row sm:space-x-4">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 transition-all duration-300 group-hover:bg-indigo-200 dark:bg-indigo-900/30 dark:group-hover:bg-indigo-900/50 sm:mb-0">
                    <svg
                      className="h-8 w-8 text-indigo-600 dark:text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      Ready to get started?
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Join thousands of job seekers using Recruityze
                    </p>
                  </div>
                </div>
                <button className="mt-6 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3 font-medium text-white shadow-md transition-all hover:scale-105 hover:shadow-lg dark:from-indigo-500 dark:to-violet-500 sm:mt-0">
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
