import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";

/**
 * Shared page header for the standalone routes (pricing, FAQ, booking).
 * Gives every secondary page the same confident title treatment and a
 * gentle reveal, so the site reads as one system rather than a set of
 * differently-styled placeholders.
 */
export function PageIntro({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <div className="container-content">
        <Reveal>
          <h1 className="text-balance font-display text-4xl font-semibold tracking-[-0.02em] text-ink md:text-6xl">
            {title}
          </h1>
          <div className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
