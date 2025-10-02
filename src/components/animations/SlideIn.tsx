'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface SlideInProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  triggerOnce?: boolean;
  threshold?: number;
}

export function SlideIn({
  children,
  direction = 'left',
  delay = 0,
  duration = 0.7,
  distance = 100,
  className = '',
  triggerOnce = true,
  threshold = 0.1,
}: SlideInProps) {
  const [ref, inView] = useInView({
    triggerOnce,
    threshold,
  });

  const directionOffset = {
    left: { x: -distance },
    right: { x: distance },
    up: { y: -distance },
    down: { y: distance },
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        ...directionOffset[direction],
      }}
      animate={
        inView
          ? {
              x: 0,
              y: 0,
            }
          : {}
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
