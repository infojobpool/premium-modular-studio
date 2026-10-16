import { CustomerStoriesRail } from "@/components/CustomerStoriesRail";
import { Reveal } from "@/components/Reveal";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { getCustomerStories } from "@/lib/reviews/customer-stories";
import { HomeCustomerStoriesCityLink } from "./HomeCustomerStoriesCityLink";

export async function HomeCustomerStoriesStrip() {
  const stories = await getCustomerStories();

  return (
    <section
      id="customer-stories"
      className={`border-y border-ink/10 bg-panel/30 py-12 sm:py-16 ${PAGE_GUTTER_X}`}
      aria-labelledby="home-stories-heading"
    >
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-strong">Stories</p>
            <h2
              id="home-stories-heading"
              className="mt-2 font-display text-2xl tracking-tight text-ink sm:text-3xl md:text-4xl"
            >
              Customer stories
            </h2>
          </div>
          <HomeCustomerStoriesCityLink />
        </Reveal>
        <div className="mt-8">
          <CustomerStoriesRail stories={stories} />
        </div>
      </div>
    </section>
  );
}
