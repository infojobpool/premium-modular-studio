"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { trackEvent } from "@/lib/analytics";
import { vividImages } from "@/lib/vivid-reference";
import { useStudioLocation } from "./LocationProvider";

const STORAGE_PREFIX = "vivid-offer-modal-dismissed";
const OPEN_EVENT = "vivid:open-offer-modal";
const PROPERTY_TYPES = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK / Duplex"] as const;
type PropertyType = (typeof PROPERTY_TYPES)[number];
type OfferFormState = {
  propertyType: PropertyType;
  propertyLocation: string;
  name: string;
  phone: string;
  whatsappOptIn: boolean;
};

function keyFor(city: string) {
  return `${STORAGE_PREFIX}:${city}`;
}

export function OfferLeadModal() {
  const titleId = useId();
  const { location } = useStudioLocation();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<OfferFormState>({
    propertyType: PROPERTY_TYPES[2],
    propertyLocation: location.label,
    name: "",
    phone: "",
    whatsappOptIn: true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setForm((prev) => ({ ...prev, propertyLocation: location.label }));
  }, [location.label]);

  useEffect(() => {
    if (!mounted) return;
    try {
      if (!sessionStorage.getItem(keyFor(location.id))) {
        const t = window.setTimeout(() => setOpen(true), 1300);
        return () => window.clearTimeout(t);
      }
    } catch {
      const t = window.setTimeout(() => setOpen(true), 1300);
      return () => window.clearTimeout(t);
    }
  }, [location.id, mounted]);

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(keyFor(location.id), "1");
    } catch {
      // ignore
    }
    setOpen(false);
  }, [location.id]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, dismiss]);

  useEffect(() => {
    const openFromTrigger = () => {
      setError(null);
      setDone(null);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, openFromTrigger);
    return () => window.removeEventListener(OPEN_EVENT, openFromTrigger);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setDone(null);
    const phone = form.phone.replace(/\D/g, "");
    if (form.name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (phone.length < 10) {
      setError("Please enter a valid mobile number.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/offer-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: location.id,
          propertyType: form.propertyType,
          propertyLocation: form.propertyLocation.trim(),
          name: form.name.trim(),
          phone: form.phone.trim(),
          whatsappOptIn: form.whatsappOptIn,
          company: "",
        }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) {
        setError(data?.error ?? "Could not submit right now. Please try again.");
        return;
      }
      trackEvent("offer_lead_submitted", { city: location.id, propertyType: form.propertyType });
      setDone("Thanks! Our team will call you shortly.");
      window.setTimeout(() => dismiss(), 1100);
    } catch {
      setError("Network issue. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const modal = (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[210] flex items-center justify-center p-3 sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/55 backdrop-blur-[3px]"
            onClick={dismiss}
            aria-label="Close"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="relative z-10 w-full max-w-[1040px] overflow-hidden rounded-[1.15rem] border border-ink/14 bg-gradient-to-br from-canvas via-[#f3ecda] to-panel shadow-[0_40px_90px_-28px_color-mix(in_oklab,var(--color-ink)_42%,transparent)] ring-1 ring-white/40"
          >
            <button
              type="button"
              onClick={dismiss}
              className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-ink/8 text-2xl font-light text-muted transition hover:bg-ink/12 hover:text-ink"
              aria-label="Close"
            >
              ×
            </button>

            <div className="grid max-h-[88vh] overflow-y-auto md:max-h-none md:overflow-visible md:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[260px] bg-ink md:min-h-[580px]">
                <Image src={vividImages.hero} alt="Offer visual" fill className="object-cover opacity-90" sizes="(max-width: 768px) 100vw, 40vw" />
                <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/12 to-ink/78" />

                <div className="absolute inset-x-6 bottom-5 rounded-2xl border border-white/35 bg-canvas/95 p-4 text-ink shadow-[0_20px_50px_-20px_rgba(27,63,46,0.35)] ring-1 ring-ink/8 backdrop-blur-[2px]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                    aMAYzing home deals
                  </p>
                  <p className="mt-1 font-display text-[2.25rem] leading-none text-ink">Flat 25% OFF</p>
                  <p className="mt-1 text-sm text-muted">On modular interiors</p>
                  <p className="mt-2 text-xs font-medium text-muted">Hurry, book before 31st May</p>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] font-semibold text-muted">
                    <span className="rounded-lg border border-ink/10 bg-panel/90 px-2 py-1 text-center text-ink/90">
                      Personalised designs
                    </span>
                    <span className="rounded-lg border border-ink/10 bg-panel/90 px-2 py-1 text-center text-ink/90">
                      Zero interest EMIs
                    </span>
                    <span className="rounded-lg border border-ink/10 bg-panel/90 px-2 py-1 text-center text-ink/90">
                      25-year warranty
                    </span>
                  </div>
                </div>
              </div>

              <form
                onSubmit={onSubmit}
                className="border-t border-ink/10 bg-gradient-to-b from-canvas/90 via-canvas to-panel/70 px-4 py-5 sm:border-t-0 sm:border-l sm:border-ink/10 sm:px-8 sm:py-8"
              >
                <h2
                  id={titleId}
                  className="pr-10 font-display text-[2.05rem] font-medium leading-[1.08] tracking-tight text-ink sm:text-[2.7rem] sm:leading-[1.05]"
                >
                  Get a <span className="font-semibold text-ink">free design consultation</span>
                </h2>

                <p className="mt-6 text-sm font-medium text-muted">Property type</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {PROPERTY_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, propertyType: type }))}
                      className={
                        form.propertyType === type
                          ? "rounded-lg border border-accent/55 bg-accent/15 px-3 py-2 text-sm font-semibold text-ink shadow-sm ring-1 ring-accent/20"
                          : "rounded-lg border border-ink/12 bg-white/50 px-3 py-2 text-sm text-muted shadow-sm backdrop-blur-sm transition hover:border-ink/20 hover:bg-white/70"
                      }
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <label className="mt-4 block text-sm font-medium text-muted">
                  Property location
                  <select
                    value={form.propertyLocation}
                    onChange={(e) => setForm((prev) => ({ ...prev, propertyLocation: e.target.value }))}
                    className="mt-1.5 h-12 w-full rounded-xl border border-ink/15 bg-white/75 px-3 py-2.5 text-ink shadow-inner shadow-ink/[0.04] outline-none ring-accent/0 transition focus:border-accent/45 focus:ring-2 focus:ring-accent/25"
                  >
                    <option value="">Select location</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Bhubaneswar">Bhubaneswar</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                <label className="mt-3 block text-sm font-medium text-muted">
                  Name
                  <input
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="mt-1.5 h-12 w-full rounded-xl border border-ink/15 bg-white/75 px-3 py-2.5 text-ink placeholder:text-muted/55 shadow-inner shadow-ink/[0.04] outline-none transition focus:border-accent/45 focus:ring-2 focus:ring-accent/25"
                    placeholder="Your name"
                  />
                </label>

                <label className="mt-3 block text-sm font-medium text-muted">
                  Mobile number
                  <input
                    value={form.phone}
                    onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                    className="mt-1.5 h-12 w-full rounded-xl border border-ink/15 bg-white/75 px-3 py-2.5 text-ink placeholder:text-muted/55 shadow-inner shadow-ink/[0.04] outline-none transition focus:border-accent/45 focus:ring-2 focus:ring-accent/25"
                    placeholder="+91 9XXXXXXXXX"
                  />
                </label>

                <label className="mt-3 inline-flex cursor-pointer items-center gap-2.5 text-sm font-medium text-ink/90">
                  <input
                    type="checkbox"
                    checked={form.whatsappOptIn}
                    onChange={(e) => setForm((prev) => ({ ...prev, whatsappOptIn: e.target.checked }))}
                    className="h-[1.05rem] w-[1.05rem] rounded border-2 border-ink/25 bg-canvas text-ink accent-accent checked:border-accent checked:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  />
                  Yes, send me updates via WhatsApp.
                </label>

                {error ? <p className="mt-2 text-sm text-rose-800">{error}</p> : null}
                {done ? <p className="mt-2 text-sm text-emerald-800">{done}</p> : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-xl bg-ink px-4 py-3 text-base font-semibold text-canvas shadow-[0_14px_36px_-12px_color-mix(in_oklab,var(--color-ink)_55%,transparent)] transition hover:bg-ink/92 hover:shadow-[0_18px_40px_-10px_color-mix(in_oklab,var(--color-accent)_35%,var(--color-ink))] disabled:opacity-70 sm:px-5"
                >
                  <span className="text-[0.95rem] sm:text-lg sm:font-semibold">
                    {submitting ? "Submitting..." : "Book a Free Consultation"}
                  </span>
                </button>

                <p className="mt-3 text-center text-xs text-muted">
                  By submitting, you consent to our privacy policy and terms of use.
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(modal, document.body);
}
