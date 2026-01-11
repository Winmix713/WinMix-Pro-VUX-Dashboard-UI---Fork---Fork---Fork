/**
 * BrandBook Tab Configuration
 * Defines the available tabs and their properties
 */

import { Eye, Palette, Type, BoxIcon, Grid3x3 } from 'lucide-react';
import type { TabConfig } from '../types';
export const TABS: TabConfig[] = [{
  id: 'overview',
  label: 'Overview',
  icon: Eye
}, {
  id: 'colors',
  label: 'Colors',
  icon: Palette
}, {
  id: 'typography',
  label: 'Typography',
  icon: Type
}, {
  id: 'components',
  label: 'Components',
  icon: BoxIcon
}, {
  id: 'patterns',
  label: 'Patterns',
  icon: Grid3x3
}];