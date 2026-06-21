import Link from "next/link";

import { siteConfig, navLinks } from "@/content/site";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b border-line bg-paper/95 backdrop-blur">
      <div className="container-content flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-ink"
        >
          {siteConfig.name}
        </Link>

        {/*
          TODO(issue): mobile nav disclosure menu is intentionally not
          built in this starter. Fully-scoped issue body ready to file:
          docs/planned-issues/001-mobile-navigation.md
        */}
        <nav aria-label="Primary" className="hidden gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-court"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button asChild size="sm" variant="gold">
          <Link href="/booking">Book a Restring</Link>
        </Button>
      </div>
    </header>
  );
}
