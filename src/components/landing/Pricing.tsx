"use client";
import { useState } from "react";
import {
  CheckCircle,
  X,
  Sparkles,
  Diamond,
  Award,
  Clock,
  Tag,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";

function Pricing() {
  const [isHovering, setIsHovering] = useState({
    free: false,
    pro: false,
    proPlus: false,
  });

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-24 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
            <Tag className="mr-1 h-4 w-4" />
            Pricing Plans
          </Badge>
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Choose Your{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Perfect Plan
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Invest in your career success with our tailored plans. Find the
            right fit for your job search journey.
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <Tabs defaultValue="monthly" className="w-full">
            <div className="flex flex-col items-center">
              <TabsList className="mx-auto mb-10 grid h-min w-full max-w-xs grid-cols-2 rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
                <TabsTrigger
                  value="monthly"
                  className="rounded-lg py-3 text-sm font-medium"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger
                  value="yearly"
                  className="rounded-lg py-3 text-sm font-medium"
                >
                  <span className="flex items-center">
                    Yearly
                    <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 dark:bg-green-900 dark:text-green-200">
                      Save 20%
                    </span>
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="monthly" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-3">
                {/* Free Plan */}
                <Card
                  className={`relative overflow-hidden border-2 transition-all duration-300 ${
                    isHovering.free
                      ? "border-gray-300 shadow-lg dark:border-gray-600"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                  onMouseEnter={() =>
                    setIsHovering((prev) => ({ ...prev, free: true }))
                  }
                  onMouseLeave={() =>
                    setIsHovering((prev) => ({ ...prev, free: false }))
                  }
                >
                  <CardHeader className="bg-gray-50 pb-6 pt-6 dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold">Free</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Get started with the basics
                        </p>
                      </div>
                      <Diamond className="h-8 w-8 text-gray-400" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Starting at
                      </p>
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          $0
                        </span>
                        <span className="ml-1 text-gray-500 dark:text-gray-400">
                          /month
                        </span>
                      </div>
                    </div>
                    <ul className="mb-8 space-y-4">
                      <li className="flex items-start">
                        <CheckCircle className="mr-3 h-5 w-5 shrink-0 text-green-500" />
                        <span>Create 1 professional resume</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-3 h-5 w-5 shrink-0 text-green-500" />
                        <span>Access to basic templates</span>
                      </li>
                      <li className="flex items-start text-gray-400">
                        <X className="mr-3 h-5 w-5 shrink-0" />
                        <span>AI features not available</span>
                      </li>
                      <li className="flex items-start text-gray-400">
                        <X className="mr-3 h-5 w-5 shrink-0" />
                        <span>No design customization</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="pb-6">
                    <Button
                      className={`w-full transition-all duration-300 ${
                        isHovering.free
                          ? "bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                          : "bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                      }`}
                      variant={isHovering.free ? "default" : "outline"}
                    >
                      Start for Free
                    </Button>
                  </CardFooter>
                </Card>

                {/* Pro Plan */}
                <Card
                  className={`relative overflow-hidden border-2 transition-all duration-300 ${
                    isHovering.pro
                      ? "border-blue-600 shadow-xl dark:border-blue-500"
                      : "border-blue-500 shadow-md dark:border-blue-600"
                  }`}
                  onMouseEnter={() =>
                    setIsHovering((prev) => ({ ...prev, pro: true }))
                  }
                  onMouseLeave={() =>
                    setIsHovering((prev) => ({ ...prev, pro: false }))
                  }
                >
                  <div className="absolute -right-12 top-5 w-36 rotate-45 bg-blue-600 py-1 text-center text-sm font-semibold text-white dark:bg-blue-500">
                    Popular
                  </div>
                  <CardHeader className="bg-blue-50 pb-6 pt-6 dark:bg-blue-900">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300">
                          Pro
                        </h3>
                        <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">
                          Perfect for job seekers
                        </p>
                      </div>
                      <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Starting at
                      </p>
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-blue-700 dark:text-blue-400">
                          $9.99
                        </span>
                        <span className="ml-1 text-gray-500 dark:text-gray-400">
                          /month
                        </span>
                      </div>
                    </div>
                    <ul className="mb-8 space-y-4">
                      <li className="flex items-start">
                        <CheckCircle className="mr-3 h-5 w-5 shrink-0 text-green-500" />
                        <span>
                          Create up to <strong>3 resumes</strong>
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-3 h-5 w-5 shrink-0 text-green-500" />
                        <span>
                          <strong>AI-powered</strong> resume suggestions
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-3 h-5 w-5 shrink-0 text-green-500" />
                        <span>
                          <strong>ATS optimization</strong> for higher chances
                        </span>
                      </li>
                      <li className="flex items-start text-gray-400">
                        <X className="mr-3 h-5 w-5 shrink-0" />
                        <span>No design customization</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="pb-6">
                    <Button
                      className={`w-full bg-blue-600 text-white transition-all duration-300 hover:animate-none hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 ${
                        isHovering.pro && "animate-pulse"
                      }`}
                    >
                      Upgrade to Pro
                    </Button>
                  </CardFooter>
                </Card>

                {/* Pro Plus Plan */}
                <Card
                  className={`relative overflow-hidden border-2 transition-all duration-300 ${
                    isHovering.proPlus
                      ? "border-purple-600 shadow-lg dark:border-purple-500"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                  onMouseEnter={() =>
                    setIsHovering((prev) => ({ ...prev, proPlus: true }))
                  }
                  onMouseLeave={() =>
                    setIsHovering((prev) => ({ ...prev, proPlus: false }))
                  }
                >
                  <CardHeader className="bg-purple-50 pb-6 pt-6 dark:bg-purple-900">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300">
                          Pro Plus
                        </h3>
                        <p className="mt-1 text-sm text-purple-600 dark:text-purple-400">
                          For serious career advancement
                        </p>
                      </div>
                      <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Starting at
                      </p>
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-purple-700 dark:text-purple-400">
                          $19.99
                        </span>
                        <span className="ml-1 text-gray-500 dark:text-gray-400">
                          /month
                        </span>
                      </div>
                    </div>
                    <ul className="mb-8 space-y-4">
                      <li className="flex items-start">
                        <CheckCircle className="mr-3 h-5 w-5 shrink-0 text-green-500" />
                        <span>
                          <strong>Unlimited</strong> resumes and cover letters
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-3 h-5 w-5 shrink-0 text-green-500" />
                        <span>
                          <strong>Advanced AI</strong> career content writing
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-3 h-5 w-5 shrink-0 text-green-500" />
                        <span>
                          <strong>Full design customization</strong> options
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-3 h-5 w-5 shrink-0 text-green-500" />
                        <span>
                          <strong>Priority support</strong> with career experts
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="pb-6">
                    <Button
                      className={`w-full transition-all duration-300 ${
                        isHovering.proPlus
                          ? "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                          : "bg-white text-purple-700 hover:bg-purple-50 dark:bg-gray-800 dark:text-purple-400 dark:hover:bg-gray-700"
                      }`}
                      variant={isHovering.proPlus ? "default" : "outline"}
                    >
                      Get Pro Plus
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="yearly" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-3">
                {/* Free Plan - Yearly */}
                <Card
                  className={`relative overflow-hidden border-2 transition-all duration-300 ${
                    isHovering.free
                      ? "border-gray-300 shadow-lg dark:border-gray-600"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                  onMouseEnter={() =>
                    setIsHovering((prev) => ({ ...prev, free: true }))
                  }
                  onMouseLeave={() =>
                    setIsHovering((prev) => ({ ...prev, free: false }))
                  }
                >
                  <CardHeader className="bg-gray-50 pb-6 pt-6 dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold">Free</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Get started with the basics
                        </p>
                      </div>
                      <Diamond className="h-8 w-8 text-gray-400" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Starting at
                      </p>
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          $0
                        </span>
                        <span className="ml-1 text-gray-500 dark:text-gray-400">
                          /year
                        </span>
                      </div>
                    </div>
                    <ul className="mb-8 space-y-4">
                      <li className="flex items-start">
                        <CheckCircle className="mr-3 h-5 w-5 shrink-0 text-green-500" />
                        <span>Create 1 professional resume</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-3 h-5 w-5 shrink-0 text-green-500" />
                        <span>Access to basic templates</span>
                      </li>
                      <li className="flex items-start text-gray-400">
                        <X className="mr-3 h-5 w-5 shrink-0" />
                        <span>AI features not available</span>
                      </li>
                      <li className="flex items-start text-gray-400">
                        <X className="mr-3 h-5 w-5 shrink-0" />
                        <span>No design customization</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="pb-6">
                    <Button
                      className={`w-full transition-all duration-300 ${
                        isHovering.free
                          ? "bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                          : "bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                      }`}
                      variant={isHovering.free ? "default" : "outline"}
                    >
                      Start for Free
                    </Button>
                  </CardFooter>
                </Card>

                {/* Pro Plan - Yearly */}
                <Card
                  className={`relative overflow-hidden border-2 transition-all duration-300 ${
                    isHovering.pro
                      ? "border-blue-600 shadow-xl dark:border-blue-500"
                      : "border-blue-500 shadow-md dark:border-blue-600"
                  }`}
                  onMouseEnter={() =>
                    setIsHovering((prev) => ({ ...prev, pro: true }))
                  }
                  onMouseLeave={() =>
                    setIsHovering((prev) => ({ ...prev, pro: false }))
                  }
                >
                  <div className="absolute -right-12 top-5 w-36 rotate-45 bg-blue-600 py-1 text-center text-sm font-semibold text-white dark:bg-blue-500">
                    Popular
                  </div>
                  <CardHeader className="bg-blue-50 pb-6 pt-6 dark:bg-blue-900">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300">
                          Pro
                        </h3>
                        <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">
                          Perfect for job seekers
                        </p>
                      </div>
                      <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-6">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Starting at
                        </p>
                        <Badge className="ml-2 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200">
                          <Clock className="mr-1 h-3 w-3" />
                          Save 20%
                        </Badge>
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-blue-700 dark:text-blue-400">
                          $95.90
                        </span>
                        <span className="ml-1 text-gray-500 dark:text-gray-400">
                          /year
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                        Only $7.99/month, billed annually
                      </p>
                    </div>
                    <ul className="mb-8 space-y-4">
                      <li className="flex items-start">
                        <CheckCircle className="mr-3 h-5 w-5 shrink-0 text-green-500" />
                        <span>
                          Create up to <strong>3 resumes</strong>
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-3 h-5 w-5 shrink-0 text-green-500" />
                        <span>
                          <strong>AI-powered</strong> resume suggestions
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-3 h-5 w-5 shrink-0 text-green-500" />
                        <span>
                          <strong>ATS optimization</strong> for higher chances
                        </span>
                      </li>
                      <li className="flex items-start text-gray-400">
                        <X className="mr-3 h-5 w-5 shrink-0" />
                        <span>No design customization</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="pb-6">
                    <Button
                      className={`w-full bg-blue-600 text-white transition-all duration-300 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 ${
                        isHovering.pro && "animate-pulse"
                      }`}
                    >
                      Upgrade to Pro
                    </Button>
                  </CardFooter>
                </Card>

                {/* Pro Plus Plan - Yearly */}
                <Card
                  className={`relative overflow-hidden border-2 transition-all duration-300 ${
                    isHovering.proPlus
                      ? "border-purple-600 shadow-lg dark:border-purple-500"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                  onMouseEnter={() =>
                    setIsHovering((prev) => ({ ...prev, proPlus: true }))
                  }
                  onMouseLeave={() =>
                    setIsHovering((prev) => ({ ...prev, proPlus: false }))
                  }
                >
                  <CardHeader className="bg-purple-50 pb-6 pt-6 dark:bg-purple-900">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300">
                          Pro Plus
                        </h3>
                        <p className="mt-1 text-sm text-purple-600 dark:text-purple-400">
                          For serious career advancement
                        </p>
                      </div>
                      <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-6">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Starting at
                        </p>
                        <Badge className="ml-2 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200">
                          <Clock className="mr-1 h-3 w-3" />
                          Save 20%
                        </Badge>
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-purple-700 dark:text-purple-400">
                          $191.90
                        </span>
                        <span className="ml-1 text-gray-500 dark:text-gray-400">
                          /year
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                        Only $15.99/month, billed annually
                      </p>
                    </div>
                    <ul className="mb-8 space-y-4">
                      <li className="flex items-start">
                        <CheckCircle className="mr-3 h-5 w-5 shrink-0 text-green-500" />
                        <span>
                          <strong>Unlimited</strong> resumes and cover letters
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-3 h-5 w-5 shrink-0 text-green-500" />
                        <span>
                          <strong>Advanced AI</strong> career content writing
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-3 h-5 w-5 shrink-0 text-green-500" />
                        <span>
                          <strong>Full design customization</strong> options
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-3 h-5 w-5 shrink-0 text-green-500" />
                        <span>
                          <strong>Priority support</strong> with career experts
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="pb-6">
                    <Button
                      className={`w-full transition-all duration-300 ${
                        isHovering.proPlus
                          ? "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                          : "bg-white text-purple-700 hover:bg-purple-50 dark:bg-gray-800 dark:text-purple-400 dark:hover:bg-gray-700"
                      }`}
                      variant={isHovering.proPlus ? "default" : "outline"}
                    >
                      Get Pro Plus
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              All plans include a 14-day money-back guarantee. Need help
              choosing?{" "}
              <Link
                href="/contact"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
