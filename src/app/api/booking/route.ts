import { NextResponse } from "next/server";
import { Resend } from "resend";

import { siteConfig } from "@/content/site";
import { env } from "@/lib/env";
import { bookingSchema } from "@/lib/validations/booking";

/** Hard cap on how long we wait for Resend before giving up, so a slow or
 * unreachable email provider can never hang the request indefinitely. */
const EMAIL_TIMEOUT_MS = 8000;

const SERVICE_LABELS: Record<string, string> = {
  standard: "Standard Restring (24-48h)",
  express: "Express Same-Day",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("Email request timed out")), ms),
    ),
  ]);
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  // Server-side validation mirrors the client — never trust the client alone.
  const parsed = bookingSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the form and try again.",
        issues: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot: a real user never fills this. Pretend success so a bot gets
  // no signal, but send nothing.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  if (!env.RESEND_API_KEY) {
    return NextResponse.json(
      {
        error:
          "Booking email is not configured yet. Please contact us directly.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(env.RESEND_API_KEY);
  const service = SERVICE_LABELS[data.serviceType] ?? data.serviceType;
  const notes = data.notes?.trim() ? data.notes.trim() : "—";

  const summaryRows: Array<[string, string]> = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone?.trim() ? data.phone : "—"],
    ["Preferred date", data.preferredDate],
    ["Service", service],
    ["String", data.stringChoice],
    [
      "Tension",
      `${data.tensionMain} / ${data.tensionCross} lbs (main / cross)`,
    ],
    ["Notes", notes],
  ];

  const summaryHtml = summaryRows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#5B6371">${label}</td>` +
        `<td style="padding:4px 0;color:#0F1B2B"><strong>${escapeHtml(value)}</strong></td></tr>`,
    )
    .join("");

  try {
    const [adminResult, customerResult] = await withTimeout(
      Promise.all([
        resend.emails.send({
          from: env.RESEND_FROM_EMAIL,
          to: siteConfig.email,
          replyTo: data.email,
          subject: `New restring booking — ${data.name}`,
          html: `<h2 style="font-family:sans-serif;color:#0F1B2B">New booking request</h2>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${summaryHtml}</table>`,
        }),
        resend.emails.send({
          from: env.RESEND_FROM_EMAIL,
          to: data.email,
          subject: `We've received your restring booking`,
          html: `<h2 style="font-family:sans-serif;color:#0F1B2B">Thanks, ${escapeHtml(data.name)}!</h2>
<p style="font-family:sans-serif;font-size:14px;color:#0F1B2B">We've received your restring request and will confirm your slot shortly. Here's what you sent:</p>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${summaryHtml}</table>
<p style="font-family:sans-serif;font-size:14px;color:#5B6371">Questions? Reply to this email or call ${siteConfig.phone}.</p>`,
        }),
      ]),
      EMAIL_TIMEOUT_MS,
    );

    if (adminResult.error || customerResult.error) {
      console.error(
        "Resend send error",
        adminResult.error,
        customerResult.error,
      );
      return NextResponse.json(
        { error: "We couldn't send your booking. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Booking email failed", error);
    return NextResponse.json(
      { error: "We couldn't send your booking. Please try again." },
      { status: 502 },
    );
  }
}
