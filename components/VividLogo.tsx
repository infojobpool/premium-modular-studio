import Image from "next/image";

/** Official lockup asset (square PNG, includes mark + wordmark + tagline). */
const LOGO_SRC = "/vivid-in2erio-logo.png";
const LOGO_W = 1024;
const LOGO_H = 1024;

type VividLogoProps = {
  className?: string;
  /** Lockup beside the nav pill (not inside it). */
  size?: "header" | "home" | "footer" | "aside";
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
  const isAside = size === "aside";
  const brand = variant === "brand";
  const light = variant === "light";

  const imgClass = isFooter
    ? "h-[6.75rem] w-auto max-w-[min(100%,360px)] object-contain object-left sm:h-[7.5rem] sm:max-w-[380px]"
    : isAside
      ? "h-[5.75rem] w-auto max-w-[min(100%,380px)] object-contain object-left sm:h-[6.375rem] sm:max-w-[430px] lg:h-[6.875rem] lg:max-w-[460px]"
    : isHome
      ? "h-[5.75rem] w-auto max-w-[min(100%,340px)] object-contain object-left sm:h-[6.25rem] sm:max-w-[380px]"
      : "h-[3.875rem] w-auto max-w-[272px] object-contain object-left sm:h-[4.375rem] sm:max-w-[300px]";

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
              ? "(max-width: 640px) 360px, 380px"
              : isAside
                ? "(max-width: 640px) 380px, 460px"
              : isHome
                ? "(max-width: 640px) 340px, 380px"
                : "(max-width: 640px) 272px, 300px"
          }
          priority={size === "header" || size === "home" || size === "aside"}
        />
      </span>
    </span>
  );
}
