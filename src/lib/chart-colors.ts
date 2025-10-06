/**
 * Chart.js Color Palette for CPGE Data Visualizations
 * Consistent colors across all statistical charts
 */

export const CHART_COLORS = {
  // Primary palette
  primary: '#667eea',        // Purple-blue
  secondary: '#f093fb',      // Pink

  // Accents
  lightBlue: '#4facfe',      // For population data
  green: '#43e97b',          // For positive metrics
  coral: '#fa709a',          // For CPGE data
  yellow: '#fee140',         // For warnings/alerts

  // CSP-specific (Graph 2: Social Reproduction)
  cadres: '#667eea',         // Purple (primary)
  profInter: '#f093fb',      // Pink
  agricArtisans: '#00f2fe',  // Teal/cyan
  employes: '#fee140',       // Yellow
  ouvriers: '#43e97b',       // Green
  retraites: '#95a5a6',      // Gray

  // Gender-specific (Graph 3: Gender Segregation)
  women: '#f093fb',          // Bright pink
  men: '#667eea',            // Deep blue

  // BAC tracking (Graph 1b: BAC Pro Barrier)
  bacGeneral: '#43e97b',     // Green
  bacTechno: '#fee140',      // Yellow
  bacPro: '#fa709a',         // Red/coral

  // UI elements
  text: '#2c3e50',           // Dark gray
  textSecondary: '#4A4A4A',  // Medium gray
  textTertiary: '#6B6B6B',   // Light gray
  grid: '#ecf0f1',           // Light gray

  // Zones (Graph 2: Social Reproduction)
  overrepresentationZone: 'rgba(250, 112, 154, 0.1)',  // Light red tint
  underrepresentationZone: 'rgba(79, 172, 254, 0.1)',  // Light blue tint
} as const;

export const CHART_FONTS = {
  family: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
  size: {
    title: 24,
    subtitle: 18,
    body: 14,
    label: 13,
  },
} as const;
