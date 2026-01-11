import React, { useState } from 'react';
import { Sparkles, TrendingUp, ChevronRight, Target, Activity, Zap, TrendingDown, Info } from 'lucide-react';
import HeadlessDialog from '../ui/HeadlessDialog';

// --- Típusdefiníciók és Mock Adatok (Props-ba kiszervezhető) ---
interface WinProbabilityProps {
  homeWin: number;
  draw: number;
  awayWin: number;
  homeMomentum: string;
  awayMomentum: string;
  drawMomentum: string;
}
const mockData: WinProbabilityProps = {
  homeWin: 78,
  draw: 12,
  awayWin: 10,
  homeMomentum: "+4.2%",
  awayMomentum: "-2.7%",
  drawMomentum: "-1.5%"
};

// --- Segédkomponens: FactorBar ---
interface FactorBarProps {
  label: string;
  value: string;
  progress?: number; // Dedikált számérték a szélességhez
  color?: string;
}
const FactorBar = ({
  label,
  value,
  progress,
  color = 'bg-[#BEF264]'
}: FactorBarProps) => {
  // Ha nincs progress prop, megpróbáljuk a value-ból kinyerni, ha %-os, egyébként 50%
  const widthVal = progress !== undefined ? Math.min(100, Math.max(0, progress)) : value.includes('%') ? parseInt(value) : 50;
  return <div className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-zinc-400 font-medium group-hover:text-zinc-300 transition-colors">
          {label}
        </span>
        <span className="text-xs font-bold text-white font-mono">{value}</span>
      </div>
      <div className="h-1.5 w-full bg-zinc-800/50 rounded-full overflow-hidden border border-white/5 relative">
        <div className={`h-full ${color} shadow-[0_0_8px_currentColor] opacity-90 transition-all duration-1000 ease-out`} style={{
        width: `${widthVal}%`
      }} />
      </div>
    </div>;
};
const WinProbabilityCard = ({
  data = mockData
}: {
  data?: WinProbabilityProps;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Számoljuk ki a progress bar szegmensek pontos szélességét
  // (A border radius miatt a "Draw" részt kicsit trükkösebb pozícionálni CSS-ben, 
  // itt most flexbox-szal vagy absolute pozícionálással oldjuk meg a tiszta layert)

  return <>
      {/* --- MAIN CARD --- */}
      <div className="h-full glass-card group relative flex flex-col justify-between p-6 md:p-8 cursor-default overflow-hidden">

        {/* Ambient Glow Effects (Background) */}
        <div className="absolute top-0 right-0 p-32 bg-[#BEF264] opacity-[0.02] blur-[80px] rounded-full pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-500" />

        {/* HEADER SECTION */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-8">
            {/* Icon Box */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#BEF264]/20 to-[#BEF264]/5 border border-[#BEF264]/20 flex items-center justify-center shadow-[0_0_15px_rgba(190,242,100,0.15)] group-hover:shadow-[0_0_25px_rgba(190,242,100,0.25)] transition-all duration-300">
              <Sparkles className="w-6 h-6 text-[#BEF264] fill-[#BEF264]/20" />
            </div>

            {/* Live Indicator Badge */}
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1.5 bg-[#BEF264]/10 px-2 py-1 rounded-full border border-[#BEF264]/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BEF264] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BEF264]"></span>
                </span>
                <span className="text-[10px] font-bold text-[#BEF264] uppercase tracking-wider">AI Live</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">v2.1.0</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-white mb-2 leading-tight">Win Probability</h3>
          <p className="text-sm text-zinc-400 text-pretty leading-relaxed">
            Real-time outcome prediction based on xG momentum & field tilt.
          </p>
        </div>

        {/* DATA VISUALIZATION SECTION */}
        <div className="relative z-10 mt-8 space-y-5">

          {/* Main Percentage Display */}
          <div className="flex justify-between items-end">
            <div className="flex items-baseline gap-1.5">
              <span className="text-6xl font-bold text-white tracking-tighter font-mono shadow-black drop-shadow-lg">
                {data.homeWin}
              </span>
              <span className="text-2xl text-[#BEF264] font-bold">%</span>
            </div>

            {/* Trend Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#BEF264]/10 border border-[#BEF264]/20 text-[#BEF264]">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-bold tabular-nums">{data.homeMomentum}</span>
            </div>
          </div>

          {/* Progress Bar (Accessibility included) */}
          <div className="space-y-3" role="progressbar" aria-label="Win Probability Distribution" aria-valuenow={data.homeWin} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-4 w-full bg-[#0A0A0A] rounded-full p-0.5 border border-white/10 shadow-inner relative overflow-hidden flex">

              {/* Home Segment */}
              <div className="h-full bg-gradient-to-r from-[#BEF264] to-[#aadd00] shadow-[0_0_15px_rgba(190,242,100,0.3)] transition-all duration-1000 ease-out relative z-30 first:rounded-l-full" style={{
              width: `${data.homeWin}%`
            }}>
                 <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/40 mix-blend-overlay"></div>
              </div>

              {/* Draw Segment */}
              <div className="h-full bg-zinc-700 transition-all duration-1000 ease-out relative z-20" style={{
              width: `${data.draw}%`
            }}>
                <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-black/20"></div>
              </div>

              {/* Away Segment */}
               <div className="h-full bg-zinc-800 transition-all duration-1000 ease-out relative z-10 last:rounded-r-full" style={{
              width: `${data.awayWin}%`
            }} />
            </div>

            {/* Legend Labels */}
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-mono">
              <span className="text-[#BEF264] drop-shadow-[0_0_8px_rgba(190,242,100,0.5)]">
                Home ({data.homeWin}%)
              </span>
              <span className="text-zinc-400">Draw ({data.draw}%)</span>
              <span className="text-zinc-600">Away ({data.awayWin}%)</span>
            </div>
          </div>
        </div>

        {/* ACTION BUTTON */}
        <button onClick={() => setIsDialogOpen(true)} className="w-full mt-8 py-3.5 px-4 rounded-xl bg-white/[0.03] hover:bg-[#BEF264] hover:text-black text-zinc-300 text-sm font-semibold transition-all duration-300 flex items-center justify-between group/btn border border-white/10 hover:border-[#BEF264] hover:shadow-[0_0_20px_rgba(190,242,100,0.2)]">
          <span>View Detailed Model</span>
          <ChevronRight className="w-4 h-4 text-zinc-500 group-hover/btn:text-black group-hover/btn:translate-x-1 transition-all" />
        </button>
      </div>

      {/* --- DETAILED DIALOG --- */}
      <HeadlessDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="AI Prediction Model" size="lg">
        <div className="space-y-8">

          {/* Top Cards: The 3 Outcomes (Grid fixed for mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Home Card */}
            <div className="bg-gradient-to-b from-[#BEF264]/10 to-transparent border border-[#BEF264]/30 rounded-2xl p-5 relative overflow-hidden">
               <div className="absolute inset-0 bg-[#BEF264]/5 blur-xl"></div>
               <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-[#BEF264]" />
                    <span className="text-xs font-bold text-[#BEF264] uppercase tracking-wider">Home Win</span>
                  </div>
                  <div className="text-4xl font-mono font-bold text-white mb-1">{data.homeWin}%</div>
                  <div className="text-xs text-[#BEF264]/80 font-medium">{data.homeMomentum} momentum</div>
               </div>
            </div>

            {/* Draw Card */}
            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-zinc-500" />
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Draw</span>
              </div>
              <div className="text-4xl font-mono font-bold text-zinc-300 mb-1">{data.draw}%</div>
              <div className="text-xs text-zinc-500 font-medium">{data.drawMomentum} stable</div>
            </div>

            {/* Away Card */}
            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-zinc-500" />
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Away Win</span>
              </div>
              <div className="text-4xl font-mono font-bold text-zinc-300 mb-1">{data.awayWin}%</div>
              <div className="text-xs text-rose-500 font-medium flex items-center gap-1">
                 <TrendingDown className="w-3 h-3" /> {data.awayMomentum} drop
              </div>
            </div>
          </div>

          {/* Model Factors Section */}
          <div className="glass-card-sm p-6 rounded-2xl border border-white/5">
            <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#BEF264]" />
              Dominant Factors
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <FactorBar label="Expected Goals (xG)" value="2.42 vs 0.87" progress={74} />
              <FactorBar label="Possession Control" value="64%" progress={64} />
              <FactorBar label="Shot Accuracy" value="89%" progress={89} />
              <FactorBar label="Field Tilt (Attacking 3rd)" value="71%" progress={71} />
            </div>
          </div>

          {/* Footer Info */}
          <div className="flex flex-wrap gap-4 items-center justify-between text-xs text-zinc-500 bg-zinc-900/50 p-4 rounded-xl border border-white/5">
             <div className="flex gap-6">
                <div>
                   <span className="block text-zinc-600 mb-0.5">Confidence</span>
                   <span className="text-[#BEF264] font-bold">High (94.7%)</span>
                </div>
                <div>
                   <span className="block text-zinc-600 mb-0.5">Model</span>
                   <span className="text-zinc-300 font-mono">Neural Net v2.1</span>
                </div>
                <div>
                   <span className="block text-zinc-600 mb-0.5">Features</span>
                   <span className="text-zinc-300 font-mono">1,247</span>
                </div>
             </div>
             <div className="flex items-center gap-1.5 text-zinc-400">
                <Info className="w-3.5 h-3.5" />
                <span>Updated real-time via WebSocket</span>
             </div>
          </div>

        </div>
      </HeadlessDialog>
    </>;
};
export default WinProbabilityCard;