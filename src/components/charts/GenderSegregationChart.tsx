'use client';

import { Bar } from 'react-chartjs-2';
import { ChartCard } from '@/components/ui/ChartCard';
import { InsightBox } from '@/components/ui/InsightBox';
import { genderSegregationData } from '@/data/cpge-statistics-data';
import { CHART_COLORS } from '@/lib/chart-colors';
import { defaultChartOptions, formatNumber, calculateGap } from '@/lib/chart-config';

/**
 * Gender Segregation Chart
 * 100% stacked horizontal bar chart showing gender distribution across CPGE fields
 */
export function GenderSegregationChart() {
  const data = {
    labels: genderSegregationData.fields,
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
        position: 'top' as const,
        align: 'center' as const,
        labels: {
          font: { size: 14, weight: 'bold' as const },
          boxWidth: 20,
          padding: 15,
          color: CHART_COLORS.text,
        },
      },
      tooltip: {
        ...defaultChartOptions.plugins?.tooltip,
        callbacks: {
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
        font: { size: 13, weight: 'bold' as const },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (value: number, context: any) => {
          const absolute = context.dataset.absoluteData[context.dataIndex];
          const percent = value.toFixed(1);
          // Only show label if segment is wide enough (>15%)
          return value > 15 ? `${formatNumber(absolute)}\n(${percent}%)` : '';
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
              display: true,
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
          font: { size: 13 },
          color: CHART_COLORS.textSecondary,
        },
        grid: {
          color: CHART_COLORS.grid,
        },
      },
      y: {
        stacked: true,
        ticks: {
          font: { size: 15, weight: 'bold' as const },
          color: CHART_COLORS.text,
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
