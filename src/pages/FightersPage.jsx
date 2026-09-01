import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { fighters } from '../data/fighters';
import SectionHeading from '../components/common/SectionHeading';
import SearchBar from '../components/common/SearchBar';
import FilterBar from '../components/common/FilterBar';
import FighterGrid from '../components/fighters/FighterGrid';

const initialFilters = { district: 'all', year: 'all', duration: 'all', fine: 'all', korada: 'all' };
export default function FightersPage() {
  const { isTelugu } = useLanguage(); const [query, setQuery] = useState(''); const [filters, setFilters] = useState(initialFilters);
  const filtered = fighters.filter(f => {
    const q = query.trim().toLowerCase();
    if (q && ![f.nameTe,f.nameEn,f.placeTe,f.placeEn,String(f.year)].some(x=>x.toLowerCase().includes(q))) return false;
    if (filters.district !== 'all' && (filters.district === 'east' ? !['east','east-west'].includes(f.districtCode) : filters.district === 'west' ? !['west','east-west'].includes(f.districtCode) : f.districtCode !== filters.district)) return false;
    if (filters.year !== 'all' && f.year !== Number(filters.year)) return false;
    if (filters.duration !== 'all' && !(filters.duration === 'unknown' ? f.durationMonths === null : filters.duration === 'short' ? f.durationMonths > 0 && f.durationMonths < 12 : filters.duration === 'medium' ? f.durationMonths >= 12 && f.durationMonths <= 24 : f.durationMonths > 24)) return false;
    if (filters.fine !== 'all' && !(filters.fine === 'unknown' ? f.fineAmount === null : filters.fine === 'none' ? f.fineAmount === 0 : filters.fine === 'low' ? f.fineAmount > 0 && f.fineAmount <= 250 : f.fineAmount > 250)) return false;
    if (filters.korada !== 'all' && !(filters.korada === 'unknown' ? f.koradaCount === null : filters.korada === 'none' ? f.koradaCount === 0 : f.koradaCount > 0)) return false;
    return true;
  });
  const active = query !== '' || Object.values(filters).some(x=>x !== 'all');
  return <div className="min-h-screen bg-[#FAF7F0] py-10 px-4 sm:px-6 lg:px-8 font-ntr"><div className="max-w-7xl mx-auto space-y-7"><SectionHeading kicker={isTelugu ? 'తూర్పు & పశ్చిమ గోదావరి' : 'East & West Godavari'} title={isTelugu ? 'గోదావరి స్వాతంత్ర్య సమరయోధులు' : 'Godavari Freedom Fighters'} subtitle={isTelugu ? 'పేరు, ప్రాంతం, సంవత్సరం మరియు రికార్డు వివరాల ద్వారా అన్వేషించండి.' : 'Explore records by name, place, year, and recorded imprisonment details.'}/><SearchBar value={query} onChange={setQuery}/><FilterBar filters={filters} setFilters={setFilters} hasActiveFilters={active} onReset={()=>{setQuery('');setFilters(initialFilters)}}/><FighterGrid fighters={filtered}/></div></div>;
}
