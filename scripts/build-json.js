#!/usr/bin/env node
/**
 * Converts clinics.csv → JSON API files.
 * Zero dependencies — uses only Node.js built-ins.
 * Run: node scripts/build-json.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data');
const API_DIR = path.join(ROOT, 'api');

// Per-clinic coordinates (researched from addresses)
const CLINIC_COORDS = require('./clinic-coordinates.js');

// City-level fallback (only used if clinic not in CLINIC_COORDS)
const CITY_COORDS = {
  'Singapore': { lat: 1.3521, lng: 103.8198 },
  'Kuala Lumpur': { lat: 3.1390, lng: 101.6869 },
  'Penang': { lat: 5.4164, lng: 100.3327 },
  'Johor Bahru': { lat: 1.4927, lng: 103.7414 },
  'Jakarta': { lat: -6.2088, lng: 106.8456 },
  'Surabaya': { lat: -7.2575, lng: 112.7521 },
  'Medan': { lat: 3.5952, lng: 98.6722 },
  'Bandung': { lat: -6.9175, lng: 107.6191 },
  'Batam': { lat: 1.0456, lng: 104.0305 },
  'Bangkok': { lat: 13.7563, lng: 100.5018 },
  'Hat Yai': { lat: 7.0086, lng: 100.4747 },
  'Hanoi': { lat: 21.0285, lng: 105.8542 },
  'Ho Chi Minh City': { lat: 10.8231, lng: 106.6297 },
  'Bandar Seri Begawan': { lat: 4.9031, lng: 114.9398 },
};

// Small jitter for city-level fallback only
function jitter(coord) {
  return coord + (Math.random() - 0.5) * 0.01;
}

// Parse CSV (handles quoted fields with commas)
function parseCSV(text) {
  const lines = text.split('\n').filter(l => l.trim());
  const headers = parseCSVLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const obj = {};
    headers.forEach((h, i) => {
      obj[h.trim()] = (values[i] || '').trim();
    });
    return obj;
  });
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

// --- Build clinics.json ---
const csvText = fs.readFileSync(path.join(DATA_DIR, 'clinics.csv'), 'utf8');
const clinics = parseCSV(csvText).map(row => {
  const name = row.clinic_name || '';
  const city = row.city || '';
  // Use per-clinic coords if available, else fall back to city with jitter
  const clinicCoords = CLINIC_COORDS[name];
  const cityCoords = CITY_COORDS[city] || { lat: 0, lng: 0 };
  const coords = clinicCoords || { lat: jitter(cityCoords.lat), lng: jitter(cityCoords.lng) };
  if (!clinicCoords) {
    console.warn(`  ⚠ No specific coords for: ${name} (using ${city} fallback)`);
  }
  return {
    clinic_name: name,
    country: row.country || '',
    city: city,
    website: row.website || '',
    email: row.email || '',
    phone: row.phone || '',
    services: row.services || '',
    tier: row.tier ? parseInt(row.tier, 10) : null,
    ships_overseas: row.ships_overseas || '',
    notes: row.notes || '',
    lat: coords.lat,
    lng: coords.lng,
  };
});

fs.writeFileSync(
  path.join(API_DIR, 'clinics.json'),
  JSON.stringify(clinics, null, 2)
);
console.log(`✓ api/clinics.json — ${clinics.length} clinics`);

// --- Build clinics-stats.json ---
const byCountry = {};
const byTier = { '1': 0, '2': 0, '3': 0, 'untiered': 0 };
let hasEmail = 0, hasPhone = 0, hasServices = 0, hasTier = 0;

clinics.forEach(c => {
  byCountry[c.country] = (byCountry[c.country] || 0) + 1;
  if (c.tier) {
    byTier[String(c.tier)] = (byTier[String(c.tier)] || 0) + 1;
    hasTier++;
  } else {
    byTier.untiered++;
  }
  if (c.email) hasEmail++;
  if (c.phone) hasPhone++;
  if (c.services) hasServices++;
});

const stats = {
  total_clinics: clinics.length,
  by_country: byCountry,
  by_tier: byTier,
  data_completeness: {
    has_email: hasEmail,
    has_phone: hasPhone,
    has_services: hasServices,
    has_tier: hasTier,
  },
  last_updated: new Date().toISOString().split('T')[0],
};

fs.writeFileSync(
  path.join(API_DIR, 'clinics-stats.json'),
  JSON.stringify(stats, null, 2)
);
console.log(`✓ api/clinics-stats.json`);

// --- Build regulatory.json ---
const regulatory = [
  {
    country: 'Vietnam',
    flag: '🇻🇳',
    priority: 1,
    regulator: 'Ministry of Health (Bo Y Te)',
    pgt_status: {
      pgt_m: { status: 'approved', label: 'Approved', notes: 'Available at major centres — published PGT-M research for beta-thalassaemia' },
      pgt_a: { status: 'approved', label: 'Approved', notes: 'Routinely offered at leading clinics in Hanoi and HCMC' },
      pgt_sr: { status: 'restricted', label: 'Restricted', notes: 'Likely available at advanced centres — no explicit regulation found' },
      pgt_p: { status: 'not_approved', label: 'Not approved', notes: 'No evidence of offering or regulation' },
      sex_selection: { status: 'prohibited', label: 'Prohibited', notes: 'Fines up to VND 30 million (proposed increase to VND 100M)' },
    },
    cross_border_shipping: {
      status: 'unclear',
      summary: 'Decree 89/2018 requires medical declaration for cross-border biological samples. No specific embryo biopsy regulation found.',
      evidence: 'No Vietnamese clinic found publicly advertising overseas biopsy shipping.',
    },
    ivf_cost_usd: { min: 2400, max: 6000 },
    clinic_count: byCountry['Vietnam'] || 0,
    tier1_count: clinics.filter(c => c.country === 'Vietnam' && c.tier === 1).length,
    key_insight: 'Most advanced Hanoi clinics offer PGT-A — adding PGT-P is one supplier change, not a capability build.',
    recent_changes: 'Decree 207/2025 (Oct 2025): single women can access ART; part of pro-natalist shift after ending two-child policy.',
    sources: [
      { title: 'Decree 207/2025/ND-CP (English)', url: 'https://english.luatvietnam.vn/hon-nhan-gia-dinh/decree-207-2025-nd-cp-assisted-reproductive-technology-and-surrogacy-405740-d1.html' },
      { title: 'Decree 89/2018/ND-CP — cross-border biological samples', url: 'https://english.luatvietnam.vn/decree-no-89-2018-nd-cp-dated-june-25-2018-of-the-government-guiding-the-implementation-of-the-law-on-infectious-disease-prevention-and-control-rega-164532-Doc1.html' },
      { title: 'ClinRegs Vietnam — NIH/NIAID', url: 'https://clinregs.niaid.nih.gov/country/vietnam' },
      { title: 'PGT-M for beta-thalassaemia in Vietnam — PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/33216308/' },
      { title: 'Vinmec: 3 types of PGT', url: 'https://www.vinmec.com/eng/article/3-types-of-preimplantation-genetic-testing-en' },
      { title: 'UNFPA Vietnam — sex selection', url: 'https://vietnam.unfpa.org/en/news/not-girls' },
      { title: 'Vietnam Law Magazine — single women IVF access', url: 'https://vietnamlawmagazine.vn/vietnam-grants-single-women-full-access-to-ivf-74860.html' },
      { title: 'Newsweek — Vietnam ends two-child policy', url: 'https://www.newsweek.com/vietnam-two-child-policy-birth-rates-2080941' },
      { title: 'Docosan — IVF cost in Vietnam 2025', url: 'https://www.docosan.com/blog/en/ivf-cost-in-vietnam-and-detailed-price-breakdown/' },
    ],
  },
  {
    country: 'Malaysia',
    flag: '🇲🇾',
    priority: 2,
    regulator: 'Malaysian Medical Council (MMC)',
    pgt_status: {
      pgt_m: { status: 'approved', label: 'Approved', notes: 'Available at Alpha IVF, Sunfert, TMC — when clinically indicated' },
      pgt_a: { status: 'approved', label: 'Approved', notes: 'Broadly offered at major clinics — when clinically indicated' },
      pgt_sr: { status: 'approved', label: 'Approved', notes: 'Falls under clinically indicated PGT' },
      pgt_p: { status: 'unclear', label: 'Unclear', notes: 'No clinics offer it; academic concerns raised under Islamic bioethics' },
      sex_selection: { status: 'prohibited', label: 'Prohibited', notes: 'Only for sex-linked genetic disorders, case-by-case' },
    },
    cross_border_shipping: {
      status: 'yes',
      summary: 'Clinics already ship to Igenomix (~$300/shipment, 7 working days). No outright prohibition found.',
      evidence: 'Strongest pathway — existing shipping infrastructure to overseas reference labs.',
    },
    ivf_cost_usd: { min: 3000, max: 7700 },
    clinic_count: byCountry['Malaysia'] || 0,
    tier1_count: clinics.filter(c => c.country === 'Malaysia' && c.tier === 1).length,
    key_insight: 'Clinics already ship biopsies to Igenomix — adding Genomic Prediction is operationally straightforward.',
    recent_changes: 'Updated MMC Guideline (2025). No new ART-specific legislation. Long-discussed ART Act remains unlegislated.',
    sources: [
      { title: 'MMC Guideline on Medically Assisted Reproduction (PDF)', url: 'https://mmc.gov.my/wp-content/uploads/2025/09/Medically-Assisted-Reproduction.pdf' },
      { title: 'MOH Standards for ART Facility (PDF)', url: 'https://www.moh.gov.my/moh/resources/Penerbitan/Perkhidmatan%20OnG%20&%20Ped/O%20&%20G/2._Standards_For_Assisted_Reproductive_Tech_Lab_And_Operation_Theatre_.pdf' },
      { title: 'Medical (Amendment) Act 2024 (PDF)', url: 'https://mmc.gov.my/wp-content/uploads/2025/08/Medical-Amendment-Act-2024.pdf' },
      { title: 'Alpha IVF — PGT-M services', url: 'https://www.alphafertilitycentre.com/ivf-treatment-options/preimplantation-genetic-testings-pgt/pgt-m-preimplantation-genetic-testing-for-monogenic-diseases' },
      { title: 'Islamic viewpoints on sex selection — PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10994891/' },
      { title: 'Islamic perspectives on PGT-P — PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/38047997/' },
      { title: 'Pantai Hospital KL — IVF package', url: 'https://www.pantai.com.my/kuala-lumpur/packages-promotions/ivf-package' },
      { title: 'Monash IVF KPJ — IVF cost', url: 'https://monashivfkpj.com/ivf-cost-malaysia' },
      { title: 'KWSP — fertility treatment', url: 'https://www.kwsp.gov.my/en/member/healthcare/fertility' },
    ],
  },
  {
    country: 'Singapore',
    flag: '🇸🇬',
    priority: 3,
    regulator: 'Ministry of Health (MOH) via HCSA 2020',
    pgt_status: {
      pgt_m: { status: 'approved', label: 'Approved', notes: 'Mainstream since May 2021 — MOH-approved centres, specified conditions list' },
      pgt_a: { status: 'restricted', label: 'Pilot only', notes: 'Government pilot at public hospitals — 590 enrolled, results "inconclusive"' },
      pgt_sr: { status: 'approved', label: 'Approved', notes: 'Mainstream since May 2021 alongside PGT-M' },
      pgt_p: { status: 'not_approved', label: 'Not approved', notes: 'Active academic discussion (Chew et al. 2024) but no regulatory pathway' },
      sex_selection: { status: 'prohibited', label: 'Prohibited', notes: 'Clarified in Circular 95/2023 — only for sex-linked disorders' },
    },
    cross_border_shipping: {
      status: 'unclear',
      summary: 'HBRA 2015 governs tissue broadly. No specific embryo biopsy export regulation found. May be restricted by AR licensing conditions.',
      evidence: 'Open question: can a SG clinic ship biopsies for testing not approved domestically?',
    },
    ivf_cost_usd: { min: 8000, max: 15000 },
    clinic_count: byCountry['Singapore'] || 0,
    tier1_count: clinics.filter(c => c.country === 'Singapore' && c.tier === 1).length,
    key_insight: 'Most regulated market — Tier 1 clinics have PGT-M/SR approval and may ship biopsies under existing frameworks.',
    recent_changes: 'HCSA Phase 2 (Jun 2023). PGT-A pilot ongoing. Age cap removed. Circular 10/2025 updated PGT licensing.',
    sources: [
      { title: 'HCSA — Assisted Reproduction Regulations', url: 'https://www.hcsa.gov.sg/outpatient-services/assisted-reproduction-service/assisted-reproduction-regulations/' },
      { title: 'HCSA — AR Circulars', url: 'https://www.hcsa.gov.sg/outpatient-services/assisted-reproduction-service/assisted-reproduction-circulars/' },
      { title: 'MOH — Introduction of PGT-M/SR', url: 'https://www.moh.gov.sg/newsroom/introduction-of-pre-implantation-genetic-testing-for-monogenic-single-gene-defects-and-chromosomal-structural-rearrangements-as-clinical-services' },
      { title: 'MOH — Approved PGT-M/SR Providers', url: 'https://www.moh.gov.sg/others/resources-and-statistics/approved-providers-of-pre-implantation-genetic-testing-for-monogenic---single-gene-defects-and-chromosomal-structural-rearrangement-services/' },
      { title: 'MOH — Marriage & Parenthood Schemes', url: 'https://www.moh.gov.sg/managing-expenses/schemes-and-subsidies/marriage-and-parenthood-schemes/' },
      { title: 'MOH Circular 95/2023 (PDF)', url: 'https://isomer-user-content.by.gov.sg/7/99486b52-a17b-4ff3-b46d-524927f825e4/moh-cir-95-2023-clarification-on-hcs-ars-regs-and-artificial-insemination-procedures.pdf' },
      { title: 'MOH Circular 10/2025 — PGT licensing (PDF)', url: 'https://isomer-user-content.by.gov.sg/7/01616d0d-a859-4ebf-8ab6-7f92c2f82fd1/MOH%20Cir%2010_2025%20Written%20Direction%20for%20PGT%20LCs%20for%20CLS%20and%20ARS%20Licensees.pdf' },
      { title: 'Status of Children (ART) Act 2013', url: 'https://sso.agc.gov.sg/Act/SCARTA2013' },
      { title: 'Human Biomedical Research Act 2015', url: 'https://sso.agc.gov.sg/Act/HBRA2015' },
      { title: 'Chew et al. 2024 — PGT-P regulatory safeguards', url: 'https://pubmed.ncbi.nlm.nih.gov/38744454/' },
      { title: 'Thomson Medical — PGD/PGT-M', url: 'https://www.thomsonmedical.com/blog/preimplantation-genetic-diagnosis' },
    ],
  },
  {
    country: 'Thailand',
    flag: '🇹🇭',
    priority: 4,
    regulator: 'Medical Council of Thailand',
    pgt_status: {
      pgt_m: { status: 'approved', label: 'Approved', notes: 'Available at private clinics' },
      pgt_a: { status: 'approved', label: 'Approved', notes: 'Widely offered — major fertility tourism hub' },
      pgt_sr: { status: 'approved', label: 'Approved', notes: 'Available alongside PGT-A' },
      pgt_p: { status: 'not_approved', label: 'Not approved', notes: 'Not available' },
      sex_selection: { status: 'approved', label: 'Permitted', notes: 'Permitted for international patients' },
    },
    cross_border_shipping: {
      status: 'yes',
      summary: 'Clinics widely ship to reference labs for PGT-A. Strong existing infrastructure.',
      evidence: 'Multiple clinics (Jetanin, Superior A.R.T., SAFE) have established overseas lab relationships.',
    },
    ivf_cost_usd: { min: 5000, max: 10000 },
    clinic_count: byCountry['Thailand'] || 0,
    tier1_count: clinics.filter(c => c.country === 'Thailand' && c.tier === 1).length,
    key_insight: 'Major fertility tourism hub with established biopsy shipping — natural PGT-P expansion market.',
    recent_changes: null,
    sources: [],
  },
  {
    country: 'Indonesia',
    flag: '🇮🇩',
    priority: 5,
    regulator: 'Ministry of Health Indonesia',
    pgt_status: {
      pgt_m: { status: 'restricted', label: 'Limited', notes: 'Morula IVF offers some genetic testing' },
      pgt_a: { status: 'restricted', label: 'Limited', notes: 'Available at select facilities' },
      pgt_sr: { status: 'unknown', label: 'Unknown', notes: 'No data' },
      pgt_p: { status: 'not_approved', label: 'Not approved', notes: 'Not available' },
      sex_selection: { status: 'prohibited', label: 'Prohibited', notes: '' },
    },
    cross_border_shipping: {
      status: 'unknown',
      summary: 'No data on cross-border biopsy shipping practices.',
      evidence: null,
    },
    ivf_cost_usd: { min: 3000, max: 7000 },
    clinic_count: byCountry['Indonesia'] || 0,
    tier1_count: clinics.filter(c => c.country === 'Indonesia' && c.tier === 1).length,
    key_insight: 'Growing IVF sector — Morula IVF dominant. Less mature than regional peers.',
    recent_changes: null,
    sources: [],
  },
  {
    country: 'Brunei',
    flag: '🇧🇳',
    priority: 6,
    regulator: 'Ministry of Health Brunei',
    pgt_status: {
      pgt_m: { status: 'not_approved', label: 'Not available', notes: 'No PGT domestically' },
      pgt_a: { status: 'not_approved', label: 'Not available', notes: '' },
      pgt_sr: { status: 'not_approved', label: 'Not available', notes: '' },
      pgt_p: { status: 'not_approved', label: 'Not available', notes: '' },
      sex_selection: { status: 'unknown', label: 'Unknown', notes: '' },
    },
    cross_border_shipping: {
      status: 'unknown',
      summary: 'Only RIPAS Hospital offers limited IVF.',
      evidence: null,
    },
    ivf_cost_usd: null,
    clinic_count: byCountry['Brunei'] || 0,
    tier1_count: 0,
    key_insight: 'Single hospital with limited IVF — patients typically travel to Malaysia or Singapore.',
    recent_changes: null,
    sources: [],
  },
];

fs.writeFileSync(
  path.join(API_DIR, 'regulatory.json'),
  JSON.stringify(regulatory, null, 2)
);
console.log(`✓ api/regulatory.json — ${regulatory.length} countries`);

// --- Build report.json ---
const report = {
  title: 'SEA Fertility Genomics Research Report',
  subtitle: 'PGT-P Partnership Opportunities in Southeast Asia',
  author: 'Kuan Yu',
  location: 'Singapore',
  date: new Date().toISOString().split('T')[0],
  summary: 'Mapping IVF clinics across Southeast Asia for PGT-P partnership with Genomic Prediction / LifeView.',
  clinics: clinics,
  stats: stats,
  regulatory: regulatory,
  methodology: {
    geographic_scope: '~1,000km radius from Singapore + major IVF hubs (Hanoi, Bangkok)',
    countries: ['Vietnam', 'Malaysia', 'Singapore', 'Thailand', 'Indonesia', 'Brunei'],
    priority_countries: ['Vietnam', 'Malaysia', 'Singapore'],
    source_types: [
      'Government AR registries',
      'Google Maps (local language)',
      'Professional society directories (ASPIRE, ESHRE)',
      'Medical tourism aggregators',
      'Hospital group websites',
      'Reference lab partner lists (Igenomix, CooperGenomics, Natera)',
      'Local-language web search',
    ],
    tiering: {
      '1': 'Already does PGT-A/PGT-M, ships biopsies — ready for PGT-P partnership',
      '2': 'Full IVF with embryology lab but no PGT — needs onboarding',
      '3': 'Basic fertility (IUI-level) — long-term prospect',
    },
    data_completeness_note: 'Singapore and Vietnam (Hanoi) have comprehensive data. Malaysia, Thailand, Indonesia, and Vietnam (HCMC) are in discovery phase.',
  },
};

fs.writeFileSync(
  path.join(API_DIR, 'report.json'),
  JSON.stringify(report, null, 2)
);
console.log(`✓ api/report.json`);

console.log('\nDone. All API files written to /api/');
