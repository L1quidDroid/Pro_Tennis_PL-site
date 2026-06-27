import Link from "next/link";

import { siteConfig, navLinks } from "@/content/site";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Header() {
  return (
    <header className="relative border-b border-line bg-paper/95 backdrop-blur">
      <div className="container-content flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-ink"
        >
          {siteConfig.name}
        </Link>

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

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="gold">
            <Link href="/booking">Book a Restring</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
