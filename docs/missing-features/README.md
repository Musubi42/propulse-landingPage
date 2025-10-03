# Missing Features Documentation

This directory contains detailed analysis and implementation guides for features that are specified in the [PRD](../../specs/PRD.md) but missing or changed in the current implementation.

**Parent Document:** [IMPLEMENTATION-TRACKER.md](../IMPLEMENTATION-TRACKER.md)

---

## 🔴 Critical Priority

These features are essential to Propulse's identity and should be implemented ASAP:

### 1. [MISSING-FONCE-TAGLINE.md](./MISSING-FONCE-TAGLINE.md)
**"Fonce, tu en es capable!" - The Core Brand Tagline**

- **Impact:** This is THE emotional hook that defines Propulse
- **Missing From:** Hero section AND Founders section
- **Effort:** 2-4 hours
- **Why Critical:** This phrase is the origin story (Hugo's life changed when he heard this)

---

### 2. [MISSING-PEN-LINE-METAPHOR.md](./MISSING-PEN-LINE-METAPHOR.md)
**Animated Pen Line Journey Throughout Scroll**

- **Impact:** Primary visual identity motif completely absent
- **Missing:** Scroll-based pen line, stat reveals, timeline connectors
- **Effort:** 8-12 hours
- **Why Critical:** Represents "writing your own journey" - core to visual identity

---

### 3. [MISSING-FOUNDER-STORIES.md](./MISSING-FOUNDER-STORIES.md)
**Full Founder Narratives (Not Just Quotes)**

- **Impact:** Loses emotional credibility and founder-led narrative
- **Missing:** Full 3-4 paragraph stories, bold emphasis, expertise tags
- **Effort:** 4-6 hours
- **Why Critical:** PRD states "Founder-story led" - this is the trust foundation

---

### 4. [WRONG-STATISTICS.md](./WRONG-STATISTICS.md)
**Le Problème Section Shows Wrong Stats**

- **Impact:** Core data narrative changed without documented reason
- **Issue:** 4 stats with different framing vs. PRD's 3 specific stats
- **Effort:** 2-3 hours
- **Why Critical:** Data integrity and narrative structure

---

### 5. [MISSING-HERO-PEN-EDGE.md](./MISSING-HERO-PEN-EDGE.md)
**Pen-Drawn Edge Effect on Hero Circle**

- **Impact:** Loses hand-crafted, warm aesthetic
- **Missing:** Imperfect, hand-drawn circle edge (currently perfect circle)
- **Effort:** 2-3 hours
- **Why Critical:** Visual identity - distinguishes from corporate feel

---

### 6. [MISSING-SCROLL-INDICATOR.md](./MISSING-SCROLL-INDICATOR.md)
**Animated Scroll Arrow in Hero**

- **Impact:** Minor UX - less visual guidance to scroll
- **Missing:** Animated down arrow with bounce
- **Effort:** 1 hour
- **Why Critical:** (Actually moderate - reclassified below)

---

## ⚠️ Moderate Priority

These features represent design/content decisions that diverge from PRD and need evaluation:

### 7. [SOLUTION-TIMELINE-VS-CARDS.md](./SOLUTION-TIMELINE-VS-CARDS.md)
**Solution Section: Timeline vs. Feature Cards**

- **Impact:** Changes user understanding of program structure
- **Issue:** PRD specifies 6-phase timeline, implementation shows 5 feature cards
- **Effort:** 4-6 hours (if reverting to timeline)
- **Decision Needed:** Is this change intentional? Timeline or cards?

---

### 8. [SOCIAL-PROOF-STAT-CHANGE.md](./SOCIAL-PROOF-STAT-CHANGE.md)
**Social Proof 3rd Stat Changed**

- **Impact:** Changes social proof messaging
- **Issue:** PRD specifies "1 lycée partenaire", implementation shows "100% gratuit & à distance"
- **Effort:** 30 minutes
- **Decision Needed:** Partnership proof or value prop?

---

### 9. MISSING-SCROLL-INDICATOR.md (Reclassified)
**Animated Scroll Arrow in Hero**

- **Impact:** Minor UX enhancement
- **Effort:** 1 hour
- **Can Wait:** Lower priority than critical identity elements

---

## Quick Navigation

**By Estimated Effort:**
- **< 2 hours:** Scroll Indicator (1h), Social Proof Stat (30min)
- **2-4 hours:** Fonce Tagline (2-4h), Hero Pen Edge (2-3h), Statistics (2-3h)
- **4-8 hours:** Founder Stories (4-6h), Solution Timeline (4-6h)
- **8-12 hours:** Pen Line Metaphor (8-12h)

**By Component:**
- **Hero Section:** Fonce Tagline, Pen Edge, Scroll Indicator
- **Social Proof:** 3rd Stat Change
- **Statistics:** Wrong Stats
- **Solution:** Timeline vs Cards
- **Founders:** Full Stories, Fonce Quote
- **Global:** Pen Line Metaphor

**By Visual Identity Impact:**
- **Core Identity:** Pen Line Metaphor, Fonce Tagline, Hero Pen Edge
- **Content Fidelity:** Founder Stories, Statistics
- **Design Decisions:** Solution Timeline, Social Proof Stat
- **UX Polish:** Scroll Indicator

---

## How to Use These Docs

1. **Read the main tracker:** [IMPLEMENTATION-TRACKER.md](../IMPLEMENTATION-TRACKER.md)
2. **Pick a feature** from the priority list
3. **Open the detailed doc** for implementation guidance
4. **Follow the specs** including code examples
5. **Test using checklists** provided in each doc
6. **Update the tracker** when complete

---

## Document Structure

Each feature document includes:

- **Problem Statement** - What's missing and why it matters
- **PRD Requirements** - Exact specifications from PRD
- **Current Implementation** - What exists now
- **Implementation Guide** - Code examples and instructions
- **Testing Checklist** - What to verify
- **References** - Links to PRD, related docs, components

---

## Total Effort Estimate

**Critical Features:** ~21-30 hours
**Moderate Features:** ~5-7 hours
**Total:** ~26-37 hours

**Recommendation:** Tackle in order of priority (critical first, then moderate decisions).

---

## Status Legend

- 🔴 **Critical** - Essential to Propulse identity
- ⚠️ **Moderate** - Design decisions needing evaluation
- ✅ **Complete** - Implemented and verified
- ❌ **Missing** - Not implemented
- 🚧 **In Progress** - Currently being worked on

---

## Related Documentation

- **Main Tracker:** [../IMPLEMENTATION-TRACKER.md](../IMPLEMENTATION-TRACKER.md)
- **PRD (Source of Truth):** [../../specs/PRD.md](../../specs/PRD.md)
- **Project Status:** [../../CLAUDE.md](../../CLAUDE.md)
- **Color Palette:** [../../specs/Palette-colors.md](../../specs/Palette-colors.md)
- **Technical Docs:** [../../specs/Technical-documentation.md](../../specs/Technical-documentation.md)

---

**Last Updated:** 2025-10-03
**Maintained By:** Development Team
