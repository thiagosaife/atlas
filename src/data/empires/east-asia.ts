/**
 * East Asia
 *
 * The Chinese dynasties and the courts of Korea and Japan.
 *
 * Sorted oldest-first. See CONTRIBUTING.md before adding an empire —
 * `npm run validate` checks every field, including that each country name
 * exists in the world topology.
 */
import type { Empire } from "@domain/types";

export const eastAsia: readonly Empire[] = [
  {
    id: "qin",
    name: "Qin Dynasty",
    start: -221,
    end: -206,
    blurb: "First unified empire, the Great Wall, the Terracotta Army.",
    capital: { name: "Xianyang", coords: [108.71, 34.33] },
    wiki: "Qin dynasty",
    imageWiki: "Terracotta Army",
    territory: ["China"],
  },
  {
    id: "han",
    name: "Han Dynasty",
    start: -206,
    end: 220,
    blurb: "Golden age that gave its name to the Chinese people.",
    capital: { name: "Chang'an", coords: [108.94, 34.34] },
    wiki: "Han dynasty",
    imageWiki: "Great Wall of China",
    territory: ["China", "North Korea", "Vietnam"],
  },
  {
    id: "silla",
    name: "Silla",
    start: -57,
    end: 935,
    blurb: "Golden crowns and the kingdom that unified the peninsula.",
    capital: { name: "Gyeongju", coords: [129.22, 35.86] },
    imageWiki: "Bulguksa",
    territory: ["South Korea", "North Korea"],
  },
  {
    id: "tang",
    name: "Tang Dynasty",
    start: 618,
    end: 907,
    blurb: "Cosmopolitan zenith of poetry, silk, and the open road.",
    capital: { name: "Chang'an", coords: [108.94, 34.34] },
    wiki: "Tang dynasty",
    imageWiki: "Giant Wild Goose Pagoda",
    territory: ["China", "Vietnam"],
  },
  {
    id: "heian",
    name: "Heian Japan",
    start: 794,
    end: 1185,
    blurb: "Courtly Kyoto and The Tale of Genji.",
    capital: { name: "Kyoto", coords: [135.77, 35.01] },
    wiki: "Heian period",
    imageWiki: "Byōdō-in",
    territory: ["Japan"],
  },
  {
    id: "goryeo",
    name: "Goryeo",
    start: 918,
    end: 1392,
    blurb: "Celadon ware and the name that became 'Korea'.",
    capital: { name: "Kaesong", coords: [126.55, 37.97] },
    territory: ["South Korea", "North Korea"],
  },
  {
    id: "japan",
    name: "Empire of Japan",
    start: 1868,
    end: 1947,
    blurb: "Meiji modernization and a rising Pacific power.",
    capital: { name: "Tokyo", coords: [139.69, 35.69] },
    territory: ["Japan", "South Korea", "North Korea", "Taiwan"],
  },
];
