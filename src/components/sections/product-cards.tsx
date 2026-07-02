import { products } from "@/content/site";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

/**
 * MVP scope note: this section is display-only. Cart/checkout is explicitly
 * a Phase 2 feature — see ticket "[Phase 2] Product catalogue + Stripe
 * checkout". Do not wire up purchasing logic against this component
 * without a dedicated ticket for it.
 *
 * Treated as product cards (priced items) — deliberately distinct from the
 * editorial Services list above so the two sections don't read as one
 * repeated grid. Flat at rest per the design system; the lift is the
 * hover affordance.
 */
export function ProductsSection() {
  return (
    <section
      id="products"
      className="border-b border-line bg-paper py-20 md:py-28"
    >
      <div className="container-content">
        <Reveal>
          <h2 className="text-4xl text-ink md:text-5xl">Strings We Use</h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Premium strings from the brands trusted on tour. Price includes
            labour.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.08} className="h-full">
              <Card className="flex h-full flex-col bg-paper shadow-none transition duration-300 ease-out hover:-translate-y-1 hover:border-court/40 hover:shadow-[0_18px_36px_-20px_rgba(34,30,37,0.4)]">
                <CardTitle>{product.name}</CardTitle>
                <CardDescription className="flex-1">
                  {product.description}
                </CardDescription>
                <p className="mt-6 flex items-baseline gap-1 font-mono text-2xl font-semibold tabular-nums text-court">
                  <span className="text-base text-muted">$</span>
                  {product.price.toFixed(0)}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
