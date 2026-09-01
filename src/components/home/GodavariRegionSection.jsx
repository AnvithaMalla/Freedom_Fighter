import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import SectionHeading from '../common/SectionHeading';
import { regionsData } from '../../data/regions';
import { MapPin, Landmark, ArrowRight, ShieldCheck, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GodavariRegionSection() {
  const { t, isTelugu } = useLanguage();
  const [activeTab, setActiveTab] = useState('both');

  const east = regionsData.eastGodavari;
  const west = regionsData.westGodavari;

  return (
    <section className="bg-[#FAF7F0] border-b border-[#D6CFC7] py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <SectionHeading
          kicker={t('region.kicker')}
          title={t('region.title')}
          subtitle={t('region.subtitle')}
        />

        {/* District Switcher Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 border border-[#D6CFC7] bg-[#F4EFE6] rounded-xs font-ntr text-xs sm:text-sm">
            <button
              type="button"
              onClick={() => setActiveTab('both')}
              className={`px-4 py-1.5 rounded-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'both'
                  ? 'bg-[#781D22] text-[#FAF7F0]'
                  : 'text-[#57524C] hover:text-[#1C1917]'
              }`}
            >
              {isTelugu ? 'రెండు జిల్లాలు (ఉభయ గోదావరి)' : 'Both Godavari Districts'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('east')}
              className={`px-4 py-1.5 rounded-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'east'
                  ? 'bg-[#781D22] text-[#FAF7F0]'
                  : 'text-[#57524C] hover:text-[#1C1917]'
              }`}
            >
              {t('region.eastTitle')}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('west')}
              className={`px-4 py-1.5 rounded-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'west'
                  ? 'bg-[#781D22] text-[#FAF7F0]'
                  : 'text-[#57524C] hover:text-[#1C1917]'
              }`}
            >
              {t('region.westTitle')}
            </button>
          </div>
        </div>

        {/* Regional Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* East Godavari Card */}
          {(activeTab === 'both' || activeTab === 'east') && (
            <div className="border-2 border-[#D6CFC7] bg-[#FFFFFF] p-6 rounded-xs flex flex-col justify-between shadow-xs archive-card-hover">
              <div>
                {/* District Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#781D22]">
                  <div>
                    <h3 className="font-gurajada text-3xl sm:text-4xl text-[#1C1917]">
                      {isTelugu ? east.nameTe : east.nameEn}
                    </h3>
                    <p className="font-ntr text-xs text-[#781D22] font-semibold">
                      {isTelugu ? east.headquartersTe : east.headquartersEn}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-gurajada text-2xl sm:text-3xl text-[#781D22] font-bold block leading-none">
                      {east.fighterCount}
                    </span>
                    <span className="font-ntr text-[10px] text-[#57524C] uppercase tracking-wider">
                      {t('stats.fightersLabel')}
                    </span>
                  </div>
                </div>

                <p className="font-ntr text-sm text-[#2E2A27] leading-relaxed mb-4">
                  {isTelugu ? east.descriptionTe : east.descriptionEn}
                </p>

                {/* Epicenters List */}
                <div className="space-y-2 mb-6">
                  <h4 className="font-ntr text-xs font-bold text-[#8B5A2B] uppercase tracking-wider">
                    {t('region.keyCenters')}:
                  </h4>
                  {east.epicenters.map((center, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-[#F4EFE6] border border-[#E8E2D9] rounded-xs font-ntr text-xs flex items-start justify-between gap-2"
                    >
                      <div>
                        <strong className="text-[#1C1917] block">
                          {isTelugu ? center.nameTe : center.nameEn}
                        </strong>
                        <span className="text-[#57524C] text-[11px]">
                          {isTelugu ? center.roleTe : center.roleEn}
                        </span>
                      </div>
                      <span className="font-semibold text-[#781D22] shrink-0 text-[11px]">
                        {center.fightersCount}+ {isTelugu ? 'యోధులు' : 'fighters'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Link
                to="/fighters?district=east"
                className="w-full py-2.5 px-4 bg-[#781D22] text-[#FAF7F0] font-ntr font-semibold text-sm rounded-xs hover:bg-[#9B282F] transition-colors flex items-center justify-center gap-2"
              >
                <span>{t('region.exploreRegion')} ({isTelugu ? east.nameTe : east.nameEn})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* West Godavari Card */}
          {(activeTab === 'both' || activeTab === 'west') && (
            <div className="border-2 border-[#D6CFC7] bg-[#FFFFFF] p-6 rounded-xs flex flex-col justify-between shadow-xs archive-card-hover">
              <div>
                {/* District Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#996515]">
                  <div>
                    <h3 className="font-gurajada text-3xl sm:text-4xl text-[#1C1917]">
                      {isTelugu ? west.nameTe : west.nameEn}
                    </h3>
                    <p className="font-ntr text-xs text-[#8B5A2B] font-semibold">
                      {isTelugu ? west.headquartersTe : west.headquartersEn}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-gurajada text-2xl sm:text-3xl text-[#996515] font-bold block leading-none">
                      {west.fighterCount}
                    </span>
                    <span className="font-ntr text-[10px] text-[#57524C] uppercase tracking-wider">
                      {t('stats.fightersLabel')}
                    </span>
                  </div>
                </div>

                <p className="font-ntr text-sm text-[#2E2A27] leading-relaxed mb-4">
                  {isTelugu ? west.descriptionTe : west.descriptionEn}
                </p>

                {/* Epicenters List */}
                <div className="space-y-2 mb-6">
                  <h4 className="font-ntr text-xs font-bold text-[#8B5A2B] uppercase tracking-wider">
                    {t('region.keyCenters')}:
                  </h4>
                  {west.epicenters.map((center, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-[#F4EFE6] border border-[#E8E2D9] rounded-xs font-ntr text-xs flex items-start justify-between gap-2"
                    >
                      <div>
                        <strong className="text-[#1C1917] block">
                          {isTelugu ? center.nameTe : center.nameEn}
                        </strong>
                        <span className="text-[#57524C] text-[11px]">
                          {isTelugu ? center.roleTe : center.roleEn}
                        </span>
                      </div>
                      <span className="font-semibold text-[#8B5A2B] shrink-0 text-[11px]">
                        {center.fightersCount}+ {isTelugu ? 'యోధులు' : 'fighters'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Link
                to="/fighters?district=west"
                className="w-full py-2.5 px-4 bg-[#996515] text-[#FAF7F0] font-ntr font-semibold text-sm rounded-xs hover:bg-[#8B5A2B] transition-colors flex items-center justify-center gap-2"
              >
                <span>{t('region.exploreRegion')} ({isTelugu ? west.nameTe : west.nameEn})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
