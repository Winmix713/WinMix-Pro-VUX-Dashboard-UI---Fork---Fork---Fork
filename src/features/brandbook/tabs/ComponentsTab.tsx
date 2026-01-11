import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { Components } from '../sections/Components';
import { ANIMATION_VARIANTS } from '../constants';
export const ComponentsTab: React.FC = () => {
  return <motion.div key="components" {...ANIMATION_VARIANTS.fadeInUp} transition={{
    duration: 0.4
  }} role="tabpanel" id="components-panel" aria-labelledby="components-tab">
      <Components />
    </motion.div>;
};