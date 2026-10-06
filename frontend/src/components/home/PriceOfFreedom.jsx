import React, { useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import SectionHeading from '../common/SectionHeading';
import { calculateFreedomStats } from '../../data/jailStats';
import { fighters } from '../../data/fighters';
import { Lock, History, Flame, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// ── Unavailable placeholder ──────────────────────────────────────────────────
function Unavailable({ isTelugu }) {
  return (
    <span className="font-ntr text-sm text-[#736B63] italic flex items-center gap-1 justify-center">
      <AlertCircle className="w-3.5 h-3.5" />
      {isTelugu ? 'డేటా అందుబాటులో లేదు' : 'Data unavailable'}
    </span>
  );
}

export default function PriceOfFreedom() {
  const { t, isTelugu } = useLanguage();

  // Compute dynamically from the fighters dataset.
  // When fighters.js is later replaced with the real ~1,000-record dataset,
  // all statistics here update automatically without any UI code changes.
  const stats = useMemo(() => calculateFreedomStats(fighters), []);

  // ── Derived average sentence (only from fighters with duration data) ────────
  const avgMonths =
    stats.hasDurationData && stats.fightersWithDurationData > 0
      ? Math.round(stats.totalDurationMonths / stats.fightersWithDurationData)
      : null;
  const avgDisplay = avgMonths
    ? avgMonths >= 12
      ? isTelugu
        ? `${Math.floor(avgMonths / 12)} సం. ${avgMonths % 12 > 0 ? `${avgMonths % 12} నె.` : ''}`
        : `${Math.floor(avgMonths / 12)} yr${Math.floor(avgMonths / 12) !== 1 ? 's' : ''} ${avgMonths % 12 > 0 ? `${avgMonths % 12} mo.` : ''}`
      : isTelugu
      ? `${avgMonths} నెలలు`
      : `${avgMonths} Months`
    : null;

  return (
    <section className="bg-[#FAF7F0] border-b border-[#D6CFC7] py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <SectionHeading
          kicker={t('priceOfFreedom.kicker')}
          title={t('priceOfFreedom.title')}
          subtitle={t('priceOfFreedom.subtitle')}
        />

        {/* Infographic Main Container */}
        <div className="border-2 border-[#D6CFC7] bg-[#FFFFFF] p-5 sm:p-8 rounded-xs shadow-xs space-y-8">

          {/* ── Key Metric Highlights Header ──────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-[#D6CFC7] text-center">

            {/* Total Prison Time */}
            <div className="p-4 border border-[#E8E2D9] bg-[#F4EFE6] rounded-xs">
              <span className="font-ntr text-xs text-[#57524C] uppercase tracking-wider block">
                {isTelugu ? 'మొత్తం జైలు శిక్షా కాలం' : 'Total Prison Time Served'}
              </span>
              <p className="font-gurajada text-3xl sm:text-4xl text-[#781D22] font-bold mt-1">
                {stats.hasDurationData
                  ? (isTelugu ? stats.totalDurationDisplay : stats.totalDurationDisplayEn)
                  : <Unavailable isTelugu={isTelugu} />
                }
              </p>
              <span className="font-ntr text-[11px] text-[#736B63]">
                {isTelugu
                  ? `${stats.fightersWithDurationData} రికార్డుల ఆధారంగా`
                  : `Based on ${stats.fightersWithDurationData} records`}
              </span>
            </div>

            {/* Average Sentence */}
            <div className="p-4 border border-[#E8E2D9] bg-[#F4EFE6] rounded-xs">
              <span className="font-ntr text-xs text-[#57524C] uppercase tracking-wider block">
                {t('priceOfFreedom.avgJailDuration')}
              </span>
              <p className="font-gurajada text-3xl sm:text-4xl text-[#1C1917] font-bold mt-1">
                {avgDisplay ?? <Unavailable isTelugu={isTelugu} />}
              </p>
              <span className="font-ntr text-[11px] text-[#736B63]">
                {isTelugu ? 'కఠిన కారాగార శ్రమ' : 'Rigorous Hard Labor'}
              </span>
            </div>

            {/* Total Fines */}
            <div className="p-4 border border-[#E8E2D9] bg-[#F4EFE6] rounded-xs">
              <span className="font-ntr text-xs text-[#57524C] uppercase tracking-wider block">
                {isTelugu ? 'విధించిన మొత్తం జరిమానా' : 'Total Fines Imposed'}
              </span>
              <p className="font-gurajada text-3xl sm:text-4xl text-[#781D22] font-bold mt-1 flex items-center justify-center gap-1">
                {stats.hasFineData
                  ? stats.totalFineDisplay
                  : <Unavailable isTelugu={isTelugu} />
                }
              </p>
              <span className="font-ntr text-[11px] text-[#736B63]">
                {isTelugu
                  ? `${stats.fightersWithFineData} రికార్డుల ఆధారంగా`
                  : `Based on ${stats.fightersWithFineData} records`}
              </span>
            </div>
          </div>

          {/* ── Korada Debbalu Callout ────────────────────────────────────── */}
          {stats.hasKoradaData && stats.totalKoradaCount > 0 && (
            <div className="p-3 border border-[#781D22]/30 bg-[#FBF0F0] rounded-xs flex items-center gap-3">
              <Flame className="w-5 h-5 text-[#781D22] shrink-0" />
              <p className="font-ntr text-xs text-[#2E2A27]">
                <span className="font-bold text-[#781D22]">
                  {isTelugu ? 'కొరడా దెబ్బలు: ' : 'Korada Debbalu (Whipping Lashes): '}
                </span>
                {isTelugu
                  ? `ఈ ఆర్కైవ్‌లోని ${stats.fightersWithKoradaData} సమరయోధులకు మొత్తం ${stats.totalKoradaCount} కొరడా దెబ్బలు విధించారు.`
                  : `A total of ${stats.totalKoradaCount} recorded whipping lashes were inflicted on ${stats.fightersWithKoradaData} fighters in this archive.`
                }
              </p>
            </div>
          )}

          {/* ── Editorial Two-Column Infographic Layout ───────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column (7 Cols): Colonial Prison Distribution Bars */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-gurajada text-2xl text-[#1C1917] border-b border-[#D6CFC7] pb-1 flex items-center justify-between">
                <span>{isTelugu ? 'కారాగారాల వారీగా నిర్బంధాలు' : 'Imprisonment by Colonial Prison Facilities'}</span>
                <span className="font-ntr text-xs text-[#781D22] font-semibold">
                  {stats.recordsInDataset} {t('search.resultsFound')}
                </span>
              </h3>

              <div className="space-y-4 pt-1">
                {stats.facilities.length > 0
                  ? stats.facilities.map((fac) => (
                    <div key={fac.id} className="space-y-1 font-ntr">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-bold text-[#1C1917] flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-[#781D22]" />
                          {isTelugu ? fac.nameTe : fac.nameEn}
                        </span>
                        <span className="text-[#781D22] font-bold">
                          {fac.count} ({fac.percentage}%)
                        </span>
                      </div>

                      {/* Editorial Newspaper Bar Chart */}
                      <div className="w-full h-3 bg-[#EAE4D9] rounded-xs overflow-hidden border border-[#D6CFC7]">
                        <div
                          className="h-full bg-[#781D22] transition-all duration-500"
                          style={{ width: `${fac.percentage}%` }}
                        />
                      </div>

                      {fac.descriptionTe && (
                        <p className="text-[11px] text-[#57524C] leading-snug">
                          {isTelugu ? fac.descriptionTe : fac.descriptionEn}
                        </p>
                      )}
                    </div>
                  ))
                  : (
                    <p className="font-ntr text-sm text-[#736B63] italic flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" />
                      {isTelugu ? 'కారాగార వివరాలు అందుబాటులో లేవు' : 'Prison facility data unavailable'}
                    </p>
                  )
                }
              </div>
            </div>

            {/* Right Column (5 Cols): Duration Breakdown & Summary */}
            <div className="lg:col-span-5 space-y-5 lg:border-l border-[#D6CFC7] lg:pl-6">

              {/* Duration Breakdown Box */}
              <div>
                <h4 className="font-gurajada text-2xl text-[#781D22] border-b border-[#D6CFC7] pb-1">
                  {isTelugu ? 'శిక్షా కాలాల వర్గీకరణ' : 'Sentence Duration Breakdown'}
                </h4>
                <div className="space-y-2.5 mt-3 font-ntr">
                  {stats.durationBreakdown.length > 0
                    ? stats.durationBreakdown.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-[#F4EFE6] border border-[#E8E2D9] text-xs">
                        <span className="font-medium text-[#2E2A27]">
                          {isTelugu ? item.rangeTe : item.rangeEn}
                        </span>
                        <span className="font-bold text-[#781D22] bg-[#FAF0F0] px-2 py-0.5 border border-[#781D22]/40 rounded-xs">
                          {item.count} ({item.percentage}%)
                        </span>
                      </div>
                    ))
                    : (
                      <p className="font-ntr text-xs text-[#736B63] italic flex items-center gap-1.5 p-2">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {isTelugu ? 'శిక్షా వివరాలు అందుబాటులో లేవు' : 'Duration data unavailable'}
                      </p>
                    )
                  }
                </div>
              </div>

              {/* Editorial Summary Box */}
              <div className="p-4 border-l-4 border-[#996515] bg-[#FBF6EB] rounded-xs space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#8B5A2B] font-ntr uppercase">
                  <History className="w-4 h-4 text-[#996515]" />
                  <span>{isTelugu ? 'చారిత్రక రికార్డు సారాంశం' : 'Historical Prison Legacy'}</span>
                </div>
                <p className="font-ntr text-xs text-[#2E2A27] leading-relaxed">
                  {t('priceOfFreedom.jailRecordsSummary')}
                </p>
                <Link
                  to="/fighters?filter=jail"
                  className="inline-block text-xs font-ntr font-bold text-[#781D22] hover:underline pt-1"
                >
                  {t('priceOfFreedom.exploreJailStats')} →
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
