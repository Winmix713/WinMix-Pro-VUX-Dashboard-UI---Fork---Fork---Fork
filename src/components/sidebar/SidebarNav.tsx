import React, { useState } from 'react';
import { LayoutDashboard, Activity, BarChart3, Sparkles, Calendar, Star, ChevronRight, Target, Trophy, Globe, Palette } from 'lucide-react';
import SidebarMenuGroup from './SidebarMenuGroup';
import SidebarMenuItem from './SidebarMenuItem';
const SidebarNav = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [analyticsOpen, setAnalyticsOpen] = useState(true);
  // Helper a Live badge-hez
  const LiveBadge = <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.2)]">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
      </span>
      <span className="text-[9px] font-bold text-rose-500 uppercase tracking-wide">
        Live
      </span>
    </div>;
  return <div className="flex-1 space-y-6 py-2">
      {/* --- MAIN MENU --- */}
      <SidebarMenuGroup title="Overview">
        <SidebarMenuItem icon={<LayoutDashboard />} label="Dashboard" isActive={activeItem === 'Dashboard'} onClick={() => setActiveItem('Dashboard')} href="/" />
        <SidebarMenuItem icon={<Activity />} label="Live Odds" isActive={activeItem === 'Live Odds'} onClick={() => setActiveItem('Live Odds')} badge={LiveBadge} />
        <SidebarMenuItem icon={<Palette />} label="Brand Book" isActive={activeItem === 'Brand Book'} onClick={() => setActiveItem('Brand Book')} href="/brand-book" badge={<span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#BEF264]/10 text-[#BEF264] border border-[#BEF264]/20">
              NEW
            </span>} />
      </SidebarMenuGroup>

      {/* --- ANALYTICS (Custom Accordion) --- */}
      <SidebarMenuGroup title="Intelligence">
        <div className="relative group">
          {/* Parent Item that acts as a Trigger */}
          <SidebarMenuItem icon={<BarChart3 />} label="Stats Hub" isActive={activeItem === 'Stats Hub' || analyticsOpen} onClick={() => setAnalyticsOpen(!analyticsOpen)}
        // Trükk: A badge helyére tesszük a nyilat
        badge={<ChevronRight className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-300 ${analyticsOpen ? 'rotate-90 text-white' : ''}`} />} />

          {/* Submenu Items - Indented & Connected */}
          <div className={`
               overflow-hidden transition-all duration-300 ease-in-out
               ${analyticsOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
             `}>
            <div className="relative ml-4 pl-4 border-l border-white/5 my-1 space-y-1">
              <SidebarMenuItem icon={<Sparkles />} label="AI Models" size="small" isActive={activeItem === 'AI Models'} onClick={() => setActiveItem('AI Models')} />
              <SidebarMenuItem icon={<Target />} label="Predictions" size="small" isActive={activeItem === 'Predictions'} onClick={() => setActiveItem('Predictions')} />
            </div>
          </div>
        </div>

        <SidebarMenuItem icon={<Calendar />} label="Schedule" isActive={activeItem === 'Schedule'} onClick={() => setActiveItem('Schedule')} />
      </SidebarMenuGroup>

      {/* --- LEAGUES --- */}
      <SidebarMenuGroup title="Competitions" collapsible>
        <SidebarMenuItem icon={<div className="w-5 h-5 rounded-[6px] bg-gradient-to-br from-[#38003c] to-[#111] border border-white/10 flex items-center justify-center text-[8px] font-bold text-[#00ff85] shadow-sm">
              PL
            </div>} label="Premier League" isActive={activeItem === 'Premier League'} onClick={() => setActiveItem('Premier League')} />
        <SidebarMenuItem icon={<div className="w-5 h-5 rounded-[6px] bg-gradient-to-br from-[#111] to-black border border-white/10 flex items-center justify-center text-[8px] font-bold text-white shadow-sm">
              LL
            </div>} label="La Liga" isActive={activeItem === 'La Liga'} onClick={() => setActiveItem('La Liga')} />
        <SidebarMenuItem icon={<Star className="fill-[#FBBF24]/20 text-[#FBBF24]" />} label="Favorites" isActive={activeItem === 'Favorites'} onClick={() => setActiveItem('Favorites')} badge="12" />
      </SidebarMenuGroup>
    </div>;
};
export default SidebarNav;