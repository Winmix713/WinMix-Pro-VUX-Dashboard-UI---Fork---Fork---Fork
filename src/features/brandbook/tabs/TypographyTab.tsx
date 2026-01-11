import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../sections/Typography';
import { ANIMATION_VARIANTS } from '../constants';
export const TypographyTab: React.FC = () => {
  return <motion.div key="typography" {...ANIMATION_VARIANTS.fadeInUp} transition={{
    duration: 0.4
  }} role="tabpanel" id="typography-panel" aria-labelledby="typography-tab">
      <Typography />
    </motion.div>;
};