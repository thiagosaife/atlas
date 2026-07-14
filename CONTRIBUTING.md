# Contributing

Most contributions to this atlas are **data**: another empire, a better blurb, a
translation. You should not need to touch the map, the timeline, or any TypeScript
beyond a single data file.

```bash
npm install
npm run dev        # http://localhost:5173
npm run validate   # checks the catalogue — run this before opening a PR
```

---

## Adding an empire

Empires live in `src/data/empires/`, one file per region. Open the region your
empire belongs to and add an object to the array:

```ts
{
  id: "khmer",                       // unique, lowercase; this is the translation key — never change it
  name: "Khmer Empire",              // English is canonical
  start: 802,                        // negative = BC. There is no year 0.
  end: 1431,
  circa: true,                       // optional — renders "c. 802–1431 AD"
  blurb: "Angkor Wat and a hydraulic city of a million souls.",
  capital: { name: "Angkor", coords: [103.87, 13.41] },   // [longitude, latitude] — GeoJSON order!
  territory: ["Cambodia", "Thailand", "Laos", "Vietnam"],
  wiki: "Khmer Empire",              // optional — defaults to `name`
  imageWiki: "Angkor Wat",           // optional — see "Imagery" below
}
```

Then run `npm run validate`. It will tell you, in plain terms, if anything is wrong.

### The rules, and why they exist

| Field | Rule | Why |
|---|---|---|
| `id` | unique, lowercase alphanumeric | It keys every translation. Renaming one silently orphans its French text. |
| `start` / `end` | integers, `start < end`, within 4500 BC–2000 AD | They drive the timeline and the era label. |
| `territory` | names **exactly** as in `public/countries-110m.json` | This is the one that bites. A typo doesn't crash — the empire just never appears on the map. The validator catches it. |
| `capital.coords` | `[longitude, latitude]` | GeoJSON order, not the `lat, lng` you get from Google Maps. The validator flags obvious swaps. |
| `blurb` | one line of storytelling, under ~120 chars | It's a field note, not a Wikipedia summary: *"Horse-archers who checked the legions of Rome."* |

**There is no `era` field.** The label ("c. 1600–1180 BC") is derived from
`start`/`end`/`circa` and formatted per language — so it never needs writing,
maintaining, or translating.

### Territories are approximate

Historical frontiers don't align with modern borders, and this atlas paints
modern ones. List the present-day countries an empire's reach *roughly* covered.
Judgement calls are fine; wild ones will get discussed in review.

### Imagery

`imageWiki` names the Wikipedia article whose **lead image** best evokes the
empire — prefer a monument to a flag or a map. The Inca get `"Machu Picchu"`,
Babylon gets `"Ishtar Gate"`. Check the article actually has a lead image; a few
(like `Persepolis`) don't, and the app will silently fall back.

---

## Translating

English is canonical and lives in the empire records. Every other language is a
set of **overrides**, so a missing translation is never a broken app — it just
falls back to English.

- **Interface strings:** `src/i18n/locales/<locale>/ui.ts`. Implements `UiStrings`,
  so TypeScript tells you exactly what's missing.
- **Empire names, blurbs, capitals:** `src/i18n/locales/<locale>/empires.ts`,
  keyed by empire `id`. Every field is optional.
- **Country names:** `src/i18n/locales/<locale>/countries.ts`, keyed by the
  canonical English name from the topology.

`npm run validate` lists any empire or country missing a translation as a
**warning** — useful as a to-do list, never a blocker.

```ts
// src/i18n/locales/fr/empires.ts
khmer: {
  name: "Empire khmer",
  blurb: "Angkor Vat et une cité hydraulique d'un million d'âmes.",
  capital: "Angkor",
  wiki: "Empire khmer",   // links & summaries then come from fr.wikipedia.org
},
```

### Adding a new language

1. Add the code to `LOCALES` in `src/i18n/types.ts`.
2. Create `src/i18n/locales/<code>/` with `ui.ts`, `empires.ts`, `countries.ts`,
   and an `index.ts` exporting the bundle.
3. Register it in `BUNDLES` in `src/i18n/index.ts`.

The language picker, the `?lang=` URL parameter, and browser-language detection
all pick it up automatically.

---

## Architecture, briefly

The layers only point downward — the UI knows the domain, the domain knows nothing
about the DOM:

```
src/
  domain/     pure logic & types — era maths, map-colouring, search, the Atlas index
  data/       ★ the empire catalogue (+ its schema). Where most PRs land.
  i18n/       locales; resolves an Empire into a LocalizedEmpire
  services/   the outside world — topology loading, Wikipedia
  state/      one small observable store
  ui/         d3 map + views. The only code that touches the DOM.
  main.ts     composition root: wires the layers, owns the render loop
```

`npm run build` runs `validate` and a strict `tsc` before it bundles, so broken
data cannot reach `main` — and the deploy workflow runs the same command.
