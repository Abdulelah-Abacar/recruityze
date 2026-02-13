import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function CTA() {
  return (
    <section className="mt-16 text-center">
      <h2 className="mb-4 text-2xl font-bold">Still have questions?</h2>
      <p className="mb-6 text-muted-foreground">
        Contact our team and we&apos;ll help you find the right plan.
      </p>
      <Button size="lg" asChild>
        <Link href="/contact">Contact Support</Link>
      </Button>
    </section>
  );
}

export default CTA;
