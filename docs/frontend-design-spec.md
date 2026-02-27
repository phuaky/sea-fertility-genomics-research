# Frontend Design Spec — SEA Fertility Genomics Research Report

> A public-facing, single-page research report designed for Steve Hsu and the Genomic Prediction team.
> One URL. No login. Instant credibility. API-accessible.

**Last updated:** 2026-02-27

---

## 1. Audience & Goals

### Primary audience
**Steve Hsu** (co-founder, Genomic Prediction) and his team. They are evaluating Southeast Asia as an expansion market for LifeView PGT-P services. They need to see:

1. **Market scope** — how many clinics, where, what capability level
2. **Readiness** — which clinics already ship biopsies overseas (Tier 1 = lowest friction to onboard)
3. **Regulatory landscape** — what's legal, what's grey, what's blocked per country
4. **Outreach pipeline** — who's been contacted, who's interested (future phase)

### Secondary audience
- Genomic Prediction business development team (need API access to pull data into their CRM)
- Prospective partner clinics (may be sent the link as context)

### Design goals
- **Credibility first** — this should look like serious biotech market research, not a side project
- **Self-serve** — Steve should understand everything without kuan walking him through it
- **API-native** — every piece of data on the page is also available via a JSON endpoint
- **Lightweight** — vanilla HTML/CSS/JS, no frameworks, loads instantly

---

## 2. Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Markup** | Single `index.html` | One file, zero routing |
| **Styles** | Single `styles.css` | No preprocessor, no utility framework |
| **Scripts** | Vanilla JS (`app.js`) | No React, no build step |
| **Map** | Leaflet.js (CDN) | Best open-source map library, 42KB |
| **Data tables** | Vanilla JS or Simple-DataTables (CDN) | Sort/filter without jQuery |
| **Charts** | Chart.js (CDN, optional) | Only if we need bar/pie charts |
| **Icons** | Lucide Icons (CDN) or inline SVG | Clean, medical-appropriate |
| **Hosting** | GitHub Pages / Cloudflare Pages | Free, auto-deploy on push |
| **API** | Static `.json` files in `/api/` folder | No server, no database |

### File structure
```
/
├── index.html
├── styles.css
├── app.js
├── api/
│   ├── clinics.json
│   ├── clinics-stats.json
│   ├── regulatory.json
│   ├── outreach.json          (future)
│   └── report.json            (combined endpoint)
├── data/
│   ├── clinics.csv            (source of truth)
│   └── outreach-tracker.csv   (source of truth)
├── scripts/
│   └── build-json.sh          (CSV → JSON converter)
└── docs/
    └── (this file, other docs)
```

---

## 3. Visual Design System

### Design philosophy
**Clinical precision meets modern data visualization.** Think: Stripe Atlas documentation, Our World in Data, or a well-funded biotech's investor portal. NOT a startup landing page. NOT a dashboard template.

### Color palette

| Role | Hex | Usage |
|------|-----|-------|
| **Primary** | `#1E3A5F` | Headers, nav, map controls — deep navy conveys authority |
| **Primary light** | `#2E5A8E` | Hover states, secondary buttons |
| **Accent** | `#0EA5E9` | Links, interactive elements, Tier 1 highlights — sky blue |
| **Success** | `#10B981` | Approved status, Tier 1 markers |
| **Warning** | `#F59E0B` | Restricted/limited status, Tier 2 markers |
| **Danger** | `#EF4444` | Not approved, prohibited |
| **Neutral 50** | `#F8FAFC` | Page background |
| **Neutral 100** | `#F1F5F9` | Card backgrounds, alternating rows |
| **Neutral 200** | `#E2E8F0` | Borders, dividers |
| **Neutral 600** | `#475569` | Body text |
| **Neutral 900** | `#0F172A` | Headings |

### Typography

| Role | Font | Size | Weight |
|------|------|------|--------|
| **Headings** | Inter (Google Fonts) | H1: 2.5rem, H2: 1.875rem, H3: 1.25rem | 700 |
| **Body** | Inter | 1rem (16px) | 400 |
| **Data/numbers** | JetBrains Mono (Google Fonts) | 0.875rem | 400 |
| **Small/labels** | Inter | 0.75rem | 500, uppercase, letter-spacing 0.05em |

### Spacing
- Base unit: `0.5rem` (8px)
- Section padding: `4rem 0` (64px vertical)
- Card padding: `1.5rem` (24px)
- Max content width: `1200px`, centered
- Card border-radius: `0.75rem` (12px)
- Card shadow: `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)`

### Status badges
Reusable pill-shaped badges for PGT status across the site:

| Status | Background | Text | Label |
|--------|-----------|------|-------|
| Approved | `#D1FAE5` | `#065F46` | `Approved` |
| Restricted / Pilot | `#FEF3C7` | `#92400E` | `Restricted` |
| Not approved | `#FEE2E2` | `#991B1B` | `Not approved` |
| Unknown | `#E2E8F0` | `#475569` | `Unknown` |

### Tier badges
Used on clinic cards and table rows:

| Tier | Color | Label | Meaning |
|------|-------|-------|---------|
| 1 | `#10B981` bg, white text | `Tier 1` | Ships biopsies, does PGT — ready now |
| 2 | `#F59E0B` bg, white text | `Tier 2` | Full IVF, no PGT — needs onboarding |
| 3 | `#94A3B8` bg, white text | `Tier 3` | Basic fertility — long-term |
| — | `#E2E8F0` bg, `#475569` text | `Untiered` | Data incomplete |

---

## 4. Page Sections (top to bottom)

### 4.1 Navigation bar (sticky)

- **Left:** Logo/title: "SEA Fertility Genomics Research"
- **Right:** Anchor links: Map · Clinics · Regulatory · API
- Behavior: sticky on scroll, subtle shadow appears on scroll
- Mobile: collapses to hamburger menu
- Background: `#1E3A5F`, text white

### 4.2 Hero section

- **Headline:** "PGT-P Partnership Opportunities in Southeast Asia"
- **Subheadline:** "Mapping IVF clinics across 6 countries for Genomic Prediction's LifeView expansion into the region."
- **Key metrics row** (4 cards, horizontal):

| Metric | Value | Source |
|--------|-------|--------|
| Clinics mapped | 79 | `clinics.csv` row count |
| Countries | 6 | Distinct countries in CSV |
| Tier 1 (ready now) | 16 | Count where tier=1 |
| Priority countries | 3 | Vietnam, Malaysia, Singapore |

- Background: white
- Metrics cards: `#F1F5F9` background, number in `#1E3A5F` bold 2rem, label in small caps

### 4.3 Interactive map

- **Library:** Leaflet.js with OpenStreetMap tiles (or CartoDB Positron for cleaner look)
- **Center:** Singapore (1.3521, 103.8198), zoom level 5 (shows all of SEA)
- **Markers:** Circle markers colored by tier (see Tier badges above)
- **Marker size:** Tier 1 = 10px, Tier 2 = 7px, Tier 3 = 5px, Untiered = 5px
- **Popup on click:** Clinic name, city, country, tier badge, services (if available), website link
- **Legend:** Bottom-right corner showing tier color key
- **Country boundaries:** Subtle highlight for the 6 countries in scope
- **Height:** 500px desktop, 350px mobile
- **Cluster:** Use Leaflet.markercluster when zoomed out (Singapore has 30 clinics in one city)

**Geocoding note:** Clinics don't have lat/lng in the CSV. For MVP, use city-level coordinates with slight random jitter to prevent overlap:

| City | Lat | Lng |
|------|-----|-----|
| Singapore | 1.3521 | 103.8198 |
| Kuala Lumpur | 3.1390 | 101.6869 |
| Penang | 5.4164 | 100.3327 |
| Jakarta | -6.2088 | 106.8456 |
| Bangkok | 13.7563 | 100.5018 |
| Hanoi | 21.0285 | 105.8542 |
| Ho Chi Minh City | 10.8231 | 106.6297 |
| Bandar Seri Begawan | 4.9031 | 114.9398 |

### 4.4 Clinic directory table

- **Default sort:** Country (priority order: Vietnam, Malaysia, Singapore, Thailand, Indonesia, Brunei), then tier ascending
- **Columns:** Clinic name, Country, City, Tier (badge), Services, Ships overseas, Website (link icon)
- **Filters** (above table):
  - Country: multi-select checkboxes (show count per country)
  - Tier: toggle buttons (1 / 2 / 3 / All)
  - Search: text input for clinic name
- **Row behavior:** Click row to expand details panel showing: email, phone, notes, full services
- **Empty data:** Show "—" in grey for missing fields, not blank
- **Row count:** Show "Showing X of 79 clinics" below filters
- **Alternating rows:** White / `#F8FAFC`
- **Sticky header:** Table header sticks while scrolling table

### 4.5 Country regulatory cards

One card per priority country (Vietnam, Malaysia, Singapore), with secondary countries (Thailand, Indonesia, Brunei) collapsed below.

**Card layout:**
```
┌──────────────────────────────────────────────┐
│  🇻🇳 Vietnam                                │
│  Regulator: Ministry of Health (Bo Y Te)     │
│                                               │
│  PGT-M  [Approved]   PGT-A  [Approved]      │
│  PGT-P  [Not approved]  Sex sel. [Prohibited]│
│                                               │
│  Cross-border shipping: Grey area — Decree    │
│  89/2018 requires declaration, no specific    │
│  embryo biopsy regulation found.             │
│                                               │
│  IVF cost: $2,400–$6,000/cycle               │
│  Clinics: 23 (8 Tier 1)                      │
│                                               │
│  Key insight: Most advanced Hanoi clinics     │
│  offer PGT-A — adding PGT-P is one supplier  │
│  change, not a capability build.              │
│                                               │
│  [View full regulatory notes →]               │
└──────────────────────────────────────────────┘
```

- Priority cards: full-width, expanded by default
- Secondary cards: collapsed, click to expand
- Flag emoji in heading for visual scan
- Status badges inline for each PGT type
- "Key insight" line at bottom — one sentence on why this country matters for GP partnership

### 4.6 Outreach pipeline

- **Data source:** `outreach-tracker.csv` → `api/outreach.json`
- **Default view:** Table with all 74 clinics, sorted by tier then country

**Pipeline status flow:**
```
not_contacted → email_sent → follow_up_sent → responded → [interested | not_interested | no_reply]
```

**Columns:** Clinic name, Country, City, Tier (badge), Status (badge), Sent date, Response sentiment, Allows shipping, Allows PGT-P

**Status badges:**

| Status | Background | Text | Label |
|--------|-----------|------|-------|
| Not contacted | `#E2E8F0` | `#475569` | `Not contacted` |
| Email sent | `#DBEAFE` | `#1E40AF` | `Email sent` |
| Follow-up sent | `#E0E7FF` | `#3730A3` | `Follow-up` |
| Responded | `#D1FAE5` | `#065F46` | `Responded` |
| Interested | `#10B981` bg | white | `Interested` |
| Not interested | `#FEE2E2` | `#991B1B` | `Declined` |
| No reply | `#FEF3C7` | `#92400E` | `No reply` |

**Response detail badges:**

| Field | Values | Display |
|-------|--------|---------|
| `allows_overseas_shipping` | yes / no / conditional / unknown | Green checkmark / Red X / Yellow ! / Grey ? |
| `allows_pgt_p` | yes / no / conditional / unknown | Same as above |

**Filters (above table):**
- **Status:** Multi-select toggle buttons (Not contacted / Sent / Responded / Interested)
- **Country:** Checkboxes
- **Tier:** Toggle (1 / 2 / 3 / All)
- **Shipping:** Can ship overseas (Yes / No / Unknown)

**Metrics row (above filters):**
```
┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│ 74         │ │ 0          │ │ 0          │ │ 0          │ │ 0          │
│ Total      │ │ Sent       │ │ Responded  │ │ Interested │ │ Can Ship   │
└────────────┘ └────────────┘ └────────────┘ └────────────┘ └────────────┘
```

**Row expansion:** Click any row to see:
- Full email content that was sent (from draft files)
- Response content (when available)
- Timeline: sent → follow-up → response dates
- Notes field for manual annotations

**Email preview:** Each clinic row has a "View draft" link that shows the personalized email in a modal/side panel

### 4.7 API documentation section

- **Headline:** "API Access"
- **Subheadline:** "All research data is available as JSON. No authentication required."
- **Endpoint cards:**

```
GET /api/clinics.json
Returns all 79 clinics with full metadata.
Filter client-side by country, tier, services.

GET /api/clinics-stats.json
Aggregated counts: clinics by country, by tier,
by services, data completeness metrics.

GET /api/regulatory.json
Per-country regulatory status: PGT approvals,
cross-border shipping rules, costs, key insights.

GET /api/report.json
Complete research report as structured JSON.
Combines clinics, regulatory, and methodology.
```

- Each card has: method badge (green GET pill), endpoint path in monospace, description, and a "Copy URL" button
- Include a live code example:
```js
// Fetch all Tier 1 clinics
const res = await fetch('https://yoursite.com/api/clinics.json');
const clinics = await res.json();
const tier1 = clinics.filter(c => c.tier === 1);
console.log(`${tier1.length} clinics ready for PGT-P partnership`);
```

### 4.8 Methodology section

Brief section establishing research credibility:
- Sources consulted (government registries, professional directories, medical tourism platforms, reference lab partner lists, local-language search)
- Discovery methodology (7 independent source types per city)
- Tiering criteria explanation
- Data completeness transparency (Singapore/Vietnam Hanoi: comprehensive; Malaysia/Thailand/Indonesia: discovery phase)
- Link to full outreach spec

### 4.9 Footer

- "Research compiled by Kuan Yu, Singapore — [date]"
- "Data sources: MOH registries, ASPIRE, medical tourism platforms, clinic websites"
- "For Genomic Prediction / LifeView partnership evaluation"
- Link to GitHub repo (if public)
- Link to API docs anchor

---

## 5. API Schema

### `/api/clinics.json`

```json
[
  {
    "clinic_name": "Monash IVF Singapore",
    "country": "Singapore",
    "city": "Singapore",
    "website": "monashivf.com.sg",
    "email": "info.sg@monashivf.com",
    "phone": "+65 6723 7889",
    "services": "IVF/ICSI/IUI/PGT-M/PGT-SR/PGT-A",
    "tier": 1,
    "ships_overseas": "Yes",
    "notes": "Private. MOH-approved PGT-M/SR. Australian parent (Monash IVF Group).",
    "lat": 1.3521,
    "lng": 103.8198
  }
]
```

Fields match `clinics.csv` columns exactly, plus computed `lat`/`lng` from city geocoding.

### `/api/clinics-stats.json`

```json
{
  "total_clinics": 79,
  "by_country": {
    "Singapore": 30,
    "Vietnam": 23,
    "Malaysia": 9,
    "Thailand": 8,
    "Indonesia": 7,
    "Brunei": 1
  },
  "by_tier": {
    "1": 16,
    "2": 27,
    "3": 3,
    "untiered": 33
  },
  "data_completeness": {
    "has_email": 45,
    "has_phone": 42,
    "has_services": 40,
    "has_tier": 46
  },
  "last_updated": "2026-02-27"
}
```

### `/api/regulatory.json`

```json
[
  {
    "country": "Vietnam",
    "priority": 1,
    "regulator": "Ministry of Health (Bo Y Te)",
    "pgt_status": {
      "pgt_m": { "status": "approved", "notes": "Available at major centres" },
      "pgt_a": { "status": "approved", "notes": "Routinely offered" },
      "pgt_sr": { "status": "restricted", "notes": "Likely at advanced centres" },
      "pgt_p": { "status": "not_approved", "notes": "No evidence of offering" },
      "sex_selection": { "status": "prohibited", "notes": "Fines up to VND 30M" }
    },
    "cross_border_shipping": {
      "status": "unclear",
      "summary": "Decree 89/2018 requires medical declaration. No specific embryo biopsy regulation.",
      "evidence": "No clinic found publicly advertising overseas biopsy shipping"
    },
    "ivf_cost_usd": { "min": 2400, "max": 6000 },
    "clinic_count": 23,
    "tier1_count": 8,
    "key_insight": "Hanoi clinics with PGT-A need only one supplier change to offer PGT-P pathway.",
    "sources": ["Decree 207/2025/ND-CP", "Decree 89/2018/ND-CP", "ClinRegs NIH"]
  }
]
```

### `/api/report.json`

Combined endpoint:
```json
{
  "title": "SEA Fertility Genomics Research Report",
  "author": "Kuan Yu",
  "date": "2026-02-27",
  "summary": "Mapping IVF clinics across Southeast Asia for PGT-P partnership with Genomic Prediction.",
  "clinics": { /* full clinics.json content */ },
  "stats": { /* full clinics-stats.json content */ },
  "regulatory": { /* full regulatory.json content */ },
  "methodology": {
    "geographic_scope": "1,000km radius from Singapore + major IVF hubs",
    "source_types": 7,
    "priority_countries": ["Vietnam", "Malaysia", "Singapore"],
    "tiering": {
      "1": "Already does PGT-A/PGT-M, ships biopsies — ready for PGT-P",
      "2": "Full IVF but no PGT — needs onboarding",
      "3": "Basic fertility — long-term prospect"
    }
  }
}
```

---

## 6. Responsive Behavior

| Breakpoint | Layout changes |
|-----------|----------------|
| `≥1024px` (desktop) | Full layout. Map 500px tall. Table with all columns. Cards 3-column grid. |
| `768–1023px` (tablet) | Map 400px tall. Table hides phone/notes columns. Cards 2-column. |
| `<768px` (mobile) | Map 300px tall. Table becomes card list (one clinic per card). Regulatory cards stack. Nav collapses. |

### Mobile-specific
- Filters collapse into a "Filter" button that opens a slide-up panel
- Table rows become stacked cards with key info visible, tap to expand
- API code examples use horizontal scroll
- Hero metrics: 2×2 grid instead of 4 across

---

## 7. Interactions

| Element | Interaction | Effect |
|---------|------------|--------|
| Map marker | Click | Opens popup with clinic summary |
| Map marker | Hover | Slight scale-up, tooltip with name |
| Table row | Click | Expands to show full details (email, phone, notes) |
| Filter checkbox | Toggle | Table updates instantly (client-side filtering) |
| Tier toggle | Click | Map markers filter simultaneously with table |
| Regulatory card | Click "View full notes" | Expands to show complete regulatory text |
| API "Copy URL" | Click | Copies endpoint URL to clipboard, shows checkmark |
| Nav link | Click | Smooth scroll to section |
| Country on map | Click | Zooms to country, filters table to that country |

### Linked interactions (map ↔ table)
- Clicking a country on the map filters the table below
- Selecting a tier filter updates both map markers and table rows
- Clicking a table row highlights the corresponding map marker

---

## 8. Data Pipeline (CSV → JSON)

### Build script (`scripts/build-json.sh`)

Converts source CSVs and markdown into static JSON files. Run manually or via git hook.

```
Input:  data/clinics.csv → api/clinics.json, api/clinics-stats.json
Input:  docs/regulatory-notes.md → api/regulatory.json (manual or parsed)
Input:  data/outreach-tracker.csv → api/outreach.json
Merge:  all above → api/report.json
```

**Update workflow:**
1. Edit `data/clinics.csv` (source of truth)
2. Run `bash scripts/build-json.sh`
3. `git push` → site auto-deploys with new data

### Geocoding approach
- City-level coordinates hardcoded in build script (8 cities — see map section)
- Each clinic gets its city's coordinates + small random offset (±0.005°) to prevent pin stacking
- If exact addresses are added later, use a geocoding API

---

## 9. Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Total page weight | < 500KB (excluding map tiles) |
| JS bundle | < 50KB (vanilla JS, no framework) |
| CSS | < 15KB |
| Time to Interactive | < 2s |
| Lighthouse score | > 90 (all categories) |

---

## 10. Implementation Priority

### Phase 1 (MVP — what Steve sees first)
1. Hero section with key metrics
2. Interactive map with clinic pins by tier
3. Clinic directory table with filters
4. Country regulatory cards (Vietnam, Malaysia, Singapore)
5. Static JSON API endpoints
6. Footer with attribution

### Phase 2 (after Steve's first review)
7. API documentation section with code examples
8. Methodology/credibility section
9. Map ↔ table linked interactions
10. Mobile optimization

### Phase 3 (operational tool)
11. Outreach pipeline tracker
12. Data completeness indicators per clinic
13. Export to CSV/PDF functionality
14. Search by service type

---

## 11. Content That Must NOT Appear

- No pricing for Genomic Prediction services (that's their business)
- No patient medical information
- No private email addresses marked `*.personal.md` or `*.private.csv`
- No language suggesting regulatory approval where none exists
- No claims that PGT-P is "approved" in any SEA country — always "available via overseas lab partnership"
- No disparaging comparison of clinics

---

## 12. Open Questions

- [ ] Custom domain or subdomain? (e.g., `sea-fertility.kuanyu.dev` vs GitHub Pages URL)
- [ ] Should the repo be public? (Steve's team can see the code)
- [ ] Add clinic logos? (copyright considerations)
- [ ] Include IVF cost comparison chart across countries?
- [ ] Vietnamese/Malay language toggle for clinic names?
