import { BRAND_LOGO_HEIGHT, BRAND_LOGO_WIDTH } from "@/lib/brand-logo";
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
  domain = "vividin2erio.com",
}: OgShareLayoutProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: "#0f2d20",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "54%",
          display: "flex",
        }}
      >
        {/* Satori accepts ArrayBuffer for img src; React types do not. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroSrc as unknown as string}
          alt=""
          width={648}
          height={630}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(105deg, rgba(15,45,32,0.94) 0%, rgba(15,45,32,0.55) 22%, rgba(15,45,32,0.08) 48%, rgba(15,45,32,0.22) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 140,
            backgroundImage: "linear-gradient(to right, #1b3f2e 0%, rgba(27,63,46,0) 100%)",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "58%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 52px 44px",
          backgroundImage: "linear-gradient(155deg, #1b3f2e 0%, #163528 52%, #0f2d20 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 52,
            right: 52,
            height: 3,
            backgroundImage:
              "linear-gradient(90deg, transparent 0%, #d9a229 18%, #e4b84a 50%, #d9a229 82%, transparent 100%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          {/* Satori accepts ArrayBuffer for img src; React types do not. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc as unknown as string}
            width={BRAND_LOGO_WIDTH}
            height={BRAND_LOGO_HEIGHT}
            alt=""
            style={{
              height: 96,
              width: 96,
              objectFit: "contain",
              borderRadius: 12,
              flexShrink: 0,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 6,
              paddingTop: 10,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#d9a229",
                fontFamily: "DM Sans",
              }}
            >
              Design studio
            </span>
            <span
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "#eae1c8",
                fontFamily: "DM Sans",
                letterSpacing: "0.04em",
                textAlign: "right",
              }}
            >
              {locationLine}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 620 }}>
          <div
            style={{
              fontSize: 66,
              fontWeight: 600,
              lineHeight: 1.02,
              color: "#f4ecd8",
              fontFamily: "Cormorant Garamond",
              letterSpacing: "-0.025em",
            }}
          >
            {headline}
          </div>
          <div
            style={{
              fontSize: 25,
              lineHeight: 1.38,
              color: "rgba(234,225,200,0.86)",
              fontFamily: "DM Sans",
              fontWeight: 500,
            }}
          >
            {subline}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 64, height: 3, backgroundColor: "#d9a229", borderRadius: 2 }} />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                border: "2px solid rgba(217,162,41,0.65)",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 24,
            }}
          >
            <span
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "#eae1c8",
                fontFamily: "DM Sans",
              }}
            >
              {cta}
            </span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#d9a229",
                fontFamily: "DM Sans",
                letterSpacing: "0.06em",
              }}
            >
              {domain}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
