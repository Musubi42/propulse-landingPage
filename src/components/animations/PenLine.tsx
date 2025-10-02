'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface PenLineProps {
  width?: number;
  height?: number;
  strokeWidth?: number;
  color?: string;
  duration?: number;
  delay?: number;
  className?: string;
  variant?: 'underline' | 'circle' | 'wave' | 'arrow';
}

export function PenLine({
  width = 200,
  height = 20,
  strokeWidth = 2,
  color = 'rgb(61, 61, 61)', // --pen-line color
  duration = 1.2,
  delay = 0,
  className = '',
  variant = 'underline',
}: PenLineProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const paths = {
    underline: `M 0 ${height / 2} Q ${width / 2} ${height / 2 + 3} ${width} ${height / 2}`,
    circle: `M ${width / 2} 0 A ${width / 2} ${height / 2} 0 1 1 ${width / 2} ${height}`,
    wave: `M 0 ${height / 2} Q ${width / 4} ${height / 4} ${width / 2} ${height / 2} T ${width} ${height / 2}`,
    arrow: `M 0 ${height / 2} L ${width - 10} ${height / 2} L ${width - 15} ${height / 4} M ${width - 10} ${height / 2} L ${width - 15} ${(3 * height) / 4}`,
  };

  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d={paths[variant]}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          inView
            ? {
                pathLength: 1,
                opacity: 1,
              }
            : {}
        }
        transition={{
          duration,
          delay,
          ease: 'easeInOut',
        }}
      />
    </svg>
  );
}
