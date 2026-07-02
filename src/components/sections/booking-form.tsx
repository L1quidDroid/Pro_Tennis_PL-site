"use client";

import * as React from "react";
import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Link2, Link2Off } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TensionSlider } from "@/components/ui/tension-slider";
import { products, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";
import {
  bookingSchema,
  TENSION_MAX,
  TENSION_MIN,
  type BookingInput,
} from "@/lib/validations/booking";

type Status = "idle" | "submitting" | "success" | "error";

const SERVICE_OPTIONS = [
  {
    value: "standard",
    title: "Standard Restring",
    sub: "Ready in 24-48 hours",
  },
  {
    value: "express",
    title: "Express Same-Day",
    sub: "Drop off in the morning, play on it that evening",
  },
] as const;

/** Visual + programmatic "required" marker. */
function Req() {
  return (
    <span aria-hidden="true" className="ml-0.5 text-red-600">
      *
    </span>
  );
}

function formatDate(value?: string) {
  if (!value) return null;
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/** One line in the live booking summary rail. */
function SummaryRow({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-line py-2.5 first:border-t-0">
      <dt className="shrink-0 text-sm text-muted">{label}</dt>
      <dd
        className={cn(
          "text-right text-sm",
          value ? "font-medium text-ink" : "italic text-muted",
        )}
      >
        {value ?? "Not chosen yet"}
      </dd>
    </div>
  );
}

/** Icon + text error (never colour alone) linked to its field. */
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p
      id={id}
      className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600"
    >
      <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </p>
  );
}

export function BookingForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    // Validate inline once a field has been touched, not only on submit.
    mode: "onTouched",
    defaultValues: {
      serviceType: "standard",
      tensionMain: 52,
      tensionCross: 52,
    },
  });

  const [lockCross, setLockCross] = React.useState(true);
  const today = React.useMemo(() => new Date().toISOString().slice(0, 10), []);

  const mainTension = useController({ control, name: "tensionMain" });
  const crossTension = useController({ control, name: "tensionCross" });

  const setMain = (v: number) => {
    mainTension.field.onChange(v);
    if (lockCross) crossTension.field.onChange(v);
  };
  const toggleLock = () => {
    setLockCross((prev) => {
      const next = !prev;
      if (next) crossTension.field.onChange(Number(mainTension.field.value));
      return next;
    });
  };

  // Live values powering the summary rail.
  const watched = watch();
  const summary = {
    service:
      SERVICE_OPTIONS.find((o) => o.value === watched.serviceType)?.title ??
      null,
    string:
      watched.stringChoice && watched.stringChoice.length > 0
        ? watched.stringChoice
        : null,
    tension: `${watched.tensionMain ?? 52} / ${watched.tensionCross ?? 52} lbs`,
    date: formatDate(watched.preferredDate),
  };

  const onSubmit = async (values: BookingInput) => {
    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(
          body?.error ?? "Something went wrong. Please try again.",
        );
      }
      setStatus("success");
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="mx-auto max-w-xl rounded-lg border border-line bg-paper/60 p-8 text-center"
      >
        <CheckCircle2
          aria-hidden="true"
          className="mx-auto h-10 w-10 text-court"
        />
        <h2 className="mt-4 text-2xl text-ink">Booking received</h2>
        <p className="mx-auto mt-2 max-w-md text-ink/70">
          Thanks — we&apos;ve emailed you a confirmation and will be in touch
          shortly to lock in your slot.
        </p>
      </div>
    );
  }

  const invalid = (field: keyof BookingInput) =>
    errors[field] ? true : undefined;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-full max-w-2xl space-y-6"
      >
        {/* Honeypot: hidden from users, catches naive bots. */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("company")}
          />
        </div>

        <p className="text-sm text-muted">
          Fields marked <span className="text-red-600">*</span> are required.
        </p>

        {/* Single primary column — unrelated fields are never side by side. */}
        <div className="space-y-5">
          <div>
            <Label htmlFor="name">
              Name
              <Req />
            </Label>
            <Input
              id="name"
              autoComplete="name"
              aria-required
              aria-invalid={invalid("name")}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="mt-1.5"
              {...register("name")}
            />
            <FieldError id="name-error" message={errors.name?.message} />
          </div>
          <div>
            <Label htmlFor="email">
              Email
              <Req />
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              aria-required
              aria-invalid={invalid("email")}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="mt-1.5"
              {...register("email")}
            />
            <FieldError id="email-error" message={errors.email?.message} />
          </div>
          <div>
            <Label htmlFor="phone">
              Phone <span className="font-normal text-muted">(optional)</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              aria-invalid={invalid("phone")}
              aria-describedby={
                errors.phone ? "phone-error phone-hint" : "phone-hint"
              }
              className="mt-1.5"
              {...register("phone")}
            />
            <p id="phone-hint" className="mt-1 text-xs text-muted">
              Only if you&apos;d like a text when your racquet&apos;s ready — we
              confirm by email either way.
            </p>
            <FieldError id="phone-error" message={errors.phone?.message} />
          </div>
          <div>
            <Label htmlFor="preferredDate">
              Preferred date
              <Req />
            </Label>
            <Input
              id="preferredDate"
              type="date"
              min={today}
              aria-required
              aria-invalid={invalid("preferredDate")}
              aria-describedby={
                errors.preferredDate ? "preferredDate-error" : undefined
              }
              className="mt-1.5"
              {...register("preferredDate")}
            />
            <FieldError
              id="preferredDate-error"
              message={errors.preferredDate?.message}
            />
          </div>

          {/* Two mutually exclusive options — radios, not a dropdown. */}
          <fieldset>
            <legend className="text-sm font-medium text-ink">
              Service type
              <Req />
            </legend>
            <div className="mt-2 space-y-2">
              {SERVICE_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className="flex cursor-pointer items-start gap-3 rounded-md border border-line bg-paper p-3 transition-colors has-[:checked]:border-court has-[:checked]:bg-court/5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-court"
                >
                  <input
                    type="radio"
                    value={opt.value}
                    className="mt-0.5 h-4 w-4 accent-court"
                    {...register("serviceType")}
                  />
                  <span>
                    <span className="block font-medium text-ink">
                      {opt.title}
                    </span>
                    <span className="block text-sm text-muted">{opt.sub}</span>
                  </span>
                </label>
              ))}
            </div>
            <FieldError
              id="serviceType-error"
              message={errors.serviceType?.message}
            />
          </fieldset>

          <div>
            <Label htmlFor="stringChoice">
              String
              <Req />
            </Label>
            <Select
              id="stringChoice"
              defaultValue=""
              aria-required
              aria-invalid={invalid("stringChoice")}
              aria-describedby={
                errors.stringChoice ? "stringChoice-error" : undefined
              }
              className="mt-1.5"
              {...register("stringChoice")}
            >
              <option value="" disabled>
                Choose a string
              </option>
              {products.map((product) => (
                <option key={product.id} value={product.name}>
                  {product.name} — ${product.price}
                </option>
              ))}
              <option value="Other / not sure">Other / not sure</option>
            </Select>
            <FieldError
              id="stringChoice-error"
              message={errors.stringChoice?.message}
            />
          </div>
        </div>

        {/* Tension calibration — drag each stringbed to set the pounds. */}
        <div role="group" aria-labelledby="tension-legend">
          <div className="flex items-baseline justify-between">
            <span id="tension-legend" className="text-sm font-medium text-ink">
              Tension
            </span>
            <span className="text-xs text-muted">
              Most players string 48–58 lbs
            </span>
          </div>
          <div className="mt-3 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            <TensionSlider
              id="tensionMain"
              label="Mains"
              value={Number(mainTension.field.value)}
              onChange={setMain}
              onBlur={mainTension.field.onBlur}
              min={TENSION_MIN}
              max={TENSION_MAX}
              invalid={Boolean(errors.tensionMain)}
              describedById={errors.tensionMain ? "tension-error" : undefined}
            />
            <TensionSlider
              id="tensionCross"
              label="Crosses"
              value={Number(crossTension.field.value)}
              onChange={crossTension.field.onChange}
              onBlur={crossTension.field.onBlur}
              min={TENSION_MIN}
              max={TENSION_MAX}
              disabled={lockCross}
              invalid={Boolean(errors.tensionCross)}
              describedById={errors.tensionCross ? "tension-error" : undefined}
            />
          </div>
          <button
            type="button"
            onClick={toggleLock}
            aria-pressed={lockCross}
            className="mt-3 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-court transition-colors hover:bg-line/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-court"
          >
            {lockCross ? (
              <Link2 aria-hidden="true" className="h-3.5 w-3.5" />
            ) : (
              <Link2Off aria-hidden="true" className="h-3.5 w-3.5" />
            )}
            {lockCross ? "Crosses matched to mains" : "Crosses set separately"}
          </button>
          <FieldError
            id="tension-error"
            message={
              errors.tensionMain?.message ?? errors.tensionCross?.message
            }
          />
        </div>

        <div>
          <Label htmlFor="notes">Notes (optional)</Label>
          <Textarea
            id="notes"
            rows={4}
            placeholder="Racquet model, string pattern, anything else we should know."
            className="mt-1.5"
            {...register("notes")}
          />
          <FieldError id="notes-error" message={errors.notes?.message} />
        </div>

        {status === "error" && serverError ? (
          <div
            role="alert"
            className="rounded-md border border-red-600/40 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {serverError}
          </div>
        ) : null}

        <Button
          type="submit"
          size="lg"
          variant="gold"
          disabled={status === "submitting"}
          className="w-full sm:w-auto"
        >
          {status === "submitting"
            ? "Sending…"
            : status === "error"
              ? "Try again"
              : "Request my booking"}
        </Button>
      </form>

      {/* Checkout-style rail: live summary + reassurance. Fills the wide
          desktop layout; collapses on narrow screens where the form stands
          alone. */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 space-y-4">
          <div className="rounded-lg border border-line bg-paper/70 p-5">
            <h2 className="text-lg text-ink">Your restring</h2>
            <dl className="mt-3">
              <SummaryRow label="Service" value={summary.service} />
              <SummaryRow label="String" value={summary.string} />
              <SummaryRow label="Tension" value={summary.tension} />
              <SummaryRow label="Preferred date" value={summary.date} />
            </dl>
          </div>

          <div className="rounded-lg bg-ink p-5 text-paper">
            <p className="font-medium">Strung by a tour professional</p>
            <p className="mt-1.5 text-sm text-paper/70">
              35 years on tour · 20 Grand Slams · 3 Olympic Games. Every
              restring is calibrated by hand.
            </p>
            <div className="mt-4 space-y-1 border-t border-paper/15 pt-4 text-sm text-paper/80">
              <p>Standard turnaround 24-48 hours.</p>
              <p>
                Questions?{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="underline decoration-gold underline-offset-2 hover:text-paper"
                >
                  Email us
                </a>{" "}
                or call {siteConfig.phone}.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
