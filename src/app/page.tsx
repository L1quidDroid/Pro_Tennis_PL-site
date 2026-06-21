import { Hero } from "@/components/sections/hero";
import { TrustSection } from "@/components/sections/trust-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ProductsSection } from "@/components/sections/product-cards";
import { CtaSection } from "@/components/sections/cta-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustSection />
      <ServicesSection />
      <ProductsSection />
      <CtaSection />
      <ContactSection />
    </>
  );
}
