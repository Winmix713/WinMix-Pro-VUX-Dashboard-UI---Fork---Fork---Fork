import React, { useCallback, createContext, useContext, useReducer } from 'react';
import type { BrandBookState, BrandBookAction, ElementType, TabType } from '../types';
// ============================================================================
// HELPER FUNCTION: Build Transform String
// ============================================================================
/**
 * Converts transform object to CSS transform string
 * @example { translateX: '10px', rotate: '45deg', scale: '1.2' }
 *          -> 'translateX(10px) rotate(45deg) scale(1.2)'
 */
function buildTransformString(transforms: Record<string, string>): string {
  const transformParts: string[] = [];
  // Order matters for transforms!
  const orderedProps = ['perspective', 'translateX', 'translateY', 'translateZ', 'rotateX', 'rotateY', 'rotateZ', 'rotate', 'scaleX', 'scaleY', 'scaleZ', 'scale', 'skewX', 'skewY'];
  orderedProps.forEach(prop => {
    if (transforms[prop] !== undefined && transforms[prop] !== null) {
      let value = transforms[prop];
      // ✅ Fix value formats
      if (prop === 'scale' || prop === 'scaleX' || prop === 'scaleY' || prop === 'scaleZ') {
        // Convert percentage to decimal: '93%' -> '0.93'
        if (typeof value === 'string' && value.includes('%')) {
          const num = parseFloat(value);
          value = (num / 100).toString();
        }
        transformParts.push(`${prop}(${value})`);
      } else if (prop.includes('rotate') || prop.includes('skew')) {
        // ✅ FIXED: Remove ° first, then add deg unit
        // '13°' -> '13' -> '13deg'
        // '-33°' -> '-33' -> '-33deg'
        value = value.toString().replace('°', '');
        if (!value.includes('deg')) {
          value = `${value}deg`;
        }
        transformParts.push(`${prop}(${value})`);
      } else if (prop.includes('translate')) {
        // Ensure px unit if no unit: '10' -> '10px'
        if (!value.toString().match(/px|%|em|rem/)) {
          value = `${value}px`;
        }
        transformParts.push(`${prop}(${value})`);
      } else if (prop === 'perspective') {
        // Perspective needs px
        if (!value.toString().includes('px') && value !== 'none') {
          value = `${value}px`;
        }
        transformParts.push(`${prop}(${value})`);
      }
    }
  });
  return transformParts.join(' ');
}
// ============================================================================
// REDUCER
// ============================================================================
const brandBookReducer = (state: BrandBookState, action: BrandBookAction): BrandBookState => {
  switch (action.type) {
    case 'SET_COPIED_COLOR':
      return {
        ...state,
        copiedColor: action.payload
      };
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.payload
      };
    case 'TOGGLE_ANIMATION':
      return {
        ...state,
        animationPlaying: !state.animationPlaying
      };
    case 'TOGGLE_INSPECTOR':
      return {
        ...state,
        inspectorOpen: !state.inspectorOpen
      };
    case 'SET_SELECTED_ELEMENT':
      return {
        ...state,
        selectedElement: action.payload,
        inspectorOpen: action.payload !== null
      };
    case 'UPDATE_CUSTOM_STYLE':
      console.log('📦 Reducer UPDATE_CUSTOM_STYLE:', {
        elementId: action.payload.elementId,
        property: action.payload.property,
        value: action.payload.value,
        currentStyles: state.customStyles[action.payload.elementId]
      });
      const elementId = action.payload.elementId;
      const property = action.payload.property;
      const value = action.payload.value;
      // Get current element styles
      const currentElement = state.customStyles[elementId] || {};
      const currentStyle = currentElement.style || {};
      const currentTransforms = currentElement.transforms || {};
      // ✅ Transform properties list
      const transformProperties = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skewX', 'skewY', 'perspective'];
      let updatedElement: any = {
        ...currentElement
      };
      // ✅ Handle different property types
      if (property === 'classes') {
        // Tailwind classes
        updatedElement.classes = value;
      } else if (property === 'content') {
        // Text content
        updatedElement.content = value;
      } else if (transformProperties.includes(property)) {
        // ✅ CRITICAL: Transform properties
        const updatedTransforms = {
          ...currentTransforms,
          [property]: value
        };
        // Build transform string from all transforms
        const transformString = buildTransformString(updatedTransforms);
        updatedElement = {
          ...updatedElement,
          transforms: updatedTransforms,
          style: {
            ...currentStyle,
            transform: transformString
          }
        };
        console.log('🎨 Transform updated:', {
          property,
          value,
          transformString,
          allTransforms: updatedTransforms
        });
      } else {
        // ✅ Regular CSS properties (opacity, background, etc.)
        updatedElement.style = {
          ...currentStyle,
          [property]: value
        };
      }
      const newState = {
        ...state,
        customStyles: {
          ...state.customStyles,
          [elementId]: updatedElement
        }
      };
      console.log('✅ New state for element:', {
        elementId,
        element: newState.customStyles[elementId]
      });
      return newState;
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      };
    default:
      return state;
  }
};
const initialState: BrandBookState = {
  copiedColor: null,
  activeTab: 'overview',
  animationPlaying: true,
  inspectorOpen: false,
  selectedElement: null,
  customStyles: {},
  searchQuery: ''
};
// ============================================================================
// CONTEXT
// ============================================================================
interface BrandBookContextValue {
  state: BrandBookState;
  dispatch: React.Dispatch<BrandBookAction>;
  setActiveTab: (tab: TabType) => void;
  toggleInspector: () => void;
  toggleAnimation: () => void;
  selectElement: (element: ElementType | null) => void;
  updateStyle: (elementId: string, property: string, value: any) => void;
  setSearchQuery: (query: string) => void;
  setCopiedColor: (label: string | null) => void;
}
const BrandBookContext = createContext<BrandBookContextValue | undefined>(undefined);
// ============================================================================
// PROVIDER
// ============================================================================
export const BrandBookProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [state, dispatch] = useReducer(brandBookReducer, initialState);
  const setActiveTab = useCallback((tab: TabType) => {
    dispatch({
      type: 'SET_ACTIVE_TAB',
      payload: tab
    });
  }, []);
  const toggleInspector = useCallback(() => {
    dispatch({
      type: 'TOGGLE_INSPECTOR'
    });
  }, []);
  const toggleAnimation = useCallback(() => {
    dispatch({
      type: 'TOGGLE_ANIMATION'
    });
  }, []);
  const selectElement = useCallback((element: ElementType | null) => {
    dispatch({
      type: 'SET_SELECTED_ELEMENT',
      payload: element
    });
  }, []);
  const updateStyle = useCallback((elementId: string, property: string, value: any) => {
    console.log('🔄 updateStyle called:', {
      elementId,
      property,
      value
    });
    dispatch({
      type: 'UPDATE_CUSTOM_STYLE',
      payload: {
        elementId,
        property,
        value
      }
    });
  }, []);
  const setSearchQuery = useCallback((query: string) => {
    dispatch({
      type: 'SET_SEARCH_QUERY',
      payload: query
    });
  }, []);
  const setCopiedColor = useCallback((label: string | null) => {
    dispatch({
      type: 'SET_COPIED_COLOR',
      payload: label
    });
  }, []);
  const value: BrandBookContextValue = {
    state,
    dispatch,
    setActiveTab,
    toggleInspector,
    toggleAnimation,
    selectElement,
    updateStyle,
    setSearchQuery,
    setCopiedColor
  };
  return <BrandBookContext.Provider value={value}>
      {children}
    </BrandBookContext.Provider>;
};
// ============================================================================
// HOOK
// ============================================================================
export const useBrandBook = () => {
  const context = useContext(BrandBookContext);
  if (!context) {
    throw new Error('useBrandBook must be used within BrandBookProvider');
  }
  return context;
};