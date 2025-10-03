# Missing Feature: Animated Scroll Indicator in Hero

**Priority:** ⚠️ MODERATE (UX Enhancement)
**PRD Reference:** Lines 146-148
**Impact:** Minor - reduces visual guidance to scroll
**Estimated Effort:** 1 hour

---

## Problem Statement

The PRD specifies a scroll indicator with animation at the bottom of the hero section to encourage users to discover content below the fold.

**Current:** "Découvrir" text visible, but **no animated down arrow** clearly visible
**Required:** Down arrow with subtle bounce animation

**Impact:** Minor UX issue - users may not realize there's content below.

---

## PRD Requirements

### Scroll Indicator (PRD Lines 146-148)

> **Scroll Indicator:**
> - Down arrow at bottom center
> - Subtle animation (bounce)

---

## Implementation Requirements

### Location

**Component:** [src/components/sections/HeroSection.tsx](../../src/components/sections/HeroSection.tsx)
**Placement:** Bottom center of hero section, below CTAs

---

### Design Options

#### Option A: Icon + Text (Current + Enhancement)

```tsx
<div className="absolute bottom-8 left-1/2 -translate-x-1/2">
  <motion.div
    className="flex flex-col items-center gap-2 text-secondary-text"
    animate={{ y: [0, 10, 0] }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <span className="text-sm font-medium">Découvrir</span>
    <ChevronDown className="w-6 h-6" />
  </motion.div>
</div>
```

**Pros:**
- Combines text label with visual cue
- Clear call to action
- Animated bounce draws attention

---

#### Option B: Arrow Only (Minimal)

```tsx
<motion.div
  className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-navy"
  animate={{ y: [0, 12, 0] }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut"
  }}
>
  <ChevronDown className="w-8 h-8" strokeWidth={2.5} />
</motion.div>
```

**Pros:**
- Cleaner, less cluttered
- Universal symbol (down arrow = scroll)

---

#### Option C: Custom SVG Arrow with Pen Stroke

```tsx
<motion.div
  className="absolute bottom-8 left-1/2 -translate-x-1/2"
  animate={{ y: [0, 10, 0] }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut"
  }}
>
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <motion.path
      d="M 8 12 L 16 20 L 24 12"
      stroke="#3D3D3D"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </svg>
  <p className="text-sm text-secondary-text mt-2 text-center">Découvrir</p>
</motion.div>
```

**Pros:**
- Matches pen line visual identity
- Custom styling
- Combines with fade animation

**Recommended:** Option A or C (matches pen aesthetic)

---

## Full Implementation Example

### Enhanced Scroll Indicator Component

**Location:** [src/components/ui/ScrollIndicator.tsx](../../src/components/ui/ScrollIndicator.tsx)

```tsx
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  label?: string;
  className?: string;
}

export function ScrollIndicator({
  label = "Découvrir",
  className
}: ScrollIndicatorProps) {
  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        "flex flex-col items-center gap-2 text-secondary-text cursor-pointer hover:text-primary-navy transition-colors",
        className
      )}
      animate={{ y: [0, 12, 0] }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={{ scale: 1.1 }}
      aria-label="Scroll to content"
    >
      <span className="text-sm font-medium">{label}</span>
      <ChevronDown className="w-6 h-6" strokeWidth={2.5} />
    </motion.button>
  );
}
```

---

### Integration in Hero Section

```tsx
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-20">
        {/* Hero content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* ... headline, CTAs, image ... */}
        </div>
      </div>

      {/* Scroll Indicator - positioned at bottom center */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  );
}
```

---

## Animation Variations

### Bounce Animation (Recommended)

```tsx
animate={{ y: [0, 12, 0] }}
transition={{
  duration: 1.8,
  repeat: Infinity,
  ease: "easeInOut"
}}
```

**Characteristics:**
- Smooth up-and-down motion
- 12px travel distance
- 1.8s duration (slow, subtle)
- Infinite loop

---

### Fade + Bounce

```tsx
animate={{
  y: [0, 12, 0],
  opacity: [0.6, 1, 0.6]
}}
transition={{
  duration: 2,
  repeat: Infinity,
  ease: "easeInOut"
}}
```

**Adds:** Opacity fade for extra subtlety

---

### Spring Animation

```tsx
animate={{ y: [0, 12, 0] }}
transition={{
  duration: 1.5,
  repeat: Infinity,
  type: "spring",
  stiffness: 100,
  damping: 10
}}
```

**Characteristics:** More organic, bouncy feel

---

## Styling & Colors

**Text Color:**
- Default: `text-secondary-text` (#4A4A4A)
- Hover: `text-primary-navy` (#1B3A52)

**Icon Color:**
- Default: Inherit from parent
- Accent: `text-primary-orange` (#D97642) for emphasis

**Size:**
- Text: 14px (text-sm)
- Icon: 24px (w-6 h-6)

---

## Responsive Behavior

**Desktop (1024px+):**
- Full scroll indicator with text + icon
- Bottom: 48px (bottom-12)

**Tablet (768px-1023px):**
- Standard size
- Bottom: 32px (bottom-8)

**Mobile (< 768px):**
- Smaller or hidden (optional)
- Consider: Many mobile users already understand to scroll
- If shown: Icon only (no text)

```tsx
<div className="hidden md:block absolute bottom-12 left-1/2 -translate-x-1/2">
  <ScrollIndicator />
</div>
```

---

## Accessibility

**Requirements:**
- [ ] Use `<button>` for clickable indicator (keyboard accessible)
- [ ] Add `aria-label="Scroll to content"` for screen readers
- [ ] Include hover state (scale or color change)
- [ ] Respect `prefers-reduced-motion` (disable animation if needed)

**Prefers Reduced Motion:**

```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<motion.div
  animate={prefersReducedMotion ? {} : { y: [0, 12, 0] }}
  // ...
/>
```

---

## Click Behavior (Optional Enhancement)

**Smooth scroll to next section:**

```tsx
const handleClick = () => {
  const nextSection = document.querySelector('section:nth-of-type(2)');
  nextSection?.scrollIntoView({ behavior: 'smooth' });
};
```

**Or scroll one viewport height:**

```tsx
const handleClick = () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
  });
};
```

---

## Testing Checklist

- [ ] Scroll indicator visible at bottom center of hero
- [ ] Animation plays smoothly (bounce)
- [ ] Clicking scrolls to next section (if interactive)
- [ ] Hover state changes color/scale
- [ ] Hidden on mobile (if desired)
- [ ] Respects `prefers-reduced-motion`
- [ ] Accessible via keyboard (Tab + Enter)
- [ ] Screen reader announces purpose

---

## Visual Reference

**Similar implementations:**
- Apple product pages (down chevron with bounce)
- Stripe homepage (animated scroll cue)
- Linear.app (subtle down arrow)

**Inspiration:** Keep it subtle and elegant, not distracting.

---

## References

- **PRD:** [specs/PRD.md](../../specs/PRD.md) lines 146-148
- **Animation Guidelines:** PRD lines 459-512
- **Existing Animations:** [src/components/animations/](../../src/components/animations/)

---

## Next Steps

1. Create `ScrollIndicator.tsx` component (or add to Hero section)
2. Add bounce animation with Framer Motion
3. Position at bottom center of hero
4. Test animation smoothness
5. Add click handler for smooth scroll (optional)
6. Test on mobile (hide if needed)

---

**Status:** ❌ Not Started
**Blocked By:** None
**Estimated Completion:** 1 hour
