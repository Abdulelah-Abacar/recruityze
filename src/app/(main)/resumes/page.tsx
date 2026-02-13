import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import CreateResumeButton from "../../../components/resume/CreateResumeButton";
import ResumeItem from "../../../components/resume/ResumeItem";
import { Footer } from "@/components/Footer";
import { Plus, Search, SortDesc, Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Resume Dashboard | Manage Your Professional Documents",
  description:
    "Create, organize and manage all your professional resumes in one place",
};

export default async function ResumeDashboard() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const [resumes, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: resumeDataInclude,
    }),
    prisma.resume.count({
      where: {
        userId,
      },
    }),
  ]);

  const hasResumes = resumes.length > 0;

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
          {/* Header Section with Dark Mode Support */}
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                Your Resume Portfolio
              </h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                Manage and organize all your professional documents in one place
              </p>
            </div>
          </div>

          {/* Action Bar with Dark Mode Support */}
          <div
            className={cn(
              "mb-8 flex flex-col justify-between gap-4 rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:shadow-gray-900/20 md:flex-row md:items-center",
              hasResumes && "p-4",
            )}
          >
            {hasResumes && (
              <div className="flex items-center gap-2">
                <CreateResumeButton />

                <div className="relative ml-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                  {totalCount} {totalCount === 1 ? "resume" : "resumes"}
                </div>
              </div>
            )}

            {hasResumes && (
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search resumes..."
                    className="rounded-full border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                    <SortDesc className="h-4 w-4" />
                    <span>Sort</span>
                  </button>
                  <div className="flex rounded-full border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700">
                    <button className="rounded-l-full px-3 py-2 text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-600">
                      <Grid className="h-4 w-4" />
                    </button>
                    <button className="rounded-r-full px-3 py-2 text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-600">
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Resume Grid with Dark Mode Support */}
          {hasResumes ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="group transition-all duration-300 hover:-translate-y-1"
                >
                  <ResumeItem resume={resume} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg bg-white p-10 text-center shadow-sm dark:bg-gray-800 dark:shadow-gray-900/20">
              <div className="mb-4 rounded-full bg-blue-100 p-4 dark:bg-blue-900/30">
                <Plus className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Create your first resume
              </h2>
              <p className="mb-6 max-w-sm text-gray-600 dark:text-gray-300">
                Get started by creating a professional resume that will help you
                stand out from the crowd.
              </p>
              <CreateResumeButton />
            </div>
          )}

          {/* Tips Section with Dark Mode Support */}
          {hasResumes && (
            <div className="mt-12 rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
              <h3 className="mb-2 text-lg font-semibold text-blue-900 dark:text-blue-300">
                Resume Tips
              </h3>
              <p className="text-blue-800 dark:text-blue-200">
                Keep your resumes updated regularly to reflect your most recent
                experience and skills.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
