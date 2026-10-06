import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function FighterCard({ fighter, viewMode = 'grid' }) {
  const { isTelugu } = useLanguage();

  const name = fighter.name || '—';
  const district = fighter.district?.district_name || '—';
  const fatherName = fighter.father_name || '—';
  const taluka = fighter.area?.area_name || '—';

  const fields = [
    [
      isTelugu ? 'జిల్లా' : 'District',
      district,
    ],
    [
      isTelugu ? 'తండ్రి పేరు' : "Father's Name",
      fatherName,
    ],
    [
      isTelugu ? 'తాలూకా' : 'Taluka',
      taluka,
    ],
  ];

  return (
    <article
      className={`border border-[#D6CFC7] bg-white p-5 archive-card-hover ${
        viewMode === 'list'
          ? 'grid sm:grid-cols-[minmax(12rem,1fr)_1fr_1fr_1fr_auto] gap-6 items-start'
          : ''
      }`}
    >
      {/* Name */}
      <div>
        <p className="font-ntr text-xs text-[#8B5A2B] mb-1">
          {district}
        </p>

        <h3 className="font-gurajada text-3xl leading-[1.25] text-[#1C1917] mb-4">
          <Link to={`/fighters/${fighter.person_id}`}>
            {name}
          </Link>
        </h3>
      </div>

      {/* Details */}
      <dl
        className={
          viewMode === 'list'
            ? 'contents'
            : 'grid grid-cols-3 gap-x-6 gap-y-5 font-ntr text-sm leading-relaxed'
        }
      >
        {fields.map(([label, value]) => (
          <div
            key={label}
            className={
              viewMode === 'list'
                ? 'font-ntr text-sm leading-relaxed'
                : ''
            }
          >
            <dt className="text-xs font-semibold text-[#781D22] mb-0.5">
              {label}
            </dt>

            <dd className="text-[#2E2A27]">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      {/* View Details */}
      <Link
        to={`/fighters/${fighter.person_id}`}
        className="inline-flex mt-5 text-sm font-ntr font-bold text-[#781D22] hover:underline"
      >
        {isTelugu ? 'వివరాలు చూడండి' : 'View Details'} →
      </Link>
    </article>
  );
}