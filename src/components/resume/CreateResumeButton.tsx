"use client";

import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";

export default function CreateResumeButton() {
  return (
    <Button
      asChild
      className="rounded-full bg-blue-600 px-6 py-2 font-medium text-white shadow-md transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800"
    >
      <Link href="/editor">
        <PlusSquare className="size-5" />
        New resume
      </Link>
    </Button>
  );
}
