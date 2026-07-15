"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { Reveal } from "@/components/Reveal";

type SubmitState = "idle" | "sending" | "done" | "error";

export function ReviewForm() {
  const searchParams = useSearchParams();
  const cityParam = searchParams.get("city");
  const initialCity =
    cityParam === "hyderabad" || cityParam === "bhubaneswar" ? cityParam : "";

  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorText, setErrorText] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const company = String(fd.get("company") ?? "");
    if (company.trim()) return;

    setSubmitState("sending");
    setErrorText("");

    const city = String(fd.get("city") ?? "").trim();

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quote: String(fd.get("quote") ?? ""),
          name: String(fd.get("name") ?? ""),
          role: String(fd.get("role") ?? ""),
          photo: String(fd.get("photo") ?? ""),
          city: city || undefined,
          company,
        }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setSubmitState("error");
        setErrorText(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitState("done");
      form.reset();
    } catch {
      setSubmitState("error");
      setErrorText("Network error. Please check your connection and try again.");
    }
  }

  if (submitState === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[1.75rem] border border-ink/10 bg-canvas p-8 text-center shadow-[0_24px_60px_-40px_rgba(27,63,46,0.35)] sm:p-12"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-strong">Thank you</p>
        <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">Your review is live</h2>
        <p className="mx-auto mt-4 max-w-md text-muted">
          It now appears in our Reviews &amp; feedback section on the studio home page. We appreciate you
          taking the time.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/hyderabad"
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas transition hover:bg-ink/90"
          >
            View Hyderabad studio
          </Link>
          <Link
            href="/review"
            className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-panel/40"
            onClick={() => setSubmitState("idle")}
          >
            Submit another
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.75rem] border border-ink/10 bg-canvas p-6 shadow-[0_24px_60px_-40px_rgba(27,63,46,0.35)] sm:p-10"
    >
      <div className="grid gap-6">
        <div>
          <label htmlFor="quote" className="text-sm font-semibold text-ink">
            Your review
          </label>
          <textarea
            id="quote"
            name="quote"
            required
            rows={5}
            minLength={20}
            maxLength={600}
            placeholder="Share how the design process felt and what you loved about the finished space…"
            className="mt-2 w-full resize-y rounded-2xl border border-ink/12 bg-panel/30 px-4 py-3 text-ink outline-none ring-accent/30 transition focus:border-accent/50 focus:ring-2"
          />
          <p className="mt-1 text-xs text-muted">20–600 characters · shown on our website</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="text-sm font-semibold text-ink">
              Your name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={80}
              autoComplete="name"
              placeholder="Priya Narayanan"
              className="mt-2 w-full rounded-2xl border border-ink/12 bg-panel/30 px-4 py-3 text-ink outline-none ring-accent/30 transition focus:border-accent/50 focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="role" className="text-sm font-semibold text-ink">
              Project line
            </label>
            <input
              id="role"
              name="role"
              type="text"
              required
              maxLength={120}
              placeholder="Homeowner · 3BHK — Jubilee Hills"
              className="mt-2 w-full rounded-2xl border border-ink/12 bg-panel/30 px-4 py-3 text-ink outline-none ring-accent/30 transition focus:border-accent/50 focus:ring-2"
            />
            <p className="mt-1 text-xs text-muted">Role · project type · area</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="city" className="text-sm font-semibold text-ink">
              Studio (optional)
            </label>
            <select
              id="city"
              name="city"
              defaultValue={initialCity}
              className="mt-2 w-full rounded-2xl border border-ink/12 bg-panel/30 px-4 py-3 text-ink outline-none ring-accent/30 transition focus:border-accent/50 focus:ring-2"
            >
              <option value="">Prefer not to say</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="bhubaneswar">Bhubaneswar</option>
            </select>
          </div>
          <div>
            <label htmlFor="photo" className="text-sm font-semibold text-ink">
              Photo link (optional)
            </label>
            <input
              id="photo"
              name="photo"
              type="url"
              inputMode="url"
              placeholder="https://…"
              className="mt-2 w-full rounded-2xl border border-ink/12 bg-panel/30 px-4 py-3 text-ink outline-none ring-accent/30 transition focus:border-accent/50 focus:ring-2"
            />
            <p className="mt-1 text-xs text-muted">HTTPS link only · initials used if blank</p>
          </div>
        </div>
      </div>

      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
        aria-hidden
      />

      {submitState === "error" && errorText ? (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {errorText}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitState === "sending"}
        className="mt-8 w-full rounded-full bg-ink px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-canvas transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitState === "sending" ? "Publishing…" : "Publish my review"}
      </button>
    </form>
  );
}

export function ReviewPageContent({ shareUrl }: { shareUrl: string }) {
  return (
    <main className={`min-h-dvh mesh-hero py-28 ${PAGE_GUTTER_X}`}>
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-strong">
            Reviews &amp; feedback
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl tracking-tight text-ink sm:text-5xl md:text-6xl">
            Share your Vivid In2wrio experience
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Thank you for working with us. Your review goes live on our website as soon as you submit —
            no login needed.
          </p>
        </Reveal>

        <div className="mt-10 max-w-3xl">
          <ReviewForm />
        </div>

        <Reveal className="mt-12 max-w-2xl rounded-2xl border border-ink/10 bg-panel/40 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-strong">
            Link to share with clients
          </p>
          <p className="mt-3 break-all font-mono text-sm text-ink">{shareUrl}</p>
          <p className="mt-3 text-sm text-muted">
            Add{" "}
            <code className="rounded bg-canvas px-1.5 py-0.5 text-ink">?city=hyderabad</code> or{" "}
            <code className="rounded bg-canvas px-1.5 py-0.5 text-ink">?city=bhubaneswar</code> to
            pre-select the studio.
          </p>
        </Reveal>
      </div>
    </main>
  );
}
