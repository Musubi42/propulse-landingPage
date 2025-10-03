'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function OrganicWavePenStroke() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div ref={ref} className="flex justify-center py-10">
      <motion.svg width="300" height="100" viewBox="0 0 300 100" className="opacity-30">
        {/* Wavy organic stroke */}
        <motion.path
          d="M 10 50 Q 40 30, 70 50 T 150 50 Q 200 35, 250 50 T 290 50"
          stroke="rgb(217, 118, 66)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        {/* Ink dots */}
        {[30, 80, 130, 180, 230, 270].map((x, i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={50 + (i % 3 === 0 ? -8 : i % 3 === 1 ? 0 : 8)}
            r="2"
            fill="rgb(217, 118, 66)"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 0.5, scale: 1 } : {}}
            transition={{ delay: 0.4 + i * 0.12 }}
          />
        ))}
      </motion.svg>
    </div>
  );
}
