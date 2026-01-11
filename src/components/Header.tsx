import React, { useState } from 'react';
import { Search, Bell, Settings, Menu as MenuIcon } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import NotificationsSlideOver from './NotificationsSlideOver';
import { useSidebar } from '../contexts/sidebarContext';
const Header: React.FC = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const {
    toggleSidebar
  } = useSidebar();
  return <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-background/80 backdrop-blur-xl">
        <div className="flex h-16 items-center gap-4 px-4 md:px-6 lg:px-8">
          {/* Mobile Menu Toggle */}
          <button onClick={toggleSidebar} className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors" aria-label="Toggle menu">
            <MenuIcon className="w-5 h-5 text-white" />
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input type="text" placeholder="Search matches, teams, stats..." className="search-input w-full" />
              <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/60">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="hidden sm:block">
              <LanguageSelector />
            </div>

            {/* Notifications Button */}
            <button onClick={() => setNotificationsOpen(true)} className="relative p-2 rounded-lg hover:bg-white/5 transition-colors" aria-label="Notifications">
              <Bell className="w-5 h-5 text-white/60" />
              {/* Notification Badge */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full ring-2 ring-background" />
            </button>

            {/* Settings Button */}
            <button className="p-2 rounded-lg hover:bg-white/5 transition-colors" aria-label="Settings">
              <Settings className="w-5 h-5 text-white/60" />
            </button>
          </div>
        </div>
      </header>

      {/* Notifications Slide-over */}
      <NotificationsSlideOver isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </>;
};
export default Header;