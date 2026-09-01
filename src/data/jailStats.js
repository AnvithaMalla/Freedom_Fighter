// Quantitative Jail Statistics — Dynamically computed from fighters.js
// When the mock dataset is replaced with the real ~1,000-record dataset, all stats auto-update.

import { fighters as defaultFighters } from './fighters.js';

// ─── Facility metadata (labels / descriptions only — counts are computed) ───────
const FACILITY_META = {
  rajahmundry: {
    nameTe: 'రాజమండ్రి సెంట్రల్ జైలు',
    nameEn: 'Rajahmundry Central Jail',
    descriptionTe:
      'గోదావరి సమరయోధులకు ప్రధాన నిర్బంధ కేంద్రం. బులుసు సాంబమూర్తి, గరిమెళ్ల సత్యనారాయణ, వందలాది ఉప్పు సత్యాగ్రహులను ఇక్కడే బంధించారు.',
    descriptionEn:
      'Primary colonial incarceration facility in the Godavari delta housing hundreds of Salt Satyagrahis.',
  },
  vellore: {
    nameTe: 'రాయవేలూరు & కన్ననూరు జైలు',
    nameEn: 'Rayavellore & Cannanore Prisons',
    descriptionTe:
      'మహిళా యోధులైన దుర్గాబాయి దేశ్‌ముఖ్, దువ్వూరి సుబ్బమ్మ, పాలేపు లక్ష్మీకాంతమ్మలు కఠిన నిర్బంధం అనుభవించిన జైలు.',
    descriptionEn:
      'High-security facility where prominent women leaders like Durgabai and Duvvuri Subbamma were jailed.',
  },
  cellular: {
    nameTe: 'అండమాన్ సెల్యులార్ జైలు (కాలపానీ)',
    nameEn: 'Andaman Cellular Jail (Kalapani)',
    descriptionTe:
      'రంప విప్లవ సాయుధ దళపతులైన మల్లు దొర, గంటం దొరలను అమానుష శిక్షల కోసం కాలపానీకి తరలించారు.',
    descriptionEn:
      'Reserved for armed revolutionaries of the Rampa Rebellion transported for life.',
  },
  ahmednagar: {
    nameTe: 'అహ్మద్‌నగర్ ఫోర్ట్ & అలీపూర్ జైలు',
    nameEn: 'Ahmednagar Fort & Alipore Jails',
    descriptionTe:
      'డా. పట్టాభి సీతారామయ్యతో సహా కాంగ్రెస్ అగ్రనాయకత్వం నిర్బంధించబడిన ప్రత్యేక కారాగారాలు.',
    descriptionEn:
      'Fortresses used for indefinite solitary detention of high-ranking national leaders.',
  },
  'rampa-agency': {
    nameTe: 'రంప ఏజెన్సీ అటవీ ప్రాంతాలు',
    nameEn: 'Rampa Agency Forest Zones',
    descriptionTe: 'చింతపల్లి, రాజవొమ్మంగి, అడ్డతీగల – రంప విప్లవ పోరాట ప్రాంతాలు.',
    descriptionEn: 'Active guerrilla combat zones of the 1922–1924 Rampa Rebellion.',
  },
};

// ─── Duration bracket labels ────────────────────────────────────────────────────
const DURATION_BRACKETS = [
  {
    key: 'lt1y',
    rangeTe: '1 సంవత్సరంలోపు',
    rangeEn: 'Under 1 Year',
    test: (m) => m > 0 && m < 12,
  },
  {
    key: '1to2y',
    rangeTe: '1 – 2 సంవత్సరాలు',
    rangeEn: '1 – 2 Years',
    test: (m) => m >= 12 && m <= 24,
  },
  {
    key: '2to5y',
    rangeTe: '2 – 5 సంవత్సరాలు (కఠిన శిక్ష)',
    rangeEn: '2 – 5 Years Rigorous',
    test: (m) => m > 24 && m <= 60,
  },
  {
    key: 'gt5y',
    rangeTe: '5 సంవత్సరాలకు పైగా / జీవిత ఖైదు',
    rangeEn: '5+ Years / Kalapani Life',
    test: (m) => m > 60,
  },
];

/**
 * Safely checks whether a value is a valid positive number.
 * Excludes null, undefined, NaN, Infinity, and non-positive numbers.
 */
function isValidPositive(v) {
  return typeof v === 'number' && !isNaN(v) && isFinite(v) && v > 0;
}

/**
 * Safely checks whether a value is a valid non-negative number (≥ 0).
 * Used for fineAmount and koradaCount which may legitimately be 0.
 */
function isValidNonNegative(v) {
  return typeof v === 'number' && !isNaN(v) && isFinite(v) && v >= 0;
}

/**
 * calculateFreedomStats(fightersList)
 *
 * Computes all homepage statistics directly from the fighters dataset.
 * Designed to be data-driven: swap in the real ~1,000 records and every
 * statistic on the homepage updates automatically without UI changes.
 *
 * @param {Array} fightersList  Array of fighter objects (defaults to fighters.js)
 * @returns {Object}            Aggregated statistics object
 */
export function calculateFreedomStats(fightersList = defaultFighters) {
  // ── 1. Duration aggregation ────────────────────────────────────────────────
  const withDuration = fightersList.filter((f) => isValidPositive(f.durationMonths));
  const totalDurationMonths = withDuration.reduce((sum, f) => sum + f.durationMonths, 0);
  const durationYears = Math.floor(totalDurationMonths / 12);
  const durationRemainderMonths = totalDurationMonths % 12;
  const hasDurationData = withDuration.length > 0;

  // ── 2. Fine aggregation ────────────────────────────────────────────────────
  const withFine = fightersList.filter((f) => isValidNonNegative(f.fineAmount));
  const totalFineAmount = withFine.reduce((sum, f) => sum + f.fineAmount, 0);
  const hasFineData = withFine.length > 0;

  // ── 3. Korada Debbalu aggregation ─────────────────────────────────────────
  const withKorada = fightersList.filter((f) => isValidNonNegative(f.koradaCount));
  const totalKoradaCount = withKorada.reduce((sum, f) => sum + f.koradaCount, 0);
  const hasKoradaData = withKorada.length > 0;

  // ── 4. Duration bracket breakdown ─────────────────────────────────────────
  const totalWithDuration = withDuration.length;
  const durationBreakdown = DURATION_BRACKETS.map((bracket) => {
    const matchCount = withDuration.filter((f) => bracket.test(f.durationMonths)).length;
    const percentage =
      totalWithDuration > 0 ? Math.round((matchCount / totalWithDuration) * 100) : 0;
    return {
      rangeTe: bracket.rangeTe,
      rangeEn: bracket.rangeEn,
      count: matchCount,
      percentage,
    };
  }).filter((b) => b.count > 0); // Only show brackets with actual data

  // ── 5. Facility breakdown ──────────────────────────────────────────────────
  const facilityCounts = {};
  fightersList.forEach((f) => {
    if (f.jailCode) {
      facilityCounts[f.jailCode] = (facilityCounts[f.jailCode] || 0) + 1;
    }
  });
  const totalWithFacility = Object.values(facilityCounts).reduce((a, b) => a + b, 0);
  const facilities = Object.entries(facilityCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([id, count]) => {
      const meta = FACILITY_META[id] || {
        nameTe: id,
        nameEn: id,
        descriptionTe: '',
        descriptionEn: '',
      };
      return {
        id,
        nameTe: meta.nameTe,
        nameEn: meta.nameEn,
        count,
        percentage:
          totalWithFacility > 0 ? Math.round((count / totalWithFacility) * 100) : 0,
        descriptionTe: meta.descriptionTe,
        descriptionEn: meta.descriptionEn,
      };
    });

  // ── 6. District breakdown ──────────────────────────────────────────────────
  const eastCount = fightersList.filter(
    (f) => f.districtCode === 'east' || f.districtCode === 'east-west'
  ).length;
  const westCount = fightersList.filter(
    (f) => f.districtCode === 'west' || f.districtCode === 'east-west'
  ).length;

  // ── 7. Formatted display values ────────────────────────────────────────────
  const totalDurationDisplay = hasDurationData
    ? durationRemainderMonths > 0
      ? `${durationYears} సం. ${durationRemainderMonths} నె.`
      : `${durationYears} సంవత్సరాలు`
    : null;

  const totalDurationDisplayEn = hasDurationData
    ? durationRemainderMonths > 0
      ? `${durationYears} yrs ${durationRemainderMonths} mo.`
      : `${durationYears} Years`
    : null;

  const totalFineDisplay = hasFineData
    ? `₹${totalFineAmount.toLocaleString('en-IN')}`
    : null;

  const totalKoradaDisplay = hasKoradaData ? `${totalKoradaCount}` : null;

  return {
    // ── Meta ──────────────────────────────────────────────────────────────
    recordsInDataset: fightersList.length,

    // ── Duration ──────────────────────────────────────────────────────────
    hasDurationData,
    totalDurationMonths,
    totalDurationYears: durationYears,
    totalDurationRemainderMonths: durationRemainderMonths,
    totalDurationDisplay,       // Telugu formatted string or null
    totalDurationDisplayEn,     // English formatted string or null
    fightersWithDurationData: withDuration.length,

    // ── Fines ─────────────────────────────────────────────────────────────
    hasFineData,
    totalFineAmount,
    totalFineDisplay,           // '₹2,300' or null
    fightersWithFineData: withFine.length,

    // ── Korada Debbalu ────────────────────────────────────────────────────
    hasKoradaData,
    totalKoradaCount,
    totalKoradaDisplay,         // '42' or null
    fightersWithKoradaData: withKorada.length,

    // ── Breakdowns ────────────────────────────────────────────────────────
    durationBreakdown,
    facilities,

    // ── District ──────────────────────────────────────────────────────────
    eastGodavariCount: eastCount,
    westGodavariCount: westCount,
  };
}

// ─── Default export: pre-computed stats from the bundled fighters list ────────
// Backward-compatible: components can import `jailStatistics` directly, or call
// `calculateFreedomStats(myFighters)` to recompute with a different dataset.
export const jailStatistics = calculateFreedomStats(defaultFighters);
