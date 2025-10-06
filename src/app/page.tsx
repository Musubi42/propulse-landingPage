import type { Metadata } from 'next';
import {
  HeroSection,
  SocialProofSection,
  DataVisualizationSection,
  SolutionSection,
  FinalCTASection,
  Footer,
} from '@/components/sections';
import {
  OrganicWavePenStroke,
  DoubleStrokePenLine,
  AnimatedPenDraw
} from '@/components/transitions';

export const metadata: Metadata = {
  title: 'Propulse | Mentorat gratuit pour lycéens vers les Grandes Écoles',
  description: 'Propulse accompagne gratuitement et à distance les lycéens motivés vers les Grandes Écoles. Rejoignez le mouvement.',
};

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <HeroSection />
        <SolutionSection />
        <AnimatedPenDraw />
        <DataVisualizationSection />
        <OrganicWavePenStroke />
        <SocialProofSection />
        <DoubleStrokePenLine />
        {/* <OrganicWavePenStroke /> */}
        {/* <FoundersSection />
        <MentorsSection /> */}
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
