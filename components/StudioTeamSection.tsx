"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { STUDIO_TEAM, STUDIO_TEAM_INTRO } from "@/lib/studio-team";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

function initialsFor(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function StudioTeamSection() {
  const { location } = useStudioLocation();

  const members = [...STUDIO_TEAM]
    .filter((m) => {
      if (location.id === "bhubaneswar") {
        return m.studio === "bhubaneswar" || m.id === "ceo";
      }
      return true;
    })
    .sort((a, b) => {
    const score = (m: (typeof STUDIO_TEAM)[number]) => {
      if (location.id === "bhubaneswar") {
        if (m.id === "ceo") return -1;
        if (m.studio === "bhubaneswar") return 0;
        if (m.studio === "both") return 1;
        return 2;
      }
      if (m.id === "ceo") return -1;
      if (m.studio === "both") return 0;
      if (m.studio === location.id) return 1;
      return 2;
    };
    return score(a) - score(b);
  });

  return (
    <section
      id="team"
      className={`border-t border-ink/10 bg-canvas py-20 sm:py-24 ${PAGE_GUTTER_X}`}
      aria-labelledby="studio-team-heading"
    >
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-strong">
            {STUDIO_TEAM_INTRO.eyebrow}
          </p>
          <h2
            id="studio-team-heading"
            className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl"
          >
            {STUDIO_TEAM_INTRO.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{STUDIO_TEAM_INTRO.body}</p>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {members.map((member, i) => (
            <motion.li
              key={member.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <article className="relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-ink/12 bg-gradient-to-b from-canvas via-canvas/95 to-panel/45 shadow-[0_20px_48px_-32px_rgba(27,63,46,0.35)] transition duration-400 hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_28px_56px_-28px_rgba(27,63,46,0.4)]">
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
                  aria-hidden
                />

                <div className="relative mx-auto mt-6 h-[220px] w-[180px] overflow-hidden rounded-[1.1rem] border border-ink/10 bg-panel/40 shadow-inner">
                  {member.imageSrc ? (
                    <Image
                      src={member.imageSrc}
                      alt={member.imageAlt}
                      fill
                      sizes="180px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-ink/8 to-accent/10 font-display text-4xl text-ink/35">
                      {initialsFor(member.name)}
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col px-5 pb-6 pt-5 text-center">
                  <h3 className="font-display text-2xl tracking-tight text-ink">{member.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{member.role}</p>

                  {member.studio !== "both" ? (
                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-strong">
                      {member.studio === "bhubaneswar" ? "Bhubaneswar studio" : "Hyderabad studio"}
                    </p>
                  ) : (
                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/45">
                      Hyderabad & Bhubaneswar
                    </p>
                  )}

                  {member.phone && member.phoneHref ? (
                    <a
                      href={member.phoneHref}
                      className="mt-4 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-ink/80 transition hover:text-accent-strong"
                    >
                      <span aria-hidden>☎</span>
                      {member.phone}
                    </a>
                  ) : null}
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
