import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Edit3 } from 'lucide-react';
import { TypographyExample } from './TypographyExample';
import { typography } from '../../../../constants/designTokens';
import { useElementInspector } from '../../hooks/useElementInspector';
import { CARD_CLASSES } from '../../constants';
export const Typography: React.FC = () => {
  const {
    handleElementClick,
    getElementStyle
  } = useElementInspector();
  const fontFamilies = [{
    label: 'Sans Serif (Primary)',
    name: 'Plus Jakarta Sans',
    family: typography.sans.fontFamily,
    usage: 'Used for headings, body text, and UI elements'
  }, {
    label: 'Monospace (Data)',
    name: 'JetBrains Mono',
    family: typography.mono.fontFamily,
    usage: 'Used for numbers, code, and data display'
  }];
  const bestPractices = [{
    title: 'Hierarchy',
    desc: 'Use size, weight, and color to establish clear visual hierarchy'
  }, {
    title: 'Contrast',
    desc: 'Maintain 4.5:1 contrast ratio for body text, 3:1 for large text'
  }, {
    title: 'Line Height',
    desc: 'Use 1.5-1.75 line height for body text for optimal readability'
  }, {
    title: 'Letter Spacing',
    desc: 'Tighten tracking for large headings, increase for small caps'
  }, {
    title: 'Tabular Nums',
    desc: 'Use monospace font for numbers and data to maintain alignment'
  }];
  return <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
        Typography System
      </h2>

      <div className="mb-12">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
          Font Families
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {fontFamilies.map((font, index) => {
          const elementId = `font-${font.name.toLowerCase().replace(/\s+/g, '-')}`;
          const customStyle = getElementStyle(elementId);
          return <motion.div key={font.name} initial={{
            opacity: 0,
            scale: 0.95
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: index * 0.1
          }} whileHover={{
            scale: 1.02
          }} className={`${CARD_CLASSES.GLASS} p-5 sm:p-6 cursor-pointer group relative ${customStyle.classes || ''}`} style={customStyle.style || {}} onClick={e => e.shiftKey && handleElementClick(e, {
            type: 'Component',
            id: elementId,
            classes: `${CARD_CLASSES.GLASS} p-5 sm:p-6`,
            content: font.name
          })}>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit3 className="w-3 h-3 text-[#BEF264]" aria-hidden="true" />
                </div>
                <h4 className="text-sm font-bold text-[#BEF264] mb-3">
                  {font.label}
                </h4>
                <p className="text-xl sm:text-2xl font-bold text-white mb-2" style={{
              fontFamily: font.family
            }}>
                  {customStyle.content || font.name}
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 font-mono mb-2">
                  {font.family}
                </p>
                <p className="text-xs sm:text-sm text-zinc-500">{font.usage}</p>
                <div className="absolute bottom-2 left-2 text-[8px] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                  Shift+Click to edit
                </div>
              </motion.div>;
        })}
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
          Type Scale
        </h3>
        <TypographyExample level="4xl" example="Display Heading - 36px" />
        <TypographyExample level="3xl" example="Large Heading - 30px" />
        <TypographyExample level="2xl" example="Section Heading - 24px" />
        <TypographyExample level="xl" example="Subsection Heading - 20px" />
        <TypographyExample level="lg" example="Large Body Text - 18px" />
        <TypographyExample level="base" example="Body Text - 16px" />
        <TypographyExample level="sm" example="Small Text - 14px" />
        <TypographyExample level="xs" example="Caption Text - 12px" />
      </div>

      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className={`${CARD_CLASSES.GLASS} p-6 sm:p-8`}>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
          Typography Best Practices
        </h3>
        <div className="space-y-4">
          {bestPractices.map((practice, index) => {
          const elementId = `practice-${practice.title.toLowerCase().replace(/\s+/g, '-')}`;
          const customStyle = getElementStyle(elementId);
          return <motion.div key={practice.title} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: index * 0.05
          }} whileHover={{
            x: 4
          }} className={`flex items-start gap-3 pb-4 border-b border-white/5 last:border-0 group relative ${customStyle.classes || ''}`} style={customStyle.style || {}} onClick={e => e.shiftKey && handleElementClick(e, {
            type: 'Component',
            id: elementId,
            classes: 'flex items-start gap-3 pb-4 border-b border-white/5',
            content: practice.title
          })}>
                <ChevronRight className="w-5 h-5 text-[#BEF264] flex-shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-white mb-1 group-hover:text-[#BEF264] transition-colors">
                    {customStyle.content || practice.title}
                  </p>
                  <p className="text-sm text-zinc-400">{practice.desc}</p>
                </div>
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit3 className="w-2.5 h-2.5 text-[#BEF264]" aria-hidden="true" />
                </div>
              </motion.div>;
        })}
        </div>
      </motion.div>
    </div>;
};