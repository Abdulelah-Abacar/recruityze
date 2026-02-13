"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Mail,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  categories: string[];
  coverImage: string;
  publishedAt: string;
  author: {
    name: string;
    avatar?: string;
  };
  // add other post fields as needed
}

interface BlogPageProps {
  posts: Post[];
}

export function BlogPage({ posts }: BlogPageProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>(posts.slice(0, 3));
  const [savedPosts, setSavedPosts] = useState<string[]>([]);

  const categories = [
    "All",
    "Resume Building",
    "ATS Optimization",
    "Interview Preparation",
    "Career Transitions",
    "AI Career Tools",
  ];

  useEffect(() => {
    let filtered = [...posts];

    if (activeCategory !== "All") {
      filtered = filtered.filter((post) =>
        post.categories.includes(activeCategory),
      );
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.excerpt.toLowerCase().includes(term) ||
          post.categories.some((cat) => cat.toLowerCase().includes(term)) ||
          post.author.name.toLowerCase().includes(term),
      );
    }

    setFilteredPosts(filtered);

    if (activeCategory === "All" && !searchTerm.trim()) {
      setFeaturedPosts(posts.slice(0, 3));
    } else {
      setFeaturedPosts([]);
    }
  }, [activeCategory, searchTerm, posts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const toggleSavePost = (postId: string) => {
    setSavedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId],
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white transition-colors duration-300 dark:from-slate-950 dark:to-slate-900">
      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.section
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent dark:from-blue-400 dark:to-purple-400">
              Recruityze Blog
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              Expert tips and insights to help you create standout resumes, ace
              interviews, and advance your career with AI-powered tools.
            </p>
          </motion.section>

          {/* Search & Filter Section */}
          <div className="mb-12 rounded-xl bg-white p-6 shadow-md dark:bg-slate-800">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearch={handleSearch}
            />

            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>

          {/* Featured Articles */}
          <AnimatePresence>
            {featuredPosts.length > 0 && (
              <motion.section
                className="mb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
                    Featured Articles
                  </h2>
                  <Link
                    href="/blogs/featured"
                    className="flex items-center text-blue-600 hover:underline dark:text-blue-400"
                  >
                    View all <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {featuredPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <BlogCard
                        post={post}
                        isSaved={savedPosts.includes(post.id)}
                        onSave={() => toggleSavePost(post.id)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Main Articles Section */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold text-slate-800 dark:text-slate-100">
              {searchTerm
                ? `Search Results for "${searchTerm}"`
                : activeCategory !== "All"
                  ? `${activeCategory} Articles`
                  : "Latest Articles"}
            </h2>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <BlogCard
                      post={post}
                      isSaved={savedPosts.includes(post.id)}
                      onSave={() => toggleSavePost(post.id)}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                className="rounded-lg border border-slate-200 py-16 text-center dark:border-slate-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-slate-500 dark:text-slate-400">
                  No articles found. Try a different search term or category.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("All");
                  }}
                >
                  Reset filters
                </Button>
              </motion.div>
            )}
          </section>

          {/* Newsletter Section */}
          {/* <NewsletterSignup /> */}
        </div>
      </main>
    </div>
  );
}

interface BlogCardProps {
  post: Post;
  isSaved: boolean;
  onSave: () => void;
}

const BlogCard = ({ post, isSaved, onSave }: BlogCardProps) => (
  <Card className="h-full overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
    <CardHeader className="relative p-0">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={post.coverImage || "/api/placeholder/800/400"}
          alt={post.title}
          width={800}
          height={400}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            onSave();
          }}
          className="absolute right-2 top-2 rounded-full bg-white/70 p-2 transition-colors hover:bg-white dark:bg-slate-800/70 dark:hover:bg-slate-800"
        >
          {isSaved ? (
            <BookmarkCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          ) : (
            <Bookmark className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          )}
        </button>
      </div>
    </CardHeader>
    <CardContent className="p-6">
      <div className="mb-3 flex flex-wrap gap-2">
        {post.categories.slice(0, 2).map((category) => (
          <Badge
            key={category}
            variant="outline"
            className="cursor-pointer transition-colors hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600"
          >
            {category}
          </Badge>
        ))}
        {post.categories.length > 2 && (
          <Badge variant="outline">+{post.categories.length - 2}</Badge>
        )}
      </div>
      <Link href={`/blogs/${post.id}`}>
        <CardTitle className="mb-3 text-xl transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {post.title}
        </CardTitle>
      </Link>
      <CardDescription className="line-clamp-3 text-slate-600 dark:text-slate-400">
        {post.excerpt}
      </CardDescription>
    </CardContent>
    <CardFooter className="flex items-center justify-between border-t border-slate-100 p-4 dark:border-slate-700">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 border-2 border-white dark:border-slate-700">
          <AvatarImage src={post.author.avatar} />
          <AvatarFallback className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {post.author.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {post.author.name}
        </span>
      </div>
      <time className="text-sm text-slate-500 dark:text-slate-400">
        {formatDate(post.publishedAt)}
      </time>
    </CardFooter>
  </Card>
);

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryFilter = ({
  categories,
  activeCategory,
  setActiveCategory,
}: CategoryFilterProps) => {
  return (
    <div className="mt-6">
      <Tabs defaultValue={activeCategory} className="w-full">
        <TabsList className="flex h-auto w-full flex-wrap justify-start rounded-lg bg-slate-100 p-1 dark:bg-slate-700">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              onClick={() => setActiveCategory(category)}
              className="px-4 py-2 transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-blue-600 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-blue-400"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
}: SearchBarProps) => (
  <form onSubmit={handleSearch} className="relative">
    <div className="relative overflow-hidden rounded-lg ring-blue-500 transition-all duration-300 focus-within:ring-2 dark:ring-blue-400">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <Input
        type="search"
        placeholder="Search articles by title, topic, or author..."
        className="w-full border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-base focus:border-blue-500 focus:ring-0 dark:border-slate-600 dark:bg-slate-700 dark:focus:border-blue-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full p-0"
          onClick={() => setSearchTerm("")}
        >
          <span className="sr-only">Clear search</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </Button>
      )}
    </div>
  </form>
);

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <div className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-1 dark:from-blue-700 dark:to-purple-700">
      <Card className="overflow-hidden rounded-lg bg-white dark:bg-slate-800">
        <div className="md:flex">
          <div className="p-8 md:w-2/3">
            <CardTitle className="mb-2 text-2xl font-bold">
              Elevate Your Career Journey
            </CardTitle>
            <CardDescription className="mb-6 text-base text-slate-600 dark:text-slate-300">
              Join our newsletter for weekly expert advice on resumes,
              interviews, and career advancement strategies tailored to your
              professional goals.
            </CardDescription>
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-700 dark:bg-green-900/30"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-5 w-5 text-green-600 dark:text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium text-green-700 dark:text-green-300">
                    Thanks for subscribing! Check your inbox to confirm your
                    subscription.
                  </span>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <div className="relative flex-grow">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="h-12 flex-grow bg-slate-50 pl-10 dark:bg-slate-700"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="h-12 bg-blue-600 px-6 font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    Subscribe
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
            <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Join 10,000+ professionals who already subscribe. We respect your
              privacy and will never share your information.
            </div>
          </div>
          <div className="relative hidden bg-blue-50 dark:bg-slate-700 md:block md:w-1/3">
            <div className="absolute inset-0 flex items-center justify-center bg-opacity-10">
              <Mail className="h-24 w-24 text-blue-200 dark:text-blue-800" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
