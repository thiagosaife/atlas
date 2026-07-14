/**
 * Southeast Asia
 *
 * The temple-cities of the mainland and the maritime realms of the archipelago.
 *
 * Sorted oldest-first. See CONTRIBUTING.md before adding an empire —
 * `npm run validate` checks every field, including that each country name
 * exists in the world topology.
 */
import type { Empire } from "@domain/types";

export const southeastAsia: readonly Empire[] = [
  {
    id: "champa",
    name: "Champa",
    start: 192,
    end: 1832,
    blurb: "Hindu-Buddhist kingdom of brick towers along the coast.",
    capital: { name: "Mỹ Sơn", coords: [108.12, 15.76] },
    imageWiki: "Mỹ Sơn",
    territory: ["Vietnam"],
  },
  {
    id: "srivijaya",
    name: "Srivijaya",
    start: 671,
    end: 1377,
    blurb: "Maritime Buddhist empire commanding the Malacca Strait.",
    capital: { name: "Palembang", coords: [104.75, -2.99] },
    territory: ["Indonesia", "Malaysia"],
  },
  {
    id: "khmer",
    name: "Khmer Empire",
    start: 802,
    end: 1431,
    blurb: "Angkor Wat and a hydraulic city of a million souls.",
    capital: { name: "Angkor", coords: [103.87, 13.41] },
    imageWiki: "Angkor Wat",
    territory: ["Cambodia", "Thailand", "Laos", "Vietnam"],
  },
  {
    id: "pagan",
    name: "Pagan Kingdom",
    start: 849,
    end: 1297,
    blurb: "A plain of two thousand Buddhist temples.",
    capital: { name: "Bagan", coords: [94.86, 21.17] },
    wiki: "Pagan kingdom",
    imageWiki: "Bagan",
    territory: ["Myanmar"],
  },
  {
    id: "daiviet",
    name: "Đại Việt",
    start: 968,
    end: 1804,
    blurb: "The enduring Vietnamese state that repelled Mongol fleets.",
    capital: { name: "Thăng Long", coords: [105.85, 21.03] },
    territory: ["Vietnam"],
  },
  {
    id: "sukhothai",
    name: "Sukhothai Kingdom",
    start: 1238,
    end: 1438,
    blurb: "The 'dawn of happiness' and the first Thai script.",
    capital: { name: "Sukhothai", coords: [99.82, 17.02] },
    imageWiki: "Sukhothai Historical Park",
    territory: ["Thailand"],
  },
  {
    id: "majapahit",
    name: "Majapahit Empire",
    start: 1293,
    end: 1527,
    blurb: "Java's golden thalassocracy across the archipelago.",
    capital: { name: "Trowulan", coords: [112.38, -7.55] },
    wiki: "Majapahit",
    territory: ["Indonesia", "Malaysia", "Brunei"],
  },
  {
    id: "ayutthaya",
    name: "Ayutthaya Kingdom",
    start: 1351,
    end: 1767,
    blurb: "A glittering river capital that dazzled European envoys.",
    capital: { name: "Ayutthaya", coords: [100.58, 14.35] },
    imageWiki: "Ayutthaya Historical Park",
    territory: ["Thailand", "Laos", "Cambodia"],
  },
];
