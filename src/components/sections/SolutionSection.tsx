'use client';

import { useState } from 'react';
import { FadeIn, PenLine } from '@/components/animations';
import { Target, Calendar, Video, BookOpen, Award } from 'lucide-react';
import { FullscreenProgrammeOverlay } from '@/components/overlays/FullscreenProgrammeOverlay';
import { phases } from '@/data/phases';

export function SolutionSection() {
  const [isProgrammeOverlayOpen, setIsProgrammeOverlayOpen] = useState(false);

  const features = [
    {
      icon: Target,
      title: 'Mentorat personnalisé',
      description: `Un mentor étudiant ou alumni dédié pour t'accompagner tout au long de l'année`,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Calendar,
      title: 'Programme adapté',
      description: 'Un accompagnement qui s\'adapte à tes besoins : orientation, dossiers, concours, révisions',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      icon: Video,
      title: '100% à distance',
      description: 'Visios régulières, groupes WhatsApp, outils collaboratifs simples et intuitifs',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];

  return (
    <>
      {/* <PolymorphDivider variant="wave2" color="rgb(245, 239, 230)" /> */}

      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn direction="up" delay={0.1}>
              <div className="inline-block mb-4">
                <h2 className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full">
                  La Solution <span className="font-bold italic">Propulse!</span>
                </h2>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <span className="text-foreground mb-6 font-medium text-sm md:text-lg">
                Un accompagnement{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">complet et gratuit</span>
                  <div className="absolute -bottom-1 left-0 w-full">
                    {/* <PenLine
                      variant="underline"
                      width={410}
                      color="rgb(74, 107, 82)"
                      delay={0.6}
                    /> */}
                    <PenLine
                        variant="underline"
                        width={150}
                        height={40}
                        strokeWidth={2}
                        color="rgb(74, 107, 82)"
                        delay={0.8}
                        className="hidden xg:block"
                      />
                      <PenLine
                        variant="underline"
                        width={150}
                        height={15}
                        strokeWidth={2}
                        color="rgb(74, 107, 82)"
                        delay={0.8}
                        className="hidden lg:block"
                      />
                      {/* Tablet PenLine */}
                      <PenLine
                        variant="underline"
                        width={150}
                        height={15}
                        strokeWidth={2}
                        color="rgb(74, 107, 82)"
                        delay={0.8}
                        className="hidden md:block lg:hidden"
                      />
                      {/* Mobile PenLine */}
                      <PenLine
                        variant="underline"
                        width={118}
                        height={15}
                        strokeWidth={2}
                        color="rgb(74, 107, 82)"
                        delay={0.8}
                        className="md:hidden"
                      />
                  </div>
                </span>
              </span>
            </FadeIn>

            {/* <FadeIn direction="up" delay={0.3}>
              <p className="text-xl text-text-secondary leading-relaxed">
                Propulse connecte des lycéens motivés avec des mentors étudiants et alumni
                des Grandes Écoles, pour un mentorat sur-mesure et entièrement gratuit.
              </p>
            </FadeIn> */}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <FadeIn key={feature.title} direction="up" delay={0.4 + index * 0.1}>
                <div className="bg-background rounded-xl p-6 mb:p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`inline-flex p-4 rounded-xl ${feature.bgColor} mb-4 md:mb-6`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Bottom Features */}
          {/* TODO: A supprimer */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <FadeIn direction="up" delay={0.8}>
              <div className="flex items-start gap-4 bg-background rounded-xl p-6 shadow-md">
                <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">
                    Ressources partagées
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Accès aux meilleures ressources, fiches de révision et retours d&apos;expérience
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.9}>
              <div className="flex items-start gap-4 bg-background rounded-xl p-6 shadow-md">
                <div className="p-3 bg-secondary/10 rounded-lg flex-shrink-0">
                  <Award className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">
                    Réseau d&apos;entraide
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Rejoins une communauté de lycéens motivés et de mentors bienveillants
                  </p>
                </div>
              </div>
            </FadeIn>
          </div> */}

          {/* CTA to Programme Modal */}
          <FadeIn direction="up" delay={1}>
            <div className="text-center">
              <button
                onClick={() => setIsProgrammeOverlayOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Découvrir le programme complet
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
              <p className="text-sm text-text-tertiary mt-4">
                6 phases, de septembre à juin
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Programme Fullscreen Overlay */}
        <FullscreenProgrammeOverlay
          open={isProgrammeOverlayOpen}
          onOpenChange={setIsProgrammeOverlayOpen}
          phases={phases}
        />
      </section>
    </>
  );
}
