import React from 'react';
import { Lock, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function JailBadge({ durationTe, durationEn, placeTe, placeEn, prisonerNo, compact = false }) {
  const { isTelugu } = useLanguage();

  const duration = isTelugu ? durationTe : durationEn;
  const place = isTelugu ? placeTe : placeEn;

  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-ntr border border-[#781D22] bg-[#FAF0F0] text-[#781D22] rounded-xs font-semibold">
        <Lock className="w-3 h-3 text-[#781D22] shrink-0" />
        <span className="truncate">{duration || place}</span>
      </div>
    );
  }

  return (
    <div className="border border-[#781D22]/40 bg-[#FAF0F0] p-2.5 rounded-xs space-y-1 font-ntr text-xs">
      <div className="flex items-center justify-between text-[#781D22] font-semibold pb-1 border-b border-[#781D22]/20">
        <span className="flex items-center gap-1">
          <Lock className="w-3.5 h-3.5" />
          <span>{isTelugu ? 'కారాగార రికార్డు' : 'Prison Record'}</span>
        </span>
        {prisonerNo && (
          <span className="text-[10px] bg-[#781D22] text-[#FAF7F0] px-1.5 py-0.2 rounded-xs font-mono">
            {prisonerNo}
          </span>
        )}
      </div>

      <div className="text-[#2E2A27]">
        <strong className="text-[#781D22]">{isTelugu ? 'వ్యవధి: ' : 'Duration: '}</strong>
        <span>{duration}</span>
      </div>

      {place && (
        <div className="text-[#57524C] flex items-start gap-1">
          <MapPin className="w-3 h-3 text-[#996515] shrink-0 mt-0.5" />
          <span className="text-[11px]">{place}</span>
        </div>
      )}
    </div>
  );
}
