import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/common/SectionHeading';
import ArtifactCard from '../components/archive/ArtifactCard';
import ImageLightbox from '../components/common/ImageLightbox';
import { artifacts } from '../data/artifacts';
import { Search, Filter, Scroll, Sparkles } from 'lucide-react';

export default function ArchivePage() {
  const { t, isTelugu } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArtifact, setSelectedArtifact] = useState(null);

  const categories = [
    { id: 'all', label: t('archiveSection.categories.all') },
    { id: 'documents', label: t('archiveSection.categories.documents') },
    { id: 'postcards', label: t('archiveSection.categories.postcards') },
    { id: 'stamps', label: t('archiveSection.categories.stamps') },
    { id: 'letters', label: t('archiveSection.categories.letters') },
  ];

  const filteredArtifacts = artifacts.filter(art => {
    if (selectedCategory !== 'all' && art.category !== selectedCategory) {
      return false;
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchTitle =
        art.titleTe.toLowerCase().includes(q) ||
        art.titleEn.toLowerCase().includes(q);
      const matchPerson =
        art.personTe.toLowerCase().includes(q) ||
        art.personEn.toLowerCase().includes(q);
      const matchDesc =
        art.shortDescTe.toLowerCase().includes(q) ||
        art.shortDescEn.toLowerCase().includes(q);
      const matchProv = art.provenance.toLowerCase().includes(q);

      if (!matchTitle && !matchPerson && !matchDesc && !matchProv) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-ntr">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <SectionHeading
          kicker={t('archiveSection.kicker')}
          title={t('archiveSection.title')}
          subtitle={t('archiveSection.subtitle')}
        />

        {/* Search & Category Filter Bar */}
        <div className="p-4 border border-[#D6CFC7] bg-[#F4EFE6] rounded-xs space-y-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#D6CFC7]">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-bold text-[#781D22] mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                {isTelugu ? 'వర్గాలు:' : 'Categories:'}
              </span>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-xs font-semibold transition-colors cursor-pointer border ${
                    selectedCategory === cat.id
                      ? 'bg-[#781D22] text-[#FAF7F0] border-[#781D22]'
                      : 'bg-[#FAF7F0] text-[#57524C] border-[#D6CFC7] hover:border-[#781D22]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <span className="text-xs font-semibold text-[#57524C]">
              {filteredArtifacts.length} {isTelugu ? 'ఆధారాలు లభించాయి' : 'historical items found'}
            </span>
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                isTelugu
                  ? 'చారిత్రక పత్రం పేరు, వ్యక్తి లేదా రిఫరెన్స్ నంబర్ వెతకండి... (ఉదా: చింతపల్లి, గాంధీ, 1922)'
                  : 'Search by relic title, person, or reference ID... (e.g., Chintapalli, Gandhi, 1922)'
              }
              className="w-full py-2.5 pl-10 pr-4 font-ntr text-sm border border-[#D6CFC7] bg-[#FAF7F0] text-[#1C1917] rounded-xs focus:outline-none focus:border-[#781D22]"
            />
            <Search className="w-4 h-4 text-[#781D22] absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

        </div>

        {/* Artifacts Grid */}
        {filteredArtifacts.length === 0 ? (
          <div className="text-center py-12 p-6 border-2 border-dashed border-[#D6CFC7] bg-[#FDFBF7] rounded-xs">
            <p className="font-gurajada text-2xl text-[#781D22]">
              {t('search.noResults')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtifacts.map(artifact => (
              <ArtifactCard
                key={artifact.id}
                artifact={artifact}
                onSelect={(art) => setSelectedArtifact(art)}
              />
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Examination Reader */}
      <ImageLightbox
        artifact={selectedArtifact}
        isOpen={!!selectedArtifact}
        onClose={() => setSelectedArtifact(null)}
      />
    </div>
  );
}
