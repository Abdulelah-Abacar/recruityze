"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { CreditCard, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const { theme } = useTheme();
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Blog", href: "/blogs" },
    { name: "Pricing", href: "/pricing" },
    { name: "Interview Practice", href: "/interviews" },
    { name: "Resume Builder", href: "/resumes" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex flex-shrink-0 items-center">
            <span className="text-2xl font-bold">Recruityze</span>
            <Badge className="mb-4 ml-2">Beta</Badge>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              asChild
              variant={pathname === link.href ? "default" : "ghost"}
              className={
                pathname === link.href
                  ? "border-b-2 border-primary font-medium"
                  : ""
              }
            >
              <Link href={link.href}>{link.name}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center md:gap-3">
          <ThemeToggle />

          {/* Authentication Section */}
          <SignedIn>
            <UserButton
              appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
                elements: {
                  avatarBox: {
                    width: 35,
                    height: 35,
                  },
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Billing"
                  labelIcon={<CreditCard className="size-4" />}
                  href="/billing"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>

          <SignedOut>
            <Button asChild variant="outline" size="sm">
              <Link href="/sign-in">Log in</Link>
            </Button>
            <Button asChild size="sm" className="font-medium">
              <Link href="/sign-up">Sign up free</Link>
            </Button>
          </SignedOut>

          {/* Mobile Navigation Trigger */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left">Navigation</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    asChild
                    variant={pathname === link.href ? "default" : "ghost"}
                    className="justify-start"
                  >
                    <Link href={link.href}>{link.name}</Link>
                  </Button>
                ))}
                <SignedOut>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/sign-in">Log in</Link>
                  </Button>
                  <Button asChild size="sm" className="font-medium">
                    <Link href="/sign-up">Sign up free</Link>
                  </Button>
                </SignedOut>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
