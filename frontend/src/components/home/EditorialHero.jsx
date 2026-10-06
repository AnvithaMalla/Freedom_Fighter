import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Search, Compass, Quote, Award, Sparkles } from 'lucide-react';

export default function EditorialHero() {
  const { t, isTelugu } = useLanguage();

  return (
    <section className="bg-[#FAF7F0] border-b border-[#D6CFC7] py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Newspaper Kicker Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#781D22] uppercase font-ntr">
            <span className="h-[1px] w-6 bg-[#781D22]"></span>
            <span>{t('hero.kicker')}</span>
            <span className="h-[1px] w-6 bg-[#781D22]"></span>
          </div>
        </div>

        {/* Lead Multi-Column Newspaper Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start border-t-2 border-b-2 border-[#1C1917] py-6 my-2">
          
          {/* Left Column (5 Cols): Editorial Headline & Lead Narrative */}
          <div className="lg:col-span-5 space-y-4 lg:pr-6 lg:border-r border-[#D6CFC7]">
            <h1 className="font-gurajada text-4xl sm:text-5xl md:text-6xl text-[#1C1917] leading-[1.08] tracking-tight">
              {t('hero.headline')}
            </h1>

            <p className="font-ntr text-base sm:text-lg text-[#781D22] font-semibold leading-snug">
              {t('hero.subheadline')}
            </p>

            <p className="font-ntr text-sm sm:text-base text-[#2E2A27] leading-relaxed drop-cap text-justify">
              {t('hero.leadParagraph')}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/fighters"
                className="px-5 py-2.5 bg-[#781D22] text-[#FAF7F0] font-ntr font-semibold text-sm sm:text-base rounded-xs hover:bg-[#9B282F] transition-all shadow-xs flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#EFE4CA]" />
                <span>{t('hero.exploreArchive')}</span>
              </Link>

              <Link
                to="/fighters?focus=search"
                className="px-5 py-2.5 bg-[#F4EFE6] text-[#1C1917] hover:text-[#781D22] border border-[#D6CFC7] hover:border-[#781D22] font-ntr font-semibold text-sm sm:text-base rounded-xs transition-colors flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-[#781D22]" />
                <span>{t('hero.searchFighters')}</span>
              </Link>
            </div>
          </div>

          {/* Center Column (4 Cols): Historical Portrait Collage */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="w-full border-2 border-[#D6CFC7] bg-[#FFFFFF] p-2 sm:p-3 shadow-md relative">
              <div className="h-64 sm:h-72 w-full bg-[#2B2826] overflow-hidden border border-[#D6CFC7] relative">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
                  alt="Godavari Freedom Struggle Collage"
                  className="w-full h-full object-cover filter grayscale contrast-125 brightness-95"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-[#FAF7F0]">
                  <span className="text-[11px] font-ntr bg-[#781D22] px-2 py-0.5 font-semibold">
                    {isTelugu ? 'చారిత్రక సంకలనం' : 'Archival Collage'}
                  </span>
                  <p className="font-gurajada text-lg sm:text-xl text-[#FAF7F0] mt-1 leading-tight">
                    {isTelugu ? 'మన్యం నుండి తీరం వరకు: గోదావరి విప్లవ ఘట్టాలు' : 'From Jungle Forests to the Coast: Godavari Chronicles'}
                  </p>
                </div>
              </div>

              {/* Photo Caption */}
              <div className="mt-2 text-center text-xs text-[#57524C] font-ntr italic">
                {isTelugu 
                  ? 'గోదావరి స్వాతంత్ర్య సమరయోధుల జ్ఞాపకార్థం భద్రపరిచిన చారిత్రక ఛాయాచిత్రాల సంచిక' 
                  : 'Preserved photographic and documentary records of Telugu freedom fighters'}
              </div>
            </div>
          </div>

          {/* Right Column (3 Cols): Historic Quote & Archival Snippet */}
          <div className="lg:col-span-3 space-y-4 lg:pl-4 flex flex-col justify-between h-full">
            
            {/* Historical Quote Box */}
            <div className="p-4 border border-[#996515] bg-[#FBF6EB] rounded-xs space-y-2 relative">
              <Quote className="w-6 h-6 text-[#996515]/40 absolute top-2 right-2" />
              <span className="text-[11px] font-bold text-[#8B5A2B] font-ntr uppercase tracking-wider block">
                {isTelugu ? 'విప్లవకారుల ప్రతిజ్ఞ' : 'Pledge of Revolutionaries'}
              </span>
              <p className="font-editorial text-xs sm:text-sm text-[#1C1917] italic leading-relaxed">
                {t('hero.featuredQuote')}
              </p>
              <span className="font-ntr text-xs text-[#781D22] font-semibold block text-right">
                {t('hero.quoteAuthor')}
              </span>
            </div>

            {/* Regional Focus Mini Box */}
            <div className="p-3.5 border border-[#D6CFC7] bg-[#F4EFE6] rounded-xs space-y-1.5 font-ntr text-xs">
              <div className="flex items-center gap-1.5 text-[#781D22] font-bold">
                <Award className="w-4 h-4 text-[#996515]" />
                <span>{isTelugu ? 'రెండు జిల్లాల పోరాట కేంద్రాలు' : 'Two Resistance Districts'}</span>
              </div>
              <p className="text-[#57524C] leading-snug">
                {isTelugu 
                  ? 'తూర్పు గోదావరి (రాజమండ్రి, కాకినాడ, రంప) & పశ్చిమ గోదావరి (పాలకొల్లు, ఏలూరు, భీమవరం).' 
                  : 'East Godavari (Rajahmundry, Kakinada, Rampa) & West Godavari (Palakollu, Eluru, Bhimavaram).'}
              </p>
              <Link to="/region" className="text-[#781D22] font-bold inline-block hover:underline pt-1">
                {isTelugu ? 'ప్రాంత వివరాలు చూడండి →' : 'Explore Regions →'}
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
