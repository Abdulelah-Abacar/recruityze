import { auth } from "@clerk/nextjs/server";
import { getInterviewsByUserId } from "@/lib/actions/general.action";
import { Card } from "@/components/ui/card";
import { Metadata } from "next";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import CreateInterviewButton from "@/components/interview/CreateInterviewButton";
import { canCreateInterview } from "@/lib/permissions";
import { Footer } from "@/components/Footer";
import {
  Filter,
  Search,
  PlusCircle,
  Clock,
  ChevronRight,
  Lightbulb,
  BookOpen,
  Trophy,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InterviewCard from "@/components/interview/InterviewCard";

export const metadata: Metadata = {
  title: "Interview Dashboard | Practice & Improve",
  description:
    "Practice interviews with AI-powered feedback to land your dream job",
};

const Page = async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const [userInterviews, subscriptionLevel] = await Promise.all([
    await getInterviewsByUserId(userId!),
    getUserSubscriptionLevel(userId),
  ]);

  const hasPastInterviews = (userInterviews?.length || 0) > 0;
  const currentInterviewCount = userInterviews?.length || 0;

  // Organize interviews by feedback status
  const completedInterviews =
    userInterviews?.filter(
      (interview) => interview.feedback && interview.feedback.totalScore,
    ) || [];
  const pendingInterviews =
    userInterviews?.filter(
      (interview) => !interview.feedback || !interview.feedback.totalScore,
    ) || [];

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 pb-16 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto max-w-7xl py-8">
          {/* Hero Section with Improved Visual Design */}
          <Card className="relative mb-10 overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-0 shadow-md dark:border-blue-900/30 dark:from-blue-900/20 dark:to-indigo-900/20 dark:shadow-gray-900/10">
            <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-blue-50 dark:to-blue-900/20"></div>
              <svg
                viewBox="0 0 100 100"
                className="h-full w-full"
                preserveAspectRatio="none"
              >
                <circle
                  cx="80"
                  cy="20"
                  r="15"
                  fill="currentColor"
                  className="text-blue-500"
                />
                <circle
                  cx="40"
                  cy="70"
                  r="20"
                  fill="currentColor"
                  className="text-indigo-500"
                />
                <circle
                  cx="90"
                  cy="90"
                  r="10"
                  fill="currentColor"
                  className="text-purple-500"
                />
              </svg>
            </div>

            <div className="flex flex-col items-start justify-between gap-8 p-4 md:flex-row md:items-center md:p-8">
              <div className="flex max-w-xl flex-col gap-4 md:gap-6">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                  Master Your Interview Skills
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Practice with AI-powered mock interviews and get personalized
                  feedback to improve your chances of landing your dream job.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <CreateInterviewButton
                    canCreate={canCreateInterview(
                      subscriptionLevel,
                      currentInterviewCount,
                    )}
                  >
                    <PlusCircle className="size-4" />
                    Start New Interview
                  </CreateInterviewButton>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 rounded-full border-blue-200 bg-white px-6 font-medium text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
                  >
                    <BookOpen className="size-4" />
                    View Tutorial
                  </Button>
                </div>
              </div>

              {/* Statistics Card */}
              {hasPastInterviews && (
                <Card className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Your Progress
                  </h3>
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                        <Trophy className="size-6" />
                      </div>
                      <p className="mt-1 text-xl font-semibold">
                        {completedInterviews.length}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Completed
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                        <Clock className="size-6" />
                      </div>
                      <p className="mt-1 text-xl font-semibold">
                        {pendingInterviews.length}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Pending
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                        <Layers className="size-6" />
                      </div>
                      <p className="mt-1 text-xl font-semibold">
                        {currentInterviewCount}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Total
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </Card>

          {/* Interview Tabs Section */}
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white sm:mb-0">
              Your Interviews
            </h2>

            {hasPastInterviews && (
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search interviews..."
                    className="rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"
                >
                  <Filter className="size-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Tabs for Interview Categories */}
          {hasPastInterviews ? (
            <Tabs defaultValue="all" className="mb-6">
              <TabsList className="mb-6 bg-gray-100 dark:bg-gray-800">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                >
                  All ({currentInterviewCount})
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                >
                  Completed ({completedInterviews.length})
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                >
                  Pending ({pendingInterviews.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {userInterviews?.map((interview) => (
                    <InterviewCard key={interview.id} {...interview} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="mt-0">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {completedInterviews.map((interview) => (
                    <InterviewCard key={interview.id} {...interview} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="pending" className="mt-0">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {pendingInterviews.map((interview) => (
                    <InterviewCard key={interview.id} {...interview} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="flex flex-col items-center justify-center gap-4 rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="rounded-full bg-blue-100 p-4 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <Lightbulb className="size-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Start Your Interview Journey
              </h3>
              <p className="max-w-md text-gray-600 dark:text-gray-300">
                You haven&apos;t taken any interviews yet. Practice with
                realistic questions and get AI-powered feedback to improve your
                skills.
              </p>
              <CreateInterviewButton
                canCreate={canCreateInterview(
                  subscriptionLevel,
                  currentInterviewCount,
                )}
              >
                <PlusCircle className="size-4" />
                Start Your First Interview
              </CreateInterviewButton>
            </Card>
          )}

          {/* Learning Resources Section */}
          <section className="mt-12 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Interview Resources
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card className="flex cursor-pointer flex-col gap-3 rounded-lg border border-gray-200 bg-gradient-to-b from-amber-50 to-white p-4 transition-all hover:-translate-y-1 hover:shadow-md dark:border-amber-900/30 dark:from-amber-900/20 dark:to-gray-800">
                <div className="w-fit rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                  <BookOpen className="size-5" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Interview Preparation Guide
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Learn essential techniques to prepare for any technical
                  interview.
                </p>
                <Button
                  variant="link"
                  className="mt-auto flex items-center justify-start gap-1 p-0 text-amber-600 dark:text-amber-400"
                >
                  Read more <ChevronRight className="size-4" />
                </Button>
              </Card>

              <Card className="flex cursor-pointer flex-col gap-3 rounded-lg border border-gray-200 bg-gradient-to-b from-blue-50 to-white p-4 transition-all hover:-translate-y-1 hover:shadow-md dark:border-blue-900/30 dark:from-blue-900/20 dark:to-gray-800">
                <div className="w-fit rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Layers className="size-5" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Technical Question Bank
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Browse our library of common technical interview questions.
                </p>
                <Button
                  variant="link"
                  className="mt-auto flex items-center justify-start gap-1 p-0 text-blue-600 dark:text-blue-400"
                >
                  Explore <ChevronRight className="size-4" />
                </Button>
              </Card>

              <Card className="flex cursor-pointer flex-col gap-3 rounded-lg border border-gray-200 bg-gradient-to-b from-green-50 to-white p-4 transition-all hover:-translate-y-1 hover:shadow-md dark:border-green-900/30 dark:from-green-900/20 dark:to-gray-800">
                <div className="w-fit rounded-full bg-green-100 p-2 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <Trophy className="size-5" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Success Stories
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Read how others improved their interview skills and landed
                  jobs.
                </p>
                <Button
                  variant="link"
                  className="mt-auto flex items-center justify-start gap-1 p-0 text-green-600 dark:text-green-400"
                >
                  View stories <ChevronRight className="size-4" />
                </Button>
              </Card>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Page;
