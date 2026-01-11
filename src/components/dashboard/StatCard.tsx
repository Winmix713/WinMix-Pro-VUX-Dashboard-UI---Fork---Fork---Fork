import React, { useEffect, useMemo, useState, useId } from 'react';
import { TrendingUp, Info, TrendingDown } from 'lucide-react';
import HeadlessPopover from '../ui/HeadlessPopover';
import StatCardPopover from './StatCardPopover';
import { useStatMetrics } from '../../hooks/useStatMetrics';
interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  subLabel: string;
  percentage: number;
  icon: React.ReactNode;
  sparklineData?: number[];
}
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subValue,
  subLabel,
  percentage,
  icon,
  sparklineData = []
}) => {
  const metrics = useStatMetrics(title, value);
  const [displayedValue, setDisplayedValue] = useState(0);
  const uniqueId = useId();
  // Optimized Counter Animation
  useEffect(() => {
    if (typeof value !== 'number') return;
    const end = value;
    const duration = 1200;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: cubic-bezier(0.34, 1.56, 0.64, 1) - Spring-like
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setDisplayedValue(Math.floor(end * easeOut));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayedValue(end);
      }
    };
    requestAnimationFrame(animate);
  }, [value]);
  // Sparkline Normalization Logic
  const sparklinePoints = useMemo(() => {
    if (!sparklineData.length) return '';
    const width = 120;
    const height = 40;
    const min = Math.min(...sparklineData);
    const max = Math.max(...sparklineData);
    const range = max - min || 1;
    return sparklineData.map((val, i) => {
      const x = i / (sparklineData.length - 1) * width;
      const y = height - (val - min) / range * height;
      return `${x},${y}`;
    }).join(' ');
  }, [sparklineData]);
  // Confidence & Color Logic
  const getColors = (pct: number) => {
    if (pct >= 70) return {
      text: 'text-[#BEF264]',
      stroke: '#BEF264',
      bg: 'bg-[#BEF264]',
      shadow: 'rgba(190,242,100,0.5)'
    };
    if (pct >= 40) return {
      text: 'text-[#FBBF24]',
      stroke: '#FBBF24',
      bg: 'bg-[#FBBF24]',
      shadow: 'rgba(251,191,36,0.5)'
    };
    return {
      text: 'text-[#FB7185]',
      stroke: '#FB7185',
      bg: 'bg-[#FB7185]',
      shadow: 'rgba(251,113,133,0.5)'
    };
  };
  const colors = getColors(percentage);
  return <div className="
        glass-card p-6 h-full flex flex-col relative overflow-hidden group 
        hover:border-white/20 hover:bg-white/[0.07]
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]
      " role="article">
      {/* Background Glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" style={{
      backgroundColor: colors.stroke
    }} />

      {/* Background Sparkline (Absolute) */}
      {sparklineData.length > 0 && <div className="absolute bottom-0 right-0 w-full h-32 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-500 pointer-events-none">
          <svg viewBox="0 0 120 40" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id={`grad-${uniqueId}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={colors.stroke} stopOpacity="0.5" />
                <stop offset="100%" stopColor={colors.stroke} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`M 0,40 L ${sparklinePoints.replace(/ /g, ' L ')} L 120,40 Z`} fill={`url(#grad-${uniqueId})`} />
            <polyline points={sparklinePoints} fill="none" stroke={colors.stroke} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>}

      {/* Content Header */}
      <div className="flex justify-between items-start z-10 mb-6">
        <div className="flex items-center gap-4">
          <div className={`
            w-12 h-12 rounded-2xl flex items-center justify-center 
            bg-white/[0.03] border border-white/10 
            text-zinc-400 group-hover:text-white 
            transition-all duration-300 shadow-inner
            group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]
          `}>
            {icon}
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-zinc-400 transition-colors">
              {title}
            </p>
            <HeadlessPopover button={<button className="flex items-center gap-1.5 text-[10px] font-medium text-zinc-600 hover:text-[#BEF264] transition-colors mt-1 focus:outline-none group/btn">
                  <Info className="w-3 h-3 transition-transform group-hover/btn:scale-110" />
                  <span>Details</span>
                </button>} align="left" className="w-72">
              <StatCardPopover title={title} metrics={metrics} />
            </HeadlessPopover>
          </div>
        </div>

        {/* Progress Circle */}
        <div className="relative w-12 h-12 group-hover:scale-110 transition-transform duration-300">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path className="text-white/5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path className="transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]" stroke={colors.stroke} strokeDasharray={`${percentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div className={`absolute inset-0 flex items-center justify-center text-[10px] font-bold ${colors.text}`}>
            {percentage}%
          </div>
        </div>
      </div>

      {/* Main Value Section */}
      <div className="mt-auto z-10">
        <h4 className="text-4xl lg:text-5xl font-mono font-bold text-white tracking-tighter tabular-nums drop-shadow-lg flex items-baseline gap-1">
          {typeof value === 'number' ? displayedValue.toLocaleString() : value}
          {subValue && <span className="text-lg lg:text-xl text-zinc-500 font-sans font-medium">
              {subValue}
            </span>}
        </h4>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-4 flex items-center gap-2 border-t border-white/5 z-10">
        <div className={`
          flex items-center justify-center w-5 h-5 rounded-full 
          ${percentage > 50 ? 'bg-[#BEF264]/10 text-[#BEF264]' : 'bg-zinc-800 text-zinc-500'}
        `}>
          {percentage > 50 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        </div>
        <span className="text-xs text-zinc-400 font-medium tracking-tight group-hover:text-zinc-300 transition-colors">
          {subLabel}
        </span>
      </div>
    </div>;
};
export default StatCard;