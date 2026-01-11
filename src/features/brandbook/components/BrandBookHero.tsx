import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Edit3 } from 'lucide-react';
import { useBrandBook } from '../context/BrandBookContext';
export const BrandBookHero: React.FC = () => {
  const {
    state,
    selectElement
  } = useBrandBook();
  const handleInspectorToggle = () => {
    if (state.inspectorOpen) {
      selectElement(null);
    } else {
      // Set a default demo element when opening inspector
      selectElement({
        type: 'Component',
        id: 'demo-element',
        classes: 'glass-card p-6 rounded-2xl border border-white/10',
        content: 'Demo Element'
      });
    }
  };
  return <header className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A] to-transparent">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" aria-hidden="true" />

      <motion.div animate={{
      scale: [1, 1.2, 1],
      opacity: [0.1, 0.15, 0.1]
    }} transition={{
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut'
    }} className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#BEF264] blur-[120px] sm:blur-[150px]" aria-hidden="true" />
      <motion.div animate={{
      scale: [1, 1.3, 1],
      opacity: [0.05, 0.1, 0.05]
    }} transition={{
      duration: 10,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: 1
    }} className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#22D3EE] blur-[100px] sm:blur-[120px]" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
            <motion.div animate={{
            rotate: [0, 5, -5, 0]
          }} transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }} className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#BEF264]/20 to-[#BEF264]/5 border border-[#BEF264]/20 flex items-center justify-center" aria-hidden="true">
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-[#BEF264]" />
            </motion.div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                WinMix Pro <span className="text-[#BEF264]">Brand Book</span>
              </h1>
              <p className="text-zinc-400 text-base sm:text-lg mt-2">
                Design System & Component Library v2.4.0
              </p>
            </div>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-zinc-300 max-w-3xl leading-relaxed">
            A comprehensive guide to the WinMix Pro VUX Dashboard design
            language, featuring glassmorphism aesthetics, neon accents, and
            production-ready React components.
          </p>

          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={handleInspectorToggle} className={`mt-6 flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all ${state.inspectorOpen ? 'bg-[#BEF264]/10 text-[#BEF264] border border-[#BEF264]/20' : 'bg-white/5 text-white hover:bg-white/10'}`} aria-label={state.inspectorOpen ? 'Close Style Inspector' : 'Open Style Inspector'} aria-pressed={state.inspectorOpen}>
            <Edit3 className="w-4 h-4" aria-hidden="true" />
            {state.inspectorOpen ? 'Close Inspector' : 'Open Style Inspector'}
          </motion.button>

          <p className="text-xs text-zinc-500 mt-2" role="note">
            💡 Tip: Shift+Click on any element to edit its styles
          </p>
        </motion.div>
      </div>
    </header>;
};