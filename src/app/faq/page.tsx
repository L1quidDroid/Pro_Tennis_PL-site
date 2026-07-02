import type { Metadata } from "next";

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
    <div className="container-content py-20">
      <h1 className="text-3xl text-ink">FAQ</h1>
      <p className="mt-4 max-w-xl text-ink/70">
        Frequently asked questions will appear here.
      </p>
    </div>
  );
}
