import React, { useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Edit3 } from 'lucide-react';
import { useBrandBook } from '../../context/BrandBookContext';
import { useElementInspector } from '../../hooks/useElementInspector';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { CARD_CLASSES, ANIMATION_VARIANTS } from '../../constants';
import type { ColorSwatchProps } from '../../types';
export const ColorSwatch: React.FC<ColorSwatchProps> = memo(({
  name,
  value,
  description
}) => {
  const {
    state,
    setCopiedColor
  } = useBrandBook();
  const {
    handleElementClick,
    applyCustomStyles
  } = useElementInspector();
  const {
    copy
  } = useCopyToClipboard();
  const elementId = `color-${name.toLowerCase().replace(/\s+/g, '-')}`;
  const customStyles = useMemo(() => applyCustomStyles(elementId), [applyCustomStyles, elementId]);
  const handleClick = (e: React.MouseEvent) => {
    if (e.shiftKey) {
      handleElementClick(e, {
        type: 'ColorSwatch',
        id: elementId,
        classes: `${CARD_CLASSES.GLASS} ${CARD_CLASSES.PADDING_SM}`,
        content: name
      });
    } else {
      copy(value, name);
      setCopiedColor(name);
    }
  };
  return <motion.div {...ANIMATION_VARIANTS.scaleIn} whileHover={{
    scale: 1.05,
    y: -4
  }} whileTap={{
    scale: 0.98
  }} transition={{
    type: 'spring',
    stiffness: 300,
    damping: 20
  }} className={`${CARD_CLASSES.GLASS} ${CARD_CLASSES.PADDING_SM} cursor-pointer group relative overflow-hidden ${customStyles.className}`} style={customStyles.style} onClick={handleClick} role="button" tabIndex={0} aria-label={`${name} color: ${value}. Click to copy, Shift+Click to edit`} onKeyDown={e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      copy(value, name);
      setCopiedColor(name);
    }
  }}>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Edit3 className="w-3 h-3 text-[#BEF264]" aria-hidden="true" />
        </div>

        <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
      background: `radial-gradient(circle at center, ${value}15, transparent 70%)`
    }} aria-hidden="true" />

        <div className="relative z-10">
          <motion.div className="w-full h-20 sm:h-24 rounded-xl mb-3 border border-white/10 shadow-inner relative overflow-hidden" style={{
        backgroundColor: value
      }} whileHover={{
        boxShadow: `0 0 20px ${value}80`
      }} aria-hidden="true">
            <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" initial={{
          x: '-100%'
        }} whileHover={{
          x: '100%'
        }} transition={{
          duration: 0.6
        }} />
          </motion.div>

          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-bold text-white">
              {customStyles.content || name}
            </h4>
            <motion.div initial={false} animate={{
          scale: state.copiedColor === name ? [1, 1.2, 1] : 1
        }} transition={{
          duration: 0.3
        }} aria-live="polite" aria-atomic="true">
              {state.copiedColor === name ? <Check className="w-4 h-4 text-[#BEF264]" aria-label="Copied" /> : <Copy className="w-4 h-4 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />}
            </motion.div>
          </div>
          <p className="text-xs font-mono text-zinc-400">{value}</p>
          {description && <p className="text-xs text-zinc-500 mt-1">{description}</p>}
        </div>

        <div className="absolute bottom-2 left-2 text-[8px] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
          Shift+Click to edit
        </div>
      </motion.div>;
});
ColorSwatch.displayName = 'ColorSwatch';