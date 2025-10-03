import {
  FoundersSection,
  MentorsSection,
  FinalCTASection,
  Footer,
} from '@/components/sections';
import {
  OrganicWavePenStroke,
  DoubleStrokePenLine,
  AnimatedPenDraw
} from '@/components/transitions';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Qui sommes-nous ? | Propulse',
  description:
    'Découvrez l\'histoire derrière Propulse : deux étudiants qui ont vécu les inégalités d\'accès aux Grandes Écoles et qui ont décidé d\'agir. Rencontrez nos 50+ mentors bienveillants.',
  openGraph: {
    title: 'Qui sommes-nous ? | Propulse',
    description:
      'L\'histoire derrière Propulse : Arthur et Hugo, deux fondateurs passés par les Grandes Écoles, et nos 50+ mentors engagés.',
  },
};

export default function QuiSommesNousPage() {
  return (
    <>
    <main className="min-h-screen">
      {/* Founders Section */}
      <FoundersSection />

      {/* Divider */}
      {/* <PolymorphDivider variant="wave2" flip color="rgb(245, 239, 230)" /> */}
      <AnimatedPenDraw />
      {/* Mentors Section */}
      <MentorsSection />

      {/* Divider */}
      <DoubleStrokePenLine />
      

      {/* Final CTA Section */}
      <FinalCTASection />
    </main>

    <Footer />
    </>
  );
}
