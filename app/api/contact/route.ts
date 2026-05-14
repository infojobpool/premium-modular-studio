import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  studio?: unknown;
  /** Honeypot — must be empty */
  company?: unknown;
};

function isResendConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() &&
      process.env.RESEND_FROM?.trim() &&
      process.env.CONTACT_EMAIL_TO?.trim(),
  );
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const studioRaw = typeof body.studio === "string" ? body.studio.trim() : "";

  if (name.length < 2 || name.length > 120) {
    return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }
  if (message.length > 8000) {
    return NextResponse.json({ ok: false, error: "Message is too long." }, { status: 400 });
  }
  if (studioRaw !== "hyderabad" && studioRaw !== "bhubaneswar") {
    return NextResponse.json({ ok: false, error: "Invalid studio." }, { status: 400 });
  }

  const studio = studioRaw;

  if (!isResendConfigured()) {
    return NextResponse.json({
      ok: true,
      delivered: false,
      fallback: "mailto" as const,
    });
  }

  const to = process.env.CONTACT_EMAIL_TO!.trim();
  const from = process.env.RESEND_FROM!.trim();
  const key = process.env.RESEND_API_KEY!.trim();

  const text = [
    `Studio: ${studio}`,
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    message || "(no message body)",
    "",
    `— Sent from vivid site contact form`,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Interior enquiry · ${studio} · ${name}`,
      text,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    console.error("[contact] Resend error", res.status, errText);
    return NextResponse.json(
      { ok: false, error: "Could not send email. Try again or use WhatsApp." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true as const });
}
