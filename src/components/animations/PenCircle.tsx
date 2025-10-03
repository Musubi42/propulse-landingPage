'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { annotate } from 'rough-notation';

interface PenCircleProps {
  children: React.ReactNode;
  color?: string;
  strokeWidth?: number;
  delay?: number;
  animationDuration?: number;
  padding?: number;
}

/**
 * PenCircle - Wraps content with an animated hand-drawn circle using Rough Notation
 *
 * Usage:
 * <PenCircle color="#D97642" delay={0.3}>
 *   50+
 * </PenCircle>
 */
export function PenCircle({
  children,
  color = '#3D3D3D',
  strokeWidth = 2,
  delay = 0,
  animationDuration = 1000,
  padding = 8,
}: PenCircleProps) {
  const [elementRef, setElementRef] = useState<HTMLSpanElement | null>(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!elementRef || !inView) return;

    const timeout = setTimeout(() => {
      const annotation = annotate(elementRef, {
        type: 'circle',
        color,
        strokeWidth,
        animationDuration,
        padding,
      });
      annotation.show();
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [elementRef, inView, color, strokeWidth, delay, animationDuration, padding]);

  return (
    <span
      ref={(node) => {
        setElementRef(node);
        inViewRef(node);
      }}
      className="relative inline-block"
    >
      {children}
    </span>
  );
}
