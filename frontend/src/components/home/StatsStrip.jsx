import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Users, MapPin, Building2, Lock, Landmark } from 'lucide-react';

export default function StatsStrip() {
  const { t, isTelugu } = useLanguage();

  const stats = [
    {
      icon: Users,
      number: t('stats.fightersCount'),
      label: t('stats.fightersLabel'),
      subtext: isTelugu ? 'తూర్పు & పశ్చిమ గోదావరి' : 'East & West Godavari'
    },
    {
      icon: Landmark,
      number: t('stats.districtsCount'),
      label: t('stats.districtsLabel'),
      subtext: isTelugu ? 'తూర్పు & పశ్చిమ గోదావరి' : 'East & West Godavari'
    },
    {
      icon: MapPin,
      number: t('stats.placesCount'),
      label: t('stats.placesLabel'),
      subtext: isTelugu ? 'పోరాట కేంద్రాలు & గ్రామాలు' : 'Revolutionary Hubs'
    },
    {
      icon: Lock,
      number: t('stats.jailRecordsCount'),
      label: t('stats.jailRecordsLabel'),
      subtext: isTelugu ? 'రాజమండ్రి, వెల్లూరు, అలీపూర్' : 'Rajahmundry, Vellore, Alipore'
    }
  ];

  return (
    <section className="bg-[#F4EFE6] border-b border-[#D6CFC7] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-4 sm:p-5 border border-[#D6CFC7] bg-[#FAF7F0] rounded-xs text-center relative overflow-hidden group hover:border-[#781D22] transition-colors"
              >
                {/* Decorative Top Accent */}
                <div className="w-10 h-0.5 bg-[#781D22] mx-auto mb-2 group-hover:w-16 transition-all duration-300"></div>

                <div className="flex items-center justify-center mb-1 text-[#996515]">
                  <Icon className="w-5 h-5 text-[#781D22]" />
                </div>

                <p className="font-gurajada text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] font-bold tracking-tight">
                  {stat.number}
                </p>

                <p className="font-ntr text-sm sm:text-base font-semibold text-[#781D22] mt-0.5">
                  {stat.label}
                </p>

                <p className="font-ntr text-[11px] text-[#57524C] mt-1">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
