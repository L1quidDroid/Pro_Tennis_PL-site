import type { Metadata } from "next";

import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with PRO Stringing.",
};

export default function ContactPage() {
  return <ContactSection />;
}
