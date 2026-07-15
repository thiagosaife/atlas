# Atlas of Long Gone Empires

An interactive world map of the empires that once ruled each corner of the world —
styled as a weathered expedition map in the spirit of 1930s pulp adventure.
Hover a land to see who ruled it, slide through the ages to watch realms rise and
fall, and reveal any empire's full territory across today's borders.

**English, French & Brazilian Portuguese.** Vanilla TypeScript + D3, no UI
framework. ~56 kB gzipped.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # validate + typecheck + bundle to dist/
npm run validate   # check the empire catalogue
```

## Features

- **Real borders** — Natural Earth geography (`countries-110m`), bundled locally.
- **Imperial extents** — empires declare the modern countries they covered, so the
  Ottomans, Rome, the Mongols and the USSR paint as single realms across many of
  today's borders, not one country at a time.
- **Timeline** — slide or play through 4500 BC → 2000 AD. Concurrent empires are
  tinted by a greedy **map-colouring** of the border graph, so two bordering realms
  alive in the same year never share a hue.
- **Reveal an empire** — from search, the legend, or a pinned land: its whole
  territory lights up, the rest of the world recedes, and the map frames it.
- **Search empires, rulers, lands, and years** — search a person and land on
  their realm: `Alexander` finds Macedon, `Lenin` the USSR, `the great` every
  ruler who earned the epithet; the matched name is shown as the reason. `44 BC`,
  `-1200`, `753 AD` or `1200 av. J.-C.` jump the timeline to that moment and list
  every realm standing in it. A bare `1200` offers both readings (BC and AD), and
  either language's
  era words are understood whichever locale you're in.
- **Field notes** — sepia thumbnails, a summary, and Wikipedia/Britannica links,
  lazily fetched. ~60 empires point at a curated monument article so the hero image
  is Machu Picchu, not a flag.
- **i18n** — English, French, and Brazilian Portuguese, with the era format
  ("120 BC" / "120 av. J.-C." / "120 a.C."), country names, empire names, rulers,
  and even the Wikipedia edition switching with the locale. Picks up `?lang=pt`,
  a saved choice, or the browser language.
- **Zoom & pan** — scroll to zoom (12×); borders stay crisp and capital labels keep
  a constant size.
- **A sheet that's been in the field** — coffee rings, blots and fold creases stain
  the parchment, and the chart carries its own marginalia: a compass rose, the
  equator and tropics drawn as real chart lines, a projection note, and a **live
  scale bar** that recomputes the ground distance as you zoom.
- **Text size** — A− / A+ scales all type 0.75×–1.5×; `prefers-reduced-motion` is
  respected.

## Architecture

Layers point downward only. The domain is pure — no DOM, no d3, no I/O — so the
interesting logic is testable in isolation:

```
src/
  domain/     era maths, the Atlas index, map-colouring, search. Pure.
  data/       ★ the empire catalogue, split by region, + its schema
  i18n/       locale bundles; turns an Empire into a LocalizedEmpire
  services/   topology loading, Wikipedia
  state/      one small observable store
  ui/         d3 map + views — the only code that touches the DOM
  main.ts     composition root: wires the layers, owns the render loop
wtt/          the design system (tokens, guidelines, components)
```

**Data is the contribution surface.** Adding an empire means adding one object to
one file in `src/data/empires/`; `npm run validate` checks every field against the
real topology — including that each country name actually exists, which would
otherwise fail silently as an empire that simply never paints. The build and CI run
it, so bad data can't reach `main`.

See **[CONTRIBUTING.md](CONTRIBUTING.md)** to add an empire or a language.

## Design system

`wtt/` holds the visual language — tokens (colour, type, spacing, effects,
scrollbars), guideline specimens, and component extractions. `src/styles/app.css`
imports it and declares no colours of its own. Signature chrome: a **burnt-paper
screen edge** (a charred border torn ragged by an SVG turbulence filter) and
**branded scrollbars** (parchment groove, aged-brass thumb).

## Deployment

Pushing to `main` builds and publishes to GitHub Pages
(`.github/workflows/deploy.yml`). The workflow passes `BASE_PATH=/<repo>/`, which
Vite applies to every asset URL. Enable it once under **Settings → Pages → Source:
GitHub Actions**.

## Data provenance

Empire extents are **approximations to modern borders** — a deliberate
simplification, since historical frontiers don't follow present-day ones. Dates
follow conventional scholarly ranges. 78 empires are charted across every inhabited
continent; corrections welcome.
