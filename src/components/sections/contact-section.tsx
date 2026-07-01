import { siteConfig } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

/**
 * Placeholder contact section for the homepage. The full contact form
 * (validation, submission handling) is fully scoped and ready to file:
 * docs/planned-issues/003-contact-form.md. This section currently
 * exposes only static contact details so the page has a complete shell.
 */
export function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container-content">
        <Reveal>
          <h2 className="font-display text-4xl font-semibold tracking-[-0.01em] text-ink md:text-5xl">
            Get in Touch
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Questions about string choice, tension, or turnaround? Reach out
            directly.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            <div className="bg-paper p-6">
              <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                Email
              </dt>
              <dd className="mt-2 text-lg text-ink">{siteConfig.email}</dd>
            </div>
            <div className="bg-paper p-6">
              <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                Phone
              </dt>
              <dd className="mt-2 text-lg text-ink">{siteConfig.phone}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
