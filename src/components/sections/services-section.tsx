import { services } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

/**
 * Services as an editorial menu rather than a card grid. Each offering is a
 * numbered row separated by hairlines — a deliberate enumerated list, which
 * also breaks the "two identical card grids" rhythm with the Strings section
 * that follows. Rows reveal in a gentle stagger on scroll.
 */
export function ServicesSection() {
  return (
    <section id="services" className="border-b border-line py-20 md:py-28">
      <div className="container-content">
        <Reveal>
          <h2 className="font-display text-4xl font-semibold tracking-[-0.01em] text-ink md:text-5xl">
            Services
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Every restring is calibrated on precision machines and backed by
            tour-level judgement on tension and string choice.
          </p>
        </Reveal>

        <ul className="mt-14 border-t border-line">
          {services.map((service, index) => (
            <li key={service.id} className="border-b border-line">
              <Reveal
                delay={index * 0.06}
                className="grid gap-3 py-8 md:grid-cols-[5rem_1fr] md:gap-10"
              >
                <span
                  aria-hidden
                  className="font-mono text-sm font-medium text-court"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-2xl leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
