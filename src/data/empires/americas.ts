/**
 * The Americas
 *
 * Mound-builders, pyramid-builders, and the empires of the Andes.
 *
 * Sorted oldest-first. See CONTRIBUTING.md before adding an empire —
 * `npm run validate` checks every field, including that each country name
 * exists in the world topology.
 */
import type { Empire } from "@domain/types";

export const americas: readonly Empire[] = [
  {
    id: "nortechico",
    name: "Norte Chico",
    start: -3500,
    end: -1800,
    circa: true,
    blurb: "One of the oldest civilizations in the Americas.",
    capital: { name: "Caral", coords: [-77.52, -10.89] },
    wiki: "Caral–Supe civilization",
    imageWiki: "Caral",
    territory: ["Peru"],
  },
  {
    id: "maya",
    name: "Maya Civilization",
    start: -2000,
    end: 1500,
    circa: true,
    blurb: "Astronomers and pyramid-builders of the rainforest lowlands.",
    capital: { name: "Chichen Itza", coords: [-88.57, 20.68] },
    wiki: "Maya civilization",
    imageWiki: "Chichen Itza",
    territory: ["Mexico", "Guatemala", "Belize", "Honduras"],
  },
  {
    id: "puebloan",
    name: "Ancestral Puebloans",
    start: 100,
    end: 1300,
    circa: true,
    blurb: "Cliff palaces and great houses of the desert Southwest.",
    capital: { name: "Chaco Canyon", coords: [-107.96, 36.06] },
    imageWiki: "Mesa Verde National Park",
    territory: ["United States of America"],
  },
  {
    id: "tiwanaku",
    name: "Tiwanaku",
    start: 300,
    end: 1000,
    circa: true,
    blurb: "High-altitude civilization on the shores of Lake Titicaca.",
    capital: { name: "Tiwanaku", coords: [-68.67, -16.55] },
    imageWiki: "Gate of the Sun",
    territory: ["Bolivia", "Peru", "Chile"],
  },
  {
    id: "muisca",
    name: "Muisca Confederation",
    start: 600,
    end: 1600,
    circa: true,
    blurb: "Goldsmiths whose El Dorado ritual lured the conquistadors.",
    capital: { name: "Bacatá", coords: [-74.07, 4.71] },
    wiki: "Muisca",
    imageWiki: "Muisca raft",
    territory: ["Colombia"],
  },
  {
    id: "mississippian",
    name: "Mississippian Culture",
    start: 800,
    end: 1600,
    circa: true,
    blurb: "Mound-builders of Cahokia, a city rivaling medieval London.",
    capital: { name: "Cahokia", coords: [-90.06, 38.66] },
    wiki: "Mississippian culture",
    imageWiki: "Cahokia",
    territory: ["United States of America"],
  },
  {
    id: "aztec",
    name: "Aztec Empire",
    start: 1428,
    end: 1521,
    blurb: "Tenochtitlan, the island capital in the Valley of Mexico.",
    capital: { name: "Tenochtitlan", coords: [-99.13, 19.43] },
    imageWiki: "Templo Mayor",
    territory: ["Mexico"],
  },
  {
    id: "inca",
    name: "Inca Empire",
    start: 1438,
    end: 1533,
    blurb: "Cusco, Machu Picchu, and roads across the Andes.",
    capital: { name: "Cusco", coords: [-71.97, -13.52] },
    imageWiki: "Machu Picchu",
    territory: ["Peru", "Bolivia", "Ecuador", "Chile", "Colombia"],
  },
];
