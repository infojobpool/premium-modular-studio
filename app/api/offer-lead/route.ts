import { NextResponse } from "next/server";

type OfferLeadBody = {
  city?: unknown;
  propertyType?: unknown;
  propertyLocation?: unknown;
  name?: unknown;
  phone?: unknown;
  whatsappOptIn?: unknown;
  /** Honeypot field */
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
  let body: OfferLeadBody;
  try {
    body = (await request.json()) as OfferLeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const city = typeof body.city === "string" ? body.city.trim() : "";
  const propertyType = typeof body.propertyType === "string" ? body.propertyType.trim() : "";
  const propertyLocation = typeof body.propertyLocation === "string" ? body.propertyLocation.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const whatsappOptIn = Boolean(body.whatsappOptIn);

  if (city !== "hyderabad" && city !== "bhubaneswar") {
    return NextResponse.json({ ok: false, error: "Invalid studio." }, { status: 400 });
  }
  if (!propertyType) {
    return NextResponse.json({ ok: false, error: "Please choose property type." }, { status: 400 });
  }
  if (name.length < 2 || name.length > 120) {
    return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  }

  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
    return NextResponse.json({ ok: false, error: "Please enter a valid mobile number." }, { status: 400 });
  }

  if (!isResendConfigured()) {
    return NextResponse.json({ ok: true, delivered: false, fallback: "none" as const });
  }

  const to = process.env.CONTACT_EMAIL_TO!.trim();
  const from = process.env.RESEND_FROM!.trim();
  const key = process.env.RESEND_API_KEY!.trim();

  const text = [
    `Source: Offer popup`,
    `Studio: ${city}`,
    `Property type: ${propertyType}`,
    `Property location: ${propertyLocation || "(not provided)"}`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `WhatsApp opt-in: ${whatsappOptIn ? "Yes" : "No"}`,
    "",
    "— Sent from vivid site offer popup form",
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
      subject: `Offer lead · ${city} · ${name}`,
      text,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    console.error("[offer-lead] Resend error", res.status, errText);
    return NextResponse.json(
      { ok: false, error: "Could not submit right now. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true as const });
}
