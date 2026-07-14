/**
 * Data gate. Runs in CI and before every build.
 *
 * A typo'd country name is the dangerous failure here: it wouldn't crash, the
 * empire would simply never paint. So we check the catalogue against the real
 * topology and refuse to build if anything is off.
 *
 *   npm run validate
 */
import { readFileSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";

import { EMPIRES, REGIONS } from "../src/data/empires/index";
import { validateEmpires } from "../src/data/schema";
import { empires as frEmpires } from "../src/i18n/locales/fr/empires";
import { countries as frCountries } from "../src/i18n/locales/fr/countries";

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

interface Topology {
  objects: { countries: { geometries: { properties?: { name?: string } }[] } };
}

const topology = JSON.parse(
  readFileSync(r("../public/countries-110m.json"), "utf8"),
) as Topology;

const knownCountries = new Set<string>();
for (const g of topology.objects.countries.geometries) {
  if (g.properties?.name) knownCountries.add(g.properties.name);
}

const { errors, warnings } = validateEmpires(EMPIRES, {
  knownCountries,
  translated: new Map([["fr", new Set(Object.keys(frEmpires))]]),
});

// Every land an empire claims should also have a French name.
const claimed = new Set(EMPIRES.flatMap((e) => e.territory));
for (const country of claimed) {
  if (!(country in frCountries)) {
    warnings.push({
      empire: "—",
      field: "i18n.fr.countries",
      message: `"${country}" has no French name — falls back to English`,
    });
  }
}

const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const GREEN = "\x1b[32m";
const DIM = "\x1b[2m";
const OFF = "\x1b[0m";

const regionCounts = Object.entries(REGIONS)
  .map(([k, v]) => `${k} ${v.length}`)
  .join(DIM + " · " + OFF);

console.log(
  `\n  ${EMPIRES.length} empires · ${claimed.size} lands · ${knownCountries.size} countries in topology`,
);
console.log(`  ${DIM}${regionCounts}${OFF}\n`);

for (const w of warnings) {
  console.log(`  ${YELLOW}warn${OFF}  ${w.empire} ${DIM}${w.field}${OFF} — ${w.message}`);
}
for (const e of errors) {
  console.log(`  ${RED}error${OFF} ${e.empire} ${DIM}${e.field}${OFF} — ${e.message}`);
}

if (errors.length) {
  console.log(`\n  ${RED}✕ ${errors.length} error(s)${OFF} — the atlas would not render correctly.\n`);
  process.exit(1);
}

const note = warnings.length ? ` ${DIM}(${warnings.length} warning(s))${OFF}` : "";
console.log(`\n  ${GREEN}✓ the catalogue is sound${OFF}${note}\n`);
