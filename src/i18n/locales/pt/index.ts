import type { EmpireTranslation, EmpireTranslations, LocaleBundle } from "../../types";
import { ui } from "./ui";
import { empires as baseEmpires } from "./empires";
import { countries } from "./countries";
import { FIGURES_PT } from "./figures";

// Fold the Portuguese figures into the per-empire translations, so the Translator
// reads them the same way it reads a translated name or blurb.
const empires: EmpireTranslations = Object.fromEntries(
  [...new Set([...Object.keys(baseEmpires), ...Object.keys(FIGURES_PT)])].map((id) => {
    const base = baseEmpires[id];
    const figures = FIGURES_PT[id];
    const merged: EmpireTranslation = figures ? { ...base, figures } : { ...base };
    return [id, merged];
  }),
);

export const pt: LocaleBundle = { ui, empires, countries };
