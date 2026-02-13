"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  LinkIcon,
  ChevronRight,
  BookOpen,
  Clock,
  Calendar,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import { Post, Admin } from "@prisma/client";
import MarkdownPreview from "./MarkdownPreview";

interface PostWithAuthor extends Post {
  author: Admin;
}

interface BlogPostPageProps {
  post: PostWithAuthor;
  relatedPosts: PostWithAuthor[];
}

export function BlogPostPage({ post, relatedPosts }: BlogPostPageProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Listen for scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / scrollHeight;
      setReadingProgress(progress);
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  console.log(post);

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
      {/* Reading progress indicator */}
      <div
        className="fixed left-0 top-0 z-50 h-1 bg-blue-500 transition-all duration-300"
        style={{ width: `${readingProgress * 100}%` }}
      />

      <main className={`container px-4 py-12 sm:px-6 lg:px-8`}>
        <div className="mb-12 flex items-center justify-between">
          <Button
            asChild
            variant="ghost"
            className="group gap-1 font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Link href="/blogs">
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 group-hover:transform" />
              <span>Back to Blog</span>
            </Link>
          </Button>
        </div>

        <article className="mx-auto max-w-3xl">
          <header className="relative mb-12">
            {/* Categories with improved hover effects */}
            <div className="mb-6 flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="cursor-pointer px-3 py-1 text-sm font-medium transition-all duration-300 hover:border-blue-300 hover:bg-blue-100 hover:text-blue-800 dark:hover:border-blue-400 dark:hover:bg-blue-600 dark:hover:text-white"
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Title with improved typography */}
            <h1 className="mb-8 text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-5xl">
              {post.title}
            </h1>

            {/* Author info and metadata with improved visual design */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300">
              <div className="group flex items-center gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-offset-2 ring-offset-background transition-transform group-hover:scale-110">
                  <AvatarImage src={post.author.avatar || undefined} />
                  <AvatarFallback className="bg-gray-200 dark:bg-gray-700">
                    {post.author.name?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{post.author.name}</span>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <time>{formatDate(post.publishedAt)}</time>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Enhanced cover image with hover effect */}
          {post.coverImage && (
            <div className="mb-12 transform overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.01]">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={900}
                height={500}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          )}

          {/* Content with enhanced typography and spacing */}
          <MarkdownPreview content={post.content} />

          {/* Enhanced share buttons */}
          <div className="mt-12 pt-6">
            <Separator className="mb-8 bg-gray-200 dark:bg-gray-700" />
            <EnhancedShareButtons
              copyLinkToClipboard={copyLinkToClipboard}
              copiedLink={copiedLink}
            />
          </div>
        </article>

        {/* Enhanced related posts */}
        {relatedPosts?.length > 0 && (
          <EnhancedRelatedPosts
            currentPostId={post.id}
            relatedPosts={relatedPosts}
          />
        )}

        {/* Enhanced newsletter signup */}
        <div className="mx-auto mt-20 max-w-3xl">
          <EnhancedNewsletterSignup />
        </div>
      </main>
    </div>
  );
}

// Enhanced Share Buttons Component
const EnhancedShareButtons = ({ copyLinkToClipboard, copiedLink }) => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonHover = (button) => {
    setActiveButton(button);
  };

  const handleButtonLeave = () => {
    setActiveButton(null);
  };

  const getButtonClass = (button) => {
    const baseClass =
      "transition-all duration-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700";
    const activeClass =
      button === activeButton
        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 scale-110"
        : "";
    return `${baseClass} ${activeClass}`;
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Share this article
      </h4>
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="icon"
          className={`${getButtonClass("twitter")} relative`}
          onMouseEnter={() => handleButtonHover("twitter")}
          onMouseLeave={handleButtonLeave}
        >
          <span
            className={`absolute -top-8 left-1/2 -translate-x-1/2 transform rounded bg-white px-2 py-1 text-xs shadow-lg transition-opacity dark:bg-gray-800 ${activeButton === "twitter" ? "opacity-100" : "opacity-0"}`}
          >
            Twitter
          </span>
          <Twitter
            className={`h-5 w-5 ${activeButton === "twitter" ? "text-blue-500" : ""}`}
          />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className={`${getButtonClass("facebook")} relative`}
          onMouseEnter={() => handleButtonHover("facebook")}
          onMouseLeave={handleButtonLeave}
        >
          <span
            className={`absolute -top-8 left-1/2 -translate-x-1/2 transform rounded bg-white px-2 py-1 text-xs shadow-lg transition-opacity dark:bg-gray-800 ${activeButton === "facebook" ? "opacity-100" : "opacity-0"}`}
          >
            Facebook
          </span>
          <Facebook
            className={`h-5 w-5 ${activeButton === "facebook" ? "text-blue-700" : ""}`}
          />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className={`${getButtonClass("linkedin")} relative`}
          onMouseEnter={() => handleButtonHover("linkedin")}
          onMouseLeave={handleButtonLeave}
        >
          <span
            className={`absolute -top-8 left-1/2 -translate-x-1/2 transform rounded bg-white px-2 py-1 text-xs shadow-lg transition-opacity dark:bg-gray-800 ${activeButton === "linkedin" ? "opacity-100" : "opacity-0"}`}
          >
            LinkedIn
          </span>
          <Linkedin
            className={`h-5 w-5 ${activeButton === "linkedin" ? "text-blue-600" : ""}`}
          />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className={`${getButtonClass("link")} relative`}
          onClick={copyLinkToClipboard}
          onMouseEnter={() => handleButtonHover("link")}
          onMouseLeave={handleButtonLeave}
        >
          <span
            className={`absolute -top-8 left-1/2 -translate-x-1/2 transform rounded bg-white px-2 py-1 text-xs shadow-lg transition-opacity dark:bg-gray-800 ${activeButton === "link" || copiedLink ? "opacity-100" : "opacity-0"}`}
          >
            {copiedLink ? "Copied!" : "Copy Link"}
          </span>
          <LinkIcon
            className={`h-5 w-5 ${activeButton === "link" ? "text-violet-600" : ""} ${copiedLink ? "text-green-500" : ""}`}
          />
        </Button>
      </div>
    </div>
  );
};

// Enhanced Related Posts Component
const EnhancedRelatedPosts = ({ currentPostId, relatedPosts }) => {
  if (!relatedPosts || relatedPosts.length === 0) return null;

  return (
    <div className="mx-auto mt-24 max-w-4xl">
      <h2 className="mb-8 flex items-center text-2xl font-bold text-gray-900 dark:text-white">
        <BookOpen className="mr-2 h-5 w-5 text-blue-500" />
        Continue Reading
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {relatedPosts.map((post) => (
          <div key={post.id} className="group">
            <Link href={`/blogs/${post.id}`}>
              <Card className="h-full overflow-hidden border-gray-200 bg-white transition-all duration-300 group-hover:border-blue-300 group-hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:group-hover:border-blue-700">
                {post.coverImage && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-600 hover:dark:bg-blue-700">
                        {post.categories[0]}
                      </Badge>
                    </div>
                  </div>
                )}

                <CardContent className="p-5">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white">
                    {post.title}
                  </h3>

                  <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-300">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={post.author.avatar || undefined} />
                        <AvatarFallback>
                          {post.author.name?.charAt(0) || "A"}
                        </AvatarFallback>
                      </Avatar>
                      <span>{post.author.name}</span>
                    </div>
                    <span>{post.readingTime}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button
          asChild
          className="group bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 hover:dark:bg-blue-700"
        >
          <Link href="/blogs">
            <span>View All Articles</span>
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

// Enhanced Newsletter Signup Component
export const EnhancedNewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <Card className="overflow-hidden border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg transition-all duration-300 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
      <CardContent className="p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex-1 space-y-4">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Get career insights delivered to your inbox
            </CardTitle>
            <CardDescription className="text-base text-gray-600 dark:text-gray-300">
              Join 10,000+ professionals receiving our weekly tips on resumes,
              interviews, and career advancement strategies.
            </CardDescription>

            {isSubmitted ? (
              <div className="animate-fade-in flex items-center rounded-lg bg-green-100 p-4 text-green-800 transition-all duration-300 dark:bg-green-900 dark:text-green-200">
                <svg
                  className="mr-2 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">
                  Thanks for subscribing! Check your inbox to confirm.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <div
                  className={`relative flex-grow ${isInputFocused ? "scale-[1.01]" : ""} transition-transform duration-200`}
                >
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="w-full rounded-lg border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-blue-500 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-blue-600 hover:shadow-md dark:bg-blue-600 hover:dark:bg-blue-700"
                >
                  Subscribe
                </Button>
              </form>
            )}

            <p className="text-xs text-gray-500 dark:text-gray-400">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>

          <div className="hidden md:block">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <svg
                className="h-12 w-12 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogPostPage;
