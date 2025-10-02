'use client';

import { FadeIn, Counter } from '@/components/animations';
import { Linkedin, Users, Heart } from 'lucide-react';

export function SocialProofSection() {
  return (
    <section
      id="social-proof"
      className="py-20 bg-background-secondary"
    >
      <div className="container mx-auto px-4">
        <FadeIn direction="up" delay={0.1}>
          <div className="text-center mb-12">
            <p className="text-text-secondary font-medium mb-2">
              Un mouvement en marche
            </p>
            <h2 className="text-foreground">
              Déjà <span className="text-accent">50+ mentors</span> engagés
            </h2>
          </div>
        </FadeIn>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Mentors Stat */}
          <FadeIn direction="up" delay={0.2}>
            <div className="bg-background rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="text-5xl font-bold text-primary mb-2">
                <Counter end={50} suffix="+" duration={2} />
              </div>
              <p className="text-text-secondary font-medium">
                Mentors engagés
              </p>
              <p className="text-sm text-text-tertiary mt-2">
                Étudiants et alumni des Grandes Écoles
              </p>
            </div>
          </FadeIn>

          {/* LinkedIn Reactions */}
          <FadeIn direction="up" delay={0.4}>
            <div className="bg-background rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                   style={{ backgroundColor: 'rgb(10, 102, 194, 0.1)' }}>
                <Linkedin className="w-8 h-8" style={{ color: 'rgb(10, 102, 194)' }} />
              </div>
              <div className="text-5xl font-bold mb-2"
                   style={{ color: 'rgb(10, 102, 194)' }}>
                <Counter end={400} suffix="+" duration={2.5} />
              </div>
              <p className="text-text-secondary font-medium">
                Réactions LinkedIn
              </p>
              <p className="text-sm text-text-tertiary mt-2">
                Une communauté qui grandit
              </p>
            </div>
          </FadeIn>

          {/* Impact Stat */}
          <FadeIn direction="up" delay={0.6}>
            <div className="bg-background rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
                <Heart className="w-8 h-8 text-secondary" />
              </div>
              <div className="text-5xl font-bold text-secondary mb-2">
                100%
              </div>
              <p className="text-text-secondary font-medium">
                Gratuit & à distance
              </p>
              <p className="text-sm text-text-tertiary mt-2">
                Accessible à tous, partout en France
              </p>
            </div>
          </FadeIn>
        </div>

        {/* LinkedIn CTA */}
        <FadeIn direction="up" delay={0.8}>
          <div className="text-center mt-12">
            <a
              href="https://www.linkedin.com/company/propulse-association"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
              style={{
                borderColor: 'rgb(10, 102, 194)',
                color: 'rgb(10, 102, 194)',
              }}
            >
              <Linkedin className="w-5 h-5" />
              Suivre notre aventure sur LinkedIn
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
