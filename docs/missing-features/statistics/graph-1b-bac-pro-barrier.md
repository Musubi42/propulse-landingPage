# 📊 Graph 1b: Academic Tracking - The BAC Pro Barrier

**Chart Type:** Funnel Chart + Inset Bar Chart
**Complexity:** ⭐⭐⭐⭐ (Complex - custom implementation)
**Implementation Priority:** #3 (After Graph 1a and 3)

---

## Objective

Expose the **extreme difficulty for BAC professionnel graduates** to access CPGE compared to BAC général.

**Key Message:** "Le BAC professionnel ferme presque totalement la porte des CPGE, perpétuant les inégalités"

---

## Data

### Funnel Chart (Main) - Enrollment Rates
- **BAC Général → CPGE:** **10.1%**
- **BAC Technologique → CPGE:** **1.9%**
- **BAC Professionnel → CPGE:** **0.1%**

### Absolute Numbers (2024) - Inset Bar Chart
- **BAC Général:** 39,318 new entrants **(90.5%)**
- **BAC Techno:** 2,867 new entrants **(6.6%)**
- **BAC Pro:** 174 new entrants **(0.4%)**
- **Total:** 43,445 new entrants

### TypeScript Data Structure

```typescript
export const bacProData = {
  funnelRates: [
    { type: 'BAC Général', rate: 10.1, color: '#43e97b', percentage: 90.5 },
    { type: 'BAC Technologique', rate: 1.9, color: '#fee140', percentage: 6.6 },
    { type: 'BAC Professionnel', rate: 0.1, color: '#fa709a', percentage: 0.4 },
  ],
  absoluteNumbers: {
    bacGeneral: 39318,
    bacTechno: 2867,
    bacPro: 174,
    total: 43445,
  },
};
```

---

## Visual Design

### Funnel Chart (Main)

#### Structure
- **Width proportional to enrollment rate** (10.1% widest → 0.1% narrowest)
- **Vertical alignment:** Top to bottom
- **Color gradient:** Green → Yellow → Red/Coral

#### Colors
- **BAC Général:** `#43e97b` (green - positive)
- **BAC Techno:** `#fee140` (yellow - warning)
- **BAC Pro:** `#fa709a` (red/coral - alert)

#### Labels Inside Each Funnel Section
- "BAC Général: **10.1%** accèdent à la CPGE"
- "BAC Technologique: **1.9%**"
- "BAC Professionnel: **0.1%**"

### Inset Bar Chart (Small, Bottom-Right)

#### Structure
- **Title:** "Effectifs réels en 2024"
- **3 horizontal bars** showing absolute numbers
- **Same color coding** as funnel
- **Position:** Absolute positioned bottom-right, semi-transparent background

---

## Implementation Approach

### Option 1: Custom SVG Funnel (Recommended)
Since Chart.js doesn't have native funnel support, create a custom SVG component:

```typescript
// Simplified example
function FunnelSegment({ label, rate, color, width, y }) {
  return (
    <g>
      <path
        d={`M ${50 - width/2} ${y} L ${50 + width/2} ${y} L ${50 + width/2 - 5} ${y + 80} L ${50 - width/2 + 5} ${y + 80} Z`}
        fill={color}
        opacity={0.9}
      />
      <text x="50%" y={y + 40} textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
        {label}: {rate}%
      </text>
    </g>
  );
}
```

### Option 2: Stacked Bar Hack
Use Chart.js stacked bars with calculated widths to simulate funnel appearance.

### Option 3: chartjs-chart-funnel Plugin
```bash
pnpm add chartjs-chart-funnel
```

---

## Annotations

### Title
**"L'impasse des BAC Pro : une orientation qui ferme les portes"**

### Subtitle
"Taux d'accès aux CPGE selon le type de baccalauréat (2023)"

### Callout Text (Arrow/Box)
Point to BAC Pro section:
- "**Seulement 174 étudiants** issus de BAC Pro ont intégré une CPGE en 2024"
- "**100 fois moins de chances** qu'un bachelier général"

**Calculation:**
```typescript
const ratio = (10.1 / 0.1).toFixed(0); // = 101 ≈ 100×
```

---

## Key Insight Box

```typescript
insights: [
  'Un bachelier général a 100× plus de chances d\'accéder à une CPGE qu\'un bachelier professionnel',
  'Seulement 174 étudiants issus de BAC Pro ont intégré une CPGE en 2024',
  'Cette barrière invisible perpétue les inégalités sociales : les BAC Pro sont majoritairement issus de milieux populaires',
]
```

---

## Source Citation

"Sources : RERS 2024 (DEPP, SIES) - Tableau 7.22 ; Note Flash SIES n° 2025-03 (Février 2025)"

**Link:** [https://rers.depp.education.fr/2024/ (Tableau 7.22)](https://rers.depp.education.fr/2024/details/07_ETU/22_TXINS/02#)

---

## Component Structure

**File:** `src/components/charts/BacProBarrierChart.tsx`

```typescript
'use client';

import { ChartCard } from '@/components/ui/ChartCard';
import { InsightBox } from '@/components/ui/InsightBox';
import { bacProData } from '@/data/cpge-statistics-data';
import { FunnelVisualization } from './FunnelVisualization'; // Custom SVG
import { InsetBarChart } from './InsetBarChart'; // Small Chart.js bar

export function BacProBarrierChart() {
  return (
    <ChartCard
      title="L'impasse des BAC Pro : une orientation qui ferme les portes"
      subtitle="Taux d'accès aux CPGE selon le type de baccalauréat (2023)"
      source="RERS 2024 (DEPP, SIES) - Tableau 7.22 ; Note Flash SIES n° 2025-03"
    >
      <div className="relative h-[500px]">
        {/* Main Funnel */}
        <FunnelVisualization data={bacProData.funnelRates} />

        {/* Inset Bar Chart */}
        <div className="absolute bottom-4 right-4 w-64 h-48 bg-white/90 p-4 rounded-lg shadow-lg border border-gray-200">
          <InsetBarChart data={bacProData.absoluteNumbers} />
        </div>

        {/* Callout Annotation */}
        <div className="absolute bottom-20 left-4 max-w-xs bg-accent/10 p-3 rounded-lg border-l-4 border-accent">
          <p className="text-sm font-semibold text-accent">
            100× moins de chances qu'un bachelier général
          </p>
        </div>
      </div>

      <InsightBox
        insights={[
          'Un bachelier général a 100× plus de chances d\'accéder à une CPGE qu\'un bachelier professionnel',
          'Seulement 174 étudiants issus de BAC Pro ont intégré une CPGE en 2024',
          'Cette barrière invisible perpétue les inégalités sociales',
        ]}
        variant="warning"
      />
    </ChartCard>
  );
}
```

---

## Responsive Behavior

### Desktop
- Full funnel + inset chart visible
- Callout annotation positioned with arrow

### Tablet
- Slightly smaller inset chart
- Maintain funnel proportions

### Mobile
- Stack funnel and bar chart vertically
- Simplify callout text
- Reduce heights to fit screen

---

## Testing Checklist

- [ ] Funnel segments scale correctly (widths proportional to rates)
- [ ] Colors follow gradient (green → yellow → red)
- [ ] Inset bar chart is readable and positioned correctly
- [ ] Callout annotation is visible and positioned well
- [ ] 100× ratio is calculated and displayed accurately
- [ ] Insight box emphasizes severity of barrier
- [ ] Responsive on all screen sizes
- [ ] Alt text describes funnel narrowing

---

**Next:** [Graph 2: Social Reproduction](./graph-2-social-reproduction.md) (most complex)
