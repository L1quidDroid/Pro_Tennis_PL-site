import type { Metadata } from "next";

import { PageIntro } from "@/components/sections/page-intro";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about our stringing service.",
};

/**
 * Placeholder. Fully-scoped issue ready to file:
 * docs/planned-issues/004-faq-content.md
 */
export default function FaqPage() {
  return (
    <PageIntro title="FAQ">
      <p>Frequently asked questions will appear here.</p>
    </PageIntro>
  );
}
