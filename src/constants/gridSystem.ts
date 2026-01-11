/**
 * Grid System Configuration
 * Defines layout constants and utility classes for the 12-column responsive grid system.
 * Synchronized with Tailwind breakpoints and design tokens.
 */

// ============================================================================
// GRID CONFIGURATION
// ============================================================================
export const gridConfig = {
  columns: 12,
  gap: {
    mobile: '16px',
    tablet: '24px',
    desktop: '32px',
    wide: '40px'
  },
  breakpoints: {
    mobile: '0px',
    tablet: '768px',
    desktop: '1280px',
    wide: '1536px'
  },
  maxWidth: {
    mobile: '100%',
    tablet: '768px',
    desktop: '1280px',
    wide: '1536px'
  }
} as const;

// ============================================================================
// GRID AREAS (Named Grid Regions)
// ============================================================================
export const gridAreas = {
  hero: 'hero',
  stats: 'stats',
  charts: 'charts',
  tables: 'tables',
  sidebar: 'sidebar',
  main: 'main',
  header: 'header',
  footer: 'footer'
} as const;

// ============================================================================
// TAILWIND UTILITY CLASS COMPOSITIONS
// ============================================================================
export const gridLayouts = {
  // ===== MAIN DASHBOARD CONTAINER =====
  dashboard: ['grid', 'grid-cols-1 md:grid-cols-2 xl:grid-cols-12', 'gap-4 md:gap-6 xl:gap-8', 'auto-rows-[minmax(0,auto)]', 'p-4 md:p-6 xl:p-8'].join(' '),
  // ===== STATS ROW (4 Cards Horizontal) =====
  statsRow: ['col-span-1 md:col-span-2 xl:col-span-12', 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4', 'gap-4 md:gap-6'].join(' '),
  // ===== SPLIT VIEW (Chart + Table or 2 Panels) =====
  splitView: ['col-span-1 md:col-span-2 xl:col-span-12', 'grid grid-cols-1 xl:grid-cols-2', 'gap-6 xl:gap-8'].join(' '),
  // ===== 3-COLUMN LAYOUT =====
  threeColumn: ['col-span-1 md:col-span-2 xl:col-span-12', 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3', 'gap-4 md:gap-6'].join(' '),
  // ===== FULL WIDTH CARD =====
  fullWidth: 'col-span-1 md:col-span-2 xl:col-span-12',
  // ===== HALF WIDTH CARD =====
  halfWidth: 'col-span-1 md:col-span-1 xl:col-span-6',
  // ===== 2/3 WIDTH CARD =====
  twoThirdsWidth: 'col-span-1 md:col-span-2 xl:col-span-8',
  // ===== 1/3 WIDTH CARD =====
  oneThirdWidth: 'col-span-1 md:col-span-2 xl:col-span-4',
  // ===== 3/4 WIDTH CARD =====
  threeQuartersWidth: 'col-span-1 md:col-span-2 xl:col-span-9',
  // ===== 1/4 WIDTH CARD =====
  oneQuarterWidth: 'col-span-1 md:col-span-2 xl:col-span-3',
  // ===== SIDEBAR + MAIN LAYOUT =====
  sidebarLayout: ['grid', 'grid-cols-1 lg:grid-cols-[280px_1fr]', 'gap-0', 'min-h-screen'].join(' '),
  // ===== MASONRY-LIKE GRID =====
  masonry: ['grid', 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3', 'gap-6', 'auto-rows-min'].join(' ')
} as const;

// ============================================================================
// RESPONSIVE GRID HELPERS
// ============================================================================
export const responsiveHelpers = {
  // Hide on specific breakpoints
  hideOnMobile: 'hidden md:block',
  hideOnTablet: 'md:hidden xl:block',
  hideOnDesktop: 'xl:hidden',
  // Show only on specific breakpoints
  showOnMobile: 'block md:hidden',
  showOnTablet: 'hidden md:block xl:hidden',
  showOnDesktop: 'hidden xl:block',
  // Responsive flex directions
  flexColMobile: 'flex flex-col md:flex-row',
  flexRowMobile: 'flex flex-row md:flex-col',
  // Responsive text alignment
  textCenterMobile: 'text-center md:text-left',
  textLeftMobile: 'text-left md:text-center',
  // Responsive padding
  responsivePadding: 'p-4 md:p-6 xl:p-8',
  responsivePaddingX: 'px-4 md:px-6 xl:px-8',
  responsivePaddingY: 'py-4 md:py-6 xl:py-8',
  // Responsive gap
  responsiveGap: 'gap-4 md:gap-6 xl:gap-8'
} as const;

// ============================================================================
// CARD GRID VARIANTS
// ============================================================================
export const cardGrids = {
  // 2x2 Stats Grid
  stats2x2: ['grid', 'grid-cols-1 md:grid-cols-2', 'gap-4 md:gap-6', 'auto-rows-fr'].join(' '),
  // 4 Cards Horizontal
  stats4Horizontal: ['grid', 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4', 'gap-4 md:gap-6'].join(' '),
  // 3 Cards + 1 Wide
  asymmetric3Plus1: ['grid', 'grid-cols-1 md:grid-cols-3', 'gap-4 md:gap-6', '[&>*:last-child]:md:col-span-3'].join(' '),
  // Featured + Grid (1 large + 4 small)
  featuredGrid: ['grid', 'grid-cols-1 lg:grid-cols-12', 'gap-4 md:gap-6', '[&>*:first-child]:lg:col-span-8', '[&>*:nth-child(n+2)]:lg:col-span-4'].join(' ')
} as const;

// ============================================================================
// CONTAINER UTILITIES
// ============================================================================
export const containers = {
  // Max width centered container
  centered: ['mx-auto', 'w-full', 'max-w-[1536px]', 'px-4 md:px-6 xl:px-8'].join(' '),
  // Narrow content container
  narrow: ['mx-auto', 'w-full', 'max-w-4xl', 'px-4 md:px-6'].join(' '),
  // Wide content container
  wide: ['mx-auto', 'w-full', 'max-w-7xl', 'px-4 md:px-6 xl:px-8'].join(' '),
  // Full bleed (no padding)
  fullBleed: 'w-full'
} as const;

// ============================================================================
// FLEX LAYOUTS
// ============================================================================
export const flexLayouts = {
  // Horizontal stack with gap
  hStack: 'flex flex-row items-center gap-4',
  hStackSm: 'flex flex-row items-center gap-2',
  hStackLg: 'flex flex-row items-center gap-6',
  // Vertical stack with gap
  vStack: 'flex flex-col gap-4',
  vStackSm: 'flex flex-col gap-2',
  vStackLg: 'flex flex-col gap-6',
  // Space between
  spaceBetween: 'flex flex-row items-center justify-between',
  // Centered
  centered: 'flex items-center justify-center',
  // Wrap
  wrap: 'flex flex-wrap gap-4',
  // Responsive flex
  responsiveFlex: 'flex flex-col md:flex-row gap-4 md:gap-6'
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================
export type GridLayout = keyof typeof gridLayouts;
export type CardGrid = keyof typeof cardGrids;
export type Container = keyof typeof containers;
export type FlexLayout = keyof typeof flexLayouts;
export type ResponsiveHelper = keyof typeof responsiveHelpers;