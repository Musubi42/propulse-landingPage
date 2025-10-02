import type { Metadata } from 'next';
import { HeroSection, SocialProofSection } from '@/components/sections';

export const metadata: Metadata = {
  title: 'Propulse | Mentorat gratuit pour lycéens vers les Grandes Écoles',
  description: 'Propulse accompagne gratuitement et à distance les lycéens motivés vers les Grandes Écoles. Rejoignez le mouvement.',
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <SocialProofSection />
    </main>
  );
}
