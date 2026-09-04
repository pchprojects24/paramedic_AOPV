# Paramedic Aid Memoir

An offline-first quick-reference manual for paramedics and other medical
personnel joining an Arctic and Offshore Patrol Vessel (AOPV).

It is a plain static website: HTML, one stylesheet, one small vanilla
JavaScript file. No build step, no package manager, no external
dependencies, no network calls. Clone it, open `index.html` in a browser,
and it works — including with no connectivity at sea.

## Running it

Open `index.html` directly in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Structure

```
index.html              Landing page (carousel over the four top-level groups)
styles/style.css        The single shared stylesheet
scripts/app.js          Carousel, accordion, and search behaviour
scripts/check-links.py  Link and orphan checker (see below)
sections/               All content lives here
```

Content sections:

| Section | Contents |
|---|---|
| `sections/istat/` | i-STAT analyzer: checks, QC, troubleshooting, cartridge guides |
| `sections/equipment/` | Device guides (infusion pump, ECG, oxygen, suction, incubator, monitor, colorimeter, warming) |
| `sections/zoll-propaq/` | ZOLL Propaq MD monitor/defibrillator |
| `sections/zoll-emv-731/` | ZOLL EMV+ 731 transport ventilator |
| `sections/immunizations/` | Schedules, cold chain, administration, adverse reactions |
| `sections/water-testing/` | Potable water: chlorine, pH, bacteriology |
| `sections/point-of-care-tests/` | Non-i-STAT POCT (placeholder) |
| `sections/routines/` | Ship routines (placeholder) |
| `sections/casualty-clearing/` | Casualty clearing and evolutions (placeholder) |
| `sections/inventory/` | Inventory, ordering, medications (placeholder) |
| `sections/admin/` | Administrative procedures (placeholder) |
| `sections/protocol-book/` | Clinical protocols (placeholder) |

See `DEVELOPMENT_MAP.md` for what is written, what is still a placeholder,
and the planned order of work.

## Authoring a page

Copy an existing page in the same section and edit it. Every page follows
the same skeleton:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page Name — Paramedic Aid Memoir</title>
<meta name="description" content="One sentence describing the page.">
<link rel="stylesheet" href="../../styles/style.css">
<script src="../../scripts/app.js" defer></script>
</head>
<body>
<header class="site-header">
  <span class="site-title">Paramedic Aid Memoir</span>
  <a href="../../index.html">Home</a>
  <a href="index.html">&larr; Section Name</a>
</header>
<main class="content">
<h1>Page Name</h1>
<p class="scope-block">One line on what this page covers and when to use it.</p>
...
</main>
<footer class="site-footer">Last updated: YYYY-MM-DD &bull; Offline-first</footer>
</body>
</html>
```

Adjust the `../../` prefixes to the page's depth.

### Available components

| Class | Use |
|---|---|
| `.scope-block` | Amber lead paragraph: what this page covers |
| `.note-block` | Blue informational note |
| `.safety-note` | Orange caution |
| `.warning-callout` | Red warning — hazard or hard stop |
| `.page-list` | Vertical list of links to other pages |
| `.link-list` | Link list with room for an `.external-tag` sub-label |
| `.card-grid` | Grid of large tap targets |
| `<details>`/`<summary>` | Collapsible detail, styled by default |
| `.accordion` | Long single-page content — see `sections/zoll-propaq/index.html` |

## House rules

- **Offline-first is a hard requirement.** No CDN links, no web fonts, no
  external scripts, no `fetch` to external APIs. If you add an external
  reference link, tag it so the reader knows it needs connectivity:
  `<span class="external-tag">External link &mdash; requires internet</span>`
- **No build step.** Edit files directly.
- **System fonts only.**
- **Every page gets a `Last updated:` date** in the footer, and a
  `<meta name="description">`.
- **Every page links Home**, and back to its section index.
- Minimum 44px tap targets — this gets used one-handed, on a phone, at sea.

## Checking your work

```sh
python3 scripts/check-links.py
```

Reports broken internal links and pages unreachable from `index.html`.
Exits non-zero if any link is broken, so it works as a CI gate. It never
makes network requests; external links are counted but not fetched.

## Scope and status

This is a personal aide-mémoire and orientation aid. It does not supersede
CAF clinical protocols, manufacturer instructions for use, or medical
direction. Where this manual and an official source disagree, the official
source wins.
