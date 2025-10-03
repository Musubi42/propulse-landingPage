# Missing Feature: Pen-Drawn Edge on Hero Circle

**Priority:** 🔴 CRITICAL (Visual Identity)
**PRD Reference:** Lines 76-78, 120
**Impact:** Loses hand-crafted, warm aesthetic
**Estimated Effort:** 2-3 hours

---

## Problem Statement

The PRD specifies that the hero image circle should have a **"pen-drawn edge effect"** to create an imperfect, hand-drawn feel. The current implementation shows a standard perfect circle.

**Current:** Clean circle crop (border-radius: 50%)
**Required:** Pen-drawn edge (imperfect circle, hand-drawn feel)

**Impact:** Loses the warm, approachable, human touch that distinguishes Propulse from corporate associations.

---

## PRD Requirements

### Circle Crops (PRD Lines 76-78)

> **Circle Crops**
> - Hero image: Large circle on right side (like 1j1m)
> - Consider pen-drawn edge effect (imperfect circle, hand-drawn feel)
> - Alternative: Use mask with subtle pen stroke outline

### Hero Section (PRD Line 120)

> **Visual:**
> - Large headline on left
> - **Circle-cropped hero image on right** (mockup photo for now)
> - Soft polymorph shape as background accent
> - Animated pen line that "writes" the tagline

---

## Implementation Options

### Option A: SVG Mask with Hand-Drawn Path (Recommended)

**Pros:**
- Most authentic "pen-drawn" look
- Can customize imperfections
- Scalable and performant

**Cons:**
- Requires creating SVG path
- Slightly more complex implementation

**Implementation:**

```tsx
export function HeroImage() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-auto">
        <defs>
          {/* Hand-drawn circle mask */}
          <clipPath id="pen-drawn-circle">
            <path
              d="M 200 20
                 Q 280 25, 340 85
                 Q 380 145, 375 210
                 Q 370 275, 315 330
                 Q 255 385, 190 380
                 Q 125 375, 70 320
                 Q 15 260, 20 195
                 Q 25 130, 80 75
                 Q 140 20, 200 20 Z"
              fill="#000"
            />
          </clipPath>
        </defs>

        {/* Image with mask applied */}
        <image
          href="/images/hero-image.jpg"
          width="400"
          height="400"
          clipPath="url(#pen-drawn-circle)"
        />

        {/* Pen stroke outline */}
        <path
          d="M 200 20
             Q 280 25, 340 85
             Q 380 145, 375 210
             Q 370 275, 315 330
             Q 255 385, 190 380
             Q 125 375, 70 320
             Q 15 260, 20 195
             Q 25 130, 80 75
             Q 140 20, 200 20 Z"
          fill="none"
          stroke="#3D3D3D"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}
```

**How it works:**
1. SVG `<clipPath>` defines the hand-drawn circle shape
2. Image is placed inside and clipped to that shape
3. Same path is drawn as a stroke outline (pen line)
4. Quadratic Bézier curves (Q) create imperfect, organic curves

---

### Option B: CSS with SVG Border

**Pros:**
- Simpler implementation
- Works with standard `<img>` tag
- Easier to maintain

**Cons:**
- Less control over imperfections
- Border may not look as authentic

**Implementation:**

```tsx
export function HeroImage() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Background circle with pen stroke */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 400"
      >
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="#3D3D3D"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="2 3"
          opacity="0.6"
        />
      </svg>

      {/* Image */}
      <div className="relative rounded-full overflow-hidden border-4 border-primary-navy/20">
        <img
          src="/images/hero-image.jpg"
          alt="Étudiant et mentor Propulse"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
```

**How it works:**
1. Standard rounded circle for image
2. SVG circle overlaid with dashed stroke (simulates pen)
3. Less authentic but much simpler

---

### Option C: CSS Filter with Border Radius Variation

**Pros:**
- Purely CSS
- Lightweight

**Cons:**
- Limited imperfection control
- May not achieve desired hand-drawn look

**Implementation:**

```css
.hero-circle {
  border-radius: 48% 52% 50% 50% / 50% 48% 52% 50%;
  border: 3px solid rgba(61, 61, 61, 0.6);
  filter: url(#roughen);
}
```

**Not recommended** - too subtle, doesn't match PRD intent.

---

## Recommended Implementation (Option A Enhanced)

### Component: PenDrawnCircle.tsx

**Location:** [src/components/ui/PenDrawnCircle.tsx](../../src/components/ui/PenDrawnCircle.tsx)

```tsx
interface PenDrawnCircleProps {
  src: string;
  alt: string;
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

export function PenDrawnCircle({
  src,
  alt,
  className,
  strokeColor = '#3D3D3D',
  strokeWidth = 3
}: PenDrawnCircleProps) {
  // Unique ID for this instance (for multiple circles on same page)
  const maskId = useId();

  // Hand-drawn circle path (slightly imperfect)
  const circlePath = `
    M 200 25
    Q 275 28, 330 83
    Q 378 138, 375 205
    Q 372 272, 320 325
    Q 265 378, 200 375
    Q 135 372, 82 322
    Q 25 267, 28 200
    Q 31 133, 85 80
    Q 140 25, 200 25 Z
  `;

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 400 400"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <clipPath id={`pen-circle-${maskId}`}>
            <path d={circlePath} />
          </clipPath>
        </defs>

        {/* Image */}
        <image
          href={src}
          x="0"
          y="0"
          width="400"
          height="400"
          clipPath={`url(#pen-circle-${maskId})`}
          preserveAspectRatio="xMidYMid slice"
        />

        {/* Pen stroke outline */}
        <motion.path
          d={circlePath}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.7}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>

      {/* Alt text for accessibility (hidden) */}
      <span className="sr-only">{alt}</span>
    </div>
  );
}
```

---

### Usage in Hero Section

```tsx
import { PenDrawnCircle } from '@/components/ui/PenDrawnCircle';

export function HeroSection() {
  return (
    <section className="relative min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text */}
          <div>
            {/* ... headline, subheadline, CTAs ... */}
          </div>

          {/* Right: Hero Image with Pen-Drawn Circle */}
          <div className="flex justify-center">
            <PenDrawnCircle
              src="/images/hero-lyceen-mentor.jpg"
              alt="Un lycéen et son mentor lors d'une session Propulse"
              className="w-full max-w-lg"
              strokeColor="#3D3D3D"
              strokeWidth={3}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
```

---

## Visual Characteristics

### Hand-Drawn Path Design

**Key Properties:**
1. **Imperfect curves** - Not a perfect circle (vary radius by 5-10%)
2. **Organic flow** - Use Quadratic Bézier curves (Q) for smooth, natural curves
3. **Slight wobble** - Add subtle variations in control points
4. **Consistent direction** - Path flows smoothly (clockwise or counter-clockwise)

**Path Breakdown:**
```
M 200 25          // Start at top (slightly off-center)
Q 275 28, 330 83  // Top-right curve (control point, end point)
Q 378 138, 375 205 // Right curve
Q 372 272, 320 325 // Bottom-right curve
Q 265 378, 200 375 // Bottom curve
Q 135 372, 82 322  // Bottom-left curve
Q 25 267, 28 200   // Left curve
Q 31 133, 85 80    // Top-left curve
Q 140 25, 200 25 Z // Back to start (close path)
```

---

## Animation

**Pen "Drawing" the Circle:**

```tsx
<motion.path
  d={circlePath}
  initial={{ pathLength: 0, opacity: 0 }}
  animate={{ pathLength: 1, opacity: 0.7 }}
  transition={{
    pathLength: { duration: 2, ease: "easeInOut" },
    opacity: { duration: 0.5 }
  }}
/>
```

**On Scroll (Alternative):**

```tsx
const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

<motion.path
  d={circlePath}
  animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
  // ...
/>
```

---

## Color & Styling

**Stroke Color:**
- Default: `#3D3D3D` (Pen Line color from palette)
- Alternative: `#1B3A52` (Deep Navy)
- Accent: `#D97642` (Burnt Orange) for emphasis

**Stroke Width:**
- Subtle: 2px
- Standard: 3px
- Bold: 4-5px

**Opacity:**
- Background circles: 0.3-0.5
- Hero circle: 0.6-0.8
- Hover/active: 1.0

---

## Responsive Behavior

**Desktop (1024px+):**
- Full size circle (400-500px)
- Visible pen stroke (3px)
- Animated drawing effect

**Tablet (768px-1023px):**
- Medium circle (300-400px)
- Standard pen stroke (2-3px)

**Mobile (< 768px):**
- Smaller circle (250-300px)
- Thinner stroke (2px)
- Optional: Disable animation (performance)

---

## Accessibility

- [ ] Use `<image>` with `href` (not `xlink:href`, deprecated)
- [ ] Provide alt text via hidden `<span>` or `aria-label`
- [ ] Ensure image has sufficient contrast with background
- [ ] Don't rely on circle shape to convey meaning
- [ ] Test with screen readers

---

## Testing Checklist

- [ ] Circle appears in hero section
- [ ] Edge has hand-drawn, imperfect appearance
- [ ] Pen stroke outlines the circle
- [ ] Image scales responsively
- [ ] Animation triggers correctly (if implemented)
- [ ] Works in all browsers (Chrome, Firefox, Safari, Edge)
- [ ] No performance issues
- [ ] Alt text accessible to screen readers

---

## Alternative: Using Founder Photos

**PRD Line 261:**
> Photo (circle crop) + name + school + story

**If applying to founder photos:**

```tsx
<PenDrawnCircle
  src="/images/founders/arthur-costa.jpg"
  alt="Arthur Costa, co-fondateur de Propulse"
  className="w-32 h-32 mx-auto mb-4"
  strokeWidth={2}
/>
```

**Smaller strokes** for smaller circles (maintain visual balance).

---

## References

- **PRD:** [specs/PRD.md](../../specs/PRD.md) lines 76-78, 120
- **Visual Identity:** PRD lines 34-40 (Pen & Journey Metaphor)
- **Color Palette:** [specs/Palette-colors.md](../../specs/Palette-colors.md) - Pen Line: #3D3D3D
- **Inspiration:** 1jeune1mentor.fr (circle crops with soft edges)

---

## Next Steps

1. Create `PenDrawnCircle.tsx` component
2. Generate hand-drawn circle SVG path
3. Apply to hero image in `HeroSection.tsx`
4. Test in all browsers and screen sizes
5. Optional: Apply to founder photos
6. Optional: Add animated "drawing" effect

---

**Status:** ❌ Not Started
**Blocked By:** None
**Estimated Completion:** 2-3 hours
