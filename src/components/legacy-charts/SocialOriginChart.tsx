'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { socialOrigin, chartMetadata } from '@/data/statistics-data';
import { ChartCard } from '@/components/ui/ChartCard';

/**
 * Custom Tooltip for Social Origin Chart
 * Shows comparison between Grandes Écoles % and General Population %
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const gap = Math.abs(data.grandesEcoles - data.population);
  const direction = data.grandesEcoles > data.population ? 'sur-représentés' : 'sous-représentés';

  return (
    <div className="bg-white p-4 rounded-lg shadow-xl border-2 border-accent/20">
      <p className="font-bold text-foreground mb-2">{data.category}</p>
      <div className="space-y-1 text-sm">
        <p className="text-accent">
          <span className="font-semibold">Grandes Écoles :</span> {data.grandesEcoles}%
        </p>
        <p className="text-primary">
          <span className="font-semibold">Population :</span> {data.population}%
        </p>
        <p className="text-text-tertiary border-t border-background-tertiary pt-1 mt-1">
          <span className="font-semibold">Écart :</span> {gap}% ({direction})
        </p>
      </div>
    </div>
  );
};

/**
 * Custom Label for Donut Chart
 * Shows percentage inside the pie slices
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderLabel = (entry: any) => {
  return `${entry.grandesEcoles}%`;
};

/**
 * Social Origin Chart
 * Donut chart comparing social background of Grande École students vs. general population
 */
export function SocialOriginChart() {
  const metadata = chartMetadata.social;

  return (
    <ChartCard
      title={metadata.title}
      subtitle={metadata.subtitle}
      source={metadata.source}
      insight={metadata.insight}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Donut Chart: Grandes Écoles */}
        <div className="flex-1 w-full">
          <h4 className="text-center font-semibold text-foreground mb-4">
            Grandes Écoles
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={socialOrigin}
                dataKey="grandesEcoles"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                label={renderLabel}
                labelLine={false}
              >
                {socialOrigin.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart: General Population */}
        <div className="flex-1 w-full">
          <h4 className="text-center font-semibold text-foreground mb-4">
            Population française
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={socialOrigin}
                dataKey="population"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                label={renderLabel}
                labelLine={false}
              >
                {socialOrigin.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {socialOrigin.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-text-secondary">{entry.category}</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
