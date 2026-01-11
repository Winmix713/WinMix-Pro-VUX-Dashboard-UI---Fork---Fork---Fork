import React, { useEffect, useMemo, Component } from 'react';
import { motion } from 'framer-motion';
import { Zap, Layers, Activity } from 'lucide-react';
import { Edit3 } from 'lucide-react';
import { ANIMATION_VARIANTS, CARD_CLASSES } from '../constants';
import { useElementInspector } from '../hooks/useElementInspector';
export const OverviewTab: React.FC = () => {
  const {
    handleElementClick,
    applyCustomStyles
  } = useElementInspector();
  const principles = [{
    icon: Zap,
    title: 'Glassmorphism',
    description: 'Translucent surfaces with backdrop blur create depth and modern aesthetics',
    color: '#BEF264'
  }, {
    icon: Layers,
    title: 'Neon Accents',
    description: 'Vibrant lime green (#BEF264) primary color with glowing effects',
    color: '#22D3EE'
  }, {
    icon: Activity,
    title: 'Data Visualization',
    description: 'Real-time charts, sparklines, and interactive data displays',
    color: '#8B5CF6'
  }];
  const features = [{
    label: 'Design Tokens',
    value: 'Centralized design system'
  }, {
    label: 'Grid System',
    value: '12-column responsive layout'
  }, {
    label: 'Components',
    value: '50+ production-ready components'
  }, {
    label: 'Animations',
    value: 'Framer Motion powered'
  }, {
    label: 'Accessibility',
    value: 'WCAG 2.1 AA compliant'
  }, {
    label: 'Dark Mode',
    value: 'Optimized for dark interfaces'
  }, {
    label: 'TypeScript',
    value: 'Fully typed components'
  }, {
    label: 'Responsive',
    value: 'Mobile-first approach'
  }];
  return <motion.div key="overview" {...ANIMATION_VARIANTS.fadeInUp} transition={{
    duration: 0.4
  }} role="tabpanel" id="overview-panel" aria-labelledby="overview-tab">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
        Design Principles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
        {principles.map((principle, index) => {
        const elementId = `principle-${principle.title.toLowerCase().replace(/\s+/g, '-')}`;
        const customStyles = applyCustomStyles(elementId);
        // ✅ CRITICAL: Log what styles we're applying
        console.log('🎨 Rendering principle card:', {
          elementId,
          customStyles,
          hasTransform: !!customStyles.style?.transform,
          transform: customStyles.style?.transform
        });
        return <motion.article key={principle.title} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.1
        }} whileHover={{
          y: -8,
          scale: 1.02
        }} className={`${CARD_CLASSES.GLASS} p-5 sm:p-6 group hover:border-white/20 transition-all cursor-pointer relative ${customStyles.className}`}
        // ✅ CRITICAL: Apply inline styles with proper merge
        style={{
          willChange: 'transform',
          ...customStyles.style // This now includes transform!
        }} onClick={e => e.shiftKey && handleElementClick(e, {
          type: 'Component',
          id: elementId,
          classes: `${CARD_CLASSES.GLASS} p-5 sm:p-6`,
          content: principle.title
        })}>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit3 className="w-3 h-3 text-[#BEF264]" aria-hidden="true" />
              </div>

              <motion.div whileHover={{
            rotate: 360,
            scale: 1.1
          }} transition={{
            duration: 0.6
          }} className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{
            backgroundColor: `${principle.color}20`,
            border: `1px solid ${principle.color}40`
          }} aria-hidden="true">
                <principle.icon className="w-6 h-6" style={{
              color: principle.color
            }} />
              </motion.div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#BEF264] transition-colors">
                {customStyles.content || principle.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {principle.description}
              </p>

              <div className="absolute bottom-2 left-2 text-[8px] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                Shift+Click to edit
              </div>
            </motion.article>;
      })}
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
        Key Features
      </h2>
      <motion.div initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }} className={`${CARD_CLASSES.GLASS} p-6 sm:p-8 mb-12`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {features.map((feature, index) => {
          const elementId = `feature-${feature.label.toLowerCase().replace(/\s+/g, '-')}`;
          const customStyles = applyCustomStyles(elementId);
          return <motion.div key={feature.label} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: index * 0.05
          }} whileHover={{
            x: 4
          }} className={`flex items-center justify-between py-3 border-b border-white/5 last:border-0 group relative ${customStyles.className}`}
          // ✅ Apply inline styles
          style={customStyles.style} onClick={e => e.shiftKey && handleElementClick(e, {
            type: 'Component',
            id: elementId,
            classes: 'flex items-center justify-between py-3 border-b border-white/5',
            content: feature.label
          })}>
                <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">
                  {customStyles.content || feature.label}
                </span>
                <span className="text-sm font-bold text-white">
                  {feature.value}
                </span>

                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit3 className="w-2.5 h-2.5 text-[#BEF264]" aria-hidden="true" />
                </div>
              </motion.div>;
        })}
        </div>
      </motion.div>
    </motion.div>;
};