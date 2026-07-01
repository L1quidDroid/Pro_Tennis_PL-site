"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { products } from "@/content/site";
import {
  bookingSchema,
  TENSION_MAX,
  TENSION_MIN,
  type BookingInput,
} from "@/lib/validations/booking";

type Status = "idle" | "submitting" | "success" | "error";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm text-red-600">
      {message}
    </p>
  );
}

export function BookingForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { serviceType: "standard" },
  });

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
        className="rounded-lg border border-line bg-paper/60 p-8 text-center"
      >
        <CheckCircle2
          aria-hidden="true"
          className="mx-auto h-10 w-10 text-court"
        />
        <h2 className="mt-4 font-display text-2xl font-semibold text-ink">
          Booking received
        </h2>
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
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

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            aria-invalid={invalid("name")}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="mt-1.5"
            {...register("name")}
          />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            aria-invalid={invalid("email")}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="mt-1.5"
            {...register("email")}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            aria-invalid={invalid("phone")}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className="mt-1.5"
            {...register("phone")}
          />
          <FieldError id="phone-error" message={errors.phone?.message} />
        </div>
        <div>
          <Label htmlFor="preferredDate">Preferred date</Label>
          <Input
            id="preferredDate"
            type="date"
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
        <div>
          <Label htmlFor="serviceType">Service type</Label>
          <Select
            id="serviceType"
            aria-invalid={invalid("serviceType")}
            aria-describedby={
              errors.serviceType ? "serviceType-error" : undefined
            }
            className="mt-1.5"
            {...register("serviceType")}
          >
            <option value="standard">Standard Restring (24-48h)</option>
            <option value="express">Express Same-Day</option>
          </Select>
          <FieldError
            id="serviceType-error"
            message={errors.serviceType?.message}
          />
        </div>
        <div>
          <Label htmlFor="stringChoice">String</Label>
          <Select
            id="stringChoice"
            defaultValue=""
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
        <div>
          <Label htmlFor="tensionMain">Main tension (lbs)</Label>
          <Input
            id="tensionMain"
            type="number"
            inputMode="numeric"
            min={TENSION_MIN}
            max={TENSION_MAX}
            aria-invalid={invalid("tensionMain")}
            aria-describedby={
              errors.tensionMain ? "tensionMain-error" : undefined
            }
            className="mt-1.5"
            {...register("tensionMain")}
          />
          <FieldError
            id="tensionMain-error"
            message={errors.tensionMain?.message}
          />
        </div>
        <div>
          <Label htmlFor="tensionCross">Cross tension (lbs)</Label>
          <Input
            id="tensionCross"
            type="number"
            inputMode="numeric"
            min={TENSION_MIN}
            max={TENSION_MAX}
            aria-invalid={invalid("tensionCross")}
            aria-describedby={
              errors.tensionCross ? "tensionCross-error" : undefined
            }
            className="mt-1.5"
            {...register("tensionCross")}
          />
          <FieldError
            id="tensionCross-error"
            message={errors.tensionCross?.message}
          />
        </div>
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
      >
        {status === "submitting"
          ? "Sending…"
          : status === "error"
            ? "Try again"
            : "Request booking"}
      </Button>
    </form>
  );
}
