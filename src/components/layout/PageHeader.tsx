import React, { useState } from 'react';
import { Search, Bell, Settings, Menu as MenuIcon } from 'lucide-react';
import LanguageSelector from '../LanguageSelector';
import NotificationsSlideOver from '../NotificationsSlideOver';
import { useSidebar } from '../../contexts/sidebarContext';
const PageHeader: React.FC = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const {
    toggleSidebar
  } = useSidebar();
  return <>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

        <div className="flex h-20 items-center gap-4 px-4 md:px-6 lg:px-8 relative z-10">
          {/* Mobile Menu Toggle */}
          <button onClick={toggleSidebar} className="lg:hidden p-2.5 rounded-xl hover:bg-white/5 active:bg-white/10 transition-all duration-200 text-white/60 hover:text-white" aria-label="Toggle menu">
            <MenuIcon className="w-5 h-5" />
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-[#BEF264] transition-colors duration-300" />
              <input type="text" placeholder="Search matches, teams, stats..." className="
                  w-full pl-11 pr-20 py-3
                  bg-white/[0.03] backdrop-blur-xl
                  border border-white/5
                  rounded-2xl
                  text-sm text-white placeholder:text-white/30
                  focus:border-[#BEF264]/30 focus:ring-2 focus:ring-[#BEF264]/10
                  focus:bg-white/[0.06]
                  hover:bg-white/[0.05] hover:border-white/10
                  transition-all duration-300
                  outline-none
                  shadow-inner
                " />
              <kbd className="
                absolute right-4 top-1/2 -translate-y-1/2 
                hidden sm:inline-flex items-center gap-1 
                rounded-lg border border-white/10 bg-white/5 
                px-2 py-1 text-[10px] font-bold text-white/40
                font-mono shadow-sm
              ">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="hidden sm:block">
              <LanguageSelector />
            </div>

            <div className="h-8 w-[1px] bg-white/5 mx-1 hidden sm:block" />

            {/* Notifications Button */}
            <button onClick={() => setNotificationsOpen(true)} className="
                relative p-3 rounded-xl 
                hover:bg-white/5 active:bg-white/10
                border border-transparent hover:border-white/5
                transition-all duration-200
                group
              " aria-label="Notifications">
              <Bell className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              {/* Notification Badge - Animated Pulse */}
              <span className="
                absolute top-2.5 right-2.5 
                w-2 h-2 bg-[#BEF264] rounded-full 
                ring-2 ring-[#0A0A0A]
                animate-pulse shadow-[0_0_8px_rgba(190,242,100,0.6)]
              " />
            </button>

            {/* Settings Button */}
            <button className="
                p-3 rounded-xl 
                hover:bg-white/5 active:bg-white/10
                border border-transparent hover:border-white/5
                transition-all duration-200
                group
              " aria-label="Settings">
              <Settings className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
            </button>

            {/* User Avatar (Optional) */}
            <div className="hidden md:flex items-center pl-2">
              <button className="
                flex items-center gap-3 
                pl-2 pr-4 py-1.5 rounded-full
                hover:bg-white/5 border border-transparent hover:border-white/5
                transition-all duration-200
                group
              ">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#BEF264] to-emerald-500 p-[1px] shadow-[0_0_15px_rgba(190,242,100,0.2)]">
                  <div className="w-full h-full rounded-full bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=Win+Mix&background=111&color=BEF264" alt="User" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
                    WinMix User
                  </span>
                  <span className="text-[10px] font-medium text-[#BEF264] uppercase tracking-wider">
                    Pro Plan
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Slide-over */}
      <NotificationsSlideOver isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </>;
};
export default PageHeader;