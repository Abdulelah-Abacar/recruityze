"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: File | string | null | undefined;
  onChange: (value: File | string | null) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate preview URL when value changes
  useEffect(() => {
    if (value instanceof File) {
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(value);
    } else if (typeof value === "string") {
      setPreviewUrl(value);
    } else {
      setPreviewUrl(null);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  const handleRemove = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setPreviewUrl(null);
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {previewUrl ? (
        <div className="relative aspect-video overflow-hidden rounded-md">
          <Image
            fill
            className="aspect-video object-cover"
            alt="Preview"
            src={previewUrl}
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute right-2 top-2"
            onClick={handleRemove}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="flex aspect-video w-full flex-col items-center justify-center gap-2 border-2 border-dashed hover:bg-accent"
        >
          <ImagePlus className="h-8 w-8" />
          <span>Click to upload</span>
          <span className="text-sm text-muted-foreground">
            PNG, JPG, GIF up to 5MB
          </span>
        </Button>
      )}
    </div>
  );
}
