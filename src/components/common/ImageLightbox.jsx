import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X, ZoomIn, ZoomOut, RotateCcw, BookOpen, Scroll, Share2, Download } from 'lucide-react';

export default function ImageLightbox({ artifact, isOpen, onClose }) {
  const { t, isTelugu } = useLanguage();
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!isOpen || !artifact) return null;

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.3, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.3, 0.7));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#FAF7F0] border-4 border-[#781D22] shadow-2xl rounded-xs flex flex-col overflow-hidden">
        
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#F4EFE6] border-b border-[#D6CFC7]">
          <div className="flex items-center gap-2">
            <Scroll className="w-5 h-5 text-[#781D22]" />
            <span className="font-gurajada text-xl sm:text-2xl text-[#1C1917] font-bold">
              {isTelugu ? artifact.titleTe : artifact.titleEn}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-ntr text-[#781D22] font-semibold bg-[#FAF0F0] px-2 py-0.5 border border-[#781D22] hidden sm:inline">
              {artifact.provenance}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[#1C1917] hover:text-[#781D22] hover:bg-[#EAE4D9] rounded-xs cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Column: Image Viewer with Zoom Controls */}
          <div className="lg:col-span-7 p-4 bg-[#2B2826] flex flex-col items-center justify-center relative min-h-[300px] sm:min-h-[420px] overflow-hidden">
            {/* Zoom Controls Bar */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-[#1C1917]/80 p-1 rounded-xs border border-[#57524C]">
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-1.5 text-[#FAF7F0] hover:text-[#996515] hover:bg-[#2E2A27] rounded-xs"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-1.5 text-[#FAF7F0] hover:text-[#996515] hover:bg-[#2E2A27] rounded-xs"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="p-1.5 text-[#FAF7F0] hover:text-[#996515] hover:bg-[#2E2A27] rounded-xs"
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="w-full h-full flex items-center justify-center overflow-auto p-2">
              <img
                src={artifact.image}
                alt={isTelugu ? artifact.titleTe : artifact.titleEn}
                style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s ease-out' }}
                className="max-h-[380px] sm:max-h-[460px] object-contain shadow-lg border-2 border-[#D6CFC7]"
              />
            </div>
            
            <div className="absolute bottom-2 right-3 text-[11px] text-[#A39A90] font-ntr">
              {isTelugu ? 'జూమ్ స్థాయి:' : 'Zoom:'} {Math.round(zoomLevel * 100)}%
            </div>
          </div>

          {/* Right Column: Transcription & Historical Context */}
          <div className="lg:col-span-5 p-4 sm:p-6 bg-[#FAF7F0] overflow-y-auto space-y-4 border-t lg:border-t-0 lg:border-l border-[#D6CFC7]">
            
            {/* Metadata Tags */}
            <div className="flex flex-wrap gap-2 text-xs font-ntr">
              <span className="px-2 py-0.5 bg-[#FAF0F0] text-[#781D22] border border-[#781D22] font-semibold">
                {isTelugu ? artifact.categoryTe : artifact.categoryEn}
              </span>
              <span className="px-2 py-0.5 bg-[#F4EFE6] text-[#57524C] border border-[#D6CFC7]">
                {artifact.date || artifact.year}
              </span>
              <span className="px-2 py-0.5 bg-[#FBF6EB] text-[#8B5A2B] border border-[#996515]">
                {isTelugu ? artifact.districtTe : artifact.districtEn}
              </span>
            </div>

            {/* Document Description */}
            <div>
              <h4 className="font-gurajada text-lg text-[#781D22] border-b border-[#D6CFC7] pb-1">
                {isTelugu ? 'పత్రం సారాంశం' : 'Document Summary'}
              </h4>
              <p className="font-ntr text-sm text-[#2E2A27] mt-1.5 leading-relaxed">
                {isTelugu ? artifact.shortDescTe : artifact.shortDescEn}
              </p>
            </div>

            {/* Telugu Original Transcription */}
            <div className="p-3 bg-[#F4EFE6] border-l-4 border-[#781D22] space-y-1">
              <span className="text-xs font-bold text-[#781D22] font-ntr uppercase tracking-wider block">
                {t('archiveSection.teluguTranscription')}
              </span>
              <p className="font-ntr text-sm text-[#1C1917] italic leading-relaxed">
                {artifact.transcriptionTe}
              </p>
            </div>

            {/* English Translation */}
            <div className="p-3 bg-[#FDFBF7] border-l-4 border-[#996515] space-y-1">
              <span className="text-xs font-bold text-[#8B5A2B] font-editorial uppercase tracking-wider block">
                {t('archiveSection.englishTranslation')}
              </span>
              <p className="font-editorial text-xs sm:text-sm text-[#2E2A27] italic leading-relaxed">
                {artifact.transcriptionEn}
              </p>
            </div>

            {/* Historical Context */}
            <div>
              <h4 className="font-gurajada text-lg text-[#1C1917] border-b border-[#D6CFC7] pb-1">
                {isTelugu ? 'చారిత్రక నేపథ్యం' : 'Historical Context'}
              </h4>
              <p className="font-ntr text-xs sm:text-sm text-[#57524C] mt-1.5 leading-relaxed">
                {isTelugu ? artifact.historicalContextTe : artifact.historicalContextEn}
              </p>
            </div>

            {/* Provenance and Source */}
            <div className="pt-2 border-t border-[#D6CFC7] text-[11px] font-ntr text-[#736B63] space-y-1">
              <div>
                <strong className="text-[#1C1917]">{t('common.source')}:</strong>{' '}
                {isTelugu ? artifact.sourceTe : artifact.sourceEn}
              </div>
              <div>
                <strong className="text-[#1C1917]">{t('common.provenance')}:</strong>{' '}
                {artifact.provenance}
              </div>
            </div>

          </div>

        </div>

        {/* Modal Bottom Footer Bar */}
        <div className="px-4 py-2 bg-[#F4EFE6] border-t border-[#D6CFC7] flex items-center justify-between text-xs font-ntr">
          <span className="text-[#57524C]">
            {isTelugu ? 'డిజిటల్ మ్యూజియం హై-రెస్ వ్యూయర్' : 'Digital Museum High-Resolution Viewer'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-[#781D22] text-[#FAF7F0] font-semibold rounded-xs hover:bg-[#9B282F] transition-colors"
          >
            {t('common.close')}
          </button>
        </div>

      </div>
    </div>
  );
}
