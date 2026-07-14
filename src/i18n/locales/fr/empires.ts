/**
 * Français — traductions des empires, par identifiant.
 *
 * Tous les champs sont facultatifs : ce qui manque retombe sur l'anglais.
 * `capital` traduit le nom de la capitale ; `wiki` pointe vers l'article
 * francophone quand il existe (sinon le lien reste anglophone).
 *
 * Ajouter un empire ? Voir CONTRIBUTING.md — `npm run validate` signale
 * toute traduction manquante ou orpheline.
 */
import type { EmpireTranslations } from "../../types";

export const empires: EmpireTranslations = {
  // ---- Proche-Orient & Anatolie ----
  sumer: {
    name: "Sumer",
    blurb: "Les premières cités — Ur, Uruk — et la naissance de l'écriture sur argile.",
    wiki: "Sumer",
  },
  assyria: {
    name: "Assyrie",
    blurb: "Empire de fer régnant depuis la puissante Ninive.",
    capital: "Ninive",
    wiki: "Assyrie",
  },
  babylon: {
    name: "Babylone",
    blurb: "La loi d'Hammurabi et les fabuleux jardins suspendus au bord de l'Euphrate.",
    capital: "Babylone",
    wiki: "Babylone",
  },
  hittite: {
    name: "Empire hittite",
    blurb: "Puissance anatolienne de l'âge du bronze, rivale de l'Égypte à Qadesh.",
    capital: "Hattusa",
    wiki: "Hittites",
  },
  achaemenid: {
    name: "Empire achéménide",
    blurb: "Cyrus et Darius forgèrent le premier grand empire multinational de l'histoire.",
    capital: "Persépolis",
    wiki: "Empire achéménide",
  },
  parthia: {
    name: "Empire parthe",
    blurb: "Archers à cheval qui tinrent en échec les légions de Rome.",
    capital: "Hécatompyle",
    wiki: "Empire parthe",
  },
  sassanid: {
    name: "Empire sassanide",
    blurb: "Dernière dynastie perse préislamique, rivale de Byzance.",
    capital: "Firouzabad",
    wiki: "Empire sassanide",
  },
  byzantine: {
    name: "Empire byzantin",
    blurb: "Constantinople, l'héritière chrétienne de Rome en Orient.",
    capital: "Constantinople",
    wiki: "Empire byzantin",
  },
  umayyad: {
    name: "Califat omeyyade",
    blurb: "Première grande dynastie islamique, régnant depuis Damas.",
    capital: "Damas",
    wiki: "Omeyyades",
  },
  ottoman: {
    name: "Empire ottoman",
    blurb: "Six siècles à cheval sur trois continents.",
    capital: "Brousse",
    wiki: "Empire ottoman",
  },

  // ---- Afrique ----
  egypt: {
    name: "Égypte antique",
    blurb: "Pharaons, pyramides, et le don du Nil.",
    capital: "Thèbes",
    wiki: "Égypte antique",
  },
  carthage: {
    name: "Carthage",
    blurb: "L'empire maritime d'Hannibal, grande rivale de Rome.",
    capital: "Carthage",
    wiki: "Carthage",
  },
  kush: {
    name: "Royaume de Koush",
    blurb: "Pharaons nubiens et pyramides abruptes de Méroé.",
    capital: "Méroé",
    wiki: "Koush",
  },
  ptolemaic: {
    name: "Royaume lagide",
    blurb: "Dynastie grecque d'Alexandrie, éteinte avec Cléopâtre VII.",
    capital: "Alexandrie",
    wiki: "Dynastie lagide",
  },
  numidia: {
    name: "Numidie",
    blurb: "Royaume des maîtres berbères de la cavalerie, le domaine de Massinissa.",
    capital: "Cirta",
    wiki: "Numidie",
  },
  aksum: {
    name: "Royaume d'Aksoum",
    blurb: "Empire commerçant aux stèles vertigineuses et à la monnaie précoce.",
    capital: "Aksoum",
    wiki: "Royaume d'Aksoum",
  },
  ghana: {
    name: "Empire du Ghana",
    blurb: "Le « pays de l'or », pivot du commerce transsaharien.",
    capital: "Koumbi Saleh",
    wiki: "Empire du Ghana",
  },
  almoravid: {
    name: "Dynastie almoravide",
    blurb: "Cavaliers berbères voilés, fondateurs de Marrakech.",
    capital: "Marrakech",
    wiki: "Almoravides",
  },
  almohad: {
    name: "Califat almohade",
    blurb: "Empire réformateur s'étendant de l'Afrique du Nord à l'Ibérie.",
    capital: "Marrakech",
    wiki: "Almohades",
  },
  benin: {
    name: "Royaume du Bénin",
    blurb: "Cité aux plaques de bronze et aux puissantes murailles de terre.",
    capital: "Bénin",
    wiki: "Royaume du Bénin",
  },
  zimbabwe: {
    name: "Royaume du Zimbabwe",
    blurb: "Les grands murs de pierre sèche du Grand Zimbabwe.",
    capital: "Grand Zimbabwe",
    wiki: "Royaume du Zimbabwe",
  },
  mali: {
    name: "Empire du Mali",
    blurb: "Le pèlerinage doré de Mansa Moussa et les écoles de Tombouctou.",
    capital: "Tombouctou",
    wiki: "Empire du Mali",
  },
  ethiopia: {
    name: "Empire d'Éthiopie",
    blurb: "La dynastie salomonienne et les églises rupestres de Lalibela.",
    capital: "Gondar",
    wiki: "Empire d'Éthiopie",
  },
  oyo: {
    name: "Empire d'Oyo",
    blurb: "Puissance yoruba de la cavalerie dans la savane ouest-africaine.",
    capital: "Oyo-Ile",
    wiki: "Empire d'Oyo",
  },
  mutapa: {
    name: "Royaume du Mutapa",
    blurb: "Royaume marchand d'or qui émerveilla les visiteurs portugais.",
    capital: "Mutapa",
    wiki: "Royaume de Mutapa",
  },
  ashanti: {
    name: "Empire ashanti",
    blurb: "Le Trône d'or et une farouche résistance à l'empire.",
    capital: "Koumassi",
    wiki: "Royaume ashanti",
  },

  // ---- Europe & Méditerranée ----
  minoan: {
    name: "Crète minoenne",
    blurb: "Première civilisation avancée d'Europe, palais de Cnossos.",
    capital: "Cnossos",
    wiki: "Civilisation minoenne",
  },
  etruscan: {
    name: "Civilisation étrusque",
    blurb: "Culture énigmatique qui façonna la Rome des origines.",
    capital: "Tarquinia",
    wiki: "Étrusques",
  },
  greece: {
    name: "Grèce classique",
    blurb: "Athènes, Sparte, et le berceau de la démocratie et de la philosophie.",
    capital: "Athènes",
    wiki: "Grèce antique",
  },
  gaul: {
    name: "Gaule",
    blurb: "Tribus celtes et l'ultime résistance de Vercingétorix face à César.",
    capital: "Alésia",
    wiki: "Gaule",
  },
  rome: {
    name: "Empire romain",
    blurb: "Des sept collines à un empire ceignant la Méditerranée.",
    capital: "Rome",
    wiki: "Empire romain",
  },
  macedon: {
    name: "Empire macédonien",
    blurb: "Les conquêtes d'Alexandre le Grand, de la Grèce jusqu'à l'Indus.",
    capital: "Pella",
    wiki: "Royaume de Macédoine",
  },
  hispania: {
    name: "Hispanie romaine",
    blurb: "Riche province ibérique de Rome, berceau d'empereurs.",
    capital: "Tarraco",
    wiki: "Hispanie",
  },
  carolingian: {
    name: "Empire carolingien",
    blurb: "Charlemagne couronné empereur, l'Occident renaissant.",
    capital: "Aix-la-Chapelle",
    wiki: "Empire carolingien",
  },
  hre: {
    name: "Saint-Empire romain germanique",
    blurb: "Mille ans de mosaïque sur les terres germaniques.",
    capital: "Aix-la-Chapelle",
    wiki: "Saint-Empire romain germanique",
  },
  spanish: {
    name: "Empire espagnol",
    blurb: "Galions, or, et un royaume s'étendant sur le Nouveau Monde.",
    capital: "Séville",
    wiki: "Empire espagnol",
  },
  british: {
    name: "Empire britannique",
    blurb: "L'empire sur lequel le soleil ne se couchait jamais.",
    capital: "Londres",
    wiki: "Empire britannique",
  },
  prussia: {
    name: "Royaume de Prusse",
    blurb: "Puissance prussienne disciplinée qui forgea l'Allemagne moderne.",
    capital: "Berlin",
    wiki: "Royaume de Prusse",
  },
  napoleon: {
    name: "Premier Empire",
    blurb: "Les aigles de Napoléon marchèrent à travers un continent.",
    capital: "Paris",
    wiki: "Premier Empire",
  },

  // ---- Steppe & Russie ----
  xiongnu: {
    name: "Confédération Xiongnu",
    blurb: "Puissance nomade des steppes qui pressa la Chine des Han.",
    capital: "Ordu-Baliq",
    wiki: "Xiongnu",
  },
  scythia: {
    name: "Scythie",
    blurb: "Nomades cavaliers de la steppe pontique, orfèvres de l'or.",
    capital: "Kamianka",
    wiki: "Scythes",
  },
  sogdiana: {
    name: "Sogdiane",
    blurb: "Marchands de la route de la soie dont les caravanes reliaient la Chine à Rome.",
    capital: "Samarcande",
    wiki: "Sogdiane",
  },
  kievan: {
    name: "Rus' de Kiev",
    blurb: "La fédération médiévale d'où naquirent la Russie, l'Ukraine et la Biélorussie.",
    capital: "Kiev",
    wiki: "Rus' de Kiev",
  },
  mongol: {
    name: "Empire mongol",
    blurb: "Gengis Khan bâtit le plus vaste empire terrestre d'un seul tenant.",
    capital: "Karakorum",
    wiki: "Empire mongol",
  },
  timurid: {
    name: "Empire timouride",
    blurb: "Les conquêtes de Tamerlan et les coupoles bleues de Samarcande.",
    capital: "Samarcande",
    wiki: "Timourides",
  },
  tsardom: {
    name: "Tsarat de Russie",
    blurb: "Ivan le Terrible et l'ascension de Moscou.",
    capital: "Moscou",
    wiki: "Tsarat de Russie",
  },
  russian: {
    name: "Empire russe",
    blurb: "Le domaine de Pierre et de Catherine, de la Pologne au Pacifique.",
    capital: "Saint-Pétersbourg",
    wiki: "Empire russe",
  },
  ussr: {
    name: "Union soviétique",
    blurb: "Un sixième des terres émergées sous la faucille et le marteau.",
    capital: "Moscou",
    wiki: "Union des républiques socialistes soviétiques",
  },

  // ---- Asie du Sud ----
  indus: {
    name: "Civilisation de l'Indus",
    blurb: "Des cités de brique planifiées, drainées avant même que d'autres aient des murs.",
    capital: "Mohenjo-daro",
    wiki: "Civilisation de la vallée de l'Indus",
  },
  gandhara: {
    name: "Gandhara",
    blurb: "Là où la sculpture grecque rencontra le Bouddha, à Taxila.",
    capital: "Taxila",
    wiki: "Gandhara",
  },
  maurya: {
    name: "Empire maurya",
    blurb: "Ashoka le Grand répandit le bouddhisme à travers le sous-continent.",
    capital: "Pataliputra",
    wiki: "Empire maurya",
  },
  kushan: {
    name: "Empire kouchan",
    blurb: "Carrefour de la route de la soie, mêlant mondes grec, perse et indien.",
    capital: "Balkh",
    wiki: "Empire kouchan",
  },
  gupta: {
    name: "Empire gupta",
    blurb: "Un âge d'or classique des sciences, des arts et des mathématiques.",
    capital: "Ujjain",
    wiki: "Empire Gupta",
  },
  ghaznavid: {
    name: "Empire ghaznévide",
    blurb: "Puissance turque dont les armées pénétrèrent loin en Inde.",
    capital: "Ghazni",
    wiki: "Ghaznévides",
  },
  mughal: {
    name: "Empire moghol",
    blurb: "Le Taj Mahal et une cour d'une splendeur extraordinaire.",
    capital: "Agra",
    wiki: "Empire moghol",
  },

  // ---- Asie de l'Est ----
  qin: {
    name: "Dynastie Qin",
    blurb: "Premier empire unifié, la Grande Muraille, l'armée de terre cuite.",
    capital: "Xianyang",
    wiki: "Dynastie Qin",
  },
  han: {
    name: "Dynastie Han",
    blurb: "Âge d'or qui donna son nom au peuple chinois.",
    capital: "Chang'an",
    wiki: "Dynastie Han",
  },
  silla: {
    name: "Silla",
    blurb: "Couronnes d'or et royaume qui unifia la péninsule.",
    capital: "Gyeongju",
    wiki: "Silla",
  },
  tang: {
    name: "Dynastie Tang",
    blurb: "Apogée cosmopolite de la poésie, de la soie et des grands chemins.",
    capital: "Chang'an",
    wiki: "Dynastie Tang",
  },
  heian: {
    name: "Époque de Heian",
    blurb: "Kyoto la courtoise, le Dit du Genji, et l'aube des samouraïs.",
    capital: "Kyoto",
    wiki: "Époque de Heian",
  },
  goryeo: {
    name: "Goryeo",
    blurb: "Le céladon, et le nom qui devint « Corée ».",
    capital: "Kaesong",
    wiki: "Goryeo",
  },
  japan: {
    name: "Empire du Japon",
    blurb: "Modernisation Meiji et l'essor d'une puissance du Pacifique.",
    capital: "Tokyo",
    wiki: "Empire du Japon",
  },

  // ---- Asie du Sud-Est ----
  champa: {
    name: "Champā",
    blurb: "Royaume hindou-bouddhique aux tours de brique le long de la côte.",
    capital: "Mỹ Sơn",
    wiki: "Champā",
  },
  srivijaya: {
    name: "Srivijaya",
    blurb: "Empire bouddhique maritime commandant le détroit de Malacca.",
    capital: "Palembang",
    wiki: "Srivijaya",
  },
  khmer: {
    name: "Empire khmer",
    blurb: "Angkor Vat et une cité hydraulique d'un million d'âmes.",
    capital: "Angkor",
    wiki: "Empire khmer",
  },
  daiviet: {
    name: "Đại Việt",
    blurb: "L'État vietnamien durable qui repoussa les flottes mongoles.",
    capital: "Thăng Long",
    wiki: "Đại Việt",
  },
  pagan: {
    name: "Royaume de Pagan",
    blurb: "Une plaine de deux mille temples bouddhiques.",
    capital: "Bagan",
    wiki: "Royaume de Pagan",
  },
  sukhothai: {
    name: "Royaume de Sukhothaï",
    blurb: "« L'aube du bonheur » et la première écriture thaïe.",
    capital: "Sukhothaï",
    wiki: "Royaume de Sukhothaï",
  },
  majapahit: {
    name: "Majapahit",
    blurb: "L'âge d'or thalassocratique de Java sur tout l'archipel.",
    capital: "Trowulan",
    wiki: "Majapahit",
  },
  ayutthaya: {
    name: "Royaume d'Ayutthaya",
    blurb: "Une capitale fluviale étincelante qui éblouit les envoyés d'Europe.",
    capital: "Ayutthaya",
    wiki: "Royaume d'Ayutthaya",
  },

  // ---- Amériques ----
  nortechico: {
    name: "Norte Chico",
    blurb: "L'une des plus anciennes civilisations des Amériques.",
    capital: "Caral",
    wiki: "Civilisation de Caral",
  },
  maya: {
    name: "Civilisation maya",
    blurb: "Astronomes et bâtisseurs de pyramides des basses terres du sud.",
    capital: "Chichén Itzá",
    wiki: "Civilisation maya",
  },
  puebloan: {
    name: "Anasazis",
    blurb: "Palais troglodytes et grandes maisons du Sud-Ouest désertique.",
    capital: "Chaco Canyon",
    wiki: "Anasazis",
  },
  tiwanaku: {
    name: "Tiwanaku",
    blurb: "Civilisation d'altitude sur les rives du lac Titicaca.",
    capital: "Tiwanaku",
    wiki: "Tiwanaku",
  },
  muisca: {
    name: "Confédération muisca",
    blurb: "Orfèvres dont le rite de l'Eldorado attira les conquistadors.",
    capital: "Bacatá",
    wiki: "Muiscas",
  },
  mississippian: {
    name: "Culture du Mississippi",
    blurb: "Bâtisseurs de tertres de Cahokia, cité rivale du Londres médiéval.",
    capital: "Cahokia",
    wiki: "Culture du Mississippi",
  },
  aztec: {
    name: "Empire aztèque",
    blurb: "Tenochtitlan, la capitale insulaire de la vallée de Mexico.",
    capital: "Tenochtitlan",
    wiki: "Empire aztèque",
  },
  inca: {
    name: "Empire inca",
    blurb: "Cuzco, le Machu Picchu, et des routes à travers les Andes.",
    capital: "Cuzco",
    wiki: "Empire inca",
  },
};
