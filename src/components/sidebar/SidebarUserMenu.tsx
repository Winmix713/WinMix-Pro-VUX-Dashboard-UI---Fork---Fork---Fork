import React from 'react';
import { LogOut, Settings, User, ChevronUp } from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
const SidebarUserMenu = () => {
  return <Menu as="div" className="relative w-full">
      <Menu.Button className="group flex w-full items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3 text-left outline-none transition-all duration-300 hover:bg-white/[0.06] hover:border-white/10 hover:shadow-lg hover:shadow-black/20">
        <div className="relative shrink-0">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#BEF264] to-transparent p-[1px] shadow-[0_0_15px_rgba(190,242,100,0.15)] group-hover:shadow-[0_0_20px_rgba(190,242,100,0.3)] transition-shadow duration-300">
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-black bg-zinc-900">
              <img src="https://ui-avatars.com/api/?name=Win+Mix&background=111&color=BEF264" alt="WinMix User Avatar" className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100" />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0A0A0A] bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="truncate text-sm font-semibold text-white transition-colors group-hover:text-[#BEF264]">
            WinMix User
          </div>
          <div className="flex items-center gap-1.5 truncate text-[10px] font-medium text-zinc-500 group-hover:text-zinc-400 transition-colors">
            <span className="h-1.5 w-1.5 rounded-full bg-[#BEF264] animate-pulse"></span>
            Premium Plan
          </div>
        </div>

        <ChevronUp className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
      </Menu.Button>

      <Transition enter="transition duration-100 ease-out" enterFrom="transform scale-95 opacity-0" enterTo="transform scale-100 opacity-100" leave="transition duration-75 ease-out" leaveFrom="transform scale-100 opacity-100" leaveTo="transform scale-95 opacity-0">
        <Menu.Items className="absolute bottom-full left-0 mb-2 w-full origin-bottom-left divide-y divide-white/5 rounded-xl bg-[#111] border border-white/10 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden backdrop-blur-xl">
          <div className="p-1">
            <Menu.Item>
              {({
              active
            }) => <button className={`${active ? 'bg-white/10 text-white' : 'text-zinc-400'} group flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium transition-all`}>
                  <User className="h-4 w-4" />
                  Profile
                </button>}
            </Menu.Item>
            <Menu.Item>
              {({
              active
            }) => <button className={`${active ? 'bg-white/10 text-white' : 'text-zinc-400'} group flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium transition-all`}>
                  <Settings className="h-4 w-4" />
                  Settings
                </button>}
            </Menu.Item>
          </div>
          <div className="p-1">
            <Menu.Item>
              {({
              active
            }) => <button className={`${active ? 'bg-red-500/10 text-red-400' : 'text-zinc-400'} group flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium transition-all hover:bg-red-500/10 hover:text-red-400`}>
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>;
};
export default SidebarUserMenu;