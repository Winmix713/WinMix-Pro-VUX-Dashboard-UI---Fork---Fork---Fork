import React from 'react';
import { motion } from 'framer-motion';
export const BrandBookFooter: React.FC = () => {
  return <motion.footer initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    delay: 0.5
  }} className="border-t border-white/10 bg-[#0A0A0A] mt-12 sm:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
              WinMix Pro Design System
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Version 2.4.0 • Last updated December 2024
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-zinc-500 font-mono text-center md:text-right">
              Built with React + TypeScript + Tailwind CSS
            </div>
          </div>
        </div>
      </div>
    </motion.footer>;
};