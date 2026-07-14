import type { EmpireTranslation, EmpireTranslations, LocaleBundle } from "../../types";
import { ui } from "./ui";
import { empires as baseEmpires } from "./empires";
import { countries } from "./countries";
import { FIGURES_FR } from "./figures";

// Fold the French figures into the per-empire translations, so the Translator
// reads them the same way it reads a translated name or blurb.
const empires: EmpireTranslations = Object.fromEntries(
  [...new Set([...Object.keys(baseEmpires), ...Object.keys(FIGURES_FR)])].map((id) => {
    const base = baseEmpires[id];
    const figures = FIGURES_FR[id];
    const merged: EmpireTranslation = figures ? { ...base, figures } : { ...base };
    return [id, merged];
  }),
);

export const fr: LocaleBundle = { ui, empires, countries };
