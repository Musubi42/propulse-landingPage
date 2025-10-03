'use client';

/**
 * HorizontalTimeline Component
 *
 * Interactive horizontal timeline for displaying program phases
 * Features:
 * - Mouse wheel navigation (desktop)
 * - Touch swipe navigation (mobile/tablet)
 * - Keyboard arrow keys navigation
 * - Click dots navigation
 * - Hand-drawn pen line connector (rough-notation)
 * - Smooth animations with performance optimization
 */

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useWheelScroll } from '@/hooks/useWheelScroll';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';
import { TimelineCard } from './TimelineCard';
import { TimelineDots } from './TimelineDots';
import { TimelinePenLine } from './TimelinePenLine';
import type { HorizontalTimelineProps, PhasePosition } from './types';

/**
 * HorizontalTimeline Component
 *
 * Main component that orchestrates all timeline functionality
 *
 * @example
 * ```tsx
 * <HorizontalTimeline
 *   phases={phasesData}
 *   defaultPhase={0}
 *   onPhaseChange={(index) => console.log(`Phase ${index} active`)}
 * />
 * ```
 */
export function HorizontalTimeline({
  phases,
  defaultPhase = 0,
  enableWheelScroll = true,
  enableSwipe = true,
  enableKeyboard = true,
  showDots = true,
  className,
  onPhaseChange,
}: HorizontalTimelineProps) {
  const [currentPhase, setCurrentPhase] = useState(defaultPhase);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect screen size for conditional features
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  /**
   * Navigate to the next phase
   */
  const goToNextPhase = useCallback(() => {
    if (currentPhase < phases.length - 1) {
      const newPhase = currentPhase + 1;
      setCurrentPhase(newPhase);
      onPhaseChange?.(newPhase);
    }
  }, [currentPhase, phases.length, onPhaseChange]);

  /**
   * Navigate to the previous phase
   */
  const goToPreviousPhase = useCallback(() => {
    if (currentPhase > 0) {
      const newPhase = currentPhase - 1;
      setCurrentPhase(newPhase);
      onPhaseChange?.(newPhase);
    }
  }, [currentPhase, onPhaseChange]);

  /**
   * Navigate to a specific phase (for dot clicks)
   */
  const goToPhase = useCallback(
    (index: number) => {
      if (index >= 0 && index < phases.length && index !== currentPhase) {
        setCurrentPhase(index);
        onPhaseChange?.(index);
      }
    },
    [currentPhase, phases.length, onPhaseChange]
  );

  /**
   * Mouse wheel navigation hook
   * Only enabled on desktop (≥1024px)
   */
  useWheelScroll({
    enabled: enableWheelScroll && isDesktop,
    onScrollDown: goToNextPhase,
    onScrollUp: goToPreviousPhase,
    debounceMs: 150,
  });

  /**
   * Touch swipe navigation hook
   * Enabled on all devices (more useful on mobile/tablet)
   */
  useSwipeGesture({
    enabled: enableSwipe,
    onSwipeLeft: goToNextPhase,
    onSwipeRight: goToPreviousPhase,
    minSwipeDistance: 50,
  });

  /**
   * Keyboard navigation
   * Arrow keys to navigate between phases
   */
  useEffect(() => {
    if (!enableKeyboard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNextPhase();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPreviousPhase();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToPhase(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToPhase(phases.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    currentPhase,
    enableKeyboard,
    goToNextPhase,
    goToPreviousPhase,
    goToPhase,
    phases.length,
  ]);

  /**
   * Determine position for each visible card
   */
  const getCardPosition = (index: number): PhasePosition => {
    if (index === currentPhase) return 'active';
    if (index === currentPhase - 1) return 'prev';
    if (index === currentPhase + 1) return 'next';
    return 'hidden';
  };

  /**
   * Get visible cards (prev, active, next)
   * On mobile, only show active card
   */
  const getVisibleCards = () => {
    if (!isDesktop) {
      // Mobile: Only active card
      return [currentPhase];
    }

    // Desktop: prev, active, next
    const visible: number[] = [currentPhase];

    if (currentPhase > 0) {
      visible.unshift(currentPhase - 1); // Add previous
    }

    if (currentPhase < phases.length - 1) {
      visible.push(currentPhase + 1); // Add next
    }

    return visible;
  };

  const visibleCards = getVisibleCards();

  return (
    <div
      className={cn('horizontal-timeline relative w-full', className)}
      role="region"
      aria-label="Programme timeline"
      aria-live="polite"
    >
      {/* Navigation Dots */}
      {showDots && (
        <TimelineDots
          phases={phases}
          currentPhase={currentPhase}
          onDotClick={goToPhase}
        />
      )}

      {/* Hand-Drawn Pen Line (Desktop only) */}
      <TimelinePenLine
        totalPhases={phases.length}
        currentPhase={currentPhase}
      />

      {/* Phase Cards Container */}
      <div className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center">
        <div
          className={cn(
            'cards-wrapper flex items-center justify-center gap-8 w-full',
            'px-4 md:px-8'
          )}
        >
          <AnimatePresence mode="wait">
            {visibleCards.map((phaseIndex) => (
              <TimelineCard
                key={phases[phaseIndex].id}
                phase={phases[phaseIndex]}
                position={getCardPosition(phaseIndex)}
                onClick={
                  phaseIndex !== currentPhase
                    ? () => goToPhase(phaseIndex)
                    : undefined
                }
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Instructions (visible on first render) */}
      {currentPhase === 0 && (
        <div className="text-center mt-8 text-sm text-text-secondary/70">
          {isDesktop ? (
            <p>
              Utilisez la molette de votre souris ou les flèches ← → pour
              naviguer
            </p>
          ) : (
            <p>Glissez vers la gauche ou la droite pour naviguer</p>
          )}
        </div>
      )}

      {/* Phase Progress Indicator */}
      <div className="text-center mt-6">
        <span className="text-sm font-medium text-text-secondary">
          Phase {currentPhase + 1} sur {phases.length}
        </span>
      </div>
    </div>
  );
}
