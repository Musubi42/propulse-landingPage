# 📊 CPGE Data Visualization - Technical Specification Document

## **Project Overview**

**Title:** Les inégalités d'accès aux CPGE : une triple fracture géographique, sociale et de parcours scolaire

**Purpose:** Create three data visualizations exposing barriers to CPGE access in France

**Target audience:** Propulse association website visitors, educators, policymakers

**Format:** Interactive web-based charts using Chart.js

---

## **Graph 1a: Geographic Inequality - Urban Concentration**

### **Objective**
Show that CPGE students are disproportionately concentrated in Île-de-France and major cities compared to population distribution.

### **Chart Type**
Grouped horizontal bar chart (side-by-side comparison)

### **Data**

**Categories (Y-axis, 3 bars):**
1. Île-de-France  
2. Autres capitales régionales
3. Reste de la France

**Metrics (X-axis, 2 values per category):**
- **Population (% of total):** Blue bars
  - Île-de-France: 10,944,094 / 68,070,000 = **16.1%**
  - Autres capitales: 9,172,763 / 68,070,000 = **13.5%**
  - Reste de France: 47,953,143 / 68,070,000 = **70.4%**

- **CPGE students (% of total):** Orange bars
  - Île-de-France: 28,173 / 86,941 = **32.4%**
  - Autres capitales: 24,680 / 86,941 = **28.4%**
  - Reste de France: 34,088 / 86,941 = **39.2%**

### **Visual Design**
- **Layout:** Horizontal bars for easy label reading
- **Color scheme:** 
  - Population: Cool blue (#4facfe)
  - CPGE: Warm orange (#fa709a)
- **Bar width:** Medium thickness, grouped tightly
- **Grid lines:** Vertical grid lines at 10%, 20%, 30%, etc.

### **Annotations & Labels**
- **Title:** "Concentration géographique des CPGE : la surreprésentation urbaine"
- **Subtitle:** "Comparaison entre répartition de la population et des étudiants en CPGE"
- **X-axis label:** "Pourcentage du total (%)"
- **Y-axis:** Category names (clean, readable font)
- **Legend:** Top-right position, showing "Population française" and "Étudiants en CPGE"
- **Tooltip:** On hover, show: "Région | Population: X% (N habitants) | CPGE: Y% (N étudiants)"

### **Key Insight Box** (below chart)
Display calculated metrics:
- "Île-de-France représente **16% de la population** mais accueille **32% des étudiants en CPGE**"
- "Indice de surreprésentation : **2.0x** pour l'Île-de-France"
- "Le reste de la France : **70% de la population** mais seulement **39% des étudiants CPGE**"

### **Source Citation**
"Sources : Note Flash SIES n° 2025-03 (Février 2025) - MESR ; INSEE Recensement de la population 2021"

---

## **Graph 1b: Academic Tracking - The BAC Pro Barrier**

### **Objective**  
Expose the extreme difficulty for BAC professionnel graduates to access CPGE compared to BAC général.

### **Chart Type**
Dual visualization:
1. **Funnel chart** showing enrollment rates
2. **Small inset bar chart** showing absolute numbers

### **Data**

**Funnel Chart (main) - Enrollment rates:**
- BAC Général → CPGE: **10.1%**
- BAC Technologique → CPGE: **1.9%**
- BAC Professionnel → CPGE: **0.1%**

**Absolute numbers (2024):**
- BAC Général: 39,318 new entrants (90.5%)
- BAC Techno: 2,867 new entrants (6.6%)
- BAC Pro: 174 new entrants (0.4%)
- **Total:** 43,445 new entrants

### **Visual Design**

**Funnel Chart:**
- **Width proportional to percentage:** Widest at top (10.1%), narrowest at bottom (0.1%)
- **Color gradient:** From green (BAC Général) → yellow (BAC Techno) → red (BAC Pro)
- **Vertical alignment:** Top to bottom
- **Labels inside each funnel section:**
  - "BAC Général: 10.1% accèdent à la CPGE"
  - "BAC Technologique: 1.9%"  
  - "BAC Professionnel: 0.1%"

**Inset Bar Chart (small, bottom-right):**
- Title: "Effectifs réels en 2024"
- 3 horizontal bars showing absolute numbers
- Same color coding as funnel

### **Annotations**
- **Main title:** "L'impasse des BAC Pro : une orientation qui ferme les portes"
- **Subtitle:** "Taux d'accès aux CPGE selon le type de baccalauréat (2023)"
- **Callout text** (arrow pointing to BAC Pro section):
  - "**Seulement 174 étudiants** issus de BAC Pro ont intégré une CPGE en 2024"
  - "**100 fois moins de chances** qu'un bachelier général"

### **Key Insight Box**
- "Un bachelier général a **100x plus de chances** d'accéder à une CPGE qu'un bachelier professionnel"
- "Cette barrière invisible perpétue les inégalités sociales : les BAC Pro sont majoritairement issus de milieux populaires"

### **Source Citation**
"Sources : RERS 2024 (DEPP, SIES) - Tableau 7.22 ; Note Flash SIES n° 2025-03 (Février 2025)"

---

## **Graph 2: Social Reproduction - CSP Overrepresentation**

### **Objective**
Show persistent overrepresentation of children from upper socioprofessional categories in CPGE over 15 years, with comparison to national population.

### **Chart Type**
Multi-line chart with horizontal reference lines

### **Data**

**Time series (2007-2022) - CPGE composition:**
| Year | Cadres | Prof. Inter. | Agri./Artisans | Employés | Ouvriers | Retraités |
|------|--------|--------------|----------------|----------|----------|-----------|
| 2007 | 52.7 | 14.0 | 10.3 | 10.0 | 5.6 | 7.5 |
| 2012 | 52.7 | 12.9 | 11.1 | 10.0 | 6.6 | 6.7 |
| 2017 | 51.4 | 12.3 | 11.3 | 10.8 | 7.3 | 6.9 |
| 2022 | 52.8 | 12.3 | 10.4 | 10.9 | 6.8 | 6.7 |

**National CSP distribution (reference lines):**
- Cadres et professions intellectuelles: **17%**
- Employés: **24%**
- Ouvriers: **18%**
- *(User will provide link for exact source)*

### **Visual Design**

**Line Chart:**
- **X-axis:** Years (2007-2022), intervals every 2-3 years
- **Y-axis:** Percentage (0-55%), grid lines every 10%
- **Lines:**
  - Cadres: Thick line, vibrant purple (#667eea)
  - Professions intermédiaires: Medium line, pink (#f093fb)
  - Agriculteurs/Artisans: Thin line, teal (#00f2fe)
  - Employés: Medium line, yellow (#fee140)
  - Ouvriers: Thick line, green (#43e97b)
  - Retraités: Thin dashed line, gray (#95a5a6)

**Reference Lines (horizontal, dashed):**
- Cadres national: 17% - thin dashed purple line
- Employés national: 24% - thin dashed yellow line  
- Ouvriers national: 18% - thin dashed green line
- **Label on right side:** "Repr. nationale" with percentage

**Shaded regions:**
- **Overrepresentation zone** (above reference lines): Light red tint with transparency
- **Underrepresentation zone** (below reference lines): Light blue tint

### **Annotations**
- **Title:** "La reproduction sociale : 15 ans d'inégalité stable"
- **Subtitle:** "Origine socioprofessionnelle des étudiants en CPGE (2007-2022) comparée à la population française"
- **Legend:** Right side, listing all CSP categories + "Représentation nationale (réf.)"
- **Tooltip:** On hover show: "Année | CSP: X% en CPGE vs Y% population | Écart: +/- Z points"

**Callout annotations (arrows/boxes on chart):**
1. Arrow to Cadres line (top): "**Surreprésentation massive** : 52.8% en CPGE vs 17% population = **×3.1**"
2. Arrow to Ouvriers line (bottom): "**Sous-représentation** : 6.8% en CPGE vs 18% population = **×0.4**"
3. Text box (center): "**L'écart ne se réduit pas** : quasi-stabilité sur 15 ans"

### **Key Insight Box**
Display overrepresentation ratios:
- "**Indice de surreprésentation** (2022):"
  - Cadres: **3.1x** (52.8% vs 17%)
  - Professions intermédiaires: **Proche de la parité** (12.3% vs ~13%)
  - Employés: **2.3x sous-représentés** (10.9% vs 24%)
  - Ouvriers: **2.6x sous-représentés** (6.8% vs 18%)

### **Source Citation**
"Sources : RERS 2024, Tableau 07_ETU/11_CPGE/01 (DEPP, SIES) ; INSEE Recensement de la population 2021 (CSP 25-54 ans)"
*[User to provide exact INSEE link]*

---

## **Graph 3: Gender Segregation by Academic Field**

### **Objective**
Show gender imbalance across CPGE fields, highlighting the concentration of women in literary fields and men in scientific fields.

### **Chart Type**
100% stacked horizontal bar chart

### **Data**

**CPGE by field and gender (2024-2025):**

| Filière | Femmes (n) | Femmes (%) | Hommes (n) | Hommes (%) | Total |
|---------|------------|------------|------------|------------|--------|
| Scientifique | 16,242 | 30.1% | 37,779 | 69.9% | 54,021 |
| Économique | 9,534 | 48.0% | 10,329 | 52.0% | 19,863 |
| Littéraire | 9,175 | 70.3% | 3,882 | 29.7% | 13,057 |
| **Total CPGE** | **34,951** | **40.2%** | **51,990** | **59.8%** | **86,941** |

### **Visual Design**

**Stacked Bars:**
- **Y-axis:** 4 bars (Scientifique, Économique, Littéraire, Total CPGE)
- **X-axis:** Percentage scale 0-100%
- **Colors:**
  - Femmes: Bright pink/magenta (#f093fb)
  - Hommes: Deep blue (#667eea)
- **Bar height:** Thick, prominent bars
- **Spacing:** Moderate gap between bars

**Labels on bars:**
- Inside each segment: "N étudiants (X%)"
  - Example for Scientifique: "16,242 (30%)" in women's section | "37,779 (70%)" in men's section
- Use white text, bold font
- If segment too narrow (<10%), place label outside with arrow

### **Annotations**
- **Title:** "Ségrégation genrée : des filières fortement clivées"
- **Subtitle:** "Répartition femmes-hommes par filière CPGE (2024-2025)"
- **Y-axis labels:** Field names (large, readable)
- **Legend:** Top-center, horizontal: "Femmes" (pink) | "Hommes" (blue)
- **Tooltip:** On hover: "Filière | Femmes: X (Y%) | Hommes: A (B%) | Total: Z"

**Callout annotations:**
1. Arrow to Scientifique bar (men's section): "**Filière scientifique : près de 70% d'hommes**"
2. Arrow to Littéraire bar (women's section): "**Filière littéraire : 70% de femmes**"
3. Text box below Économique: "**Quasi-parité** en économique (48-52%)"

### **Divider line** (visual aid):
- Vertical dashed line at 50% mark
- Label: "Parité"
- Helps readers quickly see which fields deviate from 50/50

### **Key Insight Box**
- "La **ségrégation genrée** persiste dans les CPGE :"
  - "Scientifique: seulement **30% de femmes** (16,242 étudiantes)"
  - "Littéraire: **70% de femmes**, mais c'est la plus petite filière (13,057 étudiants total)"
  - "Les stéréotypes de genre orientent dès le lycée"
- "**Impact :** Les femmes accèdent moins aux filières scientifiques qui mènent aux écoles d'ingénieurs les plus prestigieuses"

### **Source Citation**
"Source : Note Flash SIES n° 2025-03 (Février 2025) - Effectifs et évolution des étudiants en CPGE par filière et par sexe"

---

## **Overall Design Guidelines**

### **Typography**
- **Headings:** Bold, sans-serif (e.g., Segoe UI, Inter), 24-28px
- **Subtitles:** Regular, 16-18px
- **Body text:** 14-16px
- **Data labels:** 13-14px, bold for numbers

### **Color Palette** (consistent across all graphs)
- **Primary:** #667eea (purple-blue)
- **Secondary:** #f093fb (pink)
- **Accent 1:** #4facfe (light blue)
- **Accent 2:** #43e97b (green)
- **Accent 3:** #fa709a (coral)
- **Warning/Alert:** #fee140 (yellow)
- **Text:** #2c3e50 (dark gray)
- **Grid/Dividers:** #ecf0f1 (light gray)

### **Responsive Behavior**
- **Desktop (>1024px):** Full width, all annotations visible
- **Tablet (768-1024px):** Slightly compressed, maintain readability
- **Mobile (<768px):** 
  - Stack key insights below chart
  - Simplify annotations
  - Allow horizontal scroll if needed for clarity

### **Interactivity**
- **Hover effects:** Highlight data point, show detailed tooltip
- **Click on legend:** Toggle visibility of data series
- **Animation:** Smooth entrance animation (1-1.5s) when chart loads
- **Export button:** Allow download as PNG or SVG

### **Accessibility**
- **Alt text:** Descriptive text for each chart summarizing key findings
- **Color contrast:** WCAG AA compliant (4.5:1 minimum)
- **Keyboard navigation:** Accessible via tab key
- **Screen reader support:** Data table alternative available

---

## **Technical Implementation Notes**

### **Chart.js Configuration**

**For all charts:**
```
- Chart.js version: 3.9.1 or later
- Responsive: true
- MaintainAspectRatio: false (use fixed height)
- Font family: 'Segoe UI', 'Inter', or system sans-serif
- Default font size: 14px
- Animation duration: 1200ms, easing: 'easeInOutQuart'
```

**Graph 1a - Grouped Bar:**
- Type: 'bar'
- IndexAxis: 'y' (horizontal)
- Grouped: true
- BarThickness: 40px
- CategoryPercentage: 0.8

**Graph 1b - Funnel:**
- Consider using Chart.js plugin: chartjs-plugin-funnel
- Or custom implementation using stacked bar with calculated widths
- Inset chart: separate smaller Chart.js instance, positioned absolute

**Graph 2 - Line with Reference:**
- Type: 'line'
- Tension: 0.3 (smooth curves)
- PointRadius: 4px
- Reference lines: annotation plugin (chartjs-plugin-annotation)
- Shaded regions: backgroundColor with alpha transparency

**Graph 3 - Stacked Percentage Bar:**
- Type: 'bar'
- IndexAxis: 'y'
- Stacked: true
- Scales: { x: { stacked: true, max: 100 } }
- Display data labels inside bars: chartjs-plugin-datalabels

### **Data Sources to Include in Footer**

**Primary sources:**
1. Note Flash SIES n° 2025-03 (Février 2025) - Ministère de l'Enseignement Supérieur et de la Recherche
   - URL: https://www.enseignementsup-recherche.gouv.fr/fr/les-effectifs-en-classes-preparatoires-aux-grandes-ecoles-la-rentree-2024-2025-98530

2. RERS 2024 - Repères et Références Statistiques (DEPP, SIES)
   - URL: https://rers.depp.education.fr/2024/

3. INSEE - Recensement de la population 2021
   - URL: [User to provide CSP distribution link]

4. INSEE - Données démographiques régionales
   - URL: [For population by region data]

---

## **Storytelling Flow & Page Layout**

### **Recommended Order:**
1. **Introduction text** (3-4 sentences) explaining Propulse's mission and why these inequalities matter
2. **Graph 1a** → Geographic inequality
3. **Graph 1b** → BAC Pro barrier  
4. **Transition text** (2-3 sentences) linking geographic/academic to social origins
5. **Graph 2** → Social reproduction
6. **Transition text** (2-3 sentences) on intersectionality of inequalities
7. **Graph 3** → Gender segregation
8. **Conclusion** → Propulse's solution and call-to-action

### **Key Messages to Emphasize:**

**Geographic:** "Vivre loin des grandes villes réduit drastiquement les chances d'accéder à une CPGE"

**Academic tracking:** "Le BAC professionnel ferme presque totalement la porte des CPGE, perpétuant les inégalités"

**Social:** "Les CPGE restent un espace de reproduction sociale : l'origine familiale détermine l'accès"

**Gender:** "Les stéréotypes de genre orientent les parcours dès le lycée, limitant l'accès des femmes aux filières scientifiques"

**Solution:** "Propulse agit pour briser ces trois murs invisibles en accompagnant gratuitement les lycéens éloignés des codes des Grandes Écoles"

---
