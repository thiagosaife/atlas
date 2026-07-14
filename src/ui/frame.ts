/**
 * A Frame is everything the views need to draw one moment of the atlas.
 *
 * Computed once per state change and handed down, so no view recomputes the
 * colouring or re-resolves translations — and no two views can disagree.
 */
import type { Atlas } from "@domain/atlas";
import type { ColorMap } from "@domain/coloring";
import { assignColors } from "@domain/coloring";
import type { CountryName, Empire, EmpireId, LocalizedEmpire } from "@domain/types";
import type { Translator } from "@i18n/index";
import type { AppState } from "@state/store";

export interface Frame {
  readonly state: AppState;
  readonly t: Translator;
  readonly atlas: Atlas;
  /** Localized view of an empire — memoized for the active locale. */
  loc(id: EmpireId): LocalizedEmpire | undefined;
  /** Empires alive in the current year (empty when the timeline is off). */
  readonly active: readonly Empire[];
  readonly colors: ColorMap;
  /** Lands of the revealed empire, or null when none is revealed. */
  readonly focusTerritory: ReadonlySet<CountryName> | null;
}

/** Localizing 78 empires on every keystroke would be wasteful — cache per locale. */
export class Localizer {
  private cache = new Map<EmpireId, LocalizedEmpire>();
  private locale: string;

  constructor(
    private readonly atlas: Atlas,
    private t: Translator,
  ) {
    this.locale = t.locale;
  }

  retarget(t: Translator): void {
    if (t.locale === this.locale) return;
    this.t = t;
    this.locale = t.locale;
    this.cache.clear();
  }

  get(id: EmpireId): LocalizedEmpire | undefined {
    const hit = this.cache.get(id);
    if (hit) return hit;
    const empire = this.atlas.byId(id);
    if (!empire) return undefined;
    const localized = this.t.empire(empire);
    this.cache.set(id, localized);
    return localized;
  }

  all(): LocalizedEmpire[] {
    return this.atlas.empires.map((e) => this.get(e.id)!);
  }
}

export function buildFrame(
  state: AppState,
  t: Translator,
  atlas: Atlas,
  localizer: Localizer,
): Frame {
  const active = state.timelineOn ? atlas.activeAt(state.year) : [];
  const colors = state.timelineOn ? assignColors(active, atlas) : (new Map() as ColorMap);
  const focusTerritory = state.focused ? atlas.territoryOf(state.focused) : null;

  return {
    state,
    t,
    atlas,
    loc: (id) => localizer.get(id),
    active,
    colors,
    focusTerritory,
  };
}
