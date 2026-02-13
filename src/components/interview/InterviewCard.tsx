import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";
import { Calendar, Star } from "lucide-react";

const InterviewCard = async ({
  id,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    userId && id
      ? await getFeedbackByInterviewId({ interviewId: id, userId })
      : null;
  const formattedDate = new Date(
    feedback?.createdAt || createdAt || new Date().toISOString(),
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const hasScore = feedback && feedback.totalScore;
  const score = hasScore ? feedback.totalScore : null;

  // Score color based on performance
  let scoreColor = "text-gray-700 dark:text-gray-300";
  let scoreBg = "bg-gray-100 dark:bg-gray-700";

  if (score !== null) {
    if (score >= 80) {
      scoreColor = "text-green-700 dark:text-green-400";
      scoreBg = "bg-green-100 dark:bg-green-900/30";
    } else if (score >= 60) {
      scoreColor = "text-amber-700 dark:text-amber-400";
      scoreBg = "bg-amber-100 dark:bg-amber-900/30";
    } else {
      scoreColor = "text-red-700 dark:text-red-400";
      scoreBg = "bg-red-100 dark:bg-red-900/30";
    }
  }

  return (
    <Card className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-blue-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-700">
      {/* Header with role and type */}
      <div className="relative flex items-center justify-between border-b border-gray-100 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-800/60">
        <h3 className="text-lg font-semibold capitalize text-gray-900 dark:text-white">
          {role} Interview
        </h3>
        <Badge className="rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/40">
          {normalizedType}
        </Badge>
      </div>

      {/* Card Content */}
      <div className="px-6 py-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="size-4" />
            <span>{formattedDate}</span>
          </div>

          {hasScore ? (
            <div
              className={`flex items-center gap-1 rounded-full ${scoreBg} px-3 py-1`}
            >
              <Star className={`size-4 ${scoreColor}`} />
              <span className={`font-medium ${scoreColor}`}>{score}/100</span>
            </div>
          ) : (
            <Badge
              variant="outline"
              className="rounded-full bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            >
              Pending
            </Badge>
          )}
        </div>

        {/* Tech Stack */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-2">
            {techstack.map((tech, index) => (
              <Badge
                key={index}
                variant="outline"
                className="rounded-full border-gray-200 bg-gray-50 text-xs font-normal text-gray-700 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Feedback Preview */}
        <div className="mb-4 min-h-16">
          <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
            {feedback?.finalAssessment ||
              "Interview not completed yet. Take this interview to receive personalized feedback."}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-end border-t border-gray-100 bg-gray-50 px-6 py-3 dark:border-gray-700 dark:bg-gray-800/60">
        <Button
          className="rounded-full transition-all group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500"
          variant="outline"
          asChild
        >
          <Link
            href={
              feedback
                ? `/interviews/interview/${id}/feedback`
                : `/interviews/interview/${id}`
            }
          >
            {feedback ? "Check Feedback" : "Start Interview"}
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export default InterviewCard;
