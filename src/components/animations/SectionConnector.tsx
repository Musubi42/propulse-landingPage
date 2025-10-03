'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionConnectorProps {
  /** Height of the connector line in pixels */
  height?: number;
  /** Color of the pen stroke */
  color?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Animation delay in seconds */
  delay?: number;
  /** Animation duration in seconds */
  duration?: number;
}

/**
 * SectionConnector - Vertical pen line that "draws" downward to connect sections
 *
 * Usage:
 * <SectionConnector height={80} color="#3D3D3D" delay={0.5} />
 */
export function SectionConnector({
  height = 60,
  color = '#3D3D3D',
  strokeWidth = 2,
  delay = 0.3,
  duration = 1.5,
}: SectionConnectorProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className="flex justify-center py-4 pointer-events-none"
      aria-hidden="true"
    >
      <svg
        width={strokeWidth + 4}
        height={height}
        viewBox={`0 0 ${strokeWidth + 4} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Main vertical line with draw animation */}
        <motion.line
          x1={strokeWidth / 2 + 2}
          y1="0"
          x2={strokeWidth / 2 + 2}
          y2={height}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={height}
          strokeDashoffset={height}
          initial={{ strokeDashoffset: height }}
          animate={inView ? { strokeDashoffset: 0 } : {}}
          transition={{
            delay,
            duration,
            ease: 'easeInOut',
          }}
        />

        {/* Small arrow at the end */}
        <motion.path
          d={`M ${strokeWidth / 2 + 2 - 4} ${height - 8} L ${strokeWidth / 2 + 2} ${height} L ${strokeWidth / 2 + 2 + 4} ${height - 8}`}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{
            delay: delay + duration - 0.2,
            duration: 0.3,
          }}
        />
      </svg>
    </div>
  );
}
