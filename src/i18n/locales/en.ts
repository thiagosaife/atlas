/**
 * English — the canonical locale.
 *
 * Empire and country names live in the data itself, so this bundle carries
 * only interface strings. Voice: an expedition journal — terse, evocative,
 * slightly archaic. Never marketing.
 */
import type { LocaleBundle, UiStrings } from "../types";

const ui: UiStrings = {
  appTitle: "Atlas of Long Gone Empires",
  tagline: "Hover to glimpse · click to pin · search or slide the ages · scroll to zoom, drag to pan",
  loading: "UNROLLING THE MAP…",
  loadError: "The map was lost to the sands… (failed to load geography)",

  searchPlaceholder: "Search an empire, ruler, land, or year…",
  searchEmpty: "No empire, ruler, land, or year found.",
  kindEmpire: "Empire",
  kindLand: "Land",
  kindYear: "Year",

  allEras: "All eras",
  clearEras: "✦ all eras",
  play: "Play through the ages",
  pause: "Pause",
  smallerText: "Smaller text",
  largerText: "Larger text",
  close: "Close",
  language: "Language",

  capital: "Capital",
  wikipedia: "Wikipedia ↗",
  britannica: "Britannica ↗",
  revealEmpire: "✦ reveal this empire",
  pinHint: "click to pin for field notes & links ✦",
  footerLegend: "lands with recorded empires",

  realms: (n) => `${n} realm${n === 1 ? "" : "s"}`,
  empiresRuledHere: (n) => `${n} empire${n === 1 ? "" : "s"} ruled here`,
  modernLands: (n) => `${n} modern land${n === 1 ? "" : "s"}`,
  empiresCharted: (n) => `${n} empires charted`,
  moreEmpires: (n) => `+${n} more`,


  chart: {
    equator: "EQUATOR",
    cancer: "TROPIC OF CANCER",
    capricorn: "TROPIC OF CAPRICORN",
    projection: "Natural Earth Projection",
    scale: "Approximate scale",
    sheet: "Sheet I · compiled from field surveys",
    km: "km",
  },

  era: { bc: "BC", ad: "AD", circa: "c. " },
  htmlLang: "en",
  languageName: "English",
};

export const en: LocaleBundle = { ui, empires: {}, countries: {} };
