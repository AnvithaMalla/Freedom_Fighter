import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/common/SectionHeading';
import { exhibitions } from '../data/exhibitions';
import { artifacts } from '../data/artifacts';
import ArtifactCard from '../components/archive/ArtifactCard';
import ImageLightbox from '../components/common/ImageLightbox';
import { Landmark, Sparkles, BookOpen, Scroll, CheckCircle } from 'lucide-react';

export default function ExhibitionsPage() {
  const { t, isTelugu } = useLanguage();
  const [selectedExhibition, setSelectedExhibition] = useState(exhibitions[0]);
  const [selectedArtifact, setSelectedArtifact] = useState(null);

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-ntr">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Page Header */}
        <SectionHeading
          kicker={t('exhibitions.kicker')}
          title={t('exhibitions.title')}
          subtitle={t('exhibitions.subtitle')}
        />

        {/* Exhibition Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {exhibitions.map(ex => (
            <div
              key={ex.id}
              onClick={() => setSelectedExhibition(ex)}
              className={`p-4 border-2 rounded-xs cursor-pointer transition-all ${
                selectedExhibition.id === ex.id
                  ? 'border-[#781D22] bg-[#FFFFFF] shadow-md -translate-y-1'
                  : 'border-[#D6CFC7] bg-[#F4EFE6] hover:border-[#996515]'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-[#781D22] font-semibold mb-2">
                <span>{isTelugu ? ex.periodTe : ex.periodEn}</span>
                {selectedExhibition.id === ex.id && <CheckCircle className="w-4 h-4 text-[#781D22]" />}
              </div>
              <h3 className="font-gurajada text-xl sm:text-2xl text-[#1C1917] leading-tight mb-2">
                {isTelugu ? ex.titleTe : ex.titleEn}
              </h3>
              <p className="text-[11px] text-[#57524C] line-clamp-2">
                {isTelugu ? ex.shortDescTe : ex.shortDescEn}
              </p>
            </div>
          ))}
        </div>

        {/* Active Virtual Exhibition Gallery Room */}
        <div className="border-4 border-[#781D22] bg-[#FFFFFF] p-6 sm:p-10 rounded-xs shadow-md space-y-8">
          
          {/* Gallery Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b-2 border-[#1C1917]">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider block">
                {isTelugu ? selectedExhibition.curatorTe : selectedExhibition.curatorEn}
              </span>
              <h2 className="font-gurajada text-3xl sm:text-5xl text-[#1C1917] leading-tight">
                {isTelugu ? selectedExhibition.titleTe : selectedExhibition.titleEn}
              </h2>
            </div>

            <div className="text-right shrink-0">
              <span className="px-3 py-1 bg-[#FAF0F0] text-[#781D22] border border-[#781D22] font-bold text-xs">
                {selectedExhibition.itemCount} {isTelugu ? 'ప్రదర్శన వస్తువులు' : 'Exhibits'}
              </span>
            </div>
          </div>

          <p className="font-ntr text-sm sm:text-base text-[#2E2A27] leading-relaxed">
            {isTelugu ? selectedExhibition.shortDescTe : selectedExhibition.shortDescEn}
          </p>

          {/* Exhibition Gallery Artifacts */}
          <div className="space-y-4 pt-4 border-t border-[#D6CFC7]">
            <h3 className="font-gurajada text-2xl text-[#781D22]">
              {isTelugu ? 'ఈ ప్రదర్శనలోని ముఖ్య చారిత్రక ఆధారాలు' : 'Curated Relics in this Gallery Room'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {artifacts.slice(0, 3).map(art => (
                <ArtifactCard
                  key={art.id}
                  artifact={art}
                  onSelect={(item) => setSelectedArtifact(item)}
                />
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox for zooming in on museum artifacts */}
      <ImageLightbox
        artifact={selectedArtifact}
        isOpen={!!selectedArtifact}
        onClose={() => setSelectedArtifact(null)}
      />
    </div>
  );
}
