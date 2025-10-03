import type { Metadata } from 'next';
import { HorizontalTimeline } from '@/components/timeline';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { programSchema } from '@/lib/structuredData';
import type { Phase } from '@/components/timeline';

// Phase data for the timeline
const phases: Phase[] = [
  {
    id: 'phase-1',
    number: 1,
    title: 'Présentation des filières',
    duration: 'Septembre - Octobre',
    brief: '4 Masterclass de présentation des filières d&apos;excellence',
    icon: '📊',
    color: 'accent',
    details: {
      description:
        'Découvrez les différentes filières d&apos;excellence à travers 4 masterclass interactives animées par des étudiants et diplômés.',
      activities: [
        'Études de droit : 1 heure de session',
        'École d&apos;ingénieur : 1 heure de session',
        'École de commerce : 1 heure de session',
        'Sciences Politiques : 1 heure de session',
        'Questions, réponses, échanges et découverte de la filière',
      ],
    },
  },
  {
    id: 'phase-2',
    number: 2,
    title: 'Accompagnement personnalisé',
    duration: 'Novembre - Juin',
    brief: 'Mentorat individuel avec un étudiant de votre filière d&apos;intérêt',
    icon: '👥',
    color: 'primary',
    details: {
      description:
        'Un accompagnement sur-mesure avec un mentor dédié qui vous guide tout au long de votre parcours d&apos;orientation.',
      activities: [
        'Attribution d&apos;un mentor personnalisé selon votre profil',
        '6 à 10 séances individuelles sur l&apos;année',
        'Chaque séance : 1h à 2h en visioconférence',
        'Thématiques : orientation, CV, lettres de motivation, préparation concours',
        'Conseils sur la vie étudiante et l&apos;intégration',
      ],
    },
  },
  {
    id: 'phase-3',
    number: 3,
    title: 'Préparation académique',
    duration: '3 mois',
    brief: 'Renforcement des compétences clés pour réussir',
    icon: '📚',
    color: 'secondary',
    details: {
      description:
        'Développez les compétences essentielles pour exceller dans les concours et votre future formation.',
      activities: [
        'Cours de méthodologie adaptés à votre filière',
        'Entraînements réguliers aux types d&apos;épreuves',
        'Suivi personnalisé de vos progrès',
        'Groupes de travail collaboratifs avec d&apos;autres lycéens',
        'Ressources pédagogiques en ligne disponibles 24/7',
      ],
    },
  },
  {
    id: 'phase-4',
    number: 4,
    title: 'Préparation aux concours',
    duration: '2 mois',
    brief: 'Entraînement intensif et stratégies de réussite',
    icon: '🎯',
    color: 'accent',
    details: {
      description:
        'Un accompagnement intensif pour vous préparer aux concours avec confiance et méthode.',
      activities: [
        'Simulations d&apos;examens blancs en conditions réelles',
        'Techniques de gestion du stress et de la pression',
        'Stratégies de réussite spécifiques par type de concours',
        'Coaching individuel intensif avec votre mentor',
        'Analyse détaillée de vos performances et axes d&apos;amélioration',
      ],
    },
  },
  {
    id: 'phase-5',
    number: 5,
    title: 'Candidatures et entretiens',
    duration: '1 mois',
    brief: 'Optimisation des dossiers et préparation orale',
    icon: '📝',
    color: 'primary',
    details: {
      description:
        'Maximisez vos chances avec des candidatures impactantes et une préparation approfondie aux entretiens.',
      activities: [
        'Rédaction et optimisation des lettres de motivation',
        'Mise en valeur de votre CV et de votre dossier',
        'Préparation méthodique aux entretiens oraux',
        'Simulations d&apos;entretiens avec feedback détaillé',
        'Stratégies pour gérer le stress le jour J',
      ],
    },
  },
  {
    id: 'phase-6',
    number: 6,
    title: 'Suivi post-admission',
    duration: '3 mois',
    brief: 'Accompagnement dans la transition vers vos études',
    icon: '✅',
    color: 'secondary',
    details: {
      description:
        'Nous restons à vos côtés après votre admission pour assurer une transition réussie vers l&apos;enseignement supérieur.',
      activities: [
        'Aide aux démarches administratives (logement, bourses, inscription)',
        'Préparation à la rentrée et aux premiers cours',
        'Mise en relation avec le réseau alumni Propulse',
        'Suivi des premiers mois d&apos;études',
        'Conseils pour réussir votre intégration',
      ],
    },
  },
];

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
        {/* <section className="relative bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
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
      </section> */}

      {/* Timeline Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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

          <HorizontalTimeline phases={phases} defaultPhase={0} />
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
