# IVF Clinic Outreach Spec — Genomic Prediction PGT-P Biopsy Partnership

## Objective

Identify every IVF clinic within a 1,000 km radius of Singapore, collect contact emails, and send a standardized inquiry asking whether they support (or would be willing to support) shipping embryo biopsy samples to **Genomic Prediction's** lab in New Jersey, USA for **PGT-P (polygenic embryo screening)** analysis via their **LifeView** platform.

---

## Geographic Scope (1,000 km radius from Singapore)

| Country | Coverage | Key Cities |
|---|---|---|
| **Singapore** | Full | Singapore |
| **Malaysia** | Full (Peninsular + East Malaysia) | Kuala Lumpur, Penang, Johor Bahru, Melaka, Kota Kinabalu, Kuching |
| **Indonesia** | Sumatra, Java, Kalimantan (Borneo) | Jakarta, Surabaya, Medan, Bandung, Batam, Semarang, Yogyakarta, Palembang, Pontianak, Balikpapan |
| **Brunei** | Full | Bandar Seri Begawan |
| **Thailand** | Southern Thailand only (~border) | Hat Yai (borderline) |
| **Philippines** | Western edges (borderline) | — |
| **Vietnam** | Northern + Southern hubs | Hanoi, Ho Chi Minh City |

> **Note:** Hanoi (~2,600 km) and Ho Chi Minh City (~1,050 km) exceed the strict 1,000 km radius but are included as major IVF hubs within practical travel distance. Bangkok is also included as a stretch target for the same reason.

---

## Phase 1: Clinic Discovery

### Data to collect per clinic

| Field | Description |
|---|---|
| `clinic_name` | Full registered name |
| `country` | Country |
| `city` | City |
| `website` | Clinic website URL |
| `email` | General inquiry or IVF-specific email |
| `phone` | Phone number (backup contact) |
| `services` | PGT-A / PGT-M / PGT-SR availability (indicates genetic testing capability) |
| `notes` | Any relevant info (e.g., already ships biopsies overseas, has in-house genetics lab) |

### Discovery methods

1. **Web search** — Search for IVF clinics by city/country
2. **Ministry of Health registries** — Singapore MOH, Malaysia MOH, Indonesia MOH list licensed AR centres
3. **Professional directories** — ESHRE, ASPIRE (Asia Pacific Initiative on Reproduction), ISAR member lists
4. **Medical tourism platforms** — MedicalTourism.com, Placidway, MediTravel
5. **Google Maps** — Search "IVF clinic" / "fertility clinic" per city

### Priority tiers

- **Tier 1 (highest priority):** Clinics already offering PGT-A/PGT-M (they already do embryo biopsy + ship to reference labs — easiest lift)
- **Tier 2:** Full-service IVF clinics with embryology labs but no advertised PGT
- **Tier 3:** Smaller IVF clinics or those focused only on IUI/basic fertility

### Verifying completeness

The hardest part of clinic discovery isn't finding clinics — it's knowing when you've found **all of them**. A single Google search will miss clinics that don't advertise in English, don't have websites, or operate inside larger hospital systems. Use these cross-referencing methods to verify completeness per city.

#### Independent source types (minimum 5 per city)

| # | Source | What it catches | How to access |
|---|--------|----------------|---------------|
| 1 | **Government AR registry** | Licensed clinics that may not advertise online | SG: MOH Assisted Reproduction list. MY: MOH licensed fertility centres. TH: Medical Council registry. VN: MOH list of licensed ART centres. ID: MOH licensed facilities. |
| 2 | **Google Maps search** | Small clinics with storefronts but no web presence | Search "IVF clinic" / "fertility clinic" / "klinik bayi tabung" (ID) / "phòng khám IVF" (VN) per city in local language |
| 3 | **Professional society directories** | Academic and hospital-affiliated clinics | ASPIRE (Asia Pacific Initiative on Reproduction) member list, ESHRE affiliated centres, national OB-GYN society member directories |
| 4 | **Medical tourism aggregators** | Clinics marketing to international patients | MedicalTourism.com, Placidway, Medical Departures, FertilityIQ clinic directory |
| 5 | **Hospital group websites** | IVF units inside multi-specialty hospital chains | Check every major hospital group per country: IHH Healthcare, Raffles, Parkway, KPJ, Siloam, Vinmec, Bangkok Dusit, Bumrungrad |
| 6 | **Reference lab partner lists** | Clinics already shipping biopsies overseas (Tier 1 targets) | Check Igenomix, CooperGenomics, Natera, Invitae partner/clinic locator pages |
| 7 | **Local-language web search** | Clinics that only advertise domestically | Search in Bahasa Malaysia, Bahasa Indonesia, Thai, Vietnamese using local IVF terminology |

#### Per-city verification procedure

For each city in scope:

1. **Tally sources checked** — record which of the 7 source types you've consulted (track in a `sources_checked` note per city)
2. **Cross-reference** — every clinic found should appear in at least 2 independent sources. A clinic found in only 1 source is valid but flag it for manual verification
3. **Diminishing returns test** — if the last 2 sources consulted produced zero new clinics, the city is likely saturated
4. **Ask the clinics themselves** — when making outreach contact, include: *"Are there other IVF clinics in [city] that you're aware of?"* Practitioners know their local competitive landscape

#### Completeness signal (when to stop)

A city's clinic list is considered **complete enough to proceed to Phase 2** when:

- [ ] At least 5 of 7 source types have been checked
- [ ] The last 2 sources added zero new clinics (diminishing returns)
- [ ] Government registry (if available) has been cross-checked
- [ ] All clinics on the list have been verified as currently operating (not closed/merged)
- [ ] For major cities (Singapore, KL, Bangkok, Jakarta, Hanoi, HCMC): minimum 5 clinics found (if fewer, something was missed)

**Note:** 100% completeness is not the goal — the outreach email itself will surface clinics we missed, since clinics may forward the inquiry to peers or we'll hear about competitors through responses. The goal is **>90% coverage of clinics that already do PGT-A** (Tier 1), since those are the ones most likely to partner with Genomic Prediction.

---

## Phase 2: Email Collection

- Primary: Clinic website contact/inquiry email
- Secondary: IVF department-specific email if available
- Tertiary: Contact form submission (flag these — no direct email available)
- Where possible, identify the **medical director** or **lead embryologist** name for personalization

---

## Phase 3: Outreach Email

### Design principles

1. **Patient voice, not vendor pitch.** Clinics filter vendor emails. Patient inquiries go to clinical staff because patients = revenue.
2. **Short.** ~100-120 words. Phone-readable in 20 seconds. One clear ask.
3. **Personalized.** Reference something specific about the clinic (their PGT offering, their RTAC status, their doctor's name).
4. **Easy to reply to.** Yes/no question, not essay questions. Lower the barrier to response.
5. **Show homework.** Mention you know what services they offer. This separates you from mass emailers.

### Template A — Tier 1 clinics (already offer PGT-A/PGT-M)

> These clinics already do embryo biopsy + ship to reference labs. They know the logistics. The ask is small: "can you also send to Genomic Prediction?"

**Subject:** Patient inquiry — PGT-P (polygenic screening) alongside your PGT-A service

---

Dear [Dr. Name / Clinic Name] Team,

I'm a prospective IVF patient based in Singapore. I'm exploring your clinic for my IVF cycle and I'm particularly interested in your [PGT-A/PGT-M] services.

I'd also like to do **PGT-P (polygenic embryo screening)** through Genomic Prediction (lifeview.com) — it uses the same trophectoderm biopsy as PGT-A, so no extra procedure is needed. They work with 200+ clinics globally and handle all the logistics.

Since your clinic already ships biopsy samples to reference labs, **would it be possible to also send a sample to Genomic Prediction's lab in the US for PGT-P analysis?**

Happy to discuss further or connect your team directly with Genomic Prediction's clinic partnerships team (sales@genomicprediction.com) if that would be helpful.

Thank you,
[Your Name]
[Your Phone]

---

*~120 words. One clear ask. References their existing PGT capability.*

### Template B — Tier 2 clinics (full IVF, no advertised PGT)

> These clinics don't currently ship biopsies overseas. The ask is bigger. Focus on interest/willingness, not logistics.

**Subject:** Patient inquiry — interested in IVF at your clinic + genetic screening options

---

Dear [Dr. Name / Clinic Name] Team,

I'm a prospective IVF patient based in Singapore, and I'm considering your clinic for my upcoming cycle.

I'm interested in **polygenic embryo screening (PGT-P)** — a test that assesses embryo risk for common conditions like diabetes and heart disease using the same biopsy taken during standard IVF. It's offered by Genomic Prediction (lifeview.com), a US-based lab that works with 200+ clinics worldwide.

**Would your clinic be open to coordinating with an overseas genetics lab for this type of testing?** I understand this may not be something you currently offer, so I'm happy to discuss what's involved — the process is straightforward for clinics that already do embryo biopsy.

Thank you for your time,
[Your Name]
[Your Phone]

---

*~115 words. Softer ask. Doesn't assume they know PGT-P. Opens the door without pressuring.*

### Template C — Follow-up (7 days, no response)

**Subject:** Re: [original subject line]

---

Hi [Clinic Name] Team,

Just following up on my email from last week about polygenic embryo screening (PGT-P). I understand you're busy — I just wanted to check if this is something your clinic could accommodate, or if there's a better person for me to speak with.

Thank you,
[Your Name]
[Your Phone]

---

*~45 words. Short. Non-pushy. Gives them an out ("better person to speak with").*

### Personalization hooks (per clinic)

| What you know | How to use it |
|---|---|
| Doctor's name | "Dear Dr. [Name]" instead of "Dear Team" — much higher open rate |
| They offer PGT-A | "I see you offer PGT-A" — shows you've researched them |
| RTAC certified | "I noticed your clinic is RTAC-certified" — shows due diligence |
| Ships overseas already | "Since you already coordinate with overseas labs" — makes the ask trivial |
| Part of a hospital group | Reference the parent group: "I see your clinic is part of [Group]" |
| Success rates mentioned | "Your reported [X%] success rate is impressive" — flattery works |

### Readiness assessment

| Country | Ready to Send | Missing Email (use phone/form) | Tier 1 (highest priority) |
|---|---|---|---|
| Vietnam | 29 clinics | 3 | ~19 Tier 1 |
| Malaysia | 24 clinics | 5 | ~14 Tier 1 |
| Singapore | 21 clinics | 4 | ~7 Tier 1 |
| **Total** | **74 clinics** | **12** | **~40 Tier 1** |

### Email send plan

| Step | Action |
|---|---|
| 1 | Compile final clinic list with emails into spreadsheet (.xlsx) |
| 2 | Personalize email where possible (clinic name, doctor name, note if they already offer PGT) |
| 3 | Send in batches of 10–15 per day to avoid spam filters |
| 4 | Track responses in spreadsheet (Responded / Interested / Not Interested / Bounced) |
| 5 | Follow up after 7 days if no response |
| 6 | Share interested clinics with Genomic Prediction (sales@genomicprediction.com) to facilitate partnership |

---

## Phase 4: Follow-Up & Next Steps

- Clinics that respond positively → connect them directly with Genomic Prediction's clinic partnerships team
- Clinics that already ship biopsies overseas → highest conversion probability, prioritize
- Compile findings into a summary for personal decision-making on which clinic to proceed with
- Consider factors: proximity, cost, success rates, willingness to coordinate internationally

---

## Known Clinics (Starting List — To Be Expanded)

### Singapore
| Clinic | Website |
|---|---|
| KK Women's & Children's Hospital (KKIVF) | kkh.com.sg |
| Mount Elizabeth Fertility Centre | mountelizabeth.com.sg |
| Alpha IVF Singapore | alphaspecialists.com.sg |
| Thomson Fertility Centre | thomsonmedical.com |
| Monash IVF Singapore | monashivf.com.sg |
| SGH Centre for Assisted Reproduction (CARE) | sgh.com.sg |
| Virtus Fertility Centre Singapore | virtusfertilitycentre.com.sg |
| Health & Fertility Centre for Women | healthfertility.com.sg |
| Majella Women's Specialist | majella.sg |
| O&G Partners Fertility Centre | — |
| Sincere IVF Center | — |

### Malaysia (Kuala Lumpur + others)
| Clinic | Website |
|---|---|
| Alpha IVF & Women's Specialists (KL) | alphafertilitycentre.com |
| Sunfert International Fertility Centre | sunfert.com |
| TMC Fertility Centre | tmcfertility.com |
| KPJ Damansara Fertility Centre | — |
| Metro IVF | metroivf.com |
| Tropicana Medical Centre Fertility | — |
| Columbia Asia Fertility Centre | — |
| Lam Wah Ee Hospital (Penang) | — |
| Island Hospital Fertility (Penang) | — |

### Indonesia (Jakarta, Surabaya + others)
| Clinic | Website |
|---|---|
| Morula IVF (multiple locations) | morulainvitro.co.id |
| RSAB Harapan Kita (Jakarta) | — |
| BIC (Bocah Indonesia Centre) Jakarta | — |
| Siloam Hospitals Fertility Clinic | siloamhospitals.com |
| Bundamedik IVF Centre | — |
| RSIA Bunda Jakarta | — |
| RS Pondok Indah IVF | — |

### Thailand (Bangkok + Southern)
| Clinic | Website |
|---|---|
| Jetanin Institute | jetanin.com |
| Superior A.R.T. | thaisuperiorart.com |
| SAFE Fertility Group | safefertilitygroup.com |
| Bumrungrad Hospital Fertility Centre | bumrungrad.com |
| Bangkok Hospital Fertility Centre | bangkokhospital.com |
| IVF & Women Clinic (IWC) | iwclinic.com |
| Genea Thailand / First Fertility | firstfertility.com |
| Phyathai Sriracha IVF | — |

### Vietnam (Hanoi + Ho Chi Minh City)

**Hanoi**
| Clinic | Website |
|---|---|
| Tam Anh General Hospital IVF Centre (IVFTA) | tamanhhospital.vn |
| Hong Ngoc IVF Fertility Center | ivfhongngoc.com |
| Superior A.R.T. Hanoi (Genea joint venture) | — |
| Andrology and Fertility Hospital of Hanoi | — |
| Hanoi Obstetrics and Gynecology Hospital | — |
| Hanoi Medical University Hospital IVF Center | — |
| Vietnam National Hospital of Obstetrics and Gynecology (VNHOG) | — |
| Bach Mai Hospital IVF Support Unit | — |
| Vinmec Times City IVF Center (RTAC-certified) | vinmec.com |
| Vietnam Belgium Hospital | — |
| Phuong Dong General Hospital IVF | — |

**Ho Chi Minh City**
| Clinic | Website |
|---|---|
| Tu Du Hospital IVF Centre | — |
| IVFMD (My Duc Hospital) | ivfmd.vn |
| Hanh Phuc International Hospital (RTAC-certified) | — |
| Superior A.R.T. Ho Chi Minh City | — |
| Vinmec Central Park OLEA IVF | vinmec.com |
| An Sinh Hospital | — |
| City International Hospital IVF Center | — |

### Brunei
| Clinic | Website |
|---|---|
| RIPAS Hospital Fertility Unit | — |

---

## Deliverables

1. **This spec** (outreach-spec.md)
2. **Full clinic list spreadsheet** (clinics.csv) with all fields populated
3. **Personalized email drafts** per clinic (or batched by tier)
4. **Response tracker** (outreach-tracker.csv)
5. **Summary report** of findings after outreach complete

---

## Open Questions

- [ ] Confirm with Genomic Prediction whether they already have any SE Asia clinic partners (email sales@genomicprediction.com first — may save significant effort)
- [ ] Check if Singapore MOH regulations prohibit sending embryo material overseas for non-approved testing
- [ ] Check Malaysia / Indonesia / Thailand regulations on cross-border biological sample shipping
- [ ] Determine if any clinics in the region already use overseas reference labs (e.g., Igenomix, CooperGenomics) — these would be easiest to onboard
- [ ] Budget: factor in international shipping costs for frozen biopsy samples (typically shipped in dry shippers)
