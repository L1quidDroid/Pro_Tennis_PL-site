import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { siteConfig, navLinks } from "@/content/site";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Header() {
  return (
    <header className="relative z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="container-content flex h-20 items-center justify-between">
        <Link
          href="/"
          aria-label={`${siteConfig.name} home`}
          className="shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-court focus-visible:ring-offset-2"
        >
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink transition-colors hover:text-court"
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
