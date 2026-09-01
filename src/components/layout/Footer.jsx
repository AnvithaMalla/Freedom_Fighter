import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';
import { BookOpen, ShieldCheck, Heart, Sparkles, ScrollText, Landmark } from 'lucide-react';

export default function Footer() {
  const { t, isTelugu } = useLanguage();

  return (
    <footer className="bg-[#F4EFE6] border-t-4 border-[#781D22] pt-10 pb-8 text-[#2E2A27] font-ntr">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-[#D6CFC7]">
          
          {/* Col 1: Colophon / About the Archive */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ScrollText className="w-5 h-5 text-[#781D22]" />
              <h3 className="font-gurajada text-2xl text-[#1C1917] font-bold">
                {isTelugu ? 'గోదావరి స్వాతంత్ర్య ఆర్కైవ్' : 'Godavari Freedom Archive'}
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-[#57524C]">
              {isTelugu
                ? 'తూర్పు మరియు పశ్చిమ గోదావరి జిల్లాల స్వాతంత్ర్య సమరయోధుల చరిత్ర, జైలు రికార్డులు, లేఖలు మరియు చారిత్రక ఆధారాల శాశ్వత డిజిటల్ పరిశోధనా నిధి.'
                : 'A permanent digital repository documenting the sacrifices, prison ledgers, letters, and rare archival relics of Telugu freedom fighters from East and West Godavari.'}
            </p>
            <div className="inline-block p-2 border border-[#D6CFC7] bg-[#FAF7F0] text-[11px] text-[#781D22] font-semibold">
              {isTelugu ? '❖ 1,000+ స్వాతంత్ర్య సమరయోధుల రికార్డులు' : '❖ 1,000+ Freedom Fighters Documented'}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-gurajada text-xl text-[#781D22] border-b border-[#D6CFC7] pb-1">
              {isTelugu ? 'ఆర్కైవ్ విభాగాలు' : 'Archive Sections'}
            </h4>
            <ul className="space-y-1.5 text-xs text-[#57524C]">
              <li>
                <Link to="/fighters" className="hover:text-[#781D22] transition-colors flex items-center gap-1.5">
                  <span>›</span> {t('nav.fighters')}
                </Link>
              </li>
              <li>
                <Link to="/region" className="hover:text-[#781D22] transition-colors flex items-center gap-1.5">
                  <span>›</span> {t('nav.region')}
                </Link>
              </li>
              <li>
                <Link to="/archive" className="hover:text-[#781D22] transition-colors flex items-center gap-1.5">
                  <span>›</span> {t('nav.archive')}
                </Link>
              </li>
              <li>
                <Link to="/timeline" className="hover:text-[#781D22] transition-colors flex items-center gap-1.5">
                  <span>›</span> {t('nav.timeline')}
                </Link>
              </li>
              <li>
                <Link to="/stories" className="hover:text-[#781D22] transition-colors flex items-center gap-1.5">
                  <span>›</span> {t('nav.stories')}
                </Link>
              </li>
              <li>
                <Link to="/exhibitions" className="hover:text-[#781D22] transition-colors flex items-center gap-1.5">
                  <span>›</span> {t('nav.exhibitions')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Godavari Epicenters */}
          <div className="space-y-3">
            <h4 className="font-gurajada text-xl text-[#781D22] border-b border-[#D6CFC7] pb-1">
              {isTelugu ? 'ప్రధాన విప్లవ కేంద్రాలు' : 'Major Struggle Centers'}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#57524C]">
              <span className="p-1 border border-[#E8E2D9] bg-[#FAF7F0] text-center">రాజమండ్రి</span>
              <span className="p-1 border border-[#E8E2D9] bg-[#FAF7F0] text-center">పాలకొల్లు</span>
              <span className="p-1 border border-[#E8E2D9] bg-[#FAF7F0] text-center">కాకినాడ</span>
              <span className="p-1 border border-[#E8E2D9] bg-[#FAF7F0] text-center">భీమవరం</span>
              <span className="p-1 border border-[#E8E2D9] bg-[#FAF7F0] text-center">రంపచోడవరం</span>
              <span className="p-1 border border-[#E8E2D9] bg-[#FAF7F0] text-center">ఏలూరు</span>
              <span className="p-1 border border-[#E8E2D9] bg-[#FAF7F0] text-center">అమలాపురం</span>
              <span className="p-1 border border-[#E8E2D9] bg-[#FAF7F0] text-center">నరసాపురం</span>
            </div>
          </div>

          {/* Col 4: Community Contribution & Preservation Notice */}
          <div className="space-y-3">
            <h4 className="font-gurajada text-xl text-[#781D22] border-b border-[#D6CFC7] pb-1">
              {isTelugu ? 'వారసత్వ సమర్పణ' : 'Community Submission'}
            </h4>
            <p className="text-xs leading-relaxed text-[#57524C]">
              {isTelugu
                ? 'మీ కుటుంబంలో ఎవరైనా గోదావరి స్వాతంత్ర్య సమరయోధులు ఉన్నారా? వారి రికార్డులు లేదా ఫోటోలను ఆర్కైవ్‌కు జోడించండి.'
                : 'Do you possess family records, letters, or memoirs of Godavari freedom fighters? Contribute them to the public digital archive.'}
            </p>
            <Link
              to="/about"
              className="inline-block px-3 py-1.5 bg-[#781D22] text-[#FAF7F0] font-semibold text-xs rounded-xs hover:bg-[#9B282F] transition-colors"
            >
              {isTelugu ? 'రికార్డులను సమర్పించండి →' : 'Submit Records →'}
            </Link>
          </div>

        </div>

        {/* Newspaper Colophon & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-[#736B63] gap-4">
          <div className="flex items-center space-x-2">
            <Landmark className="w-4 h-4 text-[#996515]" />
            <span>{t('common.rights')}</span>
          </div>

          <div className="italic text-center md:text-right text-[11px] max-w-md">
            {t('common.disclaimer')}
          </div>
        </div>

        <div className="text-center mt-4 pt-3 border-t border-[#D6CFC7]/60 text-[11px] text-[#8B5A2B]">
          {isTelugu
            ? '“సత్యమేవ జయతే • వందేమాతరం • మన వీరుల త్యాగం చిరస్మరణీయం”'
            : '“Satyameva Jayate • Vande Mataram • The Immortal Glory of Our Heroes”'}
        </div>
      </div>
    </footer>
  );
}
