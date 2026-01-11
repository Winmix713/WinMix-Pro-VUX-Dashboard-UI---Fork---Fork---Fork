import React from 'react';
import { motion } from 'framer-motion';
import { useTabNavigation } from '../hooks/useTabNavigation';
import { TABS } from '../constants/tabs';
export const BrandBookNavigation: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    handleTabKeyDown
  } = useTabNavigation();
  return <nav className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10" role="navigation" aria-label="Design system sections">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 sm:gap-2 py-3 sm:py-4 overflow-x-auto scrollbar-hide" role="tablist">
          {TABS.map(tab => {
          const Icon = tab.icon;
          return <motion.button key={tab.id} onClick={() => setActiveTab(tab.id)} onKeyDown={e => handleTabKeyDown(e, tab.id)} whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} className={`
                  flex items-center gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap
                  ${activeTab === tab.id ? 'bg-[#BEF264]/10 text-[#BEF264] border border-[#BEF264]/20' : 'text-zinc-400 hover:text-white hover:bg-white/5'}
                `} role="tab" aria-selected={activeTab === tab.id} aria-controls={`${tab.id}-panel`} id={`${tab.id}-tab`} tabIndex={activeTab === tab.id ? 0 : -1}>
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                <span className="hidden sm:inline">{tab.label}</span>
              </motion.button>;
        })}
        </div>
      </div>
    </nav>;
};