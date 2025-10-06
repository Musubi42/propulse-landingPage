'use client';

/**
 * TimelinePenLine Component
 *
 * Hand-drawn connecting line between timeline phases using rough-notation
 * Progressively reveals as user navigates through phases
 */

import { useEffect, useRef } from 'react';
import { annotate } from 'rough-notation';
import type { RoughAnnotation } from 'rough-notation/lib/model';
import { cn } from '@/lib/utils';
import type { TimelinePenLineProps } from './types';

/**
 * TimelinePenLine Component
 *
 * Creates a hand-drawn horizontal line that connects phase dots
 * The line progressively reveals based on the current phase
 *
 * Uses rough-notation to create an authentic hand-drawn aesthetic
 */
export function TimelinePenLine({
  totalPhases,
  currentPhase,
  progress,
  className,
}: TimelinePenLineProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const annotationRef = useRef<RoughAnnotation | null>(null);
  const isInitializedRef = useRef(false);

  // Use continuous progress if provided (from GSAP scroll), otherwise discrete phase
  const progressPercentage = progress !== undefined
    ? progress * 100 // Continuous: 0-100% matching exact scroll position
    : currentPhase === totalPhases - 1
      ? 100
      : (currentPhase / (totalPhases - 1)) * 100;

  // Initialize annotation once on mount
  useEffect(() => {
    if (!lineRef.current || typeof window === 'undefined' || isInitializedRef.current) return;

    // Create underline annotation for the line
    const annotation = annotate(lineRef.current, {
      type: 'underline',
      color: '#3D3D3D', // Pen line color from palette
      strokeWidth: 2,
      padding: 0,
      animationDuration: 400,
      iterations: 1, // Single iteration to avoid double animation
    });

    annotationRef.current = annotation;
    isInitializedRef.current = true;

    // Show the annotation
    annotation.show();

    return () => {
      // Cleanup on unmount
      if (annotationRef.current) {
        annotationRef.current.remove();
        annotationRef.current = null;
      }
      isInitializedRef.current = false;
    };
  }, []);

  // Update when phase changes - NO animation restart
  // The line width changes via CSS transition, rough-notation stays visible
  // This creates a smooth progressive extension effect
  useEffect(() => {
    // Line extends naturally via CSS transition on progressPercentage change
    // No need to hide/show annotation - it adapts to container width automatically
  }, [currentPhase]);

  // The line needs to match the exact layout of TimelineDots
  // TimelineDots uses: flex items-center justify-center gap-6 md:gap-10
  // We need to calculate positions based on dot widths + gaps

  // Total phases
  const n = totalPhases;

  // Distance from first dot center to last dot center
  // = (n-1) * (dot_width + gap) where we use average dot width of 3rem
  const fullLineWidth = `calc((${n - 1}) * (3rem + 2.5rem))`;

  return (
    <div
      className={cn(
        'timeline-pen-line flex items-center justify-center pointer-events-none',
        'hidden md:block', // Only show on desktop
        className
      )}
      aria-hidden="true"
    >
      {/* Container matching TimelineDots layout */}
      <div className="relative flex items-center justify-center gap-10">
        {/* Spacer dots (invisible) to create same layout as TimelineDots */}
        {Array.from({ length: totalPhases }).map((_, i) => (
          <div
            key={i}
            className="w-12 h-12 opacity-0 pointer-events-none flex-shrink-0"
            aria-hidden="true"
          />
        ))}

        {/* Absolute positioned line that sits on top of spacers */}
        <div
          className="absolute inset-0 flex items-center"
          style={{
            // Position line to start at first dot center
            left: 'calc(1.5rem)', // Half of w-12 (3rem / 2)
            right: 'calc(1.5rem)', // Half of w-12
          }}
        >
          <div
            ref={lineRef}
            className="relative h-0.5 bg-transparent transition-all duration-300 ease-out"
            style={{
              // Width grows from 0 to fullLineWidth based on progress
              width: `calc(${fullLineWidth} * ${progressPercentage / 100})`,
            }}
          >
            {/* Invisible content for rough-notation to wrap */}
            <span className="invisible">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
          </div>
        </div>
      </div>
    </div>
  );
}
