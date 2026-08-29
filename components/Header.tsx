"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PAGE_GUTTER_X } from "@/lib/interior-images";
import { FOCUS_RING } from "@/lib/ui-classes";
import { STUDIO_LOCATIONS } from "@/lib/locations";
import { LocationSwitcher } from "./LocationSwitcher";
import { MobileNavMenu } from "./MobileNavMenu";
import { VividLogo } from "./VividLogo";

const navItems = [
  { segment: "about", label: "About" },
  { segment: "gallery", label: "Gallery" },
  { segment: "projects", label: "Stories" },
  { segment: "blog", label: "Blog" },
  { segment: "careers", label: "Careers" },
  { segment: "faq", label: "FAQ" },
] as const;

export function Header() {
  const pathname = usePathname();
  const cityBase =
    pathname === "/hyderabad" || pathname.startsWith("/hyderabad/")
      ? "/hyderabad"
      : pathname === "/bhubaneswar" || pathname.startsWith("/bhubaneswar/")
        ? "/bhubaneswar"
        : "/hyderabad";

  const onCitySite =
    pathname === "/hyderabad" ||
    pathname.startsWith("/hyderabad/") ||
    pathname === "/bhubaneswar" ||
    pathname.startsWith("/bhubaneswar/");
  const logoHref = onCitySite ? cityBase : "/";
  const logoAria = onCitySite
    ? `Vivid In2erio — ${cityBase === "/hyderabad" ? "Hyderabad" : "Bhubaneswar"} studio home`
    : "Vivid In2erio — studio hub";

  const contactActive = pathname === `${cityBase}/contact`;

  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setSolid(y > 48);
    if (mobileMenuOpen) {
      setHidden(false);
      lastScrollY.current = y;
      return;
    }
    const docH = document.documentElement.scrollHeight;
    const viewH = window.innerHeight;
    const nearBottom = y + viewH >= docH - 120;
    const delta = y - lastScrollY.current;

    if (nearBottom) {
      setHidden(true);
    } else if (y < 72) {
      setHidden(false);
    } else if (delta > 10) {
      setHidden(true);
    } else if (delta < -10) {
      setHidden(false);
    }
    lastScrollY.current = y;
  });

  useEffect(() => {
    if (mobileMenuOpen) setHidden(false);
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  function isNavActive(segment: string): boolean {
    const href = `${cityBase}/${segment}`;
    if (segment === "projects") {
      return pathname === href || pathname.startsWith(`${cityBase}/projects/`);
    }
    return pathname === href;
  }

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: hidden ? "-110%" : 0, opacity: hidden ? 0 : 1 }}
      transition={{
        duration: hidden ? 0.28 : 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`fixed inset-x-0 top-0 z-40 pt-[max(0.5rem,env(safe-area-inset-top))] sm:pt-[max(0.75rem,env(safe-area-inset-top))] ${PAGE_GUTTER_X} ${
        hidden ? "pointer-events-none" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-[92rem] flex-col gap-2">
        <div className="flex min-w-0 flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
          <Link
            href={logoHref}
            className={`relative z-20 block shrink-0 self-start rounded-lg ${FOCUS_RING}`}
            aria-label={logoAria}
          >
            <VividLogo size="nav" />
          </Link>

          <div
            className={`relative isolate flex w-full min-w-0 flex-1 flex-nowrap items-center gap-2 overflow-hidden rounded-2xl border px-3 py-2 transition-[background,box-shadow,border-color] duration-500 sm:gap-3 sm:px-4 sm:py-2.5 lg:rounded-full lg:px-5 lg:py-2.5 xl:gap-4 xl:px-6 ${
              solid
                ? "border-ink/16 bg-canvas/90 shadow-[0_14px_48px_-18px_rgba(27,63,46,0.3)] backdrop-blur-xl"
                : "border-ink/10 bg-canvas/75 shadow-[0_10px_36px_-20px_rgba(27,63,46,0.2)] backdrop-blur-md"
            }`}
          >
            <span
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/55 to-transparent"
              aria-hidden
            />

            <div className="order-1 flex shrink-0 items-center">
              <LocationSwitcher compact wide layoutGroup="hdr" />
            </div>

            <span
              className="order-2 hidden h-5 w-px shrink-0 bg-ink/10 lg:block"
              aria-hidden
            />

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className={`order-3 ml-auto inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-ink transition duration-300 lg:hidden ${FOCUS_RING} ${
                mobileMenuOpen
                  ? "border-accent/45 bg-accent/15 shadow-sm"
                  : "border-ink/12 bg-canvas/60"
              }`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span className="relative block h-3.5 w-4">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-4 bg-current transition-transform duration-300 ${
                    mobileMenuOpen ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[6px] h-[1.5px] w-4 bg-current transition-opacity duration-200 ${
                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 top-3 h-[1.5px] w-4 bg-current transition-transform duration-300 ${
                    mobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>

            <nav
              aria-label="Main"
              className="order-4 hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex xl:gap-1.5"
            >
              {navItems.map((item) => {
                const href = `${cityBase}/${item.segment}`;
                const active = isNavActive(item.segment);
                return (
                  <Link
                    key={item.segment}
                    href={href}
                    className={`relative shrink-0 rounded-full px-3 py-1.5 text-[13px] font-medium tracking-[0.01em] transition-colors duration-300 xl:px-3.5 xl:text-sm ${FOCUS_RING} ${
                      active
                        ? "text-ink"
                        : "text-ink/65 hover:bg-ink/[0.04] hover:text-ink"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <span
                      className={`relative after:absolute after:inset-x-1 after:-bottom-0.5 after:h-px after:bg-accent after:transition-transform after:duration-300 ${
                        active
                          ? "after:scale-x-100"
                          : "after:origin-left after:scale-x-0 hover:after:scale-x-100"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <span
              className="order-5 hidden h-5 w-px shrink-0 bg-ink/10 lg:block"
              aria-hidden
            />

            <Link
              href={`${cityBase}/contact`}
              aria-current={contactActive ? "page" : undefined}
              className={`order-6 hidden shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-ink px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-canvas shadow-[0_10px_28px_-10px_rgba(27,63,46,0.55)] ring-1 ring-white/10 transition duration-300 hover:bg-ink/92 hover:shadow-[0_14px_32px_-10px_rgba(27,63,46,0.5)] lg:inline-flex xl:px-5 xl:py-2.5 xl:text-[11px] ${FOCUS_RING}`}
            >
              Book Free Consultation
            </Link>
          </div>
        </div>

        <MobileNavMenu
          open={mobileMenuOpen}
          cityBase={cityBase}
          cityLabel={STUDIO_LOCATIONS[cityBase === "/bhubaneswar" ? "bhubaneswar" : "hyderabad"].label}
          onClose={() => setMobileMenuOpen(false)}
          isNavActive={isNavActive}
        />
      </div>
    </motion.header>
  );
}
