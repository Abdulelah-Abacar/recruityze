import BlogPostForm from "@/components/admin/blog/PostForm";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

// interface EditBlogPostPageProps {
//   params: { id: string };
// }

export default async function EditBlogPostPage({ params }) {
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

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit Blog Post</h1>
      <BlogPostForm initialData={post} isEditMode />
    </div>
  );
}
