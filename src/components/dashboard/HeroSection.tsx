import React, { useCallback, useEffect, useMemo, useState, useRef, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, BarChart2, History, Zap, Check, Search, ChevronDown, Sparkles, AlertCircle, X, Info, Trophy } from 'lucide-react';
import { cn } from '../../lib/utils';
// =============================================================================
// CONSTANTS & TYPES
// =============================================================================
type LeagueId = 'english' | 'spanish' | 'mixed';
interface Match {
  home: string | null;
  away: string | null;
}
const NAV_ITEMS = [{
  icon: Layers,
  label: 'Match Selector',
  path: '/'
}, {
  icon: BarChart2,
  label: 'Statistics',
  path: '/stats',
  disabled: true
}, {
  icon: History,
  label: 'History',
  path: '/history',
  disabled: true
}];
const LEAGUE_OPTIONS = [{
  id: 'english',
  label: 'Premier League',
  flag: '🇬🇧',
  short: 'EPL'
}, {
  id: 'spanish',
  label: 'La Liga',
  flag: '🇪🇸',
  short: 'LIGA'
}, {
  id: 'mixed',
  label: 'Mixed League',
  flag: '🌍',
  short: 'MIX'
}] as const;
const TEAM_LOGOS: Record<string, string> = {
  // English Premier League
  'Aston Lions': 'https://resources.premierleague.com/premierleague/badges/50/t7.png',
  Brentford: 'https://resources.premierleague.com/premierleague/badges/50/t94.png',
  Brighton: 'https://resources.premierleague.com/premierleague/badges/50/t36.png',
  Chelsea: 'https://resources.premierleague.com/premierleague/badges/50/t8.png',
  'Crystal Palace': 'https://resources.premierleague.com/premierleague/badges/50/t31.png',
  Everton: 'https://resources.premierleague.com/premierleague/badges/50/t11.png',
  Fulham: 'https://resources.premierleague.com/premierleague/badges/50/t54.png',
  Liverpool: 'https://resources.premierleague.com/premierleague/badges/50/t14.png',
  'London Gunners': 'https://resources.premierleague.com/premierleague/badges/50/t3.png',
  'Manchester Blues': 'https://resources.premierleague.com/premierleague/badges/50/t43.png',
  Newcastle: 'https://resources.premierleague.com/premierleague/badges/50/t4.png',
  Nottingham: 'https://resources.premierleague.com/premierleague/badges/50/t17.png',
  Tottenham: 'https://resources.premierleague.com/premierleague/badges/50/t6.png',
  'Red Devils': 'https://resources.premierleague.com/premierleague/badges/50/t1.png',
  'West Ham': 'https://resources.premierleague.com/premierleague/badges/50/t21.png',
  Wolverhampton: 'https://resources.premierleague.com/premierleague/badges/50/t39.png',
  // Spanish La Liga
  Alaves: 'https://assets.laliga.com/assets/2019/06/07/small/alaves.png',
  Barcelona: 'https://assets.laliga.com/assets/2019/06/07/small/barcelona.png',
  Bilbao: 'https://assets.laliga.com/assets/2019/06/07/small/athletic.png',
  Elche: 'https://assets.laliga.com/assets/2020/08/24/small/elche.png',
  Getafe: 'https://assets.laliga.com/assets/2019/06/07/small/getafe.png',
  Girona: 'https://assets.laliga.com/assets/2022/06/20/small/girona.png',
  'Real Madrid White': 'https://assets.laliga.com/assets/2019/06/07/small/real-madrid.png',
  'Real Madrid Red': 'https://assets.laliga.com/assets/2019/06/07/small/atletico.png',
  Mallorca: 'https://assets.laliga.com/assets/2019/06/07/small/mallorca.png',
  Osasuna: 'https://assets.laliga.com/assets/2019/06/07/small/osasuna.png',
  'San Sebastian': 'https://assets.laliga.com/assets/2019/06/07/small/real-sociedad.png',
  'Sevilla Red': 'https://assets.laliga.com/assets/2019/06/07/small/sevilla.png',
  'Sevilla Green': 'https://assets.laliga.com/assets/2019/06/07/small/betis.png',
  Valencia: 'https://assets.laliga.com/assets/2019/06/07/small/valencia.png',
  Vigo: 'https://assets.laliga.com/assets/2019/06/07/small/celta.png',
  Villarreal: 'https://assets.laliga.com/assets/2019/06/07/small/villarreal.png'
};
const LEAGUES_DATA = {
  ENGLISH: ['Aston Lions', 'Brentford', 'Brighton', 'Chelsea', 'Crystal Palace', 'Everton', 'Fulham', 'Liverpool', 'London Gunners', 'Manchester Blues', 'Newcastle', 'Nottingham', 'Tottenham', 'Red Devils', 'West Ham', 'Wolverhampton'],
  SPANISH: ['Alaves', 'Barcelona', 'Bilbao', 'Elche', 'Getafe', 'Girona', 'Real Madrid White', 'Real Madrid Red', 'Mallorca', 'Osasuna', 'San Sebastian', 'Sevilla Red', 'Sevilla Green', 'Valencia', 'Vigo', 'Villarreal']
};
const TEAMS_BY_LEAGUE: Record<LeagueId, string[]> = {
  english: LEAGUES_DATA.ENGLISH,
  spanish: LEAGUES_DATA.SPANISH,
  mixed: [...LEAGUES_DATA.ENGLISH.slice(0, 10), ...LEAGUES_DATA.SPANISH.slice(0, 10)]
};
const getTeamLogo = (teamName: string): string | null => TEAM_LOGOS[teamName] || null;
// =============================================================================
// COMPONENT: PARTICLE CANVAS
// =============================================================================
const ParticleCanvas = memo(({
  className
}: {
  className?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let animationFrame: number;
    const particles = Array.from({
      length: 30
    }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.3
    }));
    const render = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.fillStyle = `rgba(190, 242, 100, ${p.opacity})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrame = requestAnimationFrame(render);
    };
    render();
    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return <canvas ref={canvasRef} className={cn('fixed inset-0 pointer-events-none opacity-30 -z-10', className)} />;
});
ParticleCanvas.displayName = 'ParticleCanvas';
// =============================================================================
// COMPONENT: PROGRESS RING
// =============================================================================
const ProgressRing = memo(({
  current,
  total,
  size = 40,
  strokeWidth = 3
}: {
  current: number;
  total: number;
  size?: number;
  strokeWidth?: number;
}) => {
  const percentage = Math.min(100, Math.max(0, current / total * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - percentage / 100 * circumference;
  return <div className="flex items-center gap-4 bg-zinc-900/50 rounded-xl p-2 pr-4 border border-white/5 backdrop-blur-sm">
        <div className="relative" style={{
      width: size,
      height: size
    }}>
          <svg className="w-full h-full -rotate-90 transform">
            <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-zinc-800" />
            <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="text-[#BEF264] transition-all duration-700 ease-out shadow-[0_0_10px_#BEF264]" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
            {current === total ? <Check className="w-3.5 h-3.5 text-[#BEF264]" /> : current}
          </div>
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mb-0.5">
            Progress
          </div>
          <div className="text-xs font-mono tabular-nums text-[#BEF264]">
            <span className="font-bold">{current}</span>
            <span className="opacity-30 mx-1 text-white">/</span>
            <span className="text-zinc-500">{total}</span>
          </div>
        </div>
      </div>;
});
ProgressRing.displayName = 'ProgressRing';
// =============================================================================
// COMPONENT: DROPDOWN
// =============================================================================
const TeamDropdown = ({
  side,
  label,
  value,
  onChange,
  teams,
  exclude,
  isActive
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    if (!isOpen) setSearch('');
  }, [isOpen]);
  const availableTeams = useMemo(() => {
    return teams.filter((t: string) => {
      const isSelectedHere = t === value;
      const isExcluded = exclude.has(t) && !isSelectedHere;
      const matchesSearch = t.toLowerCase().includes(search.toLowerCase());
      return !isExcluded && matchesSearch;
    });
  }, [teams, exclude, value, search]);
  const selectedLogo = value ? getTeamLogo(value) : null;
  return <div className="flex-1 w-full relative group/input" ref={containerRef}>
      <label className={cn('text-[9px] uppercase tracking-widest font-bold mb-2 block transition-colors ml-1', isActive ? 'text-zinc-300' : 'text-zinc-600')}>
        {label}
      </label>

      <button onClick={() => setIsOpen(!isOpen)} className={cn('relative w-full h-11 px-3 flex items-center justify-between gap-2 border rounded-xl transition-all duration-200', isOpen ? 'border-[#BEF264] bg-zinc-900 shadow-[0_0_15px_-3px_rgba(190,242,100,0.3)]' : isActive ? 'bg-zinc-900/50 border-white/20 text-white shadow-inner' : 'bg-zinc-950/50 border-white/5 text-zinc-500 hover:bg-zinc-900 hover:border-white/10')}>
        <div className="flex items-center gap-3 overflow-hidden">
          {value && selectedLogo ? <>
              <img src={selectedLogo} alt={value} className="w-6 h-6 object-contain drop-shadow-sm" />
              <span className="text-sm font-medium truncate text-white">
                {value}
              </span>
            </> : <span className="text-sm truncate opacity-50 pl-1">
              Select Team...
            </span>}
        </div>
        <ChevronDown className={cn('w-4 h-4 transition-transform duration-300 opacity-50', isOpen && 'rotate-180 text-[#BEF264] opacity-100')} />
      </button>

      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0,
        y: 8,
        scale: 0.98
      }} animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }} exit={{
        opacity: 0,
        y: 8,
        scale: 0.98
      }} transition={{
        duration: 0.2,
        ease: 'easeOut'
      }} className="absolute top-full left-0 right-0 mt-2 bg-[#111] border border-white/10 rounded-xl shadow-2xl z-[100] overflow-hidden flex flex-col ring-1 ring-black/50">
            {/* Search Header */}
            <div className="p-2 border-b border-white/5 bg-[#111] sticky top-0 z-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                <input autoFocus type="text" placeholder="Search team..." value={search} onChange={e => setSearch(e.target.value)} className="w-full h-9 pl-9 pr-3 bg-zinc-800/50 rounded-lg text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#BEF264]/50 border-none transition-all" />
              </div>
            </div>

            {/* List */}
            <div className="max-h-[240px] overflow-y-auto p-1 custom-scrollbar">
              {availableTeams.length > 0 ? availableTeams.map((team: string) => <button key={team} onClick={() => {
            onChange(team);
            setIsOpen(false);
          }} className={cn('w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all cursor-pointer group/item', team === value ? 'bg-[#BEF264]/10 text-[#BEF264]' : 'text-zinc-400 hover:bg-white/5 hover:text-white')}>
                    <img src={getTeamLogo(team) || ''} alt="" className="w-5 h-5 object-contain opacity-70 group-hover/item:opacity-100 transition-opacity" />
                    <span className="text-sm font-medium">{team}</span>
                    {team === value && <Check className="ml-auto w-3.5 h-3.5" />}
                  </button>) : <div className="py-6 text-center text-zinc-500 flex flex-col items-center gap-2">
                  <AlertCircle className="w-5 h-5 opacity-30" />
                  <span className="text-xs">No teams found</span>
                </div>}
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
};
// =============================================================================
// COMPONENT: MATCH CARD
// =============================================================================
const MatchCard = memo(({
  index,
  homeTeam,
  awayTeam,
  teams,
  excludeTeams,
  onHomeChange,
  onAwayChange
}: any) => {
  const isComplete = homeTeam && awayTeam;
  return <div className={cn('relative flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 group', isComplete ? 'bg-zinc-900/60 border-[#BEF264]/20 shadow-[inset_0_0_20px_-10px_rgba(190,242,100,0.1)]' : 'bg-zinc-950/40 border-white/5 hover:border-white/10 hover:bg-zinc-900/30')}>
        {/* Index Badge */}
        <div className="shrink-0 flex flex-col items-center justify-center w-8 h-full gap-1">
          <div className="w-6 h-6 rounded-lg bg-zinc-800/50 border border-white/5 flex items-center justify-center text-[10px] font-mono text-zinc-500 font-bold group-hover:text-zinc-300 transition-colors">
            {index + 1}
          </div>
        </div>

        <div className="flex-1 grid grid-cols-[1fr,auto,1fr] gap-3 items-center">
          <TeamDropdown side="home" label="Home Team" value={homeTeam} onChange={onHomeChange} teams={teams} exclude={excludeTeams} isActive={!!homeTeam} />

          <div className="flex flex-col items-center pt-6 px-2">
            <div className={cn('w-8 h-8 rounded-full flex items-center justify-center border text-[10px] font-black tracking-tighter transition-all duration-500 relative z-10', isComplete ? 'bg-[#BEF264] border-[#BEF264] text-black scale-110 shadow-[0_0_20px_rgba(190,242,100,0.4)] rotate-0' : 'bg-zinc-900 border-zinc-700 text-zinc-600 rotate-45')}>
              VS
            </div>
            {isComplete && <div className="w-px h-full bg-gradient-to-b from-[#BEF264]/50 to-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -z-10" />}
          </div>

          <TeamDropdown side="away" label="Away Team" value={awayTeam} onChange={onAwayChange} teams={teams} exclude={excludeTeams} isActive={!!awayTeam} />
        </div>
      </div>;
});
MatchCard.displayName = 'MatchCard';
// =============================================================================
// COMPONENT: SIDEBAR
// =============================================================================
const Sidebar = () => {
  const location = useLocation();
  return <aside className="hidden xl:flex flex-col w-72 border-r border-white/5 bg-zinc-950/60 backdrop-blur-2xl p-6 z-20 h-full relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#BEF264]/5 to-transparent pointer-events-none" />

      <div className="flex items-center gap-4 mb-10 pl-1 relative z-10">
        <div className="relative group cursor-pointer">
          <div className="absolute inset-0 bg-[#BEF264] rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
          <div className="relative w-12 h-12 bg-zinc-900 border border-white/10 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
            <Zap className="w-6 h-6 text-[#BEF264] fill-current" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white leading-none tracking-tight">
            Neon<span className="text-[#BEF264]">Select</span>
          </h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold mt-1.5 flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#BEF264]" /> Pro Analytics
          </p>
        </div>
      </div>

      <nav className="space-y-2 flex-1 relative z-10">
        {NAV_ITEMS.map(item => <Link key={item.label} to={item.path} className={cn('flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all group relative overflow-hidden', location.pathname === item.path ? 'text-[#BEF264] bg-[#BEF264]/5 shadow-[inset_0_0_0_1px_rgba(190,242,100,0.1)]' : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5', item.disabled && 'opacity-50 cursor-not-allowed pointer-events-none grayscale')}>
            {location.pathname === item.path && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#BEF264] rounded-r-full shadow-[0_0_15px_#BEF264]" />}
            <item.icon className={cn('w-5 h-5 transition-transform group-hover:scale-110', location.pathname === item.path && 'fill-current')} />
            {item.label}
            {item.disabled && <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 border border-white/5 uppercase tracking-wide">
                Soon
              </span>}
          </Link>)}
      </nav>

      <div className="mt-auto relative z-10">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#BEF264]/5 rounded-full blur-2xl group-hover:bg-[#BEF264]/10 transition-colors duration-500" />

          <h4 className="text-[#BEF264] text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BEF264] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BEF264]"></span>
            </span>
            How it works
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Select 8 matches for the round. The{' '}
            <span className="text-white font-bold">Neon Engine™</span> will
            analyze historical data to optimize your predictions.
          </p>
        </div>

        <div className="flex items-center justify-between mt-6 px-2 text-[10px] text-zinc-600 font-mono">
          <span>v2.4.0-stable</span>
          <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
            System Online
          </span>
        </div>
      </div>
    </aside>;
};
// =============================================================================
// MAIN: HERO SECTION
// =============================================================================
export default function HeroSection() {
  const [matches, setMatches] = useState<Match[]>(Array(8).fill({
    home: null,
    away: null
  }));
  const [league, setLeague] = useState<LeagueId>('english');
  const [isResetting, setIsResetting] = useState(false);
  const updateMatch = useCallback((idx: number, field: keyof Match, val: string) => {
    setMatches(prev => {
      const newMatches = [...prev];
      newMatches[idx] = {
        ...newMatches[idx],
        [field]: val
      };
      return newMatches;
    });
  }, []);
  const resetAll = () => {
    setIsResetting(true);
    setMatches(Array(8).fill({
      home: null,
      away: null
    }));
    setTimeout(() => setIsResetting(false), 500);
  };
  // Calculate used teams to filter dropdowns
  const allSelectedTeams = useMemo(() => {
    const set = new Set<string>();
    matches.forEach(m => {
      if (m.home) set.add(m.home);
      if (m.away) set.add(m.away);
    });
    return set;
  }, [matches]);
  const filledMatches = matches.filter(m => m.home && m.away).length;
  const totalSlots = matches.length * 2;
  const filledSlots = matches.reduce((acc, m) => acc + (m.home ? 1 : 0) + (m.away ? 1 : 0), 0);
  const isComplete = filledMatches === 8;
  return <div className="relative w-full text-zinc-100 font-sans selection:bg-[#BEF264] selection:text-black mb-12">
      <ParticleCanvas />

      {/* Main Container */}
      <div className="flex items-center justify-center w-full">
        <main className="flex flex-col xl:flex-row bg-zinc-950/80 backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-2xl relative overflow-hidden ring-1 ring-white/5 w-full max-w-[1400px]" style={{
        height: '780px'
      }}>
          <Sidebar />

          {/* Content Area */}
          <section className="flex-1 flex flex-col relative min-w-0 bg-[#0A0A0A]/50">
            {/* Header */}
            <header className="h-24 border-b border-white/5 flex items-center justify-between px-8 bg-zinc-950/50 backdrop-blur-md z-20">
              <div className="flex flex-col justify-center gap-1">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  Round <span className="text-[#BEF264]">Selection</span>
                </h2>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold flex items-center gap-2">
                  <Trophy className="w-3 h-3" /> Season 24/25 • Matchday 12
                </span>
              </div>

              <div className="flex items-center gap-6">
                {/* League Selector */}
                <div className="flex bg-zinc-900/80 rounded-xl p-1.5 border border-white/5 shadow-inner">
                  {LEAGUE_OPTIONS.map(l => <button key={l.id} onClick={() => {
                  setLeague(l.id);
                  resetAll();
                }} className={cn('px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2', league === l.id ? 'bg-zinc-800 text-white shadow-md border border-white/10' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5')}>
                      <span className="text-base">{l.flag}</span>
                      <span className="hidden sm:inline uppercase tracking-wide">
                        {l.short}
                      </span>
                    </button>)}
                </div>

                <div className="h-10 w-px bg-white/5 hidden sm:block" />

                {/* Progress */}
                <ProgressRing current={filledSlots} total={totalSlots} />
              </div>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-[#09090b]/30">
              <div className="p-8 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-5">
                {matches.map((m, i) => <motion.div key={i} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: i * 0.05,
                duration: 0.4
              }}>
                    <MatchCard index={i} homeTeam={m.home} awayTeam={m.away} teams={TEAMS_BY_LEAGUE[league]} excludeTeams={allSelectedTeams} onHomeChange={(t: string) => updateMatch(i, 'home', t)} onAwayChange={(t: string) => updateMatch(i, 'away', t)} />
                  </motion.div>)}
              </div>
            </div>

            {/* Footer Action Bar */}
            <footer className="absolute bottom-0 left-0 right-0 z-30 bg-zinc-950/90 backdrop-blur-xl border-t border-white/10 p-5 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button onClick={resetAll} className="flex items-center gap-2 px-4 py-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all text-xs font-bold uppercase tracking-wide group" title="Clear All">
                  <X className={cn('w-4 h-4 transition-transform group-hover:rotate-90', isResetting && 'animate-spin')} />
                  Reset
                </button>
                <div className="h-6 w-px bg-white/10" />
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-medium">
                  <Info className="w-3.5 h-3.5 text-zinc-600" />
                  <span className="hidden sm:inline">
                    System automatically filters injured players.
                  </span>
                </div>
              </div>

              <button disabled={!isComplete} className={cn('px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-3 shadow-lg transform', isComplete ? 'bg-[#BEF264] text-black hover:bg-[#a3d93d] shadow-[0_0_30px_rgba(190,242,100,0.3)] hover:shadow-[0_0_50px_rgba(190,242,100,0.5)] hover:-translate-y-1' : 'bg-zinc-800 text-zinc-500 border border-white/5 cursor-not-allowed')}>
                <Sparkles className={cn('w-4 h-4', isComplete && 'animate-spin-slow')} />
                <span>Run Analysis</span>
              </button>
            </footer>
          </section>
        </main>
      </div>

      {/* Global Styles for Scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
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
}