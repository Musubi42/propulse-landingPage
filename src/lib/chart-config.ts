'use client';

import { ChartOptions } from 'chart.js';
import { CHART_COLORS, CHART_FONTS } from './chart-colors';

// Register Chart.js components globally
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin,
  ChartDataLabels
);

/**
 * Default global options for all Chart.js charts
 */
export const defaultChartOptions: Partial<ChartOptions> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: {
          family: CHART_FONTS.family,
          size: CHART_FONTS.size.body,
        },
        color: CHART_COLORS.text,
        padding: 15,
        usePointStyle: false,
        boxWidth: 20,
        boxHeight: 20,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: CHART_COLORS.text,
      bodyColor: CHART_COLORS.textSecondary,
      borderColor: CHART_COLORS.grid,
      borderWidth: 2,
      padding: 12,
      boxPadding: 6,
      titleFont: {
        family: CHART_FONTS.family,
        size: CHART_FONTS.size.body,
        weight: 'bold',
      },
      bodyFont: {
        family: CHART_FONTS.family,
        size: CHART_FONTS.size.body,
      },
      displayColors: true,
      cornerRadius: 8,
    },
    datalabels: {
      display: false, // Enable per chart as needed
    },
  },
  animation: {
    duration: 1200,
    easing: 'easeInOutQuart',
  },
};

/**
 * Utility: Format percentage
 */
export const formatPercent = (value: number, decimals = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Utility: Format number with thousands separator (French format)
 */
export const formatNumber = (value: number): string => {
  return value.toLocaleString('fr-FR');
};

/**
 * Utility: Calculate overrepresentation ratio
 */
export const calculateRatio = (cpgePercent: number, populationPercent: number): number => {
  return Number((cpgePercent / populationPercent).toFixed(1));
};

/**
 * Utility: Calculate gap between two percentages
 */
export const calculateGap = (value1: number, value2: number): number => {
  return Number(Math.abs(value1 - value2).toFixed(1));
};
