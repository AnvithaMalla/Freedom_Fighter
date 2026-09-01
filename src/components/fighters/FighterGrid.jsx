import React, { useState } from 'react';
import FighterCard from './FighterCard';
import { useLanguage } from '../../context/LanguageContext';
import { LayoutGrid, List, ArrowUpDown, Users } from 'lucide-react';

export default function FighterGrid({ fighters = [], initialViewMode = 'grid' }) {
  const { t, isTelugu } = useLanguage();
  const [viewMode, setViewMode] = useState(initialViewMode);
  const [sortBy, setSortBy] = useState('featured');

  // Client-side sorting logic
  const sortedFighters = [...fighters].sort((a, b) => {
    if (sortBy === 'name') {
      const nameA = isTelugu ? a.nameTe : a.nameEn;
      const nameB = isTelugu ? b.nameTe : b.nameEn;
      return nameA.localeCompare(nameB);
    }
    if (sortBy === 'year-asc') {
      return (a.year || 0) - (b.year || 0);
    }
    if (sortBy === 'year-desc') {
      return (b.year || 0) - (a.year || 0);
    }
    // Default featured priority
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <div className="space-y-4">
      {/* Control Bar: Result Count, Sorting, View Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 bg-[#F4EFE6] border border-[#D6CFC7] rounded-xs font-ntr text-xs">
        
        <div className="flex items-center gap-2 text-[#57524C]">
          <Users className="w-4 h-4 text-[#781D22]" />
          <span className="font-semibold text-[#1C1917]">{sortedFighters.length}</span>
          <span>{t('search.resultsFound')}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#996515]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-1 px-2 font-ntr text-xs border border-[#D6CFC7] bg-[#FAF7F0] text-[#1C1917] rounded-xs focus:outline-none focus:border-[#781D22]"
            >
              <option value="featured">{isTelugu ? 'ప్రత్యేక క్రమం' : 'Featured First'}</option>
              <option value="name">{t('search.sortName')}</option>
              <option value="year-asc">{isTelugu ? 'సంవత్సరం (ప్రాచీన → ఆధునిక)' : 'Year (Oldest)'}</option>
              <option value="year-desc">{isTelugu ? 'సంవత్సరం (ఆధునిక → ప్రాచీన)' : 'Year (Newest)'}</option>
            </select>
          </div>

          {/* Grid / List View Toggle */}
          <div className="inline-flex items-center border border-[#D6CFC7] bg-[#FAF7F0] rounded-xs p-0.5">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded-xs transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#781D22] text-[#FAF7F0]'
                  : 'text-[#57524C] hover:text-[#1C1917]'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1 rounded-xs transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#781D22] text-[#FAF7F0]'
                  : 'text-[#57524C] hover:text-[#1C1917]'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Grid or List Layout */}
      {sortedFighters.length === 0 ? (
        <div className="text-center py-12 p-6 border-2 border-dashed border-[#D6CFC7] bg-[#FDFBF7] rounded-xs">
          <p className="font-gurajada text-2xl text-[#781D22] mb-1">
            {t('search.noResults')}
          </p>
          <p className="font-ntr text-xs text-[#57524C]">
            {isTelugu
              ? 'శోధన పదాలను మార్చండి లేదా అన్ని ఫిల్టర్లను తొలగించి మళ్లీ ప్రయత్నించండి.'
              : 'Try adjusting your search terms or clearing selected filters.'}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedFighters.map((fighter) => (
            <FighterCard key={fighter.id} fighter={fighter} viewMode="grid" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {sortedFighters.map((fighter) => (
            <FighterCard key={fighter.id} fighter={fighter} viewMode="list" />
          ))}
        </div>
      )}
    </div>
  );
}
