"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

// Transform-only so the hero copy is always opaque — never a blank hero for
// no-JS, crawlers, or a scan that lands before the entrance plays.
const item: Variants = {
  hidden: { y: 22 },
  show: { y: 0, transition: { duration: 0.7, ease: EASE } },
};

/**
 * Match-night hero. Dark ink ground with the masked strung-grid texture and
 * a staggered load entrance. The dark surface gives the page a strong opening
 * statement and lets the gold CTA carry the eye. Reduced motion renders the
 * fully-visible content with no entrance.
 */
export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div aria-hidden className="string-grid-dark absolute inset-0" />
      {/* Soft gold light leaking from the top-left, like bench lighting. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-40 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
      />

      <motion.div
        className="container-content relative py-24 md:py-36"
        variants={reduce ? undefined : container}
        initial={reduce ? undefined : "hidden"}
        animate={reduce ? undefined : "show"}
      >
        <motion.p
          variants={reduce ? undefined : item}
          className="font-mono text-xs uppercase tracking-[0.22em] text-gold"
        >
          Officially Certified Tour Stringer
        </motion.p>

        <motion.h1
          variants={reduce ? undefined : item}
          className="mt-6 max-w-3xl text-[2.75rem] leading-[1.04] text-paper md:text-7xl"
        >
          {siteConfig.tagline}
        </motion.h1>

        <motion.p
          variants={reduce ? undefined : item}
          className="mt-7 max-w-xl text-lg leading-relaxed text-paper/80"
        >
          {siteConfig.description}
        </motion.p>

        <motion.div
          variants={reduce ? undefined : item}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Button asChild size="lg" variant="gold">
            <Link href="/booking">Book a Restring Now</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-paper/25 bg-transparent text-paper hover:bg-paper/10 hover:text-paper"
          >
            <Link href="/#about">Meet the Stringer</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
