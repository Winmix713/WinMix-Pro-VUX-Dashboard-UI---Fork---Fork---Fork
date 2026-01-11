import { useCallback, useMemo } from 'react';
import { useBrandBook } from '../context/BrandBookContext';
import type { ElementType, CustomStyle } from '../types';

/**
 * Hook for managing element inspection and style editing
 */
export const useElementInspector = () => {
  const {
    state,
    selectElement,
    updateStyle
  } = useBrandBook();

  // ✅ Opens inspector with element and callbacks
  const openInspector = useCallback((element: ElementType) => {
    selectElement(element);
  }, [selectElement]);

  // ✅ Opens inspector instead of just selecting
  const handleElementClick = useCallback((e: React.MouseEvent, element: ElementType) => {
    e.stopPropagation();
    openInspector(element);
  }, [openInspector]);
  const handleStyleChange = useCallback((elementId: string, property: string, value: any) => {
    updateStyle(elementId, property, value);
  }, [updateStyle]);
  const getElementStyle = useCallback((elementId: string): CustomStyle => {
    return state.customStyles[elementId] || {};
  }, [state.customStyles]);

  // ✅ ENHANCED: Apply custom styles with proper transform handling
  const applyCustomStyles = useCallback((elementId: string) => {
    const customStyle = state.customStyles[elementId] || {};

    // ✅ Log what we're returning
    console.log('🔍 applyCustomStyles:', {
      elementId,
      customStyle,
      hasStyle: !!customStyle.style,
      hasTransform: !!customStyle.style?.transform,
      transform: customStyle.style?.transform
    });
    return {
      className: customStyle.classes || '',
      content: customStyle.content,
      style: customStyle.style || {}
    };
  }, [state.customStyles]);
  return {
    selectedElement: state.selectedElement,
    inspectorOpen: state.inspectorOpen,
    handleElementClick,
    handleStyleChange,
    getElementStyle,
    openInspector,
    applyCustomStyles
  };
};