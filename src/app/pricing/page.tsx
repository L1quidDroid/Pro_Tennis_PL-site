import type { Metadata } from "next";

import { PageIntro } from "@/components/sections/page-intro";

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
    <PageIntro title="Pricing">
      <p>Pricing details will appear here.</p>
    </PageIntro>
  );
}
