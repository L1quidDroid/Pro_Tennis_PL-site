/**
 * Site-wide content configuration.
 *
 * This file is intentionally plain data (no JSX, no logic) so that:
 *  - non-developers can eventually edit copy without touching components
 *  - a future CMS integration can replace this file's exports without
 *    changing any component code
 *  - AI agents implementing a single feature ticket can find copy in one
 *    predictable place instead of hunting through JSX
 *
 * Keep this file free of UI concerns. If a field needs new shape, update
 * the matching type in `src/types/content.ts` first.
 */

import type {
  SiteConfig,
  TrustStat,
  ServiceItem,
  ProductItem,
} from "@/types/content";

export const siteConfig: SiteConfig = {
  name: "PRO Stringing",
  tagline: "Tour-level stringing, strung in Melbourne.",
  description:
    "Melbourne racquet stringing service led by a 35-year tour stringer with 20 Grand Slam appearances and 3 Olympic Games. Precision tension, premium strings, 24-48hr turnaround.",
  url: "https://www.prostringing.au",
  phone: "0494 515 456",
  email: "protennisau@gmail.com",
  locale: "en_AU",
};

export const trustStats: TrustStat[] = [
  { value: "35+", label: "Years of tour experience" },
  { value: "20", label: "Grand Slam appearances" },
  { value: "3", label: "Olympic Games" },
  { value: "24-48h", label: "Standard turnaround" },
];

export const services: ServiceItem[] = [
  {
    id: "standard-restring",
    title: "Standard Restring",
    description:
      "Full restring with your choice of string and tension, calibrated on precision machines. Ready in 24-48 hours.",
  },
  {
    id: "express-restring",
    title: "Express Same-Day",
    description:
      "Tournament-week turnaround for players who can't wait. Drop off in the morning, play on it that evening.",
  },
  {
    id: "tension-consult",
    title: "String & Tension Consult",
    description:
      "Not sure what to choose? Get tour-level guidance on string type and tension based on your playing style and goals.",
  },
  {
    id: "racquet-care",
    title: "Racquet Maintenance",
    description:
      "Grip replacement, frame inspection, and general racquet care alongside your restring.",
  },
];

export const products: ProductItem[] = [
  {
    id: "luxilon-alu-power",
    name: "Luxilon ALU Power 1.25",
    price: 60,
    description: "The tour standard for control and durability.",
  },
  {
    id: "yonex-poly-tour-pro",
    name: "Yonex Poly Tour Pro 1.25",
    price: 50,
    description: "Crisp feel with reliable spin potential.",
  },
  {
    id: "babolat-rpm",
    name: "Babolat RPM 1.25",
    price: 55,
    description: "Aggressive spin string favoured by baseliners.",
  },
  {
    id: "solinco-hyper-g",
    name: "Solinco Hyper G 1.25",
    price: 50,
    description: "Soft-feeling polyester with excellent bite.",
  },
];

export const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#products", label: "Strings" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];
