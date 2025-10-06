'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { geographicDistribution, chartMetadata } from '@/data/statistics-data';
import { ChartCard } from '@/components/ui/ChartCard';

/**
 * Custom Tooltip for Geographic Distribution Chart
 * Shows detailed comparison between student % and population %
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const ratio = (data.students / data.population).toFixed(1);

  return (
    <div className="bg-white p-4 rounded-lg shadow-xl border-2 border-accent/20">
      <p className="font-bold text-foreground mb-2">{data.region}</p>
      <div className="space-y-1 text-sm">
        <p className="text-accent">
          <span className="font-semibold">Élèves en prépa :</span> {data.students}%
        </p>
        <p className="text-primary">
          <span className="font-semibold">Population :</span> {data.population}%
        </p>
        <p className="text-text-tertiary border-t border-background-tertiary pt-1 mt-1">
          <span className="font-semibold">Ratio :</span> ×{ratio}
        </p>
      </div>
    </div>
  );
};

/**
 * Geographic Distribution Chart
 * Grouped bar chart comparing CPGE student distribution vs. population distribution by region
 */
export function GeographicDistributionChart() {
  const metadata = chartMetadata.geographic;

  return (
    <ChartCard
      title={metadata.title}
      subtitle={metadata.subtitle}
      source={metadata.source}
      insight={metadata.insight}
      footnote="* CPGE : Classes Préparatoires aux Grandes Écoles (classes de préparation intensive post-bac)"
    >
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={geographicDistribution}
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#EBE3D5" />
          <XAxis
            dataKey="region"
            angle={-45}
            textAnchor="end"
            height={120}
            tick={{ fill: '#4A4A4A', fontSize: 12 }}
            stroke="#6B6B6B"
          />
          <YAxis
            label={{
              value: 'Pourcentage (%)',
              angle: -90,
              position: 'insideLeft',
              style: { fill: '#4A4A4A', fontSize: 14 },
            }}
            tick={{ fill: '#4A4A4A', fontSize: 12 }}
            stroke="#6B6B6B"
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(217, 118, 66, 0.1)' }} />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="square"
            wrapperStyle={{ paddingBottom: '20px' }}
          />
          <Bar
            dataKey="students"
            fill="#D97642"
            name="Élèves en prépa (%)"
            radius={[8, 8, 0, 0]}
          />
          <Bar
            dataKey="population"
            fill="#1B3A52"
            name="Population française (%)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
