# Z-Index Hierarchy

**Last Updated:** 2025-10-03
**Purpose:** Document the z-index layering system to prevent overlapping issues

---

## Z-Index Stack Order (Top to Bottom)

### Global Navigation (Highest Priority)

| Element | Z-Index | Location | Purpose |
|---------|---------|----------|---------|
| **Header** | `z-50` | `src/components/sections/Header.tsx` | Global navigation, always on top |
| Mobile Menu | `z-50` (within header) | Header.tsx | Mobile dropdown menu |

### Timeline UI Elements

| Element | Z-Index | Location | Purpose |
|---------|---------|----------|---------|
| **Timeline Dots** | `z-40` | `src/components/timeline/FullscreenTimeline.tsx` | Phase navigation dots |
| Progress Indicator | `z-40` | FullscreenTimeline.tsx | "Phase X / 6" at bottom |
| **Pen Line** | `z-30` | FullscreenTimeline.tsx | Hand-drawn connector line |
| Scroll Hint | `z-40` | FullscreenTimeline.tsx | Bouncing arrow hint |

### Content Layers

| Element | Z-Index | Location | Purpose |
|---------|---------|----------|---------|
| Timeline Cards | `z-0` (default) | FullscreenTimeline.tsx | Phase content cards |
| Card Content | relative | FullscreenTimeline.tsx | Text, icons, activities |

### Special Cases

| Element | Z-Index | Location | Notes |
|---------|---------|----------|-------|
| TimelineDots (internal) | `z-10` | TimelineDots.tsx | Dots above pen line |
| Pen Line Container | `z-0` | TimelinePenLine.tsx | Behind dots |

---

## Visual Hierarchy (Top to Bottom)

```
┌───────────────────────────────────────┐
│  [Header - z-50] ← ALWAYS ON TOP     │ ← Header
├───────────────────────────────────────┤
│                                       │
│  [Timeline Dots - z-40]              │ ← Below header
│  ───────────────── [Pen Line - z-30] │ ← Below dots
│                                       │
│  ┌─────────────────────────────┐    │
│  │  Phase Card Content (z-0)   │    │ ← Background layer
│  │                               │    │
│  └─────────────────────────────┘    │
│                                       │
│  [Progress Indicator - z-40]         │ ← Bottom UI
└───────────────────────────────────────┘
```

---

## Rules & Guidelines

### ✅ DO

1. **Keep header at z-50** - Global navigation should always be accessible
2. **Timeline UI at z-30-40** - Below header, above content
3. **Use consistent increments** - Increment by 10 for clarity (z-30, z-40, z-50)
4. **Document changes** - Update this file when adding new layers

### ❌ DON'T

1. **Never use z-50 or higher** (except header)
2. **Avoid arbitrary values** - Use documented layers
3. **Don't use negative z-index** - Keep stack positive
4. **Don't stack modals/overlays** without planning

---

## Common Issues & Solutions

### Issue: Timeline overlaps header
**Solution:** Ensure timeline elements use z-40 or lower

```tsx
// ❌ WRONG - Overlaps header
<div className="fixed top-8 z-50">...</div>

// ✅ CORRECT - Below header
<div className="fixed top-20 z-40">...</div>
```

### Issue: Pen line covers dots
**Solution:** Dots should be z-10 relative to pen line's z-0

```tsx
// TimelineDots.tsx
<nav className="relative z-10">  ← Above pen line

// TimelinePenLine.tsx
<div className="z-0">  ← Behind dots
```

### Issue: Multiple fixed elements conflict
**Solution:** Use hierarchy diagram above to determine correct z-index

---

## Migration Notes

### v1.5 - GSAP Fullscreen Timeline (2025-10-03)

**Changes:**
- Timeline dots: `z-50` → `z-40` (below header)
- Pen line: `z-40` → `z-30` (below dots)
- Progress indicator: `z-50` → `z-40` (below header)
- Top position: `top-8` → `top-20` (account for header height)

**Reason:** Fixed overlap with header (z-50)

---

## Testing Checklist

When adding new layers:

- [ ] Test on desktop (header visible)
- [ ] Test on mobile (mobile menu opens correctly)
- [ ] Test scrolling (no overlaps during scroll)
- [ ] Test on `/programme` page (timeline doesn't overlap header)
- [ ] Test on homepage (no conflicts with other sections)

---

## Files to Check

When debugging z-index issues:

1. **Header:** `src/components/sections/Header.tsx`
2. **Timeline:** `src/components/timeline/FullscreenTimeline.tsx`
3. **Dots:** `src/components/timeline/TimelineDots.tsx`
4. **Pen Line:** `src/components/timeline/TimelinePenLine.tsx`
5. **Layout:** `src/app/layout.tsx` (global structure)

---

## Quick Reference

### Standard Z-Index Values

```typescript
// Use these values for consistency
export const Z_INDEX = {
  HEADER: 50,           // Global navigation
  TIMELINE_DOTS: 40,    // Timeline UI
  PROGRESS: 40,         // Bottom indicators
  PEN_LINE: 30,         // Decorative line
  CONTENT: 0,           // Cards, text
} as const;
```

### Tailwind Classes

```css
z-0     /* Content layer (cards) */
z-10    /* Internal stacking (dots > pen line) */
z-20    /* Reserved */
z-30    /* Pen line */
z-40    /* Timeline UI */
z-50    /* Header (global nav) */
```

---

**Status:** ✅ Hierarchy stable and documented
**Last Issue:** Header overlap - Fixed 2025-10-03
**Next Review:** When adding new fixed/absolute positioned elements
