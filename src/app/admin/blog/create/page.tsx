"use server";
import BlogPostForm from "@/components/admin/blog/PostForm";

export default async function CreateBlogPostPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Create New Blog Post</h1>
      <BlogPostForm />
    </div>
  );
}
