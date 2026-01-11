import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Edit3 } from 'lucide-react';
import { spacing, radius, shadows, animations } from '../../../../constants/designTokens';
import { useBrandBook } from '../../context/BrandBookContext';
import { useElementInspector } from '../../hooks/useElementInspector';
import { CARD_CLASSES } from '../../constants';
export const Patterns: React.FC = () => {
  const {
    state,
    toggleAnimation
  } = useBrandBook();
  const {
    handleElementClick,
    getElementStyle
  } = useElementInspector();
  return <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
        Design Patterns
      </h2>

      {/* Spacing System */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className={`${CARD_CLASSES.GLASS} p-6 sm:p-8 mb-6`}>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
          Spacing System
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {Object.entries(spacing).map(([key, value], index) => {
          const elementId = `spacing-${key}`;
          const customStyle = getElementStyle(elementId);
          return <motion.div key={key} initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: index * 0.05
          }} whileHover={{
            scale: 1.05
          }} className={`bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10 cursor-pointer group relative ${customStyle.classes || ''}`} onClick={e => e.shiftKey && handleElementClick(e, {
            type: 'Component',
            id: elementId,
            classes: 'bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10',
            content: key.toUpperCase()
          })}>
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit3 className="w-2.5 h-2.5 text-[#BEF264]" aria-hidden="true" />
                </div>
                <div className="text-xs font-bold text-[#BEF264] mb-2">
                  {customStyle.content || key.toUpperCase()}
                </div>
                <div className="text-xs sm:text-sm font-mono text-white mb-2">
                  {value}
                </div>
                <motion.div whileHover={{
              width: '100%'
            }} className="bg-[#BEF264] rounded" style={{
              height: '4px',
              width: value
            }} />
              </motion.div>;
        })}
        </div>
      </motion.div>

      {/* Border Radius */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.1
    }} className={`${CARD_CLASSES.GLASS} p-6 sm:p-8 mb-6`}>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
          Border Radius
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {Object.entries(radius).map(([key, value], index) => {
          const elementId = `radius-${key}`;
          const customStyle = getElementStyle(elementId);
          return <motion.div key={key} initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: index * 0.05
          }} whileHover={{
            scale: 1.05,
            rotate: 5
          }} className={`bg-white/5 p-3 sm:p-4 border border-white/10 cursor-pointer group relative ${customStyle.classes || ''}`} style={{
            borderRadius: value
          }} onClick={e => e.shiftKey && handleElementClick(e, {
            type: 'Component',
            id: elementId,
            classes: 'bg-white/5 p-3 sm:p-4 border border-white/10',
            content: key.toUpperCase()
          })}>
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit3 className="w-2.5 h-2.5 text-[#BEF264]" aria-hidden="true" />
                </div>
                <div className="text-xs font-bold text-[#BEF264] mb-1">
                  {customStyle.content || key.toUpperCase()}
                </div>
                <div className="text-xs sm:text-sm font-mono text-white">
                  {value}
                </div>
              </motion.div>;
        })}
        </div>
      </motion.div>

      {/* Shadows & Effects */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.2
    }} className={`${CARD_CLASSES.GLASS} p-6 sm:p-8 mb-6`}>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
          Shadows & Effects
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Object.entries(shadows).map(([key, value], index) => {
          const elementId = `shadow-${key}`;
          const customStyle = getElementStyle(elementId);
          return <motion.div key={key} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.05
          }} whileHover={{
            y: -4
          }} className={`bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10 cursor-pointer group relative ${customStyle.classes || ''}`} style={{
            boxShadow: value
          }} onClick={e => e.shiftKey && handleElementClick(e, {
            type: 'Component',
            id: elementId,
            classes: 'bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10',
            content: key.toUpperCase()
          })}>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit3 className="w-3 h-3 text-[#BEF264]" aria-hidden="true" />
                </div>
                <div className="text-xs font-bold text-[#BEF264] mb-2">
                  {customStyle.content || key.toUpperCase()}
                </div>
                <div className="text-xs font-mono text-zinc-400 break-all">
                  {value}
                </div>
              </motion.div>;
        })}
        </div>
      </motion.div>

      {/* Animation Durations */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.3
    }} className={`${CARD_CLASSES.GLASS} p-6 sm:p-8 mb-6`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Animation Durations
          </h3>
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={toggleAnimation} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors" aria-label={state.animationPlaying ? 'Pause animations' : 'Play animations'} aria-pressed={state.animationPlaying}>
            {state.animationPlaying ? <Pause className="w-4 h-4 text-[#BEF264]" /> : <Play className="w-4 h-4 text-[#BEF264]" />}
          </motion.button>
        </div>
        <div className="space-y-4">
          {Object.entries(animations.duration).map(([key, value], index) => {
          const elementId = `animation-${key}`;
          const customStyle = getElementStyle(elementId);
          return <motion.div key={key} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: index * 0.05
          }} className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 group relative ${customStyle.classes || ''}`} onClick={e => e.shiftKey && handleElementClick(e, {
            type: 'Component',
            id: elementId,
            classes: 'flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4',
            content: key.toUpperCase()
          })}>
                <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit3 className="w-2.5 h-2.5 text-[#BEF264]" aria-hidden="true" />
                </div>
                <div className="w-full sm:w-32 text-sm font-bold text-white">
                  {customStyle.content || key.toUpperCase()}
                </div>
                <div className="w-full sm:w-24 text-xs sm:text-sm font-mono text-zinc-400">
                  {value}
                </div>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-[#BEF264]" initial={{
                width: 0
              }} animate={state.animationPlaying ? {
                width: '100%'
              } : {
                width: 0
              }} transition={{
                duration: parseInt(value) / 1000,
                ease: 'easeOut',
                repeat: state.animationPlaying ? Infinity : 0,
                repeatDelay: 1
              }} />
                </div>
              </motion.div>;
        })}
        </div>
      </motion.div>

      {/* Grid Layouts */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.4
    }} className={`${CARD_CLASSES.GLASS} p-6 sm:p-8`}>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
          Grid Layouts
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-bold text-[#BEF264] mb-3">
              Dashboard Grid (12 columns)
            </h4>
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-1 sm:gap-2">
              {Array.from({
              length: 12
            }).map((_, i) => {
              const elementId = `grid-col-${i + 1}`;
              const customStyle = getElementStyle(elementId);
              return <motion.div key={i} initial={{
                opacity: 0,
                scale: 0.8
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                delay: i * 0.03
              }} whileHover={{
                scale: 1.1,
                y: -4
              }} className={`h-10 sm:h-12 bg-[#BEF264]/20 rounded border border-[#BEF264]/40 flex items-center justify-center text-xs font-bold text-[#BEF264] cursor-pointer group relative ${customStyle.classes || ''}`} onClick={e => e.shiftKey && handleElementClick(e, {
                type: 'Component',
                id: elementId,
                classes: 'h-10 sm:h-12 bg-[#BEF264]/20 rounded border border-[#BEF264]/40',
                content: (i + 1).toString()
              })}>
                    {customStyle.content || i + 1}
                    <div className="absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Edit3 className="w-2 h-2 text-[#BEF264]" aria-hidden="true" />
                    </div>
                  </motion.div>;
            })}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#BEF264] mb-3">
              Stats Row (4 columns)
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {Array.from({
              length: 4
            }).map((_, i) => {
              const elementId = `stat-card-${i + 1}`;
              const customStyle = getElementStyle(elementId);
              return <motion.div key={i} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: i * 0.1
              }} whileHover={{
                y: -4,
                scale: 1.02
              }} className={`h-20 sm:h-24 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center cursor-pointer group relative ${customStyle.classes || ''}`} onClick={e => e.shiftKey && handleElementClick(e, {
                type: 'Component',
                id: elementId,
                classes: 'h-20 sm:h-24 bg-white/5 rounded-xl border border-white/10',
                content: `Stat Card ${i + 1}`
              })}>
                    <span className="text-xs sm:text-sm text-zinc-400">
                      {customStyle.content || `Stat Card ${i + 1}`}
                    </span>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Edit3 className="w-2.5 h-2.5 text-[#BEF264]" aria-hidden="true" />
                    </div>
                  </motion.div>;
            })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>;
};