import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { articles as stories } from '../data/articles';
import { ArrowLeft, Clock, Calendar, User, Share2, BookOpen, Scroll } from 'lucide-react';

export default function StoryDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, isTelugu } = useLanguage();

  const story = stories.find(s => s.id === id);

  if (!story) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex flex-col items-center justify-center p-6 text-center font-ntr">
        <h2 className="font-gurajada text-4xl text-[#781D22] mb-3">
          {isTelugu ? 'కథనం లభించలేదు' : 'Article Not Found'}
        </h2>
        <Link to="/stories" className="px-4 py-2 bg-[#781D22] text-[#FAF7F0] font-semibold text-sm rounded-xs">
          ← {t('common.back')}
        </Link>
      </div>
    );
  }

  const title = isTelugu ? story.titleTe : story.titleEn;
  const kicker = isTelugu ? story.kickerTe : story.kickerEn;
  const author = isTelugu ? story.authorTe : story.authorEn;
  const content = isTelugu ? story.contentTe : story.contentEn;

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-ntr">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Back Link */}
        <div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#57524C] hover:text-[#781D22] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('common.back')}</span>
          </button>
        </div>

        {/* Newspaper Article Container */}
        <article className="border-4 border-[#1C1917] bg-[#FFFFFF] p-6 sm:p-10 rounded-xs shadow-md space-y-6">
          
          {/* Headline & Metadata */}
          <div className="text-center space-y-2 pb-6 border-b-2 border-[#1C1917]">
            <span className="text-xs font-bold tracking-[0.25em] text-[#781D22] uppercase font-ntr">
              {kicker}
            </span>

            <h1 className="font-gurajada text-4xl sm:text-5xl md:text-6xl text-[#1C1917] leading-[1.1] tracking-tight">
              {title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#57524C] pt-2">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#996515]" /> {author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#996515]" /> {story.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#996515]" /> {story.readTime} {t('stories.readTime')}
              </span>
            </div>
          </div>

          {/* Lead Image Frame */}
          <div className="border border-[#D6CFC7] bg-[#F4EFE6] p-2">
            <div className="h-64 sm:h-80 w-full overflow-hidden bg-[#2B2826]">
              <img
                src={story.image}
                alt={title}
                className="w-full h-full object-cover grayscale contrast-110"
              />
            </div>
            <p className="text-[11px] text-[#57524C] font-ntr italic text-center mt-1.5">
              {isTelugu ? 'గోదావరి స్వాతంత్ర్య ఆర్కైవ్ చారిత్రక ఛాయాచిత్ర నిధి' : 'Archival photography • Godavari Freedom Digital Heritage'}
            </p>
          </div>

          {/* Editorial Article Body with Drop Cap */}
          <div className="space-y-4 pt-2 text-[#2E2A27] font-ntr text-base sm:text-lg leading-relaxed drop-cap text-justify whitespace-pre-line">
            {content}
          </div>

          {/* Newspaper Editorial Sign-off */}
          <div className="pt-6 border-t border-[#D6CFC7] flex items-center justify-between text-xs text-[#736B63]">
            <span className="italic">{isTelugu ? 'గోదావరి ఆర్కైవ్ సంపాదక వర్గం' : 'Godavari Freedom Archive Editorial Desk'}</span>
            <Link to="/stories" className="font-bold text-[#781D22] hover:underline">
              ← {isTelugu ? 'మరిన్ని కథనాలు' : 'More Articles'}
            </Link>
          </div>

        </article>

      </div>
    </div>
  );
}
