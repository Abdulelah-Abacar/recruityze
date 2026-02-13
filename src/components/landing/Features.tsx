import { Card, CardContent } from "../ui/card";
import {
  CheckCircle,
  FileText,
  Mic,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";
import { Badge } from "../ui/badge";

function Features() {
  const features = [
    {
      icon: (
        <FileText className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
      ),
      title: "ATS-Guaranteed Resumes",
      description:
        "Build professional resumes that pass Applicant Tracking Systems and get seen by recruiters.",
      badge: "98% Success Rate",
      color: "bg-indigo-100 dark:bg-indigo-900/30",
      benefits: [
        "Keyword Optimization",
        "Professional Templates",
        "Custom Formatting",
      ],
    },
    {
      icon: <Mic className="h-8 w-8 text-violet-600 dark:text-violet-400" />,
      title: "AI Interview Practice",
      description:
        "Practice with voice conversations tailored to your industry, role, and interview type.",
      badge: "Most Popular",
      color: "bg-violet-100 dark:bg-violet-900/30",
      benefits: [
        "Role-specific Questions",
        "Real-time Feedback",
        "Voice Analysis",
      ],
    },
    {
      icon: (
        <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Detailed Feedback",
      description:
        "Get actionable insights on your interview performance and resume improvements.",
      badge: "AI-Powered",
      color: "bg-emerald-100 dark:bg-emerald-900/30",
      benefits: [
        "Answer Improvements",
        "Body Language Tips",
        "Confidence Metrics",
      ],
    },
  ];

  return (
    <section className="relative py-24 dark:bg-gray-900">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
          <svg
            className="h-full w-full text-gray-100 dark:text-gray-800/30"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon points="0,0 100,0 50,100 0,100" />
          </svg>
        </div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-3xl lg:pr-16">
          <Badge className="mb-4 bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">
            OUR FEATURES
          </Badge>
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            Supercharge Your{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
              Job Search
            </span>
          </h2>
          <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
            Our powerful AI tools help you create winning resumes and ace your
            interviews with realistic practice and personalized feedback.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative z-10 overflow-hidden border-0 bg-white shadow-lg transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl dark:bg-gray-800"
            >
              {/* Decorative top border */}
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${index === 0 ? "from-indigo-500 to-indigo-600" : index === 1 ? "from-violet-500 to-violet-600" : "from-emerald-500 to-emerald-600"}`}
              ></div>

              <CardContent className="p-8">
                <div className="mb-6 flex items-center">
                  <div
                    className={`mr-4 flex h-16 w-16 items-center justify-center rounded-lg ${feature.color}`}
                  >
                    {feature.icon}
                  </div>
                  <Badge
                    className={`${index === 0 ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300" : index === 1 ? "bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-300" : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"}`}
                  >
                    {feature.badge}
                  </Badge>
                </div>

                <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>

                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className={`mr-2 h-5 w-5 ${index === 0 ? "text-indigo-500" : index === 1 ? "text-violet-500" : "text-emerald-500"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats section */}
        {/* <div className="mt-16 grid gap-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white dark:from-indigo-900/40 dark:to-violet-900/40 sm:grid-cols-3">
          <div className="flex items-center">
            <Users className="mr-4 h-10 w-10 text-indigo-400" />
            <div>
              <p className="text-3xl font-bold">10,000+</p>
              <p className="text-gray-300">Active Users</p>
            </div>
          </div>
          <div className="flex items-center">
            <Award className="mr-4 h-10 w-10 text-violet-400" />
            <div>
              <p className="text-3xl font-bold">95%</p>
              <p className="text-gray-300">Interview Success</p>
            </div>
          </div>
          <div className="flex items-center">
            <TrendingUp className="mr-4 h-10 w-10 text-emerald-400" />
            <div>
              <p className="text-3xl font-bold">2x</p>
              <p className="text-gray-300">Callback Rate</p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default Features;
