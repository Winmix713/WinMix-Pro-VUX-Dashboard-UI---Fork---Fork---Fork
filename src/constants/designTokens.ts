/**
 * Design Tokens for the Application
 * Defines the core visual language including spacing, typography, colors, radius, and animations.
 * Synchronized with index.css CSS variables and Tailwind config.
 */

// ============================================================================
// SPACING SYSTEM
// ============================================================================
export const spacing = {
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '80px'
} as const;

// ============================================================================
// BORDER RADIUS (Rounded Design System)
// ============================================================================
export const radius = {
  none: '0',
  sm: '0.75rem',
  // 12px - Small elements
  md: '1rem',
  // 16px - Buttons, inputs
  lg: '1.5rem',
  // 24px - Cards
  xl: '2rem',
  // 32px - Large modals
  '2xl': '2.5rem',
  // 40px - Extra large
  full: '9999px' // Pills, badges, circular
} as const;

// ============================================================================
// TYPOGRAPHY SYSTEM
// ============================================================================
export const typography = {
  xs: {
    fontSize: '0.75rem',
    // 12px
    lineHeight: '1rem',
    fontWeight: 400
  },
  sm: {
    fontSize: '0.875rem',
    // 14px
    lineHeight: '1.25rem',
    fontWeight: 400
  },
  base: {
    fontSize: '1rem',
    // 16px
    lineHeight: '1.5rem',
    fontWeight: 400
  },
  lg: {
    fontSize: '1.125rem',
    // 18px
    lineHeight: '1.75rem',
    fontWeight: 500
  },
  xl: {
    fontSize: '1.25rem',
    // 20px
    lineHeight: '1.75rem',
    fontWeight: 600
  },
  '2xl': {
    fontSize: '1.5rem',
    // 24px
    lineHeight: '2rem',
    fontWeight: 700
  },
  '3xl': {
    fontSize: '1.875rem',
    // 30px
    lineHeight: '2.25rem',
    fontWeight: 700
  },
  '4xl': {
    fontSize: '2.25rem',
    // 36px
    lineHeight: '2.5rem',
    fontWeight: 800
  },
  mono: {
    fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
  },
  sans: {
    fontFamily: 'Plus Jakarta Sans, system-ui, -apple-system, sans-serif'
  }
} as const;

// ============================================================================
// ICON SIZES
// ============================================================================
export const iconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 40
} as const;

// ============================================================================
// ANIMATIONS & TRANSITIONS
// ============================================================================
export const animations = {
  duration: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
    slower: '500ms'
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    ease: 'ease-in-out',
    easeIn: 'ease-in',
    easeOut: 'ease-out'
  }
} as const;

// ============================================================================
// COLOR SYSTEM (Synchronized with CSS variables)
// ============================================================================
export const colors = {
  // Primary Colors
  primary: '#BEF264',
  // Lime (Main accent)
  primarySoft: '#BEF264',
  primaryNeon: '#CCFF00',
  // Secondary Colors
  secondary: '#22D3EE',
  // Cyan
  accent: '#F97316',
  // Orange

  // Semantic Colors
  danger: '#EF4444',
  // Red
  success: '#22C55E',
  // Emerald
  warning: '#F59E0B',
  // Amber
  info: '#3B82F6',
  // Blue

  // Additional Accents
  emerald: '#6EE7B7',
  rose: '#FB7185',
  amber: '#FBBF24',
  purple: '#8B5CF6',
  // Background & Surfaces
  background: '#0A0A0A',
  // Main background
  surface: '#111111',
  // Card background
  surfaceElevated: '#141414',
  // Elevated elements

  // Borders & Overlays
  border: 'rgba(255, 255, 255, 0.1)',
  borderSubtle: 'rgba(255, 255, 255, 0.06)',
  borderMedium: 'rgba(255, 255, 255, 0.12)',
  borderStrong: 'rgba(255, 255, 255, 0.18)',
  // Glass Effect
  glass: 'rgba(255, 255, 255, 0.05)',
  glassMedium: 'rgba(255, 255, 255, 0.08)',
  glassStrong: 'rgba(255, 255, 255, 0.12)',
  // Text Colors
  foreground: '#FFFFFF',
  muted: 'rgba(255, 255, 255, 0.6)',
  subtle: 'rgba(255, 255, 255, 0.4)'
} as const;

// ============================================================================
// SHADOWS & EFFECTS
// ============================================================================
export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
  md: '0 4px 12px rgba(0, 0, 0, 0.4)',
  lg: '0 10px 30px rgba(0, 0, 0, 0.5)',
  xl: '0 20px 50px rgba(0, 0, 0, 0.6)',
  '2xl': '0 25px 60px rgba(0, 0, 0, 0.8)',
  inner: 'inset 0 2px 8px rgba(0, 0, 0, 0.4)',
  innerLg: 'inset 0 4px 16px rgba(0, 0, 0, 0.5)',
  glow: '0 0 30px rgba(190, 242, 100, 0.4)',
  glowLg: '0 0 50px rgba(190, 242, 100, 0.5)'
} as const;

// ============================================================================
// BLUR VALUES
// ============================================================================
export const blur = {
  none: '0',
  sm: '4px',
  md: '12px',
  lg: '20px',
  xl: '24px',
  '2xl': '40px',
  '3xl': '64px'
} as const;

// ============================================================================
// Z-INDEX LAYERS
// ============================================================================
export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70
} as const;

// ============================================================================
// BREAKPOINTS (Match Tailwind config)
// ============================================================================
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;

// ============================================================================
// COMPONENT SPECIFIC TOKENS
// ============================================================================
export const components = {
  sidebar: {
    width: '280px',
    widthCollapsed: '80px'
  },
  header: {
    height: '64px'
  },
  card: {
    padding: {
      sm: spacing.md,
      md: spacing.lg,
      lg: spacing.xl
    },
    radius: radius.lg,
    borderWidth: '1px'
  },
  button: {
    padding: {
      sm: '8px 16px',
      md: '12px 24px',
      lg: '16px 32px'
    },
    radius: radius.md,
    height: {
      sm: '32px',
      md: '40px',
      lg: '48px'
    }
  },
  input: {
    padding: '12px 16px',
    radius: radius.md,
    height: '44px'
  },
  badge: {
    padding: '4px 12px',
    radius: radius.full
  }
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================
export type Spacing = keyof typeof spacing;
export type Radius = keyof typeof radius;
export type Typography = keyof typeof typography;
export type IconSize = keyof typeof iconSizes;
export type Color = keyof typeof colors;
export type Shadow = keyof typeof shadows;
export type Blur = keyof typeof blur;
export type ZIndex = keyof typeof zIndex;
export type Breakpoint = keyof typeof breakpoints;