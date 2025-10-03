# Design Decision: Solution Timeline vs. Feature Cards

**Priority:** ⚠️ MODERATE (Design Choice)
**PRD Reference:** Lines 220-248
**Impact:** Changes user understanding of program structure
**Estimated Effort:** 4-6 hours (if reverting to timeline)

---

## Problem Statement

The PRD specifies a **visual timeline** showing the 6 phases of the program in the Solution section. The current implementation shows **5 feature cards** instead.

**PRD Requirement:** Timeline with 6 phases (Sept-Oct, Nov-Jun, etc.)
**Current Implementation:** 5 feature cards (Mentorat personnalisé, Programme structuré, 100% à distance, Ressources partagées, Réseau d'entraide)

**Question:** Is this change intentional and beneficial, or should we revert to the PRD timeline?

---

## PRD Requirements

### Section: La Solution Propulse (PRD Lines 220-248)

**Section Title:**
> **Comment ça marche**

**Introduction:**
> Un accompagnement structuré en 6 étapes pour maximiser vos chances de réussite

**Callout Badge:**
> **100% gratuit • 100% à distance**

**Visual Timeline (Horizontal or Vertical):**
- 6 phases shown with key info:
  1. **Septembre-Octobre** : Présentation des filières (4 masterclass)
  2. **Novembre-Juin** : Accompagnement personnalisé (6-10 séances)
  3. **Phase 3** : Brief description
  4. **Phase 4** : Brief description
  5. **Phase 5** : Brief description
  6. **Phase 6** : Brief description

**Design:**
- Simple timeline with dots/milestones
- **Pen line traces the timeline path**
- Each phase: icon + title + 1 sentence description
- Clean, not overwhelming

**CTA Button:**
> **Découvrir le programme complet** → Links to /programme page

---

## Current Implementation Analysis

### Feature Cards Approach

**Observed Cards:**
1. **Mentorat personnalisé** - Un mentor étudiant ou alumni dédié pour t'accompagner tout au long de l'année
2. **Programme structuré** - 6 phases clés de septembre à juin : orientation, dossiers, concours, révisions
3. **100% à distance** - Visios régulières, groupes WhatsApp, outils collaboratifs simples et intuitifs
4. **Ressources partagées** - Accès aux meilleures ressources, fiches de révision et retours d'expérience
5. **Réseau d'entraide** - Rejoins une communauté de lycéens motivés et de mentors bienveillants

**+ CTA:** "Découvrir le programme complet" → /programme page
**+ Context:** "6 phases, de septembre à juin"

---

## Comparison Matrix

| Aspect | PRD Timeline | Current Feature Cards |
|--------|--------------|----------------------|
| **Structure** | 6 phases in sequence | 5 value propositions |
| **Focus** | When things happen (timeline) | What you get (benefits) |
| **Visual** | Linear path with pen line | Grid of cards |
| **Detail** | Phase-by-phase breakdown | High-level features |
| **Pen Line** | Traces the path (journey metaphor) | Not applicable |
| **Clarity** | Shows progression | Shows value props |
| **CTA** | Same (programme page) | Same (programme page) |

---

## Pros & Cons

### PRD Timeline Approach

**Pros:**
- ✅ Matches PRD specification
- ✅ Reinforces "journey" metaphor (pen traces path)
- ✅ Shows temporal structure (when things happen)
- ✅ Previews the detailed /programme page
- ✅ Clear progression (Phase 1 → 2 → 3 → etc.)

**Cons:**
- ❌ May be overwhelming (6 phases at a glance)
- ❌ Requires more space to show all phases
- ❌ Focuses on "what happens" not "what you get"
- ❌ Less emotionally compelling than benefits

---

### Current Feature Cards Approach

**Pros:**
- ✅ Immediately communicates value (what you get)
- ✅ Cleaner, less overwhelming
- ✅ Focus on benefits, not process
- ✅ Better for conversion (features vs. schedule)
- ✅ Works well with existing card components

**Cons:**
- ❌ Diverges from PRD without documentation
- ❌ Loses "journey" metaphor (no pen line path)
- ❌ Doesn't preview program structure
- ❌ Less clear about temporal progression
- ❌ Duplicates some info from /programme page

---

## User Perspective

### Timeline View (PRD)

**User Question:** "When does this happen? What's the structure?"

**Answer Provided:**
- Sept-Oct: Masterclasses
- Nov-June: Personal mentorship
- [Phases 3-6]: Other activities

**Best For:**
- Users who want to understand commitment (time-based)
- Users who like structured plans
- Users comparing to other programs

---

### Feature Cards View (Current)

**User Question:** "What do I get? Why should I join?"

**Answer Provided:**
- Personal mentor
- Structured program
- Remote access
- Resources
- Community

**Best For:**
- Users evaluating value proposition
- Users comparing benefits
- Quick scanners (not detail-oriented)

---

## Recommendation

### Option A: Keep Feature Cards + Enhance

**Rationale:** Current approach may convert better by focusing on benefits.

**Enhancements:**
1. Document the decision in PRD or CLAUDE.md
2. Consider adding subtle timeline element (e.g., "6 phases from September to June" badge)
3. Ensure /programme page provides full timeline detail
4. Add pen line decoration (even if not a timeline, can be decorative)

**Changes Required:**
- Update PRD to reflect feature cards approach
- Add rationale for decision
- Ensure consistency across documentation

---

### Option B: Revert to Timeline (PRD Compliant)

**Rationale:** PRD is source of truth, timeline reinforces journey metaphor.

**Implementation Required:**
1. Replace feature cards with vertical/horizontal timeline
2. Show 6 phases with brief descriptions
3. Add pen line that traces the timeline path
4. Keep "Découvrir le programme complet" CTA
5. Maintain clean, uncluttered design

**Changes Required:**
- Update SolutionSection.tsx
- Create timeline component
- Integrate pen line animation
- Test on mobile (vertical timeline)

---

### Option C: Hybrid Approach (Best of Both)

**Rationale:** Show benefits FIRST, timeline SECOND (or vice versa)

**Structure:**
```
Section: La Solution Propulse

1. Callout: "100% gratuit • 100% à distance"

2. Value Props (3-4 key benefits):
   - Mentorat personnalisé
   - Programme structuré
   - Réseau d'entraide

3. Timeline Preview (simplified, 3-4 phases):
   - Sept-Oct: Orientation
   - Nov-Juin: Mentorat
   - Juin: Concours & révisions

4. CTA: "Découvrir le programme complet"
```

**Benefits:**
- Shows both value AND structure
- Balances benefits with timeline
- Slightly longer section, but comprehensive

---

## Implementation (If Reverting to Timeline)

### Timeline Component Structure

**Location:** [src/components/sections/SolutionSection.tsx](../../src/components/sections/SolutionSection.tsx)

```tsx
export function SolutionSection() {
  const phases = [
    {
      number: 1,
      title: "Présentation des filières",
      duration: "Septembre - Octobre",
      description: "4 Masterclass de présentation des filières d'excellence",
      icon: "📚"
    },
    {
      number: 2,
      title: "Accompagnement personnalisé",
      duration: "Novembre - Juin",
      description: "Mentorat individuel avec un étudiant de votre filière d'intérêt",
      icon: "🎯"
    },
    {
      number: 3,
      title: "Préparation académique",
      duration: "3 mois",
      description: "Renforcement des compétences clés et méthodologie",
      icon: "📝"
    },
    {
      number: 4,
      title: "Préparation aux concours",
      duration: "2 mois",
      description: "Entraînement intensif et stratégies de réussite",
      icon: "🏆"
    },
    {
      number: 5,
      title: "Candidatures et entretiens",
      duration: "1 mois",
      description: "Optimisation des dossiers et préparation orale",
      icon: "💼"
    },
    {
      number: 6,
      title: "Suivi post-admission",
      duration: "3 mois",
      description: "Accompagnement dans la transition vers les Grandes Écoles",
      icon: "🎓"
    }
  ];

  return (
    <section className="py-20 bg-background-primary">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <p className="text-sm font-medium text-primary-orange mb-4">
              La Solution Propulse
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Un accompagnement complet et gratuit
            </h2>
            <p className="text-xl text-secondary-text max-w-2xl mx-auto mb-6">
              Propulse connecte des lycéens motivés avec des mentors étudiants
              et alumni des Grandes Écoles, pour un mentorat sur-mesure et
              entièrement gratuit.
            </p>
            <div className="inline-block bg-primary-orange/10 text-primary-orange px-6 py-2 rounded-full font-medium">
              100% gratuit • 100% à distance
            </div>
          </FadeIn>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">

          {/* Vertical Pen Line (background) */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-1">
            <PenLine
              variant="vertical-connector"
              className="h-full text-primary-navy opacity-20"
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-8">
            {phases.map((phase, i) => (
              <FadeIn key={phase.number} delay={i * 0.1}>
                <div className="flex gap-6 md:gap-8">

                  {/* Dot on timeline */}
                  <div className="flex-shrink-0 w-16 md:w-24 flex justify-center relative">
                    <div className="w-6 h-6 rounded-full bg-primary-orange border-4 border-background-primary relative z-10" />
                  </div>

                  {/* Phase Content */}
                  <div className="flex-1 bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{phase.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-bold text-primary-orange">
                            PHASE {phase.number}
                          </span>
                          <span className="text-sm text-secondary-text">
                            {phase.duration}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-primary-text mb-2">
                          {phase.title}
                        </h3>
                        <p className="text-secondary-text">
                          {phase.description}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* CTA */}
        <FadeIn delay={0.7}>
          <div className="text-center mt-12">
            <Link
              href="/programme"
              className="inline-flex items-center gap-2 text-primary-navy font-semibold hover:text-primary-orange transition-colors"
            >
              Découvrir le programme complet
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-secondary-text mt-2">
              6 phases, de septembre à juin
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
```

---

## Testing Checklist (If Implementing Timeline)

- [ ] Timeline shows all 6 phases
- [ ] Vertical pen line connects phases
- [ ] Each phase: number, duration, title, description, icon
- [ ] Animations stagger correctly (0.1s delay between phases)
- [ ] CTA button links to /programme page
- [ ] Responsive on mobile (timeline stacks vertically)
- [ ] Clean, uncluttered design
- [ ] Matches PRD requirements

---

## Decision Log

**Date:** [TBD]
**Decision:** [Keep Feature Cards / Revert to Timeline / Hybrid]
**Rationale:** [Explain decision]
**Stakeholders:** [Arthur, Hugo, Development team]

---

## References

- **PRD:** [specs/PRD.md](../../specs/PRD.md) lines 220-248
- **Programme Page:** [src/app/programme/page.tsx](../../src/app/programme/page.tsx) (detailed timeline)
- **Current Implementation:** [src/components/sections/SolutionSection.tsx](../../src/components/sections/SolutionSection.tsx)
- **Pen Line Component:** [MISSING-PEN-LINE-METAPHOR.md](./MISSING-PEN-LINE-METAPHOR.md)

---

## Next Steps

1. **Stakeholder Decision:** Get founder input on timeline vs. cards
2. **If keeping cards:** Update PRD and document rationale
3. **If reverting to timeline:** Implement timeline component (4-6 hours)
4. **If hybrid:** Design and implement combined approach (6-8 hours)
5. **Update documentation** to reflect final decision

---

**Status:** ⚠️ Awaiting Decision
**Blocked By:** Need stakeholder input (Arthur/Hugo)
**Estimated Completion:** 4-6 hours (if reverting to timeline)
