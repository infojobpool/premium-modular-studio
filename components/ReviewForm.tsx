"use client";

import { upload } from "@vercel/blob/client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/Reveal";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import {
  REVIEW_VIDEO_ACCEPT,
  REVIEW_VIDEO_MAX_BYTES,
  REVIEW_VIDEO_MAX_SECONDS,
} from "@/lib/reviews/constants";

type SubmitState = "idle" | "uploading" | "sending" | "done" | "error";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

async function readVideoDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(video.duration);
    };
    video.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Could not read video file."));
    };
    video.src = objectUrl;
  });
}

export function ReviewForm() {
  const searchParams = useSearchParams();
  const cityParam = searchParams.get("city");
  const initialCity =
    cityParam === "hyderabad" || cityParam === "bhubaneswar" ? cityParam : "";

  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorText, setErrorText] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedVideoName, setSelectedVideoName] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const company = String(fd.get("company") ?? "");
    if (company.trim()) return;

    setErrorText("");
    setUploadProgress(0);

    const city = String(fd.get("city") ?? "").trim();
    const name = String(fd.get("name") ?? "").trim();
    const videoInput = form.elements.namedItem("video") as HTMLInputElement | null;
    const videoFile = videoInput?.files?.[0];

    let videoUrl: string | undefined;

    try {
      if (videoFile && videoFile.size > 0) {
        if (videoFile.size > REVIEW_VIDEO_MAX_BYTES) {
          setSubmitState("error");
          setErrorText("Video is too large. Please use a clip under 25 MB.");
          return;
        }

        setSubmitState("uploading");
        const duration = await readVideoDuration(videoFile);
        if (duration > REVIEW_VIDEO_MAX_SECONDS) {
          setSubmitState("error");
          setErrorText(`Please use a clip under ${REVIEW_VIDEO_MAX_SECONDS} seconds.`);
          return;
        }

        const ext = videoFile.name.split(".").pop()?.toLowerCase() || "mp4";
        const pathname = `reviews/videos/${Date.now()}-${slugify(name || "client")}.${ext}`;

        const blob = await upload(pathname, videoFile, {
          access: "public",
          handleUploadUrl: "/api/reviews/upload",
          multipart: videoFile.size > 5 * 1024 * 1024,
          onUploadProgress: ({ percentage }) => setUploadProgress(Math.round(percentage)),
        });

        videoUrl = blob.url;
      }

      setSubmitState("sending");

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quote: String(fd.get("quote") ?? ""),
          name,
          role: String(fd.get("role") ?? ""),
          photo: String(fd.get("photo") ?? ""),
          videoUrl,
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
      setSelectedVideoName("");
      form.reset();
    } catch {
      setSubmitState("error");
      setErrorText("Upload failed. Please check your connection and try again.");
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

  const busy = submitState === "uploading" || submitState === "sending";

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

        <div>
          <label htmlFor="video" className="text-sm font-semibold text-ink">
            Short video clip (optional)
          </label>
          <input
            id="video"
            name="video"
            type="file"
            accept={REVIEW_VIDEO_ACCEPT}
            disabled={busy}
            onChange={(e) => setSelectedVideoName(e.target.files?.[0]?.name ?? "")}
            className="mt-2 block w-full cursor-pointer rounded-2xl border border-dashed border-ink/15 bg-panel/20 px-4 py-4 text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:font-semibold file:text-canvas hover:border-accent/35"
          />
          <p className="mt-1 text-xs text-muted">
            MP4, MOV, or WebM · up to {REVIEW_VIDEO_MAX_SECONDS} seconds · max 25 MB · shown on our website
          </p>
          {selectedVideoName ? (
            <p className="mt-2 text-sm text-ink">
              Selected: <span className="font-medium">{selectedVideoName}</span>
            </p>
          ) : null}
          {submitState === "uploading" ? (
            <div className="mt-3">
              <div className="h-2 overflow-hidden rounded-full bg-panel">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-muted">Uploading video… {uploadProgress}%</p>
            </div>
          ) : null}
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
        disabled={busy}
        className="mt-8 w-full rounded-full bg-ink px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-canvas transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitState === "uploading"
          ? `Uploading video… ${uploadProgress}%`
          : submitState === "sending"
            ? "Publishing…"
            : "Publish my review"}
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
            Thank you for working with us. Add a written review and, if you like, a short video clip of
            your space — it goes live on our website as soon as you submit.
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
