"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { interiorImages, PAGE_GUTTER_X } from "@/lib/interior-images";
import { withBrandHighlight } from "./BrandInline";
import { VividLogo } from "./VividLogo";

const HUB_MAX = "w-full max-w-[44rem] sm:max-w-[48rem] lg:max-w-[54rem]" as const;

const cards = [
  {
    city: "hyderabad" as const,
    title: "Hyderabad",
    studio: "Flagship studio",
    area: "Secunderabad / Sainikpuri",
    href: "/hyderabad",
    image: "/gallery/delhi-kitchen/Villa-193-East-Indukuri-Lakeshore-Rnders-revised442.png",
    imageAlt: "Hyderabad studio — luxury bedroom interior",
    imagePosition: "object-[center_42%]" as const,
    hours: "10:00–19:00 IST",
  },
  {
    city: "bhubaneswar" as const,
    title: "Bhubaneswar",
    studio: "Design studio",
    area: "Puri Bypass, Mangaraj Point",
    href: "/bhubaneswar",
    image: "/welcome-bhubaneswar-living.png",
    imageAlt: "Bhubaneswar studio — luxury living room interior",
    imagePosition: "object-center" as const,
    hours: "10:00–18:30 IST",
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
        className={`relative flex min-h-[100dvh] flex-col overflow-hidden mesh-hero lg:min-h-0 ${PAGE_GUTTER_X} pb-[max(1rem,env(safe-area-inset-bottom)+0.5rem)] pt-[max(1rem,env(safe-area-inset-top)+0.35rem)] sm:pb-5 sm:pt-6 lg:pb-8 lg:pt-8`}
      >
        <div className="pointer-events-none absolute inset-0 z-0 min-h-full lg:min-h-[100dvh]" aria-hidden>
          <div className="relative h-full min-h-[100dvh] w-full lg:absolute lg:inset-0">
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

        <div className={`relative z-[1] mx-auto flex ${HUB_MAX} flex-col gap-3 sm:gap-4`}>
          <header className="flex shrink-0 justify-center">
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
                aria-label="Vivid In2wrio home"
              >
                <VividLogo size="home" />
              </Link>
            </motion.div>
          </header>

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
              className="mx-auto mt-1.5 h-px w-12 origin-center bg-gradient-to-r from-transparent via-accent to-transparent sm:w-16"
            />
            <motion.h1
              variants={{
                hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 },
                show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.65, ease: easeOut } },
              }}
              className="hub-hero-title mt-1.5 font-display text-balance font-semibold uppercase text-[clamp(1.5rem,3.5vw+0.4rem,2.35rem)] leading-[1.08] tracking-[0.07em] text-ink sm:tracking-[0.08em]"
            >
              Choose your studio
            </motion.h1>
            <motion.p
              variants={heroItem}
              className="mx-auto mt-1.5 max-w-md text-xs font-medium leading-snug text-muted sm:text-sm"
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
              className="mx-auto mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/45 sm:text-[11px]"
            >
              By appointment · Mon–Sat
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5">
            {cards.map((c, i) => (
              <motion.div
                key={c.city}
                className="h-full"
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: reduce ? 0 : 0.06 + i * 0.12,
                  ...cardSpring,
                }}
                whileHover={reduce ? undefined : { y: -5 }}
                whileTap={reduce ? undefined : { scale: 0.985 }}
              >
                <Link
                  href={c.href}
                  className="group relative flex h-full touch-manipulation flex-col overflow-hidden rounded-2xl border border-ink/18 bg-gradient-to-b from-canvas/98 via-canvas/90 to-panel/78 shadow-[0_1px_0_rgba(255,255,255,0.76)_inset,0_0_0_1px_color-mix(in_oklab,var(--color-accent)_16%,transparent),0_28px_64px_-36px_rgba(27,63,46,0.48)] ring-1 ring-white/70 backdrop-blur-[4px] transition-[border-color,box-shadow,transform] duration-500 hover:border-accent/48 hover:shadow-[0_1px_0_rgba(255,255,255,0.82)_inset,0_0_0_1px_color-mix(in_oklab,var(--color-accent)_32%,transparent),0_40px_80px_-32px_rgba(27,63,46,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:rounded-[1.35rem]"
                >
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 26rem"
                      className={`object-cover saturate-[1.06] contrast-[1.02] transition duration-700 group-hover:scale-[1.03] ${c.imagePosition}`}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-80"
                      aria-hidden
                    />
                    <span
                      className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent"
                      aria-hidden
                    />
                    <span className="absolute bottom-3 left-4 font-display text-[clamp(1.25rem,3vw,1.5rem)] uppercase leading-none tracking-[0.1em] text-canvas drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:left-5">
                      {c.title}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-4">
                    <div className="min-h-[4.5rem] space-y-1.5 sm:min-h-[4.75rem]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-strong sm:text-xs">
                        {c.studio}
                      </p>
                      <p className="text-sm leading-snug text-ink/88">{c.area}</p>
                      <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted">
                        Mon–Sat · {c.hours} · By appointment
                      </p>
                    </div>

                    <span className="mt-auto inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-ink/14 bg-canvas/85 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink shadow-sm transition duration-300 group-hover:border-accent/45 group-hover:bg-accent/12 sm:text-[11px]">
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

          <motion.footer
            initial={{ opacity: reduce ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : 0.1, ease: easeOut }}
            className="mt-4 shrink-0 border-t border-ink/12 pt-4 text-center sm:mt-5 sm:pt-4"
          >
            <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 text-[11px] leading-snug text-muted sm:text-xs sm:leading-normal">
              <span className="inline-flex flex-wrap items-center justify-center gap-x-1.5">
                © {new Date().getFullYear()} {withBrandHighlight("Vivid In2wrio")}
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
