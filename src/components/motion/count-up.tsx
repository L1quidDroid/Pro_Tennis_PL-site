"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Counts the first integer in `value` up from zero when it scrolls into
 * view, preserving any surrounding characters ("35+", "24-48h", "3").
 *
 * SSR and reduced-motion render the final value verbatim, so the real
 * number is always in the markup — the count-up is pure enhancement.
 */
export function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduce || !inView) return;
    const match = value.match(/\d+/);
    if (!match) return;
    const target = Number(match[0]);
    const controls = animate(0, target, {
      duration: 1.1,
      ease: EASE,
      onUpdate: (latest) => {
        setDisplay(value.replace(/\d+/, String(Math.round(latest))));
      },
    });
    return () => controls.stop();
    // `value` is the only external input; match is derived inside to avoid a
    // fresh-object dependency that would restart the animation every render.
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={className}>
      {reduce ? value : display}
    </span>
  );
}
