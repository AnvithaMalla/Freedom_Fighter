import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { Link } from 'react-router-dom';
import { Feather, Landmark, ScrollText } from 'lucide-react';

export default function Masthead() {
  const { t, isTelugu } = useLanguage();

  return (
    <header className="w-full bg-[#FAF7F0] border-b border-[#D6CFC7] pt-2 pb-3 px-4 sm:px-6 lg:px-8 select-none">
      {/* Top Metadata Strip */}
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-xs text-[#57524C] border-b border-[#D6CFC7] pb-2 font-ntr">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <span className="font-semibold text-[#781D22] flex items-center gap-1">
            <Landmark className="w-3.5 h-3.5 inline text-[#996515]" />
            {t('masthead.edition')}
          </span>
          <span className="hidden md:inline text-[#C8BDB0]">|</span>
          <span className="hidden md:inline">
            {t('masthead.vol')} • {t('masthead.issue')}
          </span>
          <span className="hidden sm:inline text-[#C8BDB0]">|</span>
          <span className="hidden sm:inline italic text-[#736B63]">
            {t('masthead.motto')}
          </span>
        </div>

        <div className="flex items-center space-x-3 mt-1 sm:mt-0">
          <span className="text-[#8B5A2B] font-medium hidden lg:inline">
            {t('masthead.dateDisplay')}
          </span>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Main Newspaper Masthead Box */}
      <div className="max-w-7xl mx-auto text-center py-4 sm:py-6 relative">
        {/* Left Archival Stamp Emblem */}
        <div className="hidden lg:flex flex-col items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 w-28 p-2 border border-[#D6CFC7] bg-[#F4EFE6] text-center">
          <ScrollText className="w-5 h-5 text-[#781D22] mb-1" />
          <span className="font-gurajada text-sm text-[#781D22] leading-tight">చారిత్రక రికార్డులు</span>
          <span className="font-ntr text-[10px] text-[#57524C] uppercase tracking-wider">1857–1947</span>
        </div>

        {/* Center Main Title */}
        <Link to="/" className="inline-block group focus:outline-none">
          <p className="font-ntr text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#996515] uppercase mb-1">
            {isTelugu ? 'తూర్పు & పశ్చిమ గోదావరి సమగ్ర చారిత్రక రికార్డు' : 'East & West Godavari Digital Heritage'}
          </p>

          <h1 className="font-gurajada text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#1C1917] group-hover:text-[#781D22] transition-colors leading-[1.05] py-1">
            {isTelugu ? 'స్వాతంత్ర్య వీరుల చరిత్ర' : 'CHRONICLES OF FREEDOM HEROES'}
          </h1>

          <div className="inline-flex items-center justify-center gap-3 my-1">
            <span className="h-[1px] w-8 sm:w-16 bg-[#996515]"></span>
            <h2 className="font-gurajada text-xl sm:text-3xl text-[#781D22] tracking-wide font-medium">
              {isTelugu ? 'గోదావరి స్వాతంత్ర్య ఆర్కైవ్' : 'GODAVARI FREEDOM ARCHIVE'}
            </h2>
            <span className="h-[1px] w-8 sm:w-16 bg-[#996515]"></span>
          </div>

          <p className="font-editorial italic text-xs sm:text-sm text-[#57524C] mt-1 max-w-2xl mx-auto">
            {isTelugu 
              ? 'తూర్పు & పశ్చిమ గోదావరి స్వాతంత్ర్య సమరయోధుల త్యాగాలు, జైలు రికార్డులు మరియు చారిత్రక పత్రాల సంపుటి' 
              : 'Dedicated to preserving the sacrifices, jail records, and historical manuscripts of Telugu freedom fighters'}
          </p>
        </Link>

        {/* Right Archival Stamp Emblem */}
        <div className="hidden lg:flex flex-col items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 w-28 p-2 border border-[#D6CFC7] bg-[#F4EFE6] text-center">
          <Feather className="w-5 h-5 text-[#996515] mb-1" />
          <span className="font-gurajada text-sm text-[#781D22] leading-tight">1,000+ యోధులు</span>
          <span className="font-ntr text-[10px] text-[#57524C] uppercase tracking-wider">Godavari Delta</span>
        </div>
      </div>

      {/* Double Border Rule below Masthead */}
      <div className="max-w-7xl mx-auto border-t-2 border-b border-[#1C1917] py-0.5 my-1">
        <div className="border-t border-[#781D22]"></div>
      </div>
    </header>
  );
}
