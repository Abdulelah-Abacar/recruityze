import BlogPostsTable from "@/components/admin/blog/PostsTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";

export default async function BlogAdminPage() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Link href="/admin/blog/create">
          <Button>Create New Post</Button>
        </Link>
      </div>

      <BlogPostsTable posts={posts} />
    </div>
  );
}
