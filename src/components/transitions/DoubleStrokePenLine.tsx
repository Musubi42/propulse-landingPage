'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function DoubleStrokePenLine() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div ref={ref} className="flex justify-center py-10">
      <motion.svg width="320" height="90" viewBox="0 0 320 90" className="opacity-35">
        {/* Top stroke */}
        <motion.path
          d="M 10 35 Q 80 20, 160 35 T 310 35"
          stroke="rgb(74, 107, 82)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        {/* Bottom stroke (delayed) */}
        <motion.path
          d="M 10 55 Q 80 70, 160 55 T 310 55"
          stroke="rgb(74, 107, 82)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
        />
      </motion.svg>
    </div>
  );
}
