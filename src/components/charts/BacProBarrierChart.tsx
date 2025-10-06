'use client';

import { Bar } from 'react-chartjs-2';
import { ChartCard } from '@/components/ui/ChartCard';
import { InsightBox } from '@/components/ui/InsightBox';
import { bacProData } from '@/data/cpge-statistics-data';
import { CHART_COLORS } from '@/lib/chart-colors';
import { defaultChartOptions, formatNumber } from '@/lib/chart-config';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

/**
 * BAC Pro Barrier Chart
 * Funnel-style visualization showing drastic access gap by BAC type
 * Implemented as horizontal bars with varying widths
 * Mobile-optimized with inset chart moved below and smaller fonts
 */
export function BacProBarrierChart() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Mobile-friendly abbreviated labels
  const mobileLabels = ['Gén.', 'Tech.', 'Pro'];
  const desktopLabels = bacProData.funnelRates.map(item => item.type);
  // Main funnel data (enrollment rates)
  const funnelData = {
    labels: isMobile ? mobileLabels : desktopLabels,
    datasets: [
      {
        label: 'Taux d\'accès CPGE (%)',
        data: bacProData.funnelRates.map(item => item.rate),
        backgroundColor: bacProData.funnelRates.map(item => item.color),
        borderColor: bacProData.funnelRates.map(item => item.color),
        borderWidth: 0,
        borderRadius: 6,
        barThickness: 50,
      },
    ],
  };

  const funnelOptions = {
    ...defaultChartOptions,
    indexAxis: 'y' as const,
    plugins: {
      ...defaultChartOptions.plugins,
      legend: {
        display: false,
      },
      tooltip: {
        ...defaultChartOptions.plugins?.tooltip,
        callbacks: {
          title: (tooltipItems: any[]) => {
            // Show full BAC type name in tooltip even on mobile
            const index = tooltipItems[0].dataIndex;
            return bacProData.funnelRates[index].type;
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (context: any) => {
            const rate = context.parsed.x;
            const ratio = (10.1 / rate).toFixed(0);
            return [
              `Taux d'accès: ${rate.toFixed(1)}%`,
              ratio !== '1' ? `${ratio}× moins que BAC Général` : '',
            ].filter(Boolean);
          },
        },
      },
      datalabels: {
        display: true,
        color: '#ffffff',
        font: { size: isMobile ? 11 : 14, weight: 'bold' as const },
        formatter: (value: number) => {
          return `${value.toFixed(1)}%`;
        },
        anchor: 'center' as const,
        align: 'center' as const,
      },
      annotation: {
        annotations: {
          // Callout for BAC Pro - hide on mobile to reduce clutter
          bacProCallout: {
            type: 'label' as const,
            xValue: 5,
            yValue: 2,
            content: ['100× moins de chances', 'que BAC Général'],
            backgroundColor: `${CHART_COLORS.bacPro}E6`,
            color: 'white',
            font: { size: isMobile ? 9 : 11, weight: 'bold' as const },
            padding: isMobile ? 4 : 6,
            borderRadius: 4,
            display: !isMobile, // Hide on mobile
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 12,
        ticks: {
          callback: (value: number | string) => `${value}%`,
          font: { size: isMobile ? 11 : 13 },
          color: CHART_COLORS.textSecondary,
        },
        grid: {
          color: CHART_COLORS.grid,
        },
        title: {
          display: !isMobile, // Hide on mobile to save space
          text: 'Taux d\'accès aux CPGE',
          font: { size: 14, weight: 'bold' as const },
          color: CHART_COLORS.text,
        },
      },
      y: {
        ticks: {
          font: { size: isMobile ? 10 : 14, weight: 'bold' as const },
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

  // Inset bar chart data (absolute numbers)
  const insetMobileLabels = ['Gén.', 'Tech.', 'Pro'];
  const insetDesktopLabels = ['Général', 'Techno', 'Pro'];

  const absoluteData = {
    labels: isMobile ? insetMobileLabels : insetDesktopLabels,
    datasets: [
      {
        label: 'Effectifs 2024',
        data: [
          bacProData.absoluteNumbers.bacGeneral,
          bacProData.absoluteNumbers.bacTechno,
          bacProData.absoluteNumbers.bacPro,
        ],
        backgroundColor: bacProData.funnelRates.map(item => item.color),
        borderWidth: 0,
        borderRadius: 4,
      },
    ],
  };

  const insetOptions = {
    ...defaultChartOptions,
    indexAxis: 'y' as const,
    plugins: {
      ...defaultChartOptions.plugins,
      legend: {
        display: false,
      },
      tooltip: {
        ...defaultChartOptions.plugins?.tooltip,
        callbacks: {
          title: (tooltipItems: any[]) => {
            // Show full BAC type name in tooltip even on mobile
            const index = tooltipItems[0].dataIndex;
            return insetDesktopLabels[index];
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (context: any) => {
            const value = context.parsed.x;
            const percentage = bacProData.funnelRates[context.dataIndex].percentage;
            return `${formatNumber(value)} étudiants (${percentage}%)`;
          },
        },
      },
      datalabels: {
        display: true,
        color: '#ffffff',
        font: { size: isMobile ? 9 : 10, weight: 'bold' as const },
        formatter: (value: number) => {
          return formatNumber(value);
        },
        anchor: 'center' as const,
        align: 'center' as const,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        ticks: {
          font: { size: isMobile ? 9 : 10 },
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
      title={bacProData.metadata.title}
      subtitle={bacProData.metadata.subtitle}
      source={bacProData.metadata.source}
      sourceUrl={bacProData.metadata.sourceUrl}
    >
      {/* Desktop: relative positioning with inset chart */}
      <div className="hidden md:block relative">
        {/* Main Funnel Chart */}
        <div className="h-[400px]">
          <Bar data={funnelData} options={funnelOptions} />
        </div>

        {/* Inset Bar Chart - Absolute Numbers (Desktop only - positioned absolutely) */}
        <div className="absolute bottom-4 right-4 w-56 h-40 bg-white/95 p-3 rounded-lg shadow-xl border-2 border-background-tertiary">
          <p className="text-xs font-bold text-foreground mb-2 text-center">
            Effectifs réels en 2024
          </p>
          <div className="h-[calc(100%-24px)]">
            <Bar data={absoluteData} options={insetOptions} />
          </div>
        </div>
      </div>

      {/* Mobile: stacked vertically */}
      <div className="md:hidden space-y-4">
        {/* Main Funnel Chart */}
        <div className="h-[350px]">
          <Bar data={funnelData} options={funnelOptions} />
        </div>

        {/* Inset Bar Chart - Below main chart on mobile */}
        <div className="bg-background-secondary p-3 rounded-lg border-2 border-background-tertiary">
          <p className="text-xs font-bold text-foreground mb-2 text-center">
            Effectifs réels en 2024
          </p>
          <div className="h-32">
            <Bar data={absoluteData} options={insetOptions} />
          </div>
        </div>
      </div>

      <InsightBox insights={bacProData.metadata.insights} variant="warning" />
    </ChartCard>
  );
}
