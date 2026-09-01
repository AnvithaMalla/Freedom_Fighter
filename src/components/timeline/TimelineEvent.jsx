import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { fighters } from '../../data/fighters';
import { artifacts } from '../../data/artifacts';
import { Calendar, MapPin, Users, Scroll, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TimelineEvent({ event, index }) {
  const { t, isTelugu } = useLanguage();

  const title = isTelugu ? event.titleTe : event.titleEn;
  const place = isTelugu ? event.placeTe : event.placeEn;
  const district = isTelugu ? event.districtTe : event.districtEn;
  const date = isTelugu ? event.date : event.dateEn;
  const shortDesc = isTelugu ? event.shortDescTe : event.shortDescEn;

  // Find linked fighters
  const connectedFighters = (event.relatedFighterIds || [])
    .map(id => fighters.find(f => f.id === id))
    .filter(Boolean);

  // Find linked artifacts
  const connectedArtifacts = (event.relatedArtifactIds || [])
    .map(id => artifacts.find(a => a.id === id))
    .filter(Boolean);

  const isEven = index % 2 === 0;

  return (
    <div className="relative flex flex-col md:flex-row items-start group">
      
      {/* Timeline Center Node Badge */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-4 w-12 h-12 bg-[#FAF7F0] border-2 border-[#781D22] rounded-full items-center justify-center text-xs font-bold text-[#781D22] z-10 shadow-xs group-hover:bg-[#781D22] group-hover:text-[#FAF7F0] transition-colors font-gurajada text-lg">
        {event.year}
      </div>

      {/* Content Container (Alternating on Desktop) */}
      <div className={`w-full md:w-[calc(50%-2rem)] ${isEven ? 'md:mr-auto' : 'md:ml-auto'} mb-8`}>
        <div className="border-2 border-[#D6CFC7] bg-[#FFFFFF] p-5 sm:p-6 rounded-xs shadow-xs archive-card-hover">
          
          {/* Mobile Year Badge */}
          <div className="flex md:hidden items-center justify-between pb-2 mb-3 border-b border-[#D6CFC7]">
            <span className="font-gurajada text-3xl text-[#781D22] font-bold">{event.year}</span>
            <span className="text-xs font-ntr text-[#57524C]">{date}</span>
          </div>

          <div className="hidden md:flex items-center justify-between pb-2 mb-2 border-b border-[#E8E2D9] text-xs font-ntr">
            <span className="px-2 py-0.5 bg-[#FAF0F0] text-[#781D22] border border-[#781D22] font-semibold">
              {district}
            </span>
            <span className="text-[#57524C] flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#996515]" /> {date}
            </span>
          </div>

          <h3 className="font-gurajada text-2xl sm:text-3xl text-[#1C1917] leading-tight mb-2">
            {title}
          </h3>

          <p className="text-xs font-ntr text-[#8B5A2B] font-semibold flex items-center gap-1 mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#996515]" />
            <span>{place}</span>
          </p>

          <p className="font-ntr text-xs sm:text-sm text-[#2E2A27] leading-relaxed mb-4">
            {shortDesc}
          </p>

          {/* Connected Freedom Fighters */}
          {connectedFighters.length > 0 && (
            <div className="pt-3 border-t border-[#E8E2D9] space-y-1.5">
              <span className="text-[11px] font-bold text-[#781D22] font-ntr uppercase flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{t('timeline.relatedFighters')}:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {connectedFighters.map(f => (
                  <Link
                    key={f.id}
                    to={`/fighters/${f.id}`}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#F4EFE6] hover:bg-[#FAF0F0] text-[#1C1917] hover:text-[#781D22] border border-[#D6CFC7] hover:border-[#781D22] text-xs font-ntr rounded-xs transition-colors"
                  >
                    <span>{isTelugu ? f.nameTe : f.nameEn}</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Connected Relics */}
          {connectedArtifacts.length > 0 && (
            <div className="pt-2 space-y-1.5">
              <span className="text-[11px] font-bold text-[#8B5A2B] font-ntr uppercase flex items-center gap-1">
                <Scroll className="w-3 h-3" />
                <span>{t('timeline.relatedArtifacts')}:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {connectedArtifacts.map(a => (
                  <Link
                    key={a.id}
                    to={`/archive?highlight=${a.id}`}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#FBF6EB] text-[#8B5A2B] border border-[#996515] text-xs font-ntr rounded-xs hover:underline"
                  >
                    <span>{isTelugu ? a.titleTe : a.titleEn}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
