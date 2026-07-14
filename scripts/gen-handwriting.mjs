/**
 * Generate the pen scribbles:  node scripts/gen-handwriting.mjs
 *
 * These are not text and not a font — they are simulated cursive: a nib dragged
 * across paper. The words are deliberate gibberish, because at the size they
 * render nobody reads them; what has to be convincing is the *hand*, and a
 * webfont always betrays itself by repeating identical glyphs.
 *
 * So we draw the pen's actual path: a baseline that drifts, letters built from
 * arches, loops, ascenders and descenders of varying width, joined in one
 * continuous stroke per word, with the odd i-dot and t-bar. The stroke is laid
 * down in overlapping segments of varying width and opacity, the way a wet nib
 * deposits more ink on the down-strokes than the up.
 *
 * Deterministic (fixed seed): the scribbles never change between builds.
 */
import { writeFileSync } from "node:fs";

let seed = 991773;
const rnd = () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};
const between = (a, b) => a + rnd() * (b - a);
const pick = (arr) => arr[Math.floor(rnd() * arr.length)];

const H = 9; // x-height
const BASE = 26; // baseline y
const f = (n) => n.toFixed(1);

/**
 * One letter's worth of pen movement.
 *
 * Letters are WIDE relative to their height — that ratio is what separates
 * cursive from a zigzag. Each shape ends near the baseline so the next one can
 * pick up from it: cursive means the pen never lifts.
 */
function letter(x, kind) {
  const w = between(9, 14);
  const j = () => between(-0.5, 0.5); // the hand is never quite steady
  const P = (fx, fy) => [x + w * fx, BASE - H * fy + j()];
  switch (kind) {
    case "arch": // n, m, r
      return { points: [P(0.1, 0.2), P(0.25, 0.95), P(0.5, 1.0), P(0.75, 0.5), P(0.95, 0.1)], width: w };
    case "bowl": // a, o, c — round, with an exit stroke
      return {
        points: [P(0.15, 0.5), P(0.32, 1.0), P(0.6, 0.95), P(0.75, 0.45), P(0.66, 0.05), P(0.95, 0.18)],
        width: w,
      };
    case "ascend": // l, h, d — a tall loop above the line
      return {
        points: [P(0.2, 0.4), P(0.4, 2.1), P(0.56, 1.05), P(0.46, 0.35), P(0.82, 0.15)],
        width: w,
      };
    case "descend": // g, y, p — a loop below the line
      return {
        points: [P(0.25, 0.9), P(0.5, 0.1), P(0.56, -1.15), P(0.34, -1.45), P(0.24, -0.85), P(0.9, 0.2)],
        width: w,
      };
    default: // "hump" — u, i, t
      return { points: [P(0.15, 0.9), P(0.3, 0.15), P(0.55, 0.1), P(0.7, 0.9), P(0.92, 0.2)], width: w };
  }
}

// Weighted so rounded shapes dominate; ascenders and descenders are punctuation.
const KINDS = ["arch", "bowl", "hump", "arch", "bowl", "hump", "bowl", "ascend", "arch", "descend"];

/** Catmull-Rom → cubic bezier through an open run of points. */
function smooth(points) {
  if (points.length < 2) return "";
  const at = (i) => points[Math.max(0, Math.min(points.length - 1, i))];
  let d = `M ${f(at(0)[0])} ${f(at(0)[1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${f(c1[0])} ${f(c1[1])}, ${f(c2[0])} ${f(c2[1])}, ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

/** One scribbled line: a few words, drifting off the horizontal as hands do. */
function scribble(wordCount) {
  let x = 6;
  const strokes = [];
  const marks = [];
  const drift = between(-0.035, 0.02); // the line sags or rises

  for (let w = 0; w < wordCount; w++) {
    const letters = Math.floor(between(3, 8));
    const pts = [[x, BASE - H * 0.1 + between(-0.5, 0.5)]];
    const wordStart = x;

    for (let i = 0; i < letters; i++) {
      const { points, width } = letter(x, pick(KINDS));
      // the whole line tilts, so shift every point by the drift at that x
      for (const p of points) pts.push([p[0], p[1] + (p[0] - 6) * drift]);
      x += width;
    }
    // exit flourish off the last letter
    pts.push([x + between(2, 5), BASE - H * between(0.2, 0.6) + (x - 6) * drift]);
    strokes.push(smooth(pts));

    // an i-dot or a t-bar, placed over the word — the marks that sell a hand
    if (rnd() < 0.65) {
      const cx = between(wordStart + 4, x - 4);
      const cy = BASE - H * 1.7 + (cx - 6) * drift;
      if (rnd() < 0.5) {
        marks.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(between(0.5, 0.9))}"/>`);
      } else {
        marks.push(
          `<path d="M ${f(cx - between(3, 5))} ${f(cy + 3)} L ${f(cx + between(3, 5))} ${f(cy + between(1.5, 3))}" stroke-width="0.9" fill="none"/>`,
        );
      }
    }
    x += between(5, 9); // word gap
  }
  return { strokes, marks, width: Math.ceil(x + 6) };
}

const NOTES = [4, 3, 5, 4, 3]; // words per line

NOTES.forEach((words, i) => {
  const { strokes, marks, width } = scribble(words);
  const height = 46;

  // The nib lays ink unevenly: draw each stroke two or three times, slightly
  // offset and at different weights, so the line has body instead of being a
  // uniform hairline.
  const inked = strokes
    .map((d) => {
      const layers = [
        { w: 1.7, o: 0.5, dx: 0, dy: 0 },
        { w: 0.9, o: 0.45, dx: 0.35, dy: 0.3 },
        { w: 0.5, o: 0.3, dx: -0.3, dy: -0.25 },
      ];
      return layers
        .map(
          (l) =>
            `<path d="${d}" transform="translate(${l.dx} ${l.dy})" stroke-width="${l.w}" opacity="${l.o}"/>`,
        )
        .join("");
    })
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <!-- paper tooth: the nib skips and pools as it crosses the grain -->
    <filter id="nib" x="-6%" y="-12%" width="112%" height="124%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${3 + i}" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="0.9" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>
  <g fill="none" stroke="#42331f" stroke-linecap="round" stroke-linejoin="round" filter="url(#nib)">
    ${inked}
    <g stroke="#42331f" fill="#42331f" opacity="0.45">${marks.join("")}</g>
  </g>
</svg>
`;
  writeFileSync(new URL(`../src/assets/note-${i + 1}.svg`, import.meta.url), svg);
  console.log(`note-${i + 1}.svg — ${width}×${height} (aspect ${(width / height).toFixed(2)})`);
});
