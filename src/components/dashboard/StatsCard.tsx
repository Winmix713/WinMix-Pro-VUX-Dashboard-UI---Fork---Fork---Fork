import React, { useId } from 'react';
import { Activity, TrendingUp, TrendingDown, Timer, ShieldAlert, Sparkles, Minus } from 'lucide-react';
const StatSection = () => {
  return <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
      
      {/* 1. KÁRTYA: Találati arány (Lime) */}
      <StatCard theme="lime" icon={<Activity className="w-5 h-5" strokeWidth={1.5} />} title="Találati arány" value="124" subValue="NYERTES" footerText="10 fordulóban átlag felett." footerIcon={<TrendingUp className="text-lime-400 w-3 h-3" />} percentage={82} chartData="0,20 20,15 40,18 60,10 80,14 100,8" // Polyline points Y
    polygonPoints="0,30 0,20 20,15 40,18 60,10 80,14 100,8 100,30" />

      {/* 2. KÁRTYA: Döntési idő (Amber) */}
      <StatCard theme="amber" icon={<Timer className="w-5 h-5" strokeWidth={1.5} />} title="Döntési idő" value="23s" subValue="ÁTLAG" footerText="Stabil sebesség, javuló trend." footerIcon={<Minus className="text-amber-400 w-3 h-3" />} percentage={54} chartData="0,18 25,10 50,14 75,12 100,16" polygonPoints="0,30 0,18 25,10 50,14 75,12 100,16 100,30" />

      {/* 3. KÁRTYA: Kockázat (Rose) */}
      <StatCard theme="rose" icon={<ShieldAlert className="w-5 h-5" strokeWidth={1.5} />} title="Kockázat" value="9" subValue="MAGAS ODDS" footerText="Csökkents a kockázatos tippekből." footerIcon={<TrendingDown className="text-rose-400 w-3 h-3" />} percentage={28} chartData="0,12 25,16 50,10 75,8 100,6" polygonPoints="0,30 0,12 25,16 50,10 75,8 100,6 100,30" />

      {/* 4. KÁRTYA: Neon Engine (Sky) */}
      <StatCard theme="sky" icon={<Sparkles className="w-5 h-5" strokeWidth={1.5} />} title="Neon Engine" value="+18%" subValue="ROI" footerText="Finomhangolás élő adatok alapján." footerIcon={<TrendingUp className="text-sky-400 w-3 h-3" />} percentage={71} chartData="0,22 20,18 40,20 60,16 80,14 100,10" polygonPoints="0,30 0,22 20,18 40,20 60,16 80,14 100,10 100,30" />
    </div>;
};
const StatCard = ({
  theme,
  icon,
  title,
  value,
  subValue,
  footerText,
  footerIcon,
  percentage,
  chartData,
  polygonPoints
}) => {
  const id = useId();

  // Color Definitions based on theme
  const colors = {
    lime: {
      hex: '#BEF264',
      border: 'hover:border-lime-400/20',
      iconColor: 'text-zinc-400 group-hover:text-lime-300',
      iconBg: 'group-hover:bg-lime-400/10 group-hover:border-lime-400/20',
      text: 'text-lime-300',
      shadow: 'drop-shadow-[0_0_2px_rgba(190,242,100,0.5)]'
    },
    amber: {
      hex: '#FBBF24',
      border: 'hover:border-amber-400/20',
      iconColor: 'text-zinc-400 group-hover:text-amber-300',
      iconBg: 'group-hover:bg-amber-400/10 group-hover:border-amber-400/20',
      text: 'text-amber-400',
      shadow: 'drop-shadow-[0_0_2px_rgba(251,191,36,0.5)]'
    },
    rose: {
      hex: '#FB7185',
      border: 'hover:border-rose-400/20',
      iconColor: 'text-zinc-400 group-hover:text-rose-300',
      iconBg: 'group-hover:bg-rose-400/10 group-hover:border-rose-400/20',
      text: 'text-rose-400',
      shadow: 'drop-shadow-[0_0_2px_rgba(251,113,133,0.5)]'
    },
    sky: {
      hex: '#38BDF8',
      border: 'hover:border-sky-400/20',
      iconColor: 'text-zinc-400 group-hover:text-sky-300',
      iconBg: 'group-hover:bg-sky-400/10 group-hover:border-sky-400/20',
      text: 'text-sky-400',
      shadow: 'drop-shadow-[0_0_2px_rgba(56,189,248,0.5)]'
    }
  };
  const c = colors[theme];
  // Calculate stroke dash based on percentage (roughly)
  // Circumference approx 100 for path length calculation simulation
  // 31.831 radius calculation from HTML: 2 * PI * 15.9155 ≈ 100
  const dashArray = `${percentage},100`;
  return <article className={`relative overflow-hidden group border border-white/5 bg-zinc-900/40 rounded-2xl p-4 flex flex-col h-full transition-colors duration-300 ${c.border}`}>
      
      {/* Sparkline BG */}
      <div className="absolute bottom-0 right-0 w-full h-24 opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none mix-blend-screen">
        <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id={`grad-${id}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={c.hex} stopOpacity="0.6"></stop>
              <stop offset="100%" stopColor={c.hex} stopOpacity="0"></stop>
            </linearGradient>
          </defs>
          <polygon points={polygonPoints} fill={`url(#grad-${id})`}></polygon>
          <polyline points={chartData} fill="none" stroke={c.hex} strokeWidth="1.5" vectorEffect="non-scaling-stroke"></polyline>
        </svg>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border bg-white/5 border-white/10 transition-all duration-300 ${c.iconColor} ${c.iconBg}`}>
            {icon}
          </div>
          <div>
            <p className="text-[0.625rem] font-bold uppercase tracking-[0.15em] text-zinc-500 group-hover:text-zinc-400 transition-colors">
              {title}
            </p>
          </div>
        </div>
        
        {/* Mini Ring */}
        <div className="relative w-9 h-9 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path className="text-white/5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5"></path>
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="2.5" strokeLinecap="round" stroke={c.hex} strokeDasharray={dashArray} className={c.shadow}></path>
          </svg>
          <div className={`absolute inset-0 flex items-center justify-center text-[0.6rem] font-bold ${c.text}`}>
            {percentage}%
          </div>
        </div>
      </div>

      {/* Value */}
      <div className="mt-4 relative z-10">
        <h4 className="font-mono font-semibold text-white tracking-tight flex items-baseline gap-2 text-2xl">
          {value} <span className="text-xs text-zinc-500 font-sans font-medium uppercase tracking-wide">{subValue}</span>
        </h4>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-3 flex items-center gap-2 border-t border-white/5 relative z-10">
        {footerIcon}
        <span className="text-[0.65rem] text-zinc-400 font-medium">{footerText}</span>
      </div>
    </article>;
};
export default StatSection;