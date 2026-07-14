/**
 * The Near East & Anatolia
 *
 * Mesopotamia, Persia, the Levant, and the empires of Asia Minor.
 *
 * Sorted oldest-first. See CONTRIBUTING.md before adding an empire —
 * `npm run validate` checks every field, including that each country name
 * exists in the world topology.
 */
import type { Empire } from "@domain/types";

export const nearEast: readonly Empire[] = [
  {
    id: "sumer",
    name: "Sumer",
    start: -4500,
    end: -1900,
    circa: true,
    blurb: "The first cities — Ur, Uruk — and the birth of writing on clay.",
    capital: { name: "Uruk", coords: [45.64, 31.32] },
    imageWiki: "Ziggurat of Ur",
    territory: ["Iraq"],
  },
  {
    id: "assyria",
    name: "Assyria",
    start: -2500,
    end: -609,
    circa: true,
    blurb: "Iron-fisted empire ruling from mighty Nineveh.",
    capital: { name: "Nineveh", coords: [43.15, 36.36] },
    imageWiki: "Lamassu",
    territory: ["Iraq", "Syria"],
  },
  {
    id: "babylon",
    name: "Babylon",
    start: -1894,
    end: -539,
    circa: true,
    blurb: "Hammurabi's law and the fabled Hanging Gardens along the Euphrates.",
    capital: { name: "Babylon", coords: [44.42, 32.54] },
    wiki: "Babylonia",
    imageWiki: "Ishtar Gate",
    territory: ["Iraq"],
  },
  {
    id: "hittite",
    name: "Hittite Empire",
    start: -1600,
    end: -1180,
    circa: true,
    blurb: "Bronze-age power of Anatolia, rival of Egypt at Kadesh.",
    capital: { name: "Hattusa", coords: [34.61, 40.02] },
    wiki: "Hittites",
    imageWiki: "Hattusa",
    territory: ["Turkey", "Syria"],
  },
  {
    id: "achaemenid",
    name: "Achaemenid Persia",
    start: -550,
    end: -330,
    blurb: "Cyrus and Darius forged history's first great multinational empire.",
    capital: { name: "Persepolis", coords: [52.89, 29.94] },
    wiki: "Achaemenid Empire",
    imageWiki: "Gate of All Nations",
    territory: [
      "Iran", "Iraq", "Turkey", "Syria", "Lebanon", "Israel", "Jordan", "Egypt",
      "Afghanistan", "Pakistan", "Uzbekistan", "Turkmenistan", "Armenia", "Azerbaijan",
      "Cyprus",
    ],
  },
  {
    id: "parthia",
    name: "Parthia",
    start: -247,
    end: 224,
    blurb: "Horse-archers who checked the legions of Rome.",
    capital: { name: "Hecatompylos", coords: [54, 36.14] },
    wiki: "Parthian Empire",
    territory: ["Iran", "Iraq", "Armenia", "Turkmenistan", "Azerbaijan"],
  },
  {
    id: "sassanid",
    name: "Sassanid Empire",
    start: 224,
    end: 651,
    blurb: "The last pre-Islamic Persian dynasty, rival of Byzantium.",
    capital: { name: "Firuzabad", coords: [52.58, 28.84] },
    wiki: "Sasanian Empire",
    imageWiki: "Taq Kasra",
    territory: ["Iran", "Iraq", "Armenia", "Azerbaijan", "Afghanistan", "Turkmenistan"],
  },
  {
    id: "byzantine",
    name: "Byzantine Empire",
    start: 330,
    end: 1453,
    blurb: "Constantinople, the Christian heir of Rome in the East.",
    capital: { name: "Constantinople", coords: [28.98, 41.01] },
    imageWiki: "Hagia Sophia",
    territory: ["Turkey", "Greece", "Bulgaria", "Cyprus", "Albania", "Macedonia", "Serbia"],
  },
  {
    id: "umayyad",
    name: "Umayyad Caliphate",
    start: 661,
    end: 750,
    blurb: "First great Islamic dynasty, its realm stretching from Spain to India.",
    capital: { name: "Damascus", coords: [36.29, 33.51] },
    imageWiki: "Umayyad Mosque",
    territory: [
      "Syria", "Iraq", "Iran", "Israel", "Jordan", "Lebanon", "Egypt", "Saudi Arabia",
      "Yemen", "Oman", "Libya", "Tunisia", "Algeria", "Morocco", "Spain", "Portugal",
      "Afghanistan", "Pakistan", "Uzbekistan", "Turkmenistan", "Armenia", "Azerbaijan",
    ],
  },
  {
    id: "ottoman",
    name: "Ottoman Empire",
    start: 1299,
    end: 1922,
    blurb: "Six centuries astride three continents.",
    capital: { name: "Istanbul", coords: [28.98, 41.01] },
    imageWiki: "Süleymaniye Mosque",
    territory: [
      "Turkey", "Greece", "Bulgaria", "Egypt", "Syria", "Iraq", "Israel", "Jordan",
      "Lebanon", "Saudi Arabia", "Serbia", "Bosnia and Herz.", "Albania", "Macedonia",
      "Romania", "Hungary", "Algeria", "Tunisia", "Libya", "Yemen", "Cyprus", "Armenia",
      "Georgia", "Moldova", "Kosovo", "Montenegro", "Croatia",
    ],
  },
];
