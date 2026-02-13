import { BlogPosts } from "./lib/types";

export const sampleBlogPostData: CreateBlogPostParams = {
  slug: "getting-started-with-recruiting",
  title: "Getting Started with Modern Recruiting",
  content: `# Modern Recruiting Best Practices

## Introduction
Recruiting has evolved significantly in recent years. In this post, we'll explore...

## Key Strategies
1. **Leverage Technology**: Use AI-powered tools to screen candidates
2. **Candidate Experience**: Focus on creating a positive interview process
3. **Data-Driven Decisions**: Track metrics like time-to-hire and quality-of-hire

## Conclusion
Modern recruiting requires a blend of technology and human touch.`,
  excerpt:
    "Explore the essential strategies for effective modern recruiting in today's competitive job market.",
  coverImage: "",
  categories: ["recruiting", "hiring"],
  published: true,
};

export const allPosts: BlogPosts = [
  {
    id: "1",
    slug: "ats-friendly-resume-tips",
    title: "Top 10 ATS-Friendly Resume Tips for 2025",
    excerpt:
      "Learn how to optimize your resume to pass through Applicant Tracking Systems and land more interviews.",
    coverImage: "https://picsum.photos/600/400?random=1",
    categories: ["Resume Building", "ATS Optimization"],
    publishedAt: "2025-03-28T12:00:00Z",
    createdAt: "2025-03-28T12:00:00Z",
    published: true,
    readingTime: "5 min read",
    author: {
      id: "user_1",
      name: "Jamie Rodriguez",
      avatar: "https://picsum.photos/40/40?random=101",
    },
  },
  {
    id: "2",
    slug: "mastering-behavioral-interviews",
    title: "Mastering Behavioral Interviews: The STAR Method Explained",
    excerpt:
      "A comprehensive guide to using the Situation, Task, Action, Result method to excel in behavioral interviews.",
    coverImage: "https://picsum.photos/600/400?random=2",
    categories: ["Interview Preparation"],
    publishedAt: "2025-03-20T10:30:00Z",
    readingTime: "8 min read",
    author: {
      name: "Alex Chen",
      avatar: "https://picsum.photos/40/40?random=102",
    },
  },
  {
    id: "3",
    slug: "ai-tools-for-job-seekers",
    title: "How AI is Transforming the Job Search Process",
    excerpt:
      "Discover the latest AI tools helping job seekers create better resumes, prepare for interviews, and find the perfect job match.",
    coverImage: "https://picsum.photos/600/400?random=3",
    categories: ["AI Career Tools", "Career Transitions"],
    publishedAt: "2025-03-15T14:45:00Z",
    readingTime: "6 min read",
    author: {
      name: "Morgan Taylor",
      avatar: "https://picsum.photos/40/40?random=103",
    },
  },
  {
    id: "4",
    slug: "career-change-success-stories",
    title: "From Tech to Marketing: Success Stories of Career Changers",
    excerpt:
      "Real stories from professionals who successfully pivoted their careers with the right resume approach and interview strategy.",
    coverImage: "https://picsum.photos/600/400?random=4",
    categories: ["Career Transitions"],
    publishedAt: "2025-03-12T09:15:00Z",
    readingTime: "10 min read",
    author: {
      name: "Jordan Smith",
      avatar: "https://picsum.photos/40/40?random=104",
    },
  },
  {
    id: "5",
    slug: "technical-interview-preparation",
    title: "Ace Your Technical Interview: A Developers Guide",
    excerpt:
      "Essential preparation tips for software development interviews, including coding challenges and system design questions.",
    coverImage: "https://picsum.photos/600/400?random=5",
    categories: ["Interview Preparation"],
    publishedAt: "2025-03-05T16:20:00Z",
    readingTime: "7 min read",
    author: {
      name: "Priya Patel",
      avatar: "https://picsum.photos/40/40?random=105",
    },
  },
  {
    id: "6",
    slug: "using-ai-for-cover-letters",
    title: "How to Use AI to Craft the Perfect Cover Letter",
    excerpt:
      "Leverage AI tools to create personalized, compelling cover letters that complement your resume and stand out to hiring managers.",
    coverImage: "https://picsum.photos/600/400?random=6",
    categories: ["AI Career Tools", "Resume Building"],
    publishedAt: "2025-02-28T11:45:00Z",
    readingTime: "6 min read",
    author: {
      name: "Morgan Taylor",
      avatar: "https://picsum.photos/40/40?random=106",
    },
  },
];
