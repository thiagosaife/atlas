/**
 * Français — chaînes de l'interface.
 *
 * Le ton est celui d'un carnet d'expédition : bref, évocateur, un peu suranné.
 */
import type { UiStrings } from "../../types";

export const ui: UiStrings = {
  appTitle: "Atlas des Empires Disparus",
  tagline:
    "Survolez pour entrevoir · cliquez pour épingler · cherchez ou faites glisser les âges · molette pour zoomer",
  loading: "ON DÉROULE LA CARTE…",
  loadError: "La carte s'est perdue dans les sables… (géographie non chargée)",

  searchPlaceholder: "Chercher un empire, une terre ou une année…",
  searchEmpty: "Aucun empire, terre ou année trouvés.",
  kindEmpire: "Empire",
  kindLand: "Terre",
  kindYear: "Année",

  allEras: "Toutes les époques",
  clearEras: "✦ toutes les époques",
  play: "Parcourir les âges",
  pause: "Interrompre",
  smallerText: "Texte plus petit",
  largerText: "Texte plus grand",
  close: "Fermer",
  language: "Langue",

  capital: "Capitale",
  wikipedia: "Wikipédia ↗",
  britannica: "Britannica ↗",
  revealEmpire: "✦ révéler cet empire",
  pinHint: "cliquez pour épingler : notes de terrain & liens ✦",
  footerLegend: "terres aux empires recensés",

  realms: (n) => `${n} royaume${n === 1 ? "" : "s"}`,
  empiresRuledHere: (n) => (n === 1 ? "1 empire y a régné" : `${n} empires y ont régné`),
  modernLands: (n) => `${n} pays actuel${n === 1 ? "" : "s"}`,
  empiresCharted: (n) => `${n} empires cartographiés`,
  moreEmpires: (n) => `+${n} autre${n === 1 ? "" : "s"}`,


  chart: {
    equator: "ÉQUATEUR",
    cancer: "TROPIQUE DU CANCER",
    capricorn: "TROPIQUE DU CAPRICORNE",
    projection: "Projection Natural Earth",
    scale: "Échelle approximative",
    sheet: "Feuille I · d'après relevés de terrain",
    km: "km",
  },

  era: { bc: "av. J.-C.", ad: "apr. J.-C.", circa: "v. " },
  htmlLang: "fr",
  languageName: "Français",
};
