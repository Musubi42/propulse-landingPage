'use client';

import { FadeIn, ScaleIn, PolymorphDivider, PenLine } from '@/components/animations';
import { Quote } from 'lucide-react';

export function FoundersSection() {
  const founders = [
    {
      name: 'Arthur Costa',
      education: 'EDHEC & Dauphine',
      story: `Originaire de province, j'ai connu les difficultés d'orientation face aux Grandes Écoles. Le manque d'information et de réseau m'a fait perdre du temps. Aujourd'hui à l'EDHEC et Dauphine, je veux que chaque lycéen motivé ait les clés en main.`,
      emoji: '🎓',
      color: 'primary',
    },
    {
      name: 'Hugo Nicaise',
      education: 'EDHEC',
      story: `Passé par une prépa HEC, j'ai mesuré l'importance du mentorat et du réseau. Trop de talents sont freinés par des barrières invisibles. Propulse, c'est notre manière de rendre ce qu'on a reçu et de démocratiser l'accès aux opportunités.`,
      emoji: '🚀',
      color: 'secondary',
    },
  ];

  return (
    <>
      <PolymorphDivider variant="wave1" flip color="rgb(250, 246, 240)" />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn direction="up" delay={0.1}>
              <h2 className="text-foreground mb-6">
                L&apos;histoire derrière{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">Propulse</span>
                  <div className="absolute -bottom-2 left-0 w-full">
                    <PenLine
                      variant="underline"
                      width={180}
                      color="rgb(217, 118, 66)"
                      delay={0.5}
                    />
                  </div>
                </span>
              </h2>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <p className="text-xl text-text-secondary leading-relaxed">
                Deux étudiants qui ont vécu les inégalités d&apos;accès aux Grandes Écoles
                et qui ont décidé d&apos;agir.
              </p>
            </FadeIn>
          </div>

          {/* Founders Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            {founders.map((founder, index) => (
              <ScaleIn key={founder.name} delay={0.3 + index * 0.2}>
                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                  {/* Decorative element */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-${founder.color}/5 rounded-full blur-2xl`}></div>

                  {/* Quote icon */}
                  <div className="relative mb-6">
                    <Quote className={`w-10 h-10 text-${founder.color} opacity-20`} />
                  </div>

                  {/* Founder Photo Placeholder */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-full bg-background-secondary flex items-center justify-center text-4xl border-4 border-white shadow-lg mx-auto">
                      {founder.emoji}
                    </div>
                  </div>

                  {/* Story */}
                  <div className="relative">
                    <p className="text-text-secondary leading-relaxed mb-6 italic">
                      &ldquo;{founder.story}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="text-center pt-4 border-t border-border">
                      <p className="font-bold text-foreground text-lg">
                        {founder.name}
                      </p>
                      <p className="text-sm text-text-tertiary">
                        {founder.education}
                      </p>
                    </div>
                  </div>
                </div>
              </ScaleIn>
            ))}
          </div>

          {/* Mission Statement */}
          <FadeIn direction="up" delay={0.7}>
            <div className="bg-primary/5 border-l-4 border-primary rounded-xl p-8 md:p-12 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-4 text-center">
                Notre mission
              </h3>
              <p className="text-lg text-text-secondary leading-relaxed text-center">
                Démocratiser l&apos;accès aux Grandes Écoles en comblant les inégalités
                <strong className="text-primary"> géographiques, sociales et de genre</strong>.
                Un lycéen motivé à la fois, un mentor bienveillant à la fois.
              </p>
            </div>
          </FadeIn>

          {/* Contact */}
          <FadeIn direction="up" delay={0.9}>
            <div className="text-center mt-12">
              <p className="text-text-secondary mb-4">
                Une question ? Besoin d&apos;échanger ?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="mailto:propulse.association@gmail.com"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  propulse.association@gmail.com
                </a>
                <span className="hidden sm:inline text-text-tertiary">•</span>
                <div className="flex gap-4">
                  <span className="text-text-secondary">
                    Arthur: <a href="tel:+33769977242" className="text-primary hover:underline">07 69 97 72 42</a>
                  </span>
                  <span className="text-text-secondary">
                    Hugo: <a href="tel:+33762542918" className="text-primary hover:underline">07 62 54 29 18</a>
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
