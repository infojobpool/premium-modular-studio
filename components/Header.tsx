"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PAGE_GUTTER_X } from "@/lib/interior-images";
import { FOCUS_RING } from "@/lib/ui-classes";
import { LocationSwitcher } from "./LocationSwitcher";
import { VividLogo } from "./VividLogo";

const navItems = [
  { segment: "about", label: "About" },
  { segment: "gallery", label: "Gallery" },
  { segment: "projects", label: "Stories" },
  { segment: "services", label: "Services" },
  { segment: "process", label: "Process" },
  { segment: "blog", label: "Blog" },
  { segment: "careers", label: "Careers" },
  { segment: "faq", label: "FAQ" },
  { segment: "visit", label: "Visit" },
  { segment: "contact", label: "Contact" },
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
    const delta = y - lastScrollY.current;
    if (y < 72) {
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

  function openConsultationPopup() {
    window.dispatchEvent(new CustomEvent("vivid:open-offer-modal"));
  }

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: hidden ? "-110%" : 0, opacity: hidden ? 0 : 1 }}
      transition={{
        duration: hidden ? 0.28 : 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`fixed inset-x-0 top-0 z-40 pt-2 sm:pt-3 ${PAGE_GUTTER_X} ${
        hidden ? "pointer-events-none" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-[92rem] items-center gap-2.5 sm:gap-3 lg:gap-4">
        <Link
          href={logoHref}
          className={`relative z-10 shrink-0 rounded-lg ${FOCUS_RING}`}
          aria-label={logoAria}
        >
          <VividLogo size="aside" />
        </Link>

        <div
          className={`isolate flex min-w-0 flex-1 flex-nowrap items-center justify-between gap-2 border px-3 py-2 transition-[background,box-shadow,border-color,border-radius] duration-500 sm:gap-3 sm:px-5 sm:py-2.5 lg:gap-4 lg:px-7 lg:py-3 xl:gap-5 ${
            mobileMenuOpen ? "flex-wrap rounded-2xl" : "rounded-2xl lg:rounded-full"
          } ${
            solid
              ? "border-ink/18 bg-canvas/86 shadow-[0_12px_46px_-16px_rgba(27,63,46,0.28)] backdrop-blur-xl"
              : "border-ink/10 bg-canvas/70 shadow-[0_8px_34px_-18px_rgba(27,63,46,0.18)] backdrop-blur-md"
          }`}
        >
        <div className="order-1 flex shrink-0 items-center">
          <LocationSwitcher compact layoutGroup="hdr" />
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          className={`order-2 ml-auto inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-ink/15 bg-canvas/60 text-ink lg:hidden ${FOCUS_RING}`}
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

        <nav className="order-3 hidden min-w-0 flex-1 items-center justify-center gap-4 overflow-x-auto text-[13px] font-medium [-ms-overflow-style:none] [scrollbar-width:none] lg:flex lg:gap-5 xl:gap-7 xl:text-sm [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => {
            const href = `${cityBase}/${item.segment}`;
            const active = isNavActive(item.segment);
            const isContact = item.segment === "contact";
            return (
              <Link
                key={item.segment}
                href={href}
                className={`relative shrink-0 whitespace-nowrap rounded-md transition-colors ${FOCUS_RING} ${
                  isContact
                    ? "rounded-full border border-accent/45 bg-accent/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent-strong shadow-sm hover:border-accent/60 hover:bg-accent/22"
                    : active
                      ? "text-ink"
                      : "text-ink/80 hover:text-ink"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <span
                  className={
                    isContact
                      ? ""
                      : `relative after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-accent after:transition-transform after:duration-300 ${
                          active
                            ? "after:scale-x-100"
                            : "after:origin-left after:scale-x-0 hover:after:scale-x-100"
                        }`
                  }
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={openConsultationPopup}
          className={`order-4 hidden shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-ink px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-canvas shadow-[0_8px_20px_-10px_rgba(0,0,0,0.45)] transition hover:opacity-95 2xl:inline-flex 2xl:px-5 2xl:text-[11px] 2xl:tracking-[0.18em] ${FOCUS_RING}`}
        >
          Book Free Consultation
        </button>

        <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="order-5 relative z-10 mt-2 w-full rounded-xl border border-ink/12 bg-canvas p-3 shadow-[0_20px_48px_-28px_rgba(27,63,46,0.42)] ring-1 ring-ink/[0.06] backdrop-blur-md lg:hidden"
          >
            <div className="mb-3 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
              <LocationSwitcher compact wide layoutGroup="hdr-mobile" />
              <button
                type="button"
                onClick={openConsultationPopup}
                className={`inline-flex w-full shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-ink px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-canvas shadow-[0_8px_20px_-10px_rgba(0,0,0,0.45)] transition hover:opacity-95 sm:w-auto sm:px-3.5 sm:py-1.5 sm:text-[9px] sm:tracking-[0.16em] ${FOCUS_RING}`}
              >
                Book consultation
              </button>
            </div>

            <nav className="grid grid-cols-2 gap-x-3 gap-y-2.5 border-t border-ink/8 pt-3 text-[12px] font-semibold">
              {navItems.map((item) => {
                const href = `${cityBase}/${item.segment}`;
                const active = isNavActive(item.segment);
                const isContact = item.segment === "contact";
                return (
                  <Link
                    key={`mobile-${item.segment}`}
                    href={href}
                    className={`rounded-lg px-2 py-1.5 transition-colors ${FOCUS_RING} ${
                      isContact
                        ? "border border-accent/50 bg-accent/18 text-accent-strong shadow-sm hover:bg-accent/25"
                        : active
                          ? "bg-ink/8 text-ink"
                          : "text-ink/75 hover:bg-ink/5 hover:text-ink"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        ) : null}
        </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
