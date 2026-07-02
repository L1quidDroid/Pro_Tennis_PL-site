import { trustStats } from "@/content/site";
import { CountUp } from "@/components/motion/count-up";

/**
 * Credential stat line. Continues the hero's ink ground so the page opens on
 * one cohesive match-night act, then hands off to the light content below.
 * Numbers count up from zero as they scroll into view (reduced motion and
 * no-JS render the final values verbatim).
 */
export function TrustSection() {
  return (
    <section className="rounded-b-[2rem] bg-ink py-16 text-paper md:rounded-b-[2.75rem] md:py-20">
      <div className="container-content grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 md:divide-x md:divide-paper/10">
        {trustStats.map((stat, index) => (
          <div key={stat.label} className={index > 0 ? "md:pl-8" : undefined}>
            <CountUp
              value={stat.value}
              className="block font-mono text-4xl font-semibold tabular-nums text-gold md:text-5xl"
            />
            <p className="mt-3 text-sm leading-snug text-paper/70">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
