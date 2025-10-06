# 🛠️ CPGE Data Visualization - Technical Implementation Guide

**Last Updated:** 2025-10-06
**Status:** Implementation Ready

---

## Technology Stack

### Core Libraries
- **Chart.js** v4.5.0 ✅ (already installed)
- **React** 18.x ✅
- **TypeScript** ✅
- **Tailwind CSS** ✅

### Required Chart.js Plugins
```bash
# Install these plugins
pnpm add chartjs-plugin-annotation chartjs-plugin-datalabels
```

**Optional (for funnel):**
```bash
# If using pre-built funnel plugin
pnpm add chartjs-chart-funnel
# OR implement custom funnel using stacked bars
```

---

## Project File Structure

```
src/
├── components/
│   ├── charts/                              # Individual chart components
│   │   ├── GeographicInequalityChart.tsx    # Graph 1a - Grouped horizontal bars
│   │   ├── BacProBarrierChart.tsx           # Graph 1b - Funnel + inset bar
│   │   ├── SocialReproductionChart.tsx      # Graph 2 - Multi-line with annotations
│   │   └── GenderSegregationChart.tsx       # Graph 3 - Stacked horizontal bars
│   │
│   ├── ui/                                  # Reusable UI components
│   │   ├── ChartCard.tsx                    # ✅ Already exists (reuse)
│   │   ├── InsightBox.tsx                   # New: Key insights display
│   │   └── SourceCitation.tsx               # New: Data source footer
│   │
│   └── sections/
│       ├── DataVisualizationSection.tsx     # NEW: Main section with all 4 graphs
│       └── LegacyStatisticsSection.tsx      # OLD: Renamed from current
│
├── data/
│   └── cpge-statistics-data.ts              # All graph data + metadata
│
└── lib/
    └── chart-config.ts                       # Chart.js global config & utilities
```

---

## Color Palette Constants

Create a shared color configuration file:

**File:** `src/lib/chart-colors.ts`

```typescript
export const CHART_COLORS = {
  // Primary palette
  primary: '#667eea',        // Purple-blue
  secondary: '#f093fb',      // Pink

  // Accents
  lightBlue: '#4facfe',      // For population data
  green: '#43e97b',          // For positive metrics
  coral: '#fa709a',          // For CPGE data
  yellow: '#fee140',         // For warnings/alerts

  // CSP-specific (Graph 2)
  cadres: '#667eea',         // Purple (primary)
  profInter: '#f093fb',      // Pink
  agricArtisans: '#00f2fe',  // Teal/cyan
  employes: '#fee140',       // Yellow
  ouvriers: '#43e97b',       // Green
  retraites: '#95a5a6',      // Gray

  // Gender-specific (Graph 3)
  women: '#f093fb',          // Bright pink
  men: '#667eea',            // Deep blue

  // BAC tracking (Graph 1b)
  bacGeneral: '#43e97b',     // Green
  bacTechno: '#fee140',      // Yellow
  bacPro: '#fa709a',         // Red/coral

  // UI elements
  text: '#2c3e50',           // Dark gray
  textSecondary: '#4A4A4A',  // Medium gray
  grid: '#ecf0f1',           // Light gray

  // Zones (Graph 2)
  overrepresentationZone: 'rgba(250, 112, 154, 0.1)',  // Light red tint
  underrepresentationZone: 'rgba(79, 172, 254, 0.1)',  // Light blue tint
} as const;

export const CHART_FONTS = {
  family: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
  size: {
    title: 24,
    subtitle: 18,
    body: 14,
    label: 13,
  },
} as const;
```

---

## Chart.js Global Configuration

**File:** `src/lib/chart-config.ts`

```typescript
import { Chart, ChartOptions, TooltipItem } from 'chart.js';
import { CHART_COLORS, CHART_FONTS } from './chart-colors';

// Register Chart.js components globally
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin,
  ChartDataLabels
);

// Default global options
export const defaultChartOptions: Partial<ChartOptions> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: {
          family: CHART_FONTS.family,
          size: CHART_FONTS.size.body,
        },
        color: CHART_COLORS.text,
        padding: 15,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: CHART_COLORS.text,
      bodyColor: CHART_COLORS.textSecondary,
      borderColor: CHART_COLORS.grid,
      borderWidth: 2,
      padding: 12,
      boxPadding: 6,
      titleFont: {
        family: CHART_FONTS.family,
        size: CHART_FONTS.size.body,
        weight: 'bold',
      },
      bodyFont: {
        family: CHART_FONTS.family,
        size: CHART_FONTS.size.body,
      },
    },
    datalabels: {
      display: false, // Enable per chart as needed
    },
  },
  animation: {
    duration: 1200,
    easing: 'easeInOutQuart',
  },
};

// Utility: Format percentage
export const formatPercent = (value: number, decimals = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

// Utility: Format number with thousands separator
export const formatNumber = (value: number): string => {
  return value.toLocaleString('fr-FR');
};

// Utility: Calculate overrepresentation ratio
export const calculateRatio = (cpgePercent: number, populationPercent: number): number => {
  return Number((cpgePercent / populationPercent).toFixed(1));
};
```

---

## Component Patterns

### Pattern 1: ChartCard Wrapper (Already Exists)

Reuse the existing `ChartCard.tsx` component with these props:
- `title`: Chart title
- `subtitle`: Chart subtitle
- `source`: Data source citation
- `insight`: Key takeaway message
- `footnote`: Optional footnote (e.g., CPGE explanation)
- `children`: Chart component

### Pattern 2: InsightBox Component (New)

**File:** `src/components/ui/InsightBox.tsx`

```typescript
interface InsightBoxProps {
  insights: string[];
  variant?: 'primary' | 'accent' | 'warning';
}

export function InsightBox({ insights, variant = 'primary' }: InsightBoxProps) {
  const bgColors = {
    primary: 'bg-primary/5',
    accent: 'bg-accent/5',
    warning: 'bg-yellow-100',
  };

  return (
    <div className={`${bgColors[variant]} p-6 rounded-xl border-l-4 border-accent`}>
      <h4 className="font-bold text-foreground mb-3">📌 À retenir :</h4>
      <ul className="space-y-2">
        {insights.map((insight, index) => (
          <li key={index} className="text-sm text-text-secondary leading-relaxed">
            {insight}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Pattern 3: Chart Component Structure

```typescript
'use client';

import { Bar } from 'react-chartjs-2';
import { ChartCard } from '@/components/ui/ChartCard';
import { InsightBox } from '@/components/ui/InsightBox';
import { chartData, chartMetadata } from '@/data/cpge-statistics-data';
import { defaultChartOptions } from '@/lib/chart-config';

export function ExampleChart() {
  const data = {
    // Chart.js data structure
  };

  const options = {
    ...defaultChartOptions,
    // Specific chart options
  };

  return (
    <ChartCard
      title={chartMetadata.title}
      subtitle={chartMetadata.subtitle}
      source={chartMetadata.source}
    >
      <div className="h-[400px]">
        <Bar data={data} options={options} />
      </div>

      <InsightBox insights={chartMetadata.insights} />
    </ChartCard>
  );
}
```

---

## Data Structure

**File:** `src/data/cpge-statistics-data.ts`

```typescript
// Graph 1a: Geographic Distribution
export const geographicData = {
  categories: [
    'Île-de-France',
    'Autres capitales régionales',
    'Reste de la France',
  ],
  population: {
    values: [16.1, 13.5, 70.4],
    absolute: [10944094, 9172763, 47953143],
  },
  cpge: {
    values: [32.4, 28.4, 39.2],
    absolute: [28173, 24680, 34088],
  },
  metadata: {
    title: 'Concentration géographique des CPGE : la surreprésentation urbaine',
    subtitle: 'Comparaison entre répartition de la population et des étudiants en CPGE',
    source: 'Note Flash SIES n° 2025-03 (Février 2025) - MESR ; INSEE Recensement 2021',
    insights: [
      'Île-de-France représente 16% de la population mais accueille 32% des étudiants en CPGE',
      'Indice de surreprésentation : 2.0× pour l\'Île-de-France',
      'Le reste de la France : 70% de la population mais seulement 39% des étudiants CPGE',
    ],
  },
};

// Graph 1b: BAC Pro Barrier
export const bacProData = {
  funnelRates: [
    { type: 'BAC Général', rate: 10.1, color: '#43e97b' },
    { type: 'BAC Technologique', rate: 1.9, color: '#fee140' },
    { type: 'BAC Professionnel', rate: 0.1, color: '#fa709a' },
  ],
  absoluteNumbers: {
    bacGeneral: 39318,
    bacTechno: 2867,
    bacPro: 174,
    total: 43445,
  },
  metadata: {
    title: 'L\'impasse des BAC Pro : une orientation qui ferme les portes',
    subtitle: 'Taux d\'accès aux CPGE selon le type de baccalauréat (2023)',
    source: 'RERS 2024 (DEPP, SIES) - Tableau 7.22 ; Note Flash SIES n° 2025-03',
    insights: [
      'Un bachelier général a 100× plus de chances d\'accéder à une CPGE qu\'un bachelier professionnel',
      'Seulement 174 étudiants issus de BAC Pro ont intégré une CPGE en 2024',
      'Cette barrière invisible perpétue les inégalités sociales',
    ],
  },
};

// Graph 2: Social Reproduction (see individual graph spec)
// Graph 3: Gender Segregation (see individual graph spec)
```

---

## Chart-Specific Configurations

### Graph 1a: Grouped Horizontal Bars

```typescript
const options = {
  indexAxis: 'y' as const,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      max: 80,
      ticks: {
        callback: (value: number) => `${value}%`,
      },
      grid: {
        color: CHART_COLORS.grid,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};
```

### Graph 2: Multi-line with Annotations

```typescript
const options = {
  plugins: {
    annotation: {
      annotations: {
        cadresRef: {
          type: 'line',
          yMin: 17,
          yMax: 17,
          borderColor: CHART_COLORS.cadres,
          borderWidth: 2,
          borderDash: [5, 5],
          label: {
            content: 'Repr. nationale: 17%',
            enabled: true,
            position: 'end',
          },
        },
        // ... more reference lines
      },
    },
  },
};
```

### Graph 3: Stacked 100% Bars

```typescript
const options = {
  indexAxis: 'y' as const,
  plugins: {
    datalabels: {
      display: true,
      color: '#ffffff',
      font: { weight: 'bold', size: 14 },
      formatter: (value, context) => {
        const total = context.dataset.data.reduce((a, b) => a + b, 0);
        const percent = ((value / total) * 100).toFixed(1);
        return `${value.toLocaleString()} (${percent}%)`;
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      max: 100,
      ticks: {
        callback: (value) => `${value}%`,
      },
    },
    y: {
      stacked: true,
    },
  },
};
```

---

## Responsive Design Breakpoints

```typescript
// Tailwind breakpoints to use
const breakpoints = {
  mobile: '< 768px',
  tablet: '768px - 1024px',
  desktop: '> 1024px',
};

// Chart heights by breakpoint
const chartHeights = {
  mobile: 300,    // Compact on mobile
  tablet: 400,    // Medium on tablet
  desktop: 500,   // Full height on desktop
};

// Use Tailwind classes for responsive heights
<div className="h-[300px] md:h-[400px] lg:h-[500px]">
  <Bar data={data} options={options} />
</div>
```

---

## Accessibility Requirements

### Alt Text for Charts
```typescript
<div role="img" aria-label="Chart showing geographic inequality in CPGE access">
  <Bar data={data} options={options} />
</div>
```

### Keyboard Navigation
Ensure chart containers are focusable and provide keyboard controls where needed.

### Screen Reader Support
Provide a data table alternative below each chart:

```typescript
<details className="mt-4">
  <summary className="cursor-pointer text-sm text-text-secondary">
    📊 Voir les données sous forme de tableau
  </summary>
  <table className="mt-2 w-full text-sm">
    {/* Table with chart data */}
  </table>
</details>
```

---

## Testing Checklist

- [ ] All charts render correctly on desktop (>1024px)
- [ ] All charts render correctly on tablet (768-1024px)
- [ ] All charts render correctly on mobile (<768px)
- [ ] Tooltips work on hover (desktop) and touch (mobile)
- [ ] Animations are smooth (1-1.5s entrance)
- [ ] Colors meet WCAG AA contrast requirements
- [ ] Alt text is descriptive and accurate
- [ ] Data sources are clearly cited
- [ ] Insight boxes are readable and informative
- [ ] Legend toggles work (click to hide/show data series)
- [ ] Charts export to PNG/SVG (if export feature added)

---

## Next Steps for Implementation

1. Install Chart.js plugins
2. Rename existing `DataVisualizationSection` to `LegacyStatisticsSection`
3. Create `src/lib/chart-colors.ts` and `src/lib/chart-config.ts`
4. Create `src/data/cpge-statistics-data.ts` with all data
5. Implement Graph 1a (simplest)
6. Implement Graph 3 (stacked bars)
7. Implement Graph 1b (funnel, more complex)
8. Implement Graph 2 (most complex, annotations)
9. Create new `DataVisualizationSection` combining all 4 graphs
10. Test and refine

---

**Ready to implement?** Start with Graph 1a specification: [graph-1a-geographic-inequality.md](./graph-1a-geographic-inequality.md)
