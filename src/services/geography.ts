/**
 * Geography: load the world topology and derive what the domain needs from it.
 *
 * The topology is a static asset (not bundled) so it can be cached separately
 * from the app code, and so contributors can swap in a finer resolution without
 * touching the build.
 */
import { feature, neighbors } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";
import type { Adjacency } from "@domain/atlas";
import type { CountryName } from "@domain/types";

export interface CountryProps {
  readonly name: CountryName;
}

export interface World {
  readonly countries: FeatureCollection<Geometry, CountryProps>;
  /** Which countries share a land border — the basis of the era map-colouring. */
  readonly adjacency: Adjacency;
  readonly names: ReadonlySet<CountryName>;
}

type WorldTopology = Topology<{ countries: GeometryCollection<CountryProps> }>;

export async function loadWorld(url: string): Promise<World> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`geography ${res.status} from ${url}`);
  const topology = (await res.json()) as WorldTopology;

  const collection = feature(topology, topology.objects.countries) as FeatureCollection<
    Geometry,
    CountryProps
  >;

  const geometries = topology.objects.countries.geometries;
  const nbrs = neighbors(geometries);
  const adjacency = new Map<CountryName, ReadonlySet<CountryName>>();
  const names = new Set<CountryName>();

  // topojson types geometry properties as `{} | P`, so narrow explicitly.
  const nameOf = (i: number): CountryName | undefined =>
    (geometries[i]?.properties as CountryProps | undefined)?.name;

  geometries.forEach((_g, i) => {
    const name = nameOf(i);
    if (!name) return;
    names.add(name);
    const touching = new Set<CountryName>();
    for (const j of nbrs[i] ?? []) {
      const other = nameOf(j);
      if (other) touching.add(other);
    }
    adjacency.set(name, touching);
  });

  return { countries: collection, adjacency, names };
}
