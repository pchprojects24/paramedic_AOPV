# Paramedic Aid Memoir — Development Map

*Last reviewed: 2026-03-16*

---

## Project Overview

**Paramedic Aid Memoir** is a static, offline-first HTML reference application for shipboard paramedics. It provides quick access to equipment guides, diagnostic procedures, medical protocols, and operational routines — with no external dependencies, no build step, and no network requirements.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic) |
| Styling | CSS3 — single file `/styles/style.css` |
| Scripting | Vanilla JavaScript (ES5, IIFE, no dependencies) |
| Fonts | System font stack only |
| Build | None — static files served directly |
| Deployment | Git-based, manual |

---

## Repository Structure

```
paramedic_AOPV/
├── index.html                  # Landing page (carousel navigation)
├── styles/style.css            # Main stylesheet
├── scripts/app.js              # Carousel, accordion, search skeleton
│
├── sections/                   # CANONICAL content location
│   ├── istat/                  # ✅ Complete (9 files)
│   ├── equipment/              # ✅ Complete (8 files)
│   ├── zoll-propaq/            # ✅ Complete (1 accordion file)
│   ├── zoll-emv-731/           # ✅ Complete (1 accordion file)
│   ├── immunizations/          # ✅ Complete (5 files)
│   ├── admin/                  # ⚠️  Minimal (1 file)
│   ├── water-testing/          # ⚠️  Stub — links to legacy folder
│   ├── casualty-clearing/      # 🔶 Partial (3 files, some placeholder)
│   ├── inventory/              # 🔶 Partial (5 files, search unimplemented)
│   ├── point-of-care-tests/    # 🔴 Placeholder (5 files, no content)
│   ├── routines/               # 🔴 Placeholder (4 files, no content)
│   └── protocol-book/          # 🔴 Placeholder (future CAF integration)
│
└── [legacy root directories]   # ⚠️  Superseded — pending migration/removal
    ├── admin/
    ├── casualty-clearing/
    ├── equipment-core/
    ├── equipment-other/
    ├── inventory-logistics/
    ├── lab-poct/
    ├── ports-alongside/
    ├── protocol-book/
    ├── routines/
    └── water-testing/           # ← actual water testing content lives here
```

### Status Key
| Symbol | Meaning |
|--------|---------|
| ✅ | Complete — content authored and functional |
| ⚠️  | Partial or structurally incomplete |
| 🔶 | Mixed — some content exists, some is placeholder |
| 🔴 | Placeholder only — no real content |

---

## JavaScript Components (`/scripts/app.js`)

| Component | Status | Notes |
|-----------|--------|-------|
| Carousel | ✅ Working | Horizontal scroll, dot indicators, prev/next buttons |
| Accordion | ✅ Working | Dynamic height, collapse/expand |
| Search | 🔴 Stub | Input renders; message: "No data loaded yet" |

---

## Content Completion Status

### Complete Sections

**i-STAT (`/sections/istat/`)** — 9 files
- Overview, daily/weekly checks, QC procedures, troubleshooting, 5 cartridge type guides

**Equipment (`/sections/equipment/`)** — 8 files
- Cocoon transport incubator, Braun Infusomat, 12-lead ECG, oxygen equipment, suction, incubator, water colorimeter, patient monitor

**ZOLL Propaq MD (`/sections/zoll-propaq/index.html`)**
- Quick start, how-to guides, defibrillation, cardioversion, pacing, troubleshooting, external resources

**ZOLL EMV+ 731 (`/sections/zoll-emv-731/index.html`)**
- Quick start, common functions, troubleshooting, care & consumables

**Immunizations (`/sections/immunizations/`)** — 5 files
- Vaccine schedule, assistant immunizer role, cold chain, administration, adverse reactions

---

### Incomplete Sections (Priority Development Areas)

#### 1. Water Testing — Migration Required
- **Problem:** `/sections/water-testing/index.html` is a stub linking to the legacy `/water-testing/` root folder
- **Legacy folder contains:** 5 fully authored guides (bacteriology, free-chlorine, pH, total-chlorine)
- **Action:** Migrate content from `/water-testing/` into `/sections/water-testing/`, update internal links

#### 2. Casualty Clearing — Partial Content
- **Files:** `index.html`, `roles-and-organization.html`, `evolutions.html`
- **Action:** Complete "content to be added" placeholders; expand evolutions (fire, flood, isolated casualty)

#### 3. Inventory — Search Unimplemented
- **Files:** `index.html`, `ordering.html`, `inventory-list.html`, `medication-inventory.html`, `medications-quick-reference.html`
- **Problem:** `inventory-list.html` and `medication-inventory.html` have search UI with no data backend
- **Action:** Define data format (JSON array in page or linked file), implement JS filtering

#### 4. Point-of-Care Tests — Empty Frameworks
- **Files:** `index.html` + 4 test files (Pregnancy, Rapid Strep, Troponin, Monospot)
- **Action:** Author procedure content for each test type

#### 5. Ship Routines — All Placeholder
- **Files:** `index.html`, `alongside.html`, `at-sea.html`, `port.html`
- **Action:** Author checklist/procedure content for each operational context

#### 6. Protocol Book — Future Integration
- **File:** `index.html` (placeholder for CAF Med Tech/Paramedic protocol book)
- **Action:** Determine source format and extraction/display approach

#### 7. Admin — Minimal
- **File:** `clearing-in.html` only
- **Action:** Identify additional administrative procedures to document

---

## Technical Debt

### High Priority

| Issue | Location | Action |
|-------|----------|--------|
| Legacy directory duplication | Root-level folders | Migrate content then remove after verifying all links updated |
| Water testing fragmentation | `/sections/water-testing/` + `/water-testing/` | Consolidate into sections/ |
| Search not functional | `inventory-list.html`, `medication-inventory.html` | Implement data + filter logic in app.js |
| No README | Repository root | Create README.md with setup, purpose, contribution guidelines |

### Medium Priority

| Issue | Location | Action |
|-------|----------|--------|
| Legacy `style.css` at root | `/style.css` | Verify nothing references it; delete |
| Single CSS breakpoint | `/styles/style.css` | Add tablet (768px) breakpoint |
| Incomplete ARIA coverage | Various pages | Audit and add missing labels, roles |
| No skip-to-content link | All pages | Add to shared header pattern |

### Low Priority

| Issue | Notes |
|-------|-------|
| No meta descriptions | Add to all pages for potential indexing |
| No automated link-checking | Consider adding a simple CI check |
| No HTML validation CI | Could add htmlhint or similar |
| index.backup.html at root | Remove once confirmed unneeded |

---

## Recommended Development Sequence

### Phase 1 — Structural Cleanup
1. Create `README.md` (purpose, setup, structure, contribution guide)
2. Migrate `/water-testing/` content into `/sections/water-testing/`
3. Delete `style.css` (root legacy) and `index.backup.html` after verification
4. Audit and remove or archive remaining legacy root directories

### Phase 2 — Complete Placeholder Sections
1. Point-of-care tests (4 test procedures)
2. Ship routines (alongside, at-sea, port checklists)
3. Casualty clearing (complete placeholder content)
4. Admin (identify missing procedures)

### Phase 3 — Implement Search
1. Define JSON data format for inventory/medication lists
2. Implement client-side filter in `app.js`
3. Populate data files for both inventory pages

### Phase 4 — Protocol Book
1. Determine source material format (PDF, Word, etc.)
2. Decide on display approach (inline HTML, embedded PDF, paginated accordion)
3. Author or extract content

### Phase 5 — Quality & Polish
1. Add tablet/desktop breakpoints to CSS
2. Complete ARIA audit
3. Add skip-to-content links
4. Add meta descriptions to all pages
5. Set up basic CI (link checker, HTML validation)

---

## File Count Summary

| Category | Count |
|----------|-------|
| HTML files (sections/) | 53 |
| HTML files (legacy/) | 57 |
| CSS files | 2 |
| JS files | 1 |
| **Total** | **113** |

Total codebase: ~6,200 lines (~1 MB)

---

## Notes for Contributors

- **No build step** — edit HTML/CSS/JS files directly and open in browser
- **No external dependencies** — do not add CDN links; keep everything self-contained
- **Offline-first is a hard requirement** — no fetch calls to external APIs
- **Content dates** — use HTML comments (`<!-- Updated: YYYY-MM-DD -->`) at the top of pages
- **Navigation pattern** — all pages should include the shared sticky header with a "Home" link back to `index.html`
- **Accordion pattern** — for long-form single-page content, use the accordion component as implemented in `zoll-propaq/index.html`
