"use client";
import Link from "next/link";
import { FC, useState } from "react";
import { Mail, ArrowRight, MessageSquare, MapPin, Phone } from "lucide-react";
import { EnhancedNewsletterSignup } from "./blog/BlogPostPage";

interface FooterLink {
  name: string;
  href: string;
  isNew?: boolean;
  isPopular?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      // In a real implementation, this would send the email to your subscription service
    }
  };

  const sections: FooterSection[] = [
    {
      title: "Product",
      links: [
        { name: "Resume Builder", href: "/resumes", isPopular: true },
        { name: "Interview Practice", href: "/interviews" },
        { name: "ATS Checker", href: "/ats-checker" },
        { name: "Cover Letter AI", href: "/cover-letters", isNew: true },
        { name: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blogs" },
        { name: "Career Guides", href: "/guides", isPopular: true },
        { name: "Interview Tips", href: "/interview-tips" },
        { name: "Resume Templates", href: "/templates" },
        { name: "Job Search Strategy", href: "/job-search" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Success Stories", href: "/success-stories" },
        { name: "Careers", href: "/careers", isNew: true },
        { name: "Contact", href: "/contact" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com/recruityze",
      icon: (
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/recruityze",
      icon: (
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/recruityze",
      icon: (
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  const stats = [
    { label: "Job seekers helped", value: "250K+" },
    { label: "Success rate", value: "78%" },
    { label: "Countries", value: "42" },
  ];

  return (
    <footer>
      {/* Newsletter Section */}
      <div className="bg-blue-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="mb-2 text-xl font-bold text-white">
                  Get career tips and job search strategies
                </h3>
                <p className="text-blue-100">
                  Join 25,000+ job seekers receiving weekly advice from industry
                  experts
                </p>
              </div>
              <div className="w-full md:w-auto">
                {!subscribed ? (
                  <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row"
                  >
                    <div className="relative mb-2 flex-grow sm:mb-0 sm:mr-2">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-white/50"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex items-center justify-center rounded-lg bg-white px-4 py-2 font-medium text-blue-600 transition-colors hover:bg-blue-50"
                    >
                      Subscribe
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </form>
                ) : (
                  <div className="rounded-lg bg-white/10 p-3 text-center text-white">
                    <p>✓ Thanks for subscribing! Check your inbox soon.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bg-blue-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <EnhancedNewsletterSignup />
          </div>
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="bg-white py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-5">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="mb-6">
                <Link href="/" className="inline-block">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent dark:from-blue-400 dark:to-indigo-400">
                    Recruityze
                  </span>
                </Link>
              </div>
              <p className="mb-6 max-w-md text-gray-600 dark:text-gray-400">
                AI-powered tools to help you land your dream job. Our platform
                uses advanced technology to optimize your resume, prepare you
                for interviews, and give you the edge in your job search.
              </p>

              {/* Stats */}
              {/* <div className="mb-6 grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div> */}

              {/* Social Links */}
              <div className="mt-6 flex space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gray-100 p-2 text-gray-400 transition-colors hover:text-blue-600 dark:bg-gray-800 dark:hover:text-blue-400"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Dynamic Sections */}
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="mb-6 text-lg font-bold">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group flex items-center text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      >
                        <span className="relative">
                          {link.name}
                          {link.isNew && (
                            <span className="absolute -right-10 -top-1 rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                              New
                            </span>
                          )}
                          {link.isPopular && (
                            <span className="absolute -right-14 -top-1 rounded-full bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                              Popular
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          {/* <div className="mt-16 border-t border-gray-100 pt-8 dark:border-gray-800">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex items-center">
                <MapPin className="mr-3 h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  123 Career Street, San Francisco, CA 94107
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  (555) 123-4567
                </span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="mr-3 h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  support@recruityze.com
                </span>
              </div>
            </div>
          </div> */}

          {/* Bottom Bar */}
          <div className="mt-16 flex flex-col border-t border-gray-100 pt-8 dark:border-gray-800 md:flex-row md:items-center md:justify-between">
            <p className="mb-4 text-gray-500 dark:text-gray-400 md:mb-0">
              &copy; {currentYear} Recruityze. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-gray-500 dark:text-gray-400">
              <Link
                href="/privacy"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Cookie Policy
              </Link>
              <Link
                href="/accessibility"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
