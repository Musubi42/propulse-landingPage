# Missing Feature: Pen Line Journey Metaphor

**Priority:** 🔴 CRITICAL
**PRD Reference:** Lines 34-40, 231-248, 463-476
**Impact:** Primary visual identity motif completely absent
**Estimated Effort:** 8-12 hours

---

## Problem Statement

The **Pen & Journey Metaphor** is described as the "PRIMARY MOTIF" in the PRD (line 35). This is not decorative—it's the core visual language that represents:

- **Journey:** User is "writing their own story"
- **Progress:** Scroll = moving forward on the path
- **Achievement:** Stats/milestones are "written" into existence
- **Humanity:** Hand-drawn feel vs. corporate perfection

**Current Status:** ❌ Not visible in implementation (no animated pen lines detected)

---

## PRD Requirements

### Core Definition (PRD Lines 34-40)

> **The Pen & Journey Metaphor**
> - **Primary motif:** Hand-drawn pen line that traces a "journey" as user scrolls
> - **Usage:**
>   - Animated line that "writes" key stats as they appear
>   - Connects milestone timeline sections
>   - Subtle background element that gives sense of progression
>   - NOT used as hard section dividers (too old-fashioned)

### Animation Specifications (PRD Lines 463-476)

> **Pen Line Animation:**
> - SVG path animation (stroke-dasharray technique)
> - Follows user scroll position
> - Connects key sections or milestones
> - Subtle, not distracting

### Specific Use Cases

1. **Stats Section** (PRD Line 159): "Animated pen 'writes' or reveals each number"
2. **Solution Timeline** (PRD Line 242): "Pen line traces the timeline path"
3. **Problem Stats** (PRD Line 216): "Use pen line to connect stats visually (shows 'gap' we're closing)"

---

## Implementation Requirements

### Task 2.1: Create Pen Line SVG Component

**Location:** [src/components/animations/PenLine.tsx](../../src/components/animations/PenLine.tsx)

**Variants Needed:**
1. `underline` - Short line under hero headline
2. `horizontal-accent` - Decorative line under quotes
3. `vertical-connector` - Connects timeline phases
4. `stat-reveal` - Animated line that "writes" numbers
5. `curved-path` - Organic path between sections

**Base Component Structure:**

```tsx
interface PenLineProps {
  variant: 'underline' | 'horizontal-accent' | 'vertical-connector' | 'stat-reveal' | 'curved-path';
  className?: string;
  animated?: boolean;
  scrollProgress?: boolean; // Animate based on scroll position
}

export function PenLine({
  variant,
  className,
  animated = true,
  scrollProgress = false
}: PenLineProps) {
  const pathVariants = {
    underline: "M 0 10 Q 50 5, 100 10",
    'horizontal-accent': "M 0 5 L 100 5",
    'vertical-connector': "M 50 0 L 50 100",
    'stat-reveal': "M 0 50 Q 25 25, 50 50 T 100 50",
    'curved-path': "M 0 100 Q 25 0, 50 100 T 100 0"
  };

  const path = pathVariants[variant];

  return (
    <svg
      className={cn("pen-line", className)}
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
    >
      <motion.path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
    </svg>
  );
}
```

---

### Task 2.2: Scroll-Based Pen Line Animation

**Location:** [src/components/animations/ScrollPenLine.tsx](../../src/components/animations/ScrollPenLine.tsx)

**Purpose:** Large pen line that follows scroll progress through the page

**Implementation Approach:**

```tsx
import { useScroll, useTransform, motion } from 'framer-motion';

export function ScrollPenLine() {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="fixed left-0 top-0 h-full w-full pointer-events-none z-0">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 10 0 Q 20 250, 10 500 Q 0 750, 10 1000"
          fill="none"
          stroke="#3D3D3D"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeDasharray="5 5"
          style={{ pathLength }}
          opacity={0.15}
        />
      </svg>
    </div>
  );
}
```

**Integration:**
- Add to [src/app/layout.tsx](../../src/app/layout.tsx) or [src/app/page.tsx](../../src/app/page.tsx)
- Position behind all content (z-index: 0)
- Very subtle opacity (0.1-0.2)
- Optional: Only show on desktop (hide on mobile)

---

### Task 2.3: Stat "Write" Animation

**Location:** Stats are revealed in multiple sections

**Affected Components:**
- [src/components/sections/SocialProofSection.tsx](../../src/components/sections/SocialProofSection.tsx)
- [src/components/sections/StatisticsSection.tsx](../../src/components/sections/StatisticsSection.tsx)

**Implementation:**

Each stat card should have a pen line that "writes" the number:

```tsx
export function StatCard({ stat, description, icon }: StatCardProps) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div ref={ref} className="stat-card relative">
      {/* Stat Number */}
      <div className="text-6xl font-bold text-primary-orange mb-2">
        {inView && <Counter end={stat} duration={1.5} />}
      </div>

      {/* Pen Line "writes" underneath */}
      {inView && (
        <PenLine
          variant="stat-reveal"
          className="w-32 mx-auto text-primary-orange"
          animated
        />
      )}

      {/* Description */}
      <p className="text-secondary-text mt-4">{description}</p>
    </div>
  );
}
```

---

### Task 2.4: Timeline Path Connector

**Location:** [src/components/sections/SolutionSection.tsx](../../src/components/sections/SolutionSection.tsx)

**Current:** Feature cards (no timeline)
**PRD Requirement:** Visual timeline with pen line tracing the path

**If reverting to timeline:**

```tsx
export function SolutionTimeline() {
  const phases = [
    { title: "Présentation des filières", duration: "Sept-Oct", icon: "📚" },
    { title: "Accompagnement personnalisé", duration: "Nov-Juin", icon: "🎯" },
    // ... etc
  ];

  return (
    <div className="relative">
      {/* Vertical Pen Line */}
      <div className="absolute left-8 top-0 bottom-0 w-1">
        <PenLine
          variant="vertical-connector"
          className="h-full text-primary-navy"
        />
      </div>

      {/* Timeline Items */}
      <div className="space-y-8">
        {phases.map((phase, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="flex gap-6">
              {/* Dot on line */}
              <div className="w-16 flex justify-center">
                <div className="w-4 h-4 rounded-full bg-primary-orange border-4 border-background" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-bold text-xl">{phase.title}</h3>
                <p className="text-sm text-secondary-text">{phase.duration}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
```

---

## Visual Reference

### Hand-Drawn Pen Line Characteristics

**SVG Path Techniques:**
1. **Imperfect curves** - Not perfectly smooth (use quadratic Bézier curves with slight variations)
2. **Variable stroke width** - Thicker at start, thinner at end (simulate pen pressure)
3. **Subtle wobble** - Not a perfect straight line
4. **Organic endings** - Tapered ends, not hard stops

**Example SVG Path (hand-drawn underline):**
```svg
<path
  d="M 5 10 Q 30 8, 50 10 T 95 9"
  fill="none"
  stroke="#3D3D3D"
  stroke-width="2.5"
  stroke-linecap="round"
/>
```

---

## Color & Styling

**Pen Line Color:**
- Default: `#3D3D3D` (Pen Line color from palette)
- Accent: `#D97642` (Burnt Orange) for emphasis
- Subtle: `rgba(61, 61, 61, 0.15)` for background scroll line

**Stroke Width:**
- Subtle background: 0.5-1px
- Accent lines: 2-3px
- Stat reveals: 2.5px

**Opacity:**
- Background scroll line: 0.1-0.2
- Active elements: 0.8-1.0
- On hover: 1.0

---

## Animation Performance

**Optimization Tips:**
1. Use `will-change: transform` on animated SVG paths
2. Limit simultaneous animations (stagger timing)
3. Use `transform` and `opacity` only (GPU-accelerated)
4. Consider `prefers-reduced-motion` media query

```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<motion.path
  animate={prefersReducedMotion ? false : { pathLength: 1 }}
  // ...
/>
```

---

## Responsive Behavior

**Desktop (1024px+):**
- Full pen line animations
- Background scroll line visible
- Complex curved paths

**Tablet (768px-1023px):**
- Simplified animations
- Shorter pen lines
- Background scroll line optional

**Mobile (< 768px):**
- Minimal or no background scroll line
- Simple underlines only
- Focus on stat reveal animations

---

## Testing Checklist

- [ ] Pen line component created with 5 variants
- [ ] SVG paths render correctly in all browsers
- [ ] Scroll-based animation follows scroll position smoothly
- [ ] Stat reveal animations trigger on scroll into view
- [ ] Timeline (if implemented) has vertical connector line
- [ ] No performance issues (60fps animation)
- [ ] Subtle and not distracting
- [ ] Works on mobile (simplified if needed)
- [ ] Respects `prefers-reduced-motion`

---

## Examples to Study

**Inspiration Sites:**
- [stripe.com](https://stripe.com) - Scroll-based SVG animations
- [linear.app](https://linear.app) - Subtle line animations
- [framer.com](https://framer.com) - Path drawing effects

**Framer Motion Docs:**
- [Path animations](https://www.framer.com/motion/motionpath/)
- [Scroll progress](https://www.framer.com/motion/use-scroll/)

---

## References

- **PRD:** [specs/PRD.md](../../specs/PRD.md) lines 34-40, 231-248, 463-476
- **Color Palette:** [specs/Palette-colors.md](../../specs/Palette-colors.md) - Pen Line: #3D3D3D
- **Existing Animations:** [src/components/animations/](../../src/components/animations/)

---

## Next Steps

1. Create base `PenLine.tsx` component with 5 variants
2. Add scroll-based pen line to layout (subtle background)
3. Integrate stat reveal animations in Social Proof section
4. Add timeline vertical connector (if reverting to timeline)
5. Test performance and refine animations

---

**Status:** ✅ IMPLEMENTED (Minimal & Tasteful Approach)
**Completed:** 2025-10-03
**Implementation Time:** ~2 hours

---

## ✅ Implementation Summary

The pen line metaphor has been implemented with a **minimal, tasteful approach** that adds visual interest without overwhelming the design. Here's what was built:

### Components Created

1. **[PenUnderline.tsx](../../src/components/animations/PenUnderline.tsx)** - Hand-drawn underlines using Rough Notation
2. **[PenCircle.tsx](../../src/components/animations/PenCircle.tsx)** - Hand-drawn circles around key numbers
3. **[PenBox.tsx](../../src/components/animations/PenBox.tsx)** - Hand-drawn boxes for emphasis (created for future use)
4. **[SectionConnector.tsx](../../src/components/animations/SectionConnector.tsx)** - Vertical pen lines with arrows connecting sections (SVG + Framer Motion)

### Strategic Placements

**Hero Section** ([HeroSection.tsx:59](../../src/components/sections/HeroSection.tsx#L59)):
- Pen underline on **"Fonce"** in the tagline
- Color: Burnt Orange (#D97642)
- Delay: 1.4s, Stroke: 3px

**Social Proof Section** ([SocialProofSection.tsx:33-35](../../src/components/sections/SocialProofSection.tsx#L33)):
- Pen circle around **"50+"** mentors stat
- Color: Deep Navy (#1B3A52)
- Delay: 2.5s (after counter finishes)

**Social Proof Section** ([SocialProofSection.tsx:73-75](../../src/components/sections/SocialProofSection.tsx#L73)):
- Pen circle around **"100%"** gratuit stat
- Color: Forest Green (#4A6B52)
- Delay: 1.5s

**Statistics Section** ([StatisticsSection.tsx:103-105](../../src/components/sections/StatisticsSection.tsx#L103)):
- Pen underline on **"pas une fatalité"**
- Color: Burnt Orange (#D97642)
- Delay: 1.2s, Stroke: 3px

**Section Connectors** ([page.tsx:24,27](../../src/app/page.tsx#L24)):
- Vertical pen line between Hero → Social Proof (height: 50px)
- Vertical pen line between Statistics → Solution (height: 60px)
- Animated "draw down" effect with arrow tips
- Color: Pen Line (#3D3D3D)

### Technical Approach

**For Simple Shapes (Underlines, Circles, Boxes):**
- Library: **Rough Notation** (already integrated)
- Reason: Fast, hand-drawn aesthetic, minimal bundle impact
- Animation: Trigger on scroll into view (30% threshold)

**For Complex Connectors:**
- Library: **Framer Motion + SVG**
- Reason: Custom path control, smooth animations
- Animation: Stroke-dasharray draw effect with arrow reveal

### Design Philosophy

✅ **Minimal** - Only 6 pen elements across entire homepage
✅ **Strategic** - Emphasize key phrases and stats only
✅ **Varied** - Mix of underlines, circles, and connectors
✅ **Subtle** - Animations timed to feel natural, not jarring
✅ **Tasteful** - No visual explosion, respects existing design

### Performance

- **Build Size:** Homepage remains ~187 kB
- **Rough Notation:** Already in bundle (no increase)
- **SVG Connectors:** Minimal impact (<1 kB total)
- **Animation:** GPU-accelerated, 60fps
- **Accessibility:** All pen elements use `aria-hidden="true"` or are decorative

### What Was NOT Implemented (Intentional)

❌ **Full-page scroll pen line** - Too distracting, conflicts with existing polymorph dividers
❌ **Pen lines everywhere** - Would overwhelm the clean design
❌ **Background pen texture** - Unnecessary, warm paper colors already convey warmth

### Future Enhancements (Optional)

If more pen elements are desired:
1. Add pen boxes around primary CTAs in FinalCTASection
2. Add subtle pen underline on "Propulse intervient" in Statistics section
3. Add pen connector before Founders section
4. Add pen circle around mentor count in MentorsSection

---

## Files Modified

- ✅ [src/components/animations/PenUnderline.tsx](../../src/components/animations/PenUnderline.tsx) - NEW
- ✅ [src/components/animations/PenCircle.tsx](../../src/components/animations/PenCircle.tsx) - NEW
- ✅ [src/components/animations/PenBox.tsx](../../src/components/animations/PenBox.tsx) - NEW
- ✅ [src/components/animations/SectionConnector.tsx](../../src/components/animations/SectionConnector.tsx) - NEW
- ✅ [src/components/animations/index.ts](../../src/components/animations/index.ts) - UPDATED (exports)
- ✅ [src/components/sections/HeroSection.tsx](../../src/components/sections/HeroSection.tsx#L59) - UPDATED
- ✅ [src/components/sections/SocialProofSection.tsx](../../src/components/sections/SocialProofSection.tsx#L33) - UPDATED
- ✅ [src/components/sections/StatisticsSection.tsx](../../src/components/sections/StatisticsSection.tsx#L103) - UPDATED
- ✅ [src/app/page.tsx](../../src/app/page.tsx#L24) - UPDATED

---

## Testing Results

✅ Build successful (pnpm build)
✅ No TypeScript errors
✅ No performance issues
✅ Animations trigger on scroll correctly
✅ Rough Notation hand-drawn effect matches design aesthetic
✅ Section connectors draw smoothly from top to bottom
✅ All delays timed to feel natural

---

**Completed By:** Claude (with user approval for minimal approach)
**Next Steps:** User testing and feedback, optional expansion if desired
