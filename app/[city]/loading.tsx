import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";

/** Shown while a `/[city]/*` route segment loads — neutral studio wash (city unknown during suspense). */
export default function CityRouteLoading() {
  return (
    <div className={`studio-atmosphere min-h-dvh ${PAGE_GUTTER_X} py-24 sm:py-28`}>
      <div className={`mx-auto ${CONTENT_MAX} animate-pulse space-y-10`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="h-9 w-40 rounded-lg bg-ink/12" />
          <div className="hidden h-9 w-52 rounded-lg bg-ink/10 sm:block" />
        </div>
        <div className="h-[min(52vh,420px)] rounded-3xl bg-ink/10" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-36 rounded-2xl bg-ink/10" />
          <div className="h-36 rounded-2xl bg-ink/10" />
          <div className="h-36 rounded-2xl bg-ink/10 sm:col-span-2 lg:col-span-1" />
        </div>
      </div>
    </div>
  );
}
