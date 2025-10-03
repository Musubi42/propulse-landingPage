'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { annotate } from 'rough-notation';

interface PenBoxProps {
  children: React.ReactNode;
  color?: string;
  strokeWidth?: number;
  delay?: number;
  animationDuration?: number;
  padding?: number;
}

/**
 * PenBox - Wraps content with an animated hand-drawn box using Rough Notation
 *
 * Usage:
 * <PenBox color="#D97642" delay={0.5} padding={12}>
 *   <button>Click me</button>
 * </PenBox>
 */
export function PenBox({
  children,
  color = '#3D3D3D',
  strokeWidth = 2,
  delay = 0,
  animationDuration = 1200,
  padding = 10,
}: PenBoxProps) {
  const [elementRef, setElementRef] = useState<HTMLSpanElement | null>(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!elementRef || !inView) return;

    const timeout = setTimeout(() => {
      const annotation = annotate(elementRef, {
        type: 'box',
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
