/**
 * BrandBook Feature - Public API
 * Central export point for all BrandBook components, hooks, and utilities
 */

// Context & Provider
export { BrandBookProvider, useBrandBook } from './context/BrandBookContext';

// Hooks
export { useCopyToClipboard } from './hooks/useCopyToClipboard';
export { useElementInspector } from './hooks/useElementInspector';
export { useTabNavigation } from './hooks/useTabNavigation';

// Components
export { BrandBookHero } from './components/BrandBookHero';
export { BrandBookNavigation } from './components/BrandBookNavigation';
export { BrandBookFooter } from './components/BrandBookFooter';

// Tabs
export { OverviewTab } from './tabs/OverviewTab';
export { ColorsTab } from './tabs/ColorsTab';
export { TypographyTab } from './tabs/TypographyTab';
export { ComponentsTab } from './tabs/ComponentsTab';
export { PatternsTab } from './tabs/PatternsTab';

// Sections
export { ColorPalette } from './sections/ColorPalette';
export { Typography } from './sections/Typography';
export { Components } from './sections/Components';
export { Patterns } from './sections/Patterns';

// Types
export type { TabType, ElementType, CustomStyle, BrandBookState, BrandBookAction, ColorSwatchProps, TypographyExampleProps, ComponentShowcaseProps, TabConfig } from './types';

// Constants
export { MODIFIER_KEYS, CARD_CLASSES, ANIMATION_VARIANTS, TABS } from './constants';