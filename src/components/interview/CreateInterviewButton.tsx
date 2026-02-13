"use client";

import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import Link from "next/link";

interface CreateResumeButtonProps {
  canCreate: boolean;
  children?: React.ReactNode;
}

export default function CreateInterviewButton({
  canCreate,
  children,
}: CreateResumeButtonProps) {
  const premiumModal = usePremiumModal();

  if (canCreate) {
    return (
      <Button
        asChild
        className="mt-2 flex w-full items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 font-medium text-white shadow-sm transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 md:w-fit"
      >
        <Link href="/interviews/interview">
          {/* <PlusSquare className="size-5" />
          Start an Interview */}
          {children}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      onClick={() => premiumModal.setOpen(true)}
      className="mt-2 flex w-full items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 font-medium text-white shadow-sm transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 md:w-fit"
    >
      {/* <PlusSquare className="size-5" />
      Start an Interview */}
      {children}
    </Button>
  );
}
