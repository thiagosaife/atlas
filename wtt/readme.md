# Long Gone Empires Design System

The design language of **Atlas of Long Gone Empires** — a world-map app styled as a
weathered expedition map in the spirit of 1930s pulp-adventure serials: parchment,
sepia ink, brass, crimson expedition routes, film grain and a vignetted screen edge.

**Source of truth:** the user's local codebase `world-time-travel/`
(`index.html`, `empires.js`, `countries-110m.json`, `README.md`). All values here
are lifted verbatim from that code. A working copy of the full app lives in
`ui_kits/atlas/`.

**The one hard rule: every colour stays on old paper.** Warm, aged, low-chroma.
No pure white, no pure black, no cool or neon hues, no grey shadows. If you need a
new colour, derive it in oklch with the same muted chroma as the era palette
(C ≈ 0.06–0.09) and a warm-shifted lightness; see `tokens/colors.css`.

---

## Content fundamentals

- **Voice:** an expedition journal. Terse, evocative, slightly archaic.
  Second person is implicit (instructions, not marketing): *"Hover to glimpse ·
  click to pin · search or slide the ages."*
- **Blurbs are one line of storytelling**, not data: *"Horse-archers who checked
  the legions of Rome."*, *"Six centuries astride three continents."*
- **Loading & errors stay in character:** *"UNROLLING THE MAP…"*,
  *"The map was lost to the sands… (failed to load geography)"*.
- **Casing:** Title Case for names of things (Cinzel), UPPERCASE for tiny
  crimson labels (kind chips, legend headings), sentence case + italic for asides.
- **Separators:** the interpunct `·` joins phrases; em-dashes are rare.
- **No emoji.** Ornamental unicode instead: `✦` (flourish), `▶` / `❚❚` (play/pause),
  `✕` (close), `↗` (outbound link), `A−` / `A+` (text size).
- Dates read as eras: *"c. 1600–1180 BC"*, *"1299–1922 AD"*.

## Visual foundations

- **Colour:** paper ramp `--paper-0…8` for all surfaces; ink browns for text;
  three accents — `--gold` (era text), `--gilt` (hover/selection fill),
  `--crimson` (labels, links, routes, focus). Nine muted `--era-*` colours for
  categorical data (assigned so adjacent items never share a hue).
- **Type:** Cinzel (display: titles, buttons, labels, proper names) +
  IM Fell English (body prose, italic asides). Nothing else. Uppercase labels get
  0.12–0.16em tracking; the hero title gets relief via `--text-shadow-hero`.
  All sizes in **rem** — the app scales the root font 0.75–1.5× (A− / A+).
- **Backgrounds:** the page is `--surface-page` (radial parchment glow) inside a
  `--night` letterbox, with a `--vignette` inset shadow and a film-grain overlay
  (`assets/textures/grain.svg` at `opacity:0.10; mix-blend-mode:multiply`).
  Cards/bars use the 135° paper gradients `--surface-note` / `--surface-panel`,
  often at 0.94 alpha over the map.
- **Corners:** square. `border-radius: 0` everywhere except perfect circles
  (icon buttons, marker dots). No pill shapes.
- **Borders do the framing:** 1px aged-brass lines (`--border-card`), 3px double
  brass for drawers (`--border-panel`), dotted crimson underlines for inline links.
- **Shadows are warm umber** (`rgba(30,16,6,…)`), directional (down-right),
  never grey, never glowing.
- **Paper is never straight:** tooltips tilt `--tilt-note` (−0.6°), photo frames
  `--tilt-frame` (−0.5°).
- **Imagery:** every photo passes through `--filter-sepia` and sits in a
  white-matted `PhotoFrame` with a brass border — a field photograph, never a
  bare `<img>`. Use striped placeholders when no photo exists.
- **Hover:** gold washes (`--surface-hover`) or `--gilt` fills, borders sharpen to
  visible; 0.12–0.18s ease transitions. **Selected:** crimson wash
  (`--surface-selected`) + 3px crimson left rule. No transforms on press.
- **Motion:** quick opacity/background fades; one slow drawer slide
  (`--speed-drawer` + `--ease-drawer`); tooltips rise 6px as they fade in; the
  only loop is the marker-ring pulse (`ds-pulse`, 1.9s). Respect
  `prefers-reduced-motion`.
- **Scrollbars are styled** (`tokens/scrollbars.css`): a recessed parchment
  groove with an aged-brass thumb, ink border, worn top highlight; gold when
  dragged. Ships globally with `styles.css`.
- **Layout:** full-bleed map stage; chrome floats over it in fixed corners
  (search top-left, legend bottom-left, timeline bottom-center, drawer right).
  Panels are translucent paper (0.94–0.96 alpha), not blurred — no backdrop-blur.

## Iconography

No icon font and no logo were provided — **do not invent either**; set the brand
name in Cinzel where a mark would go. Icons are ornamental unicode glyphs
(`✦ ▶ ❚❚ ✕ ↗ ·`) plus two tiny decorative SVGs copied from the app:
`assets/textures/rule-compass.svg` (header divider) and
`assets/textures/grain.svg` (film grain). Data marks are drawn primitives:
13px bordered squares (swatches), pulsing circles (capitals), 5-5 dashed crimson
lines (routes).

## Index

- `styles.css` — global entry; `@import`s everything under `tokens/`.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css`,
  `scrollbars.css`, `base.css`.
- `guidelines/` — foundation specimen cards (Design System tab).
- `components/`
  - `actions/` — `Button`, `IconButton`, `LinkChip`
  - `forms/` — `SearchField`, `RangeSlider`
  - `surfaces/` — `ParchmentCard`, `TornNote`, `PhotoFrame`, `Rule`
  - `display/` — `Badge`, `Swatch`, `LegendRow`, `EmpireRow`
- `ui_kits/atlas/` — the full working app (ground truth), self-contained apart
  from D3/topojson CDN scripts.
- `assets/textures/` — grain + compass-rule SVGs.
- `SKILL.md` — agent entry point.

### Intentional additions

- `tokens/scrollbars.css` — styled scrollbars (explicit user request; the source
  app used browser defaults).
- Component set — the app is vanilla JS with de-facto patterns, not React
  components; the React primitives here are faithful extractions of those
  patterns (timeline buttons, search field, tooltip, legend rows, etc.).

### Caveats

- Fonts load from Google Fonts CDN (`Cinzel`, `IM Fell English`) — no font
  binaries were provided.
- No logo exists in the source; none was created.
