'use client';

/**
 * FullscreenTimeline Component
 *
 * Full-viewport horizontal timeline using GSAP ScrollTrigger
 * Vertical scroll = Horizontal timeline navigation
 * No page scroll - entire experience is the timeline
 */

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { cn } from '@/lib/utils';
import { TimelineDots } from './TimelineDots';
import { TimelinePenLine } from './TimelinePenLine';
import type { Phase } from './types';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

interface FullscreenTimelineProps {
  phases: Phase[];
  className?: string;
}

/**
 * FullscreenTimeline Component
 *
 * Creates a fullscreen horizontal timeline where vertical scroll
 * translates to horizontal phase navigation using GSAP ScrollTrigger
 */
export function FullscreenTimeline({ phases, className }: FullscreenTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [lineProgress, setLineProgress] = useState(0); // Continuous progress for line (0-1)
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!containerRef.current || !cardsRef.current) return;

    const container = containerRef.current;
    const cards = cardsRef.current;

    // Calculate total horizontal scroll distance
    const totalWidth = cards.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = totalWidth - viewportWidth;

    // Create GSAP horizontal scroll animation
    scrollTweenRef.current = gsap.to(cards, {
      x: -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${totalWidth}`, // Scroll distance = total width
        scrub: 0.5, // Smooth scrubbing (1 second lag)
        pin: true, // Pin the container
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Update current phase based on scroll progress
          const progress = self.progress;

          // Discrete phase for dots/UI
          const newPhase = Math.min(
            Math.floor(progress * phases.length),
            phases.length - 1
          );
          setCurrentPhase(newPhase);

          // Continuous progress for line (0-1, matches exact scroll position)
          setLineProgress(progress);
        },
      },
    });

    // Cleanup
    return () => {
      if (scrollTweenRef.current) {
        scrollTweenRef.current.scrollTrigger?.kill();
        scrollTweenRef.current.kill();
      }
    };
  }, [phases.length]);

  /**
   * Navigate to specific phase on dot click
   */
  const goToPhase = (index: number) => {
    if (!scrollTweenRef.current?.scrollTrigger) return;

    const progress = index / (phases.length - 1);
    const scrollTrigger = scrollTweenRef.current.scrollTrigger;

    // Calculate scroll position for this phase
    const targetScroll = scrollTrigger.start + (scrollTrigger.end - scrollTrigger.start) * progress;

    // Smooth scroll to target position
    gsap.to(window, {
      scrollTo: targetScroll,
      duration: 0.8,
      ease: 'power2.inOut',
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn('fullscreen-timeline relative h-screen w-full overflow-hidden', className)}
    >
      {/* Navigation Dots + Pen Line - Fixed position, below header (z-40, header is z-50) */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40">
        {/* Combined container ensures dots and line use same positioning */}
        <div className="relative">
          {/* Pen Line - BEHIND dots (z-0) */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-0">
            <TimelinePenLine
              totalPhases={phases.length}
              currentPhase={currentPhase}
              progress={lineProgress}
            />
          </div>

          {/* Dots - ABOVE line (z-10) */}
          <div className="relative z-10">
            <TimelineDots
              phases={phases}
              currentPhase={currentPhase}
              onDotClick={goToPhase}
            />
          </div>
        </div>
      </div>

      {/* Horizontal scrolling cards container */}
      <div
        ref={cardsRef}
        className="cards-container flex h-full items-center"
        style={{ width: `${phases.length * 100}vw` }}
      >
        {phases.map((phase, index) => {
          const Icon = typeof phase.icon === 'string' ? null : phase.icon;
          const colors = getColorClasses(phase.color);

          return (
            <div
              key={phase.id}
              className="phase-card h-full w-screen flex items-center justify-center px-8 md:px-16"
            >
              <div
                className={cn(
                  'card-content max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12',
                  'border-2 transition-all duration-300',
                  colors.border,
                  index === currentPhase && 'scale-105'
                )}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div
                    className={cn(
                      'w-14 h-14 rounded-full flex items-center justify-center',
                      'text-black font-bold text-xl shadow-md',
                      colors.bg
                    )}
                  >
                    {phase.number}
                  </div>
                  <span
                    className={cn(
                      'text-sm font-semibold px-4 py-2 rounded-full',
                      colors.text,
                      colors.bgLight
                    )}
                  >
                    {phase.duration}
                  </span>
                </div>

                {/* Icon + Title */}
                <div className="flex items-start gap-6 mb-6">
                  {Icon ? (
                    <Icon className={cn('w-14 h-14 flex-shrink-0', colors.text)} />
                  ) : typeof phase.icon === 'string' ? (
                    <span className="text-5xl">{phase.icon}</span>
                  ) : null}
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    {phase.title}
                  </h2>
                </div>

                {/* Brief */}
                <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                  {phase.brief}
                </p>

                {/* Details */}
                <div className="space-y-6">
                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-text-secondary leading-relaxed">
                      {phase.details.description}
                    </p>
                  </div>

                  {/* Activities */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <span className={cn('w-1 h-6 rounded-full', colors.bg)} />
                      Activités et contenus
                    </h3>
                    <ul className="space-y-3">
                      {phase.details.activities.map((activity, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-text-secondary"
                        >
                          <span
                            className={cn(
                              'flex-shrink-0 w-2 h-2 rounded-full mt-2',
                              colors.bg
                            )}
                          />
                          <span className="leading-relaxed">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress indicator - z-40 (below header z-50) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
          <span className="text-sm font-medium text-text-secondary">
            Phase {currentPhase + 1} / {phases.length}
          </span>
        </div>
      </div>

      {/* Scroll hint (only on first phase) */}
      {currentPhase === 0 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 animate-bounce">
          <div className="text-center text-sm text-text-secondary/70">
            <p>Faites défiler pour naviguer</p>
            <p className="text-xs mt-1">↓</p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Helper to get color classes for each phase
 */
function getColorClasses(color: Phase['color']) {
  const colorMap = {
    accent: {
      border: 'border-accent',
      bg: 'bg-accent',
      text: 'text-accent',
      bgLight: 'bg-accent/10',
    },
    primary: {
      border: 'border-primary',
      bg: 'bg-primary',
      text: 'text-primary',
      bgLight: 'bg-primary/10',
    },
    secondary: {
      border: 'border-secondary',
      bg: 'bg-secondary',
      text: 'text-secondary',
      bgLight: 'bg-secondary/10',
    },
  };

  return colorMap[color];
}
