import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/common/SectionHeading';
import { regionsData } from '../data/regions';
import { fighters } from '../data/fighters';
import FighterCard from '../components/fighters/FighterCard';
import { MapPin, Landmark, Users, ArrowRight, ShieldCheck, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RegionPage() {
  const { t, isTelugu } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  const east = regionsData.eastGodavari;
  const west = regionsData.westGodavari;

  // Filter fighters based on regional selection
  const regionalFighters = fighters.filter(f => {
    if (selectedDistrict === 'all') return true;
    if (selectedDistrict === 'east') return f.districtCode === 'east' || f.districtCode === 'east-west';
    if (selectedDistrict === 'west') return f.districtCode === 'west' || f.districtCode === 'east-west';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-ntr">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Page Header */}
        <SectionHeading
          kicker={t('region.kicker')}
          title={t('region.title')}
          subtitle={t('region.subtitle')}
        />

        {/* District Switcher Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex p-1 border border-[#D6CFC7] bg-[#F4EFE6] rounded-xs font-ntr text-xs sm:text-sm">
            <button
              type="button"
              onClick={() => setSelectedDistrict('all')}
              className={`px-5 py-2 rounded-xs font-semibold transition-colors cursor-pointer ${
                selectedDistrict === 'all'
                  ? 'bg-[#781D22] text-[#FAF7F0]'
                  : 'text-[#57524C] hover:text-[#1C1917]'
              }`}
            >
              {isTelugu ? 'ఉభయ గోదావరి జిల్లాలు (Both Districts)' : 'All Godavari Districts'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedDistrict('east')}
              className={`px-5 py-2 rounded-xs font-semibold transition-colors cursor-pointer ${
                selectedDistrict === 'east'
                  ? 'bg-[#781D22] text-[#FAF7F0]'
                  : 'text-[#57524C] hover:text-[#1C1917]'
              }`}
            >
              {isTelugu ? 'తూర్పు గోదావరి' : 'East Godavari'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedDistrict('west')}
              className={`px-5 py-2 rounded-xs font-semibold transition-colors cursor-pointer ${
                selectedDistrict === 'west'
                  ? 'bg-[#781D22] text-[#FAF7F0]'
                  : 'text-[#57524C] hover:text-[#1C1917]'
              }`}
            >
              {isTelugu ? 'పశ్చిమ గోదావరి' : 'West Godavari'}
            </button>
          </div>
        </div>

        {/* District In-Depth Comparative Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* East Godavari Section */}
          {(selectedDistrict === 'all' || selectedDistrict === 'east') && (
            <div className="border-2 border-[#D6CFC7] bg-[#FFFFFF] p-6 sm:p-8 rounded-xs space-y-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b-2 border-[#781D22]">
                <div>
                  <span className="text-xs font-bold text-[#781D22] uppercase tracking-wider block">
                    {isTelugu ? 'చారిత్రక రాజధాని & ఏజెన్సీ' : 'Historical Capital & Agency Tracts'}
                  </span>
                  <h2 className="font-gurajada text-3xl sm:text-4xl text-[#1C1917]">
                    {isTelugu ? east.nameTe : east.nameEn}
                  </h2>
                </div>
                <div className="text-right">
                  <span className="font-gurajada text-3xl text-[#781D22] font-bold block leading-none">
                    {east.fighterCount}
                  </span>
                  <span className="text-[10px] text-[#57524C] uppercase">{t('stats.fightersLabel')}</span>
                </div>
              </div>

              <p className="text-sm text-[#2E2A27] leading-relaxed">
                {isTelugu ? east.descriptionTe : east.descriptionEn}
              </p>

              {/* Epicenters */}
              <div className="space-y-3">
                <h3 className="font-gurajada text-2xl text-[#1C1917] border-b border-[#D6CFC7] pb-1">
                  {t('region.keyCenters')}
                </h3>
                <div className="space-y-2">
                  {east.epicenters.map((center, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#F4EFE6] border border-[#E8E2D9] rounded-xs flex items-start justify-between gap-3 text-xs"
                    >
                      <div>
                        <strong className="text-[#1C1917] text-sm block">
                          {isTelugu ? center.nameTe : center.nameEn}
                        </strong>
                        <p className="text-[#57524C] mt-0.5">
                          {isTelugu ? center.roleTe : center.roleEn}
                        </p>
                      </div>
                      <span className="font-semibold text-[#781D22] shrink-0 text-xs bg-[#FAF0F0] px-2 py-0.5 border border-[#781D22]/30 rounded-xs">
                        {center.fightersCount}+
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* West Godavari Section */}
          {(selectedDistrict === 'all' || selectedDistrict === 'west') && (
            <div className="border-2 border-[#D6CFC7] bg-[#FFFFFF] p-6 sm:p-8 rounded-xs space-y-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b-2 border-[#996515]">
                <div>
                  <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider block">
                    {isTelugu ? 'రైతాంగ చైతన్యం & తీర సత్యాగ్రహం' : 'Agrarian Mobilization & Coastal Resistance'}
                  </span>
                  <h2 className="font-gurajada text-3xl sm:text-4xl text-[#1C1917]">
                    {isTelugu ? west.nameTe : west.nameEn}
                  </h2>
                </div>
                <div className="text-right">
                  <span className="font-gurajada text-3xl text-[#996515] font-bold block leading-none">
                    {west.fighterCount}
                  </span>
                  <span className="text-[10px] text-[#57524C] uppercase">{t('stats.fightersLabel')}</span>
                </div>
              </div>

              <p className="text-sm text-[#2E2A27] leading-relaxed">
                {isTelugu ? west.descriptionTe : west.descriptionEn}
              </p>

              {/* Epicenters */}
              <div className="space-y-3">
                <h3 className="font-gurajada text-2xl text-[#1C1917] border-b border-[#D6CFC7] pb-1">
                  {t('region.keyCenters')}
                </h3>
                <div className="space-y-2">
                  {west.epicenters.map((center, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#F4EFE6] border border-[#E8E2D9] rounded-xs flex items-start justify-between gap-3 text-xs"
                    >
                      <div>
                        <strong className="text-[#1C1917] text-sm block">
                          {isTelugu ? center.nameTe : center.nameEn}
                        </strong>
                        <p className="text-[#57524C] mt-0.5">
                          {isTelugu ? center.roleTe : center.roleEn}
                        </p>
                      </div>
                      <span className="font-semibold text-[#8B5A2B] shrink-0 text-xs bg-[#FBF6EB] px-2 py-0.5 border border-[#996515]/40 rounded-xs">
                        {center.fightersCount}+
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Regional Freedom Fighters Showcase */}
        <div className="space-y-6 pt-6 border-t-2 border-[#1C1917]">
          <div className="flex items-center justify-between">
            <h3 className="font-gurajada text-3xl sm:text-4xl text-[#1C1917]">
              {isTelugu ? 'ఈ ప్రాంత స్వాతంత్ర్య సమరయోధులు' : 'Regional Freedom Fighters'} ({regionalFighters.length})
            </h3>
            <Link
              to="/fighters"
              className="text-xs font-bold text-[#781D22] hover:underline"
            >
              {t('featured.viewAll')}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionalFighters.map(fighter => (
              <FighterCard key={fighter.id} fighter={fighter} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
