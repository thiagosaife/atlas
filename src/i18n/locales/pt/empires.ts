/**
 * Português (Brasil) — traduções dos impérios, por identificador.
 *
 * Todos os campos são opcionais: o que faltar recai sobre o inglês. `capital`
 * traduz o nome da capital; `wiki` aponta para o artigo lusófono quando existe
 * (senão o link permanece em inglês).
 */
import type { EmpireTranslations } from "../../types";

export const empires: EmpireTranslations = {
  // ---- Oriente Próximo e Anatólia ----
  sumer: {
    name: "Suméria",
    blurb: "As primeiras cidades — Ur, Uruk — e o nascimento da escrita sobre argila.",
    wiki: "Suméria",
  },
  assyria: {
    name: "Assíria",
    blurb: "Império de ferro que reinava a partir da poderosa Nínive.",
    capital: "Nínive",
    wiki: "Assíria",
  },
  babylon: {
    name: "Babilônia",
    blurb: "A lei de Hamurábi e os fabulosos jardins suspensos às margens do Eufrates.",
    capital: "Babilônia",
    wiki: "Babilônia",
  },
  hittite: {
    name: "Império Hitita",
    blurb: "Potência anatólia da Idade do Bronze, rival do Egito em Cades.",
    capital: "Hatusa",
    wiki: "Hititas",
  },
  achaemenid: {
    name: "Império Aquemênida",
    blurb: "Ciro e Dario forjaram o primeiro grande império multinacional da história.",
    capital: "Persépolis",
    wiki: "Império Aquemênida",
  },
  parthia: {
    name: "Império Parta",
    blurb: "Arqueiros a cavalo que contiveram as legiões de Roma.",
    capital: "Hecatômpilo",
    wiki: "Império Parta",
  },
  sassanid: {
    name: "Império Sassânida",
    blurb: "A última dinastia persa pré-islâmica, rival de Bizâncio.",
    capital: "Firuzabad",
    wiki: "Império Sassânida",
  },
  byzantine: {
    name: "Império Bizantino",
    blurb: "Constantinopla, a herdeira cristã de Roma no Oriente.",
    capital: "Constantinopla",
    wiki: "Império Bizantino",
  },
  umayyad: {
    name: "Califado Omíada",
    blurb: "Primeira grande dinastia islâmica, reinando a partir de Damasco.",
    capital: "Damasco",
    wiki: "Califado Omíada",
  },
  ottoman: {
    name: "Império Otomano",
    blurb: "Seis séculos a cavalo sobre três continentes.",
    capital: "Bursa",
    wiki: "Império Otomano",
  },

  // ---- África ----
  egypt: {
    name: "Antigo Egito",
    blurb: "Faraós, pirâmides e a dádiva do Nilo.",
    capital: "Tebas",
    wiki: "Antigo Egito",
  },
  carthage: {
    name: "Cartago",
    blurb: "O império marítimo de Aníbal, grande rival de Roma.",
    capital: "Cartago",
    wiki: "Cartago",
  },
  kush: {
    name: "Reino de Cuxe",
    blurb: "Faraós núbios e as pirâmides íngremes de Méroe.",
    capital: "Méroe",
    wiki: "Cuxe",
  },
  ptolemaic: {
    name: "Reino Ptolemaico",
    blurb: "Dinastia grega de Alexandria, extinta com Cleópatra VII.",
    capital: "Alexandria",
    wiki: "Dinastia ptolemaica",
  },
  numidia: {
    name: "Numídia",
    blurb: "Reino dos mestres berberes da cavalaria, o domínio de Masinissa.",
    capital: "Cirta",
    wiki: "Numídia",
  },
  aksum: {
    name: "Reino de Axum",
    blurb: "Império comercial de estelas altíssimas e moeda precoce.",
    capital: "Axum",
    wiki: "Reino de Axum",
  },
  ghana: {
    name: "Império do Gana",
    blurb: "A « terra do ouro », eixo do comércio transaariano.",
    capital: "Kumbi Saleh",
    wiki: "Império do Gana",
  },
  almoravid: {
    name: "Dinastia Almorávida",
    blurb: "Cavaleiros berberes velados, fundadores de Marraquexe.",
    capital: "Marraquexe",
    wiki: "Almorávidas",
  },
  almohad: {
    name: "Califado Almóada",
    blurb: "Império reformista estendido do Norte da África à Ibéria.",
    capital: "Marraquexe",
    wiki: "Almóadas",
  },
  benin: {
    name: "Reino do Benim",
    blurb: "Cidade das placas de bronze e das poderosas muralhas de terra.",
    capital: "Cidade de Benim",
    wiki: "Reino do Benim",
  },
  zimbabwe: {
    name: "Reino do Zimbábue",
    blurb: "As grandes muralhas de pedra seca do Grande Zimbábue.",
    capital: "Grande Zimbábue",
    wiki: "Reino do Zimbabwe",
  },
  mali: {
    name: "Império do Mali",
    blurb: "A peregrinação dourada de Mansa Musa e as escolas de Timbuktu.",
    capital: "Timbuktu",
    wiki: "Império do Máli",
  },
  ethiopia: {
    name: "Império Etíope",
    blurb: "A dinastia salomônica e as igrejas rupestres de Lalibela.",
    capital: "Gondar",
    wiki: "Império Etíope",
  },
  oyo: {
    name: "Império de Oyo",
    blurb: "Potência iorubá da cavalaria na savana da África Ocidental.",
    capital: "Oyo-Ile",
    wiki: "Império de Oyo",
  },
  mutapa: {
    name: "Reino de Mutapa",
    blurb: "Reino comerciante de ouro que impressionou os visitantes portugueses.",
    capital: "Mutapa",
    wiki: "Reino de Mutapa",
  },
  ashanti: {
    name: "Império Axânti",
    blurb: "O Trono de Ouro e uma feroz resistência ao império.",
    capital: "Kumasi",
    wiki: "Império Axânti",
  },

  // ---- Europa e Mediterrâneo ----
  minoan: {
    name: "Creta Minoica",
    blurb: "A primeira civilização avançada da Europa, palácio de Cnossos.",
    capital: "Cnossos",
    wiki: "Civilização minoica",
  },
  etruscan: {
    name: "Civilização Etrusca",
    blurb: "Cultura enigmática que moldou a Roma dos primórdios.",
    capital: "Tarquínia",
    wiki: "Etruscos",
  },
  greece: {
    name: "Grécia Clássica",
    blurb: "Atenas, Esparta e o berço da democracia e da filosofia.",
    capital: "Atenas",
    wiki: "Grécia Antiga",
  },
  gaul: {
    name: "Gália",
    blurb: "Tribos celtas e a última resistência de Vercingetórix diante de César.",
    capital: "Alésia",
    wiki: "Gália",
  },
  rome: {
    name: "Império Romano",
    blurb: "Das sete colinas a um império que cingia o Mediterrâneo.",
    capital: "Roma",
    wiki: "Império Romano",
  },
  macedon: {
    name: "Império Macedônico",
    blurb: "As conquistas de Alexandre, o Grande, da Grécia até o Indo.",
    capital: "Pela",
    wiki: "Reino da Macedónia",
  },
  hispania: {
    name: "Hispânia Romana",
    blurb: "Rica província ibérica de Roma, berço de imperadores.",
    capital: "Tarraco",
    wiki: "Hispânia",
  },
  carolingian: {
    name: "Império Carolíngio",
    blurb: "Carlos Magno coroado imperador, ressurgindo o Ocidente.",
    capital: "Aquisgrano",
    wiki: "Império Carolíngio",
  },
  hre: {
    name: "Sacro Império Romano-Germânico",
    blurb: "Mil anos de mosaico sobre as terras germânicas.",
    capital: "Aquisgrano",
    wiki: "Sacro Império Romano-Germânico",
  },
  spanish: {
    name: "Império Espanhol",
    blurb: "Galeões, ouro e um reino que abarcava o Novo Mundo.",
    capital: "Sevilha",
    wiki: "Império Espanhol",
  },
  british: {
    name: "Império Britânico",
    blurb: "O império onde o sol jamais se punha.",
    capital: "Londres",
    wiki: "Império Britânico",
  },
  prussia: {
    name: "Reino da Prússia",
    blurb: "Poder prussiano disciplinado que forjou a Alemanha moderna.",
    capital: "Berlim",
    wiki: "Reino da Prússia",
  },
  napoleon: {
    name: "Primeiro Império Francês",
    blurb: "As águias de Napoleão marcharam por um continente.",
    capital: "Paris",
    wiki: "Primeiro Império Francês",
  },

  // ---- Estepe e Rússia ----
  xiongnu: {
    name: "Confederação Xiongnu",
    blurb: "Potência nômade das estepes que pressionou a China Han.",
    capital: "Ordu-Baliq",
    wiki: "Xiongnu",
  },
  scythia: {
    name: "Cítia",
    blurb: "Nômades cavaleiros da estepe pôntica, ourives do ouro.",
    capital: "Kamianka",
    wiki: "Citas",
  },
  sogdiana: {
    name: "Sogdiana",
    blurb: "Mercadores da Rota da Seda cujas caravanas ligavam a China a Roma.",
    capital: "Samarcanda",
    wiki: "Sogdiana",
  },
  kievan: {
    name: "Rus de Kiev",
    blurb: "A federação medieval que originou Rússia, Ucrânia e Bielorrússia.",
    capital: "Kiev",
    wiki: "Rus de Kiev",
  },
  mongol: {
    name: "Império Mongol",
    blurb: "Gêngis Khan ergueu o maior império terrestre contíguo da história.",
    capital: "Caracórum",
    wiki: "Império Mongol",
  },
  timurid: {
    name: "Império Timúrida",
    blurb: "As conquistas de Tamerlão e as cúpulas azuis de Samarcanda.",
    capital: "Samarcanda",
    wiki: "Império Timúrida",
  },
  tsardom: {
    name: "Czarado da Rússia",
    blurb: "Ivã, o Terrível, e a ascensão de Moscou.",
    capital: "Moscou",
    wiki: "Czarado da Rússia",
  },
  russian: {
    name: "Império Russo",
    blurb: "O domínio de Pedro e Catarina, da Polônia ao Pacífico.",
    capital: "São Petersburgo",
    wiki: "Império Russo",
  },
  ussr: {
    name: "União Soviética",
    blurb: "Um sexto das terras emersas sob a foice e o martelo.",
    capital: "Moscou",
    wiki: "União Soviética",
  },

  // ---- Sul da Ásia ----
  indus: {
    name: "Civilização do Vale do Indo",
    blurb: "Cidades de tijolo planejadas, com esgotos antes que outros tivessem muros.",
    capital: "Moenjodaro",
    wiki: "Civilização do Vale do Indo",
  },
  gandhara: {
    name: "Gandara",
    blurb: "Onde a escultura grega encontrou o Buda, em Taxila.",
    capital: "Taxila",
    wiki: "Gandara",
  },
  maurya: {
    name: "Império Máuria",
    blurb: "Asoka, o Grande, difundiu o budismo por todo o subcontinente.",
    capital: "Pataliputra",
    wiki: "Império Máuria",
  },
  kushan: {
    name: "Império Kushan",
    blurb: "Encruzilhada da Rota da Seda, mesclando os mundos grego, persa e indiano.",
    capital: "Balkh",
    wiki: "Império Cuchana",
  },
  gupta: {
    name: "Império Gupta",
    blurb: "Uma era de ouro clássica das ciências, das artes e da matemática.",
    capital: "Ujjain",
    wiki: "Império Gupta",
  },
  ghaznavid: {
    name: "Império Gasnévida",
    blurb: "Potência turca cujos exércitos penetraram fundo na Índia.",
    capital: "Gázni",
    wiki: "Gasnévidas",
  },
  mughal: {
    name: "Império Mogol",
    blurb: "O Taj Mahal e uma corte de esplendor extraordinário.",
    capital: "Agra",
    wiki: "Império Mogol",
  },

  // ---- Leste da Ásia ----
  qin: {
    name: "Dinastia Qin",
    blurb: "Primeiro império unificado, a Grande Muralha, o Exército de Terracota.",
    capital: "Xianyang",
    wiki: "Dinastia Qin",
  },
  han: {
    name: "Dinastia Han",
    blurb: "Era de ouro que deu nome ao povo chinês.",
    capital: "Chang'an",
    wiki: "Dinastia Han",
  },
  silla: {
    name: "Silla",
    blurb: "Coroas de ouro e o reino que unificou a península.",
    capital: "Gyeongju",
    wiki: "Silla",
  },
  tang: {
    name: "Dinastia Tang",
    blurb: "Apogeu cosmopolita da poesia, da seda e dos grandes caminhos.",
    capital: "Chang'an",
    wiki: "Dinastia Tang",
  },
  heian: {
    name: "Período Heian",
    blurb: "A cortesã Quioto, o Conto de Genji e a aurora dos samurais.",
    capital: "Quioto",
    wiki: "Período Heian",
  },
  goryeo: {
    name: "Goryeo",
    blurb: "A cerâmica celadon e o nome que se tornou « Coreia ».",
    capital: "Kaesong",
    wiki: "Goryeo",
  },
  japan: {
    name: "Império do Japão",
    blurb: "A modernização Meiji e a ascensão de uma potência do Pacífico.",
    capital: "Tóquio",
    wiki: "Império do Japão",
  },

  // ---- Sudeste Asiático ----
  champa: {
    name: "Champa",
    blurb: "Reino hindu-budista de torres de tijolo ao longo da costa.",
    capital: "Mỹ Sơn",
    wiki: "Champá",
  },
  srivijaya: {
    name: "Sriwijaya",
    blurb: "Império budista marítimo que dominava o estreito de Malaca.",
    capital: "Palembang",
    wiki: "Sriwijaya",
  },
  khmer: {
    name: "Império Khmer",
    blurb: "Angkor Wat e uma cidade hidráulica de um milhão de almas.",
    capital: "Angkor",
    wiki: "Império Khmer",
  },
  daiviet: {
    name: "Đại Việt",
    blurb: "O duradouro Estado vietnamita que repeliu as frotas mongóis.",
    capital: "Thăng Long",
    wiki: "Đại Việt",
  },
  pagan: {
    name: "Reino de Pagã",
    blurb: "Uma planície de dois mil templos budistas.",
    capital: "Bagan",
    wiki: "Reino de Pagã",
  },
  sukhothai: {
    name: "Reino de Sucotai",
    blurb: "A « aurora da felicidade » e a primeira escrita tailandesa.",
    capital: "Sucotai",
    wiki: "Reino de Sucotai",
  },
  majapahit: {
    name: "Império Majapahit",
    blurb: "A talassocracia dourada de Java por todo o arquipélago.",
    capital: "Trowulan",
    wiki: "Majapahit",
  },
  ayutthaya: {
    name: "Reino de Ayutthaya",
    blurb: "Uma reluzente capital fluvial que deslumbrou os enviados europeus.",
    capital: "Ayutthaya",
    wiki: "Reino de Ayutthaya",
  },

  // ---- Américas ----
  nortechico: {
    name: "Norte Chico",
    blurb: "Uma das civilizações mais antigas das Américas.",
    capital: "Caral",
    wiki: "Civilização de Caral",
  },
  maya: {
    name: "Civilização Maia",
    blurb: "Astrônomos e construtores de pirâmides das terras baixas do sul.",
    capital: "Chichén Itzá",
    wiki: "Civilização maia",
  },
  puebloan: {
    name: "Ancestrais Pueblos",
    blurb: "Palácios nas falésias e grandes casas do sudoeste desértico.",
    capital: "Chaco Canyon",
    wiki: "Anazasi",
  },
  tiwanaku: {
    name: "Tiwanaku",
    blurb: "Civilização de altitude às margens do lago Titicaca.",
    capital: "Tiwanaku",
    wiki: "Tiuanaco",
  },
  muisca: {
    name: "Confederação Muísca",
    blurb: "Ourives cujo ritual do Eldorado atraiu os conquistadores.",
    capital: "Bacatá",
    wiki: "Muíscas",
  },
  mississippian: {
    name: "Cultura do Mississippi",
    blurb: "Construtores de montículos de Cahokia, cidade rival da Londres medieval.",
    capital: "Cahokia",
    wiki: "Cultura do Mississippi",
  },
  aztec: {
    name: "Império Asteca",
    blurb: "Tenochtitlan, a capital insular no Vale do México.",
    capital: "Tenochtitlan",
    wiki: "Império Asteca",
  },
  inca: {
    name: "Império Inca",
    blurb: "Cusco, Machu Picchu e estradas através dos Andes.",
    capital: "Cusco",
    wiki: "Império Inca",
  },
};
