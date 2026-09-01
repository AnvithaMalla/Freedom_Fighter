import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/common/SectionHeading';
import { articles as stories } from '../data/articles';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, User, ArrowRight } from 'lucide-react';

export default function StoriesPage() {
  const { t, isTelugu } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-ntr">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Page Header */}
        <SectionHeading
          kicker={t('stories.kicker')}
          title={t('stories.title')}
          subtitle={t('stories.subtitle')}
        />

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map(story => (
            <article
              key={story.id}
              className="border-2 border-[#D6CFC7] bg-[#FFFFFF] rounded-xs overflow-hidden flex flex-col justify-between shadow-xs archive-card-hover group"
            >
              <div className="relative h-56 sm:h-64 bg-[#2B2826] overflow-hidden">
                <img
                  src={story.image}
                  alt={isTelugu ? story.titleTe : story.titleEn}
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-3 py-1 text-xs font-ntr bg-[#781D22] text-[#FAF7F0] font-semibold border border-[#FAF7F0]/30 shadow-xs">
                  {isTelugu ? story.kickerTe : story.kickerEn}
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 text-xs font-ntr bg-[#1C1917]/80 text-[#FAF7F0] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#EFE4CA]" />
                  <span>{story.readTime} {t('stories.readTime')}</span>
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#8B5A2B] font-semibold mb-1">
                    <span>{isTelugu ? story.authorTe : story.authorEn}</span>
                    <span>•</span>
                    <span>{story.date}</span>
                  </div>

                  <h3 className="font-gurajada text-3xl text-[#1C1917] group-hover:text-[#781D22] transition-colors leading-tight mb-2">
                    <Link to={`/stories/${story.id}`}>
                      {isTelugu ? story.titleTe : story.titleEn}
                    </Link>
                  </h3>

                  <p className="font-ntr text-sm text-[#57524C] line-clamp-3 leading-relaxed">
                    {isTelugu ? story.excerptTe : story.excerptEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8E2D9] flex items-center justify-between">
                  <Link
                    to={`/stories/${story.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-ntr font-bold text-[#781D22] hover:text-[#9B282F] transition-colors"
                  >
                    <span>{t('stories.readArticle')}</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
