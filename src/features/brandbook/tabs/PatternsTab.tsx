import React from 'react';
import { motion } from 'framer-motion';
import { Patterns } from '../sections/Patterns';
import { ANIMATION_VARIANTS } from '../constants';
export const PatternsTab: React.FC = () => {
  return <motion.div key="patterns" {...ANIMATION_VARIANTS.fadeInUp} transition={{
    duration: 0.4
  }} role="tabpanel" id="patterns-panel" aria-labelledby="patterns-tab">
      <Patterns />
    </motion.div>;
};