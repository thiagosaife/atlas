/**
 * The i18n runtime.
 *
 * Resolves the active locale (URL ?lang → saved choice → browser → English),
 * and turns raw `Empire` records into `LocalizedEmpire`s with every string
 * ready to render. Missing translations fall back to English, field by field,
 * so a partially-translated locale degrades gracefully instead of showing blanks.
 */
import type { CountryName, Empire, LocalizedEmpire } from "@domain/types";
import { formatEra } from "@domain/era";
import { en } from "./locales/en";
import { fr } from "./locales/fr";
import { DEFAULT_LOCALE, isLocale, type Locale, type LocaleBundle, type UiStrings } from "./types";

export type { Locale, UiStrings } from "./types";
export { LOCALES } from "./types";

const BUNDLES: Record<Locale, LocaleBundle> = { en, fr };
const STORAGE_KEY = "atlas-locale";

/** URL wins (shareable links), then the saved choice, then the browser, then English. */
export function resolveLocale(): Locale {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (isLocale(fromUrl)) return fromUrl;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    /* storage blocked — fall through */
  }

  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag?.split("-")[0];
    if (isLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}

export function persistLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* storage blocked — the URL still carries the choice */
  }
}

export class Translator {
  readonly locale: Locale;
  readonly ui: UiStrings;
  private readonly bundle: LocaleBundle;

  constructor(locale: Locale) {
    this.locale = locale;
    this.bundle = BUNDLES[locale];
    this.ui = this.bundle.ui;
  }

  /** A modern country, in the active locale. Falls back to its canonical English name. */
  country(name: CountryName): string {
    return this.bundle.countries[name] ?? name;
  }

  /** Resolve every string on an empire for the active locale. */
  empire(e: Empire): LocalizedEmpire {
    const t = this.bundle.empires[e.id];
    const wikiTitle = t?.wiki ?? e.wiki ?? e.name;
    return {
      id: e.id,
      name: t?.name ?? e.name,
      blurb: t?.blurb ?? e.blurb,
      capitalName: t?.capital ?? e.capital.name,
      capitalCoords: e.capital.coords,
      era: formatEra(e, this.ui.era),
      start: e.start,
      end: e.end,
      territory: e.territory,
      territoryLabels: e.territory
        .map((c) => this.country(c))
        .sort((a, b) => a.localeCompare(b, this.ui.htmlLang)),
      wiki: wikiTitle,
      imageWiki: e.imageWiki ?? null,
      source: e,
    };
  }

  /**
   * Wikipedia link for the active locale. `wiki` in a translation names the
   * article in that language; without one we link the English article, which
   * always exists.
   */
  wikiUrl(e: LocalizedEmpire): string {
    const hasLocalArticle = this.bundle.empires[e.id]?.wiki !== undefined;
    const lang = hasLocalArticle ? this.locale : "en";
    const title = hasLocalArticle ? e.wiki : (e.source.wiki ?? e.source.name);
    return `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}`;
  }

  /** Britannica has no French edition — always the English search. */
  britannicaUrl(e: LocalizedEmpire): string {
    return `https://www.britannica.com/search?query=${encodeURIComponent(e.source.name)}`;
  }

  /**
   * Article title to pull the summary/image from. The REST summary API is
   * per-language; we ask the locale's Wikipedia when it has the article.
   */
  wikiApi(e: LocalizedEmpire): { lang: string; title: string; imageTitle: string | null } {
    const local = this.bundle.empires[e.id]?.wiki;
    return {
      lang: local ? this.locale : "en",
      title: local ?? e.source.wiki ?? e.source.name,
      // Curated monument articles are English titles — always fetched from en.
      imageTitle: e.imageWiki,
    };
  }
}
