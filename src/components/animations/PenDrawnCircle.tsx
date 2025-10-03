'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { annotate } from 'rough-notation';
import type { RoughAnnotation } from 'rough-notation/lib/model';

interface PenDrawnCircleProps {
  children: React.ReactNode;
  size?: number;
  strokeWidth?: number;
  strokeColor?: string;
  animate?: boolean;
  animationDuration?: number;
  className?: string;
  padding?: number;
}

/**
 * PenDrawnCircle Component
 *
 * A reusable component that creates an animated hand-drawn circle using Rough Notation
 * with sequential animation: circle draws first, then image fades in.
 *
 * @param children - Content to display inside the circle (usually an image)
 * @param size - Diameter of the circle in pixels (default: 400)
 * @param strokeWidth - Width of the pen line (default: 3)
 * @param strokeColor - Color of the pen stroke (default: #3D3D3D)
 * @param animate - Whether to animate the drawing (default: true)
 * @param animationDuration - Duration of circle animation in ms (default: 2000)
 * @param className - Additional CSS classes for the container
 * @param padding - Padding around the circle (default: 5)
 */
export function PenDrawnCircle({
  children,
  size = 400,
  strokeWidth = 3,
  strokeColor = '#3D3D3D',
  animate = true,
  animationDuration = 2000,
  className = '',
  padding = 5,
}: PenDrawnCircleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const annotationRef = useRef<RoughAnnotation | null>(null);
  const [showContent, setShowContent] = useState(!animate);

  // Viewport detection for animation trigger
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Combine refs
  const setRefs = (element: HTMLDivElement) => {
    inViewRef(element);
    containerRef.current = element;
  };

  // Initialize Rough Notation annotation
  useEffect(() => {
    if (!contentRef.current || typeof window === 'undefined') return;

    // Create circle annotation around the content
    const annotation = annotate(contentRef.current, {
      type: 'circle',
      color: strokeColor,
      strokeWidth: strokeWidth,
      padding: padding,
      animationDuration: animationDuration,
      iterations: 2, // Number of times to draw the circle (more = rougher look)
    });

    annotationRef.current = annotation;

    // If not animating, show immediately
    if (!animate) {
      annotation.show();
    }

    return () => {
      // Cleanup annotation on unmount
      if (annotationRef.current) {
        annotationRef.current.remove();
      }
    };
  }, [strokeColor, strokeWidth, padding, animationDuration, animate]);

  // Trigger animation when in view
  useEffect(() => {
    if (!animate || !inView || !annotationRef.current) return;

    // Start circle drawing animation
    annotationRef.current.show();

    // After circle completes + brief delay (300ms), show content with fade+blur
    const contentDelay = animationDuration + 300;
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, contentDelay);

    return () => clearTimeout(contentTimer);
  }, [inView, animate, animationDuration]);

  return (
    <div
      ref={setRefs}
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Content container with circular clip-path and sequential fade-in */}
      <div
        ref={contentRef}
        className={`rounded-full overflow-hidden transition-all duration-700 ease-out ${
          showContent ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
        }`}
        style={{
          width: size,
          height: size,
        }}
      >
        {children}
      </div>
    </div>
  );
}
