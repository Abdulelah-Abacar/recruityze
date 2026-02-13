import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { getInterviewsByUserId } from "@/lib/actions/general.action";
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import stripe from "@/lib/stripe";
import Stripe from "stripe";
import { format } from "date-fns";
import {
  FileText,
  Video,
  Settings,
  Book,
  CreditCard,
  ChevronRight,
  Star,
  Award,
  Zap,
  Bell,
} from "lucide-react";
import ManageSubscriptionButton from "../billing/ManageSubscriptionButton";
import GetSubscriptionButton from "../billing/GetSubscriptionButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default async function DashboardPage() {
  const user = await currentUser();
  const userId = user?.id;

  const [resumes, interviews, subscription, blogHistory] = await Promise.all([
    prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: resumeDataInclude,
    }),
    await getInterviewsByUserId(userId!),
    prisma.userSubscription.findUnique({
      where: { userId },
    }),
    [], // Replace with actual blog history when available
  ]);

  const billingInfo = subscription
    ? await stripe.prices.retrieve(subscription.stripePriceId, {
        expand: ["product"],
      })
    : null;

  // Calculate usage metrics (for demo purposes)
  const totalResumes = resumes.length;
  const totalInterviews = interviews?.length || 0;
  const resumeProgress = Math.min(100, (totalResumes / 5) * 100);
  const interviewProgress = Math.min(100, (totalInterviews / 10) * 100);

  const isPremium = !!subscription;
  const planName = billingInfo
    ? (billingInfo.product as Stripe.Product).name
    : "Free Plan";
  const renewDate = subscription?.stripeCurrentPeriodEnd
    ? format(new Date(subscription.stripeCurrentPeriodEnd), "MMMM dd, yyyy")
    : null;

  // Get time of day for personalized greeting
  const now = new Date();
  const hour = now.getHours();
  let greeting = "Good evening";
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";

  return (
    <div className="container mx-auto px-4 py-8 transition-colors duration-300">
      {/* Dashboard Header with Stats */}
      <div className="mb-10 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {greeting}, {user?.firstName} 👋
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Your career progress dashboard
            </p>
          </div>

          {/* <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Bell size={16} />
              <span className="hidden sm:inline">Notifications</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Settings size={16} />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          </div> */}
        </div>

        {/* Usage Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="overflow-hidden border-l-4 border-l-primary">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Resumes
                </p>
                <h3 className="text-2xl font-bold">{totalResumes}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-l-4 border-l-cyan-500">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10">
                <Video className="h-6 w-6 text-cyan-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Interviews
                </p>
                <h3 className="text-2xl font-bold">{totalInterviews}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-l-4 border-l-amber-500">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
                <Star className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Plan
                </p>
                <h3 className="text-2xl font-bold">
                  {isPremium ? "Premium" : "Free"}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-l-4 border-l-green-500">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                <Award className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Progress
                </p>
                <h3 className="text-2xl font-bold">
                  {Math.round((resumeProgress + interviewProgress) / 2)}%
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid gap-8 md:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-8 md:col-span-2">
          {/* Quick Actions */}
          <Card className="overflow-hidden border-t-4 border-t-primary">
            <CardHeader className="space-y-1 pb-2">
              <CardTitle className="flex items-center text-2xl">
                <Zap className="mr-2 h-5 w-5 text-primary" /> Quick Actions
              </CardTitle>
              <CardDescription>
                Get started with your career tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <Button
                  asChild
                  variant="outline"
                  className="h-24 flex-col justify-center gap-2 hover:bg-primary/5 hover:text-primary"
                >
                  <Link href="/resumes">
                    <FileText className="h-6 w-6" />
                    <span>Create Resume</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-24 flex-col justify-center gap-2 hover:bg-primary/5 hover:text-primary"
                >
                  <Link href="/interviews">
                    <Video className="h-6 w-6" />
                    <span>Start Interview</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-24 flex-col justify-center gap-2 hover:bg-primary/5 hover:text-primary"
                >
                  <Link href="/blogs">
                    <Book className="h-6 w-6" />
                    <span>Career Articles</span>
                  </Link>
                </Button>
                {/* <Button
                  asChild
                  variant="outline"
                  className="h-24 flex-col justify-center gap-2 hover:bg-primary/5 hover:text-primary"
                >
                  <Link href="#">
                    <Settings className="h-6 w-6" />
                    <span>Settings</span>
                  </Link>
                </Button> */}
              </div>
            </CardContent>
          </Card>

          {/* Content Tabs */}
          <Tabs defaultValue="resumes" className="w-full">
            <TabsList className="grid h-min w-full grid-cols-3">
              <TabsTrigger value="resumes" className="text-sm sm:text-base">
                Resumes
              </TabsTrigger>
              <TabsTrigger value="interviews" className="text-sm sm:text-base">
                Interviews
              </TabsTrigger>
              <TabsTrigger value="articles" className="text-sm sm:text-base">
                Articles
              </TabsTrigger>
            </TabsList>

            {/* Resumes Tab */}
            <TabsContent value="resumes" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Your Resumes</CardTitle>
                    <CardDescription>
                      Manage and create professional resumes
                    </CardDescription>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="gap-1">
                    <Link href="/resumes">
                      View All <ChevronRight size={16} />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {resumes.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      {resumes.slice(0, 4).map((resume) => (
                        <Card
                          key={resume.id}
                          className="group cursor-pointer overflow-hidden border transition-all duration-300 hover:border-primary hover:shadow-md"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium group-hover:text-primary">
                                  {resume.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  Updated:{" "}
                                  {format(
                                    new Date(resume.updatedAt),
                                    "MMM d, yyyy",
                                  )}
                                </p>
                              </div>
                              {/* <Badge
                                variant={
                                  resume.isPublished ? "default" : "outline"
                                }
                                className="ml-2"
                              >
                                {resume.isPublished ? "Published" : "Draft"}
                              </Badge> */}
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                              <Button
                                asChild
                                variant="link"
                                className="h-auto p-0 text-primary"
                              >
                                <Link href={`/editor/${resume.id}`}>
                                  Edit Resume
                                </Link>
                              </Button>
                              {/* <span className="text-xs text-muted-foreground">
                                Rev. {resume.version || 1}
                              </span> */}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-12 text-center">
                      <FileText className="mb-2 h-12 w-12 text-muted-foreground" />
                      <p className="mb-4 text-lg font-medium">No resumes yet</p>
                      <p className="mb-6 max-w-md text-muted-foreground">
                        Create your first professional resume to stand out to
                        employers
                      </p>
                      <Button asChild size="lg" className="gap-2">
                        <Link href="/resumes">
                          <FileText size={18} />
                          Create Your First Resume
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Interviews Tab */}
            <TabsContent value="interviews" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Interview Practice</CardTitle>
                    <CardDescription>
                      Review your practice interview sessions
                    </CardDescription>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="gap-1">
                    <Link href="/interviews">
                      View All <ChevronRight size={16} />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {interviews && interviews.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      {interviews.slice(0, 4).map((interview) => (
                        <Card
                          key={interview.id}
                          className="group cursor-pointer overflow-hidden border transition-all duration-300 hover:border-primary hover:shadow-md"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium capitalize group-hover:text-primary">
                                  {interview.role}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {format(
                                    new Date(interview.createdAt),
                                    "MMM d, yyyy",
                                  )}
                                </p>
                              </div>
                              <Badge
                                variant="outline"
                                className="ml-2 capitalize"
                              >
                                {interview.type}
                              </Badge>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                              <Button
                                asChild
                                variant="link"
                                className="h-auto p-0 text-primary"
                              >
                                <Link
                                  href={`/interviews/interview/${interview.id}`}
                                >
                                  {interview.feedback
                                    ? "View Feedback"
                                    : "Continue Interview"}
                                </Link>
                              </Button>
                              {interview.feedback && (
                                <Badge variant="secondary">Completed</Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-12 text-center">
                      <Video className="mb-2 h-12 w-12 text-muted-foreground" />
                      <p className="mb-4 text-lg font-medium">
                        No interview practice yet
                      </p>
                      <p className="mb-6 max-w-md text-muted-foreground">
                        Practice with AI interviews to build confidence and
                        improve your skills
                      </p>
                      <Button asChild size="lg" className="gap-2">
                        <Link href="/interviews">
                          <Video size={18} />
                          Start Practice Interview
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Articles Tab */}
            <TabsContent value="articles" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Career Articles</CardTitle>
                    <CardDescription>
                      Latest insights to boost your career
                    </CardDescription>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="gap-1">
                    <Link href="/blogs">
                      View All <ChevronRight size={16} />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {blogHistory.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      {blogHistory.slice(0, 4).map((blog) => (
                        <Card
                          key={blog.id}
                          className="group cursor-pointer overflow-hidden border transition-all duration-300 hover:border-primary hover:shadow-md"
                        >
                          <CardContent className="p-4">
                            <h3 className="line-clamp-2 font-medium group-hover:text-primary">
                              {blog.title}
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Viewed:{" "}
                              {format(new Date(blog.viewedAt), "MMM d, yyyy")}
                            </p>
                            <Button
                              asChild
                              variant="link"
                              className="mt-3 h-auto p-0 text-primary"
                            >
                              <Link href={`/blog/${blog.slug}`}>
                                Read Again
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-12 text-center">
                      <Book className="mb-2 h-12 w-12 text-muted-foreground" />
                      <p className="mb-4 text-lg font-medium">
                        Discover career articles
                      </p>
                      <p className="mb-6 max-w-md text-muted-foreground">
                        Gain insights from expert career advice and industry
                        trends
                      </p>
                      <Button asChild size="lg" className="gap-2">
                        <Link href="/blogs">
                          <Book size={18} />
                          Browse Career Articles
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Progress Tracker */}
          {isPremium && (
            <Card>
              <CardHeader>
                <CardTitle>Your Career Progress</CardTitle>
                <CardDescription>Track your career preparation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Resume Building</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(resumeProgress)}%
                    </span>
                  </div>
                  <Progress value={resumeProgress} className="h-2" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">
                      Interview Practice
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(interviewProgress)}%
                    </span>
                  </div>
                  <Progress value={interviewProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Account & Subscription */}
        <div className="space-y-8">
          {/* Subscription Card */}
          <Card className="overflow-hidden border-t-4 border-t-amber-500">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-amber-500" />
                Your Plan
              </CardTitle>
              <CardDescription>
                {isPremium
                  ? "Premium features activated"
                  : "Upgrade for full access"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-muted p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-medium">Current Plan:</span>
                  <Badge
                    variant={isPremium ? "default" : "secondary"}
                    className="ml-2"
                  >
                    {planName}
                  </Badge>
                </div>

                {isPremium && renewDate && (
                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <span className="font-medium">Renews on:</span>
                    <span>{renewDate}</span>
                  </div>
                )}

                {isPremium ? (
                  <>
                    <div className="mt-4 flex flex-col space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>Unlimited resume builds</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>Advanced interview practice</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>Priority customer support</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <ManageSubscriptionButton />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-4 flex flex-col space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>Unlimited resume builds</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>10+ interview simulations</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>Expert career content</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <GetSubscriptionButton />
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Billing Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Billing Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Next Billing:</span>
                  <span>{renewDate || "N/A"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Payment Method:</span>
                  <span>{billingInfo?.object || "Not set"}</span>
                </div>
                <Button asChild variant="outline" className="mt-4 w-full">
                  <Link href="/billing">View Billing History</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Articles */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended For You</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-muted p-2">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">10 Resume Tips For 2025</h4>
                    <p className="text-sm text-muted-foreground">3 min read</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-muted p-2">
                    <Video className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">
                      Master Behavioral Interviews
                    </h4>
                    <p className="text-sm text-muted-foreground">5 min read</p>
                  </div>
                </div>
                <Button asChild variant="link" className="mt-2 p-0">
                  <Link href="/blogs">View All Articles</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper components
function CheckIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
