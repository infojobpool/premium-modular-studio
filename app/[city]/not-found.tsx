import Link from "next/link";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";

export default function CityNotFound() {
  return (
    <div className={`studio-atmosphere min-h-dvh ${PAGE_GUTTER_X} py-28`}>
      <div className={`mx-auto ${CONTENT_MAX} text-center`}>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">404</p>
        <h1 className="mt-4 font-display text-3xl tracking-tight text-ink sm:text-4xl">
          This studio page isn’t here
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-muted">
          The link may be outdated, or the city segment didn’t match our Hyderabad and Bhubaneswar studios.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-full border border-ink/15 bg-panel px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent/40"
          >
            Choose a studio
          </Link>
          <Link
            href="/hyderabad"
            className="rounded-full border border-ink/15 bg-panel px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent/40"
          >
            Hyderabad
          </Link>
          <Link
            href="/bhubaneswar"
            className="rounded-full border border-ink/15 bg-panel px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent/40"
          >
            Bhubaneswar
          </Link>
        </div>
      </div>
    </div>
  );
}
