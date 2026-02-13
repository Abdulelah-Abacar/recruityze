import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Linkedin, Link } from "lucide-react";

export const ShareButtons = () => (
  <div className="space-y-3">
    <h4 className="text-sm font-medium">Share this article</h4>
    <div className="flex gap-2">
      <Button variant="outline" size="icon">
        <Twitter className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Facebook className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Link className="h-4 w-4" />
      </Button>
    </div>
  </div>
);
