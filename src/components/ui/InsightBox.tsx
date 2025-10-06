import { Info } from 'lucide-react';

interface InsightBoxProps {
  insights: string[];
  variant?: 'primary' | 'accent' | 'warning';
  className?: string;
}

/**
 * InsightBox - Display key takeaways from data visualizations
 * Shows highlighted insights with icon and colored accent
 */
export function InsightBox({
  insights,
  variant = 'primary',
  className = ''
}: InsightBoxProps) {
  const bgColors = {
    primary: 'bg-primary/5 border-primary',
    accent: 'bg-accent/5 border-accent',
    warning: 'bg-yellow-50 border-yellow-400',
  };

  const iconColors = {
    primary: 'text-primary',
    accent: 'text-accent',
    warning: 'text-yellow-600',
  };

  const titleColors = {
    primary: 'text-primary',
    accent: 'text-accent',
    warning: 'text-yellow-700',
  };

  return (
    <div
      className={`${bgColors[variant]} p-6 rounded-xl border-l-4 mt-6 ${className}`}
    >
      <div className="flex items-start gap-3">
        <Info className={`w-5 h-5 ${iconColors[variant]} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <h4 className={`font-bold ${titleColors[variant]} mb-3 text-base`}>
            📌 À retenir
          </h4>
          <ul className="space-y-2">
            {insights.map((insight, index) => (
              <li
                key={index}
                className="text-sm text-text-secondary leading-relaxed"
                dangerouslySetInnerHTML={{ __html: insight }}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
