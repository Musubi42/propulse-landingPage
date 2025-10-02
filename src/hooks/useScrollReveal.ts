'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseScrollRevealOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
}

export function useScrollReveal({
  threshold = 0.2,
  triggerOnce = true,
  delay = 0,
}: UseScrollRevealOptions = {}) {
  const [hasRevealed, setHasRevealed] = useState(false);
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
  });

  useEffect(() => {
    if (inView && !hasRevealed) {
      if (delay > 0) {
        const timer = setTimeout(() => {
          setHasRevealed(true);
        }, delay);
        return () => clearTimeout(timer);
      } else {
        setHasRevealed(true);
      }
    }
  }, [inView, hasRevealed, delay]);

  return { ref, isRevealed: hasRevealed };
}
