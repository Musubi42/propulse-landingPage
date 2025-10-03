# Missing Feature: "Fonce, tu en es capable!" Tagline

**Priority:** 🔴 CRITICAL
**PRD Reference:** Lines 69, 133, 306
**Impact:** Core emotional hook missing - this is THE brand tagline
**Estimated Effort:** 2-4 hours

---

## Problem Statement

The tagline **"Fonce, tu en es capable!"** is completely absent from the implementation. This is not a minor oversight—this phrase is:

1. **The origin story** - Hugo's life changed when someone told him this (PRD line 299)
2. **The emotional core** - It represents the entire mission of Propulse
3. **The call to action** - It's encouragement, not instruction
4. **Required in 2 locations** - Hero section AND after founder stories

---

## PRD Requirements

### Location 1: Hero Section

**PRD Lines 132-133:**
> **Tagline (animated/highlighted):**
> **"Fonce, tu en es capable !"**

**PRD Lines 69-71:**
> **Special Text:** "Fonce, tu en es capable!" style
> - Hand-written feel OR bold italic treatment
> - Stands out visually from other text

### Location 2: After Founder Stories

**PRD Lines 305-306:**
> **Highlighted Quote (below both stories):**
> **"Fonce, tu en es capable !"**

---

## Current Implementation Status

- ❌ **Hero Section:** No tagline present (only headline and subheadline)
- ❌ **After Founders:** No highlighted quote present
- ❌ **Anywhere else:** Not found in any section

---

## Implementation Requirements

### Task 1.1: Add to Hero Section

**Location:** [src/components/sections/HeroSection.tsx](../../src/components/sections/HeroSection.tsx)

**Visual Treatment Options:**

**Option A: Hand-Written Feel** (Preferred per PRD)
```tsx
<div className="mt-6 relative">
  <span className="text-3xl md:text-4xl font-handwriting text-primary-orange italic">
    "Fonce, tu en es capable !"
  </span>
  {/* Optional: Animated pen underline SVG */}
  <PenLine variant="underline" className="mt-2" />
</div>
```

**Option B: Bold Italic Treatment**
```tsx
<div className="mt-6">
  <p className="text-3xl md:text-4xl font-bold italic text-primary-orange">
    "Fonce, tu en es capable !"
  </p>
</div>
```

**Animation Requirements:**
- Fade in after headline and subheadline
- Optional: Text reveals character-by-character (typewriter effect)
- Optional: Pen line "writes" underneath
- Stagger delay: ~0.8s after subheadline appears

**Styling:**
- Stand out from other text (size, color, style)
- Use Burnt Orange accent color (#D97642) for emphasis
- Consider adding quotation marks or decorative elements

---

### Task 1.2: Add After Founder Stories

**Location:** [src/components/sections/FoundersSection.tsx](../../src/components/sections/FoundersSection.tsx)

**Placement:**
- Below both founder story cards
- Above the next section (Mentors)
- Centered, with generous padding

**Visual Treatment:**
```tsx
<div className="mt-16 text-center">
  <blockquote className="text-4xl md:text-5xl font-bold italic text-primary-orange">
    "Fonce, tu en es capable !"
  </blockquote>
  {/* Optional: Pen line decoration */}
  <PenLine variant="horizontal-accent" className="mx-auto mt-4" />
</div>
```

**Animation:**
- Fade in + scale when scrolled into view
- Optional: Pen line draws from left to right underneath

---

## Typography Considerations

**Font Options:**

1. **Hand-written font** (if adding custom font):
   - Caveat, Pacifico, Dancing Script, or similar
   - Load via Google Fonts or local
   - Only use for this tagline (don't overuse)

2. **Bold Italic from existing font stack**:
   - Inter Bold Italic (current sans-serif)
   - Merriweather Bold Italic (current serif)
   - Easier to implement, maintains consistency

**Recommendation:** Start with bold italic from existing fonts, consider hand-written font as enhancement later.

---

## Accessibility Considerations

- Ensure sufficient color contrast (orange on cream background)
- Use semantic HTML (`<blockquote>` or `<p>` with appropriate role)
- Don't rely solely on styling to convey importance
- Consider adding `aria-label` for screen readers if using decorative font

---

## Example Implementation

### Hero Section (Full Context)

```tsx
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text Content */}
          <div className="space-y-6">
            <div className="text-sm font-medium text-secondary-text">
              100% gratuit • 100% à distance
            </div>

            <FadeIn delay={0.1}>
              <h1 className="text-5xl md:text-6xl font-bold text-primary-text">
                Propulse ton avenir vers les{" "}
                <span className="relative">
                  Grandes Écoles
                  <PenLine variant="underline" className="mt-2" />
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-xl text-secondary-text">
                Un accompagnement gratuit et à distance pour les lycéens motivés.
                Rejoins un réseau de mentors étudiants et alumni des Grandes Écoles.
              </p>
            </FadeIn>

            {/* NEW: Tagline */}
            <FadeIn delay={0.5}>
              <div className="mt-8 mb-8">
                <p className="text-4xl font-bold italic text-primary-orange">
                  "Fonce, tu en es capable !"
                </p>
              </div>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.7}>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* ... existing CTA buttons ... */}
              </div>
            </FadeIn>
          </div>

          {/* Right: Image */}
          {/* ... existing hero image ... */}
        </div>
      </div>
    </section>
  );
}
```

### After Founders Section

```tsx
export function FoundersSection() {
  return (
    <section className="py-20 bg-background-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          L'histoire derrière Propulse
        </h2>

        {/* Founder Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Arthur and Hugo cards */}
        </div>

        {/* NEW: Highlighted "Fonce!" Quote */}
        <FadeIn delay={0.2}>
          <div className="text-center mt-16 pt-8 border-t border-tertiary">
            <blockquote className="text-5xl md:text-6xl font-bold italic text-primary-orange mb-6">
              "Fonce, tu en es capable !"
            </blockquote>
            <p className="text-lg text-secondary-text max-w-2xl mx-auto">
              C'est cette phrase qui a changé nos vies. C'est cette même phrase
              que nous voulons transmettre à chaque lycéen motivé.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
```

---

## Testing Checklist

- [ ] Tagline appears in hero section
- [ ] Tagline appears after founder section
- [ ] Text is visually distinct from surrounding content
- [ ] Animation triggers correctly on scroll
- [ ] Color contrast passes WCAG AA (4.5:1 minimum)
- [ ] Responsive on mobile (text size adjusts)
- [ ] Quotation marks render correctly
- [ ] French typography (including space before !)

---

## References

- **PRD:** [specs/PRD.md](../../specs/PRD.md) lines 69, 133, 305-306
- **Hugo's Story:** PRD line 299 - "ma vie aurait pu être radicalement différente si on ne m'avait pas dit : « fonce, tu en es capable ! »"
- **Visual Identity:** PRD lines 69-71
- **Color Palette:** [specs/Palette-colors.md](../../specs/Palette-colors.md)

---

## Next Steps

1. Choose typography approach (hand-written vs. bold italic)
2. Add to Hero section first (highest visibility)
3. Add to Founders section second
4. Test animations and responsiveness
5. Gather feedback on visual treatment

---

**Status:** ❌ Not Started
**Blocked By:** None
**Estimated Completion:** 2-4 hours
