import React, { useMemo, memo, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Edit3, Palette } from 'lucide-react';
import { useBrandBook } from '../../context/BrandBookContext';
import { useElementInspector } from '../../hooks/useElementInspector';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { CARD_CLASSES, ANIMATION_VARIANTS } from '../../constants';
import type { ColorSwatchProps } from '../../types';

/**
 * ColorSwatch Component - Interactive color display with copy and edit functionality
 * 
 * Features:
 * - Click to copy color value
 * - Shift+Click to open Property Inspector
 * - Hover effects with glow animation
 * - Keyboard accessible
 * - Visual feedback for copied state
 * - Custom styles support via Inspector
 * 
 * @example
 * ```tsx
 * <ColorSwatch
 *   name="Primary Blue"
 *   value="#3B82F6"
 *   description="Main brand color"
 * />
 * ```
 */
export const ColorSwatch: React.FC<ColorSwatchProps> = memo(({
  name,
  value,
  description,
}) => {
  const { state, setCopiedColor } = useBrandBook();
  const { handleElementClick, applyCustomStyles, isElementSelected } = useElementInspector();
  const { copy } = useCopyToClipboard();

  // Local hover state for enhanced interactions
  const [isHovered, setIsHovered] = useState(false);

  // Generate stable element ID
  const elementId = useMemo(
    () => `color-${name.toLowerCase().replace(/\s+/g, '-')}`,
    [name]
  );

  // Get custom styles with memoization
  const customStyles = useMemo(
    () => applyCustomStyles(elementId),
    [applyCustomStyles, elementId]
  );

  // Check if currently selected in inspector
  const isSelected = useMemo(
    () => isElementSelected(elementId),
    [isElementSelected, elementId]
  );

  // Check if this color was just copied
  const isCopied = useMemo(
    () => state.copiedColor === name,
    [state.copiedColor, name]
  );

  /**
   * Handle click with dual behavior:
   * - Shift+Click: Open inspector
   * - Regular Click: Copy color
   */
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.shiftKey) {
        // Open inspector for editing
        handleElementClick(e, {
          type: 'ColorSwatch',
          id: elementId,
          label: name,
          classes: `${CARD_CLASSES.GLASS} ${CARD_CLASSES.PADDING_SM}`,
          content: name,
          metadata: {
            colorValue: value,
            colorName: name,
            description,
          },
        });
      } else {
        // Copy color to clipboard
        copy(value, name);
        setCopiedColor(name);
        
        // Auto-clear copied state after 2s
        setTimeout(() => setCopiedColor(null), 2000);
      }
    },
    [handleElementClick, elementId, name, value, description, copy, setCopiedColor]
  );

  /**
   * Keyboard handler for accessibility
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        
        // Shift+Enter/Space opens inspector
        if (e.shiftKey) {
          handleElementClick(e as any, {
            type: 'ColorSwatch',
            id: elementId,
            label: name,
            classes: `${CARD_CLASSES.GLASS} ${CARD_CLASSES.PADDING_SM}`,
            content: name,
          });
        } else {
          // Regular Enter/Space copies color
          copy(value, name);
          setCopiedColor(name);
          setTimeout(() => setCopiedColor(null), 2000);
        }
      }
    },
    [handleElementClick, elementId, name, value, copy, setCopiedColor]
  );

  /**
   * Generate dynamic shadow based on color
   */
  const glowShadow = useMemo(
    () => `0 0 20px ${value}80, 0 0 40px ${value}40`,
    [value]
  );

  return (
    <motion.div
      {...ANIMATION_VARIANTS.scaleIn}
      whileHover={{
        scale: 1.05,
        y: -4,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      className={`
        ${CARD_CLASSES.GLASS} 
        ${CARD_CLASSES.PADDING_SM} 
        cursor-pointer 
        group 
        relative 
        overflow-hidden
        ${isSelected ? 'ring-2 ring-[#BEF264] ring-offset-2 ring-offset-zinc-900' : ''}
        ${customStyles.className}
      `}
      style={customStyles.style}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`${name} color: ${value}. Click to copy, Shift+Click to edit`}
      aria-pressed={isSelected}
      onKeyDown={handleKeyDown}
    >
      {/* Edit Icon Indicator */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-2 right-2 z-20"
          >
            <Edit3 
              className="w-3 h-3 text-[#BEF264] drop-shadow-lg" 
              aria-hidden="true" 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Radial Gradient Glow Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: `radial-gradient(circle at center, ${value}15, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Color Preview Box */}
        <motion.div
          className="w-full h-20 sm:h-24 rounded-xl mb-3 border border-white/10 shadow-inner relative overflow-hidden"
          style={{
            backgroundColor: value,
          }}
          animate={{
            boxShadow: isHovered ? glowShadow : '0 0 0 rgba(0,0,0,0)',
          }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        >
          {/* Shimmer Effect on Hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: isHovered ? '100%' : '-100%' }}
            transition={{
              duration: 0.6,
              ease: 'easeInOut',
            }}
          />

          {/* Color Palette Icon (subtle) */}
          <div className="absolute top-2 left-2 opacity-10">
            <Palette className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
        </motion.div>

        {/* Header: Name + Copy/Check Icon */}
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-sm font-bold text-white truncate pr-2">
            {customStyles.children || name}
          </h4>
          
          <AnimatePresence mode="wait">
            {isCopied ? (
              <motion.div
                key="check"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3, type: 'spring' }}
                aria-live="polite"
                aria-atomic="true"
              >
                <Check 
                  className="w-4 h-4 text-[#BEF264]" 
                  aria-label="Copied to clipboard" 
                />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Copy 
                  className="w-4 h-4 text-zinc-500" 
                  aria-hidden="true" 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Color Value (Hex Code) */}
        <p className="text-xs font-mono text-zinc-400 tracking-wide">
          {value}
        </p>

        {/* Description (Optional) */}
        {description && (
          <motion.p
            className="text-xs text-zinc-500 mt-1 line-clamp-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* Shift+Click Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-2 left-2 text-[8px] text-zinc-600 font-medium bg-zinc-800/50 px-2 py-1 rounded backdrop-blur-sm"
            aria-hidden="true"
          >
            ⇧ Shift+Click to edit
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Indicator (Visual Ring) */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            boxShadow: `0 0 0 2px #BEF264, 0 0 20px #BEF26480`,
          }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
});

ColorSwatch.displayName = 'ColorSwatch';
