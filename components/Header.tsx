"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PAGE_GUTTER_X } from "@/lib/interior-images";
import { LocationSwitcher } from "./LocationSwitcher";
import { VividLogo } from "./VividLogo";

const navItems = [
  { segment: "about", label: "About" },
  { segment: "gallery", label: "Gallery" },
  { segment: "projects", label: "Stories" },
  { segment: "services", label: "Services" },
  { segment: "process", label: "Process" },
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

  const isCityHome = pathname === "/hyderabad" || pathname === "/bhubaneswar";

  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setSolid(y > 48);
  });

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-40 pt-2 sm:pt-3 ${PAGE_GUTTER_X}`}
    >
      <div
        className={`isolate mx-auto flex w-full max-w-[92rem] flex-wrap items-center justify-between gap-2 border px-3 py-2 transition-[background,box-shadow,border-color,border-radius] duration-500 sm:gap-4 sm:px-7 sm:py-3 ${
          mobileMenuOpen ? "rounded-2xl" : "rounded-2xl lg:rounded-full"
        } ${
          solid
            ? "border-ink/18 bg-canvas/86 shadow-[0_12px_46px_-16px_rgba(27,63,46,0.28)] backdrop-blur-xl"
            : "border-ink/10 bg-canvas/70 shadow-[0_8px_34px_-18px_rgba(27,63,46,0.18)] backdrop-blur-md"
        }`}
      >
        <Link
          href={logoHref}
          className="order-1 min-w-0 shrink"
          aria-label={logoAria}
        >
          <VividLogo size={isCityHome ? "home" : "header"} />
        </Link>

        <div className="order-2 hidden shrink-0 items-center sm:ml-auto md:ml-0 lg:flex">
          <LocationSwitcher compact layoutGroup="hdr" />
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="order-3 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-ink/15 bg-canvas/60 text-ink lg:hidden"
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

        <nav className="order-4 hidden w-full items-center gap-7 border-t border-ink/8 pt-0 text-sm font-medium lg:flex lg:w-auto lg:overflow-visible lg:border-0 lg:justify-center xl:gap-8">
          {navItems.map((item) => {
            const href = `${cityBase}/${item.segment}`;
            const active = isNavActive(item.segment);
            return (
              <Link
                key={item.segment}
                href={href}
                className={`relative shrink-0 whitespace-nowrap transition-colors ${
                  active ? "text-ink" : "text-ink/80 hover:text-ink"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <span
                  className={`after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-accent after:transition-transform after:duration-300 ${
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

        <button
          type="button"
          onClick={openConsultationPopup}
          className="order-5 hidden items-center justify-center rounded-full bg-ink px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-canvas shadow-[0_8px_20px_-10px_rgba(0,0,0,0.45)] transition hover:opacity-95 lg:inline-flex"
        >
          Book Free Consultation
        </button>

        {mobileMenuOpen ? (
          <div className="order-6 relative z-10 mt-2 w-full rounded-xl border border-ink/12 bg-canvas p-3 shadow-[0_20px_48px_-28px_rgba(27,63,46,0.42)] ring-1 ring-ink/[0.06] backdrop-blur-md lg:hidden">
            <div className="mb-3 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
              <LocationSwitcher compact wide layoutGroup="hdr-mobile" />
              <button
                type="button"
                onClick={openConsultationPopup}
                className="inline-flex w-full shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-ink px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-canvas shadow-[0_8px_20px_-10px_rgba(0,0,0,0.45)] transition hover:opacity-95 sm:w-auto sm:px-3.5 sm:py-1.5 sm:text-[9px] sm:tracking-[0.16em]"
              >
                Book consultation
              </button>
            </div>

            <nav className="grid grid-cols-2 gap-x-3 gap-y-2.5 border-t border-ink/8 pt-3 text-[12px] font-semibold">
              {navItems.map((item) => {
                const href = `${cityBase}/${item.segment}`;
                const active = isNavActive(item.segment);
                return (
                  <Link
                    key={`mobile-${item.segment}`}
                    href={href}
                    className={`rounded-lg px-2 py-1.5 transition-colors ${
                      active ? "bg-ink/8 text-ink" : "text-ink/75 hover:bg-ink/5 hover:text-ink"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        ) : null}
      </div>
    </motion.header>
  );
}
