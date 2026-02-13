import React from "react";
import { Button } from "../ui/button";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

function Pricing({ plans }: { plans: PricingPlan[] }) {
  return (
    <section className="mx-auto max-w-5xl">
      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="mx-auto mb-8 grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly (Save 20%)</TabsTrigger>
        </TabsList>

        {/* Monthly Plans */}
        <TabsContent value="monthly" className="space-y-4">
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <Card key={`monthly-${plan.name}`} className="relative border-2">
                {plan.isPopular && (
                  <div className="absolute right-0 top-0 -translate-y-2 translate-x-2 transform">
                    <Badge>Popular</Badge>
                  </div>
                )}
                <CardContent className="pt-6">
                  <h3 className="mb-2 text-xl font-bold">{plan.name}</h3>
                  <p className="mb-4 text-muted-foreground">
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">
                      {plan.price.monthly}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="mb-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-center">
                        {feature.available ? (
                          <>
                            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                            <span>{feature.name}</span>
                          </>
                        ) : (
                          <span className="ml-7 text-muted-foreground">
                            {feature.name}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.variant}>
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Yearly Plans */}
        <TabsContent value="yearly" className="space-y-4">
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <Card key={`yearly-${plan.name}`} className="relative border-2">
                {plan.isPopular && (
                  <div className="absolute right-0 top-0 -translate-y-2 translate-x-2 transform">
                    <Badge>Popular</Badge>
                  </div>
                )}
                <CardContent className="pt-6">
                  <h3 className="mb-2 text-xl font-bold">{plan.name}</h3>
                  <p className="mb-4 text-muted-foreground">
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">
                      {plan.price.yearly}
                    </span>
                    <span className="text-muted-foreground">/year</span>
                  </div>
                  <ul className="mb-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-center">
                        {feature.available ? (
                          <>
                            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                            <span>{feature.name}</span>
                          </>
                        ) : (
                          <span className="ml-7 text-muted-foreground">
                            {feature.name}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.variant}>
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default Pricing;
