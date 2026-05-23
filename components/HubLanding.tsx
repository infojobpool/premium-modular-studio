"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { interiorImages, PAGE_GUTTER_X } from "@/lib/interior-images";
import { STUDIO_LOCATIONS } from "@/lib/locations";
import { withBrandHighlight } from "./BrandInline";
import { VividLogo } from "./VividLogo";

/** Shared content rail — wider than prose so hub feels editorial, not “narrow column”. */
const HUB_RAIL = "w-full max-w-5xl lg:max-w-6xl xl:max-w-[72rem]" as const;

const cards = [
  {
    city: "hyderabad" as const,
    title: "Hyderabad",
    line: "Flagship studio · Secunderabad / Sainikpuri",
    href: "/hyderabad",
  },
  {
    city: "bhubaneswar" as const,
    title: "Bhubaneswar",
    line: "Studio · Puri Bypass, Mangaraj Point",
    href: "/bhubaneswar",
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
        className={`relative flex min-h-[100dvh] flex-col overflow-hidden mesh-hero ${PAGE_GUTTER_X} pb-[max(2rem,env(safe-area-inset-bottom)+1.25rem)] pt-[max(2.25rem,env(safe-area-inset-top)+0.75rem)] sm:pb-12 sm:pt-14`}
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

        <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
          <header className={`relative mx-auto flex ${HUB_RAIL} justify-center sm:justify-start`}>
            <motion.div
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.65, ease: easeOut }}
              whileHover={reduce ? undefined : { scale: 1.02 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              <Link
                href="/"
                className="inline-flex min-w-0 rounded-2xl border border-ink/12 bg-canvas/65 px-4 py-3 shadow-[0_14px_44px_-22px_rgba(27,63,46,0.4)] ring-1 ring-white/55 backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_22px_56px_-24px_rgba(27,63,46,0.38)] active:scale-[0.98] sm:px-4 sm:py-3.5"
                aria-label="Vivid In2erio home"
              >
                <VividLogo size="home" />
              </Link>
            </motion.div>
          </header>

          <motion.div
            className={`relative mx-auto mt-5 ${HUB_RAIL} text-center sm:mt-6`}
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
              className="mx-auto mt-2 h-px w-16 origin-center bg-gradient-to-r from-transparent via-accent to-transparent sm:mt-2 sm:w-24"
            />
            <motion.h1
              variants={{
                hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 },
                show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.65, ease: easeOut } },
              }}
              className="hub-hero-title mt-2.5 px-1 font-display text-balance font-semibold uppercase text-[clamp(1.55rem,4.8vw+0.4rem,3.05rem)] leading-[1.06] tracking-[0.06em] text-ink sm:mt-3 sm:px-2 sm:tracking-[0.08em]"
            >
              {withBrandHighlight("Choose your Vivid In2erio studio")}
            </motion.h1>
            <motion.p
              variants={heroItem}
              className="mx-auto mt-3 max-w-3xl px-2 text-[10px] font-semibold uppercase leading-snug tracking-[0.2em] text-muted sm:mt-3.5 sm:text-[11px] sm:tracking-[0.22em] md:text-xs md:tracking-[0.24em]"
            >
              We design more than spaces — we curate refined lifestyles. Click the Hyderabad or Bhubaneswar
              studio for local projects, consultations, and contact so your enquiry lands with the right team.
            </motion.p>
            <motion.p
              variants={{
                hidden: { opacity: reduce ? 1 : 0 },
                show: { opacity: 1, transition: { duration: reduce ? 0 : 0.48, ease: easeOut } },
              }}
              className="mx-auto mt-2.5 max-w-2xl px-2 text-[9px] font-semibold uppercase leading-snug tracking-[0.24em] text-ink/50 sm:mt-3 sm:text-[10px] sm:tracking-[0.26em]"
            >
              Design-to-delivery · Luxury homes & workspaces · By appointment
            </motion.p>
          </motion.div>

          <div
            className={`relative mx-auto mt-6 grid w-full grid-cols-1 gap-5 sm:mt-9 sm:grid-cols-2 sm:gap-6 lg:gap-8 ${HUB_RAIL}`}
          >
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
                whileHover={reduce ? undefined : { y: -8 }}
                whileTap={reduce ? undefined : { scale: 0.985 }}
              >
              <Link
                href={c.href}
                className="group relative flex min-h-[214px] touch-manipulation flex-col overflow-hidden rounded-2xl border border-ink/18 bg-gradient-to-b from-canvas/98 via-canvas/84 to-panel/78 p-6 shadow-[0_1px_0_rgba(255,255,255,0.76)_inset,0_0_0_1px_color-mix(in_oklab,var(--color-accent)_16%,transparent),0_36px_80px_-42px_rgba(27,63,46,0.55)] ring-1 ring-white/70 backdrop-blur-[4px] transition-[border-color,box-shadow,transform] duration-500 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-white/38 before:via-white/7 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:inset-[11px] after:rounded-[calc(1rem-2px)] after:border after:border-accent/18 after:opacity-70 after:transition-[opacity,border-color] after:duration-500 hover:border-accent/48 hover:shadow-[0_1px_0_rgba(255,255,255,0.82)_inset,0_0_0_1px_color-mix(in_oklab,var(--color-accent)_32%,transparent),0_48px_96px_-32px_rgba(27,63,46,0.45)] hover:before:opacity-100 hover:after:border-accent/38 hover:after:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:min-h-[228px] sm:rounded-[1.65rem] sm:after:rounded-[1.35rem] sm:p-7"
              >
                <span
                  className="pointer-events-none absolute left-6 top-6 z-[1] h-10 w-10 border-l-2 border-t-2 border-accent/55 opacity-85 transition-opacity duration-500 group-hover:opacity-100 sm:left-7 sm:top-7"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute bottom-6 right-6 z-[1] h-10 w-10 border-b-2 border-r-2 border-accent/55 opacity-85 transition-opacity duration-500 group-hover:opacity-100 sm:bottom-7 sm:right-7"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute inset-x-8 top-0 h-[4px] rounded-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-95 shadow-[0_1px_10px_color-mix(in_oklab,var(--color-accent)_38%,transparent)]"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute -right-2 top-12 z-0 font-display text-[clamp(3.75rem,16vw,5.25rem)] font-semibold leading-none text-accent-strong/[0.14] transition-colors duration-500 group-hover:text-accent-strong/[0.24] sm:-right-1 sm:top-14"
                  aria-hidden
                >
                  {c.city === "hyderabad" ? "H" : "B"}
                </span>
                <span className="relative z-10 font-display text-[clamp(1.5rem,5.2vw,2.45rem)] uppercase leading-none tracking-[0.11em] text-ink">
                  {c.title}
                </span>
                <p className="relative z-10 mt-2.5 max-w-[26rem] text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] text-muted sm:mt-3 sm:text-xs sm:tracking-[0.18em]">
                  {c.line}
                </p>
                <p className="relative z-10 mt-1.5 max-w-[26rem] text-[10px] font-medium uppercase leading-snug tracking-[0.14em] text-ink/45 sm:text-[11px] sm:tracking-[0.16em]">
                  {STUDIO_LOCATIONS[c.city].hoursSummary}
                </p>
                <span className="relative z-10 mt-auto flex flex-wrap items-center gap-2 pt-5 sm:pt-6">
                  <span className="inline-flex min-h-[44px] min-w-[44px] flex-1 items-center justify-center gap-2.5 rounded-full border border-ink/14 bg-canvas/75 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink shadow-sm transition duration-300 group-hover:border-accent/45 group-hover:bg-accent/12 group-hover:text-ink sm:inline-flex sm:flex-none sm:px-6 sm:text-xs sm:tracking-[0.26em]">
                    Enter studio
                    <span
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/12 bg-canvas text-sm transition duration-300 group-hover:translate-x-0.5 group-hover:border-accent/45 group-hover:bg-accent/20 group-hover:shadow-sm"
                      aria-hidden
                    >
                      →
                    </span>
                  </span>
                </span>
              </Link>
              </motion.div>
            ))}
          </div>

          <motion.footer
            initial={{ opacity: reduce ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : 0.1, ease: easeOut }}
            className={`relative mx-auto mt-8 ${HUB_RAIL} border-t border-ink/12 pt-5 text-center sm:mt-10 sm:pt-6`}
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
