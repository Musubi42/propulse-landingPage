# Project Tracker - Propulse Landing Page

**Last Updated:** 2025-10-02
**Current Phase:** Phase 1 - Setup
**Overall Progress:** 0% Complete

---

## Phase Overview

| Phase | Name | Status | Progress | Est. Time |
|-------|------|--------|----------|-----------|
| 1 | Project Setup | 🟡 Not Started | 0/9 | 2-3h |
| 2 | Visual Identity & Foundation | ⬜ Pending | 0/9 | 3-4h |
| 3 | Core Sections - Homepage | ⬜ Pending | 0/8 | 6-8h |
| 4 | Programme Page | ⬜ Pending | 0/4 | 3-4h |
| 5 | Polish & Optimization | ⬜ Pending | 0/6 | 4-5h |
| 6 | Deployment & Launch | ⬜ Pending | 0/8 | 2-3h |

**Total Estimated Time:** 20-27 hours

---

## Phase 1: Project Setup (0/9) 🟡

**Status:** Not Started
**Document:** [PHASE-1-SETUP.md](PHASE-1-SETUP.md)

- [ ] 1.1 Environment Prerequisites
- [ ] 1.2 Project Initialization
- [ ] 1.3 Core Dependencies Installation
- [ ] 1.4 Configuration Files Setup
- [ ] 1.5 Environment Variables Setup
- [ ] 1.6 Shadcn/UI Setup
- [ ] 1.7 Git Branch Strategy (dev/staging/main)
- [ ] 1.8 VS Code Configuration
- [ ] 1.9 Verify Setup

**Blockers:** None
**Notes:** Ready to start

---

## Phase 2: Visual Identity & Foundation (0/9) ⬜

**Status:** Pending
**Document:** [PHASE-2-FOUNDATION.md](PHASE-2-FOUNDATION.md)

- [ ] 2.1 Color System Implementation
- [ ] 2.2 Typography Setup
- [ ] 2.3 Global Styles & CSS Variables
- [ ] 2.4 Reusable Animation Components
- [ ] 2.5 Pen Line SVG Component
- [ ] 2.6 Polymorph Divider Component
- [ ] 2.7 Create Utility Functions
- [ ] 2.8 Update Root Layout
- [ ] 2.9 Create Test Page

**Blockers:** Requires Phase 1 completion
**Notes:** Foundation for all visual elements

---

## Phase 3: Core Sections - Homepage (0/8) ⬜

**Status:** Pending
**Document:** Coming Soon

**Sections to Build:**
- [ ] 3.1 Hero Section (with 3 CTAs)
- [ ] 3.2 Social Proof Section (50+ mentors, 400+ supporters)
- [ ] 3.3 Statistics Section (Le Problème - 3 key stats)
- [ ] 3.4 Solution Preview Section (6-phase program preview)
- [ ] 3.5 Founders Section (Arthur & Hugo stories)
- [ ] 3.6 Mentors Section (Grande École logos)
- [ ] 3.7 Final CTA Section
- [ ] 3.8 Footer

**Blockers:** Requires Phase 2 completion
**Notes:** Core content implementation

---

## Phase 4: Programme Page (0/4) ⬜

**Status:** Pending
**Document:** Coming Soon

- [ ] 4.1 Programme Page Layout
- [ ] 4.2 Interactive Timeline Component
- [ ] 4.3 Accordion Implementation (6 phases)
- [ ] 4.4 Animation Integration

**Blockers:** Requires Phase 3 completion
**Notes:** Detailed program explanation page

---

## Phase 5: Polish & Optimization (0/6) ⬜

**Status:** Pending
**Document:** Coming Soon

- [ ] 5.1 Mobile Responsiveness (375px, 768px, 1024px+)
- [ ] 5.2 Accessibility Audit (WCAG AA)
- [ ] 5.3 Performance Optimization (Lighthouse 90+)
- [ ] 5.4 SEO Meta Tags
- [ ] 5.5 Image Optimization
- [ ] 5.6 Cross-browser Testing

**Blockers:** Requires Phase 4 completion
**Notes:** Final quality assurance

---

## Phase 6: Deployment & Launch (0/8) ⬜

**Status:** Pending
**Document:** Coming Soon

- [ ] 6.1 Vercel Project Setup
- [ ] 6.2 Environment Variables Configuration
- [ ] 6.3 DNS Configuration (Cloudflare)
- [ ] 6.4 SSL Certificate Verification
- [ ] 6.5 Staging Deployment (staging branch)
- [ ] 6.6 Production Deployment (main branch)
- [ ] 6.7 Analytics Setup
- [ ] 6.8 Final Testing

**Blockers:** Requires Phase 5 completion
**Notes:** Go-live preparation

---

## Current Focus

**Active Phase:** Phase 1 - Project Setup
**Next Task:** 1.1 Environment Prerequisites
**Priority:** High

**Immediate Actions:**
1. Verify Node.js 24.x installed (or use 22.x)
2. Install pnpm 9.x
3. Install Vercel CLI
4. Verify GitHub, Vercel, and Cloudflare accounts

---

## Asset Checklist

### Images Needed
- [ ] Hero image (circle crop placeholder for now)
- [ ] Arthur Costa photo (circle crop)
- [ ] Hugo Nicaise photo (circle crop)
- [ ] Grande École logos (HEC, ESSEC, EDHEC, X, Sciences Po, Dauphine)
- [ ] Abstract/conceptual images for sections
- [ ] Favicon

### Content Needed
- [ ] Google Form URLs (Lycéens, Mentors, Lycées)
- [ ] Presentation PDF (`presentation-propulse.pdf`)
- [ ] LinkedIn profile links
- [ ] Final copy review for all sections

### External Dependencies
- [ ] Domain: propulse-association.fr (verify ownership)
- [ ] Cloudflare account access
- [ ] Vercel account (linked to GitHub)
- [ ] GitHub repository: git@github.com:Musubi42/propulse-landingPage.git

---

## Quality Metrics Targets

### Performance (Lighthouse)
- [ ] Performance: 90+
- [ ] Accessibility: 95+
- [ ] Best Practices: 95+
- [ ] SEO: 95+

### Core Web Vitals
- [ ] First Contentful Paint: < 1.5s
- [ ] Largest Contentful Paint: < 2.5s
- [ ] Time to Interactive: < 3.5s
- [ ] Cumulative Layout Shift: < 0.1

### Accessibility
- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation support
- [ ] Screen reader compatible
- [ ] Sufficient color contrast (4.5:1 minimum)

---

## Risk & Issues Log

**Current Risks:**
- Node.js 24 not yet released (use 22.x temporarily)
- Placeholder images need replacement before launch
- Google Form URLs not yet created

**Resolved Issues:**
None yet

---

## Daily Log

### 2025-10-02
- Created project documentation structure
- Initialized CLAUDE.md
- Created Phase 1 and Phase 2 documentation
- Created Project Tracker
- Status: Ready to begin Phase 1

---

## Notes & Decisions

### Key Decisions
1. **Framework:** Next.js 15 (App Router) - Modern, performant, good DX
2. **Styling:** Tailwind CSS + shadcn/ui - Fast development, consistent design
3. **Animation:** Framer Motion - Smooth, declarative animations
4. **Deployment:** Vercel - Seamless Next.js integration, edge network
5. **Project Type:** Standalone project (not monorepo) - Fresh start, clean structure
6. **Git Strategy:** Three-branch workflow (dev → staging → main)

### Design Philosophy
- Movement, not institution
- Warm and approachable, not corporate
- Stats-driven with emotional storytelling
- Paper & pen metaphor throughout
- 100% gratuit, 100% à distance

---

**This tracker is updated as work progresses. Check status before starting new tasks.**
