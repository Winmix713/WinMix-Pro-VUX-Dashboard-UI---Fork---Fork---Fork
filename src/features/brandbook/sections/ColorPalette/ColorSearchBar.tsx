import React from 'react';
import { Search } from 'lucide-react';
import { useBrandBook } from '../../context/BrandBookContext';
export const ColorSearchBar: React.FC = () => {
  const {
    state,
    setSearchQuery
  } = useBrandBook();
  return <div className="mb-8">
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" aria-hidden="true" />
        <input type="text" placeholder="Search colors..." value={state.searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#BEF264]/50 transition-colors" aria-label="Search colors" />
      </div>
    </div>;
};