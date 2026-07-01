import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="string-grid absolute inset-0" />

      <div className="container-content relative py-20 md:py-28">
        <Link
          href="/"
          aria-label={`${siteConfig.name} home`}
          className="inline-block rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-court focus-visible:ring-offset-2"
        >
          <Logo variant="hero" />
        </Link>

        <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-court">
          Officially Certified Tour Stringer
        </p>

        <h1 className="mt-6 max-w-2xl font-display text-4xl font-semibold leading-tight text-ink md:text-6xl">
          {siteConfig.tagline}
        </h1>

        <p className="mt-6 max-w-xl text-lg text-ink/70">
          {siteConfig.description}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild size="lg" variant="gold">
            <Link href="/booking">Book a Restring Now</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#about">Meet the Stringer</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
