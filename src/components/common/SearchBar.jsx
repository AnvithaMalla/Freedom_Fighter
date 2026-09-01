import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Search, X, Sparkles } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = '',
  suggestions = [],
  className = ''
}) {
  const { t, isTelugu } = useLanguage();
  const [isFocused, setIsFocused] = useState(false);

  const quickTags = isTelugu
    ? ["అల్లూరి", "రాజమండ్రి", "ఉప్పు సత్యాగ్రహం", "దుర్గాబాయి", "పాలకొల్లు", "క్విట్ ఇండియా", "1942"]
    : ["Alluri", "Rajahmundry", "Salt Satyagraha", "Durgabai", "Palakollu", "Quit India", "1942"];

  return (
    <div className={`w-full ${className}`}>
      <div className={`relative flex items-center border-2 ${isFocused ? 'border-[#781D22] bg-[#FFFFFF] shadow-sm' : 'border-[#D6CFC7] bg-[#FAF7F0]'} rounded-xs transition-all duration-200`}>
        <div className="pl-3.5 pr-2 text-[#781D22]">
          <Search className="w-5 h-5" />
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch && onSearch(value)}
          placeholder={placeholder || t('search.placeholder')}
          className="w-full py-3 pr-10 font-ntr text-base sm:text-lg text-[#1C1917] bg-transparent focus:outline-none placeholder:text-[#8C827A]"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-2 text-[#57524C] hover:text-[#781D22] focus:outline-none"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick Search Chips */}
      <div className="flex flex-wrap items-center gap-1.5 mt-2 font-ntr text-xs">
        <span className="text-[#8B5A2B] font-semibold flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#996515]" />
          {isTelugu ? 'శీఘ్ర శోధన:' : 'Quick Search:'}
        </span>
        {quickTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onChange(tag)}
            className="px-2 py-0.5 border border-[#D6CFC7] bg-[#F4EFE6] text-[#57524C] hover:text-[#781D22] hover:border-[#781D22] hover:bg-[#FAF7F0] rounded-xs transition-colors cursor-pointer"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
