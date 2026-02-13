"use client";

import LoadingButton from "@/components/LoadingButton";
import ResumePreview from "@/components/resume/ResumePreview";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
import { formatDate, formatDistanceToNow } from "date-fns";
import {
  MoreVertical,
  Printer,
  Trash2,
  Calendar,
  Edit,
  Copy,
  Star,
  Download,
  Eye,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { useReactToPrint } from "react-to-print";
import { deleteResume } from "../../app/(main)/resumes/actions";

interface ResumeItemProps {
  resume: ResumeServerData;
}

export default function ResumeItem({ resume }: ResumeItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "Resume",
  });

  const wasUpdated = resume.updatedAt !== resume.createdAt;
  const timeAgo = formatDistanceToNow(new Date(resume.updatedAt), {
    addSuffix: true,
  });

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    setIsDownloading(true);
    try {
      // Dynamically import html2canvas and jspdf
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;

      // Create canvas from the resume content
      const canvas = await html2canvas(contentRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
      });

      // Calculate PDF dimensions
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF
      const pdf = new jsPDF({
        orientation: imgHeight > imgWidth ? "portrait" : "landscape",
        unit: "mm",
        format: "a4",
      });

      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      // Download the PDF
      pdf.save(`${resume.title || "resume"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Fallback to print dialog if PDF generation fails
      reactToPrintFn();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500 dark:hover:shadow-gray-700/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Preview Section with improved visual appearance */}
      <div className="relative h-48 w-full overflow-hidden">
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="block h-full w-full"
        >
          <div className="relative h-full w-full">
            <ResumePreview
              resumeData={mapToResumeValues(resume)}
              contentRef={contentRef}
              className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-gray-800" />
          </div>
        </Link>

        {/* Quick action buttons that appear on hover */}
        <div
          className={`absolute bottom-2 right-2 flex gap-1 transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <Button
            variant="secondary"
            size="sm"
            className="h-8 w-8 rounded-full bg-white/80 p-0 backdrop-blur-sm hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-700"
            title="Print resume"
            onClick={reactToPrintFn}
          >
            <Printer className="size-4 text-gray-700 dark:text-gray-300" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="h-8 w-8 rounded-full bg-white/80 p-0 backdrop-blur-sm hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-700"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Star
              className={`size-4 ${isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-700 dark:text-gray-300"}`}
            />
          </Button>
        </div>
      </div>

      {/* Content Section with improved typography and info */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-start justify-between">
          <Link
            href={`/editor?resumeId=${resume.id}`}
            className="group-hover:text-blue-600 dark:group-hover:text-blue-400"
          >
            <h3 className="line-clamp-1 text-lg font-semibold text-gray-900 transition-colors dark:text-white">
              {resume.title || "Untitled Resume"}
            </h3>
          </Link>
          <MoreMenu resumeId={resume.id} onPrintClick={reactToPrintFn} />
        </div>

        {resume.description && (
          <p className="mb-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
            {resume.description}
          </p>
        )}

        <div className="mt-auto flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="mr-1 size-3" />
          <span
            title={formatDate(resume.updatedAt, "MMMM d, yyyy 'at' h:mm a")}
          >
            {wasUpdated ? "Updated" : "Created"} {timeAgo}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div
        className={`flex items-center justify-between border-t border-gray-100 bg-gray-50 px-4 py-2 transition-opacity duration-200 dark:border-gray-700 dark:bg-gray-800/50 ${isHovered ? "opacity-100" : "opacity-80"}`}
      >
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="flex items-center text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <Edit className="mr-1 size-3" /> Edit
        </Link>
        <div className="flex items-center gap-3">
          <button
            className="flex items-center text-xs font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={() => setShowPreview(true)}
          >
            <Eye className="mr-1 size-3" /> Preview
          </button>
          <button
            className="flex items-center text-xs font-medium text-gray-600 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <Loader2 className="mr-1 size-3 animate-spin" /> Downloading...
              </>
            ) : (
              <>
                <Download className="mr-1 size-3" /> PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{resume.title || "Untitled Resume"}</DialogTitle>
            <DialogDescription>Preview of your resume</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <ResumePreview
              resumeData={mapToResumeValues(resume)}
              contentRef={contentRef}
              className="w-full border border-gray-200 dark:border-gray-700"
            />
          </div>
          <DialogFooter className="flex gap-2 sm:justify-between">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Close
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={reactToPrintFn}>
                <Printer className="mr-2 size-4" />
                Print
              </Button>
              <Button onClick={handleDownloadPDF} disabled={isDownloading}>
                {isDownloading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 size-4" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface MoreMenuProps {
  resumeId: string;
  onPrintClick: () => void;
}

function MoreMenu({ resumeId, onPrintClick }: MoreMenuProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2 text-gray-700 dark:text-gray-300"
            onClick={onPrintClick}
          >
            <Printer className="size-4" />
            Print
          </DropdownMenuItem>
          <DropdownMenuItem className="flex cursor-pointer items-center gap-2 text-gray-700 dark:text-gray-300">
            <Copy className="size-4" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2 text-red-600 dark:text-red-400"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmationDialog
        resumeId={resumeId}
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      />
    </>
  );
}

interface DeleteConfirmationDialogProps {
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DeleteConfirmationDialog({
  resumeId,
  open,
  onOpenChange,
}: DeleteConfirmationDialogProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    startTransition(async () => {
      try {
        await deleteResume(resumeId);
        onOpenChange(false);
        toast({
          title: "Resume deleted",
          description: "Your resume has been permanently deleted.",
        });
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Delete failed",
          description: "Something went wrong. Please try again.",
        });
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Delete Resume?
          </DialogTitle>
          <DialogDescription className="text-center">
            This will permanently delete this resume. This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <LoadingButton
            variant="destructive"
            onClick={handleDelete}
            loading={isPending}
          >
            Delete Resume
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
