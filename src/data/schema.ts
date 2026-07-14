/**
 * Data integrity rules for the empire catalogue.
 *
 * This is the contract a data contribution must satisfy. It runs in CI
 * (`npm run validate`) so a bad record can never reach the map — a typo'd
 * country name would otherwise fail silently as an empire that simply
 * doesn't paint.
 *
 * Dependency-free on purpose: no zod, no runtime cost in the bundle.
 */
import type { Empire, CountryName } from "@domain/types";
import { FIRST_YEAR, LAST_YEAR } from "@domain/era";

export interface Issue {
  readonly empire: string;
  readonly field: string;
  readonly message: string;
}

export interface ValidateOptions {
  /** Country names present in the world topology. Territories must be a subset. */
  readonly knownCountries: ReadonlySet<CountryName>;
  /** Empire ids that have a translation, per locale. Missing ones are reported. */
  readonly translated?: ReadonlyMap<string, ReadonlySet<string>>;
}

export function validateEmpires(
  empires: readonly Empire[],
  opts: ValidateOptions,
): { errors: Issue[]; warnings: Issue[] } {
  const errors: Issue[] = [];
  const warnings: Issue[] = [];
  const seen = new Set<string>();

  const err = (empire: string, field: string, message: string) =>
    errors.push({ empire, field, message });
  const warn = (empire: string, field: string, message: string) =>
    warnings.push({ empire, field, message });

  for (const e of empires) {
    const at = e.id || e.name || "<unnamed>";

    if (!e.id) err(at, "id", "missing id");
    else if (!/^[a-z][a-z0-9]*$/.test(e.id))
      err(at, "id", `"${e.id}" must be lowercase alphanumeric (it is a translation key)`);
    else if (seen.has(e.id)) err(at, "id", `duplicate id "${e.id}"`);
    seen.add(e.id);

    if (!e.name?.trim()) err(at, "name", "missing name");
    if (!e.blurb?.trim()) err(at, "blurb", "missing blurb");
    else if (e.blurb.length > 120)
      warn(at, "blurb", `${e.blurb.length} chars — blurbs read best under 120`);

    if (!Number.isInteger(e.start)) err(at, "start", "start must be an integer year");
    if (!Number.isInteger(e.end)) err(at, "end", "end must be an integer year");
    if (e.start >= e.end) err(at, "start/end", `start (${e.start}) must precede end (${e.end})`);
    if (e.start < FIRST_YEAR)
      err(at, "start", `${e.start} predates the atlas (${FIRST_YEAR})`);
    if (e.end > LAST_YEAR) err(at, "end", `${e.end} postdates the atlas (${LAST_YEAR})`);
    if (e.start === 0 || e.end === 0) err(at, "start/end", "there is no year zero");

    if (!e.capital?.name?.trim()) err(at, "capital.name", "missing capital name");
    const c = e.capital?.coords;
    if (!c || c.length !== 2) err(at, "capital.coords", "expected [longitude, latitude]");
    else {
      const [lng, lat] = c;
      if (!(lng >= -180 && lng <= 180)) err(at, "capital.coords", `longitude ${lng} out of range`);
      if (!(lat >= -90 && lat <= 90)) err(at, "capital.coords", `latitude ${lat} out of range`);
      // A frequent contributor slip: coords written as [lat, lng].
      if (lat >= -180 && lat < -90) err(at, "capital.coords", "looks like [lat, lng] — GeoJSON is [lng, lat]");
    }

    if (!e.territory?.length) err(at, "territory", "an empire must rule at least one land");
    const dupes = new Set<string>();
    for (const country of e.territory ?? []) {
      if (!opts.knownCountries.has(country))
        err(at, "territory", `"${country}" is not a country in countries-110m.json`);
      if (dupes.has(country)) warn(at, "territory", `"${country}" listed twice`);
      dupes.add(country);
    }
  }

  for (const [locale, ids] of opts.translated ?? []) {
    for (const e of empires) {
      if (!ids.has(e.id)) warn(e.id, `i18n.${locale}`, `no ${locale} translation — falls back to English`);
    }
    for (const id of ids) {
      if (!seen.has(id)) err(id, `i18n.${locale}`, `translation for unknown empire "${id}"`);
    }
  }

  return { errors, warnings };
}
