"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import ThemeToggle from "../ThemeToggle";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  Briefcase,
  Bookmark,
  FileText,
  MessageSquare,
  Bell,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [resourcesMenuOpen, setResourcesMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Product menu items
  const productItems = [
    {
      name: "Resume Builder",
      href: "/resumes",
      icon: <FileText className="mr-2 h-5 w-5" />,
      description: "Create ATS-optimized resumes",
    },
    {
      name: "Interview Practice",
      href: "/interviews",
      icon: <MessageSquare className="mr-2 h-5 w-5" />,
      description: "Prepare with AI mock interviews",
    },
    {
      name: "ATS Checker",
      href: "/ats-checker",
      icon: <Briefcase className="mr-2 h-5 w-5" />,
      description: "Test your resume against ATS systems",
    },
    {
      name: "Job Tracker",
      href: "/job-tracker",
      icon: <Bookmark className="mr-2 h-5 w-5" />,
      description: "Organize your job applications",
    },
  ];

  // Resources menu items
  const resourceItems = [
    { name: "Career Blog", href: "/blogs" },
    { name: "Resume Templates", href: "/templates" },
    { name: "Interview Questions", href: "/questions" },
    { name: "Salary Guide", href: "/salary" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 shadow-sm backdrop-blur-md dark:bg-gray-900/95"
          : "bg-white dark:bg-gray-900"
      } border-b border-gray-200 dark:border-gray-800`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Logo and main navigation */}
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="mr-6 flex flex-shrink-0 items-center">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent dark:from-blue-400 dark:to-indigo-400">
                Recruityze
              </span>
              <Badge className="ml-2 border-0 bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600">
                Beta
              </Badge>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center space-x-1 md:flex">
              {/* Product Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                  onClick={() => {
                    setProductMenuOpen(!productMenuOpen);
                    setResourcesMenuOpen(false);
                  }}
                >
                  Products
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform ${productMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {productMenuOpen && (
                  <div className="absolute left-0 mt-2 w-72 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
                    <div className="px-3 py-2">
                      {productItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="group flex items-start rounded-md px-3 py-2 hover:bg-blue-50 dark:hover:bg-gray-700"
                          onClick={() => setProductMenuOpen(false)}
                        >
                          <div className="text-blue-600 dark:text-blue-400">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Resources Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                  onClick={() => {
                    setResourcesMenuOpen(!resourcesMenuOpen);
                    setProductMenuOpen(false);
                  }}
                >
                  Resources
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform ${resourcesMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {resourcesMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
                    <div className="py-2">
                      {resourceItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                          onClick={() => setResourcesMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/pricing"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-1 md:space-x-4">
            {/* Search button */}
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <Search className="h-5 w-5" />
            </button>

            <ThemeToggle />

            {/* Signed In State */}
            <SignedIn>
              <div className="hidden items-center space-x-4 md:flex">
                {/* Notifications */}
                {/* <button className="relative text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                    2
                  </span>
                </button> */}

                {/* Profile/Account button */}
                <Link
                  href="/dashboard"
                  className="flex items-center text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                >
                  <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                    <UserButton />
                  </div>
                  <span className="text-sm font-medium">Dashboard</span>
                </Link>
              </div>
            </SignedIn>

            {/* Signed Out State */}
            <SignedOut>
              <div className="hidden items-center space-x-3 md:flex">
                <Button asChild variant="outline" size="sm">
                  <Link href="/sign-in">Log in</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="border-0 bg-gradient-to-r from-blue-600 to-indigo-600 font-medium text-white hover:from-blue-700 hover:to-indigo-700"
                >
                  <Link href="/sign-up">Sign up free</Link>
                </Button>
              </div>
            </SignedOut>

            {/* Mobile menu button - Now using Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full overflow-scroll sm:max-w-md"
              >
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <Link href="/" className="flex items-center">
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent dark:from-blue-400 dark:to-indigo-400">
                        Recruityze
                      </span>
                      <Badge className="ml-2 border-0 bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600">
                        Beta
                      </Badge>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="space-y-4 py-6">
                  <div>
                    <p className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Products
                    </p>
                    {productItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-800"></div>

                  <div>
                    <p className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Resources
                    </p>
                    {resourceItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-800"></div>

                  <Link
                    href="/pricing"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    Pricing
                  </Link>

                  <SignedIn>
                    <div className="border-t border-gray-200 dark:border-gray-800"></div>
                    <Link
                      href="/dashboard"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                      Dashboard
                    </Link>
                  </SignedIn>

                  <SignedOut>
                    <div className="flex flex-col space-y-3 pt-4">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <Link href="/sign-in">Log in</Link>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        className="w-full border-0 bg-gradient-to-r from-blue-600 to-indigo-600 font-medium hover:from-blue-700 hover:to-indigo-700"
                      >
                        <Link href="/sign-up">Sign up free</Link>
                      </Button>
                    </div>
                  </SignedOut>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
