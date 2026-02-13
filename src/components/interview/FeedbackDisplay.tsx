"use client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Share,
  Download,
  Calendar,
  Star,
  ArrowLeft,
  RefreshCw,
  CheckCircle,
  Check,
} from "lucide-react";
import confetti from "canvas-confetti";

const FeedbackDisplay = ({ interview, feedback, id }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animateScore, setAnimateScore] = useState(false);

  // Determine score level for appropriate visual feedback
  const scoreLevel =
    feedback?.totalScore >= 80
      ? "excellent"
      : feedback?.totalScore >= 60
        ? "good"
        : feedback?.totalScore >= 40
          ? "average"
          : "needs-improvement";

  // Calculate progress percentages for animation
  const scorePercentage = feedback?.totalScore || 0;

  useEffect(() => {
    // Trigger animations after component mount
    setTimeout(() => {
      setAnimateScore(true);

      // Only trigger confetti for high scores
      if (feedback?.totalScore >= 75) {
        setShowConfetti(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }, 500);
  }, [feedback?.totalScore]);

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      {/* Hero Section with Visual Impact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/5 p-8 shadow-sm"
      >
        <div className="text-center">
          <Badge className="mb-3 bg-primary/20 px-3 py-1 text-sm font-medium hover:bg-primary/30">
            Interview Results
          </Badge>

          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            Your{" "}
            <span className="capitalize text-primary">{interview.role}</span>{" "}
            Interview Feedback
          </h1>

          {/* Score and Date in a more visually appealing layout */}
          <div className="mt-6 flex flex-col items-center justify-center gap-8 md:flex-row">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: animateScore ? 1 : 0.8,
                opacity: animateScore ? 1 : 0,
              }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className={`relative flex h-36 w-36 flex-col items-center justify-center rounded-full ${
                scoreLevel === "excellent"
                  ? "bg-green-100"
                  : scoreLevel === "good"
                    ? "bg-blue-100"
                    : scoreLevel === "average"
                      ? "bg-yellow-100"
                      : "bg-red-100"
              }`}
            >
              <svg className="absolute h-full w-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e6e6e6"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={
                    scoreLevel === "excellent"
                      ? "#10b981"
                      : scoreLevel === "good"
                        ? "#3b82f6"
                        : scoreLevel === "average"
                          ? "#f59e0b"
                          : "#ef4444"
                  }
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * scorePercentage) / 100}
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{
                    strokeDashoffset: 283 - (283 * scorePercentage) / 100,
                  }}
                  transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <span className="z-10 text-3xl font-bold">
                {feedback?.totalScore || "N/A"}
              </span>
              <span className="z-10 text-sm font-medium text-muted-foreground">
                out of 100
              </span>
            </motion.div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar size={18} className="text-primary" />
                <p className="text-base">
                  {feedback?.createdAt
                    ? dayjs(feedback.createdAt).format("MMMM D, YYYY • h:mm A")
                    : "Date unavailable"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Star size={18} className="text-amber-500" />
                <p className="text-base">
                  {scoreLevel === "excellent"
                    ? "Excellent performance!"
                    : scoreLevel === "good"
                      ? "Good job!"
                      : scoreLevel === "average"
                        ? "Room for improvement"
                        : "Focus on skill development"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Final Assessment - Highlighted */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="lg:col-span-3"
        >
          <Card className="border-l-4 border-l-primary shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-xl font-bold">
                <span className="inline-block rounded-full bg-primary/10 p-2">
                  <Star size={18} className="text-primary" />
                </span>
                Final Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">
                {feedback?.finalAssessment ||
                  "No assessment available for this interview."}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Scores with Visual Progress Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Card className="h-full shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-xl font-bold">
                <span className="inline-block rounded-full bg-blue-100 p-2">
                  <Image
                    src="/star.svg"
                    width={18}
                    height={18}
                    alt="star"
                    className="text-blue-600"
                  />
                </span>
                Performance by Category
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {feedback?.categoryScores?.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * (index + 1), duration: 0.4 }}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{category.name}</h3>
                      <span
                        className={`rounded px-2 py-1 text-sm font-bold ${
                          category.score >= 80
                            ? "bg-green-100 text-green-700"
                            : category.score >= 60
                              ? "bg-blue-100 text-blue-700"
                              : category.score >= 40
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                        }`}
                      >
                        {category.score}/100
                      </span>
                    </div>

                    <Progress
                      value={category.score}
                      className="h-2"
                      // indicatorClassName={`
                      //   ${
                      //     category.score >= 80
                      //       ? "bg-green-500"
                      //       : category.score >= 60
                      //         ? "bg-blue-500"
                      //         : category.score >= 40
                      //           ? "bg-yellow-500"
                      //           : "bg-red-500"
                      //   }`}
                    />

                    <p className="text-sm text-muted-foreground">
                      {category.comment}
                    </p>
                  </div>
                  <Separator className="my-4" />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Strengths & Improvements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-6"
        >
          <Card className="border-l-4 border-l-green-500 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-xl font-bold">
                <CheckCircle
                  size={30}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 p-1 text-green-500"
                />
                Key Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {feedback?.strengths?.map((strength, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * (index + 1), duration: 0.3 }}
                    className="flex items-start"
                  >
                    <Check
                      size={12}
                      className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 p-1 text-green-500"
                    />
                    <span className="text-base">{strength}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-xl font-bold">
                <span className="inline-block rounded-full bg-amber-100 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-amber-600"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </span>
                Improvement Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {feedback?.areasForImprovement?.map((area, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * (index + 1), duration: 0.3 }}
                    className="flex items-start"
                  >
                    <span className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-amber-600"
                      >
                        <path d="M16 16l-4-4-4 4"></path>
                        <path d="M12 12v6"></path>
                        <path d="M8 22h8"></path>
                        <path d="M12 2v6"></path>
                      </svg>
                    </span>
                    <span className="text-base">{area}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Action Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-10"
      >
        <Card className="border-t-4 border-primary bg-gradient-to-r from-slate-50 to-gray-50 shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="col-span-2 flex flex-col justify-center">
                <h3 className="text-xl font-bold">
                  Ready to improve your skills?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Practice makes perfect! Take another interview or review your
                  results.
                </p>
              </div>

              <div className="flex flex-col flex-wrap justify-center gap-4 sm:items-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="group relative w-full overflow-hidden shadow-sm"
                  asChild
                >
                  <Link href="/interviews">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    <span>Back to Dashboard</span>
                    <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transform bg-primary transition-transform group-hover:scale-x-100"></span>
                  </Link>
                </Button>
              </div>

              <div className="flex flex-col justify-center gap-4 sm:items-center">
                <Button
                  variant="default"
                  size="lg"
                  className="group relative w-full overflow-hidden bg-primary shadow-md hover:bg-primary/90"
                  asChild
                >
                  <Link href={`/interviews/interview/${id}`}>
                    <RefreshCw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
                    <span>Retake Interview</span>
                    <span className="absolute inset-0 translate-y-full transform bg-white/20 opacity-0 transition-transform group-hover:translate-y-0 group-hover:opacity-100"></span>
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Share and Download Options */}
      <div className="mt-6 flex justify-end gap-4">
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Share size={16} className="mr-2" /> Share Results
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Download size={16} className="mr-2" /> Download PDF
        </Button>
      </div>
    </main>
  );
};

export default FeedbackDisplay;
