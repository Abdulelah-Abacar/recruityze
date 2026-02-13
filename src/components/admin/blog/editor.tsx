"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function Editor({ value, onChange, placeholder }: EditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [tab, setTab] = useState<"write" | "preview">("write");

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="overflow-hidden rounded-lg border">
      <Tabs value={tab} onValueChange={(v) => setTab(v as "write" | "preview")}>
        <TabsList className="w-full rounded-none rounded-t-lg">
          <TabsTrigger value="write" className="w-1/2">
            Write
          </TabsTrigger>
          <TabsTrigger value="preview" className="w-1/2">
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="write" className="m-0 p-0">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Write your content in Markdown..."}
            className="min-h-[300px] resize-none border-0 p-4 focus-visible:ring-0"
          />
        </TabsContent>

        <TabsContent value="preview" className="min-h-[300px] p-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {value || "*Nothing to preview*"}
          </ReactMarkdown>
        </TabsContent>
      </Tabs>

      <div className="border-t bg-gray-50 p-2 text-sm text-gray-500">
        Supports Markdown formatting (headers, lists, links, etc.)
      </div>
    </div>
  );
}
