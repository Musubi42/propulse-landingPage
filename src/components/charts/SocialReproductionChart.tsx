'use client';

import { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { ChartCard } from '@/components/ui/ChartCard';
import { InsightBox } from '@/components/ui/InsightBox';
import { socialReproductionData } from '@/data/cpge-statistics-data';
import { CHART_COLORS } from '@/lib/chart-colors';
import { defaultChartOptions } from '@/lib/chart-config';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * Social Reproduction Chart
 * Desktop: Multi-line chart showing CSP overrepresentation evolution (2007-2022)
 * Mobile: Bar chart for 2022 only with interactive category toggle
 */
export function SocialReproductionChart() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Category visibility state for mobile (removed Retraités)
  const [visibleCategories, setVisibleCategories] = useState({
    cadres: true,
    ouvriers: true,
    employes: true,
    profInter: false,
    agricArtisans: false,
  });

  const toggleCategory = (key: keyof typeof visibleCategories) => {
    setVisibleCategories(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Categories configuration for mobile toggle (removed Retraités)
  const categories = [
    { key: 'cadres' as const, label: 'Cadres', color: CHART_COLORS.cadres },
    { key: 'ouvriers' as const, label: 'Ouvriers', color: CHART_COLORS.ouvriers },
    { key: 'employes' as const, label: 'Employés', color: CHART_COLORS.employes },
    { key: 'profInter' as const, label: 'Prof. inter.', color: CHART_COLORS.profInter },
    { key: 'agricArtisans' as const, label: 'Agric./Artis.', color: CHART_COLORS.agricArtisans },
  ];

  // Get 2022 data (last year) for mobile bar chart
  const get2022Value = (categoryKey: string) => {
    const dataMap: Record<string, number[]> = {
      cadres: socialReproductionData.cpgeComposition.cadres,
      ouvriers: socialReproductionData.cpgeComposition.ouvriers,
      employes: socialReproductionData.cpgeComposition.employes,
      profInter: socialReproductionData.cpgeComposition.profInter,
      agricArtisans: socialReproductionData.cpgeComposition.agricArtisans,
      retraites: socialReproductionData.cpgeComposition.retraites,
    };
    const data = dataMap[categoryKey];
    return data ? data[data.length - 1] : 0; // Last value = 2022
  };

  // Desktop: Line chart data (all years, filtered by visibility - removed Retraités)
  const allDesktopDatasets = [
    {
      key: 'cadres',
      label: 'Cadres',
      data: socialReproductionData.cpgeComposition.cadres,
      borderColor: CHART_COLORS.cadres,
      backgroundColor: `${CHART_COLORS.cadres}20`,
      borderWidth: 3,
      tension: 0.3,
      pointRadius: 5,
      pointHoverRadius: 7,
    },
    {
      key: 'ouvriers',
      label: 'Ouvriers',
      data: socialReproductionData.cpgeComposition.ouvriers,
      borderColor: CHART_COLORS.ouvriers,
      backgroundColor: `${CHART_COLORS.ouvriers}20`,
      borderWidth: 3,
      tension: 0.3,
      pointRadius: 5,
      pointHoverRadius: 7,
    },
    {
      key: 'employes',
      label: 'Employés',
      data: socialReproductionData.cpgeComposition.employes,
      borderColor: CHART_COLORS.employes,
      backgroundColor: `${CHART_COLORS.employes}20`,
      borderWidth: 2,
      tension: 0.3,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
    {
      key: 'profInter',
      label: 'Professions intermédiaires',
      data: socialReproductionData.cpgeComposition.profInter,
      borderColor: CHART_COLORS.profInter,
      backgroundColor: `${CHART_COLORS.profInter}20`,
      borderWidth: 2,
      tension: 0.3,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
    {
      key: 'agricArtisans',
      label: 'Agriculteurs/Artisans',
      data: socialReproductionData.cpgeComposition.agricArtisans,
      borderColor: CHART_COLORS.agricArtisans,
      backgroundColor: `${CHART_COLORS.agricArtisans}20`,
      borderWidth: 2,
      tension: 0.3,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ];

  const lineData = {
    labels: socialReproductionData.years,
    datasets: allDesktopDatasets
      .filter(dataset => visibleCategories[dataset.key as keyof typeof visibleCategories])
      .map(({ key, ...rest }) => rest), // Remove 'key' from dataset object
  };

  // Mobile: Bar chart data (2022 only, filtered by visibility)
  const mobileBarData = {
    labels: categories
      .filter(cat => visibleCategories[cat.key])
      .map(cat => cat.label),
    datasets: [
      {
        label: 'CPGE 2022 (%)',
        data: categories
          .filter(cat => visibleCategories[cat.key])
          .map(cat => get2022Value(cat.key)),
        backgroundColor: categories
          .filter(cat => visibleCategories[cat.key])
          .map(cat => cat.color),
        borderColor: categories
          .filter(cat => visibleCategories[cat.key])
          .map(cat => cat.color),
        borderWidth: 0,
        borderRadius: 4,
        minBarLength: 25, // Ensure small bars are tappable
      },
    ],
  };

  const getNationalPercent = (csp: string): number => {
    const mapping: { [key: string]: number } = {
      'Cadres': socialReproductionData.nationalDistribution.cadres,
      'Ouvriers': socialReproductionData.nationalDistribution.ouvriers,
      'Employés': socialReproductionData.nationalDistribution.employes,
      'Professions intermédiaires': socialReproductionData.nationalDistribution.profInter,
      'Prof. inter.': socialReproductionData.nationalDistribution.profInter,
      'Agric./Artis.': socialReproductionData.nationalDistribution.agricArtisans,
      'Agriculteurs/Artisans': socialReproductionData.nationalDistribution.agricArtisans,
    };
    return mapping[csp] || 0;
  };

  // Build desktop reference lines based on visible categories (same as mobile)
  const getDesktopReferenceLines = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const annotations: Record<string, any> = {};

    if (visibleCategories.cadres) {
      annotations.cadresRef = {
        type: 'line' as const,
        yMin: socialReproductionData.nationalDistribution.cadres,
        yMax: socialReproductionData.nationalDistribution.cadres,
        borderColor: CHART_COLORS.cadres,
        borderWidth: 2,
        borderDash: [5, 5],
        label: {
          display: true,
          content: 'Repr. nationale: 17%',
          position: 'end' as const,
          backgroundColor: `${CHART_COLORS.cadres}CC`,
          color: 'white',
          font: { size: 10 },
          padding: 4,
        },
      };
    }

    if (visibleCategories.employes) {
      annotations.employesRef = {
        type: 'line' as const,
        yMin: socialReproductionData.nationalDistribution.employes,
        yMax: socialReproductionData.nationalDistribution.employes,
        borderColor: CHART_COLORS.employes,
        borderWidth: 2,
        borderDash: [5, 5],
        label: {
          display: true,
          content: 'Repr. nationale: 24%',
          position: 'end' as const,
          backgroundColor: `${CHART_COLORS.employes}CC`,
          color: '#2A2A2A',
          font: { size: 10 },
          padding: 4,
        },
      };
    }

    if (visibleCategories.ouvriers) {
      annotations.ouvriersRef = {
        type: 'line' as const,
        yMin: socialReproductionData.nationalDistribution.ouvriers,
        yMax: socialReproductionData.nationalDistribution.ouvriers,
        borderColor: CHART_COLORS.ouvriers,
        borderWidth: 2,
        borderDash: [5, 5],
        label: {
          display: true,
          content: 'Repr. nationale: 18%',
          position: 'end' as const,
          backgroundColor: `${CHART_COLORS.ouvriers}CC`,
          color: 'white',
          font: { size: 10 },
          padding: 4,
        },
      };
    }

    if (visibleCategories.profInter) {
      annotations.profInterRef = {
        type: 'line' as const,
        yMin: socialReproductionData.nationalDistribution.profInter,
        yMax: socialReproductionData.nationalDistribution.profInter,
        borderColor: CHART_COLORS.profInter,
        borderWidth: 2,
        borderDash: [5, 5],
        label: {
          display: true,
          content: 'Repr. nationale: 26%',
          position: 'end' as const,
          backgroundColor: `${CHART_COLORS.profInter}CC`,
          color: 'white',
          font: { size: 10 },
          padding: 4,
        },
      };
    }

    if (visibleCategories.agricArtisans) {
      annotations.agricArtisansRef = {
        type: 'line' as const,
        yMin: socialReproductionData.nationalDistribution.agricArtisans,
        yMax: socialReproductionData.nationalDistribution.agricArtisans,
        borderColor: CHART_COLORS.agricArtisans,
        borderWidth: 2,
        borderDash: [5, 5],
        label: {
          display: true,
          content: 'Repr. nationale: 10%',
          position: 'end' as const,
          backgroundColor: `${CHART_COLORS.agricArtisans}CC`,
          color: 'white',
          font: { size: 10 },
          padding: 4,
        },
      };
    }

    return annotations;
  };

  // Desktop line chart options
  const lineOptions = {
    ...defaultChartOptions,
    plugins: {
      ...defaultChartOptions.plugins,
      legend: {
        display: false, // Hide default legend, we'll use custom buttons
      },
      tooltip: {
        ...defaultChartOptions.plugins?.tooltip,
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          afterBody: (tooltipItems: any[]) => {
            const csp = tooltipItems[0].dataset.label;
            const cpgePercent = tooltipItems[0].parsed.y;
            const nationalPercent = getNationalPercent(csp);

            if (nationalPercent > 0) {
              const gap = (cpgePercent - nationalPercent).toFixed(1);
              const gapSign = gap.startsWith('-') ? '' : '+';
              return [
                ``,
                `vs National: ${nationalPercent}%`,
                `Écart: ${gapSign}${gap} points`,
              ];
            }
            return [];
          },
        },
      },
      annotation: {
        annotations: {
          ...getDesktopReferenceLines(), // Dynamic reference lines based on visibility
          // Callout: Cadres overrepresentation
          cadresCallout: {
            type: 'label' as const,
            xValue: 2022,
            yValue: 52.8,
            content: ['Surreprésentation', 'massive ×3.1'],
            backgroundColor: `${CHART_COLORS.cadres}E6`,
            color: 'white',
            font: { size: 11, weight: 'bold' as const },
            padding: 6,
            borderRadius: 4,
          },
          // Callout: Stability
          stabilityBox: {
            type: 'label' as const,
            xValue: 2014.5,
            yValue: 30,
            content: ['L\'écart ne se réduit pas', 'Stabilité sur 15 ans'],
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            color: 'white',
            font: { size: 12 },
            padding: 8,
            borderRadius: 6,
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Année',
          font: { size: 14, weight: 'bold' as const },
          color: CHART_COLORS.text,
        },
        ticks: {
          font: { size: 13 },
          color: CHART_COLORS.textSecondary,
        },
        grid: {
          color: CHART_COLORS.grid,
        },
      },
      y: {
        min: 0,
        max: 60,
        ticks: {
          callback: (value: number | string) => `${value}%`,
          stepSize: 10,
          font: { size: 13 },
          color: CHART_COLORS.textSecondary,
        },
        title: {
          display: true,
          text: 'Pourcentage (%)',
          font: { size: 14, weight: 'bold' as const },
          color: CHART_COLORS.text,
        },
        grid: {
          color: CHART_COLORS.grid,
        },
      },
    },
  };

  // Build mobile reference lines based on visible categories
  const getMobileReferenceLines = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const annotations: Record<string, any> = {};

    if (visibleCategories.cadres) {
      annotations.cadresRef = {
        type: 'line' as const,
        yMin: socialReproductionData.nationalDistribution.cadres,
        yMax: socialReproductionData.nationalDistribution.cadres,
        borderColor: CHART_COLORS.cadres,
        borderWidth: 2,
        borderDash: [5, 5],
        label: {
          display: true,
          content: 'National: 17%',
          position: 'end' as const,
          backgroundColor: `${CHART_COLORS.cadres}DD`,
          color: 'white',
          font: { size: 9, weight: 'bold' as const },
          padding: 3,
        },
      };
    }

    if (visibleCategories.employes) {
      annotations.employesRef = {
        type: 'line' as const,
        yMin: socialReproductionData.nationalDistribution.employes,
        yMax: socialReproductionData.nationalDistribution.employes,
        borderColor: CHART_COLORS.employes,
        borderWidth: 2,
        borderDash: [5, 5],
        label: {
          display: true,
          content: 'National: 24%',
          position: 'end' as const,
          backgroundColor: `${CHART_COLORS.employes}DD`,
          color: '#2A2A2A',
          font: { size: 9, weight: 'bold' as const },
          padding: 3,
        },
      };
    }

    if (visibleCategories.ouvriers) {
      annotations.ouvriersRef = {
        type: 'line' as const,
        yMin: socialReproductionData.nationalDistribution.ouvriers,
        yMax: socialReproductionData.nationalDistribution.ouvriers,
        borderColor: CHART_COLORS.ouvriers,
        borderWidth: 2,
        borderDash: [5, 5],
        label: {
          display: true,
          content: 'National: 18%',
          position: 'end' as const,
          backgroundColor: `${CHART_COLORS.ouvriers}DD`,
          color: 'white',
          font: { size: 9, weight: 'bold' as const },
          padding: 3,
        },
      };
    }

    if (visibleCategories.profInter) {
      annotations.profInterRef = {
        type: 'line' as const,
        yMin: socialReproductionData.nationalDistribution.profInter,
        yMax: socialReproductionData.nationalDistribution.profInter,
        borderColor: CHART_COLORS.profInter,
        borderWidth: 2,
        borderDash: [5, 5],
        label: {
          display: true,
          content: 'National: 26%',
          position: 'end' as const,
          backgroundColor: `${CHART_COLORS.profInter}DD`,
          color: 'white',
          font: { size: 9, weight: 'bold' as const },
          padding: 3,
        },
      };
    }

    if (visibleCategories.agricArtisans) {
      annotations.agricArtisansRef = {
        type: 'line' as const,
        yMin: socialReproductionData.nationalDistribution.agricArtisans,
        yMax: socialReproductionData.nationalDistribution.agricArtisans,
        borderColor: CHART_COLORS.agricArtisans,
        borderWidth: 2,
        borderDash: [5, 5],
        label: {
          display: true,
          content: 'National: 10%',
          position: 'end' as const,
          backgroundColor: `${CHART_COLORS.agricArtisans}DD`,
          color: 'white',
          font: { size: 9, weight: 'bold' as const },
          padding: 3,
        },
      };
    }

    return annotations;
  };

  // Mobile bar chart options (vertical bars)
  const mobileBarOptions = {
    ...defaultChartOptions,
    plugins: {
      ...defaultChartOptions.plugins,
      legend: {
        display: false,
      },
      tooltip: {
        ...defaultChartOptions.plugins?.tooltip,
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (context: any) => {
            const value = context.parsed.y;
            const label = context.label;
            const nationalPercent = getNationalPercent(label);

            if (nationalPercent > 0) {
              const gap = (value - nationalPercent).toFixed(1);
              const gapSign = gap.startsWith('-') ? '' : '+';
              return [
                `CPGE 2022: ${value.toFixed(1)}%`,
                `National: ${nationalPercent}%`,
                `Écart: ${gapSign}${gap} points`,
              ];
            }
            return `${value.toFixed(1)}%`;
          },
        },
      },
      datalabels: {
        display: true,
        color: '#ffffff',
        font: { size: 11, weight: 'bold' as const },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (value: number) => {
          return `${value.toFixed(1)}%`;
        },
        anchor: 'center' as const,
        align: 'center' as const,
      },
      annotation: {
        annotations: getMobileReferenceLines(),
      },
    },
    scales: {
      x: {
        ticks: {
          font: { size: 10, weight: 'bold' as const },
          color: CHART_COLORS.text,
          // Diagonal labels
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
        max: 60,
        ticks: {
          callback: (value: number | string) => `${value}%`,
          stepSize: 10,
          font: { size: 10 },
          color: CHART_COLORS.textSecondary,
        },
        grid: {
          color: CHART_COLORS.grid,
        },
      },
    },
  };

  return (
    <ChartCard
      title={socialReproductionData.metadata.title}
      subtitle={isMobile ? "Répartition en CPGE en 2022" : socialReproductionData.metadata.subtitle}
      source={socialReproductionData.metadata.source}
      sourceUrl={socialReproductionData.metadata.sourceUrl}
    >
      {/* Mobile: Category Toggle Pills */}
      {isMobile && (
        <div className="mb-4">
          <p className="text-xs text-text-tertiary mb-2">Sélectionner les catégories :</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => toggleCategory(cat.key)}
                className={`
                  px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
                  ${visibleCategories[cat.key]
                    ? 'text-white shadow-md'
                    : 'bg-white border-2 text-text-secondary hover:bg-background-secondary'
                  }
                `}
                style={{
                  backgroundColor: visibleCategories[cat.key] ? cat.color : 'white',
                  borderColor: cat.color,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-text-tertiary mt-2">
            💡 Les lignes en pointillés indiquent la représentation nationale
          </p>
        </div>
      )}

      {/* Desktop: Category Toggle Buttons (Legend Replacement) */}
      {!isMobile && (
        <div className="flex items-start gap-6">
          <div className="flex-1 h-[500px]">
            <Line data={lineData} options={lineOptions} />
          </div>
          <div className="flex flex-col gap-3 pt-8">
            <p className="text-sm font-semibold text-text-secondary mb-1">Catégories :</p>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => toggleCategory(cat.key)}
                className={`
                  flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold
                  transition-all duration-200 min-w-[180px]
                  ${visibleCategories[cat.key]
                    ? 'shadow-md hover:shadow-lg'
                    : 'bg-white border-2 hover:bg-background-secondary'
                  }
                `}
                style={{
                  backgroundColor: visibleCategories[cat.key] ? `${cat.color}15` : 'white',
                  borderColor: cat.color,
                }}
              >
                <div
                  className="w-4 h-4 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span style={{ color: visibleCategories[cat.key] ? cat.color : '#6B6B6B' }}>
                  {cat.label}
                </span>
              </button>
            ))}
            <p className="text-xs text-text-tertiary mt-2 max-w-[180px]">
              💡 Cliquez pour afficher/masquer
            </p>
          </div>
        </div>
      )}

      {/* Mobile: Chart Display */}
      {isMobile && (
        <div className="h-[400px]">
          <Bar data={mobileBarData} options={mobileBarOptions} />
        </div>
      )}

      <InsightBox insights={socialReproductionData.metadata.insights} variant="primary" />
    </ChartCard>
  );
}
