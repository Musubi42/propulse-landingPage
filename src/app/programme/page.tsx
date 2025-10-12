import type { Metadata } from 'next';
import { ProgrammeTimeline } from '@/components/sections/ProgrammeTimeline';
import { programSchema } from '@/lib/structuredData';
import { phases } from '@/data/phases';

export const metadata: Metadata = {
  title: 'Le Programme | Propulse',
  description:
    'Découvrez le programme de mentorat Propulse : 6 phases pour accompagner les lycéens vers les Grandes Écoles. Un accompagnement entièrement gratuit.',
  keywords: [
    'programme mentorat',
    'grandes écoles',
    'orientation lycéens',
    'accompagnement gratuit',
    'classe préparatoire',
  ],
  alternates: {
    canonical: 'https://propulse-association.fr/programme',
  },
};

export default function ProgrammePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(programSchema),
        }}
      />

      {/* Programme page with accordion timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Le Programme Propulse : Mentorat Gratuit pour Lycéens
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              Un accompagnement personnalisé en 6 phases, de septembre à juin, pour vous préparer aux concours des Grandes Écoles. 100% gratuit, 100% à distance.
            </p>
          </div>

          {/* Accordion Timeline */}
          <div className="max-w-4xl mx-auto">
            <ProgrammeTimeline phases={phases} />
          </div>
        </div>
      </section>
    </>
  );
}
