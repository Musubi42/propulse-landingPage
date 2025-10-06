# 📊 Graph 2: Social Reproduction - CSP Overrepresentation

**Chart Type:** Multi-line Chart with Reference Lines + Shaded Zones
**Complexity:** ⭐⭐⭐⭐⭐ (Most Complex)
**Implementation Priority:** #4 (Last - requires chartjs-plugin-annotation)

---

## Objective

Show **persistent overrepresentation** of children from upper socioprofessional categories (CSP) in CPGE over 15 years, with comparison to national population.

**Key Message:** "Les CPGE restent un espace de reproduction sociale : l'origine familiale détermine l'accès"

---

## Data

### Time Series (2007-2022) - CPGE Composition

| Year | Cadres | Prof. Inter. | Agri./Artisans | Employés | Ouvriers | Retraités |
|------|--------|--------------|----------------|----------|----------|-----------|
|2022  | 10,4  |	52,8         |	12,3          |	10,9     |	6,8     |	6,7       |
|2021  | 10,5  |	52,4         |	12,3          |	11,0     |	7,1     |	6,8       |
|2020  | 10,7  |	51,8         |	12,3          |	11,0     |	7,2     |	6,9       |
|2019  | 10,9  |	51,4         |	12,3          |	11,1     |	7,3     |	7,0       |
|2018  | 11,1  |	51,4         |	12,3          |	10,9     |	7,2     |	7,0       |
|2017  | 11,3  |	51,4         |	12,3          |	10,8     |	7,3     |	6,9       |
|2016  | 11,4  |	51,7         |	12,2          |	10,7     |	7,2     |	6,8       |
|2015  | 11,3  |	52,0         |	12,3          |	10,6     |	7,0     |	6,8       |
|2014  | 11,1  |	52,3         |	12,6          |	10,5     |	6,8     |	6,7       |
|2013  | 11,1  |	52,5         |	12,8          |	10,3     |	6,7     |	6,7       |
|2012  | 11,1  |	52,7         |	12,9          |	10,0     |	6,6     |	6,7       |
|2011  | 11,2  |	52,9         |	12,9          |	9,8      |	6,6     |	6,7       |
|2010  | 11,2  |	52,9         |	13,0          |	9,7      |	6,5     |	6,8       |
|2009  | 11,0  |	52,8         |	13,2          |	9,7      |	6,4     |	6,9       |
|2008  | 10,6  |	52,6         |	13,6          |	9,9      |	6,0     |	7,2       |
|2007  | 10,3  |	52,7         |	14,0          |	10,0     |	5,6     |	7,5       |

### National CSP Distribution (Reference Lines)
- **Cadres et professions intellectuelles:** **17%** *(population active 25-54 ans)*
- **Professions intermédiaires:** **~13%** *(estimate, user to provide exact)*
- **Employés:** **24%**
- **Ouvriers:** **18%**

**Note:** User to provide exact INSEE link for CSP distribution

### TypeScript Data Structure

```typescript
export const socialReproductionData = {
  years: [2007, 2012, 2017, 2022],
  cpgeComposition: {
    cadres: [52.7, 52.7, 51.4, 52.8],
    profInter: [14.0, 12.9, 12.3, 12.3],
    agricArtisans: [10.3, 11.1, 11.3, 10.4],
    employes: [10.0, 10.0, 10.8, 10.9],
    ouvriers: [5.6, 6.6, 7.3, 6.8],
    retraites: [7.5, 6.7, 6.9, 6.7],
  },
  nationalDistribution: {
    cadres: 17,
    profInter: 13, // User to confirm
    employes: 24,
    ouvriers: 18,
  },
};
```

---

## Visual Design

### Line Chart Configuration

#### Lines (CPGE Data)
1. **Cadres:** Thick line (3px), vibrant purple `#667eea`
2. **Professions intermédiaires:** Medium line (2px), pink `#f093fb`
3. **Agriculteurs/Artisans:** Thin line (2px), teal `#00f2fe`
4. **Employés:** Medium line (2px), yellow `#fee140`
5. **Ouvriers:** Thick line (3px), green `#43e97b`
6. **Retraités:** Thin dashed line (2px), gray `#95a5a6`

#### Reference Lines (Horizontal, Dashed)
- **Cadres national:** 17% - thin dashed purple line
- **Employés national:** 24% - thin dashed yellow line
- **Ouvriers national:** 18% - thin dashed green line
- **Label on right side:** "Repr. nationale" with percentage

#### Shaded Regions (Background)
- **Overrepresentation zone** (above reference lines): Light red tint `rgba(250, 112, 154, 0.1)`
- **Underrepresentation zone** (below reference lines): Light blue tint `rgba(79, 172, 254, 0.1)`

### Axes
- **X-axis:** Years (2007, 2012, 2017, 2022)
- **Y-axis:** Percentage (0-55%), grid lines every 10%

---

## Annotations

### Title
**"La reproduction sociale : 15 ans d'inégalité stable"**

### Subtitle
"Origine socioprofessionnelle des étudiants en CPGE (2007-2022) comparée à la population française"

### Legend
Position: Right side, vertical
- All CSP categories (6 lines)
- "Représentation nationale (réf.)" with dashed line example

### Tooltip
Display format:
```
Année: 2022
Cadres: 52.8% en CPGE vs 17% population
Écart: +35.8 points (surreprésentation)
```

### Callout Annotations (Using chartjs-plugin-annotation)

1. **Arrow to Cadres line (top):**
   - "**Surreprésentation massive** : 52.8% en CPGE vs 17% population = **×3.1**"

2. **Arrow to Ouvriers line (bottom):**
   - "**Sous-représentation** : 6.8% en CPGE vs 18% population = **×0.4**"

3. **Text box (center):**
   - "**L'écart ne se réduit pas** : quasi-stabilité sur 15 ans"

---

## Key Insight Box

```typescript
insights: [
  'Indice de surreprésentation (2022) :',
  '  • Cadres: 3.1× (52.8% vs 17%)',
  '  • Professions intermédiaires: Proche de la parité (12.3% vs ~13%)',
  '  • Employés: 2.3× sous-représentés (10.9% vs 24%)',
  '  • Ouvriers: 2.6× sous-représentés (6.8% vs 18%)',
  'L\'écart ne se réduit pas : stabilité quasi-totale sur 15 ans',
]
```

**Calculations:**
```typescript
const ratios2022 = {
  cadres: (52.8 / 17).toFixed(1),        // 3.1
  employes: (10.9 / 24).toFixed(1),      // 0.5 (inverse = 2.2× under)
  ouvriers: (6.8 / 18).toFixed(1),       // 0.4 (inverse = 2.6× under)
};
```

---

## Source Citation

"Sources : RERS 2024, Tableau 07_ETU/11_CPGE/01 (DEPP, SIES) ; INSEE Recensement de la population 2021 (CSP 25-54 ans)"

**Links:**
- RERS 2024: https://rers.depp.education.fr/2024/details/07_ETU/11_CPGE/01
- INSEE CSP: *(User to provide exact link)*

---

## Chart.js Configuration with Annotations

```typescript
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';

const data = {
  labels: [2007, 2012, 2017, 2022],
  datasets: [
    {
      label: 'Cadres',
      data: [52.7, 52.7, 51.4, 52.8],
      borderColor: '#667eea',
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
      borderWidth: 3,
      tension: 0.3,
      pointRadius: 5,
    },
    {
      label: 'Ouvriers',
      data: [5.6, 6.6, 7.3, 6.8],
      borderColor: '#43e97b',
      backgroundColor: 'rgba(67, 233, 123, 0.1)',
      borderWidth: 3,
      tension: 0.3,
      pointRadius: 5,
    },
    {
      label: 'Employés',
      data: [10.0, 10.0, 10.8, 10.9],
      borderColor: '#fee140',
      backgroundColor: 'rgba(254, 225, 64, 0.1)',
      borderWidth: 2,
      tension: 0.3,
      pointRadius: 4,
    },
    // ... other CSP categories
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    annotation: {
      annotations: {
        // Reference line: Cadres national (17%)
        cadresRef: {
          type: 'line',
          yMin: 17,
          yMax: 17,
          borderColor: '#667eea',
          borderWidth: 2,
          borderDash: [5, 5],
          label: {
            content: 'Repr. nationale: 17%',
            enabled: true,
            position: 'end',
            backgroundColor: 'rgba(102, 126, 234, 0.8)',
            color: 'white',
            font: { size: 11 },
          },
        },
        // Reference line: Employés national (24%)
        employesRef: {
          type: 'line',
          yMin: 24,
          yMax: 24,
          borderColor: '#fee140',
          borderWidth: 2,
          borderDash: [5, 5],
          label: {
            content: 'Repr. nationale: 24%',
            enabled: true,
            position: 'end',
          },
        },
        // Reference line: Ouvriers national (18%)
        ouvriersRef: {
          type: 'line',
          yMin: 18,
          yMax: 18,
          borderColor: '#43e97b',
          borderWidth: 2,
          borderDash: [5, 5],
          label: {
            content: 'Repr. nationale: 18%',
            enabled: true,
            position: 'end',
          },
        },
        // Callout annotation: Cadres overrepresentation
        cadresCallout: {
          type: 'label',
          xValue: 2022,
          yValue: 52.8,
          content: ['Surreprésentation massive', '×3.1'],
          backgroundColor: 'rgba(102, 126, 234, 0.9)',
          color: 'white',
          font: { size: 12, weight: 'bold' },
          padding: 8,
        },
        // Callout annotation: Stability text
        stabilityBox: {
          type: 'label',
          xValue: 2014,
          yValue: 30,
          content: ['L\'écart ne se réduit pas', 'Stabilité sur 15 ans'],
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          font: { size: 13 },
          padding: 10,
        },
      },
    },
    tooltip: {
      callbacks: {
        afterBody: (tooltipItems) => {
          const year = tooltipItems[0].label;
          const csp = tooltipItems[0].dataset.label;
          const cpgePercent = tooltipItems[0].parsed.y;
          const nationalPercent = getNationalPercent(csp); // Helper function
          const gap = (cpgePercent - nationalPercent).toFixed(1);
          return [``, `vs National: ${nationalPercent}%`, `Écart: ${gap > 0 ? '+' : ''}${gap} points`];
        },
      },
    },
  },
  scales: {
    x: {
      title: { display: true, text: 'Année', font: { size: 14 } },
    },
    y: {
      min: 0,
      max: 60,
      ticks: {
        callback: (value) => `${value}%`,
        stepSize: 10,
      },
      title: { display: true, text: 'Pourcentage (%)', font: { size: 14 } },
    },
  },
};
```

---

## Responsive Behavior

### Desktop
- Full chart with all annotations visible
- Legend on right side
- Shaded zones visible

### Mobile
- Compact legend (stacked)
- Simplified annotations (fewer callouts)
- Maintain reference lines (most important)

---

## Testing Checklist

- [ ] All 6 CSP lines render correctly
- [ ] Reference lines at 17%, 18%, 24% are visible and dashed
- [ ] Shaded zones show over/underrepresentation
- [ ] Callout annotations position correctly
- [ ] Tooltip shows gap calculation
- [ ] Legend lists all CSP + reference notation
- [ ] Insight box calculates ratios accurately
- [ ] Responsive on all screen sizes
- [ ] Alt text describes social reproduction trend

---

**Previous:** [Graph 1b: BAC Pro Barrier](./graph-1b-bac-pro-barrier.md)
**Next:** [Graph 3: Gender Segregation](./graph-3-gender-segregation.md)
