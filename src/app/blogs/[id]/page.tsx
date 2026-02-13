import { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { BlogPostPage } from "@/components/blog/BlogPostPage";

export async function generateMetadata({ params }): Promise<Metadata> {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });

  if (!post) {
    return notFound();
  }

  console.log("Post data:", post);

  return <BlogPostPage post={post} />;
}
