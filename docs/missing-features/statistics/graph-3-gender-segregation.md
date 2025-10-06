# 📊 Graph 3: Gender Segregation by Academic Field

**Chart Type:** 100% Stacked Horizontal Bar Chart
**Complexity:** ⭐⭐⭐ (Moderate)
**Implementation Priority:** #2 (After Graph 1a, before funnel)

---

## Objective

Show **gender imbalance across CPGE fields**, highlighting the concentration of women in literary fields and men in scientific fields.

**Key Message:** "Les stéréotypes de genre orientent les parcours dès le lycée, limitant l'accès des femmes aux filières scientifiques"

---

## Data

### CPGE by Field and Gender (2024-2025)

| Filière       | Femmes (n) | Femmes (%) | Hommes (n) | Hommes (%) | Total  |
|---------------|------------|------------|------------|------------|--------|
| Scientifique  | 16,242     | 30.1%      | 37,779     | 69.9%      | 54,021 |
| Économique    | 9,534      | 48.0%      | 10,329     | 52.0%      | 19,863 |
| Littéraire    | 9,175      | 70.3%      | 3,882      | 29.7%      | 13,057 |
| **Total CPGE**| **34,951** | **40.2%**  | **51,990** | **59.8%**  | **86,941** |

### TypeScript Data Structure

```typescript
export const genderSegregationData = {
  fields: ['Scientifique', 'Économique', 'Littéraire', 'Total CPGE'],
  women: {
    absolute: [16242, 9534, 9175, 34951],
    percentages: [30.1, 48.0, 70.3, 40.2],
  },
  men: {
    absolute: [37779, 10329, 3882, 51990],
    percentages: [69.9, 52.0, 29.7, 59.8],
  },
  totals: [54021, 19863, 13057, 86941],
};
```

---

## Visual Design

### Stacked Bars Configuration

#### Bar Structure
- **Y-axis:** 4 bars (Scientifique, Économique, Littéraire, Total CPGE)
- **X-axis:** Percentage scale 0-100%
- **Orientation:** Horizontal (easier reading)
- **Bar height:** Thick (50px), prominent

#### Colors
- **Femmes:** `#f093fb` (bright pink/magenta)
- **Hommes:** `#667eea` (deep blue)

#### Spacing
- **Category gap:** 0.3 (moderate spacing between bars)
- **Bar thickness:** 50-60px

---

## Annotations

### Title
**"Ségrégation genrée : des filières fortement clivées"**

### Subtitle
"Répartition femmes-hommes par filière CPGE (2024-2025)"

### Y-axis Labels
Field names (large, readable font - 16px)

### Legend
- **Position:** Top-center, horizontal
- **Items:** "Femmes" (pink square) | "Hommes" (blue square)

### Tooltip
Display format:
```
Filière: Scientifique
Femmes: 16,242 (30.1%)
Hommes: 37,779 (69.9%)
Total: 54,021
Écart: 39.8 points en faveur des hommes
```

### Labels Inside Bars (chartjs-plugin-datalabels)
- **Text:** "N étudiants (X%)"
- **Example:** "16,242 (30%)" in women's section | "37,779 (70%)" in men's section
- **Font:** White, bold, 14px
- **Positioning:** Center of each segment
- **If segment < 10% wide:** Place label outside with arrow

### Divider Line (Visual Aid)
- **Vertical dashed line at 50%** (parity marker)
- **Label:** "Parité"
- **Color:** Gray `#95a5a6`
- **Helps:** Readers quickly see which fields deviate from 50/50

---

## Callout Annotations

Using `chartjs-plugin-annotation`:

1. **Arrow to Scientifique bar (men's section):**
   - "**Filière scientifique : près de 70% d'hommes**"

2. **Arrow to Littéraire bar (women's section):**
   - "**Filière littéraire : 70% de femmes**"

3. **Text box near Économique:**
   - "**Quasi-parité** en économique (48-52%)"

---

## Key Insight Box

```typescript
insights: [
  'La ségrégation genrée persiste dans les CPGE :',
  '  • Scientifique: seulement 30% de femmes (16,242 étudiantes)',
  '  • Littéraire: 70% de femmes, mais c\'est la plus petite filière (13,057 étudiants total)',
  '  • Les stéréotypes de genre orientent dès le lycée',
  'Impact : Les femmes accèdent moins aux filières scientifiques qui mènent aux écoles d\'ingénieurs les plus prestigieuses',
]
```

---

## Source Citation

"Source : Note Flash SIES n° 2025-03 (Février 2025) - Effectifs et évolution des étudiants en CPGE par filière et par sexe"

**Link:** https://www.enseignementsup-recherche.gouv.fr/fr/les-effectifs-en-classes-preparatoires-aux-grandes-ecoles-la-rentree-2024-2025-98530

---

## Chart.js Configuration

```typescript
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const data = {
  labels: ['Scientifique', 'Économique', 'Littéraire', 'Total CPGE'],
  datasets: [
    {
      label: 'Femmes',
      data: [30.1, 48.0, 70.3, 40.2],
      backgroundColor: '#f093fb',
      borderColor: '#f093fb',
      borderWidth: 2,
      // Store absolute numbers for tooltip
      absoluteData: [16242, 9534, 9175, 34951],
    },
    {
      label: 'Hommes',
      data: [69.9, 52.0, 29.7, 59.8],
      backgroundColor: '#667eea',
      borderColor: '#667eea',
      borderWidth: 2,
      absoluteData: [37779, 10329, 3882, 51990],
    },
  ],
};

const options = {
  indexAxis: 'y' as const,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      align: 'center' as const,
      labels: {
        font: { size: 14, weight: 'bold' },
        boxWidth: 20,
        padding: 15,
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const percent = context.parsed.x;
          const absolute = context.dataset.absoluteData[context.dataIndex];
          return `${context.dataset.label}: ${absolute.toLocaleString('fr-FR')} (${percent.toFixed(1)}%)`;
        },
        afterBody: (tooltipItems) => {
          const women = tooltipItems[0].dataset.data[tooltipItems[0].dataIndex];
          const men = tooltipItems[1]?.dataset.data[tooltipItems[0].dataIndex] || (100 - women);
          const gap = Math.abs(women - men).toFixed(1);
          const direction = women > men ? 'femmes' : 'hommes';
          return [``, `Écart: ${gap} points en faveur des ${direction}`];
        },
      },
    },
    datalabels: {
      display: true,
      color: '#ffffff',
      font: { size: 14, weight: 'bold' },
      formatter: (value, context) => {
        const absolute = context.dataset.absoluteData[context.dataIndex];
        const percent = value.toFixed(1);
        // Only show label if segment is wide enough (>10%)
        return value > 10 ? `${absolute.toLocaleString('fr-FR')} (${percent}%)` : '';
      },
      anchor: 'center',
      align: 'center',
    },
    annotation: {
      annotations: {
        // Parity line at 50%
        parityLine: {
          type: 'line',
          xMin: 50,
          xMax: 50,
          borderColor: '#95a5a6',
          borderWidth: 2,
          borderDash: [5, 5],
          label: {
            content: 'Parité (50%)',
            enabled: true,
            position: 'start',
            yAdjust: -10,
            font: { size: 12 },
            color: '#95a5a6',
          },
        },
        // Callout: Scientific field
        scienceCallout: {
          type: 'label',
          xValue: 80,
          yValue: 0,
          content: ['Près de 70%', 'd\'hommes'],
          backgroundColor: 'rgba(102, 126, 234, 0.9)',
          color: 'white',
          font: { size: 11, weight: 'bold' },
          padding: 6,
        },
        // Callout: Literary field
        litteraireCallout: {
          type: 'label',
          xValue: 80,
          yValue: 2,
          content: ['70% de', 'femmes'],
          backgroundColor: 'rgba(240, 147, 251, 0.9)',
          color: 'white',
          font: { size: 11, weight: 'bold' },
          padding: 6,
        },
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      min: 0,
      max: 100,
      ticks: {
        callback: (value) => `${value}%`,
        stepSize: 10,
        font: { size: 13 },
      },
      grid: {
        color: '#ecf0f1',
      },
    },
    y: {
      stacked: true,
      ticks: {
        font: { size: 16, weight: 'bold' },
      },
      grid: {
        display: false,
      },
    },
  },
};
```

---

## Component Implementation

**File:** `src/components/charts/GenderSegregationChart.tsx`

```typescript
'use client';

import { Bar } from 'react-chartjs-2';
import { ChartCard } from '@/components/ui/ChartCard';
import { InsightBox } from '@/components/ui/InsightBox';
import { genderSegregationData } from '@/data/cpge-statistics-data';

export function GenderSegregationChart() {
  const data = {
    // ... as above
  };

  const options = {
    // ... as above
  };

  return (
    <ChartCard
      title="Ségrégation genrée : des filières fortement clivées"
      subtitle="Répartition femmes-hommes par filière CPGE (2024-2025)"
      source="Note Flash SIES n° 2025-03 (Février 2025)"
    >
      <div className="h-[350px] md:h-[400px]">
        <Bar data={data} options={options} />
      </div>

      <InsightBox
        insights={[
          'Scientifique: seulement 30% de femmes (16,242 étudiantes)',
          'Littéraire: 70% de femmes, mais c\'est la plus petite filière',
          'Impact : Les femmes accèdent moins aux filières scientifiques menant aux écoles d\'ingénieurs',
        ]}
        variant="accent"
      />
    </ChartCard>
  );
}
```

---

## Responsive Behavior

### Desktop
- All 4 bars visible with full labels inside
- Parity line and callouts positioned
- Legend horizontal at top

### Tablet
- Maintain all bars
- Slightly reduce label font size
- Keep parity line

### Mobile
- Stack legend vertically
- Reduce bar height slightly
- Labels outside if segments too narrow
- Ensure touch tooltips work

---

## Testing Checklist

- [ ] All 4 bars render correctly (Scientifique, Économique, Littéraire, Total)
- [ ] Stacked to 100% correctly
- [ ] Colors: Pink for women, Blue for men
- [ ] Data labels show inside bars (when > 10%)
- [ ] Parity line at 50% is visible
- [ ] Callout annotations position correctly
- [ ] Tooltip shows absolute numbers + percentages + gap
- [ ] Insight box emphasizes scientific field underrepresentation
- [ ] Responsive on all screen sizes
- [ ] Alt text describes gender segregation pattern

---

**Previous:** [Graph 1a: Geographic Inequality](./graph-1a-geographic-inequality.md)
**Next:** [Graph 1b: BAC Pro Barrier](./graph-1b-bac-pro-barrier.md) or [Graph 2: Social Reproduction](./graph-2-social-reproduction.md)
