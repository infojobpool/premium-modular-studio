"use client";

import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { buildContactMailto } from "@/lib/contact-mailto";
import { getCalendlyUrl } from "@/lib/calendly";
import { STUDIO_EMAIL, STUDIO_EMAIL_HREF, getStudioWhatsAppHref } from "@/lib/locations";
import { vividCopy } from "@/lib/vivid-reference";
import { LocationSwitcher } from "./LocationSwitcher";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

type SubmitState = "idle" | "sending" | "sent" | "error";

export function CTA() {
  const { location } = useStudioLocation();
  const calendlyUrl = getCalendlyUrl();
  const whatsappHref = `${getStudioWhatsAppHref(location.id)}?text=${encodeURIComponent(
    `Hello Vivid In2erio — I'd like to discuss a project (${location.label} studio page).`,
  )}`;

  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorText, setErrorText] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const company = String(fd.get("company") ?? "");
    if (company.trim() !== "") {
      return;
    }

    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const companyField = String(fd.get("company") ?? "");

    setErrorText("");
    setSubmitState("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          studio: location.id,
          company: companyField,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        delivered?: boolean;
        fallback?: string;
      };

      if (!res.ok || !data.ok) {
        setSubmitState("error");
        setErrorText(data.error ?? "Something went wrong. Try WhatsApp or email.");
        return;
      }

      if (data.delivered) {
        form.reset();
        setSubmitState("sent");
        return;
      }

      if (data.fallback === "mailto") {
        window.location.href = buildContactMailto({
          studio: location.label,
          name,
          email,
          message,
        });
        return;
      }

      form.reset();
      setSubmitState("sent");
    } catch {
      setSubmitState("error");
      setErrorText("Network error. Check your connection or use email / WhatsApp.");
    }
  }

  return (
    <section id="contact" className={`scroll-mt-32 py-28 ${PAGE_GUTTER_X}`}>
      <Reveal className={`mx-auto ${CONTENT_MAX}`}>
        <div className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-ink px-8 py-16 text-canvas sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-accent-soft/20 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="inline-flex rounded-full border border-accent/50 bg-accent/20 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.28em] text-canvas shadow-sm">
                Contact us
              </p>
              <h1 className="mt-5 max-w-[22ch] font-display text-4xl leading-[1.08] text-canvas sm:text-5xl md:text-[3.15rem] md:leading-[1.06] [text-shadow:0_0_40px_rgba(228,184,74,0.35),0_2px_0_rgba(27,63,46,0.2)]">
                {vividCopy.ctaTitle}
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-canvas/80">
                {vividCopy.ctaBody}
              </p>
              <h3 className="mt-8 font-display text-2xl text-canvas">Visit us in {location.label}</h3>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-canvas/50">
                Switch studio
              </p>
              <div className="mt-3">
                <LocationSwitcher layoutGroup="cta" />
              </div>
              <p className="mt-6 max-w-lg text-canvas/75">
                Share timelines, inspiration, and site details—the {location.label} team will
                respond with a tailored consultation path within two business days.
              </p>
              <div className="mt-8 space-y-1 text-sm text-canvas/80">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-canvas/45">
                  {location.regionLine}
                </p>
                {location.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <p className="mt-6 text-sm">
                <a
                  href={STUDIO_EMAIL_HREF}
                  className="font-medium text-accent-soft underline-offset-4 hover:underline"
                >
                  {STUDIO_EMAIL}
                </a>
                <span className="mx-2 text-canvas/35">·</span>
                <a
                  href={location.phoneHref}
                  className="font-medium text-canvas hover:text-accent-soft"
                >
                  {location.phoneDisplay}
                </a>
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-canvas/25 bg-canvas/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-canvas transition hover:border-accent/50 hover:bg-canvas/15"
                >
                  WhatsApp
                </a>
                {calendlyUrl ? (
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-accent/40 bg-accent/15 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-canvas transition hover:bg-accent/25"
                  >
                    Book your consultation
                  </a>
                ) : null}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${location.mapQuery} India`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-canvas/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-canvas/90 transition hover:border-canvas/40"
                >
                  Maps
                </a>
              </div>
            </div>

            <motion.form
              className="grid gap-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="sr-only"
                aria-hidden
              />

              <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-canvas/60">
                Name
                <input
                  name="name"
                  required
                  minLength={2}
                  maxLength={120}
                  disabled={submitState === "sending"}
                  className="rounded-xl border border-canvas/15 bg-canvas/5 px-4 py-3 text-sm font-normal tracking-normal text-canvas placeholder:text-canvas/35 outline-none ring-accent/40 transition focus:border-accent/50 focus:ring-2 disabled:opacity-50"
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-canvas/60">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  maxLength={254}
                  disabled={submitState === "sending"}
                  className="rounded-xl border border-canvas/15 bg-canvas/5 px-4 py-3 text-sm font-normal tracking-normal text-canvas placeholder:text-canvas/35 outline-none ring-accent/40 transition focus:border-accent/50 focus:ring-2 disabled:opacity-50"
                  placeholder="you@email.com"
                />
              </label>
              <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-canvas/60">
                Project notes
                <textarea
                  name="message"
                  rows={3}
                  maxLength={8000}
                  disabled={submitState === "sending"}
                  className="resize-none rounded-xl border border-canvas/15 bg-canvas/5 px-4 py-3 text-sm font-normal tracking-normal text-canvas placeholder:text-canvas/35 outline-none ring-accent/40 transition focus:border-accent/50 focus:ring-2 disabled:opacity-50"
                  placeholder="Scope, timeline, site address…"
                />
              </label>
              <motion.button
                type="submit"
                disabled={submitState === "sending"}
                whileHover={submitState === "sending" ? undefined : { scale: 1.02 }}
                whileTap={submitState === "sending" ? undefined : { scale: 0.98 }}
                className="mt-2 inline-flex justify-center rounded-full bg-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-canvas disabled:opacity-60"
              >
                {submitState === "sending"
                  ? "Sending…"
                  : `Schedule a private design consultation · ${location.label}`}
              </motion.button>

              {submitState === "sent" ? (
                <p className="text-sm text-accent-soft">
                  Thank you — the {location.label} team will follow up within two business days.
                </p>
              ) : null}
              {submitState === "error" ? (
                <p className="text-sm text-red-300/90">{errorText}</p>
              ) : null}

              <p className="text-[11px] text-canvas/45">
                Add <code className="text-canvas/55">RESEND_API_KEY</code>,{" "}
                <code className="text-canvas/55">RESEND_FROM</code>, and{" "}
                <code className="text-canvas/55">CONTACT_EMAIL_TO</code> in{" "}
                <code className="text-canvas/55">.env</code> to deliver silently; otherwise we open
                your mail client (see <code className="text-canvas/55">.env.example</code>).
              </p>
            </motion.form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
