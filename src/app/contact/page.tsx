import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  MessageSquare,
  Instagram,
  Linkedin,
  Facebook,
} from "lucide-react";
import { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our team",
};

export default function ContactPage() {
  const contactLinks = [
    {
      name: "Email",
      url: "mailto:hello@recruityze.com",
      icon: <Mail className="h-5 w-5" />,
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/1234567890",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      name: "Instagram",
      url: "https://instagram.com/recruityze",
      icon: <Instagram className="h-5 w-5" />,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/company/recruityze",
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      name: "Facebook",
      url: "https://facebook.com/recruityze",
      icon: <Facebook className="h-5 w-5" />,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-16 text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">Contact Us</h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Have questions or feedback? We&apos;d love to hear from you.
            </p>
          </section>

          <section className="grid gap-12 md:grid-cols-2">
            {/* Contact Form */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>

            {/* Contact Information */}
            <article className="space-y-8">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Connect with us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contactLinks.map((link) => (
                      <Button
                        key={link.name}
                        asChild
                        variant="outline"
                        className="w-full justify-start gap-3"
                      >
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.icon}
                          {link.name}
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </article>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
