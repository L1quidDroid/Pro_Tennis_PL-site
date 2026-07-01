import type { Metadata } from "next";

import { PageIntro } from "@/components/sections/page-intro";

export const metadata: Metadata = {
  title: "Book a Restring",
  description: "Book your tennis racquet restring online.",
};

/**
 * Placeholder route. The real booking form (date/time, service type,
 * string + tension fields, Zod validation, Resend email notification)
 * is fully scoped and ready to file as a GitHub Issue:
 * docs/planned-issues/002-booking-form.md
 *
 * Do not build booking logic directly in this file without filing that
 * issue first; implement against its acceptance criteria so the PR
 * stays scoped.
 */
export default function BookingPage() {
  return (
    <PageIntro title="Book a Restring">
      <p>
        Online booking is coming soon. In the meantime, contact us directly to
        arrange a restring.
      </p>
    </PageIntro>
  );
}
