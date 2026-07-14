/**
 * Build the relief layer:  node scripts/prep-relief.mjs
 *
 * Source: Natural Earth 50m "geography regions" (public domain), the same family
 * the country borders come from. We keep only the mountain ranges and plateaus —
 * the Andes, the Himalayas, the Zagros, the Atlas — and throw away the rest
 * (islands, coasts, deltas, and the Antarctic ranges, which would carpet the
 * bottom of the sheet in hachure to no purpose).
 *
 * The geometry is then rounded to 1 decimal place (~11 km) and stripped of the
 * points that collapse onto each other as a result — which is what keeps the
 * asset small. These regions are a hachured *texture*, not a border: nobody can
 * tell where the Andes "end" to the nearest kilometre, and at 2dp the file was
 * larger than the entire application bundle.
 *
 * Run this only when you want to refresh the data; the output is committed.
 */
import { writeFileSync } from "node:fs";

/** Degrees of precision kept. 1 → ~11 km, plenty for a hachure boundary. */
const DP = 10;
/** Regions smaller than this (square degrees) vanish at world scale anyway. */
const MIN_AREA = 1.2;

const SRC =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_geography_regions_polys.geojson";

const KEEP = new Set(["Range/mtn", "Plateau"]);

console.log("fetching Natural Earth 50m geography regions…");
const res = await fetch(SRC);
if (!res.ok) throw new Error(`natural earth ${res.status}`);
const raw = await res.json();

/** Shoelace area, in square degrees — good enough to spot specks. */
const area = (ring) => {
  let a = 0;
  for (let i = 0, n = ring.length - 1; i < n; i++) {
    a += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1];
  }
  return Math.abs(a / 2);
};

/** Round to DP and drop points that land on their predecessor. */
const thin = (ring) => {
  const out = [];
  let last = null;
  for (const [lng, lat] of ring) {
    const p = [Math.round(lng * DP) / DP, Math.round(lat * DP) / DP];
    if (last && p[0] === last[0] && p[1] === last[1]) continue;
    out.push(p);
    last = p;
  }
  if (out.length < 4) return null; // a ring needs 4 points (first == last)
  const [fx, fy] = out[0];
  const [lx, ly] = out[out.length - 1];
  if (fx !== lx || fy !== ly) out.push([fx, fy]);
  return out.length >= 4 ? out : null;
};

const thinGeometry = (geom) => {
  // only the outer ring matters: a hachure fill has no use for the holes
  const poly = (rings) => {
    const outer = thin(rings[0]);
    return outer && area(outer) >= MIN_AREA ? [outer] : null;
  };
  if (geom.type === "Polygon") {
    const p = poly(geom.coordinates);
    return p ? { type: "Polygon", coordinates: p } : null;
  }
  if (geom.type === "MultiPolygon") {
    const polys = geom.coordinates.map(poly).filter(Boolean);
    return polys.length ? { type: "MultiPolygon", coordinates: polys } : null;
  }
  return null;
};

const features = [];
for (const f of raw.features) {
  const p = f.properties;
  if (!KEEP.has(p.FEATURECLA)) continue;
  if (p.REGION === "Antarctica") continue; // would carpet the sheet for nothing

  const geometry = thinGeometry(f.geometry);
  if (!geometry) continue;

  features.push({
    type: "Feature",
    properties: {
      name: p.NAME,
      // the ranges are named in French too, should we ever label them
      nameFr: p.NAME_FR ?? p.NAME,
      // "mtn" hatches; "plateau" stipples — they read differently on paper
      kind: p.FEATURECLA === "Plateau" ? "plateau" : "mtn",
    },
    geometry,
  });
}

const out = { type: "FeatureCollection", features };
const json = JSON.stringify(out);
writeFileSync(new URL("../public/relief-50m.json", import.meta.url), json);

const mtn = features.filter((f) => f.properties.kind === "mtn").length;
console.log(
  `wrote public/relief-50m.json — ${features.length} regions ` +
    `(${mtn} ranges, ${features.length - mtn} plateaus), ${(json.length / 1024).toFixed(0)} kB`,
);
