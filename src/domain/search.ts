/**
 * Search over empires, lands, years, and the people who ruled them.
 *
 * Matches against the *localized* labels (so "Empire ottoman" is findable in
 * French) and is accent- and case-insensitive, so "mesopotamie" finds
 * "Mésopotamie". An empire is also found by its notable figures — "Alexander"
 * finds Macedon, "Lenin" the USSR — and the matched person is shown as the
 * reason. A query that reads as a year ("1200 BC", "1200 av. J.-C.") offers to
 * jump the timeline there.
 */
import type { CountryName, EmpireId, LocalizedEmpire, Year } from "./types";
import { FIRST_YEAR, LAST_YEAR, type EraWords } from "./era";

export type SearchHit =
  | { readonly kind: "year"; readonly year: Year; readonly label: string; readonly meta: string }
  | { readonly kind: "empire"; readonly id: EmpireId; readonly label: string; readonly meta: string }
  | { readonly kind: "land"; readonly country: CountryName; readonly label: string; readonly meta: string };

/** Lowercase and strip diacritics: "Mésopotamie" → "mesopotamie". */
export const fold = (s: string): string =>
  s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

/**
 * Read a query as a year, in either language.
 *
 * "-1200" · "1200 BC" · "1200bc" · "1200 av. J.-C."  → [-1200]
 * "753 AD" · "753 apr. J.-C."                        → [753]
 * "1200"                                             → [1200, -1200]
 *
 * A bare number is genuinely ambiguous on an atlas that spans both sides of
 * the epoch, so we offer both readings rather than guessing — out-of-range
 * ones drop out on their own (there is no 3000 AD, so "3000" means 3000 BC).
 */
export function parseYears(text: string, words: EraWords): Year[] {
  const m = fold(text).trim().match(/^(-)?\s*(\d{1,4})\s*(.*)$/);
  if (!m) return [];

  const [, negative, digits, tail = ""] = m;
  const magnitude = Number(digits);
  if (!magnitude) return []; // there is no year zero

  // "av. j.-c." → "avjc", "bc" → "bc", "apr. j.-c." → "aprjc"
  const suffix = tail.replace(/[^a-z]/g, "");
  const letters = (s: string): string => fold(s).replace(/[^a-z]/g, "");
  // Accept the locale's own words *and* BC/AD, which read universally — a French
  // visitor typing "1200 BC" means exactly what they appear to mean.
  const bcWords = [letters(words.bc), "bc"]; // ["avjc", "bc"]
  const adWords = [letters(words.ad), "ad"]; // ["aprjc", "ad"]

  const matches = (candidates: string[]): boolean =>
    suffix !== "" && candidates.some((w) => w.startsWith(suffix));

  const saysBC = negative === "-" || matches(bcWords);
  const saysAD = matches(adWords);
  // a suffix we can't read at all ("1200 zz") is not a year query
  if (suffix !== "" && !saysBC && !saysAD) return [];

  const inRange = (y: Year): boolean => y >= FIRST_YEAR && y <= LAST_YEAR;
  if (saysBC) return [-magnitude].filter(inRange);
  if (saysAD) return [magnitude].filter(inRange);
  return [magnitude, -magnitude].filter(inRange); // bare number: offer both
}

export interface SearchIndex {
  query(text: string): readonly SearchHit[];
}

export interface LandEntry {
  readonly country: CountryName;
  readonly label: string;
  readonly rulerCount: number;
}

/** Everything the year branch needs to describe a moment in time. */
export interface YearLookup {
  readonly words: EraWords;
  format(year: Year): string;
  /** How many realms stood in that year — shown as the hit's subtitle. */
  realmsAt(year: Year): number;
  meta(realms: number): string;
}

const MAX_EMPIRES = 8;
const MAX_LANDS = 5;

export function createSearchIndex(
  empires: readonly LocalizedEmpire[],
  lands: readonly LandEntry[],
  landMeta: (count: number) => string,
  years: YearLookup,
): SearchIndex {
  // Precompute folded keys once per locale change, not once per keystroke. Each
  // empire also carries its figures — the localized ones and the English ones,
  // deduped by folded key — so "Napoléon" and "Napoleon" both land, whichever
  // language you are in, and the matched name is shown as the reason.
  const empireKeys = empires.map((e) => {
    const figures = new Map<string, string>(); // folded key -> display label
    for (const f of e.figures) figures.set(fold(f), f);
    for (const f of e.source.figures ?? []) {
      const k = fold(f);
      if (!figures.has(k)) figures.set(k, f);
    }
    return {
      e,
      key: fold(e.name),
      figures: [...figures].map(([key, label]) => ({ key, label })),
    };
  });
  const landKeys = lands.map((l) => ({ l, key: fold(l.label) }));

  return {
    query(text) {
      const q = fold(text.trim());
      if (!q) return [];

      const hits: SearchHit[] = [];

      // Years come first: a numeric query can't match a name anyway.
      for (const year of parseYears(text, years.words)) {
        hits.push({
          kind: "year",
          year,
          label: years.format(year),
          meta: years.meta(years.realmsAt(year)),
        });
      }

      let empireCount = 0;
      for (const { e, key, figures } of empireKeys) {
        // the era is the subtitle for a name match; for a figure match it is the
        // person, so the row explains why the empire came up
        let meta: string | null = null;
        if (key.includes(q)) {
          meta = e.era;
        } else {
          meta = figures.find((f) => f.key.includes(q))?.label ?? null;
        }
        if (meta === null) continue;
        hits.push({ kind: "empire", id: e.id, label: e.name, meta });
        if (++empireCount >= MAX_EMPIRES) break;
      }

      let landCount = 0;
      for (const { l, key } of landKeys) {
        if (!key.includes(q)) continue;
        hits.push({
          kind: "land",
          country: l.country,
          label: l.label,
          meta: landMeta(l.rulerCount),
        });
        if (++landCount >= MAX_LANDS) break;
      }

      return hits;
    },
  };
}
