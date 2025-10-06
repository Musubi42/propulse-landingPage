'use client';

/**
 * TimelineDots Component
 *
 * Navigation dots for the horizontal timeline
 * Shows phase numbers and allows direct navigation by clicking
 */

import { motion, type Variants } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
 * Tooltip Component with Portal
 * Renders tooltip in body to ensure it's above all other elements (including header)
 */
function TooltipPortal({
  children,
  targetRef,
  isVisible
}: {
  children: React.ReactNode;
  targetRef: React.RefObject<HTMLDivElement | null>;
  isVisible: boolean;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isVisible || !targetRef.current) return;

    const updatePosition = () => {
      if (!targetRef.current) return;
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 8, // 8px above the dot (mb-2 = 8px)
      });
    };

    updatePosition();

    // Update position on scroll/resize
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isVisible, targetRef]);

  if (!mounted || typeof window === 'undefined') return null;

  return createPortal(
    <div
      className={cn(
        'fixed bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded',
        'transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%)',
        zIndex: 9999, // Above everything, including header (z-50)
      }}
    >
      {children}
      {/* Tooltip arrow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
        <div className="border-4 border-transparent border-t-gray-900" />
      </div>
    </div>,
    document.body
  );
}

/**
 * TimelineDots Component
 *
 * Renders navigation dots for each phase with:
 * - Active state highlighting
 * - Click navigation
 * - Hover tooltips (portal-based, above all elements)
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

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Create refs for each dot (outside map to comply with hooks rules)
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <nav
      className={cn(
        'timeline-dots flex items-center justify-center gap-6 md:gap-10 mb-8 md:mb-12',
        'relative z-10', // Above pen line (pen line is z-0)
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
          <div
            key={phase.id}
            ref={(el) => {
              dotRefs.current[index] = el;
            }}
            className="relative z-10"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Portal Tooltip - Rendered in body, above everything */}
            <TooltipPortal
              targetRef={{ current: dotRefs.current[index] }}
              isVisible={hoveredIndex === index}
            >
              {phase.title}
            </TooltipPortal>

            {/* White circle mask to hide line behind dot */}
            <div
              className={cn(
                'absolute rounded-full bg-background transition-all duration-300',
                isActive
                  ? 'w-16 h-16 md:w-18 md:h-18'
                  : 'w-14 h-14 md:w-16 md:h-16'
              )}
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 0, // Behind the button
              }}
            />

            {/* Dot Button with Icon */}
            <motion.button
              onClick={() => onDotClick(index)}
              className={cn(
                'relative rounded-full bg-white transition-all duration-300 flex items-center justify-center',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                'hover:scale-110',
                'z-10', // Above the mask
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
                ) : typeof phase.icon === 'string' ? (
                  <span
                    className={cn(
                      'text-2xl transition-all duration-300',
                      isActive || isPast ? 'opacity-100' : 'opacity-60'
                    )}
                  >
                    {phase.icon}
                  </span>
                ) : null}
              </div>
            </motion.button>
          </div>
        );
      })}
    </nav>
  );
}
