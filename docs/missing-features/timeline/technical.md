Propulse Horizontal Timeline - Technical Implementation Document
Based on your package.json and the research findings, here's the complete technical blueprint.

1. Library Selection & Justification
Primary Libraries (from your package.json)
LibraryVersionPurposeWhy This Choiceframer-motion^12.23.22All animationsIndustry-leading animation library, perfect for card transitions, dot scaling, and pen line drawingreact-intersection-observer^9.16.0Viewport detectionTrigger animations when timeline scrolls into viewlucide-react^0.544.0Phase iconsLightweight, tree-shakeable icon libraryclsx + tailwind-mergeLatestClassName managementHandle conditional classes cleanlyroughjs^4.6.6Pen line drawing (optional)Create authentic hand-drawn pen stroke effect for timeline
Built-in React Hooks

useState - Track active phase index
useEffect - Keyboard & wheel event listeners
useRef - DOM element references
useCallback - Memoize navigation functions


2. Component Architecture
HorizontalTimeline/
├── index.tsx                    # Main component export
├── TimelineContainer.tsx        # Wrapper with event listeners
├── TimelineBar.tsx              # Fixed timeline with dots
│   ├── TimelineDot.tsx         # Individual dot component
│   └── PenLine.tsx             # Animated connecting line
├── CardContainer.tsx            # Card slider wrapper
│   └── PhaseCard.tsx           # Individual phase card
├── hooks/
│   ├── useKeyboardNav.ts       # Keyboard navigation logic
│   ├── useWheelHijack.ts       # Optional wheel hijacking
│   └── useTimelineState.ts     # Phase state management
├── utils/
│   ├── animations.ts           # Framer Motion variants
│   └── constants.ts            # Phase data, timing configs
└── types.ts                    # TypeScript interfaces

3. Data Structure
Phase Interface
typescriptinterface Phase {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  dateRange: string; // "Sept-Oct", "Nov-Juin", etc.
  icon: LucideIcon; // From lucide-react
  description: string;
  details: string[];
  color?: string; // Optional accent color
}

const PHASES: Phase[] = [
  {
    id: 1,
    title: "Présentation des filières",
    subtitle: "4 Masterclass de présentation",
    duration: "Sept-Oct",
    dateRange: "Septembre - Octobre",
    icon: BookOpen, // Placeholder from lucide
    description: "4 Masterclass de présentation, à la suite desquelles...",
    details: [
      "Études de droit : 1 heure de session",
      "École d'ingénieur : 1 heure de session",
      // ... more
    ],
  },
  // ... 5 more phases
];

4. State Management
Timeline State Hook
typescript// hooks/useTimelineState.ts
export function useTimelineState(totalPhases: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToPhase = useCallback((targetIndex: number) => {
    if (isAnimating) return; // Prevent rapid clicks
    if (targetIndex < 0 || targetIndex >= totalPhases) return;
    
    setIsAnimating(true);
    setActiveIndex(targetIndex);
    
    // Reset animation lock after transition
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, totalPhases]);

  const goNext = useCallback(() => {
    goToPhase(activeIndex + 1);
  }, [activeIndex, goToPhase]);

  const goPrevious = useCallback(() => {
    goToPhase(activeIndex - 1);
  }, [activeIndex, goToPhase]);

  return {
    activeIndex,
    goToPhase,
    goNext,
    goPrevious,
    isAnimating,
    canGoNext: activeIndex < totalPhases - 1,
    canGoPrevious: activeIndex > 0,
  };
}

5. Keyboard Navigation
Keyboard Hook Pattern
Research shows using useEffect with keydown event listeners and useCallback for arrow key detection Create a List component with keyboard navigation in React.
typescript// hooks/useKeyboardNav.ts
export function useKeyboardNav({
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only hijack if arrow keys
      if (e.key === 'ArrowRight' && canGoNext) {
        e.preventDefault();
        onNext();
      } else if (e.key === 'ArrowLeft' && canGoPrevious) {
        e.preventDefault();
        onPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrevious, canGoNext, canGoPrevious]);
}

6. Mouse Wheel Hijacking (Optional)
⚠️ Warning: Nielsen research shows scrolljacking can cause user disorientation and frustration Scrolljacking 101 - NN/G. Recommend implementing this AFTER user testing confirms it's needed.
typescript// hooks/useWheelHijack.ts
export function useWheelHijack({
  containerRef,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  enabled = false, // Default disabled
}: {
  containerRef: RefObject<HTMLElement>;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  enabled?: boolean;
}) {
  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const element = containerRef.current;
    let wheelTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      // Debounce to prevent too many triggers
      clearTimeout(wheelTimeout);
      
      wheelTimeout = setTimeout(() => {
        if (e.deltaY > 0 && canGoNext) {
          // Scrolling down = go right
          e.preventDefault();
          onNext();
        } else if (e.deltaY < 0 && canGoPrevious) {
          // Scrolling up = go left
          e.preventDefault();
          onPrevious();
        }
      }, 100); // 100ms debounce
    };

    element.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      element.removeEventListener('wheel', handleWheel);
      clearTimeout(wheelTimeout);
    };
  }, [containerRef, onNext, onPrevious, canGoNext, canGoPrevious, enabled]);
}

7. Framer Motion Animation Variants
Framer Motion's variants allow orchestrating complex animations declaratively React animation — Transforms, keyframes & transitions | Motion.
typescript// utils/animations.ts
import { Variants } from 'framer-motion';

// Card animations
export const cardVariants: Variants = {
  // Previous card (left peek)
  left: {
    x: '-80%', // Only 20% visible
    opacity: 0.3,
    scale: 0.95,
    filter: 'blur(2px)',
    transition: { duration: 0.4, ease: [0.4, 0.0, 0.2, 1] },
  },
  
  // Active card (center)
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.4, ease: [0.4, 0.0, 0.2, 1] },
  },
  
  // Next card (right peek)
  right: {
    x: '80%', // Only 20% visible
    opacity: 0.3,
    scale: 0.95,
    filter: 'blur(2px)',
    transition: { duration: 0.4, ease: [0.4, 0.0, 0.2, 1] },
  },
  
  // Exit animations (for AnimatePresence)
  exitLeft: {
    x: '-100%',
    opacity: 0,
    transition: { duration: 0.3 },
  },
  
  exitRight: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

// Dot animations
export const dotVariants: Variants = {
  inactive: {
    scale: 1.0,
    opacity: 0.5,
    transition: { duration: 0.2 },
  },
  
  hover: {
    scale: 1.3,
    opacity: 0.8,
    transition: { duration: 0.2 },
  },
  
  active: {
    scale: 1.5,
    opacity: 1.0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

// Pen line drawing animation
export const penLineVariants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  
  visible: (endIndex: number) => ({
    pathLength: endIndex / 5, // 5 total phases (0-indexed)
    opacity: 1,
    transition: {
      pathLength: { duration: 0.6, ease: 'easeInOut' },
      opacity: { duration: 0.2 },
    },
  }),
};

8. Timeline Dot Spacing Logic
typescript// utils/constants.ts
export const TIMELINE_CONFIG = {
  // Base spacing between non-adjacent dots
  normalSpacing: 80, // px
  
  // Wider spacing adjacent to active dot
  activeSpacing: 180, // px
  
  // Dot sizes
  dotSize: {
    inactive: 24, // px
    hover: 32,
    active: 40,
  },
  
  // Animation durations
  transitionDuration: 400, // ms
  penLineDuration: 600, // ms
  rapidTransitionDuration: 150, // ms per phase (for far jumps)
};

// Calculate dot X positions
export function calculateDotPositions(
  totalDots: number,
  activeIndex: number
): number[] {
  const { normalSpacing, activeSpacing } = TIMELINE_CONFIG;
  const positions: number[] = [];
  let currentX = 0;

  for (let i = 0; i < totalDots; i++) {
    positions.push(currentX);
    
    // Determine spacing to next dot
    if (i === activeIndex - 1 || i === activeIndex) {
      // Adjacent to active: use wider spacing
      currentX += activeSpacing;
    } else {
      // Normal spacing
      currentX += normalSpacing;
    }
  }

  return positions;
}

9. Card Fade Gradient Implementation
typescript// PhaseCard.tsx
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type CardPosition = 'left' | 'center' | 'right';

interface PhaseCardProps {
  phase: Phase;
  position: CardPosition;
  isActive: boolean;
}

export function PhaseCard({ phase, position, isActive }: PhaseCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial={position}
      animate={position}
      exit={position === 'left' ? 'exitLeft' : 'exitRight'}
      className={cn(
        'absolute w-full max-w-2xl rounded-lg',
        'bg-background-secondary p-8',
        
        // Fade gradients based on position
        position === 'left' && [
          'pointer-events-none', // Can't interact with peek cards
          // Fade from right to left
          'bg-gradient-to-l from-background-secondary/100 to-background-secondary/0',
        ],
        
        position === 'right' && [
          'pointer-events-none',
          // Fade from left to right
          'bg-gradient-to-r from-background-secondary/100 to-background-secondary/0',
        ],
        
        position === 'center' && 'pointer-events-auto'
      )}
    >
      {/* Card content */}
      <div className={cn(
        'transition-opacity duration-300',
        position !== 'center' && 'opacity-30'
      )}>
        {/* Phase content here */}
      </div>
    </motion.div>
  );
}

10. Pen Line SVG Drawing
Using roughjs for authentic hand-drawn effect:
typescript// PenLine.tsx
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import rough from 'roughjs';

export function PenLine({ 
  activeIndex, 
  dotPositions 
}: { 
  activeIndex: number; 
  dotPositions: number[] 
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const rc = rough.svg(svg);

    // Clear previous drawings
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    // Draw rough line from start to active dot
    const startX = dotPositions[0];
    const endX = dotPositions[activeIndex];
    const y = 20; // Middle of timeline

    const roughLine = rc.line(startX, y, endX, y, {
      stroke: '#3D3D3D', // Pen color
      strokeWidth: 3,
      roughness: 1.5, // Hand-drawn feel
      bowing: 0.5, // Slight curve
    });

    svg.appendChild(roughLine);
  }, [activeIndex, dotPositions]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ overflow: 'visible' }}
    />
  );
}
Alternative: Use Framer Motion's pathLength for smoother animation without roughjs:
typescript<motion.svg>
  <motion.line
    x1={dotPositions[0]}
    y1={20}
    x2={dotPositions[activeIndex]}
    y2={20}
    stroke="#3D3D3D"
    strokeWidth={3}
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 0.6, ease: 'easeInOut' }}
  />
</motion.svg>

11. Far Jump Animation Logic
typescript// When clicking a dot far away
function handleDotClick(targetIndex: number) {
  const distance = Math.abs(targetIndex - activeIndex);
  
  if (distance <= 2) {
    // Close: Normal transition
    goToPhase(targetIndex);
  } else {
    // Far: Rapid animation through phases
    animateThroughPhases(activeIndex, targetIndex);
  }
}

function animateThroughPhases(start: number, end: number) {
  const direction = end > start ? 1 : -1;
  const steps = Math.abs(end - start);
  let currentStep = 0;

  const interval = setInterval(() => {
    currentStep++;
    const nextIndex = start + (direction * currentStep);
    
    setActiveIndex(nextIndex);
    
    if (currentStep >= steps) {
      clearInterval(interval);
      setIsAnimating(false);
    }
  }, 150); // 150ms per phase = rapid flip
}

12. Main Component Integration
typescript// HorizontalTimeline/index.tsx
import { useState } from 'react';
import { useTimelineState } from './hooks/useTimelineState';
import { useKeyboardNav } from './hooks/useKeyboardNav';
import { useWheelHijack } from './hooks/useWheelHijack';
import { TimelineBar } from './TimelineBar';
import { CardContainer } from './CardContainer';
import { PHASES } from './utils/constants';

export function HorizontalTimeline() {
  const containerRef = useRef<HTMLElement>(null);
  
  const {
    activeIndex,
    goToPhase,
    goNext,
    goPrevious,
    canGoNext,
    canGoPrevious,
  } = useTimelineState(PHASES.length);

  // Keyboard navigation
  useKeyboardNav({
    onNext: goNext,
    onPrevious: goPrevious,
    canGoNext,
    canGoPrevious,
  });

  // Optional: Mouse wheel hijacking (disabled by default)
  useWheelHijack({
    containerRef,
    onNext: goNext,
    onPrevious: goPrevious,
    canGoNext,
    canGoPrevious,
    enabled: false, // Set to true to enable
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-20"
    >
      {/* Fixed Timeline Bar */}
      <TimelineBar
        phases={PHASES}
        activeIndex={activeIndex}
        onDotClick={goToPhase}
      />

      {/* Card Slider */}
      <CardContainer
        phases={PHASES}
        activeIndex={activeIndex}
      />
    </section>
  );
}

13. Performance Optimizations
Critical Optimizations:

Memoize expensive calculations

typescript   const dotPositions = useMemo(
     () => calculateDotPositions(PHASES.length, activeIndex),
     [activeIndex]
   );

Use will-change CSS property

css   .phase-card {
     will-change: transform, opacity;
   }

Debounce rapid interactions

typescript   const debouncedGoToPhase = useMemo(
     () => debounce(goToPhase, 100),
     [goToPhase]
   );

Lazy load phase content

typescript   // Only render content for visible cards
   {position === 'center' && <PhaseContent phase={phase} />}

14. Accessibility Considerations
typescript// TimelineDot.tsx
<motion.button
  role="tab"
  aria-selected={isActive}
  aria-label={`Phase ${phase.id}: ${phase.title}`}
  tabIndex={isActive ? 0 : -1} // Only active dot is tabbable
  onClick={() => onDotClick(phase.id - 1)}
>
  {/* Dot content */}
</motion.button>

// CardContainer.tsx
<div
  role="tabpanel"
  aria-labelledby={`phase-${activeIndex + 1}`}
  aria-live="polite" // Announce changes to screen readers
>
  {/* Cards */}
</div>