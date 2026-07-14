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
  /** Foxing and fold creases — slow wear, unlike a spill. */
  readonly wear: number;
  /** The first cup. */
  readonly stain1: number;
  /** The second cup, set down centuries later. */
  readonly stain2: number;
  /** The charred edge. */
  readonly burn: number;
}

/** A pristine sheet, straight off the press. */
export const FRESH: Patina = { paper: 0, ink: 0, wear: 0, stain1: 0, stain2: 0, burn: 0 };
/** The sheet as it reaches us. */
export const AGED: Patina = { paper: 1, ink: 1, wear: 1, stain1: 1, stain2: 1, burn: 1 };

const clamp01 = (x: number): number => Math.max(0, Math.min(1, x));
/** smoothstep — no abrupt starts or stops as a layer fades in */
const ease = (t: number): number => t * t * (3 - 2 * t);
const ramp = (x: number, from: number, to: number): number =>
  ease(clamp01((x - from) / (to - from)));

/**
 * A spill is not a process — it is an event. Paper yellows over centuries; a cup
 * gets set down in a second. So the stains switch on at a threshold instead of
 * ramping, and CSS gives them just enough transition to land rather than flicker.
 */
const spill = (x: number, at: number): number => (x >= at ? 1 : 0);

/** When each cup was set down, as a fraction of the timeline. */
const FIRST_CUP = 0.42; // ~1770 BC
const SECOND_CUP = 0.78; // ~570 AD

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
    wear: ramp(t, 0.28, 1),
    stain1: spill(t, FIRST_CUP),
    stain2: spill(t, SECOND_CUP),
    burn: ramp(t, 0.45, 1),
  };
}
