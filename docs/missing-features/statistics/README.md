# 📊 CPGE Data Visualization Suite

**Project Title:** Les inégalités d'accès aux CPGE : une triple fracture géographique, sociale et de parcours scolaire

**Status:** 📝 Specification Phase
**Last Updated:** 2025-10-06

---

## Overview

This folder contains the complete specifications for implementing 4 interactive data visualizations exposing barriers to CPGE (Classes Préparatoires aux Grandes Écoles) access in France.

### Purpose
- Expose educational inequalities through data-driven storytelling
- Support Propulse's mission to democratize access to Grandes Écoles
- Provide transparent, source-backed evidence for advocacy

### Target Audience
- Propulse website visitors (lycéens, mentors, educators)
- Policymakers and education professionals
- General public interested in educational equity

---

## The 4 Graphs

### 1. Graph 1a: Geographic Inequality
**File:** [graph-1a-geographic-inequality.md](./graph-1a-geographic-inequality.md)

**Chart Type:** Grouped horizontal bar chart
**Key Finding:** Île-de-France represents 16% of population but hosts 32% of CPGE students (2.0x overrepresentation)

**Technologies:** Chart.js horizontal bar chart

---

### 2. Graph 1b: BAC Pro Barrier
**File:** [graph-1b-bac-pro-barrier.md](./graph-1b-bac-pro-barrier.md)

**Chart Type:** Funnel chart + inset bar chart
**Key Finding:** BAC Pro graduates have 100x less chance of accessing CPGE than BAC Général (0.1% vs 10.1%)

**Technologies:** Chart.js funnel (via plugin or custom), annotation plugin

---

### 3. Graph 2: Social Reproduction
**File:** [graph-2-social-reproduction.md](./graph-2-social-reproduction.md)

**Chart Type:** Multi-line chart with reference lines and shaded zones
**Key Finding:** Children of "Cadres" are 3.1x overrepresented in CPGE (52.8% vs 17% national), stable over 15 years (2007-2022)

**Technologies:** Chart.js line chart, chartjs-plugin-annotation for reference lines

---

### 4. Graph 3: Gender Segregation
**File:** [graph-3-gender-segregation.md](./graph-3-gender-segregation.md)

**Chart Type:** 100% stacked horizontal bar chart
**Key Finding:** Only 30% women in scientific CPGE vs 70% in literary (smallest field)

**Technologies:** Chart.js stacked bar, chartjs-plugin-datalabels

---

## Implementation Guide

**Technical Documentation:** [TECHNICAL-IMPLEMENTATION.md](./TECHNICAL-IMPLEMENTATION.md)

### Key Technologies
- **Chart.js** v4.5.0+ (already installed)
- **chartjs-plugin-annotation** (for reference lines, arrows, callouts)
- **chartjs-plugin-datalabels** (for in-bar labels)
- **chartjs-plugin-funnel** (for funnel visualization)

### Implementation Order
1. **Graph 1a** → Geographic inequality (simplest, grouped bars)
2. **Graph 3** → Gender segregation (stacked bars, similar complexity)
3. **Graph 1b** → BAC Pro barrier (custom funnel, more complex)
4. **Graph 2** → Social reproduction (most complex: multi-line, annotations, zones)

### Component Structure
```
src/
├── components/
│   ├── charts/
│   │   ├── GeographicInequalityChart.tsx     # Graph 1a
│   │   ├── BacProBarrierChart.tsx            # Graph 1b
│   │   ├── SocialReproductionChart.tsx       # Graph 2
│   │   └── GenderSegregationChart.tsx        # Graph 3
│   ├── ui/
│   │   ├── ChartCard.tsx                     # Reusable wrapper (already exists)
│   │   └── InsightBox.tsx                    # Key insights component
│   └── sections/
│       ├── DataVisualizationSection.tsx      # NEW: Main section with all 4 graphs
│       └── LegacyStatisticsSection.tsx       # OLD: Renamed Recharts version
└── data/
    └── cpge-statistics-data.ts               # All graph data + metadata
```

---

## Storytelling Flow

The graphs should be presented in this narrative order on the page:

1. **Introduction** (3-4 sentences) → Propulse's mission context
2. **Graph 1a** → Geographic inequality: "Living far from cities limits access"
3. **Graph 1b** → BAC Pro barrier: "Academic tracking perpetuates inequality"
4. **Transition** (2-3 sentences) → Link to social origins
5. **Graph 2** → Social reproduction: "Family background determines access"
6. **Transition** (2-3 sentences) → Intersectionality
7. **Graph 3** → Gender segregation: "Gender stereotypes limit women in sciences"
8. **Conclusion + CTA** → "Propulse breaks down these invisible walls"

---

## Key Messages

### Geographic
> "Vivre loin des grandes villes réduit drastiquement les chances d'accéder à une CPGE"

### Academic Tracking
> "Le BAC professionnel ferme presque totalement la porte des CPGE, perpétuant les inégalités"

### Social Reproduction
> "Les CPGE restent un espace de reproduction sociale : l'origine familiale détermine l'accès"

### Gender Segregation
> "Les stéréotypes de genre orientent les parcours dès le lycée, limitant l'accès des femmes aux filières scientifiques"

### Solution
> "Propulse agit pour briser ces trois murs invisibles en accompagnant gratuitement les lycéens éloignés des codes des Grandes Écoles"

---

## Data Sources

### Primary Sources
1. **Note Flash SIES n° 2025-03** (Février 2025) - MESR
   URL: https://www.enseignementsup-recherche.gouv.fr/fr/les-effectifs-en-classes-preparatoires-aux-grandes-ecoles-la-rentree-2024-2025-98530

2. **RERS 2024** - Repères et Références Statistiques (DEPP, SIES)
   URL: https://rers.depp.education.fr/2024/

3. **INSEE** - Recensement de la population 2021
   *(User to provide CSP distribution link)*

4. **INSEE** - Données démographiques régionales
   *(For population by region data)*

---

## Design Guidelines

### Color Palette
- **Primary:** `#667eea` (purple-blue)
- **Secondary:** `#f093fb` (pink)
- **Accent 1:** `#4facfe` (light blue)
- **Accent 2:** `#43e97b` (green)
- **Accent 3:** `#fa709a` (coral)
- **Warning:** `#fee140` (yellow)
- **Text:** `#2c3e50` (dark gray)
- **Grid:** `#ecf0f1` (light gray)

### Typography
- **Headings:** Bold, sans-serif, 24-28px
- **Subtitles:** Regular, 16-18px
- **Body text:** 14-16px
- **Data labels:** 13-14px, bold for numbers

### Accessibility
- WCAG AA compliant (4.5:1 contrast minimum)
- Keyboard navigation support
- Screen reader compatible
- Alternative data table views

---

## Next Steps

1. ✅ Read and understand all graph specification documents
2. ⬜ Review [TECHNICAL-IMPLEMENTATION.md](./TECHNICAL-IMPLEMENTATION.md)
3. ⬜ Install required Chart.js plugins
4. ⬜ Rename old `DataVisualizationSection` to `LegacyStatisticsSection`
5. ⬜ Create data file with all CPGE statistics
6. ⬜ Implement graphs one by one (start with Graph 1a)
7. ⬜ Test responsiveness and accessibility
8. ⬜ Integrate into main landing page

---

**Questions?** Contact project maintainer or refer to individual graph specification files.
