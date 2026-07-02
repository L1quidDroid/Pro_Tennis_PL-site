import { products } from "@/content/site";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

/**
 * MVP scope note: this section is display-only. Cart/checkout is explicitly
 * a Phase 2 feature — see ticket "[Phase 2] Product catalogue + Stripe
 * checkout". Do not wire up purchasing logic against this component
 * without a dedicated ticket for it.
 */
export function ProductsSection() {
  return (
    <section id="products" className="border-b border-line bg-paper py-20">
      <div className="container-content">
        <h2 className="text-3xl text-ink">Strings We Use</h2>
        <p className="mt-2 max-w-xl text-ink/70">
          Premium strings from the brands trusted on tour. Price includes
          labour.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Card key={product.id}>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
              <p className="mt-4 font-mono text-lg text-court">
                ${product.price.toFixed(2)}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
