'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  initialScale?: number;
  className?: string;
  triggerOnce?: boolean;
  threshold?: number;
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.6,
  initialScale = 0.8,
  className = '',
  triggerOnce = true,
  threshold = 0.2,
}: ScaleInProps) {
  const [ref, inView] = useInView({
    triggerOnce,
    threshold,
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        scale: initialScale,
      }}
      animate={
        inView
          ? {
              opacity: 1,
              scale: 1,
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
