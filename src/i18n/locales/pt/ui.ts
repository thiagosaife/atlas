/**
 * Português (Brasil) — textos da interface.
 *
 * O tom é o de um diário de expedição: breve, evocativo, um tanto arcaico.
 */
import type { UiStrings } from "../../types";

export const ui: UiStrings = {
  appTitle: "Atlas dos Impérios Desaparecidos",
  tagline:
    "Passe o cursor para vislumbrar · clique para fixar · busque ou deslize as eras · role para ampliar",
  loading: "DESENROLANDO O MAPA…",
  loadError: "O mapa se perdeu nas areias… (falha ao carregar a geografia)",

  searchPlaceholder: "Busque um império, soberano, terra ou ano…",
  searchEmpty: "Nenhum império, soberano, terra ou ano encontrado.",
  kindEmpire: "Império",
  kindLand: "Terra",
  kindYear: "Ano",

  allEras: "Todas as eras",
  clearEras: "✦ todas as eras",
  play: "Percorrer as eras",
  pause: "Pausar",
  smallerText: "Texto menor",
  largerText: "Texto maior",
  close: "Fechar",
  language: "Idioma",

  capital: "Capital",
  wikipedia: "Wikipédia ↗",
  britannica: "Britannica ↗",
  revealEmpire: "✦ revelar este império",
  pinHint: "clique para fixar: notas de campo & links ✦",
  footerLegend: "terras com impérios registrados",

  realms: (n) => `${n} reino${n === 1 ? "" : "s"}`,
  empiresRuledHere: (n) => (n === 1 ? "1 império reinou aqui" : `${n} impérios reinaram aqui`),
  modernLands: (n) => (n === 1 ? "1 país atual" : `${n} países atuais`),
  empiresCharted: (n) => `${n} impérios mapeados`,
  moreEmpires: (n) => `+${n} outro${n === 1 ? "" : "s"}`,

  chart: {
    equator: "EQUADOR",
    cancer: "TRÓPICO DE CÂNCER",
    capricorn: "TRÓPICO DE CAPRICÓRNIO",
    projection: "Projeção Natural Earth",
    scale: "Escala aproximada",
    sheet: "Folha I · compilada de levantamentos de campo",
    km: "km",
  },

  era: { bc: "a.C.", ad: "d.C.", circa: "c. " },
  htmlLang: "pt-BR",
  languageName: "Português",
};
