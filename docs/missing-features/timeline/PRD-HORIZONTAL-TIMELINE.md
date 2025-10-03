# PRD: Horizontal Interactive Timeline Component

**Version:** 1.0
**Date:** 2025-10-03
**Status:** 🟡 Draft - Ready for Implementation
**Owner:** Development Team
**Stakeholders:** Propulse Founders

---

## Executive Summary

Replace the current vertical accordion timeline on `/programme` page with a **horizontal, scroll-interactive timeline** that visualizes the 6-phase mentorship program. The timeline will use hand-drawn aesthetics (rough-notation), mouse wheel navigation, and performance-first animations to create an engaging, intuitive user experience.

---

## Problem Statement

**Current State:**
The `/programme` page uses a vertical accordion timeline (shadcn/ui Accordion component) that:
- ✅ Works well on mobile
- ✅ Shows all content in an organized way
- ❌ Lacks visual "journey" metaphor
- ❌ Doesn't leverage horizontal space on desktop
- ❌ Misses opportunity for interactive storytelling

**Desired State:**
A horizontal timeline that:
- ✅ Visualizes the program as a **linear journey** (aligns with "pen & journey" brand metaphor)
- ✅ Uses **mouse wheel scrolling** to navigate phases (scroll down = move right, scroll up = move left)
- ✅ Shows **hand-drawn pen line** connecting phases (rough-notation for authenticity)
- ✅ Provides **swipe gestures** on mobile/tablet
- ✅ Maintains **performance** (60fps animations)
- ✅ Falls back to **touch swipe only** on mobile (horizontal scroll maintained)

---

## Goals & Success Metrics

### Primary Goals
1. **Improve user engagement** - Increase time spent on `/programme` page by 30%
2. **Enhance brand identity** - Reinforce "journey/path" metaphor through visual design
3. **Maintain accessibility** - WCAG AA compliant, keyboard navigable
4. **Optimize performance** - 60fps animations, <100ms interaction response time

### Success Metrics
- [ ] Lighthouse Performance Score ≥ 90
- [ ] Average session time on `/programme` ≥ 2 minutes
- [ ] Zero accessibility violations (WAVE tool)
- [ ] Works on Chrome, Firefox, Safari, Edge (last 2 versions)

---

## Target Audience

### Primary Users
1. **Lycéens (High School Students)** - 15-18 years old, exploring mentorship programs
2. **Parents** - Evaluating program structure and commitment
3. **Mentors** - Understanding the program they'll be part of

### User Needs
- **Students:** "When does this happen? How much time do I need to commit?"
- **Parents:** "Is this legitimate? What's the structure?"
- **Mentors:** "What am I committing to? What's expected in each phase?"

---

## User Stories

### Epic: Interactive Timeline Navigation

**US-1:** As a student, I want to scroll through phases using my mouse wheel, so I can explore the program timeline naturally.
**Acceptance Criteria:**
- Scrolling down moves timeline to the right (next phase)
- Scrolling up moves timeline to the left (previous phase)
- Smooth animations between phases (300-500ms transitions)
- Current phase is always centered and highlighted

**US-2:** As a mobile user, I want to swipe left/right to navigate phases, so I can explore on my phone.
**Acceptance Criteria:**
- Swipe left reveals next phase
- Swipe right reveals previous phase
- Works on touch devices (iOS, Android)
- Horizontal scroll maintained on small screens

**US-3:** As a keyboard user, I want to navigate phases using arrow keys, so I can explore without a mouse.
**Acceptance Criteria:**
- Right arrow → next phase
- Left arrow → previous phase
- Focus indicators visible
- Escape key exits focus mode (if applicable)

**US-4:** As any user, I want to click dots to jump to specific phases, so I can quickly access information.
**Acceptance Criteria:**
- Click any dot navigates to that phase instantly (or with smooth animation)
- Active phase dot is visually distinct
- Dots show phase numbers or labels on hover

---

## Functional Requirements

### FR-1: Component Architecture

**Requirement:** Create a reusable, standalone component `<HorizontalTimeline />`

**Technical Details:**
- **Location:** `src/components/ui/HorizontalTimeline.tsx` (or `src/components/timeline/`)
- **Type:** Client component (`'use client'`)
- **Data-driven:** Accepts `phases` array as prop
- **Flexibility:** Can be used on other pages (e.g., homepage "Solution" section)

**Props Interface:**
```typescript
interface HorizontalTimelineProps {
  phases: Phase[];
  defaultPhase?: number; // Initial active phase (default: 0)
  enableWheelScroll?: boolean; // Enable wheel hijacking (default: true on desktop)
  enableSwipe?: boolean; // Enable touch swipe (default: true)
  enableKeyboard?: boolean; // Enable arrow key navigation (default: true)
  showDots?: boolean; // Show navigation dots (default: true)
  className?: string;
  onPhaseChange?: (phaseIndex: number) => void; // Callback when phase changes
}

interface Phase {
  id: string;
  number: number;
  title: string;
  duration: string;
  brief: string;
  icon: React.ElementType | string; // Lucide icon or emoji
  color: 'accent' | 'primary' | 'secondary';
  details: {
    description: string;
    activities: string[];
  };
}
```

---

### FR-2: Navigation Methods

#### 2.1 Mouse Wheel Scrolling (Desktop ≥1024px)

**Behavior:**
- Scroll **down** → Move timeline **right** (next phase)
- Scroll **up** → Move timeline **left** (previous phase)
- Debounced to prevent rapid phase changes (150ms debounce)
- Only hijacks scroll when timeline is in viewport
- Releases scroll control when reaching first/last phase

**Technical Implementation:**
```typescript
// Pseudo-code
useEffect(() => {
  const handleWheel = (e: WheelEvent) => {
    if (!isTimelineInView) return; // Only hijack when visible

    e.preventDefault(); // Prevent page scroll

    if (e.deltaY > 0) {
      // Scrolling down → next phase
      goToNextPhase();
    } else if (e.deltaY < 0) {
      // Scrolling up → previous phase
      goToPreviousPhase();
    }
  };

  const debouncedWheel = debounce(handleWheel, 150);

  if (enableWheelScroll) {
    element.addEventListener('wheel', debouncedWheel, { passive: false });
  }

  return () => element.removeEventListener('wheel', debouncedWheel);
}, [currentPhase, isTimelineInView]);
```

**Edge Cases:**
- If at Phase 1 and user scrolls up → do nothing (or scroll page normally)
- If at Phase 6 and user scrolls down → do nothing (or scroll page normally)
- If user scrolls rapidly → queue is ignored, only final direction matters

---

#### 2.2 Touch Swipe (Mobile/Tablet)

**Behavior:**
- Swipe **left** → Next phase (move right on timeline)
- Swipe **right** → Previous phase (move left on timeline)
- Minimum swipe distance: 50px
- Velocity-sensitive (fast swipe = faster transition)

**Technical Implementation:**
- Use Framer Motion's `drag` or custom touch events
- Detect swipe direction and distance
- Trigger phase transition if threshold met

---

#### 2.3 Keyboard Navigation

**Behavior:**
- `→` (Right arrow) → Next phase
- `←` (Left arrow) → Previous phase
- `Home` → Jump to Phase 1 (optional)
- `End` → Jump to Phase 6 (optional)
- `Tab` → Focus dots navigation (standard tab order)

---

#### 2.4 Click Dots Navigation

**Behavior:**
- Click any dot to jump to that phase
- Smooth animation transition (400ms)
- Active dot is visually highlighted
- Dots show tooltip on hover (phase title)

---

### FR-3: Visual Design

#### 3.1 Layout Structure

**Desktop (≥1024px):**
```
┌─────────────────────────────────────────────────┐
│                                                 │
│   [Dot 1] [Dot 2] [Dot 3] [Dot 4] [Dot 5] [6] │ ← Navigation dots
│       ●─────●─────●─────●─────●─────●          │ ← Hand-drawn pen line (rough-notation)
│                                                 │
│  [Prev]       [Active Phase Card]       [Next] │ ← 3-card view (prev faded, next faded)
│   Card          (Full Details)           Card  │
│  (fade)         Centered & Scaled       (fade) │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Mobile (<1024px):**
```
┌───────────────────┐
│                   │
│ [● ● ● ● ● ●]    │ ← Dots (smaller)
│                   │
│ ┌───────────────┐ │
│ │  Phase Card   │ │ ← Single card (swipeable)
│ │  Full Details │ │
│ │               │ │
│ └───────────────┘ │
│                   │
│  ← Swipe gesture→ │
└───────────────────┘
```

---

#### 3.2 Hand-Drawn Pen Line (rough-notation)

**Requirement:** Connecting line between phase dots that looks hand-drawn

**Technical Details:**
- Use `react-rough-notation` or `rough-notation`
- Draw a **horizontal line** connecting dots
- Animate drawing from left to right as user progresses
- OR: Pre-draw entire line, highlight active segment

**Pseudo-code:**
```tsx
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation';

<RoughNotationGroup show={true}>
  {phases.map((phase, i) => (
    <RoughNotation
      key={phase.id}
      type="underline" // or custom SVG path
      show={i <= currentPhase}
      color="#3D3D3D"
      strokeWidth={2}
      animationDuration={300}
    >
      {/* Dot or connector */}
    </RoughNotation>
  ))}
</RoughNotationGroup>
```

**Alternative Approach (Better Performance):**
- Use single SVG path with `stroke-dasharray` animation (Framer Motion)
- Style SVG to look hand-drawn (roughjs style)
- Animate `pathLength` based on `currentPhase / totalPhases`

**Recommendation:** Start with Framer Motion SVG path (better performance), add rough-notation if needed for aesthetics.

---

#### 3.3 Phase Cards

**Active Card (Centered):**
- Full opacity (1.0)
- Scale 1.0
- Full details visible:
  - Phase number badge (circular)
  - Duration badge
  - Title (h3, 24px)
  - Icon (emoji or Lucide icon, 48px)
  - Brief description (1 sentence)
  - Full description paragraph
  - Activities list (bulleted, all items visible)
- Background: White with shadow
- Border: Accent color (matches phase color)

**Previous/Next Cards (Side Cards):**
- Reduced opacity (0.4-0.5)
- Scale 0.85
- Blurred (optional, use `filter: blur(2px)` sparingly for performance)
- Partial details visible:
  - Phase number + title only
  - Icon
  - No activities list
- Clicking navigates to that phase

**Card Sizing:**
- Max width: 600px (active card)
- Min height: 400px (ensure consistent height)
- Padding: 32px (2rem)

---

#### 3.4 Navigation Dots

**Design:**
- Circular dots (12px diameter on desktop, 10px on mobile)
- Active dot: Filled with phase color, larger (16px), with pulse animation
- Inactive dots: Outline only, gray (#6B6B6B)
- Hover: Scale 1.2, show tooltip with phase title
- Spacing: 40px apart (desktop), 24px (mobile)

**Position:**
- Desktop: Top center, 40px above cards
- Mobile: Bottom center, 24px below card

**Accessibility:**
- Each dot is a `<button>` with `aria-label="Phase X: Title"`
- Active dot has `aria-current="step"`

---

### FR-4: Animations & Transitions

**Guiding Principle:** Performance first (60fps), smooth and natural

#### 4.1 Phase Transition Animation

**Trigger:** User navigates to new phase (wheel, swipe, click)

**Animation Sequence:**
1. **Cards slide horizontally** (300ms, easeInOut)
   - Current active card fades out & scales down → becomes side card
   - Next card slides in from right (or left) & scales up → becomes active
2. **Pen line extends** (200ms, easeOut)
   - Line animates to connect to new active dot
3. **Content fade-in** (200ms, staggered 50ms delay)
   - Title, icon, description, activities fade in sequentially

**Total Duration:** ~500ms (perceived as snappy but not jarring)

**Framer Motion Variants:**
```typescript
const cardVariants = {
  active: {
    x: 0,
    scale: 1,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.3, ease: 'easeInOut' }
  },
  prev: {
    x: -100,
    scale: 0.85,
    opacity: 0.4,
    filter: 'blur(1px)', // Minimal blur for performance
    transition: { duration: 0.3, ease: 'easeInOut' }
  },
  next: {
    x: 100,
    scale: 0.85,
    opacity: 0.4,
    filter: 'blur(1px)',
    transition: { duration: 0.3, ease: 'easeInOut' }
  }
};
```

---

#### 4.2 Dot Animation

**Active Dot:**
```typescript
const dotVariants = {
  active: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },
  inactive: {
    scale: 1
  }
};
```

---

#### 4.3 Performance Optimizations

**Critical:**
- Use CSS `transform` and `opacity` only (GPU-accelerated)
- Avoid animating `width`, `height`, `left`, `right` (causes reflow)
- Use `will-change: transform` on animated elements
- Limit blur effects (expensive on lower-end devices)
- Debounce wheel events (150ms)
- Use `AnimatePresence` for smooth unmounting

**Code Example:**
```tsx
<motion.div
  style={{ willChange: 'transform' }}
  animate={cardVariants[position]}
>
  {/* Card content */}
</motion.div>
```

---

### FR-5: Responsive Behavior

#### Desktop (≥1024px)
- ✅ Horizontal 3-card view (prev/active/next)
- ✅ Mouse wheel navigation enabled
- ✅ Keyboard navigation enabled
- ✅ Click dots enabled
- ✅ Hand-drawn pen line visible
- ❌ Touch swipe disabled (use wheel instead)

#### Tablet (768px - 1023px)
- ✅ Horizontal 1-card view (only active card visible)
- ✅ Touch swipe navigation enabled
- ✅ Keyboard navigation enabled
- ✅ Click dots enabled
- ✅ Simplified pen line (shorter)
- ❌ Mouse wheel disabled (conflicts with page scroll)

#### Mobile (<768px)
- ✅ Horizontal 1-card view (full width, padding reduced)
- ✅ Touch swipe navigation enabled
- ❌ Keyboard navigation disabled (not applicable)
- ✅ Click dots enabled (smaller, bottom position)
- ✅ Minimal pen line (or hidden)
- ❌ Mouse wheel disabled

**Responsive Breakpoints (Tailwind):**
```typescript
const breakpoints = {
  mobile: '< 768px',    // sm and below
  tablet: '768px - 1023px', // md
  desktop: '≥ 1024px'   // lg and above
};
```

---

### FR-6: Accessibility

**WCAG AA Compliance:**

1. **Keyboard Navigation**
   - All interactive elements (dots, cards) are focusable
   - Visible focus indicators (2px outline, accent color)
   - Logical tab order

2. **Screen Readers**
   - Semantic HTML (`<nav>`, `<button>`, `<article>`)
   - `aria-label` on all buttons
   - `aria-current="step"` on active phase
   - `role="region"` on timeline container with `aria-label="Programme timeline"`

3. **Motion Preferences**
   - Respect `prefers-reduced-motion`
   - Disable all animations if user prefers reduced motion
   - Instant transitions instead of animated

```typescript
const shouldAnimate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<motion.div
  animate={shouldAnimate ? cardVariants[position] : undefined}
>
```

4. **Color Contrast**
   - All text meets 4.5:1 contrast ratio
   - Active dots: 3:1 contrast (UI elements)
   - Focus indicators: Distinct from background

---

### FR-7: Data Structure

**Phase Data (Current):**
```typescript
const phases: Phase[] = [
  {
    id: 'phase-1',
    number: 1,
    title: 'Présentation des filières',
    duration: 'Septembre - Octobre',
    brief: '4 Masterclass de présentation des filières d'excellence',
    icon: Presentation, // Lucide icon
    color: 'accent',
    details: {
      description: 'Découvrez les différentes filières...',
      activities: [
        'Études de droit : 1 heure de session',
        'École d\'ingénieur : 1 heure de session',
        // ... more activities
      ]
    }
  },
  // ... 5 more phases
];
```

**No changes needed** - use existing phase data from `ProgrammeTimeline.tsx`

---

## Non-Functional Requirements

### NFR-1: Performance
- [ ] Lighthouse Performance Score ≥ 90
- [ ] First Contentful Paint (FCP) < 1.5s
- [ ] Time to Interactive (TTI) < 3s
- [ ] Smooth animations (60fps, no jank)
- [ ] Wheel scroll response < 100ms

### NFR-2: Browser Support
- [ ] Chrome 90+ ✅
- [ ] Firefox 88+ ✅
- [ ] Safari 14+ ✅
- [ ] Edge 90+ ✅
- [ ] Mobile Safari (iOS 13+) ✅
- [ ] Chrome Mobile (Android 8+) ✅

### NFR-3: Bundle Size
- [ ] Component + dependencies < 30kb gzipped
- [ ] Use tree-shaking for Framer Motion
- [ ] Lazy load rough-notation if used

### NFR-4: Maintainability
- [ ] Fully typed with TypeScript (no `any`)
- [ ] Comprehensive JSDoc comments
- [ ] Unit tests for navigation logic (Vitest/Jest)
- [ ] E2E tests for user interactions (Playwright optional)

---

## Technical Stack

### Required Dependencies

**Core:**
- `framer-motion`: ^11.x (already installed)
- `react`: ^18.x (already installed)
- `next`: ^15.x (already installed)

**Optional (Evaluate During Implementation):**
- `react-rough-notation`: ^4.x (for hand-drawn line - OR use custom SVG)
- `react-use-gesture`: ^10.x (for advanced swipe detection - OR use Framer drag)

**Recommendation:** Start with Framer Motion only, add rough-notation if needed.

---

### File Structure

```
src/
├── components/
│   ├── timeline/
│   │   ├── HorizontalTimeline.tsx       # Main component
│   │   ├── TimelineCard.tsx             # Phase card component
│   │   ├── TimelineDots.tsx             # Navigation dots
│   │   ├── TimelinePenLine.tsx          # Hand-drawn line (SVG)
│   │   └── index.ts                     # Exports
│   └── ...
├── hooks/
│   ├── useWheelScroll.ts                # Custom hook for wheel hijacking
│   ├── useSwipeGesture.ts               # Custom hook for swipe detection
│   └── ...
├── lib/
│   └── timelineUtils.ts                 # Helper functions (debounce, etc.)
└── ...
```

---

## Implementation Phases

### Phase 1: Core Timeline (Week 1)
**Goal:** Basic horizontal timeline with navigation

**Tasks:**
1. Create `HorizontalTimeline.tsx` base component
2. Implement 3-card layout (prev/active/next on desktop)
3. Add navigation dots with click functionality
4. Implement keyboard navigation (← →)
5. Add basic slide transitions (Framer Motion)
6. Mobile: Single card view with horizontal scroll/swipe

**Deliverables:**
- [ ] Working horizontal timeline on desktop
- [ ] Click dots navigation
- [ ] Keyboard navigation
- [ ] Responsive on mobile (swipe)

---

### Phase 2: Wheel Scroll Navigation (Week 1)
**Goal:** Mouse wheel hijacking for intuitive scrolling

**Tasks:**
1. Create `useWheelScroll` hook
2. Detect wheel direction (up/down)
3. Map to phase navigation (down = right, up = left)
4. Add debouncing (150ms)
5. Handle edge cases (first/last phase)
6. Only hijack when timeline in viewport

**Deliverables:**
- [ ] Wheel scroll navigation works
- [ ] Smooth phase transitions
- [ ] No conflicts with page scroll

---

### Phase 3: Hand-Drawn Pen Line (Week 1)
**Goal:** Visual connector between phases

**Tasks:**
1. Create SVG path connecting dots
2. Style to look hand-drawn (roughjs-inspired)
3. Animate based on active phase
4. OR: Use `react-rough-notation` for underline effect
5. Performance test (ensure 60fps)

**Deliverables:**
- [ ] Pen line connects all dots
- [ ] Animates smoothly
- [ ] Looks hand-drawn (matches brand)

---

### Phase 4: Polish & Optimization (Week 2)
**Goal:** Performance and UX enhancements

**Tasks:**
1. Add far-jump animations (Phase 1 → 6 transitions)
2. Optimize blur effects (or remove if laggy)
3. Add `prefers-reduced-motion` support
4. Accessibility audit (keyboard, screen readers)
5. Performance profiling (Lighthouse)
6. Cross-browser testing

**Deliverables:**
- [ ] Lighthouse Performance ≥ 90
- [ ] Zero accessibility violations
- [ ] Smooth on low-end devices

---

### Phase 5: Integration & Testing (Week 2)
**Goal:** Replace old timeline, test in production

**Tasks:**
1. Replace `ProgrammeTimeline.tsx` with `HorizontalTimeline`
2. Update `/programme/page.tsx` imports
3. Test on staging
4. Gather user feedback
5. Fix any issues

**Deliverables:**
- [ ] Deployed to production
- [ ] No regressions
- [ ] User feedback positive

---

## Out of Scope (For Now)

**Not included in MVP:**
- ❌ Auto-play carousel mode (can add later if requested)
- ❌ Progress bar (dots serve this purpose)
- ❌ Parallax effects (performance risk)
- ❌ Sound effects (unnecessary)
- ❌ Video embeds in cards (scope creep)
- ❌ Analytics tracking (implement separately)

---

## Open Questions

1. **Pen line style:** Should we use `rough-notation` (heavier, more authentic) or custom SVG (lighter, good enough)?
   - **Recommendation:** Start with custom SVG, add rough-notation if founders want more hand-drawn feel

2. **Mobile experience:** Keep horizontal swipe or revert to vertical accordion?
   - **Decision:** Keep horizontal swipe (as per requirements)

3. **Far jumps:** When clicking Phase 1 → 6, should we animate through all phases or jump directly?
   - **Recommendation:** Jump directly with smooth transition (faster UX)

4. **Dots on mobile:** Bottom or top?
   - **Recommendation:** Bottom (easier to reach with thumb)

---

## Success Criteria

**Definition of Done:**
- [ ] Component renders correctly on all screen sizes
- [ ] All 4 navigation methods work (wheel, swipe, keyboard, dots)
- [ ] Animations run at 60fps on mid-range devices
- [ ] Lighthouse Performance ≥ 90
- [ ] Zero WCAG violations (WAVE tool)
- [ ] Pen line connects dots with hand-drawn aesthetic
- [ ] Code is fully typed (TypeScript)
- [ ] Component is reusable (accepts `phases` prop)
- [ ] Works on Chrome, Firefox, Safari, Edge
- [ ] Deployed to production without issues

---

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Wheel hijacking feels unnatural | High | Medium | Add smooth animations, release control at edges, test with users |
| Performance issues on mobile | High | Medium | Minimize blur, use transform/opacity only, test on low-end devices |
| Accessibility violations | Medium | Low | Use semantic HTML, test with screen readers, follow WCAG guidelines |
| rough-notation increases bundle size | Low | Medium | Use custom SVG instead, or lazy load rough-notation |
| Conflicts with existing scroll behavior | Medium | Medium | Only hijack when timeline in viewport, add feature flag to disable |

---

## References

**Design Inspiration:**
- [wireframe.md](./wireframe.md) - Visual reference
- [technical.md](./technical.md) - Technical guidelines

**Documentation:**
- [Framer Motion Docs](https://www.framer.com/motion/)
- [react-rough-notation](https://github.com/linkstrifer/react-rough-notation)
- [rough-notation](https://roughnotation.com/)

**Current Implementation:**
- [ProgrammeTimeline.tsx](../../../src/components/sections/ProgrammeTimeline.tsx)
- [/programme/page.tsx](../../../src/app/programme/page.tsx)

---

## Appendix A: Code Snippets

### Wheel Scroll Hook

```typescript
// src/hooks/useWheelScroll.ts
import { useEffect, useRef } from 'react';

interface UseWheelScrollOptions {
  enabled: boolean;
  onScrollDown: () => void;
  onScrollUp: () => void;
  debounceMs?: number;
}

export function useWheelScroll({
  enabled,
  onScrollDown,
  onScrollUp,
  debounceMs = 150
}: UseWheelScrollOptions) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!enabled) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Debounce
      timeoutRef.current = setTimeout(() => {
        if (e.deltaY > 0) {
          onScrollDown();
        } else if (e.deltaY < 0) {
          onScrollUp();
        }
      }, debounceMs);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, onScrollDown, onScrollUp, debounceMs]);
}
```

---

### Component Signature

```typescript
// src/components/timeline/HorizontalTimeline.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimelineCard } from './TimelineCard';
import { TimelineDots } from './TimelineDots';
import { TimelinePenLine } from './TimelinePenLine';
import { useWheelScroll } from '@/hooks/useWheelScroll';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';

interface HorizontalTimelineProps {
  phases: Phase[];
  defaultPhase?: number;
  enableWheelScroll?: boolean;
  enableSwipe?: boolean;
  enableKeyboard?: boolean;
  showDots?: boolean;
  className?: string;
  onPhaseChange?: (phaseIndex: number) => void;
}

export function HorizontalTimeline({
  phases,
  defaultPhase = 0,
  enableWheelScroll = true,
  enableSwipe = true,
  enableKeyboard = true,
  showDots = true,
  className,
  onPhaseChange
}: HorizontalTimelineProps) {
  const [currentPhase, setCurrentPhase] = useState(defaultPhase);

  const goToNextPhase = () => {
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(prev => prev + 1);
      onPhaseChange?.(currentPhase + 1);
    }
  };

  const goToPreviousPhase = () => {
    if (currentPhase > 0) {
      setCurrentPhase(prev => prev - 1);
      onPhaseChange?.(currentPhase - 1);
    }
  };

  const goToPhase = (index: number) => {
    setCurrentPhase(index);
    onPhaseChange?.(index);
  };

  // Wheel scroll hook
  useWheelScroll({
    enabled: enableWheelScroll && window.innerWidth >= 1024,
    onScrollDown: goToNextPhase,
    onScrollUp: goToPreviousPhase
  });

  // Swipe gesture hook (mobile/tablet)
  useSwipeGesture({
    enabled: enableSwipe,
    onSwipeLeft: goToNextPhase,
    onSwipeRight: goToPreviousPhase
  });

  // Keyboard navigation
  useEffect(() => {
    if (!enableKeyboard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNextPhase();
      if (e.key === 'ArrowLeft') goToPreviousPhase();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPhase, enableKeyboard]);

  return (
    <div className={cn('horizontal-timeline', className)} role="region" aria-label="Programme timeline">
      {/* Navigation dots */}
      {showDots && (
        <TimelineDots
          phases={phases}
          currentPhase={currentPhase}
          onDotClick={goToPhase}
        />
      )}

      {/* Pen line connecting dots */}
      <TimelinePenLine
        totalPhases={phases.length}
        currentPhase={currentPhase}
      />

      {/* Phase cards */}
      <div className="timeline-cards-container">
        <AnimatePresence mode="wait">
          {/* Previous card */}
          {currentPhase > 0 && (
            <TimelineCard
              phase={phases[currentPhase - 1]}
              position="prev"
              onClick={() => goToPreviousPhase()}
            />
          )}

          {/* Active card */}
          <TimelineCard
            phase={phases[currentPhase]}
            position="active"
          />

          {/* Next card */}
          {currentPhase < phases.length - 1 && (
            <TimelineCard
              phase={phases[currentPhase + 1]}
              position="next"
              onClick={() => goToNextPhase()}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

---

## Appendix B: Design Tokens

```typescript
// Design system values for timeline
export const timelineTokens = {
  colors: {
    penLine: '#3D3D3D',
    dotActive: 'var(--color-accent)', // Phase-specific
    dotInactive: '#6B6B6B',
    cardBackground: '#FFFFFF',
    cardShadow: 'rgba(0, 0, 0, 0.1)'
  },
  spacing: {
    dotSpacing: '40px',
    cardGap: '32px',
    cardPadding: '32px'
  },
  timing: {
    transitionDuration: 300,
    debounceDelay: 150,
    dotPulse: 1500
  },
  breakpoints: {
    mobile: 768,
    desktop: 1024
  }
};
```

---

**End of PRD**

---

## Next Steps

1. **Review & Approve** - Founders review PRD and approve scope
2. **Create Tasks** - Break down into GitHub issues or todo list
3. **Implementation** - Follow 5-phase roadmap
4. **Testing** - QA on staging before production
5. **Deploy** - Replace current accordion timeline
6. **Monitor** - Track engagement metrics, gather user feedback

---

**Questions? Feedback?**
Please comment directly in this document or create a GitHub issue.
