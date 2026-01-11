import React, { useMemo } from 'react';
import { ColorSwatch } from './ColorSwatch';
import { ColorSearchBar } from './ColorSearchBar';
import { ColorUsageGuidelines } from './ColorUsageGuidelines';
import { colors } from '../../../../constants/designTokens';
import { useBrandBook } from '../../context/BrandBookContext';
export const ColorPalette: React.FC = () => {
  const {
    state
  } = useBrandBook();
  const filteredColors = useMemo(() => {
    if (!state.searchQuery) return colors;
    const query = state.searchQuery.toLowerCase();
    return Object.fromEntries(Object.entries(colors).filter(([name]) => name.toLowerCase().includes(query)));
  }, [state.searchQuery]);
  return <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
        Color Palette
      </h2>

      <ColorSearchBar />

      {/* Primary Colors */}
      <div className="mb-12">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
          Primary Colors
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ColorSwatch name="Primary" value={colors.primary} description="Main accent color" />
          <ColorSwatch name="Primary Neon" value={colors.primaryNeon} description="Bright variant" />
          <ColorSwatch name="Primary Soft" value={colors.primarySoft} description="Softer variant" />
        </div>
      </div>

      {/* Secondary Colors */}
      <div className="mb-12">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
          Secondary Colors
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ColorSwatch name="Secondary" value={colors.secondary} description="Cyan accent" />
          <ColorSwatch name="Accent" value={colors.accent} description="Orange accent" />
          <ColorSwatch name="Emerald" value={colors.emerald} description="Success variant" />
        </div>
      </div>

      {/* Semantic Colors */}
      <div className="mb-12">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
          Semantic Colors
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <ColorSwatch name="Success" value={colors.success} description="Positive states" />
          <ColorSwatch name="Warning" value={colors.warning} description="Caution states" />
          <ColorSwatch name="Danger" value={colors.danger} description="Error states" />
          <ColorSwatch name="Info" value={colors.info} description="Information" />
        </div>
      </div>

      {/* Background & Surfaces */}
      <div className="mb-12">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
          Background & Surfaces
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ColorSwatch name="Background" value={colors.background} description="Main background" />
          <ColorSwatch name="Surface" value={colors.surface} description="Card background" />
          <ColorSwatch name="Surface Elevated" value={colors.surfaceElevated} description="Elevated elements" />
        </div>
      </div>

      <ColorUsageGuidelines />
    </div>;
};