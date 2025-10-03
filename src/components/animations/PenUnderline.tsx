'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { annotate } from 'rough-notation';

interface PenUnderlineProps {
  children: React.ReactNode;
  color?: string;
  strokeWidth?: number;
  delay?: number;
  animationDuration?: number;
  /** Multi-line underline */
  multiline?: boolean;
}

/**
 * PenUnderline - Wraps text with an animated hand-drawn underline using Rough Notation
 *
 * Usage:
 * <PenUnderline color="#D97642" delay={0.5}>
 *   Text to underline
 * </PenUnderline>
 */
export function PenUnderline({
  children,
  color = '#3D3D3D',
  strokeWidth = 2,
  delay = 0,
  animationDuration = 800,
  multiline = false,
}: PenUnderlineProps) {
  const [elementRef, setElementRef] = useState<HTMLSpanElement | null>(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!elementRef || !inView) return;

    const timeout = setTimeout(() => {
      const annotation = annotate(elementRef, {
        type: 'underline',
        color,
        strokeWidth,
        animationDuration,
        multiline,
      });
      annotation.show();
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [elementRef, inView, color, strokeWidth, delay, animationDuration, multiline]);

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
