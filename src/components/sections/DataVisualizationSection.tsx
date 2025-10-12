'use client';

import { FadeIn } from '@/components/animations';
import { GeographicInequalityChart } from '@/components/charts/GeographicInequalityChart';
import { GenderSegregationChart } from '@/components/charts/GenderSegregationChart';
import { SocialReproductionChart } from '@/components/charts/SocialReproductionChart';
import { BacProBarrierChart } from '@/components/charts/BacProBarrierChart';

/**
 * DataVisualizationSection - NEW Interactive charts using Chart.js
 * Shows educational inequality data through 4 detailed visualizations
 */
export function DataVisualizationSection() {
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
          {/* Chart 1a: Geographic Inequality */}
          <FadeIn direction="up" delay={0.3}>
          <SocialReproductionChart />

            {/* <GeographicInequalityChart /> */}
          </FadeIn>

          {/* Chart 1b: BAC Pro Barrier */}
          <FadeIn direction="up" delay={0.4}>
          <GeographicInequalityChart />

            {/* <BacProBarrierChart /> */}
          </FadeIn>

          {/* Chart 2: Social Reproduction */}
          <FadeIn direction="up" delay={0.5}>
            <GenderSegregationChart />

            {/* <SocialReproductionChart /> */}
          </FadeIn>

          {/* Chart 3: Gender Segregation */}
          <FadeIn direction="up" delay={0.6}>
            {/* <GenderSegregationChart /> */}
            <BacProBarrierChart />

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
