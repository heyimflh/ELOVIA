import { Hero } from '@/components/hero/Hero';
import { MaterialDiscovery } from '@/components/materials/MaterialDiscovery';
import { HowItWorks } from '@/components/how-it-works';
import { MarketplacePreview } from '@/components/marketplace';
import { ImpactGardenPreview } from '@/components/impact-garden';
import { CommunitySection } from '@/components/community';
import { ClosingCTA } from '@/components/closing-cta';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <main className="w-full">
      <Hero />
      <MaterialDiscovery />
      <HowItWorks />
      <MarketplacePreview />
      <ImpactGardenPreview />
      <CommunitySection />
      <ClosingCTA />
      <Footer />
    </main>
  );
}
