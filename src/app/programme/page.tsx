import type { Metadata } from 'next';
import { ProgrammeTimeline } from '@/components/sections/ProgrammeTimeline';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { programSchema } from '@/lib/structuredData';

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
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Notre méthode d&apos;accompagnement
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg max-w-3xl">
              <p className="text-xl font-semibold text-accent mb-2">
                Un accompagnement entièrement gratuit
              </p>
              <p className="text-text-secondary leading-relaxed">
                Chez Propulse, nous croyons que l&apos;excellence ne doit pas
                être réservée à ceux qui en ont les moyens. Notre programme est
                100% gratuit et 100% à distance.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <FadeIn delay={0.3}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-center">
              Les 6 phases du programme
            </h2>
            <p className="text-lg text-text-secondary text-center mb-12 max-w-3xl mx-auto">
              Un accompagnement structuré tout au long de l&apos;année pour
              maximiser vos chances de réussite et vous guider vers les Grandes
              Écoles.
            </p>
          </FadeIn>

          <ProgrammeTimeline />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Prêt à commencer votre parcours ?
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Rejoignez Propulse et bénéficiez d&apos;un accompagnement
              personnalisé pour réaliser votre projet d&apos;études
              supérieures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://forms.gle/your-student-form"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white w-full sm:w-auto"
                >
                  Je suis lycéen
                </Button>
              </Link>
              <Link href="/#contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Nous contacter
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
    </>
  );
}
