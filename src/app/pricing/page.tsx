import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Pricing for racquet restringing services.",
};

/**
 * Placeholder. Fully-scoped issue ready to file:
 * docs/planned-issues/005-pricing-content.md
 */
export default function PricingPage() {
  return (
    <div className="container-content py-20">
      <h1 className="text-3xl text-ink">Pricing</h1>
      <p className="mt-4 max-w-xl text-ink/70">
        Pricing details will appear here.
      </p>
    </div>
  );
}
