'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

export function AnimatedPenDraw() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [isComplete, setIsComplete] = useState(false);

  // Track drawing progress (0 to 1)
  const progress = useMotionValue(0);

  // Path definition - organic wave matching demo transitions
  const pathData = "M 10 50 Q 40 30, 70 50 T 150 50 Q 200 35, 250 50 T 290 50";

  // Calculate pen position along path
  // Using percentage to move pen from start to end
  const penX = useTransform(progress, [0, 1], [10, 290]);
  const penY = useTransform(progress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    [50, 30, 50, 40, 35, 50, 45, 50]
  );

  // Rotate pen slightly to follow path direction
  const penRotate = useTransform(progress,
    [0, 0.25, 0.5, 0.75, 1],
    [-15, 5, -10, 5, -5]
  );

  useEffect(() => {
    if (inView) {
      // Animate the progress from 0 to 1 over 3 seconds
      const controls = animate(progress, 1, {
        duration: 3,
        ease: "easeInOut",
        onComplete: () => {
          setTimeout(() => setIsComplete(true), 500);
        }
      });

      return controls.stop;
    }
  }, [inView, progress]);

  return (
    <div ref={ref} className="flex justify-center py-10">
      <motion.svg
        width="300"
        height="100"
        viewBox="0 0 300 100"
        initial={{ opacity: 0 }}
        animate={{
          opacity: inView ? (isComplete ? 0.3 : 1) : 0
        }}
        transition={{ duration: isComplete ? 1 : 0.5 }}
      >
        {/* The wavy path being drawn */}
        <motion.path
          d={pathData}
          stroke="rgb(217, 118, 66)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          style={{
            pathLength: progress,
            opacity: isComplete ? 0.3 : 1
          }}
        />

        {/* Simplified pen silhouette */}
        <motion.g
          style={{
            x: penX,
            y: penY,
            rotate: penRotate,
            opacity: isComplete ? 0 : 1,
          }}
          transition={{ opacity: { duration: 1 } }}
        >
          {/* Pen nib (triangle) */}
          <path
            d="M 0 0 L -3 8 L 3 8 Z"
            fill="rgb(61, 61, 61)"
          />
          {/* Pen body (rectangle tapering) */}
          <path
            d="M -2 8 L -3 -15 L 3 -15 L 2 8 Z"
            fill="rgb(80, 80, 80)"
          />
          {/* Pen cap/top */}
          <ellipse
            cx="0"
            cy="-15"
            rx="3"
            ry="2"
            fill="rgb(61, 61, 61)"
          />
        </motion.g>
      </motion.svg>
    </div>
  );
}
