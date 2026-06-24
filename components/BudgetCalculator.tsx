"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { getStudioWhatsAppHref } from "@/lib/locations";
import { FOCUS_RING } from "@/lib/ui-classes";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

const projectMultipliers = {
  kitchen: 1850,
  apartment2bhk: 1650,
  apartment3bhk: 1780,
  villa: 2150,
} as const;

const finishMultipliers = {
  essential: 0.92,
  premium: 1,
  luxury: 1.22,
} as const;

type CalcScope = "kitchen" | "fullhome" | "villa";

const CALC_SCOPES: readonly {
  id: CalcScope;
  label: string;
  projectType: keyof typeof projectMultipliers;
  defaultArea: number;
  areaMin: number;
  areaMax: number;
}[] = [
  { id: "kitchen", label: "Kitchen", projectType: "kitchen", defaultArea: 120, areaMin: 80, areaMax: 280 },
  {
    id: "fullhome",
    label: "Full home",
    projectType: "apartment3bhk",
    defaultArea: 1400,
    areaMin: 650,
    areaMax: 2800,
  },
  { id: "villa", label: "Villa", projectType: "villa", defaultArea: 3200, areaMin: 1800, areaMax: 5200 },
] as const;

const BTN_SECONDARY = `rounded-full border border-ink/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition hover:border-accent/35 hover:bg-accent/[0.06] ${FOCUS_RING}` as const;

export function BudgetCalculator() {
  const { location } = useStudioLocation();
  const [scope, setScope] = useState<CalcScope>("fullhome");
  const scopeConfig = CALC_SCOPES.find((s) => s.id === scope)!;
  const [area, setArea] = useState(scopeConfig.defaultArea);
  const [projectType, setProjectType] = useState<keyof typeof projectMultipliers>(scopeConfig.projectType);
  const [finish, setFinish] = useState<keyof typeof finishMultipliers>("premium");
  const [smartAddons, setSmartAddons] = useState(false);
  const [calcStarted, setCalcStarted] = useState(false);
  const [calcCompleted, setCalcCompleted] = useState(false);
  const [copied, setCopied] = useState(false);

  const estimate = useMemo(() => {
    const base = area * projectMultipliers[projectType] * finishMultipliers[finish];
    const smart = smartAddons ? 180000 : 0;
    const min = Math.round((base + smart) * 0.9);
    const max = Math.round((base + smart) * 1.12);
    return { min, max };
  }, [area, finish, projectType, smartAddons]);

  const estimateKey = `${estimate.min}-${estimate.max}`;
  const estimateText = `Estimated budget for ${location.label}: INR ${estimate.min.toLocaleString("en-IN")} - INR ${estimate.max.toLocaleString("en-IN")}`;
  const whatsappHref = `${getStudioWhatsAppHref(location.id)}?text=${encodeURIComponent(
    `${estimateText}\nProject: ${projectType}\nArea: ${area} sqft\nFinish: ${finish}\nSmart add-ons: ${smartAddons ? "Yes" : "No"}`,
  )}`;

  function markCalcStarted() {
    if (calcStarted) return;
    setCalcStarted(true);
    trackEvent("calc_started", { city: location.id });
  }

  useEffect(() => {
    if (!calcStarted || calcCompleted) return;
    setCalcCompleted(true);
    trackEvent("calc_completed", {
      city: location.id,
      projectType,
      area,
      finish,
      smartAddons,
      estimateMin: estimate.min,
      estimateMax: estimate.max,
    });
  }, [area, calcCompleted, calcStarted, estimate.max, estimate.min, finish, location.id, projectType, smartAddons]);

  function handleDownloadEstimate() {
    const content = [
      "Vivid In2wrio - Budget Estimate",
      `City: ${location.label}`,
      `Project type: ${projectType}`,
      `Area: ${area} sqft`,
      `Finish: ${finish}`,
      `Smart add-ons: ${smartAddons ? "Yes" : "No"}`,
      "",
      estimateText,
      "",
      "Disclaimer: Final quote after site survey, services audit, and BOQ freeze.",
    ].join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vivid-estimate-${location.id}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    trackEvent("estimate_downloaded", { city: location.id, projectType, area, finish, smartAddons });
  }

  async function handleCopyEstimate() {
    try {
      await navigator.clipboard.writeText(estimateText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
      trackEvent("estimate_copied", { city: location.id, projectType, area, finish, smartAddons });
    } catch {
      // ignore clipboard failures silently
    }
  }

  function handleScopeChange(next: CalcScope) {
    const config = CALC_SCOPES.find((s) => s.id === next)!;
    markCalcStarted();
    setScope(next);
    setProjectType(config.projectType);
    setArea(config.defaultArea);
    trackEvent("calc_updated", { city: location.id, field: "scope", scope: next });
  }

  return (
    <section id="budget-calculator" className={`border-y border-ink/10 bg-panel/35 py-12 sm:py-14 ${PAGE_GUTTER_X}`}>
      <div className={`mx-auto grid gap-10 ${CONTENT_MAX} lg:grid-cols-[minmax(0,1fr)_420px]`}>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-strong">Budget planner</p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            Interior budget calculator
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Get a realistic range before site visit. This is a guided estimate based on city,
            typology, finish band, and optional smart-home inclusions.
          </p>

          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Project scope">
            {CALC_SCOPES.map((item) => {
              const active = scope === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="calc-panel"
                  onClick={() => handleScopeChange(item.id)}
                  className={
                    active
                      ? `rounded-full border border-accent/45 bg-accent/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink shadow-sm ${FOCUS_RING}`
                      : `rounded-full border border-ink/14 bg-canvas/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/70 transition hover:border-accent/35 hover:text-ink ${FOCUS_RING}`
                  }
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div id="calc-panel" role="tabpanel" className="mt-9 grid gap-5 sm:grid-cols-2">
            {scope === "fullhome" ? (
              <label className="text-sm font-medium text-ink">
                Home type
                <select
                  value={projectType}
                  onChange={(e) => {
                    markCalcStarted();
                    setProjectType(e.target.value as keyof typeof projectMultipliers);
                    trackEvent("calc_updated", { city: location.id, field: "projectType" });
                  }}
                  className={`mt-2 w-full rounded-xl border border-ink/20 bg-canvas px-3 py-2 text-sm ${FOCUS_RING}`}
                >
                  <option value="apartment2bhk">2BHK apartment</option>
                  <option value="apartment3bhk">3BHK apartment</option>
                </select>
              </label>
            ) : (
              <div className="rounded-xl border border-ink/12 bg-canvas/60 px-3 py-3 text-sm text-muted">
                <span className="font-medium text-ink">
                  {scope === "kitchen" ? "Modular kitchen" : "Villa / large residence"}
                </span>
                <p className="mt-1 text-xs leading-relaxed">
                  {scope === "kitchen"
                    ? "Typical run includes base units, tall storage, countertop allowance, and appliance zones."
                    : "Full-residence scope with premium joinery, finishes, and coordinated services."}
                </p>
              </div>
            )}

            <label className="text-sm font-medium text-ink">
              Finish level
              <select
                value={finish}
                onChange={(e) => {
                  markCalcStarted();
                  setFinish(e.target.value as keyof typeof finishMultipliers);
                  trackEvent("calc_updated", { city: location.id, field: "finish" });
                }}
                className={`mt-2 w-full rounded-xl border border-ink/20 bg-canvas px-3 py-2 text-sm ${FOCUS_RING}`}
              >
                <option value="essential">Essential</option>
                <option value="premium">Premium</option>
                <option value="luxury">Luxury</option>
              </select>
            </label>
          </div>

          <label className="mt-6 block text-sm font-medium text-ink">
            Built-up area (sqft): <span className="font-semibold">{area}</span>
            <input
              type="range"
              min={scopeConfig.areaMin}
              max={scopeConfig.areaMax}
              step={scope === "kitchen" ? 10 : 50}
              value={area}
              onChange={(e) => {
                markCalcStarted();
                setArea(Number(e.target.value));
                trackEvent("calc_updated", { city: location.id, field: "area" });
              }}
              className={`mt-3 w-full accent-accent ${FOCUS_RING}`}
            />
          </label>

          <label className="mt-4 inline-flex items-center gap-3 text-sm text-ink">
            <input
              type="checkbox"
              checked={smartAddons}
              onChange={(e) => {
                markCalcStarted();
                setSmartAddons(e.target.checked);
                trackEvent("calc_updated", { city: location.id, field: "smartAddons" });
              }}
              className={`h-4 w-4 rounded border-ink/30 accent-accent ${FOCUS_RING}`}
            />
            Include smart-home package
          </label>
        </Reveal>

        <Reveal delay={0.08}>
          <aside className="rounded-3xl border border-ink/12 bg-canvas p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-strong">
              Estimated range · {location.label}
            </p>
            <div className="mt-4 flex flex-wrap items-end gap-2 text-ink">
              <span className="pb-1 font-body text-xs font-semibold uppercase tracking-[0.26em] text-ink/72">
                INR
              </span>
              <AnimatePresence mode="wait">
                <motion.p
                  key={estimateKey}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="font-body text-[1.85rem] font-semibold leading-none tracking-[0.02em] tabular-nums sm:text-[2.2rem]"
                >
                  {estimate.min.toLocaleString("en-IN")} - {estimate.max.toLocaleString("en-IN")}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Final quote depends on site condition, civil scope, imported materials, and services.
              Confirmed after survey and BOQ freeze.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent("whatsapp_clicked", { city: location.id, source: "budget_calculator" })
                }
                className={`rounded-full bg-ink px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-canvas transition hover:bg-ink/90 ${FOCUS_RING}`}
              >
                Send on WhatsApp
              </a>
              <a
                href={`/${location.id}/contact`}
                onClick={() =>
                  trackEvent("book_clicked", { city: location.id, source: "budget_calculator" })
                }
                className={BTN_SECONDARY}
              >
                Book consultation
              </a>
              <button type="button" onClick={handleDownloadEstimate} className={BTN_SECONDARY}>
                Download estimate
              </button>
              <button type="button" onClick={handleCopyEstimate} className={BTN_SECONDARY}>
                {copied ? "Copied" : "Copy estimate"}
              </button>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
