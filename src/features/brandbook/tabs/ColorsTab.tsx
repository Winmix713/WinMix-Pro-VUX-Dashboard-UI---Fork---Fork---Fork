import React from 'react';
import { motion } from 'framer-motion';
import { ColorPalette } from '../sections/ColorPalette';
import { ANIMATION_VARIANTS } from '../constants';
export const ColorsTab: React.FC = () => {
  return <motion.div key="colors" {...ANIMATION_VARIANTS.fadeInUp} transition={{
    duration: 0.4
  }} role="tabpanel" id="colors-panel" aria-labelledby="colors-tab">
      <ColorPalette />
    </motion.div>;
};