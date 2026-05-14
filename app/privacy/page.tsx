import type { Metadata } from "next";
import Link from "next/link";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { STUDIO_EMAIL } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Vivid In2erio handles information you share through this marketing site and enquiry forms.",
};

export default function PrivacyPage() {
  return (
    <main className={`min-h-dvh mesh-hero py-28 ${PAGE_GUTTER_X}`}>
      <article className={`mx-auto max-w-2xl ${CONTENT_MAX}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-strong">Legal</p>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-ink">Privacy</h1>
        <p className="mt-6 text-muted">
          This page describes how we treat information collected through this website. It is a
          general notice for a marketing and enquiry experience—not a substitute for a full privacy
          policy your counsel may require if you operate forms that store personal data.
        </p>

        <h2 className="mt-12 font-display text-2xl text-ink">What we collect</h2>
        <p className="mt-4 text-muted">
          If you use the on-site enquiry demo, fields such as name, email, and project notes may be
          processed by whichever backend or email integration you connect. Until connected, those
          submissions are client-side only and are not stored by this template.
        </p>

        <h2 className="mt-10 font-display text-2xl text-ink">Maps & third parties</h2>
        <p className="mt-4 text-muted">
          Embedded maps (Google) and messaging links (WhatsApp) are provided by their respective
          providers under their own terms and cookies. Opening those services leaves this site.
        </p>

        <h2 className="mt-10 font-display text-2xl text-ink">Contact</h2>
        <p className="mt-4 text-muted">
          Questions about this notice:{" "}
          <a href={`mailto:${STUDIO_EMAIL}`} className="text-ink underline-offset-4 hover:underline">
            {STUDIO_EMAIL}
          </a>
          .
        </p>

        <p className="mt-16 text-sm text-muted">
          <Link href="/" className="text-ink underline-offset-4 hover:underline">
            ← Studio hub
          </Link>
        </p>
      </article>
    </main>
  );
}
