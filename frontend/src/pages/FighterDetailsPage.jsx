import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Printer, Copy, Check } from 'lucide-react';
import { getPerson } from '../services/api';

export default function FighterDetailsPage() {
  const { id } = useParams();
  const { language, isTelugu, t } = useLanguage();

  const [fighter, setFighter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadFighter() {
      try {
        setLoading(true);
        setError(null);

        const data = await getPerson(id);

        setFighter(data);
      } catch (err) {
        console.error('Failed to load fighter:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadFighter();
  }, [id, language]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] p-12 text-center font-ntr">
        <p className="text-[#781D22]">
          {isTelugu ? 'రికార్డు లోడ్ అవుతోంది...' : 'Loading record...'}
        </p>
      </div>
    );
  }

  if (error || !fighter) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] p-12 text-center font-ntr">
        <p className="text-red-700 mb-4">
          {isTelugu
            ? 'రికార్డు కనుగొనబడలేదు'
            : 'Record not found'}
        </p>

        <Link
          className="text-[#781D22] font-bold"
          to="/fighters"
        >
          ← {t('common.back')}
        </Link>
      </div>
    );
  }

  const areaName = fighter.area?.area_name || '';
  const districtName = fighter.district?.district_name || '';

  const punishmentText = fighter.punishments
    ?.map((item) => {
      if (item.punishment_year) {
        return `${item.punishment} (${item.punishment_year})`;
      }

      return item.punishment;
    })
    .join(', ') || '—';

  const rows = [
    [
      isTelugu ? 'పేరు' : 'Name',
      fighter.name || '—',
    ],
    [
      isTelugu ? 'తండ్రి పేరు' : "Father's Name",
      fighter.father_name || '—',
    ],
    [
      isTelugu ? 'జిల్లా' : 'District',
      districtName || '—',
    ],
    [
      isTelugu ? 'తాలూకా' : 'Taluka',
      areaName || '—',
    ],
  ];

  const copy = async () => {
    const text = `${fighter.name}. Godavari Freedom Archive.`;

    try {
      await navigator.clipboard?.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-8 px-4 sm:px-6 font-ntr">
      <div className="max-w-3xl mx-auto">

        {/* Top controls */}
        <div className="no-print flex justify-between mb-5">

          <Link
            className="text-[#781D22] font-bold"
            to="/fighters"
          >
            ← {t('common.back')}
          </Link>

          <span className="flex gap-2">

            <button
              onClick={copy}
              className="border p-2 text-xs"
              title="Copy"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => window.print()}
              className="bg-[#781D22] text-white p-2 text-xs flex gap-1"
            >
              <Printer className="w-4 h-4" />

              {t('fighterDetails.printDossier')}
            </button>

          </span>
        </div>

        {/* Record */}
        <article className="bg-white border-4 border-[#1C1917] p-6 sm:p-10">

          <p className="text-center text-xs text-[#8B5A2B] mb-3">
            {isTelugu
              ? 'గోదావరి స్వాతంత్ర్య ఆర్కైవ్ • రికార్డు'
              : 'GODAVARI FREEDOM ARCHIVE • RECORD'}
          </p>

          <h1 className="font-gurajada text-5xl text-center leading-[1.25] pb-6 border-b-2 border-[#1C1917]">
            {fighter.name}
          </h1>

          {/* Person details */}
          <dl className="divide-y divide-[#D6CFC7] mt-5">

            {rows.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-4 leading-relaxed"
              >
                <dt className="font-semibold text-[#781D22]">
                  {label}
                </dt>

                <dd className="sm:col-span-2 text-[#1C1917]">
                  {value}
                </dd>
              </div>
            ))}

          </dl>

          {/* Multiple punishments */}
          {fighter.punishments?.length > 0 && (
            <section className="mt-8 pt-6 border-t-2 border-[#1C1917]">

              <h2 className="font-gurajada text-3xl text-[#781D22] mb-4">
                {isTelugu ? 'శిక్షల వివరాలు' : 'Punishment Records'}
              </h2>

              <div className="space-y-3">

                {fighter.punishments.map((punishment) => (
                  <div
                    key={punishment.punishment_id}
                    className="border border-[#D6CFC7] p-4"
                  >
                    <p className="font-semibold">
                      {punishment.punishment}
                    </p>

                    {punishment.punishment_year && (
                      <p className="text-sm text-[#8B5A2B] mt-1">
                        {isTelugu ? 'సంవత్సరం' : 'Year'}:{' '}
                        {punishment.punishment_year}
                      </p>
                    )}
                  </div>
                ))}

              </div>

            </section>
          )}

        </article>
      </div>
    </div>
  );
}