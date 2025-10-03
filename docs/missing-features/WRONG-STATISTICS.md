# Missing Feature: Incorrect Le Problème Statistics

**Priority:** 🔴 CRITICAL
**PRD Reference:** Lines 183-217
**Impact:** Core data narrative changed without documented reason
**Estimated Effort:** 2-3 hours

---

## Problem Statement

The **"Le Problème"** statistics section shows **4 stats with different framing** than the PRD specifies. The PRD clearly defines **3 specific statistics** with exact wording and data points.

**Current Implementation:** 70%, 8%, 30%, 60% (4 stats, different framing)
**PRD Requirement:** 3 stats with specific inequalities

**Impact:** Changes the data-driven narrative and potentially undermines credibility if sources don't match.

---

## PRD Requirements

### Section Title & Intro (PRD Lines 186-190)

**Section Title:**
> **Le constat qui nous motive**

**Introduction Paragraph (optional):**
> Les inégalités géographiques, sociales et de genre freinent l'accès aux Grandes Écoles. Propulse! existe pour rééquilibrer ces chances.

**Note:** Current implementation uses "Le Problème" as title (acceptable simplification)

---

### Required Statistics (PRD Lines 192-211)

**3 Key Statistics (Large Visual Blocks):**

#### Stat 1: Geographic Inequality

**PRD Lines 194-198:**
> **Visual:** Bold number + icon/graphic
> **Text:**
> **1/3** des élèves de prépa viennent d'Île-de-France
> (qui ne représente qu'1/6 de la population)

**Current Implementation:** Shows "70% des étudiants viennent de 3 académies seulement"

**Analysis:**
- Different framing (1/3 vs. 70%)
- Different geographic reference (Île-de-France vs. "3 académies")
- PRD version emphasizes population proportion mismatch
- Current version emphasizes concentration in 3 regions

---

#### Stat 2: Social Inequality

**PRD Lines 200-205:**
> **Visual:** Bold number + icon/graphic
> **Text:**
> Un enfant d'ouvrier a **7 à 10 fois moins** de chances
> d'intégrer une Grande École

**Current Implementation:** Shows "8% d'enfants d'ouvriers dans les Grandes Écoles, contre 54% de cadres supérieurs"

**Analysis:**
- Different framing (relative chance vs. representation percentage)
- PRD version is more impactful ("7-10x less")
- Current version adds comparison (8% vs. 54%)
- Both are valid, but PRD version emphasizes **inequality gap** more dramatically

---

#### Stat 3: Self-Censorship / Information Gap

**PRD Lines 207-211:**
> **Visual:** Bold number + icon/graphic
> **Text:**
> **60%** des jeunes de milieux ruraux défavorisés
> ne se sentent pas capables d'obtenir une licence

**Current Implementation:** Shows "60% manquent d'informations sur les voies d'accès et les possibilités de bourses"

**Analysis:**
- Same number (60%), different framing
- PRD: **Self-censorship** ("ne se sentent pas capables")
- Current: **Information gap** ("manquent d'informations")
- PRD version is more emotionally resonant
- Current version is more directly actionable for Propulse's solution

---

#### Extra Stat (Not in PRD)

**Current Implementation:** Shows "30% de femmes dans les écoles d'ingénieurs, une sous-représentation persistante"

**Analysis:**
- **Not in PRD requirements** (PRD only specifies 3 stats)
- Gender inequality is mentioned in PRD mission (line 823: "inégalités géographiques, sociales et de genre")
- Valid addition, but changes section structure

---

## Visual Design Requirements (PRD Lines 212-216)

**Design Notes:**
- Color-coded blocks (use accent colors)
- Large, impactful typography
- Animated entrance (fade in, slide up)
- **Use pen line to connect stats visually (shows "gap" we're closing)**

**Current Implementation:**
- ✅ Color-coded blocks visible
- ✅ Large typography
- ⚠️ Pen line connection: Unknown (not visible in screenshots)

---

## Closing Statement (PRD Implied)

**Current Implementation:**
> "Ces inégalités ne sont pas une fatalité"
> "Le manque d'information et de réseau est le principal frein. C'est là que Propulse intervient."

**Status:** ✅ Good - Matches PRD intent even if not exact wording

---

## Decision Matrix: Keep or Change?

| Version | Pros | Cons |
|---------|------|------|
| **PRD Stats (1/3, 7-10x, 60% self-censorship)** | More emotionally impactful, focuses on relative inequality, matches PRD source of truth | May be harder to source/verify, less direct connection to Propulse's solution |
| **Current Stats (70%, 8% vs 54%, 60% info gap, 30% women)** | More data points (4 stats), information gap aligns with solution, adds gender dimension | Dilutes focus, PRD only specified 3 stats, changes narrative framing |

---

## Recommended Action

### Option A: Revert to PRD Stats (Recommended)

**Reason:** PRD is source of truth, stats were chosen for specific narrative impact

**Changes Required:**
1. Remove 4th stat (gender)
2. Change stat 1 to "1/3 des élèves de prépa viennent d'Île-de-France (1/6 de la population)"
3. Change stat 2 to "7 à 10 fois moins de chances pour un enfant d'ouvrier"
4. Change stat 3 to "60% des jeunes ruraux défavorisés ne se sentent pas capables d'obtenir une licence"

**Benefits:**
- PRD compliance ✅
- More emotionally resonant
- Focuses on **inequality** (relative, not absolute)

---

### Option B: Document and Keep Current Stats

**Reason:** Current stats may have been updated with better sources or user feedback

**Changes Required:**
1. Document the decision in PRD or CLAUDE.md
2. Note the sources for each stat
3. Explain why 4 stats instead of 3
4. Explain framing changes (info gap vs. self-censorship)

**Benefits:**
- Keeps current implementation
- More comprehensive (4 stats)
- Information gap aligns well with Propulse solution

---

## Implementation (If Reverting to PRD)

### Task 4.1: Update Statistics Content

**Location:** [src/components/sections/StatisticsSection.tsx](../../src/components/sections/StatisticsSection.tsx) or [src/data/statistics.ts](../../src/data/statistics.ts)

**Data Structure:**

```tsx
export const problemStats = [
  {
    id: 'geographic',
    icon: '📍',
    number: '1/3',
    title: 'des étudiants',
    description: 'viennent de 3 académies seulement (Paris, Versailles, Lyon)',
    detail: 'qui ne représente qu\'1/6 de la population',
    color: 'orange' // accent color
  },
  {
    id: 'social',
    icon: '👥',
    number: '7-10×',
    title: 'd\'enfants d\'ouvriers',
    description: 'dans les Grandes Écoles, contre 54% de cadres supérieurs',
    detail: 'Un enfant d\'ouvrier a 7 à 10 fois moins de chances',
    color: 'navy'
  },
  {
    id: 'self-censorship',
    icon: '🎓',
    number: '60%',
    title: 'manquent d\'informations',
    description: 'sur les voies d\'accès et les possibilités de bourses',
    detail: 'des jeunes de milieux ruraux défavorisés ne se sentent pas capables d\'obtenir une licence',
    color: 'green'
  }
];
```

**Note:** Some flexibility in exact wording is acceptable, but the **core framing** must match:
1. **Geographic concentration** (1/3 from Île-de-France vs. 1/6 population)
2. **Social inequality** (7-10x less chance for working-class children)
3. **Self-censorship** (60% don't feel capable)

---

## Component Implementation

```tsx
export function StatisticsSection() {
  return (
    <section className="py-20 bg-background-secondary">
      <div className="container mx-auto px-4">

        {/* Title */}
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Le Problème
          </h2>
          <p className="text-xl text-center text-secondary-text max-w-3xl mx-auto mb-16">
            L'accès aux Grandes Écoles reste fortement inégalitaire en France.
            Les disparités géographiques, sociales et de genre persistent.
          </p>
        </FadeIn>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {problemStats.map((stat, i) => (
            <FadeIn key={stat.id} delay={i * 0.1}>
              <div className="bg-white rounded-lg p-8 text-center shadow-sm">
                {/* Icon */}
                <div className="text-5xl mb-4">{stat.icon}</div>

                {/* Number */}
                <div className="text-6xl font-bold text-primary-orange mb-2">
                  {stat.number}
                </div>

                {/* Title */}
                <div className="text-xl font-semibold text-primary-text mb-3">
                  {stat.title}
                </div>

                {/* Description */}
                <p className="text-secondary-text leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Pen Line Connection (if implementing) */}
        <div className="relative h-2 mb-12">
          <PenLine variant="horizontal-accent" className="w-full max-w-4xl mx-auto text-primary-navy" />
        </div>

        {/* Closing Statement */}
        <FadeIn delay={0.4}>
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-primary-text mb-4">
              Ces inégalités ne sont pas une fatalité
            </h3>
            <p className="text-xl text-secondary-text">
              Le manque d'information et de réseau est le principal frein.
              C'est là que <strong className="text-primary-orange">Propulse intervient</strong>.
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
```

---

## Sources & Verification

**Recommended:** Document sources for each stat in code comments or separate file

```tsx
// Sources (for reference):
// - Geographic: https://www.enseignementsup-recherche.gouv.fr/...
// - Social: https://www.cereq.fr/... OR https://www.article-1.eu/...
// - Self-censorship: https://www.article-1.eu/... OR similar study

// Note: Verify all stats before production launch
```

---

## Testing Checklist

- [ ] Section shows exactly 3 stats (not 4)
- [ ] Stat 1: Geographic inequality (1/3 from Île-de-France)
- [ ] Stat 2: Social inequality (7-10x less chance)
- [ ] Stat 3: Self-censorship (60% don't feel capable)
- [ ] Visual treatment: Large numbers, color-coded
- [ ] Animation: Fade in on scroll
- [ ] Pen line connector (if implementing)
- [ ] Closing statement present
- [ ] Sources documented (code comments)

---

## References

- **PRD:** [specs/PRD.md](../../specs/PRD.md) lines 183-217
- **Inspiration:** article-1.eu (stats presentation style)
- **Current Implementation:** [src/components/sections/StatisticsSection.tsx](../../src/components/sections/StatisticsSection.tsx)

---

## Next Steps

1. **Decide:** Revert to PRD stats OR document current stats decision
2. **If reverting:** Update StatisticsSection.tsx with PRD content
3. **If keeping:** Update PRD with new stats and rationale
4. **Verify sources** for all statistics
5. **Test:** Ensure visual impact and readability

---

**Status:** ⚠️ Awaiting Decision
**Blocked By:** Need stakeholder approval to change stats
**Estimated Completion:** 2-3 hours (if reverting)
