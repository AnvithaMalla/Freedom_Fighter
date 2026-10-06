import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import SectionHeading from '../common/SectionHeading';
import { exhibitions } from '../../data/exhibitions';
import { Sparkles, ArrowRight, Eye, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeaturedExhibitions() {
  const { t, isTelugu } = useLanguage();

  return (
    <section className="bg-[#FAF7F0] border-b border-[#D6CFC7] py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <SectionHeading
          kicker={t('exhibitions.kicker')}
          title={t('exhibitions.title')}
          subtitle={t('exhibitions.subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {exhibitions.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className="border-2 border-[#D6CFC7] bg-[#FFFFFF] rounded-xs overflow-hidden flex flex-col justify-between shadow-xs archive-card-hover group"
            >
              <div className="relative h-48 sm:h-56 bg-[#2B2826] overflow-hidden">
                <img
                  src={item.image}
                  alt={isTelugu ? item.titleTe : item.titleEn}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#781D22] text-[#FAF7F0] px-2.5 py-0.5 text-xs font-ntr font-semibold">
                  {isTelugu ? item.periodTe : item.periodEn}
                </div>
                <div className="absolute bottom-3 right-3 bg-[#1C1917]/80 text-[#EFE4CA] px-2 py-0.5 text-xs font-ntr">
                  {item.itemCount} {isTelugu ? 'వస్తువులు & పత్రాలు' : 'Archival Exhibits'}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-xs font-ntr text-[#8B5A2B] font-semibold block">
                    {isTelugu ? item.curatorTe : item.curatorEn}
                  </span>
                  <h3 className="font-gurajada text-2xl sm:text-3xl text-[#1C1917] group-hover:text-[#781D22] transition-colors leading-tight mt-1">
                    <Link to="/exhibitions">{isTelugu ? item.titleTe : item.titleEn}</Link>
                  </h3>
                  <p className="font-ntr text-xs sm:text-sm text-[#57524C] mt-2 leading-relaxed">
                    {isTelugu ? item.shortDescTe : item.shortDescEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8E2D9]">
                  <Link
                    to="/exhibitions"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-ntr font-bold text-[#781D22] hover:text-[#9B282F] transition-colors"
                  >
                    <span>{t('exhibitions.viewExhibition')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
