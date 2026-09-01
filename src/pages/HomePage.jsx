import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpenText,
  CalendarRange,
  Clock3,
  Coins,
  Landmark,
  MapPinned,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/common/SectionHeading';
import ArtifactCard from '../components/archive/ArtifactCard';
import { fighters } from '../data/fighters';
import { artifacts } from '../data/artifacts';
import { events } from '../data/events';
import { articles as stories } from '../data/articles';

const TALUKA_LABELS = {
  narsapuram: { te: 'నరసాపురం', en: 'Narsapuram' },
  bhimavaram: { te: 'భీమవరం', en: 'Bhimavaram' },
  tanuku: { te: 'తణుకు', en: 'Tanuku' },
  tadepalligudem: { te: 'తాడేపల్లిగూడెం', en: 'Tadepalligudem' },
  kovvur: { te: 'కోవూరు', en: 'Kovvur' },
  chintalapudi: { te: 'చింతలపూడి', en: 'Chintalapudi' },
  polavaram: { te: 'పోలవరం', en: 'Polavaram' },
  eluru: { te: 'ఏలూరు', en: 'Eluru' },
};

function calculateHomepageStats(fighterList) {
  const years = fighterList
    .map((fighter) => Number(fighter.year))
    .filter((year) => Number.isFinite(year));

  const earliestYear = years.length ? Math.min(...years) : null;
  const latestYear = years.length ? Math.max(...years) : null;

  const totalFine = fighterList.reduce(
    (sum, fighter) => sum + (Number(fighter.fineAmount) || 0),
    0
  );

  const totalDurationMonths = fighterList.reduce(
    (sum, fighter) => sum + (Number(fighter.durationMonths) || 0),
    0
  );

  const totalDurationYears = Math.floor(totalDurationMonths / 12);
  const totalDurationMonthsRemainder = totalDurationMonths % 12;

  const talukaCounts = Object.keys(TALUKA_LABELS).reduce((acc, key) => {
    acc[key] = fighterList.filter((fighter) => fighter.taluka === key).length;
    return acc;
  }, {});

  return {
    earliestYear,
    latestYear,
    totalRecords: fighterList.length,
    totalFine,
    totalDurationMonths,
    totalDurationYears,
    totalDurationMonthsRemainder,
    talukaCounts,
  };
}

export default function HomePage() {
  const { isTelugu, t } = useLanguage();
  const featuredStory = stories[0];
  const timeline = events.slice(0, 3);
  const archiveHighlights = artifacts.slice(0, 3);
  const stats = calculateHomepageStats(fighters);

  const durationLabel =
    stats.totalDurationMonths > 0
      ? `${stats.totalDurationYears} yrs ${stats.totalDurationMonthsRemainder} mos`
      : '0 mos';

  const periodLabel =
    stats.earliestYear && stats.latestYear
      ? `${stats.earliestYear} → ${stats.latestYear}`
      : 'N/A';

  return (
    <div className="bg-[#FAF7F0] text-[#1C1917]">
      <section className="relative isolate overflow-hidden border-b border-[#D6CFC7] bg-[#F4EFE6]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,29,34,0.12),_transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-[11px] font-ntr font-semibold uppercase tracking-[0.22em] text-[#781D22]">
                <span className="h-px w-6 bg-[#781D22]" />
                <span>{isTelugu ? 'గోదావరి సాహసాలు' : 'Godavari Struggles'}</span>
                <span className="h-px w-6 bg-[#781D22]" />
              </div>

              <div className="space-y-4">
                <h1 className="font-gurajada text-5xl leading-[0.9] text-[#1C1917] sm:text-6xl md:text-7xl xl:text-[6rem]">
                  {isTelugu
                    ? 'తెలుగు స్వాతంత్ర్య వీరుల గోదావరి గాథ'
                    : 'The Godavari Chronicle of Telugu Freedom Heroes'}
                </h1>

                <p className="max-w-xl font-ntr text-base leading-relaxed text-[#2E2A27] sm:text-lg">
                  {isTelugu
                    ? 'తూర్పు మరియు పశ్చిమ గోదావరి జిల్లాల మాండలిక, అణచివేత, జైలు శిక్ష, ప్రజా ప్రతిఘటనల చరిత్రను ఒకే కదనం లో పునర్నిర్మించాం.'
                    : 'Tracing the voices, imprisonments, and resistance of East and West Godavari through the lived archive of Telugu freedom fighters.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/fighters"
                  className="inline-flex items-center gap-2 rounded-xs bg-[#781D22] px-5 py-2.5 font-ntr text-sm font-bold text-[#FAF7F0] transition-colors hover:bg-[#9B282F]"
                >
                  <span>{isTelugu ? 'సమరయోధులను చూడండి' : 'Explore fighters'}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

              
              </div>

              <div className="flex flex-wrap gap-3 pt-3 text-xs font-ntr uppercase tracking-[0.14em] text-[#57524C]">
                <span className="border border-[#D6CFC7] bg-[#FAF7F0] px-3 py-2">{isTelugu ? 'తూర్పు గోదావరి' : 'East Godavari'}</span>
                <span className="border border-[#D6CFC7] bg-[#FAF7F0] px-3 py-2">{isTelugu ? 'పశ్చిమ గోదావరి' : 'West Godavari'}</span>
                <span className="border border-[#D6CFC7] bg-[#FAF7F0] px-3 py-2">1889–1947</span>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-xs border-2 border-[#D6CFC7] bg-[#FFFFFF] p-3 shadow-[0_18px_40px_rgba(28,25,23,0.08)]">
                <div className="relative h-[420px] overflow-hidden border border-[#D6CFC7] bg-[#2B2826]">
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80"
                    alt="Godavari freedom fighters archive"
                    className="h-full w-full object-cover grayscale contrast-125 brightness-90"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1C1917]/90 via-[#1C1917]/45 to-transparent p-5 text-[#FAF7F0]">
                    <span className="inline-block border border-[#FAF7F0]/40 bg-[#781D22] px-2 py-1 font-ntr text-[10px] font-semibold uppercase tracking-[0.18em]">
                      {isTelugu ? 'చారిత్రకాధారిత ఫోటో' : 'Archive photograph'}
                    </span>
                    <p className="mt-2 font-gurajada text-3xl leading-tight">
                      {isTelugu ? 'గోదావరి జైలు కథలు' : 'Godavari prison stories'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#D6CFC7] bg-[#FAF7F0] py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            kicker={isTelugu ? 'చారిత్రక ఆర్కైవ్' : 'ARCHIVAL RECORDS'}
            title={isTelugu ? 'పత్రాలు, పోస్ట్కార్డులు, జ్ఞాపికలు' : 'Letters, postcards, and surviving records'}
            subtitle={isTelugu ? 'స్వాతంత్ర్య సమర యోధుల జీవన చరిత్రను దస్తావేజుల ద్వారా పునర్నిర్మించండి.' : 'Archive pieces that mark the movements, memories, and mass resistance of the Godavari delta.'}
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {archiveHighlights.map((artifact) => (
              <ArtifactCard key={artifact.id} artifact={artifact} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#D6CFC7] bg-[#F4EFE6] py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="overflow-hidden rounded-xs border-2 border-[#D6CFC7] bg-[#FFFFFF] p-2 shadow-[0_12px_30px_rgba(28,25,23,0.05)]">
              <div className="relative h-[320px] overflow-hidden bg-[#2B2826]">
                <img
                  src={featuredStory?.image}
                  alt={isTelugu ? featuredStory?.titleTe : featuredStory?.titleEn}
                  className="h-full w-full object-cover grayscale contrast-115 brightness-90"
                />
              </div>
            </div>

            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 text-[11px] font-ntr font-semibold uppercase tracking-[0.22em] text-[#996515]">
                <span className="h-px w-6 bg-[#996515]" />
                <span>{isTelugu ? 'వ్యాసం' : 'ARTICLE'}</span>
                <span className="h-px w-6 bg-[#996515]" />
              </div>

              <h2 className="font-gurajada text-4xl leading-none text-[#1C1917] sm:text-5xl">
                {isTelugu ? 'మహాత్మా గాంధీ జీవిత చరిత్ర' : 'Mahatma Gandhi: A Life Story'}
              </h2>

              <p className="font-ntr text-base leading-relaxed text-[#2E2A27]">
                {isTelugu
                  ? 'గోదావరి జిల్లాల పర్యటన, ఖాదీ ప్రచారం, మహిళా ఉద్యమాలు, మరియు జైలు శిక్షల మధ్య గాంధీజీ ప్రభావం ఎలా ఒక కొత్త రాజకీయ పునఃసృష్టిని నడిపించిందో ఈ వ్యాసం చెబుతుంది.'
                  : 'A compact portrait of Gandhi’s influence across the Godavari delta: khadi, social reform, mass mobilisation, and the prison road that shaped a new political consciousness.'}
              </p>

              <div className="flex flex-wrap gap-3 text-sm font-ntr text-[#57524C]">
                <span className="inline-flex items-center gap-2 border border-[#D6CFC7] bg-[#FAF7F0] px-3 py-2">
                  <BookOpenText className="h-4 w-4 text-[#781D22]" />
                  {featuredStory?.kickerTe || (isTelugu ? 'చారిత్రక విశ్లేషణ' : 'Historical analysis')}
                </span>
                <span className="inline-flex items-center gap-2 border border-[#D6CFC7] bg-[#FAF7F0] px-3 py-2">
                  <Clock3 className="h-4 w-4 text-[#781D22]" />
                  {featuredStory?.readTime || '7'} min read
                </span>
              </div>

              <Link
                to="/articles"
                className="inline-flex items-center gap-2 text-sm font-ntr font-bold text-[#781D22] transition-colors hover:text-[#9B282F]"
              >
                <span>{isTelugu ? 'మరిన్ని వ్యాసాలు చూడండి' : 'Read more articles'}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#D6CFC7] bg-[#FAF7F0] py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            kicker={t('timeline.kicker')}
            title={t('timeline.title')}
            subtitle={t('timeline.subtitle')}
            actionButton={
              <Link to="/timeline" className="text-sm font-ntr font-bold text-[#781D22] hover:text-[#9B282F]">
                {isTelugu ? 'పూర్తి కాలక్రమం →' : 'Full timeline →'}
              </Link>
            }
          />

          <div className="grid gap-5 md:grid-cols-3">
            {timeline.map((event) => (
              <article key={event.id} className="border border-[#D6CFC7] bg-[#FFFFFF] p-5 shadow-[0_6px_16px_rgba(28,25,23,0.03)]">
                <div className="mb-3 inline-flex items-center gap-2 border-b border-[#D6CFC7] pb-2 font-ntr text-[11px] font-semibold uppercase tracking-[0.18em] text-[#996515]">
                  <CalendarRange className="h-4 w-4" />
                  <span>{event.year}</span>
                </div>
                <h3 className="font-gurajada text-3xl leading-tight text-[#1C1917]">
                  {isTelugu ? event.titleTe : event.titleEn}
                </h3>
                <p className="mt-3 font-ntr text-sm leading-relaxed text-[#57524C]">
                  {isTelugu ? event.shortDescTe : event.shortDescEn}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F4EFE6] py-14 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            kicker={isTelugu ? 'ఆకారిక గణాంకాలు' : 'STATISTICAL PROFILE'}
            title={isTelugu ? 'గోదావరి విమోచన గణాంకాలు' : 'Freedom movement data overview'}
            subtitle={isTelugu ? 'రికార్డు నుండి తీసిన అక్షర బలం, మొత్తం వేతనాలు, నిర్బంద వ్యవధి మరియు తాలూకా వారీగా విభజన.' : 'Computed directly from the fighter record archive: date span, total people, fines, duration, and taluka breakdown.'}
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="border border-[#D6CFC7] bg-[#FAF7F0] p-5">
              <div className="mb-3 flex items-center gap-2 text-[#781D22]">
                <CalendarRange className="h-5 w-5" />
                <span className="font-ntr text-xs font-semibold uppercase tracking-[0.18em]">{isTelugu ? 'దశాబ్దపరిమితి' : 'Data period'}</span>
              </div>
              <p className="font-gurajada text-4xl text-[#1C1917]">{periodLabel}</p>
            </div>

            <div className="border border-[#D6CFC7] bg-[#FAF7F0] p-5">
              <div className="mb-3 flex items-center gap-2 text-[#781D22]">
                <Landmark className="h-5 w-5" />
                <span className="font-ntr text-xs font-semibold uppercase tracking-[0.18em]">{isTelugu ? 'మొత్తం వ్యక్తులు' : 'Total people'}</span>
              </div>
              <p className="font-gurajada text-4xl text-[#1C1917]">{stats.totalRecords}</p>
            </div>

            <div className="border border-[#D6CFC7] bg-[#FAF7F0] p-5">
              <div className="mb-3 flex items-center gap-2 text-[#781D22]">
                <Coins className="h-5 w-5" />
                <span className="font-ntr text-xs font-semibold uppercase tracking-[0.18em]">{isTelugu ? 'మొత్తం జరిమానాలు' : 'Total fines'}</span>
              </div>
              <p className="font-gurajada text-4xl text-[#1C1917]">₹{Number(stats.totalFine).toLocaleString('en-IN')}</p>
            </div>

            <div className="border border-[#D6CFC7] bg-[#FAF7F0] p-5">
              <div className="mb-3 flex items-center gap-2 text-[#781D22]">
                <Clock3 className="h-5 w-5" />
                <span className="font-ntr text-xs font-semibold uppercase tracking-[0.18em]">{isTelugu ? 'జైలు వ్యవధి' : 'Imprisonment duration'}</span>
              </div>
              <p className="font-gurajada text-4xl text-[#1C1917]">{durationLabel}</p>
            </div>
          </div>

          <div className="mt-8 border border-[#D6CFC7] bg-[#FFFFFF] p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-2 text-[#781D22]">
              <MapPinned className="h-5 w-5" />
              <span className="font-ntr text-xs font-semibold uppercase tracking-[0.18em]">{isTelugu ? 'తాలూకా వారీగా' : 'Taluka distribution'}</span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {Object.entries(TALUKA_LABELS).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between border border-[#E8E2D9] bg-[#FAF7F0] px-3 py-3">
                  <span className="font-ntr text-sm text-[#1C1917]">
                    {isTelugu ? label.te : label.en}
                  </span>
                  <span className="font-gurajada text-3xl leading-none text-[#781D22]">
                    {stats.talukaCounts[key] || 0}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

