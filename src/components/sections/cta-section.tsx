import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function CtaSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-content">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-court px-8 py-14 text-paper md:rounded-[2.5rem] md:px-14 md:py-16">
          <div aria-hidden className="string-grid-dark absolute inset-0" />
          <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] md:text-4xl">
                Ready for your next restring?
              </h2>
              <p className="mt-3 max-w-md text-lg text-paper/85">
                Book online in a couple of minutes — no account required.
              </p>
            </div>

            <Button asChild size="lg" variant="gold" className="shrink-0">
              <Link href="/booking">Book a Restring Now</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
