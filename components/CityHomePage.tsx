import { CityPageShell } from "@/components/CityPageShell";
import { DesignIdeasStrip } from "@/components/DesignIdeasStrip";
import { FounderSpotlight } from "@/components/FounderSpotlight";
import { Hero } from "@/components/Hero";
import { HomeSheebaVillaStrip } from "@/components/HomeSheebaVillaStrip";
import { HomeFaqStrip } from "@/components/HomeFaqStrip";
import { StickyBookBar } from "@/components/StickyBookBar";
import { StudioTrustStrip } from "@/components/StudioTrustStrip";
import { HomeCustomerStoriesStrip } from "@/components/HomeCustomerStoriesStrip";

/**
 * City landing `/[city]` — hero, work, stories, then visit.
 */
export function CityHomePage() {
  return (
    <CityPageShell stickyBar={<StickyBookBar />}>
      <Hero />
      <StudioTrustStrip />
      <DesignIdeasStrip />
      <HomeSheebaVillaStrip />
      <HomeCustomerStoriesStrip />
      <FounderSpotlight variant="compact" />
      <HomeFaqStrip />
    </CityPageShell>
  );
}
