# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Patient-led research project mapping IVF clinics in Southeast Asia that could coordinate with **Genomic Prediction / LifeView** (New Jersey, USA) to offer **PGT-P** (preimplantation genetic testing for polygenic conditions). This is a documentation and outreach repo — no application code, no build system, no tests.

## Project phases

1. **Clinic discovery** — find every IVF clinic within ~1,000km of Singapore (done, ~56 clinics)
2. **Email collection** — scrape/find contact emails for each clinic (in progress)
3. **Outreach** — send standardized inquiry emails (not started)
4. **Response tracking** — log responses in `data/outreach-tracker.csv` (not started)
5. **Summary report** — compile findings (not started)

## Key files

| File | Role |
|------|------|
| `data/clinics.csv` | Master clinic directory — all edits to clinic data go here |
| `data/outreach-tracker.csv` | Response tracking — one row per outreach attempt |
| `docs/outreach-spec.md` | Full project spec: scope, tiering, email template, clinic lists |
| `docs/regulatory-notes.md` | Country-by-country PGT regulation status |
| `docs/pgt-p-primer.md` | Background on polygenic embryo screening technology |
| `prompts/research-log.md` | Log of Claude prompts used and methodology notes |

## CSV schemas

**clinics.csv columns:** `clinic_name, country, city, website, email, phone, services, tier, ships_overseas, notes`

- `tier`: 1 = already does PGT-A/PGT-M (ships biopsies), 2 = full IVF but no PGT, 3 = basic fertility
- `ships_overseas`: whether clinic ships biopsy samples to overseas reference labs
- `services`: PGT-A / PGT-M / PGT-SR availability

**outreach-tracker.csv columns:** `clinic_name, country, city, email_sent_date, email_address, follow_up_date, status, response_date, response_summary, interested, ships_overseas_confirmed, notes`

## Priority countries (standing instruction)

**Vietnam, Malaysia, and Singapore are the top-priority countries for all research, outreach, and regulatory work.** Prioritize in that order. Other countries (Thailand, Indonesia, Brunei) are secondary — maintain existing info but don't invest deep research unless specifically asked.

## Geographic scope

Singapore, Malaysia (full), Indonesia (Sumatra/Java/Kalimantan), Thailand (Bangkok + south), Vietnam (Hanoi + HCMC), Brunei. Hanoi and Bangkok exceed strict 1,000km but included as major IVF hubs.

## Domain context

- **PGT-P** uses polygenic risk scores from the same trophectoderm biopsy taken for standard PGT-A — no additional embryo procedures
- PGT-P is **not approved** in any SE Asian country; the strategy is local IVF + ship biopsy to US lab
- **Tier 1 clinics** (already ship biopsies overseas for PGT-A) are highest priority — easiest to onboard
- Key ancestry limitation: polygenic risk scores have reduced accuracy for non-European ancestries
- Main PGT-P providers: Genomic Prediction/LifeView (200+ global partners), Orchid Health (whole genome), MyOme (early stage)

## Future features

- **Per-clinic cost & timeline breakdown**: When a user selects a specific clinic (from map or table), show estimated cost and timeline for each IVF + PGT-P step based on that clinic's country, tier, and known pricing. Requires collecting per-clinic or per-country cost data into `clinics.csv` or a separate `costs.json`.

## Conventions

- All research sessions are logged in `prompts/research-log.md` with the prompts used
- Clinic data lives in CSV, not in the markdown docs (docs have reference lists but CSV is source of truth)
- The email template in `docs/outreach-spec.md` is the canonical outreach email
- Files matching `*.personal.md` or `*.private.csv` are gitignored (may contain real contact info)
