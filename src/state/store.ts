/**
 * Application state — one small observable store.
 *
 * The UI never mutates its own view of the world: it dispatches through here and
 * re-renders on notify. Keeps the map, panel, legend, and timeline from drifting
 * out of sync, which is exactly what happened when this was one big closure.
 */
import type { CountryName, EmpireId, Year } from "@domain/types";
import { clampYear, FIRST_YEAR } from "@domain/era";
import type { Locale } from "@i18n/index";

export interface AppState {
  /** Pinned land — the panel lists who ruled it. */
  readonly pinned: CountryName | null;
  /** Revealed empire — its whole territory lights up, the rest recedes. */
  readonly focused: EmpireId | null;
  readonly timelineOn: boolean;
  readonly year: Year;
  readonly playing: boolean;
  readonly locale: Locale;
}

export type Listener = (state: AppState, prev: AppState) => void;

export interface Store {
  get(): AppState;
  subscribe(fn: Listener): () => void;
  pinLand(country: CountryName | null): void;
  focusEmpire(id: EmpireId | null, year?: Year): void;
  setTimeline(on: boolean, year?: Year): void;
  setYear(year: Year): void;
  /** Jump to a moment in time and show it plainly — nothing pinned or revealed. */
  showYear(year: Year): void;
  setPlaying(playing: boolean): void;
  setLocale(locale: Locale): void;
  /** Escape / click-away: back to a clean map. */
  reset(): void;
}

export function createStore(initial: Pick<AppState, "locale">): Store {
  let state: AppState = {
    pinned: null,
    focused: null,
    timelineOn: false,
    year: FIRST_YEAR,
    playing: false,
    locale: initial.locale,
  };
  const listeners = new Set<Listener>();

  const commit = (next: Partial<AppState>): void => {
    const prev = state;
    const merged = { ...state, ...next };
    // Cheap identity check — avoids repainting the map on no-op dispatches.
    let changed = false;
    for (const k of Object.keys(merged) as (keyof AppState)[]) {
      if (merged[k] !== prev[k]) {
        changed = true;
        break;
      }
    }
    if (!changed) return;
    state = merged;
    for (const fn of listeners) fn(state, prev);
  };

  return {
    get: () => state,
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    // Pinning a land and revealing an empire are mutually exclusive views.
    pinLand: (country) => commit({ pinned: country, focused: null }),
    focusEmpire: (id, year) =>
      commit({
        focused: id,
        pinned: null,
        ...(year !== undefined ? { timelineOn: true, year: clampYear(year) } : {}),
      }),
    setTimeline: (on, year) =>
      commit({ timelineOn: on, ...(year !== undefined ? { year: clampYear(year) } : {}) }),
    setYear: (year) => commit({ year: clampYear(year), timelineOn: true }),
    showYear: (year) =>
      commit({ year: clampYear(year), timelineOn: true, focused: null, pinned: null }),
    setPlaying: (playing) => commit({ playing }),
    setLocale: (locale) => commit({ locale }),
    reset: () =>
      commit({ pinned: null, focused: null, timelineOn: false, playing: false }),
  };
}
