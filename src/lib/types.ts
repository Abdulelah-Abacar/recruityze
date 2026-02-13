import { Prisma } from "@prisma/client";
import { ResumeValues } from "./validation";

export interface EditorFormProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

export const resumeDataInclude = {
  workExperiences: true,
  educations: true,
} satisfies Prisma.ResumeInclude;

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: typeof resumeDataInclude;
}>;

// export type BlogPost = {
//   id?: string;
//   slug: string;
//   title: string;
//   excerpt: string;
//   coverImage: string;
//   categories: string[];
//   publishedAt: string;
//   published: boolean;
//   readingTime: string;
//   author: {
//     name: string;
//     avatar: string;
//   };
//   createdAt: string;
//   updatedAt?: string;
// };

// export type BlogPosts = BlogPost[];
