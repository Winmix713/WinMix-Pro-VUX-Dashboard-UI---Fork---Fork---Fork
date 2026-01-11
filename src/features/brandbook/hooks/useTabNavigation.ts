import { useCallback } from 'react';
import { useBrandBook } from '../context/BrandBookContext';
import type { TabType } from '../types';
import { TABS } from '../constants/tabs';

/**
 * Hook for managing tab navigation with keyboard support
 */
export const useTabNavigation = () => {
  const {
    state,
    setActiveTab
  } = useBrandBook();
  const handleTabKeyDown = useCallback((e: React.KeyboardEvent, tabId: TabType) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTab(tabId);
    }
    const tabs = TABS.map(t => t.id);
    const currentIndex = tabs.findIndex(t => t === state.activeTab);
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % tabs.length;
      setActiveTab(tabs[nextIndex]);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      setActiveTab(tabs[nextIndex]);
    }
  }, [state.activeTab, setActiveTab]);
  return {
    activeTab: state.activeTab,
    setActiveTab,
    handleTabKeyDown
  };
};