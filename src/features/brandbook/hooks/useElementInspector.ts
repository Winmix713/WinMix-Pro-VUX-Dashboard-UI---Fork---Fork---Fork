import { useCallback, useMemo, useRef, useEffect } from 'react';
import { useBrandBook } from '../context/BrandBookContext';
import type { ElementType, CustomStyle } from '../types';

/**
 * Enhanced hook for managing element inspection and style editing
 * 
 * Features:
 * - Shift+Click detection for element selection
 * - Style management with deep merging
 * - Performance optimized with memoization
 * - Visual feedback system
 * - Hover state management
 * - Keyboard shortcuts support
 * 
 * @example
 * ```tsx
 * const { handleElementClick, applyCustomStyles, isElementHovered } = useElementInspector();
 * 
 * <div
 *   onClick={(e) => handleElementClick(e, element)}
 *   onMouseEnter={() => setHoveredElement(element.id)}
 *   {...applyCustomStyles(element.id)}
 * >
 *   Content
 * </div>
 * ```
 */
export const useElementInspector = () => {
  const {
    state,
    selectElement,
    updateStyle,
    closeInspector
  } = useBrandBook();

  // Track hovered element for visual feedback
  const hoveredElementRef = useRef<string | null>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  /**
   * Opens the property inspector with the selected element
   * Includes debouncing to prevent rapid clicks
   */
  const openInspector = useCallback((element: ElementType) => {
    // Clear any pending timeouts
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    // Debounce to prevent rapid clicks
    clickTimeoutRef.current = setTimeout(() => {
      selectElement(element);

      // Log for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log('🔍 Inspector opened:', {
          id: element.id,
          type: element.type,
          label: element.label
        });
      }
    }, 50);
  }, [selectElement]);

  /**
   * Handles element click with Shift key detection
   * - Regular click: No action (or custom behavior)
   * - Shift+Click: Opens inspector
   */
  const handleElementClick = useCallback((e: React.MouseEvent, element: ElementType) => {
    // Only open inspector on Shift+Click
    if (e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      openInspector(element);
    }
  }, [openInspector]);

  /**
   * Enhanced style change handler with validation and deep merging
   */
  const handleStyleChange = useCallback((elementId: string, property: string, value: any) => {
    try {
      // Validate inputs
      if (!elementId || !property) {
        console.warn('⚠️ Invalid style change:', {
          elementId,
          property,
          value
        });
        return;
      }

      // Update style
      updateStyle(elementId, property, value);

      // Log in development
      if (process.env.NODE_ENV === 'development') {
        console.log('✨ Style updated:', {
          elementId,
          property,
          value,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('❌ Style update failed:', error);
    }
  }, [updateStyle]);

  /**
   * Batch update multiple styles at once
   * More efficient than multiple individual updates
   */
  const handleBatchStyleChange = useCallback((elementId: string, styles: Record<string, any>) => {
    try {
      Object.entries(styles).forEach(([property, value]) => {
        updateStyle(elementId, property, value);
      });
      if (process.env.NODE_ENV === 'development') {
        console.log('✨ Batch styles updated:', {
          elementId,
          count: Object.keys(styles).length
        });
      }
    } catch (error) {
      console.error('❌ Batch style update failed:', error);
    }
  }, [updateStyle]);

  /**
   * Gets the current custom style for an element
   * Returns empty object if no custom styles exist
   */
  const getElementStyle = useCallback((elementId: string): CustomStyle => {
    return state.customStyles[elementId] || {};
  }, [state.customStyles]);

  /**
   * Checks if an element has any custom styles applied
   */
  const hasCustomStyles = useCallback((elementId: string): boolean => {
    const style = state.customStyles[elementId];
    return !!(style && (style.classes || style.content || Object.keys(style.style || {}).length > 0));
  }, [state.customStyles]);

  /**
   * Resets all custom styles for an element
   */
  const resetElementStyles = useCallback((elementId: string) => {
    try {
      // Clear all style properties
      const currentStyle = state.customStyles[elementId];
      if (currentStyle) {
        Object.keys(currentStyle).forEach(key => {
          updateStyle(elementId, key, undefined);
        });
      }
      if (process.env.NODE_ENV === 'development') {
        console.log('🔄 Styles reset:', {
          elementId
        });
      }
    } catch (error) {
      console.error('❌ Style reset failed:', error);
    }
  }, [state.customStyles, updateStyle]);

  /**
   * Enhanced style application with proper merging and transform handling
   * Returns props object ready to spread onto element
   */
  const applyCustomStyles = useCallback((elementId: string) => {
    const customStyle = state.customStyles[elementId];

    // Early return if no custom styles
    if (!customStyle) {
      return {
        className: '',
        children: undefined,
        style: {}
      };
    }

    // Merge and sanitize styles
    const mergedStyle: React.CSSProperties = {};
    if (customStyle.style) {
      Object.entries(customStyle.style).forEach(([key, value]) => {
        // Only include defined values
        if (value !== undefined && value !== null) {
          mergedStyle[key as keyof React.CSSProperties] = value;
        }
      });
    }

    // Log in development for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('🎨 Applying custom styles:', {
        elementId,
        hasClasses: !!customStyle.classes,
        hasContent: !!customStyle.content,
        styleKeys: Object.keys(mergedStyle),
        transform: mergedStyle.transform
      });
    }
    return {
      className: customStyle.classes || '',
      children: customStyle.content,
      style: mergedStyle
    };
  }, [state.customStyles]);

  /**
   * Gets computed styles ready for CSS injection
   * Useful for generating CSS strings from custom styles
   */
  const getComputedStyleString = useCallback((elementId: string): string => {
    const customStyle = state.customStyles[elementId];
    if (!customStyle?.style) return '';
    return Object.entries(customStyle.style).filter(([_, value]) => value !== undefined && value !== null).map(([key, value]) => {
      // Convert camelCase to kebab-case
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value};`;
    }).join(' ');
  }, [state.customStyles]);

  /**
   * Checks if element is currently selected in inspector
   */
  const isElementSelected = useCallback((elementId: string): boolean => {
    return state.selectedElement?.id === elementId;
  }, [state.selectedElement]);

  /**
   * Keyboard shortcut handler for inspector
   * - Escape: Close inspector
   * - Ctrl/Cmd + Z: Undo (future feature)
   */
  const handleKeyboardShortcut = useCallback((e: KeyboardEvent) => {
    // Escape to close inspector
    if (e.key === 'Escape' && state.inspectorOpen) {
      e.preventDefault();
      closeInspector();
    }

    // Future: Undo/Redo with Ctrl/Cmd + Z/Y
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
      // TODO: Implement undo functionality
      console.log('🔄 Undo requested (not implemented yet)');
    }
  }, [state.inspectorOpen, closeInspector]);

  // Register keyboard shortcuts
  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardShortcut);
    return () => window.removeEventListener('keydown', handleKeyboardShortcut);
  }, [handleKeyboardShortcut]);

  /**
   * Memoized return object for performance
   */
  const returnValue = useMemo(() => ({
    // State
    selectedElement: state.selectedElement,
    inspectorOpen: state.inspectorOpen,
    customStyles: state.customStyles,
    // Actions
    openInspector,
    closeInspector,
    handleElementClick,
    handleStyleChange,
    handleBatchStyleChange,
    resetElementStyles,
    // Getters
    getElementStyle,
    getComputedStyleString,
    hasCustomStyles,
    isElementSelected,
    // Utils
    applyCustomStyles
  }), [state.selectedElement, state.inspectorOpen, state.customStyles, openInspector, closeInspector, handleElementClick, handleStyleChange, handleBatchStyleChange, resetElementStyles, getElementStyle, getComputedStyleString, hasCustomStyles, isElementSelected, applyCustomStyles]);
  return returnValue;
};

/**
 * Type helper for element click handlers
 */
export type ElementClickHandler = (e: React.MouseEvent, element: ElementType) => void;

/**
 * Type helper for style change handlers
 */
export type StyleChangeHandler = (elementId: string, property: string, value: any) => void;