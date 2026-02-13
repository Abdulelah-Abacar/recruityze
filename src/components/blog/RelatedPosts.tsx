import Link from "next/link";
import { allPosts } from "@/data";
import { BlogCard } from "./BlogCard";

export const RelatedPosts = ({
  currentPostId,
  categories,
}: {
  currentPostId: string;
  categories: string[];
}) => {
  const relatedPosts = allPosts
    .filter(
      (post) =>
        post.id !== currentPostId &&
        post.categories.some((cat) => categories.includes(cat)),
    )
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <div className="mx-auto mt-16 max-w-3xl">
      <h2 className="mb-6 text-2xl font-semibold">Related Articles</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {relatedPosts.map((post) => (
          <Link key={post.id} href={`/blogs/${post.id}`}>
            <BlogCard post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
};
