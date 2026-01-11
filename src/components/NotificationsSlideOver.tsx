import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
interface Notification {
  id: string;
  user: string;
  initials: string;
  color: string;
  action: string;
  item: string;
  time: string;
}
interface NotificationsSlidOverProps {
  isOpen: boolean;
  onClose: () => void;
}
const mockNotifications: Notification[] = [{
  id: '1',
  user: 'conceptual_artist',
  initials: 'CA',
  color: 'bg-lime-500',
  action: 'megvásárolta',
  item: '3D Artistry Pack',
  time: '1ó 5p e.'
}, {
  id: '2',
  user: 'imaginative_vision',
  initials: 'IV',
  color: 'bg-blue-500',
  action: 'kedvelte',
  item: 'Interactive Design Assets',
  time: '1ó 12p e.'
}, {
  id: '3',
  user: 'aesthetic_explorer',
  initials: 'AE',
  color: 'bg-purple-500',
  action: 'kommentelt',
  item: 'CreativeSpace UI Kit',
  time: '5ó e.'
}, {
  id: '4',
  user: 'style_savant',
  initials: 'SS',
  color: 'bg-pink-500',
  action: 'kedvelte',
  item: 'GraphicGenius Fonts',
  time: '7ó e.'
}, {
  id: '5',
  user: 'visual_vortex',
  initials: 'VV',
  color: 'bg-amber-500',
  action: 'megvásárolta',
  item: 'DesignWave Toolkit',
  time: '12ó e.'
}];
const NotificationsSlideOver: React.FC<NotificationsSlidOverProps> = ({
  isOpen,
  onClose
}) => {
  return <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child as={Fragment} enter="ease-in-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        {/* Slide-over Panel */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-300" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-300" leaveFrom="translate-x-0" leaveTo="translate-x-full">
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-[#0A0A0A] shadow-2xl">
                    {/* Header */}
                    <div className="px-6 py-6 border-b border-white/10">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-xl font-bold text-white">
                          Értesítések
                        </Dialog.Title>
                        <button type="button" className="rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200" onClick={onClose}>
                          <span className="sr-only">Bezárás</span>
                          <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    {/* Notifications List */}
                    <div className="flex-1 overflow-y-auto px-4 py-4">
                      <div className="space-y-3">
                        {mockNotifications.map(notification => <div key={notification.id} className="leaderboard-item group">
                            <div className="flex items-center gap-4">
                              {/* Avatar */}
                              <div className={`
                                  flex-shrink-0 
                                  w-12 h-12 
                                  rounded-full 
                                  ${notification.color} 
                                  flex items-center justify-center 
                                  text-white font-bold text-sm
                                  shadow-lg
                                `}>
                                {notification.initials}
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-white/90">
                                  <span className="font-semibold text-white">
                                    {notification.user}
                                  </span>{' '}
                                  <span className="text-white/60">
                                    {notification.action}
                                  </span>
                                </p>
                                <p className="text-sm font-medium text-white mt-0.5">
                                  {notification.item}
                                </p>
                                <p className="text-xs text-white/40 mt-1">
                                  {notification.time}
                                </p>
                              </div>

                              {/* Remove Button */}
                              <button className="
                                  flex-shrink-0 
                                  w-6 h-6 
                                  rounded-full 
                                  flex items-center justify-center
                                  text-white/40 
                                  hover:text-white 
                                  hover:bg-white/10
                                  transition-all duration-200
                                  opacity-0 group-hover:opacity-100
                                " aria-label="Értesítés eltávolítása">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>)}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-white/10 px-6 py-4">
                      <button type="button" className="btn-glass w-full" onClick={onClose}>
                        Összes értesítés megtekintése
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>;
};
export default NotificationsSlideOver;