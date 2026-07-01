import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper/80">
      <div className="container-content grid gap-10 py-12 md:grid-cols-3">
        <div>
          <Logo variant="onDark" className="h-9" />
          <p className="mt-3 text-sm">{siteConfig.tagline}</p>
        </div>

        <div className="text-sm">
          <p className="font-semibold text-paper">Contact</p>
          <p className="mt-2">{siteConfig.email}</p>
          <p>{siteConfig.phone}</p>
        </div>

        <div className="text-sm">
          <p className="font-semibold text-paper">Legal</p>
          <ul className="mt-2 space-y-1">
            <li>
              <Link href="/privacy-policy" className="hover:text-gold">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-gold">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-content border-t border-paper/10 py-4 text-xs text-paper/50">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
