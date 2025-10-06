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
  const isProgrammaticScrollRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || !cardsRef.current) return;

    const container = containerRef.current;
    const cards = cardsRef.current;

    // Calculate total horizontal scroll distance
    const totalWidth = cards.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = totalWidth - viewportWidth;

    // Create GSAP horizontal scroll animation with built-in snap
    scrollTweenRef.current = gsap.to(cards, {
      x: -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${totalWidth}`, // Scroll distance = total width
        scrub: 1, // Smooth scrubbing - required for snap to work properly
        pin: true, // Pin the container
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // GSAP's built-in snap feature - velocity-based, instant response
        snap: {
          snapTo: (progress: number) => {
            // Don't snap during programmatic navigation (dot clicks)
            if (isProgrammaticScrollRef.current) {
              return progress; // Return current progress = no snap
            }
            // Normal snap behavior: snap to nearest card center
            const snapValue = 1 / (phases.length - 1);
            return Math.round(progress / snapValue) * snapValue;
          },
          duration: { min: 0.2, max: 0.5 }, // Adaptive duration based on distance
          delay: 0.05, // Very responsive - starts snap 50ms after scroll stops
          ease: 'power2.inOut',
        },
        onUpdate: (self) => {
          // Update current phase based on scroll progress
          const progress = self.progress;

          // Discrete phase for dots/UI
          // Convert progress (0-1) to phase index using centered formula
          const exactPhaseIndex = progress * (phases.length - 1);
          const newPhase = Math.min(
            Math.round(exactPhaseIndex), // Round to nearest for centered cards
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

    const scrollTrigger = scrollTweenRef.current.scrollTrigger;

    // Calculate progress to center the card
    // Progress formula: index / (phases.length - 1)
    // This ensures: phase 0 = 0%, last phase = 100%
    const progress = phases.length === 1 ? 0 : index / (phases.length - 1);

    // Calculate scroll position for this phase
    const scrollDistance = scrollTrigger.end - scrollTrigger.start;
    const targetScroll = scrollTrigger.start + scrollDistance * progress;

    // Set flag to prevent snap during programmatic navigation
    isProgrammaticScrollRef.current = true;

    // Smooth scroll to target position
    gsap.to(window, {
      scrollTo: targetScroll,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        // Re-enable snap after a short delay (allow scroll to fully settle)
        setTimeout(() => {
          isProgrammaticScrollRef.current = false;
        }, 100);
      },
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn('fullscreen-timeline -top-[80px] relative h-screen w-full overflow-hidden', className)}
    >
      <div className="fixed top-24 md:top-24 left-1/2 -translate-x-1/2 z-40 scale-75 md:scale-90 lg:scale-100">
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-10">
            <TimelinePenLine
              totalPhases={phases.length}
              currentPhase={currentPhase}
              progress={lineProgress}
            />
          </div>

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
              className="phase-card h-full w-screen flex items-center justify-center px-4 md:px-8 lg:px-16"
            >
              <div
                className={cn(
                  'card-content max-w-3xl w-full bg-white rounded-xl md:rounded-2xl shadow-2xl',
                  'p-5 md:p-8 lg:p-5 border-2 transition-all duration-300',
                  colors.border,
                  index === currentPhase && 'md:scale-105'
                )}
              >
                {/* Header - Responsive badge and duration */}
                <div className="flex items-start justify-between gap-3 md:gap-4 mb-4 md:mb-6">
                  <div
                    className={cn(
                      'w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full',
                      'flex items-center justify-center text-black font-bold',
                      'text-base md:text-lg lg:text-xl shadow-md',
                      colors.bg
                    )}
                  >
                    {phase.number}
                  </div>
                  <span
                    className={cn(
                      'text-xs md:text-sm font-semibold px-3 md:px-4 py-1.5 md:py-2 rounded-full',
                      colors.text,
                      colors.bgLight
                    )}
                  >
                    {phase.duration}
                  </span>
                </div>

                {/* Icon + Title - Responsive layout */}
                <div className="flex items-start gap-3 md:gap-4 lg:gap-6 mb-2 md:mb-4">
                  {Icon ? (
                    <Icon className={cn('w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12 flex-shrink-0', colors.text)} />
                  ) : typeof phase.icon === 'string' ? (
                    <span className="text-2xl md:text-3xl lg:text-4xl">{phase.icon}</span>
                  ) : null}
                  <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-foreground leading-tight">
                    {phase.title}
                  </h2>
                </div>

                {/* Brief - Responsive text */}
                <p className="text-sm md:text-base lg:text-md text-text-secondary mb-2 md:mb-3 lg:mb-4 leading-relaxed">
                  {phase.brief}
                </p>

                {/* Details - Responsive spacing and text */}
                <div className="space-y-4 md:space-y-5 lg:space-y-3">
                  <div className="pt-4 md:pt-5 lg:pt-6 border-t border-gray-200">
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {phase.details.description}
                    </p>
                  </div>

                  {/* Activities - Responsive spacing */}
                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-foreground mb-3 md:mb-4 flex items-center gap-2">
                      <span className={cn('w-1 h-5 md:h-6 rounded-full', colors.bg)} />
                      Activités et contenus
                    </h3>
                    <ul className="space-y-2 md:space-y-2.5 lg:space-y-3">
                      {phase.details.activities.map((activity, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-0 md:gap-3 text-sm md:text-sm text-text-secondary"
                        >
                          <span
                            className={cn(
                              'flex-shrink-0 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mt-1.5 md:mt-2',
                              colors.bg
                            )}
                          />
                          <span className="leading-5">{activity}</span>
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

      {/* Progress indicator - Responsive sizing and positioning */}
      <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-40">
        <div className="bg-white/90 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg">
          <span className="text-xs md:text-sm font-medium text-text-secondary">
            Phase {currentPhase + 1} / {phases.length}
          </span>
        </div>
      </div>

      {/* Scroll hint (only on first phase) - Responsive */}
      {currentPhase === 0 && (
        <div className="fixed bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-40 animate-bounce">
          <div className="text-center text-xs md:text-sm text-text-secondary/70">
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
