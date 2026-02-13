"use server";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob";
import path from "path";
import { z } from "zod";

// Validation schema for blog post
const postSchema = z.object({
  id: z.string().optional(),
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  excerpt: z.string(),
  coverImage: z.instanceof(File).or(z.string()),
  categories: z.array(z.string()),
  publishedAt: z.string().or(z.date()),
  published: z.boolean().default(false),
  readingTime: z.string(),
  authorId: z.string().optional(),
});

type PostValues = z.infer<typeof postSchema>;

export async function savePost(values: PostValues) {
  const { id } = values;

  console.log("received post values", values);

  const { coverImage, ...postValues } = postSchema.parse(values);

  // const { userId } = await auth();

  // if (!userId) {
  //   throw new Error("User not authenticated");
  // }

  // Find the existing post if updating
  const existingPost = id
    ? await prisma.post.findUnique({
        where: { id },
        include: { author: true },
      })
    : null;

  // Verify ownership or create new post with current user as author
  const currentAdmin = await getCurrentAdmin();

  const authorId = existingPost?.authorId || currentAdmin?.id;

  if (existingPost && existingPost.author.id !== currentAdmin?.id) {
    throw new Error("Not authorized to edit this post");
  }

  // Handle the cover image upload
  let coverImageUrl: string;

  if (coverImage instanceof File) {
    // Delete existing image if updating
    if (existingPost?.coverImage) {
      try {
        await del(existingPost.coverImage);
      } catch (error) {
        console.error("Error deleting old cover image:", error);
      }
    }

    // Upload new image to Vercel Blob
    const filename = `blog_covers/${Date.now()}${path.extname(coverImage.name)}`;
    const blob = await put(filename, coverImage, {
      access: "public",
    });

    coverImageUrl = blob.url;
  } else {
    // Keep existing URL if coverImage is a string
    coverImageUrl = coverImage as string;
  }

  // Format date for Prisma
  const publishedAt = new Date(postValues.publishedAt);

  if (id) {
    // Update existing post
    return prisma.post.update({
      where: { id },
      data: {
        ...postValues,
        coverImage: coverImageUrl,
        publishedAt,
        authorId,
      },
    });
  } else {
    // Create new post
    return prisma.post.create({
      data: {
        ...postValues,
        coverImage: coverImageUrl,
        publishedAt,
        authorId,
        createdAt: new Date(),
      },
    });
  }
}

export const handleDelete = async (id: string) => {
  console.log("Attempting to delete post with ID:", id);

  try {
    // Confirm deletion with user (optional but recommended)
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );
    if (!confirmDelete) return;

    const deletedPost = await prisma.post.delete({
      where: { id },
    });
    return deletedPost;
  } catch (error: any) {
    console.error("Delete error:", error);
  }
};

// Define the schema for admin validation
const adminSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  avatar: z.instanceof(File).or(z.string()),
});

// Type for the admin values
type AdminValues = z.infer<typeof adminSchema> & {
  avatar: File | string;
};

export async function saveAdmin(values: AdminValues) {
  const { id } = values;

  console.log("received admin values", values);

  const { avatar, ...adminValues } = adminSchema.parse(values);

  // const { userId } = await auth();

  // if (!userId) {
  //   throw new Error("User not authenticated");
  // }

  // Only allow super admins to create/modify admins (optional)
  // You could implement your authorization check here
  // const currentUser = await prisma.admin.findUnique({ where: { id: userId } });
  // if (!currentUser?.isSuperAdmin) {
  //   throw new Error("Not authorized to create/edit admin accounts");
  // }

  // Find the existing admin if updating
  const existingAdmin = id
    ? await prisma.admin.findUnique({
        where: { id },
      })
    : null;

  // Handle the avatar image upload
  let avatarUrl: string;

  if (avatar instanceof File) {
    // Delete existing avatar if updating
    if (existingAdmin?.avatar) {
      try {
        await del(existingAdmin.avatar);
      } catch (error) {
        console.error("Error deleting old avatar image:", error);
      }
    }

    // Upload new avatar to Vercel Blob
    const filename = `admin_avatars/${Date.now()}${path.extname(avatar.name)}`;
    const blob = await put(filename, avatar, {
      access: "public",
    });

    avatarUrl = blob.url;
  } else {
    // Keep existing URL if avatar is a string
    avatarUrl = avatar as string;
  }

  // Hash the password before storing
  // In a real application, you would use bcrypt or another secure hashing library
  // Example: const hashedPassword = await bcrypt.hash(adminValues.password, 10);
  const hashedPassword = adminValues.password; // Replace with actual hashing

  if (id) {
    // Update existing admin
    return prisma.admin.update({
      where: { id },
      data: {
        name: adminValues.name,
        email: adminValues.email,
        // Only update password if it was changed (you'd need to implement this logic)
        password: hashedPassword,
        avatar: avatarUrl,
      },
    });
  } else {
    // Create new admin
    return prisma.admin.create({
      data: {
        name: adminValues.name,
        email: adminValues.email,
        password: hashedPassword,
        avatar: avatarUrl,
      },
    });
  }
}

type LoginCredentials = {
  email: string;
  password: string;
};

export async function getAdmin(credentials: LoginCredentials) {
  const { email, password } = credentials;

  console.log("Attempting to authenticate admin:", email);

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // Find the admin with the provided email
  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    console.log("Admin not found with email:", email);
    throw new Error("Invalid email or password");
  }

  // In a real application, you should use proper password comparison
  // Example with bcrypt:
  // const passwordMatch = await bcrypt.compare(password, admin.password);

  // For now, using direct comparison (NOT SECURE for production)
  const passwordMatch = password === admin.password;

  if (!passwordMatch) {
    console.log("Password doesn't match for admin:", email);
    throw new Error("Invalid email or password");
  }

  console.log("Admin authenticated successfully:", admin.name);

  // Set the admin session cookie
  (await cookies()).set("adminId", admin.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });

  // Return the admin data without sensitive information
  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    avatar: admin.avatar,
  };
}

// Optional function to check if a user is currently logged in
export async function getCurrentAdmin() {
  const adminId = (await cookies()).get("adminId")?.value;

  if (!adminId) {
    return null;
  }

  const admin = await prisma.admin.findUnique({
    where: { id: adminId },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
    },
  });

  return admin;
}

// Function to log out an admin
export async function logoutAdmin() {
  (await cookies()).delete("adminId");
  return { success: true };
}
