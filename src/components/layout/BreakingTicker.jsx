import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BreakingTicker() {
  const { isTelugu } = useLanguage();

  const bulletins = isTelugu
    ? [
        "1922: రంపచోడవరం ఏజెన్సీలో అల్లూరి సీతారామరాజు నాయకత్వంలో బ్రిటిష్ సైన్యంపై మెరుపు గెరిల్లా దాడి",
        "1930: కాకినాడ చోళ్లంగి సముద్ర తీరంలో బులుసు సాంబమూర్తి సారథ్యంలో ఉప్పు చట్టాల ఉల్లంఘన",
        "రాజమండ్రి సెంట్రల్ జైలు: గోదావరి ప్రాంతం నుండి 420+ మంది సత్యాగ్రహుల ఖైదీ రికార్డులు పరిశీలనకు సిద్ధం",
        "దువ్వూరి సుబ్బమ్మ: ఆంధ్రదేశంలో సహాయ నిరాకరణ ఉద్యమంలో జైలుకు వెళ్లిన తొలి తెలుగు మహిళా యోధురాలు"
      ]
    : [
        "1922: Alluri Sitarama Raju leads historic guerrilla strike on colonial armories in Rampa Agency",
        "1930: Bulusu Sambamurti directs thousands in breaking imperial salt monopoly at Chollangi coast",
        "Rajahmundry Central Jail: Over 420 documented prison admission ledgers now transcribed in the digital archive",
        "Duvvuri Subbamma: Honoured as the very first Telugu woman imprisoned during Non-Cooperation movement"
      ];

  return (
    <div className="bg-[#F4EFE6] border-b border-[#D6CFC7] py-1.5 px-4 text-xs font-ntr overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex items-center">
        <div className="flex items-center gap-1.5 bg-[#781D22] text-[#FAF7F0] px-2.5 py-0.5 font-semibold uppercase tracking-wider rounded-xs whitespace-nowrap text-[11px]">
          <Radio className="w-3 h-3 text-[#EFE4CA] animate-pulse" />
          {isTelugu ? 'చారిత్రక బులిటెన్' : 'ARCHIVE GAZETTE'}
        </div>

        <div className="ml-3 overflow-hidden whitespace-nowrap flex-1 relative">
          <div className="inline-block animate-[marquee_25s_linear_infinite] text-[#2E2A27]">
            {bulletins.map((item, idx) => (
              <span key={idx} className="inline-flex items-center mx-4">
                <span className="text-[#996515] font-bold mr-2">❖</span>
                <span className="font-medium hover:text-[#781D22] transition-colors">{item}</span>
              </span>
            ))}
          </div>
        </div>

        <Link
          to="/timeline"
          className="hidden sm:inline-flex items-center gap-1 text-[#781D22] hover:text-[#996515] font-semibold text-xs ml-2 whitespace-nowrap"
        >
          {isTelugu ? 'కాలక్రమం →' : 'Timeline →'}
        </Link>
      </div>
    </div>
  );
}
