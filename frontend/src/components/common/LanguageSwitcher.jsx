import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher({ className = '' }) {
  const { language, setLanguage, isTelugu } = useLanguage();

  return (
    <div className={`inline-flex items-center rounded-sm border border-[#D6CFC7] bg-[#F4EFE6] p-0.5 text-xs ${className}`}>
      <div className="flex items-center px-1.5 text-[#781D22]">
        <Languages className="w-3.5 h-3.5 mr-1" />
      </div>
      <button
        type="button"
        onClick={() => setLanguage('te')}
        className={`px-2.5 py-1 font-ntr font-medium text-xs transition-all duration-150 rounded-xs ${
          isTelugu
            ? 'bg-[#781D22] text-[#FAF7F0] shadow-xs'
            : 'text-[#57524C] hover:text-[#1C1917]'
        }`}
      >
        తెలుగు
      </button>
      <span className="text-[#C8BDB0] mx-0.5">|</span>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 font-editorial font-medium text-xs transition-all duration-150 rounded-xs ${
          !isTelugu
            ? 'bg-[#781D22] text-[#FAF7F0] shadow-xs'
            : 'text-[#57524C] hover:text-[#1C1917]'
        }`}
      >
        English
      </button>
    </div>
  );
}
