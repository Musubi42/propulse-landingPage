# 🧹 Code Cleanup Recommendations

**Generated:** 2025-10-07
**Project:** Propulse Landing Page (Next.js 15)

---

## 📋 Executive Summary

This document identifies **redundant files, duplicate code, unused components, and organizational improvements** across the codebase. The recommendations are organized by priority and include specific actions to improve maintainability.

### Overall Findings
- ✅ **39 documentation files** - many are outdated or duplicative
- ⚠️ **2 duplicate `useMediaQuery` hooks** - in different locations
- ⚠️ **Legacy chart components** - unused Recharts implementation
- ⚠️ **Demo page** - `/pendemo` not linked or documented
- ⚠️ **Commented-out code** - in main page and other files

---

## 🔴 PRIORITY 1: Critical Duplicates & Conflicts

### 1.1 Duplicate `useMediaQuery` Hook

**Issue:** Two identical implementations exist in different locations.

**Files:**
- [`src/hooks/useMediaQuery.ts`](src/hooks/useMediaQuery.ts) - **32 lines** with helper functions
- [`src/lib/hooks/useMediaQuery.ts`](src/lib/hooks/useMediaQuery.ts) - **33 lines** simpler version

**Current Usage:**
- **Chart components** import from `src/lib/hooks/useMediaQuery.ts`
- **No files** currently import from `src/hooks/useMediaQuery.ts`

**Recommendation:** ✅ **DELETE** `src/lib/hooks/useMediaQuery.ts` and **MOVE ALL IMPORTS** to use `src/hooks/useMediaQuery.ts`

**Reasoning:**
- The version in `src/hooks/` has **helper functions** (`useIsMobile()`, `useIsTablet()`, `useIsDesktop()`)
- More feature-complete
- Follows project convention (hooks in `src/hooks/`)

**Action Required:**
```bash
# Update all chart imports
grep -r "from '@/lib/hooks/useMediaQuery'" src/components/charts/

# Change to:
# from '@/hooks/useMediaQuery'

# Then delete duplicate
rm src/lib/hooks/useMediaQuery.ts
```

---

### 1.2 Legacy Charts - Unused Recharts Components

**Issue:** Old chart implementation using Recharts library, replaced by Chart.js.

**Files to DELETE:**
- [`src/components/legacy-charts/GeographicDistributionChart.tsx`](src/components/legacy-charts/GeographicDistributionChart.tsx)
- [`src/components/legacy-charts/SocialOriginChart.tsx`](src/components/legacy-charts/SocialOriginChart.tsx)
- [`src/components/legacy-charts/GenderEvolutionChart.tsx`](src/components/legacy-charts/GenderEvolutionChart.tsx)
- [`src/components/sections/LegacyStatisticsSection.tsx`](src/components/sections/LegacyStatisticsSection.tsx)
- [`src/data/statistics-data.ts`](src/data/statistics-data.ts)

**Replacement:** All functionality moved to Chart.js implementation:
- `src/components/charts/` (4 new charts)
- `src/data/cpge-statistics-data.ts` (new data structure)
- `src/components/sections/DataVisualizationSection.tsx` (new section)

**Verification:**
```bash
# Check if any file imports these legacy components
grep -r "legacy-charts" src/
grep -r "LegacyStatisticsSection" src/
grep -r "statistics-data.ts" src/
```

**Expected Result:** Only imports in the legacy components themselves.

**Action Required:**
```bash
rm -rf src/components/legacy-charts/
rm src/components/sections/LegacyStatisticsSection.tsx
rm src/data/statistics-data.ts
```

**Estimated Impact:** ❌ **~500 lines of dead code removed**

---

## 🟡 PRIORITY 2: Cleanup & Organization

### 2.1 Demo Page - Undocumented Feature

**File:** [`src/app/pendemo/page.tsx`](src/app/pendemo/page.tsx) - **709 lines**

**Issue:**
- Interactive demo page showing 4 transition types
- **Not linked** from any navigation
- **Not mentioned** in any documentation
- **709 lines** of code for demo-only purpose
- Uses old transition styles (gradient, curved masks, dots)

**Current Status:**
- Route exists at `/pendemo`
- Has back button to home
- Shows: Gradient Fade, Curved Mask, Pen Stroke, Dot Path demos

**Options:**

**Option A: Keep for Development**
- Move to `/admin/pendemo` or `/dev/transitions`
- Add to development documentation
- Add note in README about dev routes

**Option B: Remove Entirely**
- Delete the page
- Transition decisions already documented in `docs/CHOSEN-TRANSITIONS.md`
- Not needed in production

**Recommendation:** ✅ **Option B - DELETE**

**Reasoning:**
- Transition decisions are final (documented)
- Adds 709 lines to bundle
- Not referenced anywhere
- Can recreate if needed from git history

**Action Required:**
```bash
rm -rf src/app/pendemo/
```

---

### 2.2 Commented-Out Code

**File:** [`src/app/page.tsx`](src/app/page.tsx)

**Lines 32-34:**
```tsx
{/* <OrganicWavePenStroke /> */}
{/* <FoundersSection />
    <MentorsSection /> */}
```

**Issue:** Unclear if this is intentional or forgotten.

**Questions:**
1. Should `OrganicWavePenStroke` be removed (duplicate with line 32)?
2. Are `FoundersSection` and `MentorsSection` meant to be on homepage or only `/qui-sommes-nous`?

**Recommendation:** ✅ **REMOVE commented code** and clarify intent

**Action Required:** Ask user for clarification, then either:
- Delete comments if components are only for `/qui-sommes-nous`
- Uncomment if they should be on homepage

---

### 2.3 Empty `src/lib/hooks/` Directory

**Issue:** After removing duplicate `useMediaQuery.ts`, this directory would be empty.

**Action Required:**
```bash
# After moving useMediaQuery to src/hooks/
rm -rf src/lib/hooks/
```

---

## 🟢 PRIORITY 3: Documentation Cleanup

### 3.1 Outdated Documentation Files

**Total:** 39 markdown files in `docs/`

**Categories:**

#### **A. Implementation Completed - Can Archive**
- `docs/PHASE-1-SETUP.md` - ✅ Setup complete
- `docs/PHASE-2-FOUNDATION.md` - ✅ Foundation complete
- `docs/IMPLEMENTATION-GUIDE.md` - Superseded by CLAUDE.md
- `docs/IMPLEMENTATION-TRACKER.md` - Outdated tracker
- `docs/PROJECT-TRACKER.md` - Outdated tracker
- `docs/FIXES-SUMMARY-2025-10-03.md` - Historical fixes
- `docs/missing-features/MISSING-*.md` (7 files) - All features implemented

#### **B. Keep - Active Reference**
- `docs/CHOSEN-TRANSITIONS.md` ✅
- `docs/Z-INDEX-HIERARCHY.md` ✅
- `docs/PEN-LINE-SYSTEM.md` ✅
- `docs/GIT-WORKFLOW.md` ✅
- `docs/VERCEL-DEPLOYMENT.md` ✅
- `docs/missing-features/statistics/*.md` (5 files) ✅ - Active chart specs
- `docs/missing-features/timeline/*.md` (7 files) ✅ - Active timeline specs

**Recommendation:** ✅ **Create `docs/archive/` folder**

**Action Required:**
```bash
mkdir -p docs/archive/completed-phases
mkdir -p docs/archive/missing-features

# Move completed phase docs
mv docs/PHASE-*.md docs/archive/completed-phases/
mv docs/IMPLEMENTATION-*.md docs/archive/completed-phases/
mv docs/PROJECT-TRACKER.md docs/archive/completed-phases/
mv docs/FIXES-SUMMARY-*.md docs/archive/completed-phases/

# Move implemented features
mv docs/missing-features/MISSING-*.md docs/archive/missing-features/
mv docs/missing-features/WRONG-STATISTICS.md docs/archive/missing-features/
mv docs/missing-features/StatisticSection.md docs/archive/missing-features/
mv docs/missing-features/UpdateStaticSection.md docs/archive/missing-features/
```

---

### 3.2 Documentation Consolidation

**Current Structure:**
- `README.md` - Generic Next.js template
- `CLAUDE.md` - **Comprehensive project documentation** (600+ lines)
- `DEPLOYMENT-SUMMARY.md` - Deployment info
- `specs/` - Original PRD and technical docs

**Issue:** `README.md` is still the default Next.js template and doesn't reflect the actual project.

**Recommendation:** ✅ **Update README.md** with actual project info

**Suggested Structure:**
```markdown
# Propulse - Landing Page

Brief description of the project, link to CLAUDE.md for full context.

## Quick Start
## Tech Stack
## Project Structure
## Key Documents
- [CLAUDE.md](CLAUDE.md) - Full project documentation
- [specs/PRD.md](specs/PRD.md) - Product requirements
- [DEPLOYMENT-SUMMARY.md](DEPLOYMENT-SUMMARY.md) - Deployment guide
```

---

## 🔵 PRIORITY 4: Code Quality Improvements

### 4.1 Unused Exports in Index Files

**File:** [`src/components/sections/index.ts`](src/components/sections/index.ts)

**Current Exports:**
```typescript
export { Header } from './Header';
export { HeroSection } from './HeroSection';
export { SocialProofSection } from './SocialProofSection';
export { StatisticsSection } from './StatisticsSection';
export { DataVisualizationSection } from './DataVisualizationSection';
export { SolutionSection } from './SolutionSection';
export { FoundersSection } from './FoundersSection';
export { MentorsSection } from './MentorsSection';
export { FinalCTASection } from './FinalCTASection';
export { Footer } from './Footer';
export { ProgrammeTimeline } from './ProgrammeTimeline';
```

**Issue:** `StatisticsSection` is **not imported anywhere** - might be old/duplicate.

**Verification:**
```bash
grep -r "StatisticsSection" src/ --exclude-dir=node_modules
```

**If Unused:** Delete `src/components/sections/StatisticsSection.tsx` and remove from index.

---

### 4.2 Potential Naming Confusion

**Files:**
- `DataVisualizationSection.tsx` - New Chart.js charts
- `StatisticsSection.tsx` - Unknown purpose (need to verify)

**Recommendation:** Verify if `StatisticsSection` is duplicate/old version.

---

## 📊 Summary of Actions

### Immediate Deletions (Safe)
```bash
# 1. Remove duplicate hook directory
rm src/lib/hooks/useMediaQuery.ts
# Then update 4 chart component imports

# 2. Remove legacy charts (if verified unused)
rm -rf src/components/legacy-charts/
rm src/components/sections/LegacyStatisticsSection.tsx
rm src/data/statistics-data.ts

# 3. Remove demo page
rm -rf src/app/pendemo/

# 4. Remove empty directory
rmdir src/lib/hooks/ # After step 1
```

**Lines Removed:** ~1,500+ lines of dead code

---

### Archive Documentation
```bash
mkdir -p docs/archive/{completed-phases,missing-features}
# Move files as per section 3.1
```

**Files Archived:** ~15-20 markdown files

---

### Code Updates Required
1. Update 4 chart imports from `@/lib/hooks/useMediaQuery` → `@/hooks/useMediaQuery`
2. Verify and potentially remove `StatisticsSection.tsx`
3. Clean commented code in `src/app/page.tsx` (after user clarification)
4. Update `README.md` with actual project info

---

## 🎯 Expected Benefits

### Performance
- ❌ **~1,500 lines** of dead code removed
- 📦 Smaller bundle size (legacy Recharts components)
- 🚀 Cleaner imports and dependencies

### Maintainability
- 📂 Clearer file structure
- 📚 Organized documentation
- 🔍 Easier to find active vs. archived docs
- ✅ No duplicate code confusion

### Developer Experience
- 🧭 Clear source of truth for hooks
- 📖 Updated README for new contributors
- 🗂️ Historical context preserved in archives

---

## ⚠️ Before Executing

**IMPORTANT:** Before deleting any files, verify they are truly unused:

```bash
# Check imports for each file before deletion
grep -r "LegacyStatisticsSection" src/
grep -r "legacy-charts" src/
grep -r "statistics-data" src/
grep -r "StatisticsSection" src/
grep -r "pendemo" src/
```

**Backup Strategy:**
- All deletions can be recovered from git history
- Consider creating a `cleanup` branch first
- Run `pnpm build` after changes to verify nothing breaks

---

## 📝 Questions for User

1. **Commented code in `page.tsx`:**
   - Should `FoundersSection` and `MentorsSection` be on homepage?
   - Or only on `/qui-sommes-nous`?

2. **StatisticsSection.tsx:**
   - Is this an old/duplicate component?
   - Safe to remove?

3. **Demo page `/pendemo`:**
   - Keep for development reference?
   - Or delete entirely?

4. **Legacy charts:**
   - Confirm safe to delete Recharts implementation?
   - All functionality moved to Chart.js?

---

## ✅ Next Steps

1. **Review this document** with user
2. **Get approval** for deletions
3. **Create cleanup branch:** `git checkout -b cleanup/remove-dead-code`
4. **Execute deletions** systematically
5. **Update imports** where needed
6. **Run tests:** `pnpm build` and `pnpm type-check`
7. **Commit changes:** Clear commit message referencing this doc
8. **Merge to dev** after verification

---

**Document Version:** 1.0
**Last Updated:** 2025-10-07
**Maintained By:** Claude (Code Audit)
