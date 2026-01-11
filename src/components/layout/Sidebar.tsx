import React from 'react';
import { useSidebar } from '../../contexts/sidebarContext';
import SidebarHeader from '../sidebar/SidebarHeader';
import SidebarNav from '../sidebar/SidebarNav';
import SidebarUserMenu from '../sidebar/SidebarUserMenu';
const Sidebar = () => {
  const {
    isOpen,
    toggleSidebar
  } = useSidebar();
  return <>
      {/* Mobile Backdrop - Smooth fade */}
      <div className={`
          fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden 
          transition-all duration-500 ease-in-out
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `} onClick={toggleSidebar} aria-hidden="true" />

      {/* Main Sidebar Container */}
      <aside className={`
          fixed inset-y-0 left-0 z-50 w-[270px] flex flex-col
          bg-[#0A0A0A]/95 backdrop-blur-2xl
          border-r border-white/5
          transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
          shadow-[5px_0_30px_rgba(0,0,0,0.5)]
        `}>
        {/* Subtle Gradient Border on the right edge */}
        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        {/* Inner Glow for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

        {/* Content */}
        <div className="flex-none relative z-10">
          <SidebarHeader />
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2 space-y-1 relative z-10">
          <SidebarNav />
        </div>

        <div className="flex-none p-4 mt-auto border-t border-white/5 bg-gradient-to-t from-black/40 to-transparent relative z-10">
          <SidebarUserMenu />
        </div>
      </aside>
    </>;
};
export default Sidebar;