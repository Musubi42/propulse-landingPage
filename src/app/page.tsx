import type { Metadata } from 'next';
import {
  HeroSection,
  DataVisualizationSection,
  SolutionSection,
  FinalCTASection,
  Footer,
} from '@/components/sections';
import {
  OrganicWavePenStroke,
  AnimatedPenDraw
} from '@/components/transitions';

export const metadata: Metadata = {
  title: 'Propulse | Mentorat gratuit pour lycéens vers les Grandes Écoles',
  description: 'Propulse accompagne gratuitement et à distance les lycéens motivés vers les Grandes Écoles. Rejoignez le mouvement.',
  alternates: {
    canonical: 'https://propulse-association.fr/',
  },
};

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <HeroSection />
        <div className='bg-white'>
          <SolutionSection />
          <AnimatedPenDraw />
          <DataVisualizationSection />
          <OrganicWavePenStroke />
          {/* <SocialProofSection /> */}
          {/* <DoubleStrokePenLine /> */}
          <FinalCTASection />
        </div>
      </main>
      <Footer />
    </>
  );
}
