import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function FighterCard({ fighter, viewMode = 'grid' }) {
  const { isTelugu, t } = useLanguage();
  const fields = [[isTelugu ? 'జిల్లా' : 'District', isTelugu ? fighter.districtTe : fighter.districtEn], [isTelugu ? 'ప్రాంతం' : 'Place', isTelugu ? fighter.placeTe : fighter.placeEn], [isTelugu ? 'సంవత్సరం' : 'Year', fighter.year], [isTelugu ? 'జైలు శిక్ష' : 'Imprisonment duration', isTelugu ? fighter.jailDurationTe : fighter.jailDurationEn], [isTelugu ? 'జరిమానా' : 'Fine', isTelugu ? fighter.fineTe : fighter.fineEn], [isTelugu ? 'కొరడా దెబ్బలు' : 'Korada Debbalu', isTelugu ? fighter.koradaDebbaluTe : fighter.koradaDebbaluEn]];
  return <article className={`border border-[#D6CFC7] bg-white p-5 archive-card-hover ${viewMode === 'list' ? 'grid sm:grid-cols-[minmax(12rem,1fr)_2fr_auto] gap-4 items-start' : ''}`}><div><p className="font-ntr text-xs text-[#8B5A2B] mb-1">{isTelugu ? fighter.districtTe : fighter.districtEn}</p><h3 className="font-gurajada text-3xl leading-[1.25] text-[#1C1917] mb-4"><Link to={`/fighters/${fighter.id}`}>{isTelugu ? fighter.nameTe : fighter.nameEn}</Link></h3></div><dl className="grid grid-cols-2 gap-x-4 gap-y-3 font-ntr text-sm leading-relaxed">{fields.map(([label, value]) => <div key={label}><dt className="text-xs font-semibold text-[#781D22] mb-0.5">{label}</dt><dd className="text-[#2E2A27]">{value}</dd></div>)}</dl><Link to={`/fighters/${fighter.id}`} className="inline-flex mt-5 text-sm font-ntr font-bold text-[#781D22] hover:underline">{t('featured.viewDetails')} →</Link></article>;
}
