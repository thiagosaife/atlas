/**
 * The empire catalogue.
 *
 * Empires are grouped by region purely so the files stay reviewable — the app
 * sees one flat list. To add a region, create the module and add it here.
 */
import type { Empire } from "@domain/types";
import { FIGURES } from "../figures";

import { nearEast } from "./near-east";
import { africa } from "./africa";
import { europe } from "./europe";
import { eurasia } from "./eurasia";
import { southAsia } from "./south-asia";
import { eastAsia } from "./east-asia";
import { southeastAsia } from "./southeast-asia";
import { americas } from "./americas";

export const REGIONS = {
  "near-east": nearEast,
  africa,
  europe,
  eurasia,
  "south-asia": southAsia,
  "east-asia": eastAsia,
  "southeast-asia": southeastAsia,
  americas,
} as const satisfies Record<string, readonly Empire[]>;

export type RegionKey = keyof typeof REGIONS;

/** Every charted empire, oldest first, with notable figures folded in. */
export const EMPIRES: readonly Empire[] = Object.values(REGIONS)
  .flat()
  .map((e) => {
    const figures = FIGURES[e.id];
    return figures ? { ...e, figures } : e;
  })
  .sort((a, b) => a.start - b.start || (a.id < b.id ? -1 : 1));
