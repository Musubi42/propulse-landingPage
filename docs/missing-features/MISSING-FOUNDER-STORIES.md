# Missing Feature: Full Founder Stories

**Priority:** 🔴 CRITICAL
**PRD Reference:** Lines 251-301
**Impact:** Emotional credibility and founder-led narrative completely diluted
**Estimated Effort:** 4-6 hours

---

## Problem Statement

The PRD explicitly states **"Founder-story led"** as a core principle (line 26). The current implementation shows only **brief quotes** in cards. The PRD requires **FULL detailed narratives** with:

- Complete personal journeys (childhood → struggles → breakthrough moment → current mission)
- **Bold emphasis** on key turning points
- Expertise tags
- Circle-cropped photos with names and schools

**Current Status:** ❌ Founder stories reduced to 2-3 sentence quotes (loses all emotional impact)

---

## PRD Requirements

### Section Structure (PRD Lines 251-262)

> **Section Title:** Nos fondateurs
>
> **Subheadline:** Rencontrez Arthur et Hugo, les deux fondateurs passionnés qui ont créé Propulse pour démocratiser l'accès aux formations d'excellence.
>
> **Layout:**
> - Two columns (or cards)
> - Photo (circle crop) + name + school + **story**

---

## Arthur Costa - Full Story Content

**PRD Lines 263-279**

### Required Content

**Photo:** Circle crop (pen-drawn edge effect)

**Title:**
> **Arthur Costa**
> Co-fondateur
> EDHEC Lille & Université Paris-Dauphine

**Story (FULL - not abbreviated):**

> Originaire du Sud-Ouest de la France, j'ai vécu dans un petit village de 400 habitants près de Tarbes avant de déménager dans la banlieue bordelaise. Issu d'un milieu plutôt rural, les longues études dans des établissements renommés n'allaient pas de soi.
>
> En Terminale, j'étais perdu quant à mes choix d'orientation. Mon professeur d'économie m'a conseillé les classes préparatoires — une filière que je ne connaissais pas jusqu'au milieu de mon année de terminale. **Ce conseil a probablement été le meilleur qu'on aurait pu me donner.**
>
> Après deux années de prépa passionnantes, j'ai intégré l'EDHEC Business School à Lille, École que je n'aurais jamais imaginé intégrer. Aujourd'hui diplômé de l'EDHEC et de Paris-Dauphine, **je souhaite aider des lycéens qui, comme moi, sont perdus dans l'univers de l'enseignement supérieur.**

**Expertises:** Mathématiques • Physique • Orientation • Mentorat

---

## Hugo Nicaise - Full Story Content

**PRD Lines 283-301**

### Required Content

**Photo:** Circle crop (pen-drawn edge effect)

**Title:**
> **Hugo Nicaise**
> Co-fondateur
> EDHEC Lille

**Story (FULL - not abbreviated):**

> Mon cheminement scolaire ne fut pas un long fleuve tranquille. De bon élève à élève moyen voire mauvais, j'ai fait le choix de m'orienter vers un baccalauréat STMG. Cette filière m'a réconcilié avec l'école, me faisant reprendre confiance en mes capacités scolaires.
>
> La "classe prépa" m'était complètement inconnue deux mois avant Parcoursup. **Tout s'est joué sur un conseil de ma professeure principale.** J'ai changé ma volonté de faire des études courtes pour partir vers une filière longue et sélective.
>
> La classe préparatoire fut le point d'orgue de ma réconciliation avec l'école. Aujourd'hui je travaille au cabinet du Directeur général du groupe AFD, dans un milieu que je n'aurais jamais pu côtoyer sans l'ascenseur social de la classe prépa et des grandes écoles.
>
> Quand je regarde en arrière, **je me rends compte que tout cela n'a tenu qu'à un fil et que ma vie aurait pu être radicalement différente si on ne m'avait pas dit : « fonce, tu en es capable ! »**

**Expertises:** Stratégie • Management • Partenariats • Développement

---

## Current Implementation vs. PRD

| Element | PRD Requirement | Current Implementation | Status |
|---------|----------------|----------------------|--------|
| Arthur's story length | ~150 words, 3 paragraphs | ~30 words, 1 quote | ❌ 80% shorter |
| Hugo's story length | ~150 words, 4 paragraphs | ~30 words, 1 quote | ❌ 80% shorter |
| Bold key moments | 2-3 bold sentences per story | None | ❌ Missing |
| Expertise tags | Listed for each founder | Not present | ❌ Missing |
| "Fonce!" origin | Hugo's quote includes this | Truncated/missing | ❌ Missing |
| Emotional arc | Struggle → breakthrough → mission | Flattened | ❌ Lost |

---

## Implementation Requirements

### Task 5.1 & 5.2: Expand Story Content

**Location:** [src/components/sections/FoundersSection.tsx](../../src/components/sections/FoundersSection.tsx)

**Current Structure (assumed):**
```tsx
// Current: Short quote cards
<div className="founder-card">
  <img src="..." alt="Arthur Costa" />
  <h3>Arthur Costa</h3>
  <p className="school">EDHEC & Dauphine</p>
  <p className="quote">"Short quote..."</p>
</div>
```

**Required Structure:**
```tsx
<div className="founder-card bg-white rounded-lg p-8 shadow-sm">
  {/* Photo */}
  <div className="mb-6 flex justify-center">
    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary-navy">
      <img
        src="/images/founders/arthur-costa.jpg"
        alt="Arthur Costa, co-fondateur de Propulse"
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* Name & Title */}
  <div className="text-center mb-6">
    <h3 className="text-2xl font-bold text-primary-text">Arthur Costa</h3>
    <p className="text-sm text-secondary-text">Co-fondateur</p>
    <p className="text-sm font-medium text-primary-navy">
      EDHEC Lille & Université Paris-Dauphine
    </p>
  </div>

  {/* Full Story */}
  <div className="space-y-4 text-secondary-text leading-relaxed">
    <p>
      Originaire du Sud-Ouest de la France, j'ai vécu dans un petit village
      de 400 habitants près de Tarbes avant de déménager dans la banlieue
      bordelaise. Issu d'un milieu plutôt rural, les longues études dans
      des établissements renommés n'allaient pas de soi.
    </p>
    <p>
      En Terminale, j'étais perdu quant à mes choix d'orientation. Mon
      professeur d'économie m'a conseillé les classes préparatoires — une
      filière que je ne connaissais pas jusqu'au milieu de mon année de
      terminale. <strong className="text-primary-text font-semibold">
      Ce conseil a probablement été le meilleur qu'on aurait pu me donner.
      </strong>
    </p>
    <p>
      Après deux années de prépa passionnantes, j'ai intégré l'EDHEC Business
      School à Lille, École que je n'aurais jamais imaginé intégrer. Aujourd'hui
      diplômé de l'EDHEC et de Paris-Dauphine, <strong className="text-primary-text font-semibold">
      je souhaite aider des lycéens qui, comme moi, sont perdus dans l'univers
      de l'enseignement supérieur.
      </strong>
    </p>
  </div>

  {/* Expertise Tags */}
  <div className="mt-6 pt-6 border-t border-tertiary">
    <p className="text-sm font-medium text-primary-navy mb-2">Expertises</p>
    <div className="flex flex-wrap gap-2">
      {['Mathématiques', 'Physique', 'Orientation', 'Mentorat'].map(tag => (
        <span
          key={tag}
          className="px-3 py-1 bg-background-secondary text-secondary-text text-sm rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
</div>
```

---

### Task 5.3: Layout Adjustment

**Current:** Likely horizontal cards optimized for short quotes
**Required:** Vertical cards with enough space for 3-4 paragraphs

**Layout Options:**

**Option A: Two-Column Grid (Desktop)**
```tsx
<div className="grid md:grid-cols-2 gap-8 lg:gap-12">
  <FounderCard founder={arthur} />
  <FounderCard founder={hugo} />
</div>
```

**Option B: Single Column (Alternating)**
```tsx
<div className="space-y-12 max-w-4xl mx-auto">
  <FounderCard founder={arthur} layout="left" />
  <FounderCard founder={hugo} layout="right" />
</div>
```

**Recommendation:** Option A (two-column grid) for symmetry and equal visual weight.

---

## Typography & Styling

### Story Text
- **Font:** Inter (body text) or Merriweather (if serif feel desired)
- **Size:** 16px (1rem) on mobile, 18px (1.125rem) on desktop
- **Line height:** 1.7 (comfortable reading)
- **Color:** Secondary text (#4A4A4A)

### Bold Emphasis
- **Font weight:** 600 (semibold) or 700 (bold)
- **Color:** Primary text (#2A2A2A) for contrast
- Use `<strong>` tag for semantic HTML

### Expertise Tags
- **Style:** Pill/badge shape (rounded-full)
- **Background:** Background secondary (#F5EFE6)
- **Text:** Secondary text (#4A4A4A)
- **Size:** Small (14px / 0.875rem)

---

## Responsive Behavior

**Desktop (1024px+):**
- Two columns side-by-side
- Photos 128px (w-32)
- Full paragraphs visible

**Tablet (768px-1023px):**
- Two columns, narrower gaps
- Photos 112px (w-28)

**Mobile (< 768px):**
- Single column, stacked
- Photos 96px (w-24)
- Maintain full story text (don't truncate)

---

## Animation

**Card Entrance:**
```tsx
<FadeIn delay={0.1}>
  <FounderCard founder={arthur} />
</FadeIn>
<FadeIn delay={0.2}>
  <FounderCard founder={hugo} />
</FadeIn>
```

**Photo Treatment:**
- Optional: Subtle scale on hover (1.05x)
- Smooth transition (0.3s)

---

## Accessibility

- [ ] Photos have descriptive alt text (include name and role)
- [ ] Proper heading hierarchy (H3 for names)
- [ ] Sufficient color contrast for text (WCAG AA)
- [ ] Readable line length (max 65-75 characters per line)
- [ ] Use semantic HTML (`<article>` for each founder card)

---

## Data Structure

**Recommended:** Create a founders data file

**Location:** [src/data/founders.ts](../../src/data/founders.ts)

```tsx
export const founders = [
  {
    id: 'arthur-costa',
    name: 'Arthur Costa',
    title: 'Co-fondateur',
    school: 'EDHEC Lille & Université Paris-Dauphine',
    photo: '/images/founders/arthur-costa.jpg',
    story: [
      "Originaire du Sud-Ouest de la France, j'ai vécu dans un petit village de 400 habitants près de Tarbes avant de déménager dans la banlieue bordelaise. Issu d'un milieu plutôt rural, les longues études dans des établissements renommés n'allaient pas de soi.",

      "En Terminale, j'étais perdu quant à mes choix d'orientation. Mon professeur d'économie m'a conseillé les classes préparatoires — une filière que je ne connaissais pas jusqu'au milieu de mon année de terminale. **Ce conseil a probablement été le meilleur qu'on aurait pu me donner.**",

      "Après deux années de prépa passionnantes, j'ai intégré l'EDHEC Business School à Lille, École que je n'aurais jamais imaginé intégrer. Aujourd'hui diplômé de l'EDHEC et de Paris-Dauphine, **je souhaite aider des lycéens qui, comme moi, sont perdus dans l'univers de l'enseignement supérieur.**"
    ],
    expertise: ['Mathématiques', 'Physique', 'Orientation', 'Mentorat']
  },
  {
    id: 'hugo-nicaise',
    name: 'Hugo Nicaise',
    title: 'Co-fondateur',
    school: 'EDHEC Lille',
    photo: '/images/founders/hugo-nicaise.jpg',
    story: [
      "Mon cheminement scolaire ne fut pas un long fleuve tranquille. De bon élève à élève moyen voire mauvais, j'ai fait le choix de m'orienter vers un baccalauréat STMG. Cette filière m'a réconcilié avec l'école, me faisant reprendre confiance en mes capacités scolaires.",

      "La \"classe prépa\" m'était complètement inconnue deux mois avant Parcoursup. **Tout s'est joué sur un conseil de ma professeure principale.** J'ai changé ma volonté de faire des études courtes pour partir vers une filière longue et sélective.",

      "La classe préparatoire fut le point d'orgue de ma réconciliation avec l'école. Aujourd'hui je travaille au cabinet du Directeur général du groupe AFD, dans un milieu que je n'aurais jamais pu côtoyer sans l'ascenseur social de la classe prépa et des grandes écoles.",

      "Quand je regarde en arrière, **je me rends compte que tout cela n'a tenu qu'à un fil et que ma vie aurait pu être radicalement différente si on ne m'avait pas dit : « fonce, tu en es capable ! »**"
    ],
    expertise: ['Stratégie', 'Management', 'Partenariats', 'Développement']
  }
];
```

**Rendering bold text:**
```tsx
{story.map((paragraph, i) => (
  <p
    key={i}
    dangerouslySetInnerHTML={{
      __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary-text font-semibold">$1</strong>')
    }}
  />
))}
```

---

## Testing Checklist

- [ ] Full founder stories display (3-4 paragraphs each)
- [ ] Bold text emphasis renders correctly
- [ ] Expertise tags display below each story
- [ ] Photos are circle-cropped
- [ ] Layout works on mobile (stacked vertically)
- [ ] Text is readable (line length, contrast)
- [ ] Stories match PRD content exactly
- [ ] Hugo's quote includes "fonce, tu en es capable!" origin

---

## Why This Matters

**From PRD Line 26:**
> **Founder-story led** - Arthur & Hugo's journeys = credibility

**From PRD Line 16:**
> Communicate the emotional founder story and mission

**The Impact:**
- Current implementation: "Two successful guys started this"
- PRD requirement: "Two students who were LOST and STRUGGLING, saved by one piece of advice, now giving that to others"

**Emotional arc = Trust = Conversions**

---

## References

- **PRD:** [specs/PRD.md](../../specs/PRD.md) lines 251-301
- **Key Principles:** PRD lines 20-26
- **Current Implementation:** [src/components/sections/FoundersSection.tsx](../../src/components/sections/FoundersSection.tsx)

---

## Next Steps

1. Create `src/data/founders.ts` with full story content
2. Update `FoundersSection.tsx` to support long-form stories
3. Adjust layout for comfortable reading (two-column cards)
4. Add bold emphasis to key quotes
5. Add expertise tags
6. Test on mobile (ensure readable, not cramped)
7. Add "Fonce!" highlighted quote after section (see [MISSING-FONCE-TAGLINE.md](./MISSING-FONCE-TAGLINE.md))

---

**Status:** ❌ Not Started
**Blocked By:** None
**Estimated Completion:** 4-6 hours
