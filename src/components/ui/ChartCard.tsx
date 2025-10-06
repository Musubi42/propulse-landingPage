'use client';

import { ReactNode } from 'react';
import { Info } from 'lucide-react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  source?: string;
  sourceUrl?: string;
  insight?: string;
  footnote?: string;
  children: ReactNode;
  className?: string;
}

/**
 * ChartCard - Reusable wrapper for data visualization charts
 * Provides consistent styling, metadata display, and interaction states
 */
export function ChartCard({
  title,
  subtitle,
  source,
  sourceUrl,
  insight,
  footnote,
  children,
  className = '',
}: ChartCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-background-tertiary/30 ${className}`}
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm md:text-base text-text-secondary leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Chart Container */}
      <div className="mb-6">
        {children}
      </div>

      {/* Footer: Insight & Source */}
      <div className="space-y-3 pt-4 border-t border-background-tertiary/50">
        {insight && (
          <div className="flex items-start gap-2 bg-accent/5 p-3 rounded-lg">
            <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <p className="text-sm text-text-secondary leading-relaxed">
              <strong className="text-accent">À retenir :</strong> {insight}
            </p>
          </div>
        )}
        {source && (
          <p className="text-xs text-text-tertiary italic">
            Source :{' '}
            {sourceUrl ? (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent underline transition-colors duration-200"
              >
                {source}
              </a>
            ) : (
              source
            )}
          </p>
        )}
        {footnote && (
          <p className="text-xs text-text-tertiary italic mt-2">
            {footnote}
          </p>
        )}
      </div>
    </div>
  );
}
