import { services } from "@/content/site";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export function ServicesSection() {
  return (
    <section id="services" className="border-b border-line py-20">
      <div className="container-content">
        <h2 className="font-display text-3xl font-semibold text-ink">
          Services
        </h2>
        <p className="mt-2 max-w-xl text-ink/70">
          Every restring is calibrated on precision machines and backed by
          tour-level judgement on tension and string choice.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card key={service.id}>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
