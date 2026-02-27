# fertility-genomics-research

Open research into **preimplantation genetic testing for polygenic conditions (PGT-P)** availability in Southeast Asia — specifically, which IVF clinics can coordinate with overseas genomics labs like [Genomic Prediction / LifeView](https://www.lifeview.com) to offer polygenic embryo health screening.

## What is this?

PGT-P is an emerging genetic screening technology that uses polygenic risk scores to estimate an embryo's lifetime risk for common diseases (heart disease, diabetes, certain cancers, etc.) from the same biopsy already taken for standard PGT-A. It's commercially available in the US but essentially unavailable in Southeast Asia.

This repo documents a patient-led research effort to:

1. **Map every IVF clinic** within practical reach of Singapore
2. **Identify which clinics** already ship embryo biopsies to overseas reference labs (Tier 1 targets)
3. **Conduct outreach** to assess willingness to coordinate with Genomic Prediction for PGT-P
4. **Track findings** transparently for other prospective patients

## Repo structure

```
├── README.md
├── docs/
│   ├── outreach-spec.md          # Full project spec and email templates
│   ├── pgt-p-primer.md           # Background on polygenic embryo screening
│   └── regulatory-notes.md       # Country-by-country regulatory landscape
├── data/
│   ├── clinics.csv               # Master clinic directory (WIP)
│   └── outreach-tracker.csv      # Response tracking (WIP)
├── prompts/
│   └── research-log.md           # Claude prompts & AI-assisted research process
└── LICENSE
```

## Current status

- [x] Initial research — PGT-P landscape, providers, costs
- [x] Outreach spec & email template
- [x] Clinic discovery — starting list (~60+ clinics across 6 countries)
- [ ] Email collection for all clinics
- [ ] Outreach campaign
- [ ] Response tracking
- [ ] Summary report

## Geographic scope

| Country | Cities |
|---|---|
| Singapore | Singapore |
| Malaysia | Kuala Lumpur, Penang, Johor Bahru, Melaka, Kota Kinabalu, Kuching |
| Indonesia | Jakarta, Surabaya, Medan, Bandung, Batam, and others |
| Thailand | Bangkok, Hat Yai |
| Vietnam | Hanoi, Ho Chi Minh City |
| Brunei | Bandar Seri Begawan |

## Key providers (PGT-P)

| Company | Location | Model |
|---|---|---|
| [Genomic Prediction / LifeView](https://www.lifeview.com) | New Jersey, USA | Embryo Health Score — works with 200+ clinics globally |
| [Orchid Health](https://www.orchidhealth.com) | San Francisco, USA | Whole genome sequencing, 1,200+ conditions |
| MyOme | USA | Earlier stage |

## Disclaimer

This is **patient-led research**, not medical advice. All information is compiled from public sources and direct inquiry. Consult qualified medical professionals and genetic counselors before making any reproductive decisions.

Polygenic risk scores have known limitations — particularly reduced accuracy for non-European ancestries. This is discussed in the docs.

## License

MIT
