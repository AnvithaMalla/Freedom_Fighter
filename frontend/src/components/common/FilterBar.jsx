import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { fighters } from '../../data/fighters';
export default function FilterBar({ filters, setFilters, onReset, hasActiveFilters }) {
  const { isTelugu, t } = useLanguage(); const label = (te,en) => isTelugu ? te : en;
  const years = [...new Set(fighters.map(f => f.year))].sort((a,b) => a-b);
  const talukas = [
    ['narasapuram', label('నరసాపురం', 'Narasapuram')],
    ['bhimavaram', label('భీమవరం', 'Bhimavaram')],
    ['tanuku', label('తణుకు', 'Tanuku')],
    ['tadepalligudem', label('తాడేపల్లిగూడెం', 'Tadepalligudem')],
    ['kovvur', label('కోవూరు', 'Kovvur')],
    ['chintalapudi', label('చింతలపూడి', 'Chintalapudi')],
    ['polavaram', label('పోలవరం', 'Polavaram')],
    ['eluru', label('ఏలూరు', 'Eluru')]
  ];
  const selects = [
    ['district', label('జిల్లా', 'District'), [['all', t('search.allDistricts')], ['east', t('search.eastGodavari')], ['west', t('search.westGodavari')], ['east-west', t('search.bothDistricts')]]],
    ['taluka', label('తాలూకా', 'Taluka'), [['all', t('search.allTalukas')], ...talukas]],
    ['year', label('సంవత్సరం', 'Year'), [['all', label('అన్ని సంవత్సరాలు', 'All years')], ...years.map(x => [String(x), String(x)])]],
    ['duration', label('జైలు శిక్ష', 'Imprisonment duration'), [['all', label('అన్ని వ్యవధులు', 'All durations')], ['unknown', label('తెలియదు', 'Unknown')], ['short', label('1 సంవత్సరం లోపు', 'Under 1 year')], ['medium', label('1–2 సంవత్సరాలు', '1–2 years')], ['long', label('2 సంవత్సరాలకు పైగా', 'Over 2 years')]]],
    ['fine', label('జరిమానా', 'Fine'), [['all', label('అన్ని', 'All')], ['unknown', label('నమోదు కాలేదు', 'Not recorded')], ['none', label('జరిమానా లేదు', 'No fine')], ['low', '₹1–₹250'], ['high', '₹251+']]],
    ['korada', label('కొరడా దెబ్బలు', 'Korada Debbalu'), [['all', label('అన్ని', 'All')], ['unknown', label('తెలియదు', 'Unknown')], ['none', label('0 దెబ్బలు', '0 lashes')], ['recorded', label('నమోదైన దెబ్బలు', 'Recorded lashes')]]]
  ];
  return <div className="p-4 border border-[#D6CFC7] bg-[#F4EFE6] font-ntr"><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">{selects.map(([key,title,options])=><label key={key} className="text-xs font-semibold text-[#57524C]">{title}<select value={filters[key]} onChange={e=>setFilters({...filters,[key]:e.target.value})} className="mt-1 w-full p-2 border border-[#D6CFC7] bg-white text-sm">{options.map(([v,text])=><option key={v} value={v}>{text}</option>)}</select></label>)}</div>{hasActiveFilters&&<button onClick={onReset} className="mt-3 text-xs font-bold text-[#781D22] underline">{t('search.clearFilters')}</button>}</div>;
}
