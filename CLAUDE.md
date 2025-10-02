# CLAUDE.md - Propulse Landing Page Project

**Last Updated:** 2025-10-02
**Project:** Propulse Association Landing Page
**Status:** 🟡 Planning / Initial Setup Phase

---

## Project Overview

Building a modern, animated landing page for **Propulse**, a French association providing free mentorship to high school students ("lycéens") aiming for "Grandes Écoles" (elite French universities).

### Key Objectives
- Present Propulse as a movement-in-motion (not an established institution)
- Segment 3 distinct audiences: Lycéens, Mentors, and Lycées
- Leverage LinkedIn momentum as social proof (50+ mentors, 400+ reactions)
- Communicate the emotional founder story and mission
- Drive conversions to 3 distinct CTAs with equal priority
- Establish strong visual identity using pen/paper/journey metaphor

### Technology Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui components
- **Animation:** Framer Motion + react-intersection-observer
- **Language:** TypeScript
- **Package Manager:** pnpm 9.x
- **Deployment:** Vercel (standalone project)
- **Domain:** propulse-association.fr (via Cloudflare DNS)

---

## Repository Context

This is a **standalone Next.js 15 project** (not a monorepo).

**Working Directory:** `/Users/musubi42/Documents/freelance/propulse/newLandingPage`
**Git Repository:** `git@github.com:Musubi42/propulse-landingPage.git`

**Project Structure:**
```
~/Documents/freelance/propulse/
├── landingPage/         # Old landing page (Vite-based, coexists)
├── newLandingPage/      # NEW Next.js 15 project ← CURRENT
│   ├── CLAUDE.md
│   ├── docs/
│   ├── specs/
│   └── [Next.js files will be created here]
└── platform/            # Existing platform (separate)
```

**Important Notes:**
- Fresh start - no migration from old landingPage
- Will deploy to propulse-association.fr (replacing old deployment)
- Coexists with old landingPage folder during development

---

## Project Status Tracker

### Phase 1: Project Setup ✅ READY TO START
- [ ] 1.1 Environment Prerequisites
- [ ] 1.2 Project Initialization
- [ ] 1.3 Core Dependencies Installation
- [ ] 1.4 Configuration Files Setup
- [ ] 1.5 Shadcn/UI Setup
- [ ] 1.6 Git Branch Strategy
- [ ] 1.7 VS Code Configuration

### Phase 2: Visual Identity & Foundation 🔜
- [ ] 2.1 Color System Implementation
- [ ] 2.2 Typography Setup
- [ ] 2.3 Global Styles & CSS Variables
- [ ] 2.4 Reusable Animation Components
- [ ] 2.5 Pen Line SVG Component
- [ ] 2.6 Polymorph Divider Component

### Phase 3: Core Sections - Homepage 🔜
- [ ] 3.1 Hero Section
- [ ] 3.2 Social Proof Section
- [ ] 3.3 Statistics Section (Le Problème)
- [ ] 3.4 Solution Preview Section
- [ ] 3.5 Founders Section
- [ ] 3.6 Mentors Section
- [ ] 3.7 Final CTA Section
- [ ] 3.8 Footer

### Phase 4: Programme Page 🔜
- [ ] 4.1 Programme Page Layout
- [ ] 4.2 Interactive Timeline Component
- [ ] 4.3 Accordion Implementation (6 phases)
- [ ] 4.4 Animation Integration

### Phase 5: Polish & Optimization 🔜
- [ ] 5.1 Mobile Responsiveness (all breakpoints)
- [ ] 5.2 Accessibility Audit (WCAG AA)
- [ ] 5.3 Performance Optimization
- [ ] 5.4 SEO Meta Tags
- [ ] 5.5 Image Optimization
- [ ] 5.6 Cross-browser Testing

### Phase 6: Deployment & Launch 🔜
- [ ] 6.1 Vercel Project Setup
- [ ] 6.2 Environment Variables Configuration
- [ ] 6.3 DNS Configuration (Cloudflare)
- [ ] 6.4 SSL Certificate Verification
- [ ] 6.5 Staging Deployment (staging branch)
- [ ] 6.6 Production Deployment (main branch)
- [ ] 6.7 Analytics Setup
- [ ] 6.8 Final Testing

---

## Quick Reference

### Key Files & Locations

**Specifications:**
- [PRD.md](specs/PRD.md) - Full product requirements
- [Technical-documentation.md](specs/Technical-documentation.md) - Setup guide
- [Palette-colors.md](specs/Palette-colors.md) - Color system
- [Vercel.md](specs/Vercel.md) - Deployment notes

**Project Structure:**
```
landingPage/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   ├── programme/page.tsx  # Program page
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                 # shadcn components
│   │   ├── sections/           # Page sections
│   │   └── animations/         # Reusable animations
│   └── lib/
│       └── utils.ts
├── public/
│   ├── images/placeholders/
│   └── documents/
├── next.config.ts
├── tailwind.config.ts
└── vercel.json
```

### Color Palette Quick Reference

**Backgrounds:**
- Primary: `#FAF6F0` (warm cream)
- Secondary: `#F5EFE6` (soft beige)
- Tertiary: `#EBE3D5` (subtle divider)

**Primary Colors:**
- Deep Navy: `#1B3A52` (authority)
- Burnt Orange: `#D97642` (energy, "Fonce!")
- Forest Green: `#4A6B52` (growth)

**Text:**
- Primary: `#2A2A2A` (dark charcoal)
- Secondary: `#4A4A4A`
- Tertiary: `#6B6B6B` (placeholder)

**Accent:**
- Pen Line: `#3D3D3D` (animated strokes)
- LinkedIn: `#0A66C2` (social proof)

### Git Branch Strategy

```
main         → Production (propulse-association.fr)
staging      → Staging (staging.propulse-association.fr)
dev          → Development (auto-deploy to Vercel preview)
feature/*    → Feature branches (merge to dev)
```

**Workflow:** dev → staging → main

### Development Commands

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Type checking
pnpm type-check

# Linting
pnpm lint

# Add shadcn component
pnpm dlx shadcn@latest add [component-name]
```

### Useful Links

**Design References:**
- 1jeune1mentor.fr (visual inspiration)
- article-1.eu (stats presentation)
- telemaque.org (founder storytelling)

**Documentation:**
- [Next.js Docs](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Docs](https://vercel.com/docs)

---

## Key Design Principles

### Visual Identity
1. **Pen & Journey Metaphor** - Hand-drawn pen line that traces a "journey" as user scrolls
2. **Paper & Ink Aesthetic** - Warm aged paper color palette with subtle texture
3. **Polymorph Soft Dividers** - Organic, flowing shapes between sections (inspired by 1j1m)
4. **Circle Crops** - For hero images and founder photos (pen-drawn edge effect)

### Content Principles
- **100% gratuit** - Emphasized throughout
- **100% à distance** - Using intuitive internet tools
- **Movement, not institution** - Energy, authenticity, momentum
- **Warm & approachable** - Not corporate, relatable
- **Stats-driven** - Show the gap we're closing
- **Founder-story led** - Arthur & Hugo's journeys = credibility

### Animation Guidelines
- Fade in + slide up for text blocks
- Scale/zoom in for stats/numbers
- Draw/write effect for pen line elements
- Trigger animations when element is 20-30% in viewport
- Smooth, natural timing (0.6-0.8s duration)
- Use CSS transforms (translate, scale) over position changes

---

## Three Target Audiences & CTAs

### 1. Lycéens (High School Students)
**CTA:** "Je suis lycéen"
**Destination:** Google Form for student registration
**Needs:** Clear program explanation, social proof, founder stories

### 2. Mentors (Students/Alumni)
**CTA:** "Je deviens mentor"
**Destination:** Google Form for mentor registration
**Needs:** Time commitment clarity, impact demonstration, ease of participation

### 3. Lycées (High Schools)
**CTA:** "Je suis un lycée"
**Destination:** Partnership form
**Needs:** Program legitimacy, partnership value, scalability evidence

---

## Next Actions

1. **Review specifications** - Ensure understanding of all requirements
2. **Begin Phase 1** - Project initialization and setup
3. **Create base components** - Start with visual identity elements
4. **Build Hero section** - First major component
5. **Iterate and refine** - Based on feedback and testing

---

## Notes & Context

- **Timeline:** Target launch Q1 2025 (before September cohort recruitment)
- **First cohort:** September 2025-2026
- **Current traction:** 50+ mentors committed, 400+ LinkedIn supporters
- **Founders:** Arthur Costa (EDHEC/Dauphine) & Hugo Nicaise (EDHEC)
- **Mission:** Democratize access to Grandes Écoles by closing geographic, social, and gender gaps

---

## Contact & Resources

**Founders:**
- Arthur Costa: +33 7 69 97 72 42
- Hugo Nicaise: +33 7 62 54 29 18
- Email: propulse.association@gmail.com

**Repository:** git@github.com:Musubi42/propulse-landingPage.git
**Domain:** propulse-association.fr (Cloudflare DNS)
**Deployment:** Vercel (Paris region: cdg1)
**Branch Strategy:** dev → staging → main

---

**This document is maintained by Claude and updated throughout the development process.**
