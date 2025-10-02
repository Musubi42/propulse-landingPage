'use client';

import { FadeIn, ScaleIn, Counter, PolymorphDivider } from '@/components/animations';
import { TrendingDown, MapPin, Users2, GraduationCap } from 'lucide-react';

export function StatisticsSection() {
  return (
    <>
      <PolymorphDivider variant="wave1" color="rgb(250, 246, 240)" />

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

          {/* Main Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Geographic Inequality */}
            <ScaleIn delay={0.3}>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-accent">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <TrendingDown className="w-5 h-5 text-accent" />
                </div>
                <div className="text-4xl font-bold text-accent mb-2">
                  <Counter end={70} suffix="%" duration={2.5} />
                </div>
                <p className="text-text-secondary font-semibold mb-2">
                  des étudiants
                </p>
                <p className="text-sm text-text-tertiary leading-relaxed">
                  viennent de <strong>3 académies</strong> seulement (Paris, Versailles, Lyon)
                </p>
              </div>
            </ScaleIn>

            {/* Social Inequality */}
            <ScaleIn delay={0.4}>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-primary">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Users2 className="w-6 h-6 text-primary" />
                  </div>
                  <TrendingDown className="w-5 h-5 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  <Counter end={8} suffix="%" duration={2.5} />
                </div>
                <p className="text-text-secondary font-semibold mb-2">
                  d&apos;enfants d&apos;ouvriers
                </p>
                <p className="text-sm text-text-tertiary leading-relaxed">
                  dans les Grandes Écoles, contre <strong>54% de cadres supérieurs</strong>
                </p>
              </div>
            </ScaleIn>

            {/* Gender Gap */}
            <ScaleIn delay={0.5}>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-secondary">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-secondary" />
                  </div>
                  <TrendingDown className="w-5 h-5 text-secondary" />
                </div>
                <div className="text-4xl font-bold text-secondary mb-2">
                  <Counter end={30} suffix="%" duration={2.5} />
                </div>
                <p className="text-text-secondary font-semibold mb-2">
                  de femmes
                </p>
                <p className="text-sm text-text-tertiary leading-relaxed">
                  dans les écoles d&apos;ingénieurs, une <strong>sous-représentation persistante</strong>
                </p>
              </div>
            </ScaleIn>

            {/* Information Gap */}
            <ScaleIn delay={0.6}>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-accent">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <TrendingDown className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-accent mb-2">
                  <Counter end={60} suffix="%" duration={2.5} />
                </div>
                <p className="text-text-secondary font-semibold mb-2">
                  manquent d&apos;informations
                </p>
                <p className="text-sm text-text-tertiary leading-relaxed">
                  sur les voies d&apos;accès et les <strong>possibilités de bourses</strong>
                </p>
              </div>
            </ScaleIn>
          </div>

          {/* Call to Action */}
          <FadeIn direction="up" delay={0.8}>
            <div className="text-center bg-background-secondary rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
              <h3 className="text-foreground mb-4">
                Ces inégalités ne sont <span className="text-accent">pas une fatalité</span>
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
