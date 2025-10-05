'use client';

import { FadeIn, PenLine, PenDrawnCircle, PenUnderline } from '@/components/animations';
import { TriadCTAButtons } from '@/components/ui/TriadCTAButtons';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  const scrollToNext = () => {
    const nextSection = document.getElementById('social-proof');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#EBE3D5] pt-20 lg:pt-0">
      {/* Mobile & Tablet: Image at top (50vh) */}
      <div className="lg:hidden w-full h-auto relative">
        <FadeIn direction="down" delay={0.2}>
          <div className="relative inset-0 flex items-center justify-center">
            <div className="relative w-auto h-auto md:w-[350px] md:h-[350px]">
              {/* Subtle glow effect behind */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl"></div>

              {/* Pen-drawn circle */}
              <PenDrawnCircle
                size={350}
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
                  sizes="90vw"
                  priority
                />
              </PenDrawnCircle>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-4 md:space-y-6">
            <FadeIn direction="up" delay={0.1}>
              <div className="inline-block">
                <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-accent/10 text-accent font-medium rounded-full text-xs md:text-sm">
                  100% gratuit • 100% à distance
                </span>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                  Propulse ton avenir vers les{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10">Grandes Écoles</span>
                    <div className="absolute -bottom-1 md:-bottom-2 left-0 w-full">
                      {/* Desktop PenLine */}
                      <PenLine
                        variant="underline"
                        width={430}
                        height={40}
                        strokeWidth={2}
                        color="rgb(217, 118, 66)"
                        delay={0.8}
                        className="hidden xl:block"
                      />
                      <PenLine
                        variant="underline"
                        width={340}
                        height={40}
                        strokeWidth={2}
                        color="rgb(217, 118, 66)"
                        delay={0.8}
                        className="hidden lg:block xl:hidden"
                      />
                      {/* Tablet PenLine */}
                      <PenLine
                        variant="underline"
                        width={260}
                        height={30}
                        strokeWidth={2}
                        color="rgb(217, 118, 66)"
                        delay={0.8}
                        className="hidden md:block lg:hidden"
                      />
                      {/* Mobile PenLine */}
                      <PenLine
                        variant="underline"
                        width={217}
                        height={20}
                        strokeWidth={2}
                        color="rgb(217, 118, 66)"
                        delay={0.8}
                        className="md:hidden"
                      />
                    </div>
                  </span>
                </h1>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <p className="text-sm md:text-base lg:text-lg text-text-secondary leading-relaxed max-w-xl">
                Un accompagnement gratuit et à distance pour les lycéens motivés.
                Rejoins un réseau de mentors étudiants et alumni des Grandes Écoles.
              </p>
            </FadeIn>

            {/* Fonce Tagline - Mobile: one line */}
            <FadeIn direction="up" delay={0.5}>
              <div className="mt-4 md:mt-8 lg:mt-12">
                <p className="text-base md:text-2xl lg:text-3xl xl:text-4xl font-bold italic text-accent">
                  &ldquo;<PenUnderline color="#D97642" delay={1.4} strokeWidth={2} padding={-4}>Fonce</PenUnderline>, tu en es capable !&rdquo;
                </p>
              </div>
            </FadeIn>

            {/* CTA Buttons */}
            <TriadCTAButtons delay={0.7} />
          </div>

          {/* Desktop: Image on right */}
          <FadeIn direction="right" delay={0.3}>
            <div className="relative hidden lg:block">
              <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center">
                {/* Subtle glow effect behind */}
                <div className="relative inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl"></div>

                {/* Pen-drawn circle */}
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
                    sizes="50vw"
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
