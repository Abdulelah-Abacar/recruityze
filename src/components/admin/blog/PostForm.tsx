"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MultiSelect } from "@/components/ui/multi-select";
import Editor from "@/components/admin/blog/editor";
import ImageUpload from "@/components/admin/ImageUpload";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { savePost } from "@/app/admin/action";
import { auth } from "@clerk/nextjs/server";

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers and hyphens",
    ),
  excerpt: z
    .string()
    .min(1, "Excerpt is required")
    .max(200, "Excerpt must be less than 200 characters"),
  content: z.string().min(1, "Content is required"),
  coverImage: z.union([z.instanceof(File), z.string(), z.null(), z.object({})]),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  published: z.boolean().default(false),
  readingTime: z.string().optional(),
  authorId: z.string().optional(),
});

export default function BlogPostForm({
  initialData,
  isEditMode = false,
}: {
  initialData?: any;
  isEditMode?: boolean;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: {},
      categories: [],
      published: false,
      readingTime: "3 min read", // Default reading time
      authorId: "",
    },
  });

  const categories = [
    { value: "recruiting", label: "Recruiting" },
    { value: "hiring", label: "Hiring" },
    { value: "technology", label: "Technology" },
    { value: "career", label: "Career Advice" },
    { value: "trends", label: "Industry Trends" },
    { value: "resume-building", label: "Resume Building" },
    { value: "ats-optimization", label: "ATS Optimization" },
  ];

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);

      // Calculate estimated reading time if not provided
      if (!data.readingTime) {
        // Simple estimation: average reader reads ~200 words per minute
        const wordCount = data.content.split(/\s+/).length;
        const minutes = Math.max(1, Math.ceil(wordCount / 200));
        data.readingTime = `${minutes} min read`;
      }

      // Set publishedAt to current time if not editing
      const formData = {
        ...data,
        publishedAt: initialData?.publishedAt || new Date().toISOString(),
      };

      const result = await savePost(formData);

      toast.success(
        isEditMode
          ? "Post updated successfully!"
          : "Post created successfully!",
      );
      router.push("/admin/blog");
      router.refresh(); // Refresh the page to show updated data
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("Failed to save post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Post title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      recruityze.com/blog/
                    </span>
                    <Input placeholder="post-slug" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief summary of the post"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <ImageUpload value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <MultiSelect
                  options={categories}
                  selected={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Editor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Publish</FormLabel>
                <p className="text-sm text-muted-foreground">
                  When checked, this post will be visible to the public
                </p>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button onClick={() => router.back()} type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : isEditMode
                ? "Update Post"
                : "Create Post"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
