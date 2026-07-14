/**
 * The Atlas: the empire catalogue turned into the indexes the app actually queries.
 *
 * Built once at startup from (a) the empire data and (b) the country adjacency
 * graph read off the topology. Pure — hand it plain objects and it stays testable.
 */
import type { CountryName, Empire, EmpireId, Year } from "./types";
import { isActiveAt } from "./era";

/** country → the countries sharing a land border with it. */
export type Adjacency = ReadonlyMap<CountryName, ReadonlySet<CountryName>>;

export interface Atlas {
  readonly empires: readonly Empire[];
  byId(id: EmpireId): Empire | undefined;
  /** Every empire that ever ruled this land, oldest first. */
  rulersOf(country: CountryName): readonly Empire[];
  /** Lands with at least one recorded empire. */
  readonly chartedLands: ReadonlySet<CountryName>;
  territoryOf(id: EmpireId): ReadonlySet<CountryName>;
  activeAt(year: Year): readonly Empire[];
  /** Do two empires touch — sharing a land, or via a shared border between their lands? */
  areAdjacent(a: Empire, b: Empire): boolean;
  /**
   * Among the empires covering a land, the one that "owns" its colour: the most
   * specific (smallest) realm, tie-broken by the later foundation. Without this a
   * sprawling empire would swallow the smaller ones sitting inside it.
   */
  dominantIn(country: CountryName, among: readonly Empire[]): Empire | null;
}

export function createAtlas(empires: readonly Empire[], adjacency: Adjacency): Atlas {
  const byId = new Map<EmpireId, Empire>();
  const territories = new Map<EmpireId, ReadonlySet<CountryName>>();
  const rulers = new Map<CountryName, Empire[]>();
  const charted = new Set<CountryName>();

  for (const e of empires) {
    byId.set(e.id, e);
    territories.set(e.id, new Set(e.territory));
    for (const c of e.territory) {
      charted.add(c);
      let list = rulers.get(c);
      if (!list) rulers.set(c, (list = []));
      list.push(e);
    }
  }
  for (const list of rulers.values()) list.sort((a, b) => a.start - b.start);

  const EMPTY: readonly Empire[] = [];
  const EMPTY_SET: ReadonlySet<CountryName> = new Set();

  const areAdjacent = (a: Empire, b: Empire): boolean => {
    const bLands = territories.get(b.id) ?? EMPTY_SET;
    for (const c of a.territory) if (bLands.has(c)) return true;
    for (const c of a.territory) {
      const neighbours = adjacency.get(c);
      if (!neighbours) continue;
      for (const n of neighbours) if (bLands.has(n)) return true;
    }
    return false;
  };

  return {
    empires,
    byId: (id) => byId.get(id),
    rulersOf: (country) => rulers.get(country) ?? EMPTY,
    chartedLands: charted,
    territoryOf: (id) => territories.get(id) ?? EMPTY_SET,
    activeAt: (year) => empires.filter((e) => isActiveAt(e, year)),
    areAdjacent,
    dominantIn(country, among) {
      let best: Empire | null = null;
      for (const e of among) {
        if (!(territories.get(e.id) ?? EMPTY_SET).has(country)) continue;
        if (
          !best ||
          e.territory.length < best.territory.length ||
          (e.territory.length === best.territory.length && e.start > best.start)
        ) {
          best = e;
        }
      }
      return best;
    },
  };
}
