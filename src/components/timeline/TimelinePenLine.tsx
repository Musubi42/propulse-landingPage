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
  className,
}: TimelinePenLineProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const annotationRef = useRef<RoughAnnotation | null>(null);
  const isInitializedRef = useRef(false);

  // Calculate line width based on current phase progress
  const progressPercentage = (currentPhase / (totalPhases - 1)) * 100;

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

  // Update when phase changes (but don't recreate the annotation)
  useEffect(() => {
    if (!isInitializedRef.current || !annotationRef.current) return;

    // Hide and show again to trigger re-draw with new width
    annotationRef.current.hide();
    setTimeout(() => {
      if (annotationRef.current) {
        annotationRef.current.show();
      }
    }, 50);
  }, [currentPhase]);

  return (
    <div
      className={cn(
        'timeline-pen-line absolute top-8 left-0 right-0 pointer-events-none',
        'hidden md:block', // Only show on desktop
        className
      )}
      aria-hidden="true"
    >
      {/* Container for the line with progress-based width */}
      <div
        className="relative mx-auto"
        style={{
          width: '80%',
          maxWidth: '800px',
        }}
      >
        {/* The actual line element that rough-notation annotates */}
        <div
          ref={lineRef}
          className="relative h-0.5 bg-transparent transition-all duration-500"
          style={{
            width: `${progressPercentage}%`,
          }}
        >
          {/* Invisible content for rough-notation to wrap */}
          <span className="invisible">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
        </div>
      </div>
    </div>
  );
}
