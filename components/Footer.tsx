"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import {
  STUDIO_LOCATIONS,
  STUDIO_EMAIL,
  STUDIO_EMAIL_HREF,
  STUDIO_SOCIAL,
  getStudioWhatsAppHref,
} from "@/lib/locations";
import { withBrandHighlight } from "./BrandInline";
import { VividLogo } from "./VividLogo";
import { useStudioLocation } from "./LocationProvider";

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path
        d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const socialItems = [
  { key: "instagram", label: "Instagram", href: STUDIO_SOCIAL.instagram, Icon: IconInstagram },
  { key: "facebook", label: "Facebook", href: STUDIO_SOCIAL.facebook, Icon: IconFacebook },
  { key: "linkedin", label: "LinkedIn", href: STUDIO_SOCIAL.linkedIn, Icon: IconLinkedIn },
] as const;

const CITY_HOME = /^\/(hyderabad|bhubaneswar)$/;
const CITY_ROUTE = /^\/(hyderabad|bhubaneswar)(\/|$)/;

export function Footer() {
  const pathname = usePathname();
  const isCityHome = CITY_HOME.test(pathname);
  const isCityRoute = CITY_ROUTE.test(pathname);
  const { location } = useStudioLocation();
  const peerCity = location.id === "hyderabad" ? STUDIO_LOCATIONS.bhubaneswar : STUDIO_LOCATIONS.hyderabad;
  const whatsappHref = `${getStudioWhatsAppHref(location.id)}?text=${encodeURIComponent(
    `Hello — enquiry from ${location.label} studio page.`,
  )}`;
  const premiumLinkClass =
    "group inline-flex items-center gap-1 text-[0.98rem] text-ink/88 transition-all duration-300 hover:-translate-y-0.5 hover:text-ink";
  const premiumLinkUnderlineClass =
    "relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 group-hover:after:scale-x-100";

  return (
    <footer className={`scroll-mt-24 border-t border-ink/10 bg-gradient-to-b from-canvas via-canvas to-panel/40 pt-10 sm:pt-12 ${PAGE_GUTTER_X}`}>
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <div className="group relative overflow-hidden rounded-[2rem] border border-ink/12 bg-gradient-to-br from-canvas/98 via-canvas/90 to-panel/55 px-6 py-8 shadow-[0_28px_70px_-40px_rgba(27,63,46,0.5)] sm:px-10 sm:py-10">
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/75 to-transparent"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[120%] group-hover:opacity-100"
            aria-hidden
          />
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_1fr] lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
              <VividLogo size="footer" variant="brand" />
              <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-ink/85">
                Premium & luxury interiors led from our {location.label} studio, with parallel practice in{" "}
                {peerCity.label}. Complete design-to-delivery for elegant homes, refined workspaces, and
                high-end commercial environments.
              </p>

              <div className="mt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-strong">
                  Connect
                </p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {socialItems.map(({ key, label, href, Icon }) => (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/14 bg-canvas/85 text-ink shadow-[0_8px_22px_-14px_rgba(27,63,46,0.35)] transition-[transform,border-color,box-shadow,color] duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:text-ink hover:shadow-[0_14px_28px_-12px_rgba(27,63,46,0.38)]"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:gap-10"
            >
              <div className="rounded-2xl border border-ink/10 bg-canvas/50 p-5 max-sm:pr-14 sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-strong">Quick links</p>
                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-[0.98rem]">
                  <Link href={`/${location.id}/about`} className={premiumLinkClass}>
                    <span className={premiumLinkUnderlineClass}>About</span>
                  </Link>
                  <Link href={`/${location.id}/gallery`} className={premiumLinkClass}>
                    <span className={premiumLinkUnderlineClass}>Gallery</span>
                  </Link>
                  <Link href={`/${location.id}/projects`} className={premiumLinkClass}>
                    <span className={premiumLinkUnderlineClass}>Projects</span>
                  </Link>
                  <Link href={`/${location.id}/contact`} className={premiumLinkClass}>
                    <span className={premiumLinkUnderlineClass}>Book consultation</span>
                  </Link>
                  <Link href={`/${location.id}/blog`} className={premiumLinkClass}>
                    <span className={premiumLinkUnderlineClass}>Blog</span>
                  </Link>
                  <Link href={`/${location.id}/careers`} className={premiumLinkClass}>
                    <span className={premiumLinkUnderlineClass}>Careers</span>
                  </Link>
                </div>
              </div>

              <div className="space-y-6 rounded-2xl border border-ink/10 bg-gradient-to-b from-canvas/70 to-panel/35 p-5 max-sm:pr-16 sm:border-l-0 sm:p-6 lg:border-l lg:border-ink/10 lg:pl-8">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-strong">
                    {location.label} studio
                  </p>
                  <p className="mt-2 text-[0.98rem] leading-relaxed text-ink/84">
                    {location.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
                <div className="flex flex-col gap-2.5 border-t border-ink/10 pt-5 text-[0.98rem]">
                  <a href={STUDIO_EMAIL_HREF} className={premiumLinkClass}>
                    <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center text-accent-strong/85" aria-hidden>
                      ✉
                    </span>
                    <span className={premiumLinkUnderlineClass}>{STUDIO_EMAIL}</span>
                  </a>
                  <a href={location.phoneHref} className={premiumLinkClass}>
                    <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center text-accent-strong/85" aria-hidden>
                      ☎
                    </span>
                    <span className={premiumLinkUnderlineClass}>{location.phoneDisplay}</span>
                  </a>
                  <a href={whatsappHref} className={premiumLinkClass} target="_blank" rel="noreferrer">
                    <IconWhatsApp className="h-4 w-4 shrink-0 text-accent-strong/85" />
                    <span className={premiumLinkUnderlineClass}>WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <p
        className={`mx-auto mt-10 text-center text-[0.85rem] text-ink/72 ${CONTENT_MAX} ${
          isCityHome
            ? "pb-[calc(11rem+env(safe-area-inset-bottom))]"
            : isCityRoute
              ? "pb-[calc(7rem+env(safe-area-inset-bottom))]"
              : "pb-24 md:pb-16"
        }`}
      >
        © {new Date().getFullYear()}{" "}
        {withBrandHighlight("Vivid In2erio")}. Hyderabad & Bhubaneswar.{" "}
        <Link href="/privacy" className="group inline-flex text-ink/75 transition-colors duration-300 hover:text-ink">
          <span className={premiumLinkUnderlineClass}>Privacy</span>
        </Link>
      </p>
    </footer>
  );
}
