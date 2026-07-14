/**
 * Time: what "active in year Y" means, and how a span of years reads in prose.
 *
 * Era labels are *derived*, never stored — which is why adding an empire needs
 * only two numbers, and why no era string ever needs translating.
 */
import type { Empire, Year } from "./types";

/** The atlas spans the invention of cities to the present. */
export const FIRST_YEAR: Year = -4500;
export const LAST_YEAR: Year = 2000;
/** Slider granularity, and the step the playback advances by. */
export const YEAR_STEP = 25;

export interface EraWords {
  /** "BC" / "av. J.-C." */
  readonly bc: string;
  /** "AD" / "apr. J.-C." */
  readonly ad: string;
  /** "c. " / "v. " — the approximation prefix. */
  readonly circa: string;
}

export const clampYear = (y: Year): Year =>
  Math.max(FIRST_YEAR, Math.min(LAST_YEAR, y));

export const isActiveAt = (e: Empire, y: Year): boolean => y >= e.start && y <= e.end;

/** The midpoint of an empire's span — where the timeline lands when you reveal it. */
export const midEra = (e: Empire): Year => Math.round((e.start + e.end) / 2);

/** A single year: `-206 → "206 BC"`, `220 → "220 AD"`. There is no year zero. */
export function formatYear(y: Year, w: EraWords): string {
  if (y === 0) return `1 ${w.ad}`;
  return y < 0 ? `${Math.abs(y)} ${w.bc}` : `${y} ${w.ad}`;
}

/**
 * A span, collapsing the era suffix when both ends share one:
 *   -1600..-1180 circa → "c. 1600–1180 BC"
 *    1299..1922        → "1299–1922 AD"
 *    -206..220         → "206 BC–220 AD"
 */
export function formatEra(e: Pick<Empire, "start" | "end" | "circa">, w: EraWords): string {
  const c = e.circa ? w.circa : "";
  if (e.start < 0 && e.end < 0) return `${c}${-e.start}–${-e.end} ${w.bc}`;
  if (e.start >= 0 && e.end >= 0) return `${c}${e.start}–${e.end} ${w.ad}`;
  return `${c}${-e.start} ${w.bc}–${e.end} ${w.ad}`;
}
