# 📊 Graph 1a: Geographic Inequality - Urban Concentration

**Chart Type:** Grouped Horizontal Bar Chart
**Complexity:** ⭐⭐ (Simple)
**Implementation Priority:** #1 (Start here)

---

## Objective

Show that CPGE students are **disproportionately concentrated in Île-de-France and major cities** compared to population distribution.

**Key Message:** "Vivre loin des grandes villes réduit drastiquement les chances d'accéder à une CPGE"

---

## Data

### Categories (Y-axis, 3 bars)
1. **Île-de-France**
2. **Autres capitales régionales**
3. **Reste de la France**

### Metrics (X-axis, 2 values per category)

#### Population (% of total) - Blue bars
- **Île-de-France:** 10,944,094 / 68,070,000 = **16.1%**
- **Autres capitales:** 9,172,763 / 68,070,000 = **13.5%**
- **Reste de France:** 47,953,143 / 68,070,000 = **70.4%**

#### CPGE students (% of total) - Orange bars
- **Île-de-France:** 28,173 / 86,941 = **32.4%**
- **Autres capitales:** 24,680 / 86,941 = **28.4%**
- **Reste de France:** 34,088 / 86,941 = **39.2%**

### TypeScript Data Structure

```typescript
export const geographicData = {
  categories: [
    'Île-de-France',
    'Autres capitales régionales',
    'Reste de la France',
  ],
  population: {
    values: [16.1, 13.5, 70.4],
    absolute: [10944094, 9172763, 47953143],
    total: 68070000,
  },
  cpge: {
    values: [32.4, 28.4, 39.2],
    absolute: [28173, 24680, 34088],
    total: 86941,
  },
};
```

---

## Visual Design

### Layout
- **Orientation:** Horizontal bars (easier label reading)
- **Bar arrangement:** Grouped (side-by-side)
- **Bar width:** 40px (medium thickness)
- **Category spacing:** 0.8 (tight grouping)
- **Grid lines:** Vertical lines at 10%, 20%, 30%, etc.

### Color Scheme
- **Population bars:** `#4facfe` (cool blue)
- **CPGE bars:** `#fa709a` (warm orange/coral)
- **Grid lines:** `#ecf0f1` (light gray)
- **Text:** `#2c3e50` (dark gray)

### Dimensions
- **Desktop height:** 400px
- **Tablet height:** 350px
- **Mobile height:** 300px

---

## Annotations & Labels

### Title
**"Concentration géographique des CPGE : la surreprésentation urbaine"**

### Subtitle
"Comparaison entre répartition de la population et des étudiants en CPGE"

### Axis Labels
- **X-axis:** "Pourcentage du total (%)"
- **Y-axis:** Category names (large, readable font)

### Legend
- **Position:** Top-right
- **Items:**
  - "Population française" (blue square)
  - "Étudiants en CPGE" (orange square)

### Tooltip (on hover)
Display format:
```
[Région]
Population: X% (N habitants)
CPGE: Y% (N étudiants)
Ratio: ×Z
```

**Example:**
```
Île-de-France
Population: 16.1% (10,944,094 habitants)
CPGE: 32.4% (28,173 étudiants)
Ratio: ×2.0
```

---

## Key Insight Box

Display **below the chart** using `InsightBox` component:

### Insights
1. "Île-de-France représente **16% de la population** mais accueille **32% des étudiants en CPGE**"
2. "Indice de surreprésentation : **2.0×** pour l'Île-de-France"
3. "Le reste de la France : **70% de la population** mais seulement **39% des étudiants CPGE**"

### Calculation
```typescript
// Overrepresentation ratio
const idFRatio = (32.4 / 16.1).toFixed(1); // = 2.0
const resteFranceRatio = (39.2 / 70.4).toFixed(1); // = 0.6 (underrepresented)
```

---

## Source Citation

"Sources : Note Flash SIES n° 2025-03 (Février 2025) - MESR ; INSEE Recensement de la population 2021"

**Links:**
- [Note Flash SIES 2025-03](https://www.enseignementsup-recherche.gouv.fr/fr/les-effectifs-en-classes-preparatoires-aux-grandes-ecoles-la-rentree-2024-2025-98530)
- INSEE Recensement 2021 (regional population data)

---

## Chart.js Configuration

### Basic Structure

```typescript
import { Bar } from 'react-chartjs-2';
import { CHART_COLORS } from '@/lib/chart-colors';

const data = {
  labels: ['Île-de-France', 'Autres capitales régionales', 'Reste de la France'],
  datasets: [
    {
      label: 'Population française',
      data: [16.1, 13.5, 70.4],
      backgroundColor: CHART_COLORS.lightBlue,
      borderColor: CHART_COLORS.lightBlue,
      borderWidth: 2,
      borderRadius: 6,
    },
    {
      label: 'Étudiants en CPGE',
      data: [32.4, 28.4, 39.2],
      backgroundColor: CHART_COLORS.coral,
      borderColor: CHART_COLORS.coral,
      borderWidth: 2,
      borderRadius: 6,
    },
  ],
};

const options = {
  indexAxis: 'y' as const, // Horizontal bars
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      align: 'end' as const,
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const value = context.parsed.x;
          const absolute = context.datasetIndex === 0
            ? geographicData.population.absolute[context.dataIndex]
            : geographicData.cpge.absolute[context.dataIndex];
          return `${context.dataset.label}: ${value}% (${absolute.toLocaleString('fr-FR')})`;
        },
        afterBody: (tooltipItems) => {
          const index = tooltipItems[0].dataIndex;
          const popPercent = geographicData.population.values[index];
          const cpgePercent = geographicData.cpge.values[index];
          const ratio = (cpgePercent / popPercent).toFixed(1);
          return [``, `Ratio: ×${ratio}`];
        },
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      max: 80,
      ticks: {
        callback: (value) => `${value}%`,
        font: { size: 13 },
      },
      grid: {
        color: CHART_COLORS.grid,
      },
      title: {
        display: true,
        text: 'Pourcentage du total (%)',
        font: { size: 14, weight: 'bold' },
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        font: { size: 14 },
      },
    },
  },
};
```

---

## Component Implementation

**File:** `src/components/charts/GeographicInequalityChart.tsx`

```typescript
'use client';

import { Bar } from 'react-chartjs-2';
import { ChartCard } from '@/components/ui/ChartCard';
import { InsightBox } from '@/components/ui/InsightBox';
import { geographicData } from '@/data/cpge-statistics-data';
import { CHART_COLORS } from '@/lib/chart-colors';

export function GeographicInequalityChart() {
  const data = {
    // ... as above
  };

  const options = {
    // ... as above
  };

  return (
    <ChartCard
      title="Concentration géographique des CPGE : la surreprésentation urbaine"
      subtitle="Comparaison entre répartition de la population et des étudiants en CPGE"
      source="Note Flash SIES n° 2025-03 (Février 2025) - MESR ; INSEE Recensement 2021"
    >
      <div className="h-[300px] md:h-[400px]">
        <Bar data={data} options={options} />
      </div>

      <InsightBox
        insights={[
          'Île-de-France représente 16% de la population mais accueille 32% des étudiants en CPGE',
          'Indice de surreprésentation : 2.0× pour l\'Île-de-France',
          'Le reste de la France : 70% de la population mais seulement 39% des étudiants CPGE',
        ]}
        variant="primary"
      />
    </ChartCard>
  );
}
```

---

## Responsive Behavior

### Desktop (>1024px)
- Full width chart (max 1000px)
- All labels visible
- Tooltips on hover

### Tablet (768-1024px)
- Slightly reduced height (350px)
- Maintain all annotations
- Touch-enabled tooltips

### Mobile (<768px)
- Compact height (300px)
- Simplified legend (stacked, not horizontal)
- Insight box stacks below chart
- Touch tooltips with longer display time

---

## Accessibility

### Alt Text
```html
<div role="img" aria-label="Grouped bar chart showing geographic inequality in CPGE access. Île-de-France is overrepresented with 32% of CPGE students despite only 16% of population.">
```

### Data Table Alternative
Provide a `<details>` element with tabular data for screen readers:

```html
<details>
  <summary>Voir les données en tableau</summary>
  <table>
    <thead>
      <tr>
        <th>Région</th>
        <th>Population (%)</th>
        <th>CPGE (%)</th>
        <th>Ratio</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Île-de-France</td>
        <td>16.1%</td>
        <td>32.4%</td>
        <td>×2.0</td>
      </tr>
      <!-- ... -->
    </tbody>
  </table>
</details>
```

---

## Testing Checklist

- [ ] Chart renders correctly on desktop
- [ ] Chart renders correctly on mobile
- [ ] Tooltips show on hover (desktop) and touch (mobile)
- [ ] Legend toggles work (click to hide/show dataset)
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Insight box displays all 3 key points
- [ ] Source citation is clearly visible
- [ ] Animation is smooth (1.2s entrance)
- [ ] Alt text is descriptive
- [ ] Data table alternative is accessible

---

**Next:** Proceed to [Graph 3: Gender Segregation](./graph-3-gender-segregation.md) (similar complexity) or [Graph 1b: BAC Pro Barrier](./graph-1b-bac-pro-barrier.md) (more complex funnel)
