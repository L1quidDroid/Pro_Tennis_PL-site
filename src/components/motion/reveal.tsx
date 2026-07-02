"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Ease-out-expo — the same curve the mobile-nav disclosure uses, so motion
// across the site shares one signature feel.
const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds; pass `index * 0.08` inside a mapped list. */
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
};

/**
 * Scroll-reveal wrapper: rises its children into view once.
 *
 * Deliberately transform-only — opacity is never animated. The content is
 * always fully opaque, so it stays visible (and contrast-correct) for
 * no-JS, crawlers, and a headless render that scans before the reveal
 * fires; the motion is pure enhancement on top of an already-visible
 * default. `prefers-reduced-motion` drops the transform entirely.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ y }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
