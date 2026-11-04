import Image from "next/image";
import { BRAND_LOGO_ALT, BRAND_LOGO_HEIGHT, BRAND_LOGO_SRC, BRAND_LOGO_WIDTH } from "@/lib/brand-logo";

type VividLogoProps = {
  className?: string;
  /** Square gold-edged lockup — same treatment on header, hub, footer, and modals. */
  size?: "header" | "home" | "footer" | "aside" | "nav";
  /** Visual treatment around the asset (PNG already includes brand background). */
  variant?: "default" | "light" | "brand";
  /** Gold ring on cream; off when the lockup sits in a forest well. */
  framed?: boolean;
};

export function VividLogo({
  className = "",
  size = "header",
  variant = "default",
  framed = true,
}: VividLogoProps) {
  const isFooter = size === "footer";
  const isHome = size === "home";
  const isAside = size === "aside";
  const isNav = size === "nav";
  const light = variant === "light";

  const imgClass = isFooter
    ? "h-[6.5rem] w-[6.5rem] object-contain sm:h-[7.25rem] sm:w-[7.25rem]"
    : isNav
      ? "h-[5.5rem] w-[5.5rem] object-contain sm:h-[6.1rem] sm:w-[6.1rem] lg:h-[6.5rem] lg:w-[6.5rem]"
    : isAside || isHome
      ? "h-[5.75rem] w-[5.75rem] object-contain sm:h-[6.5rem] sm:w-[6.5rem]"
      : "h-[4.25rem] w-[4.25rem] object-contain sm:h-[4.75rem] sm:w-[4.75rem]";

  return (
    <span
      className={`inline-flex shrink-0 items-center overflow-hidden bg-ink ${
        framed ? "rounded-2xl ring-1 ring-accent/60" : "rounded-none"
      } ${light ? "opacity-[0.98]" : ""} ${className}`.trim()}
    >
      <Image
        src={BRAND_LOGO_SRC}
        alt={BRAND_LOGO_ALT}
        width={BRAND_LOGO_WIDTH}
        height={BRAND_LOGO_HEIGHT}
        className={imgClass}
        sizes={isNav || isFooter || isHome || isAside ? "160px" : "96px"}
        priority={size === "header" || size === "home" || size === "aside" || size === "nav"}
      />
    </span>
  );
}
