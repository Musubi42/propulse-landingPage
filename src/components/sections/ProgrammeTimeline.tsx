'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FadeIn } from '@/components/animations/FadeIn';
import {
  Presentation,
  Users,
  BookOpen,
  Target,
  FileText,
  UserCheck,
} from 'lucide-react';

interface Phase {
  id: string;
  number: number;
  title: string;
  duration: string;
  brief: string;
  icon: React.ElementType;
  details: {
    description: string;
    activities: string[];
  };
  color: 'accent' | 'primary' | 'secondary';
}

const phases: Phase[] = [
  {
    id: 'phase-1',
    number: 1,
    title: 'Présentation des filières',
    duration: 'Septembre - Octobre',
    brief: '4 Masterclass de présentation des filières d&apos;excellence',
    icon: Presentation,
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
    icon: Users,
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
    icon: BookOpen,
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
    icon: Target,
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
    icon: FileText,
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
    icon: UserCheck,
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

const colorClasses = {
  accent: {
    border: 'border-accent',
    bg: 'bg-accent',
    text: 'text-accent',
    bgLight: 'bg-accent/10',
  },
  primary: {
    border: 'border-primary',
    bg: 'bg-primary',
    text: 'text-primary',
    bgLight: 'bg-primary/10',
  },
  secondary: {
    border: 'border-secondary',
    bg: 'bg-secondary',
    text: 'text-secondary',
    bgLight: 'bg-secondary/10',
  },
};

export function ProgrammeTimeline() {
  return (
    <div className="relative">
      {/* Vertical pen line connecting phases */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary to-secondary opacity-30 hidden md:block" />

      <Accordion type="single" collapsible className="space-y-6">
        {phases.map((phase, index) => {
          const Icon = phase.icon;
          const colors = colorClasses[phase.color];

          return (
            <FadeIn key={phase.id} delay={index * 0.1} direction="up">
              <AccordionItem
                value={phase.id}
                className={`border ${colors.border} rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300`}
              >
                <AccordionTrigger className="px-6 py-6 hover:no-underline group">
                  <div className="flex items-start gap-4 text-left w-full">
                    {/* Phase Number Badge */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center text-white font-bold text-lg shadow-md z-10`}
                    >
                      {phase.number}
                    </div>

                    {/* Phase Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {phase.title}
                        </h3>
                        <span
                          className={`text-sm font-semibold ${colors.text} ${colors.bgLight} px-3 py-1 rounded-full whitespace-nowrap w-fit`}
                        >
                          {phase.duration}
                        </span>
                      </div>
                      <p className="text-text-secondary">{phase.brief}</p>
                    </div>

                    {/* Icon */}
                    <div className="hidden lg:block flex-shrink-0">
                      <Icon className={`w-8 h-8 ${colors.text}`} />
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-6 pb-6">
                  <div className="pt-4 pl-16 space-y-4">
                    <p className="text-text-secondary leading-relaxed">
                      {phase.details.description}
                    </p>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <span
                          className={`w-1 h-5 ${colors.bg} rounded-full`}
                        />
                        Activités et contenus
                      </h4>
                      <ul className="space-y-2">
                        {phase.details.activities.map((activity, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-text-secondary"
                          >
                            <span
                              className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${colors.bg} mt-2`}
                            />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </FadeIn>
          );
        })}
      </Accordion>
    </div>
  );
}
