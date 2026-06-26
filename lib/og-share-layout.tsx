import { BRAND_LOGO_HEIGHT, BRAND_LOGO_WIDTH } from "@/lib/brand-logo";
import { SITE_DOMAIN } from "@/lib/site-url";
import type { OgImageSrc } from "@/lib/og-image-assets";

/**
 * JSX for `next/og` ImageResponse — inline styles only (Satori subset).
 * Used by `app/opengraph-image.tsx`, `app/twitter-image.tsx`, and city OG routes.
 */
export type OgShareLayoutProps = {
  heroSrc: OgImageSrc;
  logoSrc: OgImageSrc;
  /** e.g. "Hyderabad · Bhubaneswar" or "Hyderabad studio" */
  locationLine: string;
  headline?: string;
  subline?: string;
  cta?: string;
  domain?: string;
};

export function OgShareLayout({
  heroSrc,
  logoSrc,
  locationLine,
  headline = "Premium & luxury interiors",
  subline = "Design to delivery for homes & workspaces — curated materials, modular craft, and studio-led execution.",
  cta = "Book a private studio consultation",
  domain = SITE_DOMAIN,
}: OgShareLayoutProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: "#1B3322",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "56%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "44px 48px 40px",
          backgroundImage: "linear-gradient(155deg, #1B3322 0%, #152a1c 55%, #0f2116 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 48,
            right: 48,
            height: 4,
            backgroundImage:
              "linear-gradient(90deg, transparent 0%, #D4A017 18%, #e4b84a 50%, #D4A017 82%, transparent 100%)",
          }}
        />

        {/* Satori accepts ArrayBuffer for img src; React types do not. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc as unknown as string}
          width={BRAND_LOGO_WIDTH}
          height={BRAND_LOGO_HEIGHT}
          alt=""
          style={{
            height: 236,
            width: 236,
            objectFit: "contain",
            objectPosition: "left top",
            flexShrink: 0,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 580 }}>
          <div
            style={{
              fontSize: 58,
              fontWeight: 600,
              lineHeight: 1.04,
              color: "#E6DDC4",
              fontFamily: "Cormorant Garamond",
              letterSpacing: "-0.025em",
            }}
          >
            {headline}
          </div>
          <div
            style={{
              fontSize: 22,
              lineHeight: 1.42,
              color: "rgba(230,221,196,0.88)",
              fontFamily: "DM Sans",
              fontWeight: 500,
            }}
          >
            {subline}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 56, height: 3, backgroundColor: "#D4A017", borderRadius: 2 }} />
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#D4A017",
                fontFamily: "DM Sans",
              }}
            >
              {locationLine}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 20,
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#E6DDC4",
                fontFamily: "DM Sans",
              }}
            >
              {cta}
            </span>
            <span
              style={{
                fontSize: 17,
                fontWeight: 600,
                color: "#D4A017",
                fontFamily: "DM Sans",
                letterSpacing: "0.05em",
              }}
            >
              {domain}
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "relative",
          width: "44%",
          height: "100%",
          display: "flex",
          borderLeft: "4px solid rgba(212,160,23,0.45)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroSrc as unknown as string}
          alt=""
          width={528}
          height={630}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "68% center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(270deg, rgba(27,51,34,0.08) 0%, rgba(27,51,34,0.35) 100%)",
          }}
        />
      </div>
    </div>
  );
}
