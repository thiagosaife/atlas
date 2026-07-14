/**
 * Core vocabulary of the atlas. Pure types — no DOM, no d3, no I/O.
 * Everything else in the app is built on these.
 */

/** Stable, unique, kebab-less slug for an empire. Never change one: it is the translation key. */
export type EmpireId = string;

/** A year on the atlas timeline. Negative = BC. There is no year 0 in the data. */
export type Year = number;

/** A modern country name, exactly as it appears in `countries-110m.json` (`properties.name`). */
export type CountryName = string;

/** `[longitude, latitude]` — GeoJSON order, not lat/lng. */
export type Coords = readonly [number, number];

export interface Capital {
  /** English name; translations live in the locale files. */
  readonly name: string;
  readonly coords: Coords;
}

/**
 * One empire, as authored by a data contributor.
 *
 * Canonical text is **English**; other languages are supplied separately in
 * `src/i18n/locales/empires.<locale>.ts` and fall back to these fields.
 *
 * Note there is no `era` string: the era label is derived from `start`/`end`/`circa`
 * and formatted per locale, so it never needs translating or maintaining.
 */
export interface Empire {
  readonly id: EmpireId;
  readonly name: string;
  /** Negative = BC. */
  readonly start: Year;
  readonly end: Year;
  /** Dates are approximate — renders as "c. 1600–1180 BC" / "v. 1600–1180 av. J.-C." */
  readonly circa?: boolean;
  /** One line of storytelling, not data. */
  readonly blurb: string;
  readonly capital: Capital;
  /** Modern countries the empire's reach roughly covered. */
  readonly territory: readonly CountryName[];
  /** English Wikipedia article title. Defaults to `name`. */
  readonly wiki?: string;
  /** Article whose lead image best evokes the empire (a monument, not a flag). */
  readonly imageWiki?: string;
}

/** An empire with all text resolved for the active locale, ready to render. */
export interface LocalizedEmpire {
  readonly id: EmpireId;
  readonly name: string;
  readonly blurb: string;
  readonly capitalName: string;
  readonly capitalCoords: Coords;
  /** Formatted for the active locale, e.g. "1299–1922 AD" / "1299–1922 apr. J.-C." */
  readonly era: string;
  readonly start: Year;
  readonly end: Year;
  readonly territory: readonly CountryName[];
  /** Countries as displayed in the active locale, sorted. */
  readonly territoryLabels: readonly string[];
  readonly wiki: string;
  readonly imageWiki: string | null;
  readonly source: Empire;
}
