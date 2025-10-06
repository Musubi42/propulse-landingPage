'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { genderEvolution, chartMetadata } from '@/data/statistics-data';
import { ChartCard } from '@/components/ui/ChartCard';

/**
 * Custom Tooltip for Gender Evolution Chart
 * Shows women and men percentages with gap analysis
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const gap = data.men - data.women;

  return (
    <div className="bg-white p-4 rounded-lg shadow-xl border-2 border-accent/20">
      <p className="font-bold text-foreground mb-2">{data.year}</p>
      <div className="space-y-1 text-sm">
        <p className="text-secondary">
          <span className="font-semibold">Femmes :</span> {data.women}%
        </p>
        <p className="text-primary">
          <span className="font-semibold">Hommes :</span> {data.men}%
        </p>
        <p className="text-text-tertiary border-t border-background-tertiary pt-1 mt-1">
          <span className="font-semibold">Écart :</span> {gap}% en faveur des hommes
        </p>
      </div>
    </div>
  );
};

/**
 * Gender Evolution Chart
 * Line chart showing the evolution of women representation in engineering schools
 */
export function GenderEvolutionChart() {
  const metadata = chartMetadata.gender;

  return (
    <ChartCard
      title={metadata.title}
      subtitle={metadata.subtitle}
      source={metadata.source}
      insight={metadata.insight}
    >
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={genderEvolution}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#EBE3D5" />
          <XAxis
            dataKey="year"
            tick={{ fill: '#4A4A4A', fontSize: 12 }}
            stroke="#6B6B6B"
            label={{
              value: 'Année',
              position: 'insideBottom',
              offset: -10,
              style: { fill: '#4A4A4A', fontSize: 14 },
            }}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tick={{ fill: '#4A4A4A', fontSize: 12 }}
            stroke="#6B6B6B"
            label={{
              value: 'Pourcentage (%)',
              angle: -90,
              position: 'insideLeft',
              style: { fill: '#4A4A4A', fontSize: 14 },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="line"
            wrapperStyle={{ paddingBottom: '20px' }}
          />

          {/* Reference line at 50% for parity */}
          <ReferenceLine
            y={50}
            stroke="#6B6B6B"
            strokeDasharray="5 5"
            label={{
              value: 'Parité (50%)',
              position: 'right',
              fill: '#6B6B6B',
              fontSize: 12,
            }}
          />

          {/* Line for Women */}
          <Line
            type="monotone"
            dataKey="women"
            stroke="#4A6B52"
            strokeWidth={3}
            name="Femmes (%)"
            dot={{ fill: '#4A6B52', r: 5 }}
            activeDot={{ r: 7 }}
          />

          {/* Line for Men */}
          <Line
            type="monotone"
            dataKey="men"
            stroke="#1B3A52"
            strokeWidth={3}
            name="Hommes (%)"
            dot={{ fill: '#1B3A52', r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
