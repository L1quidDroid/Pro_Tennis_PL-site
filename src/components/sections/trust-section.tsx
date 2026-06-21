import { trustStats } from "@/content/site";

export function TrustSection() {
  return (
    <section className="border-b border-line bg-ink py-16 text-paper">
      <div className="container-content grid grid-cols-2 gap-8 md:grid-cols-4">
        {trustStats.map((stat) => (
          <div key={stat.label}>
            <p className="font-mono text-4xl font-semibold text-gold">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-paper/70">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
