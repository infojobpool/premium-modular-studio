"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { interiorImages, PAGE_GUTTER_X } from "@/lib/interior-images";
import { STUDIO_LOCATIONS } from "@/lib/locations";
import { withBrandHighlight } from "./BrandInline";
import { VividLogo } from "./VividLogo";

/** Shared content rail — wider than prose so hub feels editorial, not “narrow column”. */
const HUB_RAIL = "w-full max-w-5xl lg:max-w-[52rem]" as const;

const cards = [
  {
    city: "hyderabad" as const,
    title: "Hyderabad",
    line: "Flagship studio · Secunderabad / Sainikpuri",
    href: "/hyderabad",
    image: "/welcome-hyderabad-living.png",
    imageAlt: "Hyderabad studio — luxury living room interior",
  },
  {
    city: "bhubaneswar" as const,
    title: "Bhubaneswar",
    line: "Studio · Puri Bypass, Mangaraj Point",
    href: "/bhubaneswar",
    image: "/welcome-bhubaneswar-living.png",
    imageAlt: "Bhubaneswar studio — luxury living room interior",
  },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

const cardSpring = { type: "spring" as const, stiffness: 420, damping: 32 };

export function HubLanding() {
  const reduce = useReducedMotion();

  const heroItem = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.52, ease: easeOut },
    },
  };

  const heroLine = {
    hidden: { opacity: reduce ? 1 : 0, scaleX: reduce ? 1 : 0 },
    show: {
      opacity: 1,
      scaleX: 1,
      transition: { duration: reduce ? 0 : 0.52, ease: easeOut },
    },
  };

  return (
    <>
      <div
        className={`relative flex min-h-[100dvh] flex-col overflow-hidden mesh-hero ${PAGE_GUTTER_X} pb-[max(1.25rem,env(safe-area-inset-bottom)+0.75rem)] pt-[max(1.25rem,env(safe-area-inset-top)+0.5rem)] sm:pb-6 sm:pt-8`}
      >
        <div className="pointer-events-none absolute inset-0 z-0 min-h-[100dvh]" aria-hidden>
          <div className="relative h-full min-h-[100dvh] w-full">
            <Image
              src={interiorImages.hero}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-[center_42%] opacity-[0.13] saturate-[0.72] sm:opacity-[0.15]"
              fetchPriority="low"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-canvas/93 via-canvas/82 to-panel/90"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_20%,color-mix(in_oklab,var(--color-canvas)_78%,transparent),transparent_65%)]"
              aria-hidden
            />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <div className="hub-pattern-linen" />
          <div className="hub-pattern-vignette" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-18%,color-mix(in_oklab,var(--color-accent)_16%,transparent),transparent_58%)]"
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute -right-24 top-1/4 z-0 h-[min(420px,90vw)] w-[min(420px,90vw)] rounded-full bg-accent/10 blur-[100px]"
          aria-hidden
          animate={reduce ? undefined : { scale: [1, 1.06, 1], opacity: [0.5, 0.72, 0.5] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -left-32 bottom-[15%] z-0 h-[min(360px,85vw)] w-[min(360px,85vw)] rounded-full bg-ink/12 blur-[95px]"
          aria-hidden
          animate={reduce ? undefined : { scale: [1, 1.05, 1], opacity: [0.38, 0.52, 0.38] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="relative z-[1] mx-auto flex w-full min-h-0 flex-1 flex-col lg:max-w-[52rem] lg:justify-center lg:gap-5 lg:py-6">
          <header className={`relative flex ${HUB_RAIL} justify-center sm:justify-start`}>
            <motion.div
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.65, ease: easeOut }}
              whileHover={reduce ? undefined : { scale: 1.02 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              <Link
                href="/"
                className="inline-flex min-w-0 rounded-2xl border border-ink/12 bg-canvas/65 px-3 py-2 shadow-[0_14px_44px_-22px_rgba(27,63,46,0.4)] ring-1 ring-white/55 backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_22px_56px_-24px_rgba(27,63,46,0.38)] active:scale-[0.98] sm:px-3.5 sm:py-2.5"
                aria-label="Vivid In2erio home"
              >
                <VividLogo size="home" />
              </Link>
            </motion.div>
          </header>

          <div className={`flex flex-col gap-4 lg:gap-5 ${HUB_RAIL}`}>
            <motion.div
              className="relative text-center"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: reduce ? 0 : 0.09,
                    delayChildren: reduce ? 0 : 0.1,
                  },
                },
              }}
            >
              <motion.div variants={heroItem} className="flex justify-center">
                <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/[0.09] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-accent-strong shadow-[0_1px_0_rgba(255,255,255,0.45)_inset] sm:px-3.5 sm:text-[11px]">
                  Premium & luxury interiors
                </span>
              </motion.div>
              <motion.div
                variants={heroLine}
                className="mx-auto mt-1.5 h-px w-14 origin-center bg-gradient-to-r from-transparent via-accent to-transparent sm:w-20"
              />
              <motion.h1
                variants={{
                  hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 },
                  show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.65, ease: easeOut } },
                }}
                className="hub-hero-title mt-1.5 px-1 font-display text-balance font-semibold uppercase text-[clamp(1.65rem,4.2vw+0.35rem,2.75rem)] leading-[1.08] tracking-[0.07em] text-ink sm:mt-2 sm:tracking-[0.09em]"
              >
                Choose your studio
              </motion.h1>
              <motion.p
                variants={heroItem}
                className="mx-auto mt-2 max-w-lg px-2 text-xs font-medium leading-snug text-muted sm:text-sm"
              >
                Select{" "}
                <span className="font-semibold text-ink">Hyderabad</span> or{" "}
                <span className="font-semibold text-ink">Bhubaneswar</span> for local projects and
                consultations.
              </motion.p>
              <motion.p
                variants={{
                  hidden: { opacity: reduce ? 1 : 0 },
                  show: { opacity: 1, transition: { duration: reduce ? 0 : 0.48, ease: easeOut } },
                }}
                className="mx-auto mt-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/45 sm:text-[11px]"
              >
                By appointment
              </motion.p>
            </motion.div>

            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {cards.map((c, i) => (
                <motion.div
                  key={c.city}
                  initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    delay: reduce ? 0 : 0.06 + i * 0.12,
                    ...cardSpring,
                  }}
                  whileHover={reduce ? undefined : { y: -6 }}
                  whileTap={reduce ? undefined : { scale: 0.985 }}
                >
                  <Link
                    href={c.href}
                    className="group relative flex touch-manipulation flex-col overflow-hidden rounded-2xl border border-ink/18 bg-gradient-to-b from-canvas/98 via-canvas/88 to-panel/80 shadow-[0_1px_0_rgba(255,255,255,0.76)_inset,0_0_0_1px_color-mix(in_oklab,var(--color-accent)_16%,transparent),0_32px_72px_-40px_rgba(27,63,46,0.5)] ring-1 ring-white/70 backdrop-blur-[4px] transition-[border-color,box-shadow,transform] duration-500 hover:border-accent/48 hover:shadow-[0_1px_0_rgba(255,255,255,0.82)_inset,0_0_0_1px_color-mix(in_oklab,var(--color-accent)_32%,transparent),0_44px_88px_-32px_rgba(27,63,46,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:rounded-[1.65rem]"
                  >
                    <div className="relative h-[7.25rem] w-full shrink-0 overflow-hidden sm:h-[7.75rem]">
                      <Image
                        src={c.image}
                        alt={c.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, 26rem"
                        className="object-cover object-center transition duration-700 group-hover:scale-[1.04]"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-canvas/95 via-canvas/25 to-transparent"
                        aria-hidden
                      />
                      <span
                        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-95"
                        aria-hidden
                      />
                      <span className="absolute bottom-3 left-4 z-10 font-display text-[clamp(1.35rem,4vw,1.85rem)] uppercase leading-none tracking-[0.1em] text-ink drop-shadow-[0_1px_8px_rgba(234,225,200,0.85)] sm:left-5">
                        {c.title}
                      </span>
                    </div>

                    <div className="relative flex flex-col px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-3.5">
                      <p className="text-[11px] font-semibold uppercase leading-snug tracking-[0.14em] text-muted sm:text-xs sm:tracking-[0.16em]">
                        {c.line}
                      </p>
                      <p className="mt-1 text-[10px] font-medium uppercase leading-snug tracking-[0.12em] text-ink/45 sm:text-[11px]">
                        {STUDIO_LOCATIONS[c.city].hoursSummary}
                      </p>
                      <span className="mt-3 inline-flex min-h-[44px] w-full items-center justify-center gap-2.5 rounded-full border border-ink/14 bg-canvas/80 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink shadow-sm transition duration-300 group-hover:border-accent/45 group-hover:bg-accent/12 sm:w-auto sm:min-w-[12.5rem] sm:tracking-[0.24em]">
                        Enter studio
                        <span
                          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/12 bg-canvas text-sm transition duration-300 group-hover:translate-x-0.5 group-hover:border-accent/45 group-hover:bg-accent/20"
                          aria-hidden
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.footer
            initial={{ opacity: reduce ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : 0.1, ease: easeOut }}
            className={`${HUB_RAIL} mt-4 border-t border-ink/12 pt-4 text-center lg:mt-5 lg:pt-4`}
          >
            <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 text-[11px] leading-snug text-muted sm:text-xs sm:leading-normal">
              <span className="inline-flex flex-wrap items-center justify-center gap-x-1.5">
                © {new Date().getFullYear()} {withBrandHighlight("Vivid In2erio")}
              </span>
              <span className="hidden text-ink/25 sm:inline" aria-hidden>
                ·
              </span>
              <span className="flex w-full basis-full flex-wrap items-center justify-center gap-x-2 gap-y-1.5 sm:w-auto sm:basis-auto">
                <Link
                  href="/hyderabad"
                  className="rounded-md px-1.5 py-1 font-medium text-ink/85 underline-offset-4 transition hover:text-accent-strong hover:underline"
                >
                  Hyderabad
                </Link>
                <span className="text-ink/25">·</span>
                <Link
                  href="/bhubaneswar"
                  className="rounded-md px-1.5 py-1 font-medium text-ink/85 underline-offset-4 transition hover:text-accent-strong hover:underline"
                >
                  Bhubaneswar
                </Link>
                <span className="text-ink/25">·</span>
                <Link
                  href="/privacy"
                  className="rounded-md px-1.5 py-1 underline-offset-4 transition hover:text-ink hover:underline"
                >
                  Privacy
                </Link>
              </span>
            </p>
          </motion.footer>
        </div>
      </div>
    </>
  );
}
