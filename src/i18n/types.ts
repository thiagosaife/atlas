/**
 * i18n contract.
 *
 * English is canonical: the empire records themselves carry the English text.
 * Other locales supply *overrides*, keyed by empire id, and anything missing
 * falls back to English — so a new empire is never blocked on a translator.
 */
import type { CountryName, EmpireId } from "@domain/types";
import type { EraWords } from "@domain/era";

export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const isLocale = (v: unknown): v is Locale =>
  typeof v === "string" && (LOCALES as readonly string[]).includes(v);

/** Per-empire text overrides. Every field optional — omit what you can't translate. */
export interface EmpireTranslation {
  readonly name?: string;
  readonly blurb?: string;
  readonly capital?: string;
  /** Wikipedia article in this language, for the outbound link. */
  readonly wiki?: string;
}

export type EmpireTranslations = Readonly<Partial<Record<EmpireId, EmpireTranslation>>>;

/** Modern country names, keyed by their canonical (English topology) name. */
export type CountryTranslations = Readonly<Partial<Record<CountryName, string>>>;

/** Every string the interface can show. Adding a key here forces every locale to supply it. */
export interface UiStrings {
  readonly appTitle: string;
  readonly tagline: string;
  readonly loading: string;
  readonly loadError: string;

  readonly searchPlaceholder: string;
  readonly searchEmpty: string;
  readonly kindEmpire: string;
  readonly kindLand: string;
  readonly kindYear: string;

  readonly allEras: string;
  readonly clearEras: string;
  readonly play: string;
  readonly pause: string;
  readonly smallerText: string;
  readonly largerText: string;
  readonly close: string;
  readonly language: string;

  readonly capital: string;
  readonly wikipedia: string;
  readonly britannica: string;
  readonly revealEmpire: string;
  readonly pinHint: string;
  readonly footerLegend: string;

  /** Pluralised phrases — implemented per locale, since rules differ. */
  realms(n: number): string;
  empiresRuledHere(n: number): string;
  modernLands(n: number): string;
  empiresCharted(n: number): string;
  moreEmpires(n: number): string;

  /* The pen scribbles carry no text — they are drawn strokes, so there is
     nothing here to translate. See scripts/gen-handwriting.mjs. */

  /** Marginalia printed on the sheet itself — the chart's own annotations. */
  readonly chart: {
    readonly equator: string;
    readonly cancer: string;
    readonly capricorn: string;
    readonly projection: string;
    readonly scale: string;
    readonly sheet: string;
    /** Distance unit for the scale bar. */
    readonly km: string;
  };

  /** How this locale writes eras. */
  readonly era: EraWords;
  /** Locale tag for `Intl` / `lang` attribute. */
  readonly htmlLang: string;
  /** Name of this language, in this language — for the switcher. */
  readonly languageName: string;
}

export interface LocaleBundle {
  readonly ui: UiStrings;
  readonly empires: EmpireTranslations;
  readonly countries: CountryTranslations;
}
