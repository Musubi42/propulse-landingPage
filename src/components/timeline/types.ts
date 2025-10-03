/**
 * Timeline Component Types
 *
 * Type definitions for the Horizontal Timeline component system
 */

import type { LucideIcon } from 'lucide-react';

/**
 * Phase position in the timeline view
 */
export type PhasePosition = 'prev' | 'active' | 'next' | 'hidden';

/**
 * Phase color theme
 */
export type PhaseColor = 'accent' | 'primary' | 'secondary';

/**
 * Individual phase data structure
 */
export interface Phase {
  id: string;
  number: number;
  title: string;
  duration: string;
  brief: string;
  icon: LucideIcon | string; // Lucide icon component or emoji
  color: PhaseColor;
  details: {
    description: string;
    activities: string[];
  };
}

/**
 * Props for the main HorizontalTimeline component
 */
export interface HorizontalTimelineProps {
  /** Array of phase data */
  phases: Phase[];
  /** Initial active phase index (default: 0) */
  defaultPhase?: number;
  /** Enable mouse wheel navigation (default: true on desktop) */
  enableWheelScroll?: boolean;
  /** Enable touch swipe navigation (default: true) */
  enableSwipe?: boolean;
  /** Enable keyboard arrow navigation (default: true) */
  enableKeyboard?: boolean;
  /** Show navigation dots (default: true) */
  showDots?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Callback when phase changes */
  onPhaseChange?: (phaseIndex: number) => void;
}

/**
 * Props for TimelineCard component
 */
export interface TimelineCardProps {
  phase: Phase;
  position: PhasePosition;
  onClick?: () => void;
}

/**
 * Props for TimelineDots component
 */
export interface TimelineDotsProps {
  phases: Phase[];
  currentPhase: number;
  onDotClick: (index: number) => void;
  className?: string;
}

/**
 * Props for TimelinePenLine component
 */
export interface TimelinePenLineProps {
  totalPhases: number;
  currentPhase: number;
  progress?: number; // Continuous scroll progress (0-1) for smooth line extension
  className?: string;
}
