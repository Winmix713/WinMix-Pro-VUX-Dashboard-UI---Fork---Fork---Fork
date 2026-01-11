import React, { useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { Copy, Edit3 } from 'lucide-react';
import { typography } from '../../../../constants/designTokens';
import { useBrandBook } from '../../context/BrandBookContext';
import { useElementInspector } from '../../hooks/useElementInspector';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { CARD_CLASSES, ANIMATION_VARIANTS } from '../../constants';
import type { TypographyExampleProps } from '../../types';
export const TypographyExample: React.FC<TypographyExampleProps> = memo(({
  level,
  example
}) => {
  const styles = typography[level as keyof typeof typography];
  const elementId = `typo-${level}`;
  const {
    handleElementClick,
    applyCustomStyles
  } = useElementInspector();
  const {
    copy
  } = useCopyToClipboard();
  const customStyles = useMemo(() => applyCustomStyles(elementId), [applyCustomStyles, elementId]);
  return <motion.div {...ANIMATION_VARIANTS.fadeInLeft} transition={{
    duration: 0.4
  }} className={`${CARD_CLASSES.GLASS} ${CARD_CLASSES.PADDING_MD} mb-4 hover:border-white/20 transition-all group relative ${customStyles.className}`} style={customStyles.style} onClick={e => e.shiftKey && handleElementClick(e, {
    type: 'Typography',
    id: elementId,
    classes: `${CARD_CLASSES.GLASS} ${CARD_CLASSES.PADDING_MD} mb-4`,
    content: example
  })} role="article" aria-label={`${level.toUpperCase()} typography example`}>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-2">
          <div>
            <h4 className="text-sm font-bold text-[#BEF264] mb-1">
              {level.toUpperCase()}
            </h4>
            <p className="text-xs text-zinc-500 font-mono">
              {typeof styles === 'object' && 'fontSize' in styles ? `${styles.fontSize} / ${styles.lineHeight} / ${styles.fontWeight}` : 'Font Family'}
            </p>
          </div>
          <motion.button whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }} onClick={e => {
        e.stopPropagation();
        copy(typeof styles === 'object' && 'fontSize' in styles ? styles.fontSize : styles.fontFamily, level);
      }} className="p-2 rounded-lg hover:bg-white/5 transition-colors" aria-label={`Copy ${level} font size`}>
            <Copy className="w-4 h-4 text-zinc-500" />
          </motion.button>
        </div>
        <p className="text-white group-hover:text-[#BEF264] transition-colors duration-300" style={typeof styles === 'object' && 'fontSize' in styles ? {
      fontSize: styles.fontSize,
      lineHeight: styles.lineHeight,
      fontWeight: styles.fontWeight
    } : {
      fontFamily: styles.fontFamily
    }}>
          {customStyles.content || example}
        </p>

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Edit3 className="w-3 h-3 text-[#BEF264]" aria-hidden="true" />
        </div>
        <div className="absolute bottom-2 right-2 text-[8px] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
          Shift+Click to edit
        </div>
      </motion.div>;
});
TypographyExample.displayName = 'TypographyExample';