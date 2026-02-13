"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const NewsletterSignup = () => {
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
    <Card className="mt-12">
      <CardContent className="p-6">
        <CardTitle className="mb-2">Get career tips in your inbox</CardTitle>
        <CardDescription className="mb-4">
          Subscribe to our newsletter for expert advice on resumes, interviews,
          and career advancement.
        </CardDescription>
        {isSubmitted ? (
          <div className="font-medium text-green-600">
            Thanks for subscribing! Check your inbox to confirm your
            subscription.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-grow"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit">Subscribe</Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};
