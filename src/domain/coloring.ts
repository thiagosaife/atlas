/**
 * Map-colouring for the realms alive in a given year.
 *
 * Greedy graph colouring over the "empires that touch" graph: each realm takes the
 * lowest palette slot none of its neighbours hold. Guarantees two bordering realms
 * active in the same year never share a hue — the whole point of the era palette.
 *
 * Deterministic: sorted by (start, id), so the same year always paints the same way.
 */
import type { Atlas } from "./atlas";
import type { Empire, EmpireId } from "./types";

/** Muted, aged tones — the `--era-*` tokens of the design system. */
export const ERA_PALETTE = [
  "#b46a4d", // fired clay
  "#c39a41", // ochre
  "#5f867e", // verdigris
  "#90566a", // faded plum
  "#5f6f92", // dusk lapis
  "#869a5b", // olive
  "#a06a3e", // leather
  "#7a7f9c", // slate
  "#728c6f", // sage
] as const;

export type ColorMap = ReadonlyMap<EmpireId, string>;

export function assignColors(active: readonly Empire[], atlas: Atlas): ColorMap {
  const ordered = [...active].sort((a, b) => a.start - b.start || (a.id < b.id ? -1 : 1));
  const slot = new Map<EmpireId, number>();

  for (const e of ordered) {
    const taken = new Set<number>();
    for (const other of ordered) {
      const s = slot.get(other.id);
      if (s !== undefined && atlas.areAdjacent(e, other)) taken.add(s);
    }
    let c = 0;
    while (taken.has(c)) c++;
    slot.set(e.id, c);
  }

  const colors = new Map<EmpireId, string>();
  for (const e of ordered) {
    const i = (slot.get(e.id) ?? 0) % ERA_PALETTE.length;
    colors.set(e.id, ERA_PALETTE[i]!);
  }
  return colors;
}
