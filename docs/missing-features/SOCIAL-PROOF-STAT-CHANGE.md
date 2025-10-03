# Design Decision: Social Proof 3rd Stat Change

**Priority:** ⚠️ MODERATE (Content Choice)
**PRD Reference:** Lines 152-181
**Impact:** Changes social proof messaging
**Estimated Effort:** 30 minutes

---

## Problem Statement

The PRD specifies **"1 lycée partenaire"** as the 3rd stat in the Social Proof section. The current implementation shows **"100% Gratuit & à distance"** instead.

**PRD Requirement:** "1 lycée partenaire pour la première cohorte 2025-2026"
**Current Implementation:** "100% Gratuit & à distance" + "Accessible à tous, partout en France"

**Question:** Is this change intentional and beneficial, or should we restore the partnership stat?

---

## PRD Requirements

### Social Proof Burst Section (PRD Lines 152-181)

**Section Title:**
> **Un mouvement qui prend de l'ampleur**

**Content Layout:**
- 3 key stats in large, bold numbers
- Animated pen "writes" or reveals each number as user scrolls into view
- Brief explanation under each stat

**Stats to Display:**

#### Stat 1: ✅ MATCHES (Implemented Correctly)

**PRD Lines 164-165:**
> **50+ étudiants et diplômés** de Grandes Écoles se sont engagés comme mentors

**Current Implementation:** "50+ Mentors engagés" + "Étudiants et alumni des Grandes Écoles"

**Status:** ✅ Matches PRD intent

---

#### Stat 2: ✅ MATCHES (Implemented Correctly)

**PRD Lines 167-168:**
> **400+ personnes** soutiennent notre mission sur LinkedIn

**Current Implementation:** "400+ Réactions LinkedIn" + "Une communauté qui grandit"

**Status:** ✅ Matches PRD intent

---

#### Stat 3: ❌ CHANGED

**PRD Lines 170-171:**
> **1 lycée partenaire** pour la première cohorte 2025-2026

**Current Implementation:** "100% Gratuit & à distance" + "Accessible à tous, partout en France"

**Status:** ❌ Completely different message

---

## Analysis

### PRD Version: "1 lycée partenaire"

**Purpose:**
- Shows concrete partnership proof
- Demonstrates that schools trust Propulse
- Validates the program (not just an idea, there's a real partner)

**Pros:**
- ✅ Social proof (credibility)
- ✅ Concrete, verifiable fact
- ✅ Shows momentum ("already secured a partner")
- ✅ Builds institutional trust

**Cons:**
- ❌ Only 1 (seems small? Or shows it's just starting)
- ❌ Not as emotionally compelling
- ❌ Doesn't directly address lycéen concerns

---

### Current Version: "100% Gratuit & à distance"

**Purpose:**
- Emphasizes key value propositions
- Removes financial and geographic barriers
- Addresses lycéen concerns directly

**Pros:**
- ✅ Removes objections (cost, distance)
- ✅ Inclusive messaging (accessible to all)
- ✅ Reinforces key principles from PRD (line 21-22)
- ✅ Emotionally resonant (addresses barriers)

**Cons:**
- ❌ Not a "stat" (it's a value prop)
- ❌ Loses partnership social proof
- ❌ Duplicates information (this is mentioned elsewhere)
- ❌ Changes section intent (social proof → value props)

---

## Section Intent

**PRD Section Title:** "Un mouvement qui prend de l'ampleur"

**Purpose:** Show that Propulse is GROWING, has MOMENTUM, has SUPPORT.

**Social Proof Elements:**
1. 50+ mentors → **People** are committing
2. 400+ LinkedIn → **Community** is engaged
3. 1 lycée partenaire → **Institutions** are trusting

**Current Implementation:**
1. 50+ mentors → ✅ Social proof (people)
2. 400+ LinkedIn → ✅ Social proof (community)
3. 100% gratuit → ❌ Value prop (not social proof)

**Conclusion:** Current 3rd stat changes section from "proof of momentum" to "value proposition."

---

## Alternative Stats to Consider

If "1 lycée partenaire" feels too small, consider:

### Option A: Restore "1 lycée partenaire" (PRD)

```tsx
{
  icon: '🏫',
  number: '1',
  title: 'lycée partenaire',
  description: 'pour la première cohorte 2025-2026'
}
```

**Message:** We're new, but already have institutional support.

---

### Option B: Focus on Students (If Available)

```tsx
{
  icon: '🎓',
  number: 'X',
  title: 'lycéens inscrits',
  description: 'pour la cohorte septembre 2025'
}
```

**Message:** Students are already signing up.

**Note:** Only if you have this data and it's impressive (20+ minimum).

---

### Option C: Keep "100% Gratuit" but Reframe as Stat

```tsx
{
  icon: '💰',
  number: '0€',
  title: 'coût du programme',
  description: '100% gratuit, 100% à distance'
}
```

**Message:** Zero cost barrier.

**Note:** Still not social proof, but at least presented as a stat.

---

### Option D: Show Geographic Reach (If Available)

```tsx
{
  icon: '📍',
  number: 'X',
  title: 'régions représentées',
  description: 'Partout en France'
}
```

**Message:** We're reaching beyond Paris/big cities.

**Note:** Only if data supports this.

---

## Recommendation

### Preferred: Option A (Restore "1 lycée partenaire")

**Rationale:**
1. Matches PRD specification (source of truth)
2. Provides institutional credibility
3. Completes the social proof trio (people, community, institution)
4. "100% gratuit" is already mentioned in hero and elsewhere

**Changes Required:**
- Update Social Proof section stat 3
- Change icon, number, title, description
- Ensure messaging is positive ("we're new but already trusted")

**Implementation:**

```tsx
const socialProofStats = [
  {
    id: 'mentors',
    icon: Users,
    number: '50+',
    label: 'Mentors engagés',
    description: 'Étudiants et alumni des Grandes Écoles',
    color: 'text-primary-navy'
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    number: '400+',
    label: 'Réactions LinkedIn',
    description: 'Une communauté qui grandit',
    color: 'text-[#0A66C2]'
  },
  {
    id: 'partner',
    icon: School, // or Building2
    number: '1',
    label: 'lycée partenaire',
    description: 'Première cohorte : Septembre 2025',
    color: 'text-primary-green'
  }
];
```

---

### Alternative: Option B (If Student Data Available)

**Rationale:** If you have early signups (20+ lycéens), this shows demand.

**Note:** Only if data exists and is compelling.

---

### Keep Current: If Strategic Decision

**Rationale:** If founders decided "100% gratuit" message is more important than partnership proof.

**Changes Required:**
- Document decision in PRD or CLAUDE.md
- Update PRD to reflect new stat
- Explain rationale (prioritizing accessibility message)

---

## Impact on User Trust

**With "1 lycée partenaire":**
- User thinks: "A school trusts them, so can I"
- Credibility: Institutional backing
- Concern: "Only 1? Is this too new?"

**With "100% Gratuit":**
- User thinks: "This is free and accessible"
- Credibility: Removing barriers
- Concern: "Wait, this isn't social proof, why is it here?"

**Conclusion:** "1 lycée partenaire" better fits section intent (social proof of momentum).

---

## Testing Checklist (If Changing)

- [ ] Stat 3 changed to "1 lycée partenaire"
- [ ] Icon updated (school/building)
- [ ] Description: "Première cohorte : Septembre 2025"
- [ ] Color scheme matches other stats
- [ ] Animation triggers correctly
- [ ] Messaging feels positive (not "only 1" but "already 1")

---

## References

- **PRD:** [specs/PRD.md](../../specs/PRD.md) lines 152-181
- **Key Principles:** PRD lines 20-26 (100% gratuit is mentioned, but in different contexts)
- **Current Implementation:** [src/components/sections/SocialProofSection.tsx](../../src/components/sections/SocialProofSection.tsx)

---

## Decision Log

**Date:** [TBD]
**Decision:** [Restore lycée partenaire / Keep 100% gratuit / Other]
**Rationale:** [Explain decision]
**Stakeholders:** [Arthur, Hugo]

---

## Next Steps

1. **Decide:** Restore "1 lycée partenaire" OR keep current OR choose alternative
2. **If restoring:** Update SocialProofSection.tsx (30 minutes)
3. **If keeping:** Update PRD to document the change
4. **If alternative:** Gather data (student signups, regions, etc.) and implement

---

**Status:** ⚠️ Awaiting Decision
**Blocked By:** None (can change immediately if decision is made)
**Estimated Completion:** 30 minutes
