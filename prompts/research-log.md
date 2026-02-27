# Research Log — Claude-Assisted Process

This documents how this research was conducted using Claude (Anthropic) as a research assistant, including the prompts used and methodology. The goal is transparency and reproducibility.

**Tool:** Claude Opus 4.6 via claude.ai (web interface with browser tools, web search, file creation)
**Date started:** 2026-02-27

---

## Session 1 — Initial Research (2026-02-27)

### Prompt 1: Landscape overview
```
embryo selection singapore and ivf. what are the options
```
**What Claude did:** Web search for Singapore IVF/embryo selection options. Returned comprehensive overview of available testing (PGT-M, PGT-SR, morphological grading), what's restricted (PGT-A pilot only), what's prohibited (sex selection, PGT-P), costs, government funding, and clinic list.

---

### Prompt 2: Polygenic screening deep dive
```
what about stepheb hsu prediction embryos
```
**What Claude did:** Searched for Stephen Hsu and Genomic Prediction. Returned background on Hsu, company history, LifeView product details, how PGT-P works, the first polygenic baby (May 2020), scientific controversy, and ESHG's position.

---

### Prompt 3: Where to access PGT-P
```
so where can i do this?
```
**What Claude did:** Searched for commercial PGT-P providers. Identified three US companies (Genomic Prediction/LifeView, Orchid Health, MyOme) plus Nucleus Genomics as a software layer. Detailed each company's offering, pricing, and availability. Noted no SE Asia availability.

---

### Prompt 4: Cost breakdown
```
what are the cost for this?
```
**What Claude did:** Compiled detailed cost breakdown for full IVF + PGT-P cycle in the US ($27,000–50,000+), standard PGT-A costs, insurance coverage status, and per-embryo pricing models.

---

### Prompt 5: Regional availability
```
do they work with any labs in the area?
```
**What Claude did:** Searched for Genomic Prediction partnerships in Southeast Asia and Thailand IVF clinics offering PGT-P. Found no publicly documented partnerships. Listed Thailand IVF clinics as alternatives (PGT-A available, gender selection permitted). Recommended emailing Genomic Prediction directly.

---

### Prompt 6: Spec creation
```
create a spec md

find me every single ivf clinic, 1000km radius of singapore. 
then i want to get all their emails, and send them an email asking if they will support genomic prediction sending embryo biopsy sample to their labs for analysis.
```
**What Claude did:** Created full project spec (outreach-spec.md) with geographic scope, clinic discovery methodology, tiering system, email template, send plan, and starting clinic list (~40+ clinics across Singapore, Malaysia, Indonesia, Thailand, Vietnam, Brunei).

---

### Prompt 7: Add Hanoi
```
for vietnam, include hanoi.
```
**What Claude did:** Web searched for IVF clinics in Hanoi. Added 11 Hanoi clinics (Tam Anh IVFTA, Hong Ngoc IVF, Superior A.R.T. Hanoi, Vinmec Times City, Bach Mai, etc.) and expanded HCMC to 7 clinics. Updated spec.

---

### Prompt 8: Repo creation
```
ok lets create this as a new repo. and we want to make this public repo - research. 

and track how we use claude code for getting there and all the prompts. repo in Code/

create an adequate name representing what we do, yet will not get cancelled.
```
**What Claude did:** Created `fertility-genomics-research` repo with full structure: README, docs (spec, primer, regulatory notes), data stubs, prompts log, and LICENSE.

---

## Methodology notes

### What worked well
- Claude's web search gave solid initial landscape overview
- Iterative prompting (broad → specific) was efficient
- Claude could synthesize across multiple sources and structure output immediately
- Spec generation from a brief prompt was high-quality first draft

### What required human judgment
- Naming the repo to avoid controversy
- Deciding geographic scope (strict 1,000 km vs. practical travel distance)
- Regulatory nuance — Claude provided good starting points but flagged uncertainty appropriately
- Ancestry limitations of PRS — Claude raised this proactively, which is important for a SE Asian patient

### What still needs human work
- Verifying clinic emails (web search can find them but needs manual confirmation)
- Actually sending the emails
- Regulatory/legal confirmation on cross-border biopsy shipping
- Talking to Genomic Prediction directly

---

## Future sessions

_Will be logged as research continues._
