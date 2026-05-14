import { BudgetCalculator } from "@/components/BudgetCalculator";
import { CityAwardsStrip } from "@/components/CityAwardsStrip";
import { CityPageShell } from "@/components/CityPageShell";
import { FounderSpotlight } from "@/components/FounderSpotlight";
import { Hero } from "@/components/Hero";
import { InspirationStrip } from "@/components/InspirationStrip";
import { IntentConversionBand } from "@/components/IntentConversionBand";
import { OfferLeadModal } from "@/components/OfferLeadModal";
import { PressStrip } from "@/components/PressStrip";
import { PromoBanner } from "@/components/PromoBanner";
import { CityProjectScopeStrip } from "@/components/CityProjectScopeStrip";
import { SignatureWorkStrip } from "@/components/SignatureWorkStrip";
import { StudioProcessRibbon } from "@/components/StudioProcessRibbon";
import { StickyBookBar } from "@/components/StickyBookBar";
import { Testimonials } from "@/components/Testimonials";
import { WhyChoose } from "@/components/WhyChoose";

/**
 * City landing `/[city]` — hero, promos, calculator, and supporting sections.
 */
export function CityHomePage() {
  return (
    <CityPageShell stickyBar={<StickyBookBar />}>
      <OfferLeadModal />
      <Hero />
      <StudioProcessRibbon />
      <CityProjectScopeStrip />
      <CityAwardsStrip />
      <PromoBanner />
      <WhyChoose />
      <FounderSpotlight variant="compact" />
      <SignatureWorkStrip />
      <InspirationStrip />
      <BudgetCalculator />
      <PressStrip />
      <Testimonials />
      <IntentConversionBand />
    </CityPageShell>
  );
}
