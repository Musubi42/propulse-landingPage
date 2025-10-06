'use client';

import { FadeIn } from '@/components/animations';
import { GeographicDistributionChart } from '@/components/legacy-charts/GeographicDistributionChart';
import { SocialOriginChart } from '@/components/legacy-charts/SocialOriginChart';
import { GenderEvolutionChart } from '@/components/legacy-charts/GenderEvolutionChart';

/**
 * LegacyStatisticsSection - OLD Interactive charts using Recharts
 * Replaced by new DataVisualizationSection using Chart.js
 */
export function LegacyStatisticsSection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn direction="up" delay={0.1}>
            <h2 className="text-foreground mb-6">
              Le <span className="text-accent">Problème</span> en chiffres
            </h2>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-xl text-text-secondary leading-relaxed">
              L&apos;accès aux Grandes Écoles reste fortement inégalitaire en France.
              Les disparités géographiques, sociales et de genre persistent.
            </p>
          </FadeIn>
        </div>

        {/* Charts Grid */}
        <div className="space-y-12 max-w-6xl mx-auto">
          {/* Chart 1: Geographic Distribution */}
          <FadeIn direction="up" delay={0.3}>
            <GeographicDistributionChart />
          </FadeIn>

          {/* Chart 2: Social Origin */}
          <FadeIn direction="up" delay={0.4}>
            <SocialOriginChart />
          </FadeIn>

          {/* Chart 3: Gender Evolution */}
          <FadeIn direction="up" delay={0.5}>
            <GenderEvolutionChart />
          </FadeIn>
        </div>

        {/* Call to Action */}
        <FadeIn direction="up" delay={0.8}>
          <div className="text-center bg-background-secondary rounded-2xl p-8 md:p-12 max-w-4xl mx-auto mt-16">
            <h3 className="text-foreground mb-4">
              Ces inégalités ne sont{' '}
              <span className="text-accent font-bold">pas une fatalité</span>
            </h3>
            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
              Le manque d&apos;information et de réseau est le principal frein.
              C&apos;est là que <strong className="text-primary">Propulse intervient</strong>.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
