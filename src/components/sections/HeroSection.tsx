'use client';

import { FadeIn, PenLine, PenDrawnCircle } from '@/components/animations';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  const scrollToNext = () => {
    const nextSection = document.getElementById('social-proof');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative max-h-[70vh] flex items-center justify-center bg-[#EBE3D5]">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-b-2">
            <FadeIn direction="up" delay={0.1}>
              <div className="inline-block">
                <span className="inline-block py-2 bg-accent/10 text-accent font-medium rounded-full text-sm">
                  100% gratuit • 100% à distance
                </span>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <div>
                <h1 className="text-foreground leading-tight">
                  Propulse ton avenir vers les{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10">Grandes Écoles</span>
                    <div className="absolute -bottom-2 left-0 w-full">
                      <PenLine
                        variant="underline"
                        width={300}
                        color="rgb(217, 118, 66)"
                        delay={0.8}
                      />
                    </div>
                  </span>
                </h1>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <p className="text-xl text-text-secondary leading-relaxed max-w-xl">
                Un accompagnement gratuit et à distance pour les lycéens motivés.
                Rejoins un réseau de mentors étudiants et alumni des Grandes Écoles.
              </p>
            </FadeIn>

            {/* Fonce Tagline */}
            <FadeIn direction="up" delay={0.5}>
              <div className="pt-2">
                <p className="text-3xl md:text-4xl font-bold italic text-accent">
                  &ldquo;Fonce, tu en es capable !&rdquo;
                </p>
              </div>
            </FadeIn>

            {/* CTA Buttons */}
            <FadeIn direction="up" delay={0.7}>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Je suis lycéen
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Je deviens mentor
                </a>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.9}>
              <div className="pt-4">
                <a
                  href="#"
                  className="inline-flex items-center text-text-secondary hover:text-foreground transition-colors duration-300 font-medium"
                >
                  Je suis un lycée
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Visual Placeholder */}
          <FadeIn direction="right" delay={0.3}>
            <div className="relative">
              {/* Pen-Drawn Circle Container */}
              <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center">
                {/* Subtle glow effect behind */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl"></div>

                {/* Pen-drawn circle with Rough Notation: circle animates, then image fades in */}
                <PenDrawnCircle
                  size={450}
                  strokeWidth={3}
                  strokeColor="#3D3D3D"
                  animate={true}
                  animationDuration={2000}
                  padding={10}
                  className="drop-shadow-2xl"
                >
                  <div className="w-full h-full bg-background-secondary flex items-center justify-center">
                    <div className="text-center p-8">
                      <p className="text-6xl mb-4">📚</p>
                      <p className="text-text-secondary font-medium">
                        Image héros
                      </p>
                      <p className="text-sm text-text-tertiary mt-2">
                        (Photo lycéen/mentor)
                      </p>
                    </div>
                  </div>
                </PenDrawnCircle>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll Indicator */}
      <FadeIn delay={1.2}>
        <button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary hover:text-foreground transition-colors cursor-pointer group"
          aria-label="Scroll to next section"
        >
          <span className="text-sm font-medium">Découvrir</span>
          <ArrowDown className="w-6 h-6 animate-bounce" />
        </button>
      </FadeIn>
    </section>
  );
}
