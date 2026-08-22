import { BudgetCalculator } from "@/components/BudgetCalculator";
import { CityAwardsStrip } from "@/components/CityAwardsStrip";
import { CityPageShell } from "@/components/CityPageShell";
import { DesignIdeasStrip } from "@/components/DesignIdeasStrip";
import { FounderSpotlight } from "@/components/FounderSpotlight";
import { Hero } from "@/components/Hero";
import { HomeFaqStrip } from "@/components/HomeFaqStrip";
import { HomeMagazineStrip } from "@/components/HomeMagazineStrip";
import { IntentConversionBand } from "@/components/IntentConversionBand";
import { MaterialsLibraryStrip } from "@/components/MaterialsLibraryStrip";
import { OfferLeadModal } from "@/components/OfferLeadModal";
import { PressStrip } from "@/components/PressStrip";
import { PromoBanner } from "@/components/PromoBanner";
import { PostHeroGuide } from "@/components/PostHeroGuide";
import { SignatureWorkStrip } from "@/components/SignatureWorkStrip";
import { StickyBookBar } from "@/components/StickyBookBar";
import { StudioTrustStrip } from "@/components/StudioTrustStrip";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { WhyChoose } from "@/components/WhyChoose";

/**
 * City landing `/[city]` — hero, promos, calculator, and supporting sections.
 */
export function CityHomePage() {
  return (
    <CityPageShell stickyBar={<StickyBookBar />}>
      <OfferLeadModal />
      <Hero />
      <PostHeroGuide />
      <StudioTrustStrip />
      <DesignIdeasStrip />
      <MaterialsLibraryStrip />
      <CityAwardsStrip />
      <SignatureWorkStrip />
      <WhyChoose />
      <FounderSpotlight variant="compact" />
      <PromoBanner />
      <BudgetCalculator />
      <HomeMagazineStrip />
      <PressStrip />
      <TestimonialsSection />
      <HomeFaqStrip />
      <IntentConversionBand />
    </CityPageShell>
  );
}
