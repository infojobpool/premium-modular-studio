/**
 * JSX for `next/og` ImageResponse — inline styles only (Satori subset).
 * Used by `app/opengraph-image.tsx`, `app/twitter-image.tsx`, and city OG routes.
 */
export type OgShareLayoutProps = {
  logoSrc: string;
  heroSrc: string;
  /** e.g. "Hyderabad · Bhubaneswar" or "Hyderabad studio" */
  locationLine: string;
  headline?: string;
  subline?: string;
  cta?: string;
  domain?: string;
};

export function OgShareLayout({
  logoSrc,
  heroSrc,
  locationLine,
  headline = "Premium & luxury interiors",
  subline = "Design to delivery for homes & workspaces — curated materials, modular craft, and studio-led execution.",
  cta = "Book a private studio consultation",
  domain = "viviin2rio.com",
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroSrc}
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
          padding: "52px 56px 48px",
          backgroundImage: "linear-gradient(155deg, #1b3f2e 0%, #163528 52%, #0f2d20 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 56,
            right: 56,
            height: 3,
            backgroundImage: "linear-gradient(90deg, transparent 0%, #d9a229 18%, #e4b84a 50%, #d9a229 82%, transparent 100%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt=""
            width={168}
            height={168}
            style={{
              width: 168,
              height: 168,
              objectFit: "contain",
              objectPosition: "left top",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 8,
              paddingTop: 8,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#d9a229",
                fontFamily: "DM Sans",
              }}
            >
              Vivid In2erio
            </span>
            <span
              style={{
                fontSize: 19,
                fontWeight: 600,
                color: "#eae1c8",
                fontFamily: "DM Sans",
                letterSpacing: "0.04em",
              }}
            >
              {locationLine}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 620 }}>
          <div
            style={{
              fontSize: 68,
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
              fontSize: 26,
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
            <div style={{ width: 12, height: 12, borderRadius: 999, border: "2px solid rgba(217,162,41,0.65)" }} />
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
                fontSize: 21,
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
                letterSpacing: "0.08em",
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
