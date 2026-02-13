interface Feedback {
  id: string;
  interviewId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}

interface Interview {
  id: string;
  role: string;
  level: string;
  questions: string[];
  techstack: string[];
  createdAt: string;
  userId: string;
  type: string;
  finalized: boolean;
  feedback?: Feedback;
}

interface CreateFeedbackParams {
  interviewId: string;
  userId: string;
  transcript: { role: string; content: string }[];
  feedbackId?: string;
}

interface User {
  name: string;
  email: string;
  id: string;
}

interface InterviewCardProps {
  id?: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
}

// interface AgentProps {
//   userName: string;
//   userId: string;
//   type: "generate" | "practice";
//   questions?: string[];
//   role?: string;
//   level?: string;
//   interviewType?: "TECHNICAL" | "BEHAVIORAL" | "MIXED";
//   techstack?: string[];
//   avatar: string;
// }

interface AgentProps {
  userName: string;
  userId?: string;
  interviewId?: string;
  feedbackId?: string;
  type: "generate" | "practice";
  questions?: string[];
  avatar?: string;
}

interface CreateInterviewParams {
  userId: string;
  finalized: boolean;
  role: string;
  level: string;
  type: "TECHNICAL" | "BEHAVIORAL" | "MIXED";
  questions: string[];
  techstack: string[];
}

// interface AgentProps {
//   userName: string;
//   userId?: string;
//   interviewId?: string;
//   feedbackId?: string;
//   type: "generate" | "interview";
//   questions?: string[];
// }

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface GetFeedbackByInterviewIdParams {
  interviewId: string;
  userId: string;
}

interface GetLatestInterviewsParams {
  userId: string;
  limit?: number;
}

interface SignInParams {
  email: string;
  idToken: string;
}

interface SignUpParams {
  uid: string;
  name: string;
  email: string;
  password: string;
}

type FormType = "sign-in" | "sign-up";

interface InterviewFormProps {
  interviewId: string;
  role: string;
  level: string;
  type: string;
  techstack: string[];
  amount: number;
}

interface TechIconProps {
  techStack: string[];
}

interface PlanFeature {
  name: string;
  available: boolean;
}

interface PricingPlan {
  name: string;
  price: {
    monthly: string;
    yearly: string;
  };
  description: string;
  features: PlanFeature[];
  isPopular?: boolean;
  cta: string;
  variant?: "default" | "outline";
}

interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  categories?: string[];
  createdAt: string;
}

// interface BlogPost {
//   id?: string;
//   slug: string;
//   title: string;
//   excerpt: string;
//   content: string;
//   coverImage: string;
//   categories: string[];
//   publishedAt: string;
//   published: boolean;
//   readingTime: string;
//   authorId?: string;
//   author: {
//     name: string;
//     avatar: string;
//     id?: string;
//     clerkUserId?: string;
//   };
//   createdAt: string;
//   updatedAt?: string;
// }

// interface CreateBlogPostParams {
//   slug: string;
//   title: string;
//   content: string;
//   excerpt?: string;
//   coverImage: string;
//   categories?: string[];
//   published?: boolean;
// }

// interface UpdateBlogPostParams
//   extends Partial<Omit<CreateBlogPostParams, "slug">> {
//   id: string;
// }
