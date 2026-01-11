import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Target, TrendingUp, Filter, ChevronDown, Minus, ArrowUp, ArrowDown, Search } from 'lucide-react';
// =============================================================================
// UTILS & TYPES
// =============================================================================
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
export interface LeagueTeam {
  id: string;
  position: number;
  name: string;
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  form: ('W' | 'D' | 'L')[];
  logo?: string;
}
const TABS = [{
  id: 'table',
  label: 'Tabella',
  icon: Trophy
}, {
  id: 'scorers',
  label: 'Góllövők',
  icon: Target
}, {
  id: 'form',
  label: 'Forma',
  icon: TrendingUp
}] as const;
// =============================================================================
// SUB-COMPONENTS
// =============================================================================
const PositionBadge = ({
  position
}: {
  position: number;
}) => {
  let colorClass = 'bg-zinc-800/50 text-zinc-500 border-white/5';
  if (position === 1) colorClass = 'bg-[#BEF264] text-black shadow-[0_0_15px_rgba(190,242,100,0.4)] border-[#BEF264]';else if (position <= 4) colorClass = 'bg-sky-500/20 text-sky-400 border-sky-500/30 shadow-[0_0_10px_rgba(14,165,233,0.2)]';else if (position === 5) colorClass = 'bg-purple-500/20 text-purple-400 border-purple-500/30';else if (position > 17) colorClass = 'bg-red-500/10 text-red-500 border-red-500/20';
  return <div className={cn('w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold font-mono border transition-all duration-300', colorClass)}>
      {position}
    </div>;
};
const TableHeader = () => <div className="grid grid-cols-[3rem_1fr_repeat(4,3rem)] px-4 py-3 border-b border-white/5 bg-zinc-900/30 text-[10px] font-bold text-zinc-500 uppercase tracking-widest select-none sticky top-0 backdrop-blur-md z-10">
    <span className="text-center">Pos</span>
    <span className="pl-2">Club</span>
    <span className="text-center opacity-70">MP</span>
    <span className="text-center opacity-70">W</span>
    <span className="text-center opacity-70">D</span>
    <span className="text-center text-white font-black">Pts</span>
  </div>;
const LeagueRow = ({
  team,
  index
}: {
  team: LeagueTeam;
  index: number;
}) => {
  return <motion.div initial={{
    opacity: 0,
    x: -10
  }} animate={{
    opacity: 1,
    x: 0
  }} transition={{
    delay: index * 0.03
  }} className="
        group relative grid grid-cols-[3rem_1fr_repeat(4,3rem)] items-center px-4 py-3 text-xs 
        transition-all duration-200 hover:bg-white/[0.04] cursor-pointer 
        border-l-2 border-transparent hover:border-[#BEF264]
      ">
      {/* Position */}
      <div className="flex justify-center">
        <PositionBadge position={team.position} />
      </div>

      {/* Club Name */}
      <div className="pl-2 flex items-center gap-3 overflow-hidden">
        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-white/30 transition-colors shadow-sm">
          {team.logo ? <img src={team.logo} alt={team.name} className="w-full h-full object-cover" /> : <span className="text-[10px] font-bold text-zinc-400">
              {team.name.charAt(0)}
            </span>}
        </div>
        <span className="font-semibold text-zinc-300 group-hover:text-white truncate transition-colors text-sm">
          {team.name}
        </span>
      </div>

      {/* Stats */}
      <span className="text-center font-mono text-zinc-500">{team.played}</span>
      <span className="text-center font-mono text-zinc-400 group-hover:text-emerald-400 transition-colors">
        {team.won}
      </span>
      <span className="text-center font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
        {team.drawn}
      </span>
      <span className="text-center font-mono font-bold text-white text-sm tracking-tight group-hover:text-[#BEF264] transition-colors shadow-black drop-shadow-md">
        {team.points}
      </span>
    </motion.div>;
};
const TopScorerCard = ({
  rank,
  player,
  team,
  goals,
  xg
}: any) => <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-[#BEF264]/30 hover:bg-zinc-900/60 transition-all group cursor-pointer hover:shadow-lg hover:-translate-y-0.5">
    <div className="flex items-center gap-4">
      <div className={cn('w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold font-mono border transition-all duration-300', rank === 1 ? 'bg-[#BEF264]/10 text-[#BEF264] border-[#BEF264]/30 shadow-[0_0_15px_rgba(190,242,100,0.15)]' : 'bg-zinc-800/50 text-zinc-500 border-white/5')}>
        {rank}
      </div>
      <div>
        <p className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">
          {player}
        </p>
        <p className="text-[10px] text-zinc-500 flex items-center gap-1.5 mt-0.5">
          {team} <span className="w-1 h-1 rounded-full bg-zinc-700" />{' '}
          <span className="font-mono text-zinc-400">xG: {xg}</span>
        </p>
      </div>
    </div>
    <div className="text-right">
      <span className="block text-2xl font-mono font-black text-white leading-none tracking-tighter group-hover:text-[#BEF264] transition-colors drop-shadow-md">
        {goals}
      </span>
      <span className="text-[9px] text-zinc-600 uppercase font-bold tracking-wider">
        Goals
      </span>
    </div>
  </div>;
// =============================================================================
// MAIN COMPONENT
// =============================================================================
const LeagueTable = ({
  teams
}: {
  teams: LeagueTeam[];
}) => {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]['id']>('table');
  // Example Scorers Data
  const topScorers = [{
    rank: 1,
    player: 'Erling Haaland',
    team: 'Man City',
    goals: 18,
    xg: 14.2
  }, {
    rank: 2,
    player: 'Mohamed Salah',
    team: 'Liverpool',
    goals: 14,
    xg: 11.5
  }, {
    rank: 3,
    player: 'Ollie Watkins',
    team: 'Aston Villa',
    goals: 11,
    xg: 8.9
  }, {
    rank: 4,
    player: 'Dominic Solanke',
    team: 'Bournemouth',
    goals: 10,
    xg: 9.1
  }];
  return <div className="w-full h-full flex flex-col bg-zinc-950/40 backdrop-blur-2xl rounded-[32px] border border-white/10 overflow-hidden shadow-2xl relative group">
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#BEF264]/5 blur-[100px] rounded-full pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Header Section */}
      <div className="p-6 pb-4 relative z-10 shrink-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-600 blur-xl opacity-20 rounded-xl" />
              <div className="relative w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Trophy className="w-5 h-5 text-[#BEF264]" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white leading-tight tracking-tight">
                Premier <span className="text-[#BEF264]">League</span>
              </h3>
              <span className="text-zinc-500 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                Live Standings
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="p-2.5 rounded-xl bg-zinc-900/50 border border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors hover:border-white/10">
              <Search className="w-4 h-4" />
            </button>
            <button className="p-2.5 rounded-xl bg-zinc-900/50 border border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors hover:border-white/10">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Custom Tabs */}
        <div className="flex p-1.5 bg-zinc-900/60 rounded-xl border border-white/5 backdrop-blur-md shadow-inner">
          {TABS.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn('relative flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-colors z-10 uppercase tracking-wide', activeTab === tab.id ? 'text-black' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5')}>
              {activeTab === tab.id && <motion.div layoutId="activeTab" className="absolute inset-0 bg-[#BEF264] rounded-lg -z-10 shadow-[0_0_20px_rgba(190,242,100,0.4)]" transition={{
            type: 'spring',
            bounce: 0.2,
            duration: 0.6
          }} />}
              <tab.icon className={cn('w-3.5 h-3.5', activeTab === tab.id ? 'stroke-[2.5px]' : '')} />
              {tab.label}
            </button>)}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative min-h-0 bg-zinc-950/20">
        <AnimatePresence mode="wait">
          {activeTab === 'table' && <motion.div key="table" initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -10
        }} className="flex flex-col h-full">
              <TableHeader />
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {teams.map((team, idx) => <LeagueRow key={team.id} team={team} index={idx} />)}
              </div>

              {/* Legend */}
              <div className="px-6 py-4 border-t border-white/5 bg-zinc-900/50 flex gap-6 text-[9px] text-zinc-500 font-bold uppercase tracking-wider overflow-x-auto no-scrollbar shrink-0 backdrop-blur-md">
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-[#BEF264] shadow-[0_0_8px_rgba(190,242,100,0.4)]" />{' '}
                  Champion
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.4)]" />{' '}
                  UCL
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.4)]" />{' '}
                  UEL
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />{' '}
                  Relegation
                </div>
              </div>
            </motion.div>}

          {activeTab === 'scorers' && <motion.div key="scorers" initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -10
        }} className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
              {topScorers.map(scorer => <TopScorerCard key={scorer.rank} {...scorer} />)}
            </motion.div>}

          {activeTab === 'form' && <motion.div key="form" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="flex-1 flex flex-col items-center justify-center text-zinc-500 space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center shadow-inner">
                <TrendingUp className="w-8 h-8 opacity-50" />
              </div>
              <p className="text-sm font-medium">
                Form analysis coming soon...
              </p>
            </motion.div>}
        </AnimatePresence>
      </div>

      {/* Style for custom scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>;
};
export default LeagueTable;