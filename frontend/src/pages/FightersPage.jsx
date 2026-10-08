import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getPersons } from '../services/api';
import SectionHeading from '../components/common/SectionHeading';
import SearchBar from '../components/common/SearchBar';
import FilterBar from '../components/common/FilterBar';
import FighterGrid from '../components/fighters/FighterGrid';

const initialFilters = {
  district: 'all',
  year: 'all',
  duration: 'all',
  fine: 'all',
  korada: 'all',
};

export default function FightersPage() {
  const { language, isTelugu } = useLanguage();

  const [fighters, setFighters] = useState([]);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadFighters() {
      try {
        setLoading(true);
        setError(null);

        const data = await getPersons(language);

        // Prevent state update if component was unmounted
        if (!cancelled) {
          setFighters(data);
        }
      } catch (err) {
        console.error('Failed to load fighters:', err);

        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadFighters();

    return () => {
      cancelled = true;
    };
  }, [language]);

  const filtered = fighters.filter((fighter) => {
    const q = query.trim().toLowerCase();

    const name = fighter.name?.toLowerCase() || '';
    const fatherName =
      fighter.father_name?.toLowerCase() || '';
    const village =
      fighter.village?.toLowerCase() || '';
    const area =
      fighter.area?.area_name?.toLowerCase() || '';
    const district =
      fighter.district?.district_name?.toLowerCase() || '';

    if (
      q &&
      ![
        name,
        fatherName,
        village,
        area,
        district,
      ].some((value) => value.includes(q))
    ) {
      return false;
    }

    return true;
  });

  const active =
    query !== '' ||
    Object.values(filters).some(
      (x) => x !== 'all'
    );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] py-10 px-4 text-center font-ntr">
        <p className="text-[#781D22]">
          {isTelugu
            ? 'స్వాతంత్ర్య సమరయోధుల వివరాలు లోడ్ అవుతున్నాయి...'
            : 'Loading freedom fighters...'}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] py-10 px-4 text-center font-ntr">
        <p className="text-red-700">
          {isTelugu
            ? 'రికార్డులను లోడ్ చేయడం సాధ్యం కాలేదు.'
            : 'Failed to load records.'}
        </p>

        <p className="text-sm text-[#57524C] mt-2">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-10 px-4 sm:px-6 lg:px-8 font-ntr">
      <div className="max-w-7xl mx-auto space-y-7">

        <SectionHeading
          kicker={
            isTelugu
              ? 'తూర్పు & పశ్చిమ గోదావరి'
              : 'East & West Godavari'
          }
          title={
            isTelugu
              ? 'గోదావరి స్వాతంత్ర్య సమరయోధులు'
              : 'Godavari Freedom Fighters'
          }
          subtitle={
            isTelugu
              ? 'పేరు, ప్రాంతం మరియు రికార్డు వివరాల ద్వారా అన్వేషించండి.'
              : 'Explore freedom fighter records by name, area, and district.'
          }
        />

        <SearchBar
          value={query}
          onChange={setQuery}
        />

        <FilterBar
          filters={filters}
          setFilters={setFilters}
          hasActiveFilters={active}
          onReset={() => {
            setQuery('');
            setFilters(initialFilters);
          }}
        />

        <FighterGrid fighters={filtered} />

      </div>
    </div>
  );
}