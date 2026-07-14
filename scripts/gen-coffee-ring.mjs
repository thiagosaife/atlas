/**
 * Generate the coffee-ring SVG:  node scripts/gen-coffee-ring.mjs
 *
 * Modelled on a real photographed ring: a closed, roughly circular rim of fairly
 * even weight in translucent amber — not a lopsided crescent. Its character comes
 * from four things, none of which is "being wonky":
 *
 *   1. a fat blob where a bead of coffee pooled and bulged INWARD into the clean
 *      centre (upper right), plus smaller inward swells elsewhere
 *   2. thin light SLITS where the drying rim split into concentric bands, so clean
 *      paper shows through the middle of the stroke
 *   3. a darker contour where the liquid's edge pinned and dried densest
 *   4. a chunky satellite blob flung clear of the cup
 *
 * The slits are cut with a mask: transparent under `multiply` is exactly "clean
 * paper", which is what they are.
 *
 * Deterministic (fixed seed), so the stain never changes between builds.
 */
import { writeFileSync } from "node:fs";

let seed = 20260714;
const rnd = () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

const TAU = Math.PI * 2;
const VB = 220; // viewBox — roomy enough for the satellite
const C = 110; // centre
const R = 70; // centreline radius
const N = 128;

// SVG angles: 0 = 3 o'clock, y grows downward, so the upper half is ~π…2π.
const UPPER_RIGHT = 5.45;
const UPPER_LEFT = 3.95;

const octaves = [2, 3, 5, 9].map((freq, i) => ({
  freq,
  amp: [1, 0.55, 0.3, 0.16][i],
  phase: rnd() * TAU,
}));
const noise = (t) =>
  octaves.reduce((s, o) => s + o.amp * Math.sin(o.freq * t + o.phase), 0) /
  octaves.reduce((s, o) => s + o.amp, 0);

const bump = (t, at, width) => {
  let d = Math.abs(t - at);
  d = Math.min(d, TAU - d);
  return Math.exp(-(d * d) / (2 * width * width));
};

/** Swells bulging inward into the clean centre. The big one is the pool. */
const swells = [
  { at: UPPER_RIGHT, width: 0.3, gain: 13 }, // the fat blob
  { at: 3.45, width: 0.2, gain: 5 },
  { at: 1.55, width: 0.16, gain: 3.4 },
  { at: 2.5, width: 0.12, gain: 2.2 },
];
/** Small creeps outward past the rim. */
const creeps = [
  { at: 5.15, width: 0.13, gain: 2.6 },
  { at: 2.2, width: 0.1, gain: 2 },
  { at: 0.75, width: 0.09, gain: 1.6 },
];

const sum = (list, t) => list.reduce((s, g) => s + g.gain * bump(t, g.at, g.width), 0);

// A closed ring of fairly even weight: a gentle wobble, no fat/thin sides.
const thicknessAt = (t) =>
  Math.max(3.4, 7.4 + 0.9 * Math.cos(t - UPPER_RIGHT) + 1.5 * noise(t * 1.3 + 0.7));
const centreAt = (t) =>
  R * (1 + 0.022 * Math.cos(2 * (t - 0.4))) + 1.3 * Math.sin(t + 1.0) + 1.9 * noise(t);

const outerAt = (t) => centreAt(t) + thicknessAt(t) / 2 + sum(creeps, t);
const innerAt = (t) => centreAt(t) - thicknessAt(t) / 2 - sum(swells, t);

const pt = (r, t) => [C + r * Math.cos(t), C + r * Math.sin(t)];
const f = (n) => n.toFixed(1);

/** Closed Catmull-Rom → cubic bezier: a smooth outline, not a faceted polygon. */
function closedPath(points) {
  const n = points.length;
  const at = (i) => points[(i + n) % n];
  let d = `M ${f(at(0)[0])} ${f(at(0)[1])}`;
  for (let i = 0; i < n; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${f(c1[0])} ${f(c1[1])}, ${f(c2[0])} ${f(c2[1])}, ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + " Z";
}

const outer = [];
const inner = [];
for (let i = 0; i < N; i++) {
  const t = (i / N) * TAU;
  outer.push(pt(outerAt(t), t));
  inner.push(pt(innerAt(t), t));
}
inner.reverse(); // opposite winding so even-odd carves the hole
const ringPath = `${closedPath(outer)} ${closedPath(inner)}`;

/** An arc following the rim — used to cut the light slits out of the mask. */
function arc(fromT, toT, radial) {
  const steps = 26;
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = fromT + ((toT - fromT) * i) / steps;
    pts.push(pt(centreAt(t) + radial(t), t));
  }
  return "M " + pts.map(([x, y]) => `${f(x)} ${f(y)}`).join(" L ");
}

// Where the drying rim split into concentric bands, leaving clean paper between.
const slits = [
  { from: 2.72, to: 3.52, off: (t) => -0.5 + 1.0 * Math.sin(t * 3), w: 2.2 },
  { from: -0.24, to: 0.46, off: (t) => 0.7 + 0.8 * Math.sin(t * 4), w: 2.0 },
  { from: 1.0, to: 1.32, off: () => -1.3, w: 1.2 },
];
const slitPaths = slits
  .map(
    (s) =>
      `<path d="${arc(s.from, s.to, s.off)}" stroke="#000" stroke-width="${s.w}" fill="none" stroke-linecap="round"/>`,
  )
  .join("");

// Grounds settled in the rim, heaviest in the pool.
let speckles = "";
for (let i = 0; i < 44; i++) {
  const t = rnd() * TAU;
  const weight = 0.35 + 0.65 * bump(t, UPPER_RIGHT, 0.9);
  const rc = centreAt(t) + (rnd() - 0.5) * thicknessAt(t) * 0.7;
  const [x, y] = pt(rc, t);
  speckles += `<circle cx="${f(x)}" cy="${f(y)}" r="${(0.3 + rnd() * rnd() * 1.5).toFixed(1)}" fill="#8a5a25" opacity="${(0.12 + rnd() * 0.34 * weight).toFixed(2)}"/>`;
}
for (const t of [5.3, 5.6, 5.1]) {
  const [x, y] = pt(centreAt(t) - 2, t);
  speckles += `<circle cx="${f(x)}" cy="${f(y)}" r="${(1.4 + rnd()).toFixed(1)}" fill="#7a4a1c" opacity="${(0.34 + rnd() * 0.2).toFixed(2)}"/>`;
}

/** The satellite: a chunky irregular blob, not a tidy dot. */
const [bx, by] = pt(R + 32, UPPER_LEFT);
const blob = [];
for (let i = 0; i < 26; i++) {
  const t = (i / 26) * TAU;
  const r = 10.5 * (1 + 0.16 * Math.sin(3 * t + 0.8) + 0.1 * Math.sin(5 * t + 2.1));
  blob.push([bx + r * Math.cos(t), by + r * Math.sin(t)]);
}
const blobPath = closedPath(blob);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB} ${VB}" width="${VB}" height="${VB}">
  <defs>
    <!-- Translucent amber, deeper toward the outside where the edge pinned. -->
    <radialGradient id="tone" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#d6a86a"/>
      <stop offset="70%" stop-color="#c69355"/>
      <stop offset="88%" stop-color="#b8823f"/>
      <stop offset="100%" stop-color="#a97331"/>
    </radialGradient>

    <!-- softened, so the slits read as breaks in the drying rim, not drawn lines -->
    <filter id="soften"><feGaussianBlur stdDeviation="0.75"/></filter>
    <mask id="ring-mask">
      <rect width="${VB}" height="${VB}" fill="#fff"/>
      <g filter="url(#soften)">${slitPaths}</g>
    </mask>

    <!-- the wicking edge of a dried liquid is never smooth -->
    <filter id="wick" x="-12%" y="-12%" width="124%" height="124%">
      <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="4" seed="9" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G"/>
    </filter>

    <!-- granular blotching within the rim -->
    <filter id="mottle" x="-12%" y="-12%" width="124%" height="124%">
      <feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves="3" seed="4" result="n"/>
      <feColorMatrix type="saturate" values="0" in="n" result="g"/>
      <feComponentTransfer in="g" result="a"><feFuncA type="linear" slope="0.45"/></feComponentTransfer>
      <feComposite in="a" in2="SourceGraphic" operator="in"/>
    </filter>
  </defs>

  <!-- the faintest film the cup sat in -->
  <circle cx="${C}" cy="${C}" r="${R - 6}" fill="#d9b177" opacity="0.05"/>

  <g mask="url(#ring-mask)" filter="url(#wick)">
    <path d="${ringPath}" fill="url(#tone)" fill-rule="evenodd" opacity="0.95"/>
    <path d="${ringPath}" fill="none" fill-rule="evenodd" stroke="#a5732f" stroke-width="0.8" opacity="0.5"/>
    <path d="${ringPath}" fill="#9c6a2c" fill-rule="evenodd" opacity="0.26" filter="url(#mottle)"/>
    ${speckles}
  </g>

  <g filter="url(#wick)">
    <path d="${blobPath}" fill="url(#tone)" opacity="0.88"/>
    <path d="${blobPath}" fill="none" stroke="#a5732f" stroke-width="0.8" opacity="0.5"/>
    <path d="${blobPath}" fill="#9c6a2c" opacity="0.26" filter="url(#mottle)"/>
    <circle cx="${f(bx - 3.4)}" cy="${f(by + 1.2)}" r="1.7" fill="#7a4a1c" opacity="0.4"/>
    <circle cx="${f(bx + 2.6)}" cy="${f(by - 2.6)}" r="1.2" fill="#7a4a1c" opacity="0.3"/>
  </g>
</svg>
`;

writeFileSync(new URL("../src/assets/coffee-ring.svg", import.meta.url), svg);
console.log(`wrote coffee-ring.svg — ${svg.length} bytes`);
