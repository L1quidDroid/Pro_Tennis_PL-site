"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { navLinks } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Kept in sync with the `mobile-nav-out` animation below. The panel stays
// mounted for this long after closing so the exit animation can play before
// it leaves the DOM.
const TRANSITION_MS = 280;

/**
 * Mobile navigation disclosure. Rendered only below the `md` breakpoint —
 * the desktop nav in `Header` covers `md` and up. Kept as a small client
 * component so the rest of the header can stay server-rendered.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close on route change (e.g. after a link is tapped).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Mount immediately on open; keep mounted through the exit animation on
  // close, then unmount. Reduced motion shortens the animation globally, so
  // the brief lingering frame is invisible in that case.
  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }
    if (!mounted) return;
    const timer = setTimeout(() => setMounted(false), TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [open, mounted]);

  // Close on Escape while open, returning focus to the toggle.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <Button
        ref={buttonRef}
        type="button"
        variant="ghost"
        size="icon"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="relative block h-5 w-5">
          <Menu
            className={cn(
              "absolute inset-0 h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              open
                ? "rotate-90 scale-50 opacity-0"
                : "rotate-0 scale-100 opacity-100",
            )}
            aria-hidden="true"
          />
          <X
            className={cn(
              "absolute inset-0 h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              open
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-50 opacity-0",
            )}
            aria-hidden="true"
          />
        </span>
      </Button>

      {mounted ? (
        <nav
          id="mobile-nav-panel"
          aria-label="Mobile"
          data-state={open ? "open" : "closed"}
          className={cn(
            "absolute inset-x-0 top-full z-50 border-b border-line bg-paper",
            "shadow-[0_16px_32px_-16px_rgba(34,30,37,0.35)]",
            "data-[state=open]:animate-[mobile-nav-in_280ms_cubic-bezier(0.16,1,0.3,1)]",
            "data-[state=closed]:animate-[mobile-nav-out_280ms_cubic-bezier(0.16,1,0.3,1)_forwards]",
          )}
        >
          <ul className="container-content flex flex-col gap-0.5 py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded px-3 py-2.5 text-base font-medium text-ink transition-colors duration-200 hover:bg-line/40 hover:text-court focus-visible:bg-line/40 focus-visible:text-court"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
