/**
 * BrandBook Feature Types
 * All TypeScript types and interfaces for the BrandBook feature
 */

// ============================================================================
// TAB TYPES
// ============================================================================
export type TabType = 'overview' | 'colors' | 'typography' | 'components' | 'patterns';

// ============================================================================
// ELEMENT TYPES
// ============================================================================
export type ElementType = {
  type: 'ColorSwatch' | 'Typography' | 'Component';
  id: string;
  classes: string;
  content?: string;
};
export type CustomStyle = {
  classes?: string;
  content?: string;
  style?: React.CSSProperties;
  transforms?: Record<string, string>; // ✅ NEW: Track transforms separately
  [key: string]: any;
};

// ============================================================================
// STATE TYPES
// ============================================================================
export type BrandBookState = {
  copiedColor: string | null;
  activeTab: TabType;
  animationPlaying: boolean;
  inspectorOpen: boolean;
  selectedElement: ElementType | null;
  customStyles: Record<string, CustomStyle>;
  searchQuery: string;
};
export type BrandBookAction = {
  type: 'SET_COPIED_COLOR';
  payload: string | null;
} | {
  type: 'SET_ACTIVE_TAB';
  payload: TabType;
} | {
  type: 'TOGGLE_ANIMATION';
} | {
  type: 'TOGGLE_INSPECTOR';
} | {
  type: 'SET_SELECTED_ELEMENT';
  payload: ElementType | null;
} | {
  type: 'UPDATE_CUSTOM_STYLE';
  payload: {
    elementId: string;
    property: string;
    value: any;
  };
} | {
  type: 'SET_SEARCH_QUERY';
  payload: string;
};

// ============================================================================
// COMPONENT PROPS TYPES
// ============================================================================
export interface ColorSwatchProps {
  name: string;
  value: string;
  description?: string;
}
export interface TypographyExampleProps {
  level: string;
  example: string;
}
export interface ComponentShowcaseProps {
  title: string;
  description: string;
  children: React.ReactNode;
}
export interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ComponentType<any>;
}