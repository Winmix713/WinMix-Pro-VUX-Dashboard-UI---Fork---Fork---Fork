/**
 * BrandBook Animation Variants
 * Framer Motion animation configurations
 */

export const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: -20
    }
  },
  fadeInLeft: {
    initial: {
      opacity: 0,
      x: -20
    },
    animate: {
      opacity: 1,
      x: 0
    }
  },
  scaleIn: {
    initial: {
      opacity: 0,
      scale: 0.9
    },
    animate: {
      opacity: 1,
      scale: 1
    }
  }
} as const;