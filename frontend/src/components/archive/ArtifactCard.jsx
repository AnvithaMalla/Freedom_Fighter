import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ZoomIn, Scroll, Calendar, MapPin } from 'lucide-react';

export default function ArtifactCard({ artifact, onSelect }) {
  const { t, isTelugu } = useLanguage();

  const title = isTelugu ? artifact.titleTe : artifact.titleEn;
  const category = isTelugu ? artifact.categoryTe : artifact.categoryEn;
  const district = isTelugu ? artifact.districtTe : artifact.districtEn;
  const shortDesc = isTelugu ? artifact.shortDescTe : artifact.shortDescEn;

  return (
    <article className="border border-[#D6CFC7] bg-[#FFFFFF] rounded-xs overflow-hidden flex flex-col justify-between archive-card-hover group">
      
      {/* Relic Thumbnail with Archival Frame */}
      <div
        onClick={() => onSelect && onSelect(artifact)}
        className="relative h-48 sm:h-52 bg-[#2B2826] overflow-hidden cursor-pointer flex items-center justify-center p-2"
      >
        <img
          src={artifact.image}
          alt={title}
          className="max-h-full max-w-full object-contain filter grayscale contrast-110 group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Category Badge overlay */}
        <div className="absolute top-2.5 left-2.5">
          <span className="px-2 py-0.5 text-xs font-ntr bg-[#781D22] text-[#FAF7F0] font-semibold border border-[#FAF7F0]/30 shadow-xs">
            {category}
          </span>
        </div>

        {/* Provenance ID tag */}
        <div className="absolute bottom-2 right-2">
          <span className="px-1.5 py-0.5 text-[10px] font-mono bg-[#1C1917]/80 text-[#EFE4CA] border border-[#57524C]">
            {artifact.provenance}
          </span>
        </div>

        {/* Hover Zoom Prompt */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-[#FAF7F0] font-ntr text-xs font-semibold">
          <ZoomIn className="w-4 h-4 text-[#EFE4CA]" />
          <span>{t('archiveSection.viewDocument')}</span>
        </div>
      </div>

      {/* Relic Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-[#57524C] font-ntr mb-1.5 pb-1 border-b border-[#E8E2D9]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#996515]" /> {artifact.date || artifact.year}
            </span>
            <span className="text-[#8B5A2B] font-medium">{district}</span>
          </div>

          <h3
            onClick={() => onSelect && onSelect(artifact)}
            className="font-gurajada text-xl sm:text-2xl text-[#1C1917] group-hover:text-[#781D22] transition-colors leading-tight cursor-pointer mb-2"
          >
            {title}
          </h3>

          <p className="font-ntr text-xs text-[#57524C] line-clamp-2 leading-relaxed mb-3">
            {shortDesc}
          </p>
        </div>

        {/* Footer Button */}
        <button
          type="button"
          onClick={() => onSelect && onSelect(artifact)}
          className="w-full py-1.5 px-3 bg-[#F4EFE6] hover:bg-[#781D22] text-[#781D22] hover:text-[#FAF7F0] border border-[#D6CFC7] hover:border-[#781D22] text-xs font-ntr font-semibold rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <ZoomIn className="w-3.5 h-3.5" />
          <span>{t('archiveSection.viewDocument')}</span>
        </button>
      </div>

    </article>
  );
}
