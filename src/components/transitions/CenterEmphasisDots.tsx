'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function CenterEmphasisDots() {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <div ref={ref} className="flex justify-center items-center gap-3 py-10">
      {[...Array(9)].map((_, i) => {
        const isCenter = i === 4;
        return (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              width: isCenter ? '12px' : '5px',
              height: isCenter ? '12px' : '5px',
              backgroundColor: 'rgb(217, 118, 66)',
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 0.4, y: 0 } : {}}
            transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
          />
        );
      })}
    </div>
  );
}
