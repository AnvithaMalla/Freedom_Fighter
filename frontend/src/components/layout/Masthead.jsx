import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function Masthead() {
  const { isTelugu } = useLanguage();

  return (
    <header className="w-full bg-[#FAF7F0]/72 border-b border-[#D6CFC7] pt-2 pb-3 px-4 sm:px-6 lg:px-8 select-none">
      {/* Main Newspaper Masthead Box */}
      <div className="max-w-7xl mx-auto py-4 text-center sm:py-6">
        <Link to="/" className="block min-w-0 group focus:outline-none">
          <p className="font-ntr text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#996515] uppercase mb-1">
            {isTelugu ? 'తూర్పు & పశ్చిమ గోదావరి సమగ్ర చారిత్రక రికార్డు' : 'East & West Godavari Digital Heritage'}
          </p>

          <h1 className="masthead-title font-gurajada text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#1C1917] group-hover:text-[#781D22] transition-colors leading-[1.05] py-1">
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
      </div>

      {/* Double Border Rule below Masthead */}
      <div className="max-w-7xl mx-auto border-t-2 border-b border-[#1C1917] py-0.5 my-1">
        <div className="border-t border-[#781D22]"></div>
      </div>
    </header>
  );
}
