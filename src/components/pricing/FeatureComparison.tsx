import { CheckCircle } from "lucide-react";
import React from "react";

function FeatureComparison({ plans }: { plans: PricingPlan[] }) {
  return (
    <section className="mt-24">
      <h2 className="mb-8 text-center text-2xl font-bold">
        Feature Comparison
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Feature</th>
              {plans.map((plan) => (
                <th key={`header-${plan.name}`} className="text-center">
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {plans[0].features.map((_, featureIndex) => (
              <tr key={`feature-${featureIndex}`} className="border-b">
                <td className="py-4">{plans[0].features[featureIndex].name}</td>
                {plans.map((plan) => (
                  <td
                    key={`cell-${plan.name}-${featureIndex}`}
                    className="py-4 text-center"
                  >
                    {plan.features[featureIndex].available ? (
                      <CheckCircle className="mx-auto h-5 w-5 text-green-500" />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default FeatureComparison;
