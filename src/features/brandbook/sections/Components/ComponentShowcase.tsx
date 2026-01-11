import React, { memo, Component } from 'react';
import { motion } from 'framer-motion';
import { Edit3 } from 'lucide-react';
import { ANIMATION_VARIANTS, CARD_CLASSES } from '../../constants';
import { useElementInspector } from '../../hooks/useElementInspector';
import type { ComponentShowcaseProps } from '../../types';
export const ComponentShowcase: React.FC<ComponentShowcaseProps> = memo(({
  title,
  description,
  children
}) => {
  const {
    handleElementClick,
    getElementStyle
  } = useElementInspector();
  const elementId = `showcase-${title.toLowerCase().replace(/\s+/g, '-')}`;
  const customStyle = getElementStyle(elementId);
  return <motion.div {...ANIMATION_VARIANTS.fadeInUp} transition={{
    duration: 0.5
  }} className={`${CARD_CLASSES.GLASS} ${CARD_CLASSES.PADDING_LG} mb-6 group relative ${customStyle.classes || ''}`} style={customStyle.style || {}} role="region" aria-label={title} onClick={e => e.shiftKey && handleElementClick(e, {
    type: 'Component',
    id: elementId,
    classes: `${CARD_CLASSES.GLASS} ${CARD_CLASSES.PADDING_LG} mb-6`,
    content: title
  })}>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Edit3 className="w-3 h-3 text-[#BEF264]" aria-hidden="true" />
        </div>

        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            {customStyle.content || title}
          </h3>
          <p className="text-sm text-zinc-400">{description}</p>
        </div>
        <div className="bg-[#0A0A0A] rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/5">
          {children}
        </div>

        <div className="absolute bottom-2 left-2 text-[8px] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
          Shift+Click to edit
        </div>
      </motion.div>;
});
ComponentShowcase.displayName = 'ComponentShowcase';