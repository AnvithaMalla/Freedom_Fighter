import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/common/SectionHeading';
import TimelineEvent from '../components/timeline/TimelineEvent';
import { events } from '../data/events';
import { History, Calendar, Filter, Sparkles } from 'lucide-react';

export default function TimelinePage() {
  const { t, isTelugu } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  const filteredEvents = events.filter(ev => {
    if (selectedDistrict === 'all') return true;
    if (selectedDistrict === 'east') return ev.districtTe.includes('తూర్పు') || ev.districtEn.includes('East');
    if (selectedDistrict === 'west') return ev.districtTe.includes('పశ్చిమ') || ev.districtEn.includes('West');
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-ntr">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Page Header */}
        <SectionHeading
          kicker={t('timeline.kicker')}
          title={t('timeline.title')}
          subtitle={t('timeline.subtitle')}
        />

        {/* Timeline District Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#F4EFE6] border border-[#D6CFC7] rounded-xs text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-[#781D22]">
            <History className="w-4 h-4" />
            <span>{isTelugu ? 'కాలక్రమ ఫిల్టర్:' : 'Timeline Filter:'}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedDistrict('all')}
              className={`px-3 py-1 rounded-xs font-semibold transition-colors cursor-pointer border ${
                selectedDistrict === 'all'
                  ? 'bg-[#781D22] text-[#FAF7F0] border-[#781D22]'
                  : 'bg-[#FAF7F0] text-[#57524C] border-[#D6CFC7] hover:border-[#781D22]'
              }`}
            >
              {isTelugu ? 'అన్ని ఘట్టాలు (All Eras)' : 'All Eras (1885–1947)'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedDistrict('east')}
              className={`px-3 py-1 rounded-xs font-semibold transition-colors cursor-pointer border ${
                selectedDistrict === 'east'
                  ? 'bg-[#781D22] text-[#FAF7F0] border-[#781D22]'
                  : 'bg-[#FAF7F0] text-[#57524C] border-[#D6CFC7] hover:border-[#781D22]'
              }`}
            >
              {t('region.eastTitle')}
            </button>
            <button
              type="button"
              onClick={() => setSelectedDistrict('west')}
              className={`px-3 py-1 rounded-xs font-semibold transition-colors cursor-pointer border ${
                selectedDistrict === 'west'
                  ? 'bg-[#781D22] text-[#FAF7F0] border-[#781D22]'
                  : 'bg-[#FAF7F0] text-[#57524C] border-[#D6CFC7] hover:border-[#781D22]'
              }`}
            >
              {t('region.westTitle')}
            </button>
          </div>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative pt-4">
          
          {/* Vertical Central Spine Line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-[#D6CFC7]"></div>

          <div className="space-y-4 md:space-y-0">
            {filteredEvents.map((event, index) => (
              <TimelineEvent key={event.id} event={event} index={index} />
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
