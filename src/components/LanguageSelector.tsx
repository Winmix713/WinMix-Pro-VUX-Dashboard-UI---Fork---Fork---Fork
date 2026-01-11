import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Globe, Check } from 'lucide-react';
interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}
const languages: Language[] = [{
  code: 'hu',
  name: 'Hungarian',
  nativeName: 'Magyar',
  flag: '🇭🇺'
}, {
  code: 'en',
  name: 'English',
  nativeName: 'English',
  flag: '🇬🇧'
}, {
  code: 'es',
  name: 'Spanish',
  nativeName: 'Español',
  flag: '🇪🇸'
}, {
  code: 'de',
  name: 'German',
  nativeName: 'Deutsch',
  flag: '🇩🇪'
}];
const LanguageSelector: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    // TODO: Implement actual language change logic
    console.log('Language changed to:', language.code);
  };
  return <Menu as="div" className="relative inline-block text-left">
      {/* Trigger Button */}
      <Menu.Button className="headlessui-menu-button flex items-center gap-2">
        <Globe className="w-5 h-5 text-white/60" />
        <span className="text-sm font-medium text-white/80">
          {selectedLanguage.flag} {selectedLanguage.code.toUpperCase()}
        </span>
      </Menu.Button>

      {/* Dropdown Menu */}
      <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="headlessui-menu-items absolute right-0 mt-2 w-56 origin-top-right">
          {/* Menu Items */}
          {languages.map(language => <Menu.Item key={language.code}>
              {({
            active
          }) => <button onClick={() => handleLanguageChange(language)} className={`
                    headlessui-menu-item
                    ${active ? 'bg-primary/20 text-primary' : 'text-white'}
                    group flex w-full items-center justify-between
                  `}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{language.flag}</span>
                    <div className="text-left">
                      <p className="text-sm font-medium">
                        {language.nativeName}
                      </p>
                      <p className="text-xs text-white/50">
                        {language.name}
                      </p>
                    </div>
                  </div>
                  
                  {/* Checkmark for selected language */}
                  {selectedLanguage.code === language.code && <Check className="w-4 h-4 text-primary" />}
                </button>}
            </Menu.Item>)}
        </Menu.Items>
      </Transition>
    </Menu>;
};
export default LanguageSelector;