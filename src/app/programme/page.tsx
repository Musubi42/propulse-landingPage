import type { Metadata } from 'next';
import { FullscreenTimeline } from '@/components/timeline/FullscreenTimeline';
import { programSchema } from '@/lib/structuredData';
import type { Phase } from '@/components/timeline';

// Phase data for the timeline
const phases: Phase[] = [
  {
    id: 'phase-1',
    number: 1,
    title: 'Présentation des filières',
    duration: 'Septembre - Octobre',
    brief: `4 Masterclass de présentation des filières d'excellence`,
    icon: '📊',
    color: 'accent',
    details: {
      description:
        `Découvrez les différentes filières d'excellence à travers 4 masterclass interactives animées par des étudiants et diplômés.`,
      activities: [
        `Études de droit : 1 heure de session`,
        `École d'ingénieur : 1 heure de session`,
        `École de commerce : 1 heure de session`,
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
    brief: `Mentorat individuel avec un étudiant de votre filière d'intérêt`,
    icon: '👥',
    color: 'primary',
    details: {
      description:
        `Un accompagnement sur-mesure avec un mentor dédié qui vous guide tout au long de votre parcours d'orientation.`,
      activities: [
        `Attribution d'un mentor personnalisé selon votre profil`,
        `6 à 10 séances individuelles sur l'année`,
        `Chaque séance : 1h à 2h en visioconférence`,
        'Thématiques : orientation, CV, lettres de motivation, préparation concours',
        `Conseils sur la vie étudiante et l'intégration`,
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
        `Cours de méthodologie adaptés à votre filière`,
        `Entraînements réguliers aux types d'épreuves`,
        `Suivi personnalisé de vos progrès`,
        `Groupes de travail collaboratifs avec d'autres lycéens`,
        `Ressources pédagogiques en ligne disponibles 24/7`,
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
        `Simulations d'examens blancs en conditions réelles`,
        `Techniques de gestion du stress et de la pression`,
        `Stratégies de réussite spécifiques par type de concours`,
        `Coaching individuel intensif avec votre mentor`,
        `Analyse détaillée de vos performances et axes d'amélioration`,
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
        `Rédaction et optimisation des lettres de motivation`,
        `Mise en valeur de votre CV et de votre dossier`,
        `Préparation méthodique aux entretiens oraux`,
        `Simulations d'entretiens avec feedback détaillé`,
        `Stratégies pour gérer le stress le jour J`,
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
       `Nous restons à vos côtés après votre admission pour assurer une transition réussie vers l'enseignement supérieur`,
      activities: [
        `Aide aux démarches administratives (logement, bourses, inscription)`,
        `Préparation à la rentrée et aux premiers cours`,
        `Mise en relation avec le réseau alumni Propulse`,
        `Suivi des premiers mois d'études`,
        `Conseils pour réussir votre intégration`,
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

      {/* Fullscreen horizontal scroll timeline */}
      <FullscreenTimeline phases={phases} />
    </>
  );
}
