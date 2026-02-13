import { getInterviewById } from "@/lib/actions/general.action";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import Agent from "@/components/interview/Agent";
import { currentUser } from "@clerk/nextjs/server";
import { DisplayTechIcons } from "@/components/interview/DisplayTechIcons";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Bookmark, Share2 } from "lucide-react";

const InterviewPage = async ({ params }) => {
  const { id } = params;
  const user = await currentUser();
  const interview = await getInterviewById(id);

  if (!interview) redirect("/");

  // Calculate expected interview duration (for display purposes)
  const estimatedDuration = Math.round(interview.questions.length * 3); // 3 minutes per question estimation

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      {/* Theme Toggle & Breadcrumb Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="cursor-pointer hover:text-primary dark:hover:text-primary">
            Interviews
          </span>
          <span>/</span>
          <span className="cursor-pointer hover:text-primary dark:hover:text-primary">
            Tech
          </span>
          <span>/</span>
          <span className="font-medium text-primary dark:text-primary">
            {interview.role}
          </span>
        </div>
      </div>

      {/* Interview Header Card */}
      <Card className="mb-8 border-0 bg-gradient-to-r from-slate-50 to-white shadow-lg dark:border-slate-700 dark:from-slate-900 dark:to-slate-800">
        <CardHeader className="pb-2">
          <div className="flex flex-row items-center justify-between gap-4 max-md:flex-col max-md:items-start">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Image
                  src={getRandomInterviewCover()}
                  alt="Interview cover"
                  width={72}
                  height={72}
                  className="rounded-lg border-2 border-white object-cover shadow-md dark:border-slate-700"
                />
                <Badge
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 font-semibold capitalize shadow-sm dark:bg-slate-700 dark:text-slate-200"
                >
                  {interview.type}
                </Badge>
              </div>

              <div>
                <CardTitle className="mb-2 text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {interview.role} Interview Simulation
                </CardTitle>
                <div className="flex flex-wrap items-center gap-4">
                  <DisplayTechIcons techStack={interview.techstack} />
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Clock size={16} />
                    <span>~{estimatedDuration} min</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Users size={16} />
                    <span>1.2k completed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 flex gap-3 md:mt-0">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <Bookmark size={16} />
                <span className="hidden sm:inline">Save</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <Share2 size={16} />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-4 mt-2 rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
            <h3 className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              About this interview
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              This interactive session simulates a real {interview.type}{" "}
              interview for a {interview.role} position. You'll face{" "}
              {interview.questions.length} questions covering key{" "}
              {interview.techstack.join(", ")} concepts and problem-solving
              scenarios. Our AI interviewer will provide feedback on your
              responses.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 dark:bg-emerald-400"></div>
              <span className="text-sm font-medium text-green-600 dark:text-emerald-400">
                Ready to begin
              </span>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 font-medium text-white shadow-md transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg dark:from-indigo-600 dark:to-purple-600 dark:hover:from-indigo-700 dark:hover:to-purple-700">
              Start Interview
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Interviewer Component with animated entrance */}
      <div className="animate-fadeIn opacity-0">
        <Agent
          userName={user?.firstName || "Candidate"}
          userId={user?.id!}
          avatar={user?.imageUrl || "/user-avatar.png"}
          interviewId={id}
          type="practice"
          questions={interview.questions}
        />
      </div>

      {/* Footer with helpful tips */}
      <Card className="mt-8 border-blue-100 bg-blue-50 dark:border-slate-700 dark:bg-slate-800/50">
        <CardContent className="pt-6">
          <h3 className="mb-2 font-medium text-blue-800 dark:text-blue-300">
            Interview Tips
          </h3>
          <ul className="grid grid-cols-1 gap-3 text-sm text-blue-700 dark:text-blue-300 md:grid-cols-2">
            <li className="flex items-start gap-2">
              <div className="mt-1">•</div>
              <div>
                Explain your thought process clearly when solving problems
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1">•</div>
              <div>
                Take your time to think before responding to complex questions
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1">•</div>
              <div>Ask clarifying questions when needed</div>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1">•</div>
              <div>
                Review key {interview.techstack.join(", ")} concepts beforehand
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewPage;
