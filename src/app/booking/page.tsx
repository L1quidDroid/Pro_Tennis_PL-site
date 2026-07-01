import type { Metadata } from "next";

import { BookingForm } from "@/components/sections/booking-form";

export const metadata: Metadata = {
  title: "Book a Restring",
  description: "Book your tennis racquet restring online.",
};

export default function BookingPage() {
  return (
    <div className="container-content py-20">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold text-ink">
          Book a Restring
        </h1>
        <p className="mt-4 text-ink/70">
          Tell us about your racquet and how you like it strung. We&apos;ll
          confirm your slot by email — usually within a few hours.
        </p>
      </div>
      <div className="mt-10 max-w-2xl">
        <BookingForm />
      </div>
    </div>
  );
}
