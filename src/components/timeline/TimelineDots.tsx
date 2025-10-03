'use client';

/**
 * TimelineDots Component
 *
 * Navigation dots for the horizontal timeline
 * Shows phase numbers and allows direct navigation by clicking
 */

import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { TimelineDotsProps } from './types';

/**
 * Animation variants for the active dot pulse effect
 */
const dotPulseVariants: Variants = {
  active: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1],
    },
  },
  inactive: {
    scale: 1,
  },
};

/**
 * TimelineDots Component
 *
 * Renders navigation dots for each phase with:
 * - Active state highlighting
 * - Click navigation
 * - Hover tooltips
 * - Keyboard accessibility
 */
export function TimelineDots({
  phases,
  currentPhase,
  onDotClick,
  className,
}: TimelineDotsProps) {
  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <nav
      className={cn(
        'timeline-dots flex items-center justify-center gap-6 md:gap-10 mb-8 md:mb-12',
        className
      )}
      aria-label="Timeline navigation"
      role="navigation"
    >
      {phases.map((phase, index) => {
        const isActive = index === currentPhase;
        const isPast = index < currentPhase;
        const Icon = typeof phase.icon === 'string' ? null : phase.icon;

        return (
          <div key={phase.id} className="relative group">
            {/* Tooltip */}
            <div
              className={cn(
                'absolute bottom-full left-1/2 -translate-x-1/2 mb-2',
                'bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded',
                'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
                'pointer-events-none whitespace-nowrap z-10',
                'shadow-lg'
              )}
            >
              {phase.title}
              {/* Tooltip arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                <div className="border-4 border-transparent border-t-gray-900" />
              </div>
            </div>

            {/* Dot Button with Icon */}
            <motion.button
              onClick={() => onDotClick(index)}
              className={cn(
                'relative rounded-full transition-all duration-300 flex items-center justify-center',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                'hover:scale-110',
                isActive
                  ? 'w-12 h-12 md:w-14 md:h-14'
                  : 'w-10 h-10 md:w-12 md:h-12'
              )}
              aria-label={`Phase ${phase.number}: ${phase.title}`}
              aria-current={isActive ? 'step' : undefined}
              variants={prefersReducedMotion ? undefined : dotPulseVariants}
              animate={isActive ? 'active' : 'inactive'}
            >
              {/* Dot Background Circle */}
              <div
                className={cn(
                  'absolute inset-0 rounded-full transition-all duration-300',
                  isActive
                    ? 'bg-accent shadow-lg border-2 border-accent'
                    : isPast
                      ? 'bg-primary shadow-md border-2 border-primary'
                      : 'bg-white shadow border-2 border-gray-300'
                )}
              />

              {/* Icon */}
              <div className="relative z-10">
                {Icon ? (
                  <Icon
                    className={cn(
                      'transition-all duration-300',
                      isActive
                        ? 'w-6 h-6 md:w-7 md:h-7 text-white'
                        : isPast
                          ? 'w-5 h-5 md:w-6 md:h-6 text-white'
                          : 'w-5 h-5 md:w-6 md:h-6 text-gray-400'
                    )}
                  />
                ) : (
                  <span
                    className={cn(
                      'text-2xl transition-all duration-300',
                      isActive || isPast ? 'opacity-100' : 'opacity-60'
                    )}
                  >
                    {phase.icon}
                  </span>
                )}
              </div>
            </motion.button>
          </div>
        );
      })}
    </nav>
  );
}
