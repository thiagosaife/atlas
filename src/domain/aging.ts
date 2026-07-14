/**
 * How worn the sheet is at a given moment in history.
 *
 * Scrubbing the timeline ages the chart itself: at the dawn of the atlas the
 * paper is fresh — clean edges, no grime, no stain — and by the present day it
 * has been handled, annotated, spilled on, and singed.
 *
 * The layers arrive in the order a real sheet would acquire them, each easing
 * in over its own stretch of the timeline rather than all fading up together:
 * the paper yellows first, someone scribbles on it, a cup gets set down on it,
 * and only much later does it come near a flame.
 */
import { FIRST_YEAR, LAST_YEAR } from "./era";
import type { Year } from "./types";

export interface Patina {
  /** Yellowing, grime, film grain, the vignette. */
  readonly paper: number;
  /** The pen scribbles a previous owner added. */
  readonly ink: number;
  /** Coffee ring, foxing, fold creases. */
  readonly stain: number;
  /** The charred edge. */
  readonly burn: number;
}

/** A pristine sheet, straight off the press. */
export const FRESH: Patina = { paper: 0, ink: 0, stain: 0, burn: 0 };
/** The sheet as it reaches us — the atlas's resting state. */
export const AGED: Patina = { paper: 1, ink: 1, stain: 1, burn: 1 };

const clamp01 = (x: number): number => Math.max(0, Math.min(1, x));
/** smoothstep — no abrupt starts or stops as a layer fades in */
const ease = (t: number): number => t * t * (3 - 2 * t);
const ramp = (x: number, from: number, to: number): number =>
  ease(clamp01((x - from) / (to - from)));

/**
 * Every layer begins early and creeps in across almost the whole timeline, so the
 * sheet is always *slightly* further gone than it was a moment ago rather than
 * acquiring its wear in discrete stages. They still enter in the order a real
 * sheet would — paper, ink, spill, fire — but the ranges overlap heavily.
 *
 * Note each range ends at or near 1: a layer that finished early would leave the
 * back half of the timeline with nothing left to age.
 */
export function patinaAt(year: Year): Patina {
  const t = clamp01((year - FIRST_YEAR) / (LAST_YEAR - FIRST_YEAR));
  return {
    paper: ramp(t, 0, 0.9),
    ink: ramp(t, 0.12, 0.95),
    stain: ramp(t, 0.28, 1),
    burn: ramp(t, 0.45, 1),
  };
}
