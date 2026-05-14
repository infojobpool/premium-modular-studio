"use client";

import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { getStudioWhatsAppHref } from "@/lib/locations";
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

export function BudgetCalculator() {
  const { location } = useStudioLocation();
  const [area, setArea] = useState(1400);
  const [projectType, setProjectType] = useState<keyof typeof projectMultipliers>("apartment3bhk");
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
      "Vivid In2erio - Budget Estimate",
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

  return (
    <section id="budget-calculator" className={`border-y border-ink/10 bg-panel/35 py-12 sm:py-14 ${PAGE_GUTTER_X}`}>
      <div className={`mx-auto grid gap-10 ${CONTENT_MAX} lg:grid-cols-[minmax(0,1fr)_420px]`}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-strong">Budget planner</p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            Interior budget calculator
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Get a realistic range before site visit. This is a guided estimate based on city,
            typology, finish band, and optional smart-home inclusions.
          </p>

          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-ink">
              Project type
              <select
                value={projectType}
                onChange={(e) => {
                  markCalcStarted();
                  setProjectType(e.target.value as keyof typeof projectMultipliers);
                  trackEvent("calc_updated", { city: location.id, field: "projectType" });
                }}
                className="mt-2 w-full rounded-xl border border-ink/20 bg-canvas px-3 py-2 text-sm"
              >
                <option value="kitchen">Modular kitchen</option>
                <option value="apartment2bhk">2BHK apartment</option>
                <option value="apartment3bhk">3BHK apartment</option>
                <option value="villa">Villa</option>
              </select>
            </label>

            <label className="text-sm font-medium text-ink">
              Finish level
              <select
                value={finish}
                onChange={(e) => {
                  markCalcStarted();
                  setFinish(e.target.value as keyof typeof finishMultipliers);
                  trackEvent("calc_updated", { city: location.id, field: "finish" });
                }}
                className="mt-2 w-full rounded-xl border border-ink/20 bg-canvas px-3 py-2 text-sm"
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
              min={450}
              max={5200}
              step={50}
              value={area}
              onChange={(e) => {
                markCalcStarted();
                setArea(Number(e.target.value));
                trackEvent("calc_updated", { city: location.id, field: "area" });
              }}
              className="mt-3 w-full accent-accent"
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
              className="h-4 w-4 rounded border-ink/30 accent-accent"
            />
            Include smart-home package
          </label>
        </div>

        <aside className="rounded-3xl border border-ink/12 bg-canvas p-7 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-strong">
            Estimated range · {location.label}
          </p>
          <div className="mt-4 flex flex-wrap items-end gap-2 text-ink">
            <span className="pb-1 font-body text-xs font-semibold uppercase tracking-[0.26em] text-ink/72">
              INR
            </span>
            <p className="font-body text-[1.85rem] font-semibold leading-none tracking-[0.02em] tabular-nums sm:text-[2.2rem]">
              {estimate.min.toLocaleString("en-IN")} - {estimate.max.toLocaleString("en-IN")}
            </p>
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
              className="rounded-full bg-ink px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-canvas"
            >
              Send on WhatsApp
            </a>
            <a
              href={`/${location.id}/contact`}
              onClick={() =>
                trackEvent("book_clicked", { city: location.id, source: "budget_calculator" })
              }
              className="rounded-full border border-ink/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink"
            >
              Book consultation
            </a>
            <button
              type="button"
              onClick={handleDownloadEstimate}
              className="rounded-full border border-ink/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink"
            >
              Download estimate
            </button>
            <button
              type="button"
              onClick={handleCopyEstimate}
              className="rounded-full border border-ink/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink"
            >
              {copied ? "Copied" : "Copy estimate"}
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
