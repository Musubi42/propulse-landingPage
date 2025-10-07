'use client';

import { Bar } from 'react-chartjs-2';
import { ChartCard } from '@/components/ui/ChartCard';
import { InsightBox } from '@/components/ui/InsightBox';
import { genderSegregationData } from '@/data/cpge-statistics-data';
import { CHART_COLORS } from '@/lib/chart-colors';
import { defaultChartOptions, formatNumber, calculateGap } from '@/lib/chart-config';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * Gender Segregation Chart
 * 100% stacked horizontal bar chart showing gender distribution across CPGE fields
 * Mobile-optimized with abbreviated labels and bottom legend
 */
export function GenderSegregationChart() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Mobile-friendly abbreviated labels
  const mobileLabels = ['Sc. ingé.', 'Éco.', 'Lettres', 'Agro-Véto'];
  const desktopLabels = genderSegregationData.fields;

  const data = {
    labels: isMobile ? mobileLabels : desktopLabels,
    datasets: [
      {
        label: 'Femmes',
        data: genderSegregationData.women.percentages,
        backgroundColor: CHART_COLORS.women,
        borderColor: CHART_COLORS.women,
        borderWidth: 0,
        // Store absolute numbers for tooltip
        absoluteData: genderSegregationData.women.absolute,
      },
      {
        label: 'Hommes',
        data: genderSegregationData.men.percentages,
        backgroundColor: CHART_COLORS.men,
        borderColor: CHART_COLORS.men,
        borderWidth: 0,
        absoluteData: genderSegregationData.men.absolute,
      },
    ],
  };

  const options = {
    ...defaultChartOptions,
    indexAxis: 'y' as const,
    plugins: {
      ...defaultChartOptions.plugins,
      legend: {
        ...defaultChartOptions.plugins?.legend,
        position: isMobile ? ('bottom' as const) : ('top' as const),
        align: 'center' as const,
        labels: {
          font: { size: isMobile ? 11 : 14, weight: 'bold' as const },
          boxWidth: isMobile ? 15 : 20,
          padding: isMobile ? 8 : 15,
          color: CHART_COLORS.text,
        },
      },
      tooltip: {
        ...defaultChartOptions.plugins?.tooltip,
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          title: (tooltipItems: any[]) => {
            // Show full field name in tooltip even on mobile
            const index = tooltipItems[0].dataIndex;
            return genderSegregationData.fields[index];
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (context: any) => {
            const percent = context.parsed.x;
            const absolute = context.dataset.absoluteData[context.dataIndex];
            return `${context.dataset.label}: ${formatNumber(absolute)} (${percent.toFixed(1)}%)`;
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          afterBody: (tooltipItems: any[]) => {
            if (tooltipItems.length < 2) return [];
            const women = tooltipItems[0].parsed.x;
            const men = tooltipItems[1].parsed.x;
            const gap = calculateGap(women, men);
            const direction = women > men ? 'femmes' : 'hommes';
            return [``, `Écart: ${gap} points en faveur des ${direction}`];
          },
        },
      },
      datalabels: {
        display: true,
        color: '#ffffff',
        font: { size: isMobile ? 10 : 13, weight: 'bold' as const },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (value: number, context: any) => {
          const absolute = context.dataset.absoluteData[context.dataIndex];
          const percent = value.toFixed(1);
          // Only show label if segment is wide enough (>15%)
          // On mobile, show only percentage to save space
          if (value <= 15) return '';
          return isMobile ? `${percent}%` : `${formatNumber(absolute)}\n(${percent}%)`;
        },
        anchor: 'center' as const,
        align: 'center' as const,
      },
      annotation: {
        annotations: {
          // Parity line at 50%
          parityLine: {
            type: 'line' as const,
            xMin: 50,
            xMax: 50,
            borderColor: CHART_COLORS.textTertiary,
            borderWidth: 2,
            borderDash: [5, 5],
            label: {
              display: !isMobile, // Hide label on mobile to reduce clutter
              content: 'Parité (50%)',
              position: 'start' as const,
              yAdjust: -10,
              font: { size: 11 },
              color: CHART_COLORS.textTertiary,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: 4,
            },
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
          callback: (value: number | string) => `${value}%`,
          stepSize: 20,
          font: { size: isMobile ? 11 : 13 },
          color: CHART_COLORS.textSecondary,
        },
        grid: {
          color: CHART_COLORS.grid,
        },
      },
      y: {
        stacked: true,
        ticks: {
          font: { size: isMobile ? 10 : 15, weight: 'bold' as const },
          color: CHART_COLORS.text,
          // Diagonal labels on mobile
          maxRotation: isMobile ? 45 : 0,
          minRotation: isMobile ? 45 : 0,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <ChartCard
      title={genderSegregationData.metadata.title}
      subtitle={genderSegregationData.metadata.subtitle}
      source={genderSegregationData.metadata.source}
      sourceUrl={genderSegregationData.metadata.sourceUrl}
    >
      <div className="h-[350px] md:h-[400px]">
        <Bar data={data} options={options} />
      </div>

      <InsightBox insights={genderSegregationData.metadata.insights} variant="accent" />
    </ChartCard>
  );
}
