'use client';

import { Bar } from 'react-chartjs-2';
import { ChartCard } from '@/components/ui/ChartCard';
import { InsightBox } from '@/components/ui/InsightBox';
import { geographicData } from '@/data/cpge-statistics-data';
import { CHART_COLORS } from '@/lib/chart-colors';
import { defaultChartOptions, formatNumber, calculateRatio } from '@/lib/chart-config';

/**
 * Geographic Inequality Chart
 * Grouped horizontal bar chart comparing CPGE student distribution vs. population distribution by region
 */
export function GeographicInequalityChart() {
  const data = {
    labels: geographicData.categories,
    datasets: [
      {
        label: 'Population française',
        data: geographicData.population.values,
        backgroundColor: CHART_COLORS.lightBlue,
        borderColor: CHART_COLORS.lightBlue,
        borderWidth: 0,
        borderRadius: 6,
      },
      {
        label: 'Étudiants en CPGE',
        data: geographicData.cpge.values,
        backgroundColor: CHART_COLORS.coral,
        borderColor: CHART_COLORS.coral,
        borderWidth: 0,
        borderRadius: 6,
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
        align: 'end' as const,
      },
      tooltip: {
        ...defaultChartOptions.plugins?.tooltip,
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (context: any) => {
            const value = context.parsed.x;
            const absolute =
              context.datasetIndex === 0
                ? geographicData.population.absolute[context.dataIndex]
                : geographicData.cpge.absolute[context.dataIndex];
            return `${context.dataset.label}: ${value.toFixed(1)}% (${formatNumber(absolute)})`;
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          afterBody: (tooltipItems: any[]) => {
            const index = tooltipItems[0].dataIndex;
            const popPercent = geographicData.population.values[index];
            const cpgePercent = geographicData.cpge.values[index];
            const ratio = calculateRatio(cpgePercent, popPercent);
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
          callback: (value: number | string) => `${value}%`,
          font: { size: 13 },
          color: CHART_COLORS.textSecondary,
        },
        grid: {
          color: CHART_COLORS.grid,
        },
        title: {
          display: true,
          text: 'Pourcentage du total (%)',
          font: { size: 14, weight: 'bold' as const },
          color: CHART_COLORS.text,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 14 },
          color: CHART_COLORS.text,
        },
      },
    },
  };

  return (
    <ChartCard
      title={geographicData.metadata.title}
      subtitle={geographicData.metadata.subtitle}
      source={geographicData.metadata.source}
      sourceUrl={geographicData.metadata.sourceUrl}
      footnote="* CPGE : Classes Préparatoires aux Grandes Écoles (classes de préparation intensive post-bac)"
    >
      <div className="h-[300px] md:h-[400px]">
        <Bar data={data} options={options} />
      </div>

      <InsightBox insights={geographicData.metadata.insights} variant="primary" />
    </ChartCard>
  );
}
