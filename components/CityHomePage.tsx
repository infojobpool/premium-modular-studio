import { CityAwardsStrip } from "@/components/CityAwardsStrip";
import { CityPageShell } from "@/components/CityPageShell";
import { DesignIdeasStrip } from "@/components/DesignIdeasStrip";
import { FounderSpotlight } from "@/components/FounderSpotlight";
import { Hero } from "@/components/Hero";
import { HomeSheebaVillaStrip } from "@/components/HomeSheebaVillaStrip";
import { HomeFaqStrip } from "@/components/HomeFaqStrip";
import { MaterialsLibraryStrip } from "@/components/MaterialsLibraryStrip";
import { StickyBookBar } from "@/components/StickyBookBar";
import { StudioTrustStrip } from "@/components/StudioTrustStrip";
import { HomeCustomerStoriesStrip } from "@/components/HomeCustomerStoriesStrip";

/**
 * City landing `/[city]` — hero, work, stories, and supporting sections.
 */
export function CityHomePage() {
  return (
    <CityPageShell stickyBar={<StickyBookBar />}>
      <Hero />
      <StudioTrustStrip />
      <DesignIdeasStrip />
      <HomeSheebaVillaStrip />
      <MaterialsLibraryStrip />
      <CityAwardsStrip />
      <FounderSpotlight variant="compact" />
      <HomeCustomerStoriesStrip />
      <HomeFaqStrip />
    </CityPageShell>
  );
}
