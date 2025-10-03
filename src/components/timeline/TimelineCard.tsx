'use client';

/**
 * TimelineCard Component
 *
 * Individual phase card with 3 states: prev, active, next
 * Shows full details when active, minimal details when prev/next
 */

import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { TimelineCardProps } from './types';

/**
 * Color class mappings for each phase color theme
 */
const colorClasses = {
  accent: {
    border: 'border-accent',
    bg: 'bg-accent',
    text: 'text-accent',
    bgLight: 'bg-accent/10',
  },
  primary: {
    border: 'border-primary',
    bg: 'bg-primary',
    text: 'text-primary',
    bgLight: 'bg-primary/10',
  },
  secondary: {
    border: 'border-secondary',
    bg: 'bg-secondary',
    text: 'text-secondary',
    bgLight: 'bg-secondary/10',
  },
};

/**
 * Animation variants for different card positions
 */
const cardVariants: Variants = {
  active: {
    x: 0,
    scale: 1,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.4, ease: [0.42, 0, 0.58, 1] },
  },
  prev: {
    x: -120,
    scale: 0.85,
    opacity: 0.5,
    filter: 'blur(1px)',
    transition: { duration: 0.4, ease: [0.42, 0, 0.58, 1] },
  },
  next: {
    x: 120,
    scale: 0.85,
    opacity: 0.5,
    filter: 'blur(1px)',
    transition: { duration: 0.4, ease: [0.42, 0, 0.58, 1] },
  },
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3 },
  },
};

/**
 * Stagger animation for activities list
 */
const activitiesVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const activityItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

/**
 * TimelineCard Component
 *
 * Renders a phase card with different visual states and content levels
 * based on its position in the timeline (prev/active/next)
 */
export function TimelineCard({ phase, position, onClick }: TimelineCardProps) {
  const colors = colorClasses[phase.color];
  const Icon = typeof phase.icon === 'string' ? null : phase.icon;
  const isActive = position === 'active';

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.article
      className={cn(
        'timeline-card relative bg-white rounded-lg shadow-md overflow-hidden',
        'border-2 transition-shadow duration-300',
        colors.border,
        isActive ? 'shadow-lg' : 'shadow-sm',
        position !== 'active' && 'cursor-pointer hover:shadow-md',
        'w-full max-w-[800px]'
      )}
      variants={prefersReducedMotion ? undefined : cardVariants}
      animate={position}
      onClick={onClick}
      style={{ willChange: 'transform' }}
      layout
    >
      <div className="p-6 md:p-8">
        {/* Header: Number Badge + Duration */}
        <div className="flex items-start justify-between gap-4 mb-4">
          {/* Phase Number Badge */}
          <div
            className={cn(
              'flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center',
              'text-white font-bold text-lg shadow-md',
              colors.bg
            )}
          >
            {phase.number}
          </div>

          {/* Duration Badge */}
          <span
            className={cn(
              'text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap',
              colors.text,
              colors.bgLight
            )}
          >
            {phase.duration}
          </span>
        </div>

        {/* Icon + Title */}
        <div className="flex items-start gap-4 mb-4">
          {/* Icon */}
          <div className="flex-shrink-0">
            {Icon ? (
              <Icon className={cn('w-10 h-10 md:w-12 md:h-12', colors.text)} />
            ) : typeof phase.icon === 'string' ? (
              <span className="text-4xl md:text-5xl">{phase.icon}</span>
            ) : null}
          </div>

          {/* Title */}
          <h3
            className={cn(
              'font-bold text-foreground',
              isActive ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
            )}
          >
            {phase.title}
          </h3>
        </div>

        {/* Brief Description - Always visible */}
        <p className="text-text-secondary leading-relaxed mb-4">
          {phase.brief}
        </p>

        {/* Full Details - Only visible when active */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="space-y-6"
          >
            {/* Detailed Description */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-text-secondary leading-relaxed">
                {phase.details.description}
              </p>
            </div>

            {/* Activities List */}
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className={cn('w-1 h-5 rounded-full', colors.bg)} />
                Activités et contenus
              </h4>
              <motion.ul
                className="space-y-2"
                variants={prefersReducedMotion ? undefined : activitiesVariants}
                initial="hidden"
                animate="visible"
              >
                {phase.details.activities.map((activity, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3 text-text-secondary"
                    variants={
                      prefersReducedMotion ? undefined : activityItemVariants
                    }
                  >
                    <span
                      className={cn(
                        'flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2',
                        colors.bg
                      )}
                    />
                    <span className="leading-relaxed">{activity}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        )}

        {/* Navigation hint for non-active cards */}
        {!isActive && (
          <div className="mt-4 text-sm text-text-secondary/60 text-center">
            Cliquez pour voir les détails
          </div>
        )}
      </div>
    </motion.article>
  );
}
