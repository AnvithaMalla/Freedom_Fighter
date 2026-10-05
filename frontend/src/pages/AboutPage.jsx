import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/common/SectionHeading';
import { ScrollText, Landmark, ShieldCheck, Heart, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AboutPage() {
  const { t, isTelugu } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    fighterName: '',
    district: 'east',
    details: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#781D22', '#996515', '#FAF7F0']
      });
    } catch (err) {
      // silent
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-ntr">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Page Header */}
        <SectionHeading
          kicker={isTelugu ? 'డిజిటల్ హెరిటేజ్ ప్రాజెక్ట్' : 'Digital Heritage Project'}
          title={isTelugu ? 'మా గురించి & ఆర్కైవ్ లక్ష్యం' : 'About Godavari Freedom Archive'}
          subtitle={
            isTelugu
              ? 'తూర్పు మరియు పశ్చిమ గోదావరి సమరయోధుల వీరగాథలను భవిష్యత్ తరాలకు అందించే డిజిటల్ స్మారకం.'
              : 'A public digital archive dedicated to documenting and honoring Telugu freedom fighters from East & West Godavari.'
          }
        />

        {/* Mission Statement Newspaper Block */}
        <div className="border-4 border-[#1C1917] bg-[#FFFFFF] p-6 sm:p-10 rounded-xs shadow-md space-y-6">
          
          <div className="border-b-2 border-[#1C1917] pb-4">
            <span className="text-xs font-bold tracking-[0.2em] text-[#781D22] uppercase block">
              {isTelugu ? 'ఆర్కైవ్ ప్రకటన' : 'Archive Manifesto'}
            </span>
            <h2 className="font-gurajada text-3xl sm:text-4xl text-[#1C1917] mt-1">
              {isTelugu 
                ? 'గోదావరి గడ్డపై స్వాతంత్ర్య వీరుల త్యాగాల శాశ్వత భద్రత' 
                : 'Preserving the Immortal Heritage of Godavari Freedom Fighters'}
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-[#2E2A27] leading-relaxed drop-cap text-justify">
            <p>
              {isTelugu
                ? 'గోదావరి నది తీరప్రాంతం భారత స్వాతంత్ర్య సమరంలో అపూర్వమైన చైతన్యానికి నిలయంగా నిలిచింది. అల్లూరి సీతారామరాజు నేతృత్వంలోని రంప గిరిజన విప్లవం నుండి, బులుసు సాంబమూర్తి ఉప్పు సత్యాగ్రహం, దువ్వూరి సుబ్బమ్మ మహిళా ప్రతిఘటన మరియు డా. భోగరాజు పట్టాభి సీతారామయ్య ఆర్థిక స్వదేశీ ఉద్యమాల వరకు ప్రతి అధ్యాయం రక్తతర్పణలతో లిఖించబడింది.'
                : 'The Godavari basin was an epicenter of revolutionary resistance against British colonial domination. From Alluri Sitarama Raju’s daring Rampa tribal guerrilla war to the Salt Satyagraha camps at Chollangi and Palakollu, and the indomitable courage of women like Duvvuri Subbamma and Durgabai Deshmukh, the soil of Godavari bore witness to extraordinary sacrifices.'}
            </p>
            <p>
              {isTelugu
                ? 'ఈ ప్రాజెక్ట్ యొక్క ప్రధాన లక్ష్యం: తూర్పు మరియు పశ్చిమ గోదావరి జిల్లాలకు చెందిన 1,000+ స్వాతంత్ర్య సమరయోధుల పేర్లు, వారి జైలు రికార్డులు, కారాగార ప్రదేశాలు, అసలైన చేతిరాత పత్రాలు, పోస్టుకార్డులు మరియు ఛాయాచిత్రాలను ఉచితంగా ప్రజలకు పరిశోధనార్థం అందించడం.'
                : 'The sole objective of this digital heritage repository is to provide free, open-access public documentation of over 1,000 freedom fighters from East and West Godavari, indexing verified prison ledgers, trial records, original letters, and high-resolution historical relics.'}
            </p>
          </div>

          {/* Core Principles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#D6CFC7]">
            <div className="p-3 bg-[#F4EFE6] border border-[#E8E2D9] rounded-xs space-y-1">
              <Landmark className="w-5 h-5 text-[#781D22]" />
              <strong className="text-xs text-[#1C1917] block font-bold">
                {isTelugu ? 'ప్రాంతీయ ప్రాధాన్యత' : 'Regional Identity'}
              </strong>
              <p className="text-[11px] text-[#57524C]">
                {isTelugu ? 'ఉభయ గోదావరి జిల్లాల సమగ్ర పోరాట చరిత్ర' : 'Focused exclusively on East & West Godavari'}
              </p>
            </div>

            <div className="p-3 bg-[#F4EFE6] border border-[#E8E2D9] rounded-xs space-y-1">
              <ScrollText className="w-5 h-5 text-[#996515]" />
              <strong className="text-xs text-[#1C1917] block font-bold">
                {isTelugu ? 'అధికారిక రికార్డులు' : 'Verified Records'}
              </strong>
              <p className="text-[11px] text-[#57524C]">
                {isTelugu ? 'జైలు రిజిస్టర్లు & ఆర్కైవ్స్ ఆధారాలు' : 'Colonial jail ledgers and gazette references'}
              </p>
            </div>

            <div className="p-3 bg-[#F4EFE6] border border-[#E8E2D9] rounded-xs space-y-1">
              <ShieldCheck className="w-5 h-5 text-[#781D22]" />
              <strong className="text-xs text-[#1C1917] block font-bold">
                {isTelugu ? 'విద్యా & పరిశోధన' : 'Public Education'}
              </strong>
              <p className="text-[11px] text-[#57524C]">
                {isTelugu ? 'విద్యార్థులు, పరిశోధకులకు ఉచిత సమాచారం' : 'Open access for researchers and future generations'}
              </p>
            </div>
          </div>

        </div>

        {/* Community Submission Section */}
        <div className="border-2 border-[#D6CFC7] bg-[#F4EFE6] p-6 sm:p-8 rounded-xs space-y-6">
          <div className="border-b border-[#D6CFC7] pb-3">
            <h3 className="font-gurajada text-3xl text-[#781D22]">
              {isTelugu ? 'మీ కుటుంబ స్వాతంత్ర్య సమరయోధుడి రికార్డులను సమర్పించండి' : 'Contribute Family Freedom Fighter Records'}
            </h3>
            <p className="text-xs text-[#57524C] mt-1">
              {isTelugu
                ? 'తూర్పు లేదా పశ్చిమ గోదావరికి చెందిన మీ పూర్వీకుల స్వాతంత్ర్య సమర వివరాలు, జైలు పత్రాలు లేదా ఫోటోలను ఆర్కైవ్‌లో చేర్చండి.'
                : 'Help expand this archive by submitting records, memoirs, prison certificates, or photographs of Godavari freedom fighters.'}
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-6 bg-[#FAF7F0] border-2 border-[#781D22] rounded-xs text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#781D22] mx-auto" />
              <p className="font-gurajada text-2xl text-[#1C1917]">
                {isTelugu ? 'ధన్యవాదాలు! మీ సమర్పణ విజయవంతంగా అందింది.' : 'Thank you! Your submission has been received.'}
              </p>
              <p className="text-xs text-[#57524C]">
                {isTelugu
                  ? 'మా చారిత్రక బృందం వివరాలను పరిశీలించి త్వరలోనే ఆర్కైవ్‌లో చేరుస్తుంది.'
                  : 'Our historical review panel will verify the records and index them in the digital archive.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-ntr">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#1C1917] mb-1">
                    {isTelugu ? 'మీ పేరు' : 'Your Full Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border border-[#D6CFC7] bg-[#FAF7F0] rounded-xs focus:outline-none focus:border-[#781D22]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1C1917] mb-1">
                    {isTelugu ? 'ఈమెయిల్ / ఫోన్ నంబర్' : 'Email / Contact'} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 border border-[#D6CFC7] bg-[#FAF7F0] rounded-xs focus:outline-none focus:border-[#781D22]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#1C1917] mb-1">
                    {isTelugu ? 'సమరయోధుడి పేరు' : 'Freedom Fighter Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fighterName}
                    onChange={(e) => setFormData({ ...formData, fighterName: e.target.value })}
                    className="w-full p-2 border border-[#D6CFC7] bg-[#FAF7F0] rounded-xs focus:outline-none focus:border-[#781D22]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1C1917] mb-1">
                    {isTelugu ? 'జిల్లా' : 'District'} *
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full p-2 border border-[#D6CFC7] bg-[#FAF7F0] rounded-xs focus:outline-none focus:border-[#781D22]"
                  >
                    <option value="east">{isTelugu ? 'తూర్పు గోదావరి' : 'East Godavari'}</option>
                    <option value="west">{isTelugu ? 'పశ్చిమ గోదావరి' : 'West Godavari'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1C1917] mb-1">
                  {isTelugu ? 'గ్రామం, జైలు వివరాలు & చారిత్రక విశేషాలు' : 'Village, Imprisonment Details & Historical Notes'} *
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder={
                    isTelugu
                      ? 'ఉదాహరణ: గ్రామం పేరు, ఏ ఉద్యమంలో పాల్గొన్నారు, ఏ జైలులో ఉన్నారు...'
                      : 'E.g., Native place, active movement, jail facility, years imprisoned...'
                  }
                  className="w-full p-2 border border-[#D6CFC7] bg-[#FAF7F0] rounded-xs focus:outline-none focus:border-[#781D22]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#781D22] text-[#FAF7F0] font-semibold text-sm rounded-xs hover:bg-[#9B282F] transition-colors cursor-pointer flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isTelugu ? 'రికార్డును సమర్పించండి' : 'Submit Historical Record'}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
