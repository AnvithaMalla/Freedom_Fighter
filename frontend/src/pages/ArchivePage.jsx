import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/common/SectionHeading';
import { Search, Filter, X } from 'lucide-react';

const API_BASE_URL = 'http://127.0.0.1:8000';

export default function StampsPage() {
  const { t, isTelugu } = useLanguage();

  const [stamps, setStamps] = useState([]);
  const [selectedStamp, setSelectedStamp] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // --------------------------------------------------
  // Fetch stamps from FastAPI
  // --------------------------------------------------

  useEffect(() => {
    async function fetchStamps() {
      try {
        setLoading(true);
        setError('');

        const language = isTelugu ? 'te' : 'en';

        const response = await fetch(
          `${API_BASE_URL}/api/stamps/?language=${language}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch stamps');
        }

        const data = await response.json();

        setStamps(data);
      } catch (err) {
        console.error('Error fetching stamps:', err);
        setError(
          isTelugu
            ? 'స్టాంపు వివరాలను పొందడంలో లోపం ఏర్పడింది.'
            : 'Unable to load stamp records.'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchStamps();
  }, [isTelugu]);

  // --------------------------------------------------
  // Search
  // --------------------------------------------------

  const filteredStamps = stamps.filter((stamp) => {
    if (!searchTerm.trim()) {
      return true;
    }

    const q = searchTerm.toLowerCase();

    const title =
      stamp.translation?.title?.toLowerCase() || '';

    const description =
      stamp.translation?.description?.toLowerCase() || '';

    const subject =
      stamp.subject_name?.toLowerCase() || '';

    const country =
      stamp.country_name?.toLowerCase() || '';

    const stampNumber =
      stamp.stamp_number?.toLowerCase() || '';

    const denomination =
      stamp.denomination?.toLowerCase() || '';

    return (
      title.includes(q) ||
      description.includes(q) ||
      subject.includes(q) ||
      country.includes(q) ||
      stampNumber.includes(q) ||
      denomination.includes(q)
    );
  });

  // --------------------------------------------------
  // Image URL
  // --------------------------------------------------

  function getStampImage(imagePath) {
    if (!imagePath) {
      return '';
    }

    return `${API_BASE_URL}${imagePath}`;
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-ntr">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Page Header */}

        <SectionHeading
          kicker={isTelugu ? 'చారిత్రక స్టాంపులు' : 'HISTORICAL STAMPS'}
          title={isTelugu ? 'స్టాంపు ఆర్కైవ్' : 'Stamp Archive'}
          subtitle={
            isTelugu
              ? 'స్వాతంత్ర్య ఉద్యమం మరియు భారత చరిత్రకు సంబంధించిన చారిత్రక స్టాంపులను పరిశీలించండి.'
              : 'Explore historical postage stamps connected with India, its history, and important historical figures.'
          }
        />

        {/* Search & Filter Bar */}

        <div className="p-4 border border-[#D6CFC7] bg-[#F4EFE6] rounded-xs space-y-4">

          {/* Category / Result Row */}

          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#D6CFC7]">

            <div className="flex flex-wrap items-center gap-1.5 text-xs">

              <span className="font-bold text-[#781D22] mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />

                {isTelugu ? 'వర్గం:' : 'Category:'}
              </span>

              <button
                type="button"
                className="px-3 py-1 rounded-xs font-semibold border bg-[#781D22] text-[#FAF7F0] border-[#781D22]"
              >
                {isTelugu ? 'స్టాంపులు' : 'Stamps'}
              </button>

            </div>

            <span className="text-xs font-semibold text-[#57524C]">
              {filteredStamps.length}{' '}
              {isTelugu
                ? 'స్టాంపులు లభించాయి'
                : 'stamps found'}
            </span>

          </div>

          {/* Search Input */}

          <div className="relative">

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                isTelugu
                  ? 'స్టాంపు పేరు, వ్యక్తి, దేశం లేదా సంవత్సరం వెతకండి...'
                  : 'Search by stamp, person, country, denomination, or reference ID...'
              }
              className="w-full py-2.5 pl-10 pr-4 font-ntr text-sm border border-[#D6CFC7] bg-[#FAF7F0] text-[#1C1917] rounded-xs focus:outline-none focus:border-[#781D22]"
            />

            <Search className="w-4 h-4 text-[#781D22] absolute left-3 top-1/2 -translate-y-1/2" />

          </div>

        </div>

        {/* Loading */}

        {loading && (
          <div className="text-center py-12">
            <p className="font-gurajada text-2xl text-[#781D22]">
              {isTelugu
                ? 'స్టాంపులను లోడ్ చేస్తోంది...'
                : 'Loading stamps...'}
            </p>
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="text-center py-12 p-6 border-2 border-dashed border-[#D6CFC7] bg-[#FDFBF7] rounded-xs">
            <p className="font-gurajada text-2xl text-[#781D22]">
              {error}
            </p>
          </div>
        )}

        {/* No Results */}

        {!loading && !error && filteredStamps.length === 0 && (
          <div className="text-center py-12 p-6 border-2 border-dashed border-[#D6CFC7] bg-[#FDFBF7] rounded-xs">

            <p className="font-gurajada text-2xl text-[#781D22]">
              {isTelugu
                ? 'స్టాంపులు కనుగొనబడలేదు'
                : 'No stamps found'}
            </p>

          </div>
        )}

        {/* Stamps Grid */}

        {!loading && !error && filteredStamps.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {filteredStamps.map((stamp) => {

              const title =
                stamp.translation?.title ||
                stamp.subject_name;

              const description =
                stamp.translation?.description ||
                '';

              return (
                <article
                  key={stamp.stamp_id}
                  className="group border border-[#D6CFC7] bg-[#FDFBF7] rounded-xs overflow-hidden hover:border-[#781D22] transition-colors"
                >

                  {/* Stamp Image */}

                  <div className="relative h-64 bg-[#1C1917] flex items-center justify-center overflow-hidden">

                    {stamp.image_path ? (
                      <img
                        src={getStampImage(stamp.image_path)}
                        alt={title}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="text-[#FAF7F0] text-sm">
                        {isTelugu
                          ? 'చిత్రం అందుబాటులో లేదు'
                          : 'Image unavailable'}
                      </div>
                    )}

                    {/* STAMPS Label */}

                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#781D22] text-[#FAF7F0] text-[10px] font-bold tracking-widest">
                      {isTelugu ? 'స్టాంపులు' : 'STAMPS'}
                    </div>

                  </div>

                  {/* Card Content */}

                  <div className="p-4 space-y-3">

                    {/* Stamp Number */}

                    <div className="flex items-center justify-between">

                      <span className="text-[11px] font-bold tracking-widest text-[#781D22]">
                        {stamp.stamp_number}
                      </span>

                      <span className="text-xs text-[#57524C]">
                        {stamp.release_year}
                      </span>

                    </div>

                    {/* Country */}

                    <p className="text-xs font-semibold text-[#57524C] uppercase tracking-wide">
                      {stamp.country_name}
                    </p>

                    {/* Title */}

                    <h3 className="font-gurajada text-2xl leading-tight text-[#1C1917]">
                      {title}
                    </h3>

                    {/* Description */}

                    <p className="text-sm leading-relaxed text-[#57524C] line-clamp-3">
                      {description}
                    </p>

                    {/* Examine Button */}

                    <button
                      type="button"
                      onClick={() => setSelectedStamp(stamp)}
                      className="w-full mt-2 px-4 py-2 border border-[#781D22] text-[#781D22] text-xs font-bold tracking-wide hover:bg-[#781D22] hover:text-[#FAF7F0] transition-colors cursor-pointer"
                    >
                      {isTelugu
                        ? 'స్టాంపులను పరిశీలించండి'
                        : 'Examine Stamp'}
                    </button>

                  </div>

                </article>
              );
            })}

          </div>
        )}

      </div>

      {/* Stamp Examination Modal */}

      {selectedStamp && (
        <StampModal
          stamp={selectedStamp}
          isTelugu={isTelugu}
          onClose={() => setSelectedStamp(null)}
          getStampImage={getStampImage}
        />
      )}

    </div>
  );
}


/* ==================================================
   STAMP DETAIL MODAL
================================================== */

function StampModal({
  stamp,
  isTelugu,
  onClose,
  getStampImage,
}) {
  const translation = stamp.translation || {};

  const title =
    translation.title ||
    stamp.subject_name;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >

      <div
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-[#FAF7F0] rounded-xs shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}

        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 p-5 border-b border-[#D6CFC7] bg-[#FAF7F0]">

          <div>

            <p className="text-[10px] font-bold tracking-[0.2em] text-[#781D22]">
              {isTelugu ? 'స్టాంపు ఆర్కైవ్' : 'STAMP ARCHIVE'}
            </p>

            <h2 className="font-gurajada text-3xl text-[#1C1917]">
              {title}
            </h2>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#57524C] hover:text-[#781D22] cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

        </div>

        {/* Content */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">

          {/* Image */}

          <div className="bg-[#1C1917] min-h-[400px] flex items-center justify-center">

            {stamp.image_path && (
              <img
                src={getStampImage(stamp.image_path)}
                alt={title}
                className="max-w-full max-h-[600px] object-contain p-6"
              />
            )}

          </div>

          {/* Information */}

          <div className="space-y-6">

            {/* Tags */}

            <div className="flex flex-wrap gap-2">

              <span className="px-2.5 py-1 bg-[#781D22] text-[#FAF7F0] text-[10px] font-bold tracking-wide">
                STAMPS
              </span>

              <span className="px-2.5 py-1 border border-[#D6CFC7] text-[#57524C] text-[10px] font-bold">
                {stamp.release_year}
              </span>

              <span className="px-2.5 py-1 border border-[#D6CFC7] text-[#57524C] text-[10px] font-bold">
                {stamp.country_name}
              </span>

            </div>

            {/* Summary */}

            <section>

              <h3 className="text-xs font-bold tracking-widest text-[#781D22] mb-2">
                {isTelugu
                  ? 'స్టాంపు సారాంశం'
                  : 'STAMP SUMMARY'}
              </h3>

              <p className="text-sm leading-relaxed text-[#57524C]">
                {translation.description}
              </p>

            </section>

            {/* Basic Information */}

            <div className="grid grid-cols-2 gap-4">

              <InfoItem
                label={isTelugu ? 'విషయం' : 'Subject'}
                value={stamp.subject_name}
              />

              <InfoItem
                label={isTelugu ? 'దేశం' : 'Country'}
                value={stamp.country_name}
              />

              <InfoItem
                label={isTelugu ? 'విడుదల సంవత్సరం' : 'Release Year'}
                value={stamp.release_year}
              />

              <InfoItem
                label={isTelugu ? 'విలువ' : 'Denomination'}
                value={stamp.denomination || '—'}
              />

              <InfoItem
                label={isTelugu ? 'విడుదల రకం' : 'Issue Type'}
                value={stamp.issue_type || '—'}
              />

              <InfoItem
                label={isTelugu ? 'ఉద్దేశ్యం' : 'Purpose'}
                value={stamp.purpose_type || '—'}
              />

            </div>

            {/* Why Issued */}

            {translation.reason && (
              <InfoSection
                title={isTelugu ? 'ఎందుకు విడుదల చేశారు' : 'WHY IT WAS ISSUED'}
                text={translation.reason}
              />
            )}

            {/* Historical Significance */}

            {translation.historical_significance && (
              <InfoSection
                title={
                  isTelugu
                    ? 'చారిత్రక ప్రాముఖ్యత'
                    : 'HISTORICAL SIGNIFICANCE'
                }
                text={translation.historical_significance}
              />
            )}

            {/* Original Usage */}

            {translation.original_usage && (
              <InfoSection
                title={
                  isTelugu
                    ? 'అసలు వినియోగం'
                    : 'ORIGINAL USAGE'
                }
                text={translation.original_usage}
              />
            )}

            {/* Current Status */}

            {translation.current_status && (
              <InfoSection
                title={
                  isTelugu
                    ? 'ప్రస్తుత స్థితి'
                    : 'CURRENT STATUS'
                }
                text={translation.current_status}
              />
            )}

          </div>

        </div>

      </div>

    </div>
  );
}


/* ==================================================
   INFORMATION COMPONENTS
================================================== */

function InfoItem({ label, value }) {
  return (
    <div className="border-t border-[#D6CFC7] pt-2">

      <p className="text-[10px] font-bold tracking-widest text-[#781D22] uppercase">
        {label}
      </p>

      <p className="text-sm text-[#1C1917] mt-1">
        {value}
      </p>

    </div>
  );
}


function InfoSection({ title, text }) {
  return (
    <section className="border-t border-[#D6CFC7] pt-4">

      <h3 className="text-xs font-bold tracking-widest text-[#781D22] mb-2">
        {title}
      </h3>

      <p className="text-sm leading-relaxed text-[#57524C]">
        {text}
      </p>

    </section>
  );
}