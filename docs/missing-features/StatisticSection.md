Implementation Guide: Statistics Section - Educational Inequality Data Visualization
Feature: Interactive Statistics Section with Data Visualizations
Target Component: StatisticsSection.tsx
Estimated Complexity: Medium
Estimated Time: 4-6 hours for junior developer

📋 Overview
This document guides the implementation of an interactive statistics section that visualizes educational inequality in France using official government data. The section tells a story through three progressive charts showing how inequality compounds from age 11 through higher education access.

🎯 User Story
As a website visitor
I want to see compelling visual evidence of educational inequality
So that I understand why Propulse exists and feel motivated to join the movement

🏗️ Architecture Overview
StatisticsSection (parent container)
├── SectionHeader
├── TimelineHeader (visual age progression: 11 → 15 → 18+)
├── ChartCard (reusable wrapper) × 3
│   ├── Chart1: PerformanceGapChart (Grouped Bar - Recharts)
│   ├── Chart2: OrientationDisparityChart (Stacked Bar - Recharts)
│   └── Chart3: CPGEAccessChart (Donut + Bar comparison - Recharts)
└── PropulseInterventionCallout

📦 Dependencies to Install
bash# Already available in your project
# Verify in package.json:
- recharts (should be present)
- framer-motion (should be present)
- react-intersection-observer (should be present)
If recharts is missing:
bashpnpm add recharts

📊 Data Structure
Create a new file: src/lib/statistics-data.ts
Data Format
typescript// Each dataset should follow this structure:

type StatisticDataPoint = {
  category: string;        // e.g., "Enfants de cadres"
  value: number;          // percentage or count
  color: string;          // from your color palette
  source?: string;        // citation
};

type ChartConfig = {
  title: string;
  subtitle: string;
  description: string;
  ageMarker: string;      // e.g., "11 ans - Entrée en 6ème"
  data: StatisticDataPoint[];
  source: {
    text: string;         // e.g., "DEPP, Ministère de l'Éducation nationale, 2022"
    url?: string;
  };
  interpretation?: string; // Key takeaway
};
Actual Data to Input
Chart 1 Data: Performance at Age 11
typescript{
  title: "Les inégalités apparaissent dès le collège",
  subtitle: "Maîtrise du français en 6ème selon l'origine sociale",
  ageMarker: "11 ans",
  data: [
    {
      category: "Enfants de cadres",
      bonNiveau: 41,
      enDifficulte: 5,
      // These map to: good level vs struggling
    },
    {
      category: "Enfants d'ouvriers", 
      bonNiveau: 10,
      enDifficulte: 26,
    },
    {
      category: "Enfants d'inactifs",
      bonNiveau: 6,
      enDifficulte: 45,
    }
  ],
  source: {
    text: "DEPP, Ministère de l'Éducation nationale, 2022",
    url: "https://www.education.gouv.fr/evolution-des-inegalites..."
  }
}
Chart 2 Data: Orientation Disparities
typescript{
  title: "L'orientation amplifie les écarts",
  subtitle: "Répartition par filière au lycée selon l'origine sociale",
  ageMarker: "15-18 ans",
  data: [
    {
      category: "Parents ouvriers ou inactifs",
      generaleEtTechno: 29,
      bacPro: 53,
      cap: 65, // use the highest concentration stat
    },
    {
      category: "Ensemble des élèves",
      generaleEtTechno: 71,
      bacPro: 47,
      cap: 35,
    }
  ],
  source: {
    text: "DEPP 2023-2024, INSEE",
    url: "https://www.insee.fr/fr/statistiques/8242339"
  }
}
Chart 3 Data: CPGE Access
typescript{
  title: "L'accès aux Grandes Écoles reste inégalitaire",
  subtitle: "Origine sociale des élèves de classes préparatoires",
  ageMarker: "18+ ans",
  data: {
    cpgeComposition: [
      { category: "Enfants de cadres", value: 50, color: "#1B3A52" },
      { category: "Autres catégories", value: 40, color: "#5D8468" },
      { category: "Enfants d'ouvriers", value: 10, color: "#D97642" },
    ],
    populationGenerale: [
      { category: "Cadres (population FR)", value: 22 },
      { category: "Ouvriers (population FR)", value: 20 }, // approximate
    ]
  },
  source: {
    text: "DEPP 2017, INSEE",
    url: "https://www.insee.fr/fr/statistiques/4797658"
  },
  interpretation: "Les enfants de cadres sont 2.3× surreprésentés en CPGE par rapport à leur poids dans la population"
}

🎨 Design Specifications
Colors (from your palette)
typescript// src/lib/chart-colors.ts
export const CHART_COLORS = {
  privileged: '#1B3A52',      // Deep navy (cadres)
  disadvantaged: '#D97642',    // Burnt orange (ouvriers/défavorisés)
  intermediate: '#5D8468',     // Forest green (catégories intermédiaires)
  positive: '#4A6B52',         // Success green
  neutral: '#6B6B6B',          // Neutral gray
  background: '#FAF6F0',       // Warm cream
  
  // Chart-specific
  goodPerformance: '#4A6B52',
  struggling: '#D97642',
};
Typography
typescript// Chart titles: text-3xl font-bold text-primary
// Chart subtitles: text-lg text-text-secondary
// Axis labels: text-sm text-text-tertiary
// Tooltips: text-sm text-primary bg-background shadow-lg
// Sources: text-xs text-text-tertiary italic
Spacing & Layout

Section padding: py-24 (top/bottom)
Max width: max-w-7xl mx-auto
Chart cards: gap-16 between charts
Card padding: p-8
Card background: bg-background-secondary rounded-lg shadow-sm


🔧 Implementation Steps
Step 1: Create Data File (30 min)
File: src/lib/statistics-data.ts
Tasks:

Define TypeScript types for chart configurations
Export three constants: CHART_1_DATA, CHART_2_DATA, CHART_3_DATA
Include all data points with proper typing
Add source citations for each dataset

Validation:

Run pnpm type-check - should pass without errors
All data points should have required fields
Percentages should add up logically


Step 2: Create Reusable Chart Wrapper (45 min)
File: src/components/sections/statistics/ChartCard.tsx
Purpose: Consistent container for all charts
Props Interface:
typescriptinterface ChartCardProps {
  title: string;
  subtitle: string;
  ageMarker?: string;
  source: {
    text: string;
    url?: string;
  };
  interpretation?: string;
  children: React.ReactNode; // The actual chart component
}
Features to implement:

Fade-in animation on scroll (use useInView from react-intersection-observer)
Paper-like background with subtle shadow
Age marker badge in top-right corner (optional)
Source citation at bottom with link (if URL provided)
Optional interpretation callout box below chart

Styling notes:

Use motion.div from framer-motion for entrance animation
Threshold for useInView: 0.2 (triggers when 20% visible)
Animation: initial={{ opacity: 0, y: 30 }} → animate={{ opacity: 1, y: 0 }}
Duration: 0.8s with ease-out


Step 3: Build Chart 1 - Performance Gap (60 min)
File: src/components/sections/statistics/PerformanceGapChart.tsx
Chart Type: Horizontal Grouped Bar Chart (Recharts BarChart)
Visual Goal: Show stark contrast between "Bon niveau" and "En difficulté" for each social category
Recharts Components to Use:

BarChart (parent)
CartesianGrid (light grid, strokeDasharray="3 3")
XAxis (percentage scale, 0-50%)
YAxis (categories: cadres, ouvriers, inactifs)
Tooltip (custom styled)
Legend
Bar × 2 (one for "Bon niveau", one for "En difficulté")

Key Configuration:
typescript// Layout: horizontal (bar grows left to right)
layout="horizontal"

// Two bars per category
<Bar dataKey="bonNiveau" fill={CHART_COLORS.positive} name="Bon niveau" />
<Bar dataKey="enDifficulte" fill={CHART_COLORS.disadvantaged} name="En difficulté" />

// Custom tooltip to show:
// "Enfants de cadres: 41% bon niveau, 5% en difficulté"
Custom Tooltip Requirements:

White background with shadow
Show category name as header
Show both values with colored indicators
Add "Source: DEPP 2022" in small text at bottom

Responsive Behavior:

Desktop: horizontal bars, full width
Mobile (<768px): consider vertical bars OR smaller bars with readable labels


Step 4: Build Chart 2 - Orientation Disparity (60 min)
File: src/components/sections/statistics/OrientationDisparityChart.tsx
Chart Type: Stacked Bar Chart (vertical)
Visual Goal: Show how students are distributed across tracks (Générale/Techno, Bac Pro, CAP)
Recharts Components:

BarChart
XAxis (social categories)
YAxis (percentage 0-100%)
Bar × 3 (stacked, one per track)
Tooltip
Legend

Key Configuration:
typescript// Stacked bars
<Bar dataKey="generaleEtTechno" stackId="a" fill={CHART_COLORS.privileged} name="Générale/Techno" />
<Bar dataKey="bacPro" stackId="a" fill={CHART_COLORS.intermediate} name="Bac Pro" />
<Bar dataKey="cap" stackId="a" fill={CHART_COLORS.disadvantaged} name="CAP" />
Visual Enhancement:

Add percentage labels inside bars (if space allows)
Highlight the disparity with a subtle annotation arrow or text: "53% des enfants d'ouvriers en Bac Pro vs 29% en voie générale"


Step 5: Build Chart 3 - CPGE Access (90 min)
File: src/components/sections/statistics/CPGEAccessChart.tsx
Chart Type: Donut Chart + Side-by-side Bar Comparison
Visual Goal: Show composition of CPGE vs general population
Structure:
┌────────────────────────────────────┐
│  Donut Chart        Bar Comparison │
│  (CPGE makeup)      (vs population)│
└────────────────────────────────────┘
Left Side - Donut Chart:

Use Recharts PieChart with Pie component
innerRadius={60} outerRadius={100} (for donut effect)
Show: 50% cadres, 40% autres, 10% ouvriers
Center text: "Classes Préparatoires"

Right Side - Comparison Bars:

Simple vertical bars showing:

"En CPGE: 50% enfants de cadres"
"Dans la population: 22% cadres"


Visual gap emphasizes overrepresentation

Custom Legend:

Below chart, show: "Les enfants de cadres sont 2.3× surreprésentés"
Use bold number with accent color


Step 6: Create Timeline Header (30 min)
File: src/components/sections/statistics/TimelineHeader.tsx
Visual: Horizontal timeline with age markers
11 ans ━━━━━━━━━━> 15 ans ━━━━━━━━━━> 18+ ans
Collège          Lycée              Supérieur
Implementation:

Use flexbox with connecting lines (borders or SVG)
Three milestone circles with age labels
Pen stroke style connecting lines (use your AnimatedPenDraw aesthetic)
Fade in from left to right on scroll


Step 7: Assemble Main StatisticsSection (45 min)
File: src/components/sections/StatisticsSection.tsx
Structure:
typescriptexport function StatisticsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <SectionHeader 
          title="Le constat qui nous motive"
          subtitle="Les inégalités scolaires en France en chiffres"
        />
        
        {/* Timeline */}
        <TimelineHeader />
        
        {/* Chart 1 */}
        <ChartCard {...CHART_1_DATA}>
          <PerformanceGapChart data={CHART_1_DATA.data} />
        </ChartCard>
        
        {/* Chart 2 */}
        <ChartCard {...CHART_2_DATA}>
          <OrientationDisparityChart data={CHART_2_DATA.data} />
        </ChartCard>
        
        {/* Chart 3 */}
        <ChartCard {...CHART_3_DATA}>
          <CPGEAccessChart data={CHART_3_DATA.data} />
        </ChartCard>
        
        {/* Intervention Callout */}
        <PropulseInterventionCallout />
        
      </div>
    </section>
  );
}
PropulseInterventionCallout:

Centered box with pen stroke border
Text: "C'est ici que Propulse intervient"
Icon: Arrow pointing to CTA section below
Accent background color (light orange tint)


Step 8: Update Exports (5 min)
File: src/components/sections/index.ts
Add:
typescriptexport { StatisticsSection } from './StatisticsSection';
The section is already imported in your page.tsx, so it should render automatically.

📱 Responsive Behavior Checklist
Desktop (>1024px)

 Full-width charts (max 1200px)
 Horizontal layout for bar charts
 Donut + bars side-by-side
 Hover tooltips appear on mouse over

Tablet (768-1023px)

 Charts stack vertically if needed
 Maintain readability of labels
 Timeline stays horizontal

Mobile (<768px)

 Timeline becomes vertical or simplified
 Charts switch to mobile-optimized variants
 Bar charts: consider vertical orientation
 Donut chart: full width, bars below
 Touch-friendly tooltips (tap to reveal, not hover)
 Reduced padding (py-12 instead of py-24)


🎬 Animation Specifications
Entrance Animations
Section Entrance:

Fade in from bottom: y: 30 → y: 0
Duration: 0.8s
Stagger: 0.2s between chart cards

Chart Elements:

Bars grow from 0 to full value
Duration: 1s
Delay: 0.2s after card appears
Easing: ease-out

Number Count-Up:

Use react-countup or custom hook
Trigger when chart is in view
Duration: 1.5s


✅ Testing Checklist
Functionality

 All three charts render without errors
 Data displays correctly (verify against source data)
 Tooltips show on hover (desktop) / tap (mobile)
 Sources are clickable and open in new tab
 Animations trigger on scroll (not on page load)
 Charts re-render correctly on window resize

Visual QA

 Colors match brand palette (check in DevTools)
 Typography hierarchy is clear
 Spacing is consistent between charts
 Charts are centered and properly aligned
 No overflow issues on any screen size

Accessibility

 All charts have descriptive titles (for screen readers)
 Color contrast meets WCAG AA standards
 Keyboard navigation works (tab through elements)
 Source links are keyboard accessible
 Alt text provided for any icons/images

Performance

 Recharts bundle size is acceptable (check with pnpm build)
 No layout shift when charts load
 Smooth 60fps animations
 Charts don't block main thread rendering

Cross-Browser

 Chrome (latest)
 Firefox (latest)
 Safari (latest) - especially test on iOS
 Edge (latest)


🐛 Common Issues & Solutions
Issue 1: "Recharts not rendering"
Symptoms: Blank space where chart should be
Solutions:

Verify data structure matches Recharts expected format
Check console for errors
Ensure parent container has defined height
Verify ResponsiveContainer has width/height props

Issue 2: "Animations not triggering"
Symptoms: Charts appear immediately without animation
Solutions:

Check useInView threshold value (try 0.1 if 0.2 too strict)
Verify triggerOnce: true is set
Test scroll behavior - may need to adjust scroll position
Check if motion.div has proper initial/animate props

Issue 3: "Tooltips cut off at edges"
Symptoms: Tooltip content hidden by container boundaries
Solutions:

Set parent container overflow: visible
Use Recharts' wrapperStyle prop on Tooltip
Position: 'absolute' may be needed
Consider using allowEscapeViewBox={{ x: true, y: true }}

Issue 4: "Mobile charts unreadable"
Symptoms: Labels overlap, text too small
Solutions:

Use media queries to adjust font sizes
Reduce number of data points on mobile
Switch to simplified chart variant
Increase min-height of chart container

Issue 5: "TypeScript errors with Recharts"
Symptoms: Type errors when using Recharts components
Solutions:

Install @types/recharts if not present
Use any type temporarily for complex tooltip payloads
Reference Recharts TypeScript examples in their docs


📚 Resources & References
Official Documentation

Recharts: https://recharts.org/en-US/
Framer Motion: https://www.framer.com/motion/
React Intersection Observer: https://github.com/thebuilder/react-intersection-observer

Design Inspiration

Observable: https://observablehq.com/ (data viz examples)
Our World in Data: https://ourworldindata.org/ (chart styling)
Datawrapper: https://www.datawrapper.de/ (clean chart designs)

Data Sources (for verification)

DEPP: https://www.education.gouv.fr/
INSEE: https://www.insee.fr/
Observatoire des inégalités: https://www.inegalites.fr/


🚀 Deployment Checklist
Before merging to main:

 Code review completed
 All TypeScript errors resolved
 ESLint passes with no warnings
 Build succeeds locally (pnpm build)
 Preview deployment tested on Vercel
 Mobile testing completed on real devices
 Lighthouse score >90 for Performance
 Accessibility score >95
 Data sources verified for accuracy
 Section integrated into main page flow


📈 Future Enhancements (Out of Scope)
V2 Features to Consider:

Interactive filters (toggle between different metrics)
Downloadable chart images (PNG export)
Animated transitions between chart states
Comparison mode (2017 vs 2024 data)
"Share this chart" social media buttons
Embedded video explaining the statistics
A/B test different chart types for engagement


💡 Tips for Junior Developer

Start Small: Build ChartCard wrapper first, then add one chart at a time
Use Console Logs: Log data structure before passing to Recharts to verify format
Reference Examples: Recharts has excellent examples - copy and modify
Test Incrementally: Don't wait until everything is done to test
Ask for Help: If stuck on Recharts syntax, check GitHub issues - likely solved already
Mobile First: Test mobile view early, don't leave it for the end
Git Commits: Commit after each chart is working (atomic commits)
Screenshot Tests: Take screenshots at different breakpoints to compare

Estimated Breakdown:

Setup & data structure: 30 min
ChartCard component: 45 min
Chart 1: 60 min
Chart 2: 60 min
Chart 3: 90 min
Timeline: 30 min
Integration & polish: 45 min
Testing & fixes: 60 min
Total: ~6 hours


✨ Success Criteria
This feature is complete when:

All three charts display accurate data from official sources
Animations are smooth and enhance understanding (not distract)
Mobile experience is as good as desktop (different, but good)
Sources are properly cited and linked
Performance impact is minimal (<100KB added to bundle)
User can understand the inequality story in 30 seconds of scrolling
Section integrates seamlessly with rest of landing page design


Document Version: 1.0
Last Updated: 2025-01-06
Author: Product Team
Reviewer: Tech Lead (pending)