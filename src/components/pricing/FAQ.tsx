import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function FAQ({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <section className="mt-24">
      <h2 className="mb-8 text-center text-2xl font-bold">
        Frequently Asked Questions
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {faqs.map((faq, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{faq.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
