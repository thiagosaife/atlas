/**
 * South Asia
 *
 * The Indus, the subcontinent's classical ages, and the empires of the Hindu Kush.
 *
 * Sorted oldest-first. See CONTRIBUTING.md before adding an empire —
 * `npm run validate` checks every field, including that each country name
 * exists in the world topology.
 */
import type { Empire } from "@domain/types";

export const southAsia: readonly Empire[] = [
  {
    id: "indus",
    name: "Indus Valley Civilization",
    start: -2600,
    end: -1900,
    circa: true,
    blurb: "Planned brick cities with drains before most of the world had walls.",
    capital: { name: "Mohenjo-daro", coords: [68.14, 27.33] },
    wiki: "Indus Valley Civilisation",
    imageWiki: "Mohenjo-daro",
    territory: ["Pakistan", "India"],
  },
  {
    id: "gandhara",
    name: "Gandhara",
    start: -500,
    end: 1000,
    circa: true,
    blurb: "Where Greek sculpture met the Buddha at Taxila.",
    capital: { name: "Taxila", coords: [72.82, 33.74] },
    territory: ["Pakistan", "Afghanistan"],
  },
  {
    id: "maurya",
    name: "Maurya Empire",
    start: -322,
    end: -185,
    blurb: "Ashoka the Great spread Buddhism across the subcontinent.",
    capital: { name: "Pataliputra", coords: [85.14, 25.61] },
    imageWiki: "Sanchi",
    territory: ["India", "Pakistan", "Bangladesh", "Nepal", "Afghanistan"],
  },
  {
    id: "kushan",
    name: "Kushan Empire",
    start: 30,
    end: 375,
    circa: true,
    blurb: "Silk Road crossroads blending Greek, Persian, and Indian worlds.",
    capital: { name: "Balkh", coords: [66.9, 36.76] },
    territory: ["Afghanistan", "Pakistan", "Uzbekistan", "Tajikistan", "India"],
  },
  {
    id: "gupta",
    name: "Gupta Empire",
    start: 320,
    end: 550,
    circa: true,
    blurb: "A classical golden age of science, art, and mathematics.",
    capital: { name: "Ujjain", coords: [75.78, 23.18] },
    territory: ["India", "Bangladesh", "Nepal"],
  },
  {
    id: "ghaznavid",
    name: "Ghaznavid Empire",
    start: 977,
    end: 1186,
    blurb: "A Turkic power whose armies reached deep into India.",
    capital: { name: "Ghazni", coords: [68.42, 33.55] },
    wiki: "Ghaznavids",
    territory: ["Afghanistan", "Pakistan", "Iran", "Turkmenistan"],
  },
  {
    id: "mughal",
    name: "Mughal Empire",
    start: 1526,
    end: 1857,
    blurb: "The Taj Mahal and a court of extraordinary splendor.",
    capital: { name: "Agra", coords: [78.04, 27.18] },
    imageWiki: "Taj Mahal",
    territory: ["India", "Pakistan", "Bangladesh", "Afghanistan"],
  },
];
