'use client';

import { FadeIn, ScaleIn, Counter, PenUnderline } from '@/components/animations';
import { MapPin, Users2, GraduationCap } from 'lucide-react';

export function StatisticsSection() {
  return (
    <>
      {/* <PolymorphDivider variant="wave1" color="rgb(250, 246, 240)" /> */}

      <section className="py-20 bg-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>

        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn direction="up" delay={0.1}>
              <h2 className="text-foreground mb-6">
                Le <span className="text-accent">Problème</span>
              </h2>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <p className="text-xl text-text-secondary leading-relaxed">
                L&apos;accès aux Grandes Écoles reste fortement inégalitaire en France.
                Les disparités géographiques, sociales et de genre persistent.
              </p>
            </FadeIn>
          </div>

          {/* Main Statistics Grid - 3 Stats per PRD */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
            {/* Stat 1: Geographic Inequality */}
            <ScaleIn delay={0.3}>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-accent/10 rounded-full">
                    <MapPin className="w-8 h-8 text-accent" />
                  </div>
                </div>
                <div className="text-5xl md:text-6xl font-bold text-accent mb-3">
                  1/3
                </div>
                <p className="text-text-secondary font-semibold mb-3 text-lg">
                  des élèves de prépa
                </p>
                <p className="text-sm text-text-tertiary leading-relaxed">
                  viennent d&apos;<strong>Île-de-France</strong>
                  <br />
                  <span className="text-xs">(qui ne représente qu&apos;1/6 de la population)</span>
                </p>
              </div>
            </ScaleIn>

            {/* Stat 2: Social Inequality */}
            <ScaleIn delay={0.4}>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Users2 className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-3">
                  7-10×
                </div>
                <p className="text-text-secondary font-semibold mb-3 text-lg">
                  moins de chances
                </p>
                <p className="text-sm text-text-tertiary leading-relaxed">
                  pour un <strong>enfant d&apos;ouvrier</strong> d&apos;intégrer une Grande École
                </p>
              </div>
            </ScaleIn>

            {/* Stat 3: Self-Censorship */}
            <ScaleIn delay={0.5}>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-secondary/10 rounded-full">
                    <GraduationCap className="w-8 h-8 text-secondary" />
                  </div>
                </div>
                <div className="text-5xl md:text-6xl font-bold text-secondary mb-3">
                  <Counter end={60} suffix="%" duration={2.5} />
                </div>
                <p className="text-text-secondary font-semibold mb-3 text-lg">
                  ne se sentent pas capables
                </p>
                <p className="text-sm text-text-tertiary leading-relaxed">
                  des jeunes de <strong>milieux ruraux défavorisés</strong> d&apos;obtenir une licence
                </p>
              </div>
            </ScaleIn>
          </div>

          {/* Call to Action */}
          <FadeIn direction="up" delay={0.8}>
            <div className="text-center bg-background-secondary rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
              <h3 className="text-foreground mb-4">
                Ces inégalités ne sont{' '}
                <PenUnderline color="#D97642" delay={1.2} strokeWidth={3} padding={-2}>
                  <span className="text-accent">pas une fatalité</span>
                </PenUnderline>
              </h3>
              <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
                Le manque d&apos;information et de réseau est le principal frein.
                C&apos;est là que <strong className="text-primary">Propulse intervient</strong>.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
