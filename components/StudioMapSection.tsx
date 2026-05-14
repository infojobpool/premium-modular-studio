"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

function mapEmbedSrc(mapQuery: string): string {
  const q = encodeURIComponent(`${mapQuery} India`);
  return `https://maps.google.com/maps?q=${q}&output=embed`;
}

export function StudioMapSection() {
  const { location } = useStudioLocation();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "120px" });
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${location.mapQuery} India`,
  )}`;

  return (
    <section
      id="visit"
      className={`scroll-mt-32 border-t border-ink/8 bg-panel/20 py-24 ${PAGE_GUTTER_X}`}
    >
      <div className={`mx-auto grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start ${CONTENT_MAX}`}>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-strong">
            Visit · {location.label}
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            Studio & hours
          </h2>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-muted">
            {location.regionLine}
          </p>
          <p className="mt-6 text-lg font-medium text-ink">{location.hoursSummary}</p>
          <div className="mt-6 space-y-1 text-muted">
            {location.addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <p className="mt-8">
            <a
              href={mapsLink}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-strong underline-offset-4 hover:underline"
            >
              Open in Google Maps
            </a>
          </p>
        </Reveal>

        <div ref={wrapRef} className="relative min-h-[280px] overflow-hidden rounded-3xl border border-ink/10 bg-panel shadow-inner sm:min-h-[360px] lg:min-h-[420px]">
          {!inView ? (
            <div className="absolute inset-0 flex items-center justify-center bg-panel/80 text-sm text-muted">
              Map loads as you scroll…
            </div>
          ) : null}
          {inView ? (
            <>
              {!iframeLoaded ? (
                <div className="absolute inset-0 z-[1] flex items-center justify-center bg-panel/60 text-sm text-muted backdrop-blur-[2px]">
                  Loading map…
                </div>
              ) : null}
              <motion.iframe
                title={`Map — ${location.label} studio`}
                className="absolute inset-0 h-full w-full border-0 grayscale-[20%] contrast-[1.02]"
                src={mapEmbedSrc(location.mapQuery)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                initial={{ opacity: 0 }}
                animate={{ opacity: iframeLoaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                onLoad={() => setIframeLoaded(true)}
              />
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
