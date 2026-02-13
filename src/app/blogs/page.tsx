import prisma from "@/lib/prisma";
import { BlogPage } from "@/components/blog/BlogPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Expert tips and insights to help you create standout resumes, ace interviews, and advance your career with AI-powered tools.",
};

async function getPosts() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
  return posts;
}

export default async function Page() {
  const posts = await getPosts();
  return <BlogPage posts={posts} />;
}
