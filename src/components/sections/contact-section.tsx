import { siteConfig } from "@/content/site";

/**
 * Placeholder contact section for the homepage. The full contact form
 * (validation, submission handling) is fully scoped and ready to file:
 * docs/planned-issues/003-contact-form.md. This section currently
 * exposes only static contact details so the page has a complete shell.
 */
export function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="container-content">
        <h2 className="font-display text-3xl font-semibold text-ink">
          Get in Touch
        </h2>
        <p className="mt-2 max-w-xl text-ink/70">
          Questions about string choice, tension, or turnaround? Reach out
          directly.
        </p>

        <dl className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-muted">Email</dt>
            <dd className="mt-1 text-lg text-ink">{siteConfig.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted">Phone</dt>
            <dd className="mt-1 text-lg text-ink">{siteConfig.phone}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
