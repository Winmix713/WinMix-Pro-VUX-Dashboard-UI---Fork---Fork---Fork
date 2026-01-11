import React, { Component } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PropertyInspector } from '../components/PropertyInspector';
import { BrandBookProvider, useBrandBook, BrandBookHero, BrandBookNavigation, BrandBookFooter, OverviewTab, ColorsTab, TypographyTab, ComponentsTab, PatternsTab } from '../features/brandbook';
// ============================================================================
// BRANDBOOK CONTENT COMPONENT
// ============================================================================
const BrandBookContent: React.FC = () => {
  const {
    state,
    selectElement,
    updateStyle
  } = useBrandBook();
  const renderActiveTab = () => {
    switch (state.activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'colors':
        return <ColorsTab />;
      case 'typography':
        return <TypographyTab />;
      case 'components':
        return <ComponentsTab />;
      case 'patterns':
        return <PatternsTab />;
      default:
        return null;
    }
  };
  return <div className="min-h-screen bg-[#0A0A0A] text-white relative">
      {/* Property Inspector */}
      <AnimatePresence>
        {state.inspectorOpen && state.selectedElement && <motion.div initial={{
        opacity: 0,
        x: 20
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: 20
      }} transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }} className="fixed top-20 right-4 z-50" role="dialog" aria-label="Style Inspector" aria-modal="true">
            <PropertyInspector selectedElement={state.selectedElement} onStyleChange={(property, value) => {
          if (state.selectedElement) {
            updateStyle(state.selectedElement.id, property, value);
          }
        }} onClose={() => selectElement(null)} />
          </motion.div>}
      </AnimatePresence>

      <BrandBookHero />
      <BrandBookNavigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <AnimatePresence mode="wait">{renderActiveTab()}</AnimatePresence>
      </main>

      <BrandBookFooter />

      {/* Custom scrollbar styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>;
};
// ============================================================================
// MAIN BRANDBOOK COMPONENT WITH PROVIDER
// ============================================================================
const BrandBook: React.FC = () => {
  return <BrandBookProvider>
      <BrandBookContent />
    </BrandBookProvider>;
};
export default BrandBook;