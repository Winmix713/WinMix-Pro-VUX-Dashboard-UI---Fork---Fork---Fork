import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { Edit3 } from 'lucide-react';
import { useElementInspector } from '../../hooks/useElementInspector';
import { CARD_CLASSES } from '../../constants';
export const ColorUsageGuidelines: React.FC = () => {
  const {
    handleElementClick,
    getElementStyle
  } = useElementInspector();
  const guidelines = [{
    color: '#BEF264',
    title: 'Primary (#BEF264)',
    desc: 'Use for primary actions, highlights, active states, and key UI elements. Provides high contrast against dark backgrounds.'
  }, {
    color: '#22D3EE',
    title: 'Secondary (#22D3EE)',
    desc: 'Use for secondary actions, informational elements, and complementary accents.'
  }, {
    color: 'rgba(255, 255, 255, 0.1)',
    title: 'Glass Effects',
    desc: 'Use rgba(255, 255, 255, 0.05-0.12) for glassmorphism effects with backdrop-blur.'
  }];
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} className={`${CARD_CLASSES.GLASS} p-6 sm:p-8`}>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
        Usage Guidelines
      </h3>
      <div className="space-y-4">
        {guidelines.map((guideline, index) => {
        const elementId = `guideline-${guideline.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        const customStyle = getElementStyle(elementId);
        return <motion.div key={guideline.title} initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: index * 0.1
        }} className={`flex items-start gap-3 group relative ${customStyle.classes || ''}`} onClick={e => e.shiftKey && handleElementClick(e, {
          type: 'Component',
          id: elementId,
          classes: 'flex items-start gap-3',
          content: guideline.title
        })}>
              <motion.div whileHover={{
            scale: 1.5
          }} className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{
            backgroundColor: guideline.color
          }} aria-hidden="true" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white mb-1 group-hover:text-[#BEF264] transition-colors">
                  {customStyle.content || guideline.title}
                </p>
                <p className="text-sm text-zinc-400">{guideline.desc}</p>
              </div>
              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit3 className="w-2.5 h-2.5 text-[#BEF264]" aria-hidden="true" />
              </div>
            </motion.div>;
      })}
      </div>
    </motion.div>;
};