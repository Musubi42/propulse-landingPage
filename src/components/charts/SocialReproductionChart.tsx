'use client';

import { Line } from 'react-chartjs-2';
import { ChartCard } from '@/components/ui/ChartCard';
import { InsightBox } from '@/components/ui/InsightBox';
import { socialReproductionData } from '@/data/cpge-statistics-data';
import { CHART_COLORS } from '@/lib/chart-colors';
import { defaultChartOptions } from '@/lib/chart-config';

/**
 * Social Reproduction Chart
 * Multi-line chart showing CSP overrepresentation in CPGE (2007-2022)
 * with reference lines for national distribution
 */
export function SocialReproductionChart() {
  const data = {
    labels: socialReproductionData.years,
    datasets: [
      {
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
        label: 'Agriculteurs/Artisans',
        data: socialReproductionData.cpgeComposition.agricArtisans,
        borderColor: CHART_COLORS.agricArtisans,
        backgroundColor: `${CHART_COLORS.agricArtisans}20`,
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Retraités',
        data: socialReproductionData.cpgeComposition.retraites,
        borderColor: CHART_COLORS.retraites,
        backgroundColor: `${CHART_COLORS.retraites}20`,
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const getNationalPercent = (csp: string): number => {
    const mapping: { [key: string]: number } = {
      'Cadres': socialReproductionData.nationalDistribution.cadres,
      'Ouvriers': socialReproductionData.nationalDistribution.ouvriers,
      'Employés': socialReproductionData.nationalDistribution.employes,
      'Professions intermédiaires': socialReproductionData.nationalDistribution.profInter,
    };
    return mapping[csp] || 0;
  };

  const options = {
    ...defaultChartOptions,
    plugins: {
      ...defaultChartOptions.plugins,
      legend: {
        ...defaultChartOptions.plugins?.legend,
        position: 'right' as const,
        align: 'start' as const,
        labels: {
          font: { size: 12 },
          boxWidth: 15,
          padding: 10,
          color: CHART_COLORS.text,
        },
      },
      tooltip: {
        ...defaultChartOptions.plugins?.tooltip,
        callbacks: {
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
          // Reference line: Cadres (17%)
          cadresRef: {
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
          },
          // Reference line: Employés (24%)
          employesRef: {
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
          },
          // Reference line: Ouvriers (18%)
          ouvriersRef: {
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
          },
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
          callback: (value: any) => `${value}%`,
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

  return (
    <ChartCard
      title={socialReproductionData.metadata.title}
      subtitle={socialReproductionData.metadata.subtitle}
      source={socialReproductionData.metadata.source}
      sourceUrl={socialReproductionData.metadata.sourceUrl}
    >
      <div className="h-[450px] md:h-[500px]">
        <Line data={data} options={options} />
      </div>

      <InsightBox insights={socialReproductionData.metadata.insights} variant="primary" />
    </ChartCard>
  );
}
