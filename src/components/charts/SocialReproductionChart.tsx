'use client';

import { Line } from 'react-chartjs-2';
import { ChartCard } from '@/components/ui/ChartCard';
import { InsightBox } from '@/components/ui/InsightBox';
import { socialReproductionData } from '@/data/cpge-statistics-data';
import { CHART_COLORS } from '@/lib/chart-colors';
import { defaultChartOptions } from '@/lib/chart-config';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * Social Reproduction Chart
 * Multi-line chart showing CSP overrepresentation in CPGE (2007-2022)
 * with reference lines for national distribution
 * Mobile-optimized with bottom legend and simplified annotations
 */
export function SocialReproductionChart() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const data = {
    labels: socialReproductionData.years,
    datasets: [
      {
        label: 'Cadres',
        data: socialReproductionData.cpgeComposition.cadres,
        borderColor: CHART_COLORS.cadres,
        backgroundColor: `${CHART_COLORS.cadres}20`,
        borderWidth: isMobile ? 2 : 3,
        tension: 0.3,
        pointRadius: isMobile ? 3 : 5,
        pointHoverRadius: isMobile ? 5 : 7,
      },
      {
        label: 'Ouvriers',
        data: socialReproductionData.cpgeComposition.ouvriers,
        borderColor: CHART_COLORS.ouvriers,
        backgroundColor: `${CHART_COLORS.ouvriers}20`,
        borderWidth: isMobile ? 2 : 3,
        tension: 0.3,
        pointRadius: isMobile ? 3 : 5,
        pointHoverRadius: isMobile ? 5 : 7,
      },
      {
        label: 'Employés',
        data: socialReproductionData.cpgeComposition.employes,
        borderColor: CHART_COLORS.employes,
        backgroundColor: `${CHART_COLORS.employes}20`,
        borderWidth: isMobile ? 1.5 : 2,
        tension: 0.3,
        pointRadius: isMobile ? 2 : 4,
        pointHoverRadius: isMobile ? 4 : 6,
      },
      {
        label: isMobile ? 'Prof. inter.' : 'Professions intermédiaires',
        data: socialReproductionData.cpgeComposition.profInter,
        borderColor: CHART_COLORS.profInter,
        backgroundColor: `${CHART_COLORS.profInter}20`,
        borderWidth: isMobile ? 1.5 : 2,
        tension: 0.3,
        pointRadius: isMobile ? 2 : 4,
        pointHoverRadius: isMobile ? 4 : 6,
      },
      {
        label: isMobile ? 'Agric./Artis.' : 'Agriculteurs/Artisans',
        data: socialReproductionData.cpgeComposition.agricArtisans,
        borderColor: CHART_COLORS.agricArtisans,
        backgroundColor: `${CHART_COLORS.agricArtisans}20`,
        borderWidth: isMobile ? 1.5 : 2,
        tension: 0.3,
        pointRadius: isMobile ? 2 : 4,
        pointHoverRadius: isMobile ? 4 : 6,
      },
      {
        label: 'Retraités',
        data: socialReproductionData.cpgeComposition.retraites,
        borderColor: CHART_COLORS.retraites,
        backgroundColor: `${CHART_COLORS.retraites}20`,
        borderWidth: isMobile ? 1.5 : 2,
        borderDash: [5, 5],
        tension: 0.3,
        pointRadius: isMobile ? 2 : 3,
        pointHoverRadius: isMobile ? 3 : 5,
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
        position: isMobile ? ('bottom' as const) : ('right' as const),
        align: isMobile ? ('center' as const) : ('start' as const),
        labels: {
          font: { size: isMobile ? 10 : 12 },
          boxWidth: isMobile ? 12 : 15,
          padding: isMobile ? 6 : 10,
          color: CHART_COLORS.text,
        },
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
          // Reference line: Cadres (17%)
          cadresRef: {
            type: 'line' as const,
            yMin: socialReproductionData.nationalDistribution.cadres,
            yMax: socialReproductionData.nationalDistribution.cadres,
            borderColor: CHART_COLORS.cadres,
            borderWidth: isMobile ? 1 : 2,
            borderDash: [5, 5],
            label: {
              display: !isMobile, // Hide on mobile to reduce clutter
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
            borderWidth: isMobile ? 1 : 2,
            borderDash: [5, 5],
            label: {
              display: !isMobile,
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
            borderWidth: isMobile ? 1 : 2,
            borderDash: [5, 5],
            label: {
              display: !isMobile,
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
            font: { size: isMobile ? 9 : 11, weight: 'bold' as const },
            padding: isMobile ? 4 : 6,
            borderRadius: 4,
            display: !isMobile, // Hide on mobile
          },
          // Callout: Stability
          stabilityBox: {
            type: 'label' as const,
            xValue: 2014.5,
            yValue: 30,
            content: ['L\'écart ne se réduit pas', 'Stabilité sur 15 ans'],
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            color: 'white',
            font: { size: isMobile ? 10 : 12 },
            padding: isMobile ? 6 : 8,
            borderRadius: 6,
            display: !isMobile, // Hide on mobile
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: !isMobile, // Hide on mobile to save space
          text: 'Année',
          font: { size: 14, weight: 'bold' as const },
          color: CHART_COLORS.text,
        },
        ticks: {
          font: { size: isMobile ? 10 : 13 },
          color: CHART_COLORS.textSecondary,
          // Show fewer ticks on mobile
          maxTicksLimit: isMobile ? 6 : undefined,
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
          font: { size: isMobile ? 10 : 13 },
          color: CHART_COLORS.textSecondary,
        },
        title: {
          display: !isMobile, // Hide on mobile to save space
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
