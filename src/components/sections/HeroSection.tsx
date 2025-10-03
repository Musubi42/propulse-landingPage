'use client';

import { FadeIn, PenLine, PenDrawnCircle, PenUnderline } from '@/components/animations';
import { ArrowDown, GraduationCap, Users, Building2 } from 'lucide-react';
import Image from 'next/image';

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
              <div className="mt-20">
                <p className="text-3xl md:text-4xl font-bold italic text-accent">
                  &ldquo;<PenUnderline color="#D97642" delay={1.4} strokeWidth={3}>Fonce</PenUnderline>, tu en es capable !&rdquo;
                </p>
              </div>
            </FadeIn>

            {/* CTA Buttons - Three Equal Audience Options */}
            <FadeIn direction="up" delay={0.7}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                {/* Lycéen CTA - Blue */}
                <a
                  href="#"
                  className="group relative inline-flex flex-col items-center justify-center px-6 py-5 bg-[rgb(var(--lyceen-primary))] text-white font-semibold rounded-xl hover:bg-[rgb(var(--lyceen-hover))] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden"
                >
                  <GraduationCap className="w-8 h-8 mb-2" />
                  <span className="text-lg">Lycéen</span>
                  <span className="text-sm font-normal opacity-90 mt-1">Je m&apos;inscris</span>
                </a>

                {/* Mentor CTA - Orange */}
                <a
                  href="#"
                  className="group relative inline-flex flex-col items-center justify-center px-6 py-5 bg-[rgb(var(--mentor-primary))] text-white font-semibold rounded-xl hover:bg-[rgb(var(--mentor-hover))] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden"
                >
                  <Users className="w-8 h-8 mb-2" />
                  <span className="text-lg">Mentor</span>
                  <span className="text-sm font-normal opacity-90 mt-1">Je participe</span>
                </a>

                {/* Lycée CTA - Green */}
                <a
                  href="#"
                  className="group relative inline-flex flex-col items-center justify-center px-6 py-5 bg-[rgb(var(--lycee-primary))] text-white font-semibold rounded-xl hover:bg-[rgb(var(--lycee-hover))] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden sm:col-span-2 lg:col-span-1"
                >
                  <Building2 className="w-8 h-8 mb-2" />
                  <span className="text-lg">Lycée</span>
                  <span className="text-sm font-normal opacity-90 mt-1">Partenariat</span>
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
                  <Image
                    src="/images/placeholders/hero.jpg"
                    alt="Mentor et lycéen travaillant ensemble - Propulse Association"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </PenDrawnCircle>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <FadeIn delay={1.2}>
        <button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary hover:text-foreground transition-colors cursor-pointer group"
          aria-label="Scroll to next section"
        >
          <span className="text-sm font-medium">Découvrir</span>
          <ArrowDown className="w-6 h-6 animate-bounce" />
        </button>
      </FadeIn> */}
    </section>
  );
}
