# Paramedic Aid Memoir — Development Map

*Last reviewed: 2026-09-04*

---

## Project Overview

**Paramedic Aid Memoir** is a static, offline-first HTML reference for
paramedics and other medical personnel joining an AOPV. No build step, no
dependencies, no network requirement. See `README.md` for how to run and
author it.

---

## Where the project actually stands

The site is roughly **40% of the way to a usable v1**. What exists is good;
there is simply less of it than the file count suggests.

| | Pages | Notes |
|---|---|---|
| Real content | 33 | i-STAT, equipment, Propaq, EMV+ 731, immunizations, water testing |
| Placeholder shells | 25 | Framework only — heading and "content to be added" |
| Landing + templates | 2 | `index.html`, i-STAT cartridge template |

### Complete sections

| Section | Pages | Contents |
|---|---|---|
| `sections/istat/` | 10 | Overview, daily/weekly checks, QC, troubleshooting, 4 cartridge guides + template |
| `sections/equipment/` | 9 | Cocoon warming, Braun Infusomat, Schiller ECG, Invacare oxygen, Laerdal suction, Millipore incubator, Mindray N1, Hach DR900 |
| `sections/zoll-propaq/` | 1 | 7-panel accordion: quick start, how-to, defib, cardioversion, pacing, troubleshooting, resources |
| `sections/zoll-emv-731/` | 1 | Quick start, common functions, troubleshooting, care & consumables |
| `sections/immunizations/` | 6 | Schedule, assistant immunizer, cold chain, administration, adverse reactions |
| `sections/water-testing/` | 5 | Free chlorine, total chlorine, pH, Colilert bacteriology |

### Placeholder sections

| Section | Pages | Needs |
|---|---|---|
| `sections/point-of-care-tests/` | 5 | Procedures for pregnancy, rapid strep, troponin, monospot |
| `sections/routines/` | 4 | Alongside, at-sea, and port routine checklists |
| `sections/casualty-clearing/` | 6 | Roles, organization, fire/flood/isolated-casualty evolutions |
| `sections/inventory/` | 5 | Inventory list, medication inventory, quick reference, ordering |
| `sections/admin/` | 2 | Clearing-in, and whatever else belongs here |
| `sections/protocol-book/` | 1 | Clinical protocol content |

---

## The biggest gap: there is no clinical content

Every page currently in the repo is about **a machine or a logbook**. There
are no drug doses, no treatment algorithms, no assessment guides, and
nothing about what to do when a person is actually sick or injured.

For an all-in-one manual aimed at someone *joining* an AOPV, three areas
matter more than anything on the placeholder list above:

1. **Onboarding / orientation.** Sick bay layout and where things live, who
   you report to, the medical footprint of an AOPV (no physician aboard),
   what reachback exists and how to raise it, what the first week looks
   like.
2. **Clinical reference.** Emergency drug card, core algorithms
   (anaphylaxis, cardiac arrest, seizure), scope of practice, medical
   direction — when to call and on what.
3. **Evacuation.** CASEVAC/MEDEVAC planning: Arctic and remote timelines,
   helo transfer, patient packaging for helo and RHIB, the 9-liner, who
   authorises.

---

## Topic backlog inherited from the removed legacy tree

The legacy root directories were deleted in the 2026-09-04 cleanup. They
contained no content, but their page titles encoded intended topics that
have **no home in `sections/` yet**. Recorded here so the intent is not
lost:

- **Ports & Alongside** — general arrival checklist, alongside medical
  tasks, port-specific guides (St. John's NL was stubbed). This was a
  top-level section in the original site and is currently absent from the
  navigation entirely. Decide deliberately whether it returns.
- **Where to Find Things** — sick bay stowage guide. Overlaps with the
  onboarding gap above and is probably high value.
- **Medical Duty Expectations** — what is expected of the medical department
  day to day.
- **QC, Storage & Expiry** — a cross-cutting POCT page, separate from the
  per-test procedures.
- **Forms & Templates** — admin paperwork.
- **Medication Card Template** — a per-drug card format for the medication
  quick reference.
- **What Is Casualty Clearing? / Paramedic Role / Checklists** — finer
  breakdown than the current `sections/casualty-clearing/` provides.

---

## Technical debt

### Resolved 2026-09-04

- Removed 47 orphaned, contentless legacy pages across nine root
  directories.
- Removed `index.backup.html` and the superseded root `style.css`.
- Migrated water testing into `sections/water-testing/` on the shared
  stylesheet, replacing ~150 lines of duplicated inline CSS per page.
- Fixed 5 broken `../equipment/` links.
- Added `README.md` and `scripts/check-links.py`.

### Outstanding

| Priority | Issue | Action |
|---|---|---|
| High | Legacy `water-testing/` folder still on disk | Content is migrated; delete the 5 files. See note below. |
| High | Search is non-functional | `initSearch` in `app.js` always answers "no data loaded yet". Build a generated `search-index.json` and filter client-side. |
| High | "Offline-first" is claimed but not implemented | No service worker, no manifest. Hosted on GitHub Pages it will not work offline or install to a home screen. |
| Medium | 26 external PDF links are useless at sea | Mirror locally, or keep the `.external-tag` labelling now used in water testing. |
| Medium | Header/footer duplicated across every page | A shared JS include or a page generator; do this *before* the file count doubles during the content phase. |
| Medium | Hand-typed footer dates | Move to a per-page review date with a source-of-truth line. |
| Medium | Accordion collapse does not animate | `initAccordion` sets `max-height: none` on `transitionend`; `none → 0` is not animatable. |
| Medium | Accordion headers lack `aria-controls` | Add id/`aria-controls` pairing. |
| Low | One CSS breakpoint (480px) | Add a tablet breakpoint. |
| Low | No print stylesheet | Checklists will get printed. |
| Low | No dark mode | Night sick bay. |
| Low | No CI | Wire `scripts/check-links.py` into a GitHub Action. |
| Low | Carousel hides 3 of 4 top-level groups | Reconsider against a flat index once search works. |

> **Note on the legacy `water-testing/` folder:** its content has been fully
> migrated to `sections/water-testing/` and is no longer linked from
> anywhere. The five files remain on disk only because the automated
> deletion was blocked during the cleanup. Remove with:
> `git rm -r water-testing/`
> `scripts/check-links.py` will report zero broken links and zero orphans
> once it is gone.

---

## Recommended sequence

**Phase 1 — Structural cleanup.** *(done 2026-09-04, except the folder note above)*

**Phase 2 — Make it a real offline app.**
1. Service worker + web manifest + icons; verify install-to-home-screen.
2. Generate `search-index.json` from page content; wire up real filtering.
3. Add CI running the link checker.

**Phase 3 — Fix the authoring model.** Shared header/footer, page
generator or template script. Do this before writing 40 more pages.

**Phase 4 — Content, in value order.**
1. Onboarding / orientation
2. CASEVAC / MEDEVAC
3. Point-of-care tests
4. Ship routines
5. Casualty clearing
6. Inventory and medications
7. Protocol book

**Phase 5 — Polish.** Dark mode, print stylesheet, tablet breakpoint,
ARIA audit, skip-to-content, back-to-top.
