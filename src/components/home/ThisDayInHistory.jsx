import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Calendar, History, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ThisDayInHistory() {
  const { t, isTelugu } = useLanguage();

  const historicDates = [
    {
      id: "may-07",
      dateKey: "మే 7",
      dateKeyEn: "May 7",
      year: 1924,
      titleTe: "మన్యం వీరుడు అల్లూరి సీతారామరాజు అమరత్వం",
      titleEn: "Martyrdom of Alluri Sitarama Raju",
      descTe: "కొయ్యూరు వద్ద బ్రిటిష్ సైన్యం జరిపిన కాల్పుల్లో అల్లూరి అమరుడయ్యారు. రంప విప్లవ పోరాటం చరిత్రలో చిరస్థాయిగా నిలిచింది.",
      descEn: "Alluri attained martyrdom in an armed encounter near Koyyuru, immortalizing the Rampa guerrilla resistance.",
      fighterId: "alluri-sitarama-raju"
    },
    {
      id: "apr-06",
      dateKey: "ఏప్రిల్ 6",
      dateKeyEn: "April 6",
      year: 1930,
      titleTe: "చోళ్లంగి & పాలకొల్లు ఉప్పు సత్యాగ్రహం",
      titleEn: "Salt Satyagraha at Chollangi & Palakollu",
      descTe: "బులుసు సాంబమూర్తి నాయకత్వంలో గోదావరి తీరంలో వేలాది మంది ప్రజలు ఉప్పు చట్టాలను ధిక్కరించారు.",
      descEn: "Thousands assembled on the Godavari coastline under Bulusu Sambamurti to break imperial salt monopolies.",
      fighterId: "bulusu-sambamurti"
    },
    {
      id: "aug-22",
      dateKey: "ఆగస్టు 22",
      dateKeyEn: "August 22",
      year: 1922,
      titleTe: "చింతపల్లి పోలీస్ స్టేషన్‌పై అల్లూరి మెరుపు దాడి",
      titleEn: "Chintapalli Police Armory Raid by Alluri",
      descTe: "రంప విప్లవ శంఖారావం పూరిస్తూ చింతపల్లి స్టేషన్‌పై దాడి చేసి తుపాకులు స్వాధీనం చేసుకున్న చారిత్రక ఘట్టం.",
      descEn: "The opening raid of the Rampa Rebellion capturing rifles from the Chintapalli colonial outpost.",
      fighterId: "alluri-sitarama-raju"
    },
    {
      id: "jan-26",
      dateKey: "జనవరి 26",
      dateKeyEn: "January 26",
      year: 1930,
      titleTe: "ప్రథమ 'సంపూర్ణ స్వరాజ్య' దినోత్సవం",
      titleEn: "First National 'Poorna Swaraj' Day",
      descTe: "గోదావరి నది ఒడ్డున రాజమండ్రి కోటిలింగాల ఘాట్ వద్ద వేలాది మంది త్రివర్ణ పతాకాన్ని ఎగురవేసి ప్రతిజ్ఞ చేశారు.",
      descEn: "Tricolour hoisted along the Godavari riverfront in Rajahmundry as citizens pledged absolute independence.",
      fighterId: "nyapathi-subba-rao"
    },
    {
      id: "oct-02",
      dateKey: "అక్టోబర్ 2",
      dateKeyEn: "October 2",
      year: 1869,
      titleTe: "మహాత్మా గాంధీ జయంతి & గోదావరి ఖాదీ దినం",
      titleEn: "Gandhi Jayanti & Godavari Khadi Assemblies",
      descTe: "గోదావరి ఆశ్రమాలలో చరఖా యజ్ఞాలు, దువ్వూరి సుబ్బమ్మ ఆధ్వర్యంలో విదేశీ వస్త్ర బహిష్కరణ ప్రదర్శనలు.",
      descEn: "Mass spinning and foreign cloth boycott rallies conducted under Duvvuri Subbamma across Godavari ashrams.",
      fighterId: "duvvuri-subbamma"
    }
  ];

  const [selectedEvent, setSelectedEvent] = useState(historicDates[0]);

  return (
    <section className="bg-[#F4EFE6] border-b border-[#D6CFC7] py-8 px-4 sm:px-6 lg:px-8 font-ntr">
      <div className="max-w-7xl mx-auto">
        <div className="border-2 border-[#D6CFC7] bg-[#FAF7F0] p-5 sm:p-6 rounded-xs">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#D6CFC7]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#781D22] text-[#FAF7F0] rounded-xs">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider block">
                  {t('thisDay.kicker')}
                </span>
                <h3 className="font-gurajada text-2xl sm:text-3xl text-[#1C1917] leading-none">
                  {t('thisDay.title')}
                </h3>
              </div>
            </div>

            {/* Date Selection Pills */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              {historicDates.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedEvent(item)}
                  className={`px-3 py-1 rounded-xs font-semibold transition-all cursor-pointer border ${
                    selectedEvent.id === item.id
                      ? 'bg-[#781D22] text-[#FAF7F0] border-[#781D22]'
                      : 'bg-[#F4EFE6] text-[#57524C] border-[#D6CFC7] hover:border-[#781D22]'
                  }`}
                >
                  {isTelugu ? item.dateKey : item.dateKeyEn}
                </button>
              ))}
            </div>
          </div>

          {/* Active Historic Event Display */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Column: Calendar Stamp Box */}
            <div className="md:col-span-3 flex flex-col items-center justify-center p-4 bg-[#F4EFE6] border-2 border-[#996515] rounded-xs text-center">
              <span className="text-xs font-bold text-[#781D22] uppercase tracking-widest">
                {isTelugu ? 'చారిత్రక తేదీ' : 'Historical Date'}
              </span>
              <p className="font-gurajada text-4xl text-[#1C1917] font-bold my-1">
                {isTelugu ? selectedEvent.dateKey : selectedEvent.dateKeyEn}
              </p>
              <span className="font-ntr text-xs text-[#8B5A2B] font-semibold">
                {selectedEvent.year}
              </span>
            </div>

            {/* Right Column: Event Story Narrative */}
            <div className="md:col-span-9 space-y-2">
              <h4 className="font-gurajada text-2xl sm:text-3xl text-[#781D22] leading-tight">
                {isTelugu ? selectedEvent.titleTe : selectedEvent.titleEn}
              </h4>
              <p className="font-ntr text-sm text-[#2E2A27] leading-relaxed">
                {isTelugu ? selectedEvent.descTe : selectedEvent.descEn}
              </p>
              {selectedEvent.fighterId && (
                <Link
                  to={`/fighters/${selectedEvent.fighterId}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#781D22] hover:text-[#9B282F] pt-1"
                >
                  <span>{isTelugu ? 'సంబంధిత సమరయోధుడి రికార్డు ఫైల్ చూడండి' : 'View Related Freedom Fighter Dossier'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
