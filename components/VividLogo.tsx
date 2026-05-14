import Image from "next/image";

/** Official lockup asset (square PNG, includes mark + wordmark + tagline). */
const LOGO_SRC = "/vivid-in2erio-logo.png";
const LOGO_W = 1024;
const LOGO_H = 1024;

type VividLogoProps = {
  className?: string;
  /** `home` — slightly larger lockup for city index / hub landing. */
  size?: "header" | "home" | "footer";
  /** Visual treatment around the asset (PNG already includes brand background). */
  variant?: "default" | "light" | "brand";
};

export function VividLogo({
  className = "",
  size = "header",
  variant = "default",
}: VividLogoProps) {
  const isFooter = size === "footer";
  const isHome = size === "home";
  const brand = variant === "brand";
  const light = variant === "light";

  const imgClass = isFooter
    ? "h-[5.85rem] w-auto max-w-[min(100%,320px)] object-contain object-left sm:h-[6.5rem] sm:max-w-[340px]"
    : isHome
      ? "h-[5.25rem] w-auto max-w-[min(100%,320px)] object-contain object-left sm:h-[5.75rem] sm:max-w-[360px]"
      : "h-14 w-auto max-w-[252px] object-contain object-left sm:h-16 sm:max-w-[276px]";

  return (
    <span
      className={`inline-flex shrink-0 items-center ${className}`.trim()}
    >
      <span
        className={`inline-block overflow-hidden rounded-lg ${
          brand ? "rounded-xl ring-1 ring-ink/12 shadow-sm" : ""
        } ${light ? "opacity-[0.98]" : ""}`}
      >
        <Image
          src={LOGO_SRC}
          alt="Vivid In2erio — premium interiors"
          width={LOGO_W}
          height={LOGO_H}
          className={imgClass}
          sizes={
            isFooter
              ? "(max-width: 640px) 280px, 320px"
              : isHome
                ? "(max-width: 640px) 320px, 360px"
                : "(max-width: 640px) 252px, 276px"
          }
          priority={size === "header" || size === "home"}
        />
      </span>
    </span>
  );
}
