'use client';

import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

interface CounterProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  separator?: string;
  className?: string;
  enableScrollSpy?: boolean;
  scrollSpyOnce?: boolean;
}

export function Counter({
  end,
  start = 0,
  duration = 2.5,
  suffix = '',
  prefix = '',
  decimals = 0,
  separator = ' ',
  className = '',
  enableScrollSpy = true,
  scrollSpyOnce = true,
}: CounterProps) {
  const [ref, inView] = useInView({
    triggerOnce: scrollSpyOnce,
    threshold: 0.3,
  });

  return (
    <span ref={ref} className={className}>
      {enableScrollSpy && inView ? (
        <CountUp
          start={start}
          end={end}
          duration={duration}
          separator={separator}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          useEasing
          easingFn={(t, b, c, d) => {
            // easeOutExpo
            return c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
          }}
        />
      ) : (
        <span>
          {prefix}
          {start}
          {suffix}
        </span>
      )}
    </span>
  );
}
