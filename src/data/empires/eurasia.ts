/**
 * The Steppe & Russia
 *
 * Horse nomads, the Silk Road, and the powers that rose from the Eurasian plain.
 *
 * Sorted oldest-first. See CONTRIBUTING.md before adding an empire —
 * `npm run validate` checks every field, including that each country name
 * exists in the world topology.
 */
import type { Empire } from "@domain/types";

export const eurasia: readonly Empire[] = [
  {
    id: "scythia",
    name: "Scythia",
    start: -700,
    end: 300,
    circa: true,
    blurb: "Golden-worked horse nomads of the Pontic steppe.",
    capital: { name: "Kamianka", coords: [34.6, 47.5] },
    territory: ["Ukraine", "Russia", "Kazakhstan"],
  },
  {
    id: "sogdiana",
    name: "Sogdiana",
    start: -500,
    end: 722,
    circa: true,
    blurb: "Silk Road merchants whose caravans linked China and Rome.",
    capital: { name: "Samarkand", coords: [66.98, 39.65] },
    wiki: "Sogdia",
    territory: ["Uzbekistan", "Tajikistan"],
  },
  {
    id: "xiongnu",
    name: "Xiongnu Confederation",
    start: -209,
    end: 100,
    circa: true,
    blurb: "Steppe nomad power that pressed on Han China.",
    capital: { name: "Ordu-Baliq", coords: [102.66, 47.42] },
    wiki: "Xiongnu",
    territory: ["Mongolia", "Kazakhstan"],
  },
  {
    id: "kievan",
    name: "Kievan Rus'",
    start: 882,
    end: 1240,
    blurb: "Medieval federation that seeded Russia, Ukraine, and Belarus.",
    capital: { name: "Kyiv", coords: [30.52, 50.45] },
    imageWiki: "Saint Sophia Cathedral, Kyiv",
    territory: ["Ukraine", "Belarus", "Russia"],
  },
  {
    id: "mongol",
    name: "Mongol Empire",
    start: 1206,
    end: 1368,
    blurb: "Genghis Khan built the largest contiguous land empire in history.",
    capital: { name: "Karakorum", coords: [102.83, 47.2] },
    imageWiki: "Genghis Khan",
    territory: [
      "Mongolia", "China", "Russia", "Kazakhstan", "Kyrgyzstan", "Uzbekistan",
      "Turkmenistan", "Tajikistan", "Iran", "Iraq", "Afghanistan", "Ukraine", "Belarus",
      "Georgia", "Armenia", "Azerbaijan", "North Korea",
    ],
  },
  {
    id: "timurid",
    name: "Timurid Empire",
    start: 1370,
    end: 1507,
    blurb: "Tamerlane's conquests and the blue domes of Samarkand.",
    capital: { name: "Samarkand", coords: [66.98, 39.65] },
    imageWiki: "Registan",
    territory: ["Uzbekistan", "Iran", "Afghanistan", "Turkmenistan", "Tajikistan", "Pakistan"],
  },
  {
    id: "tsardom",
    name: "Tsardom of Russia",
    start: 1547,
    end: 1721,
    blurb: "Ivan the Terrible and the rise of Moscow.",
    capital: { name: "Moscow", coords: [37.62, 55.75] },
    imageWiki: "Saint Basil's Cathedral",
    territory: ["Russia"],
  },
  {
    id: "russian",
    name: "Russian Empire",
    start: 1721,
    end: 1917,
    blurb: "Peter and Catherine's realm from Poland to the Pacific.",
    capital: { name: "St. Petersburg", coords: [30.31, 59.94] },
    imageWiki: "Winter Palace",
    territory: [
      "Russia", "Finland", "Ukraine", "Belarus", "Lithuania", "Latvia", "Estonia",
      "Georgia", "Armenia", "Azerbaijan", "Kazakhstan", "Uzbekistan", "Turkmenistan",
      "Kyrgyzstan", "Tajikistan", "Moldova", "Poland",
    ],
  },
  {
    id: "ussr",
    name: "Soviet Union",
    start: 1922,
    end: 1991,
    blurb: "The USSR — fifteen republics from the Baltic to the Bering Strait.",
    capital: { name: "Moscow", coords: [37.62, 55.75] },
    imageWiki: "Moscow Kremlin",
    territory: [
      "Russia", "Ukraine", "Belarus", "Kazakhstan", "Uzbekistan", "Turkmenistan",
      "Kyrgyzstan", "Tajikistan", "Georgia", "Armenia", "Azerbaijan", "Lithuania",
      "Latvia", "Estonia", "Moldova",
    ],
  },
];
