import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="border-b border-line bg-court py-20 text-paper">
      <div className="container-content flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-3xl font-semibold">
            Ready for your next restring?
          </h2>
          <p className="mt-2 max-w-md text-paper/80">
            Book online in a couple of minutes — no account required.
          </p>
        </div>

        <Button asChild size="lg" variant="gold">
          <Link href="/booking">Book a Restring Now</Link>
        </Button>
      </div>
    </section>
  );
}
