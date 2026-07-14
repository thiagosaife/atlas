/**
 * Notable figures per empire — the people it is remembered by.
 *
 * Kept here, keyed by empire id, rather than scattered through the region files:
 * it reads as one list, and search folds them all into the same index. So
 * "Alexander" finds Macedon, "Lenin" finds the USSR, and "the great" turns up
 * every ruler who earned the epithet.
 *
 * English is canonical; French renderings that differ live in
 * src/i18n/locales/fr/figures.ts. Empires with no famous named individual are
 * simply absent. Names are English Wikipedia's common form.
 */
import type { EmpireId } from "@domain/types";

export const FIGURES: Partial<Record<EmpireId, readonly string[]>> = {
  // ---- Near East & Anatolia ----
  sumer: ["Gilgamesh", "Enheduanna", "Ur-Nammu"],
  babylon: ["Hammurabi", "Nebuchadnezzar II", "Nabonidus"],
  assyria: ["Ashurbanipal", "Sargon II", "Sennacherib", "Tiglath-Pileser III"],
  achaemenid: ["Cyrus the Great", "Darius the Great", "Xerxes I"],
  parthia: ["Mithridates I", "Orodes II"],
  sassanid: ["Ardashir I", "Shapur I", "Khosrow I"],
  umayyad: ["Muawiya I", "Abd al-Malik"],
  hittite: ["Suppiluliuma I", "Hattusili III"],
  byzantine: ["Justinian I", "Constantine the Great", "Basil II", "Heraclius"],
  ottoman: ["Suleiman the Magnificent", "Mehmed the Conqueror", "Osman I", "Selim I"],

  // ---- Africa ----
  egypt: ["Ramesses II", "Tutankhamun", "Hatshepsut", "Akhenaten", "Khufu"],
  ptolemaic: ["Cleopatra", "Ptolemy I Soter"],
  kush: ["Piye", "Taharqa", "Amanirenas"],
  aksum: ["Ezana"],
  ethiopia: ["Haile Selassie", "Menelik II", "Tewodros II"],
  carthage: ["Hannibal", "Hamilcar Barca", "Dido"],
  numidia: ["Masinissa", "Jugurtha"],
  almoravid: ["Yusuf ibn Tashfin"],
  almohad: ["Abd al-Mu'min", "Ya'qub al-Mansur"],
  mali: ["Mansa Musa", "Sundiata Keita"],
  benin: ["Ewuare"],
  ashanti: ["Osei Tutu", "Yaa Asantewaa"],
  mutapa: ["Nyatsimba Mutota"],

  // ---- Europe & the Mediterranean ----
  minoan: ["King Minos"],
  greece: ["Pericles", "Leonidas", "Themistocles", "Solon"],
  macedon: ["Alexander the Great", "Philip II"],
  rome: ["Julius Caesar", "Augustus", "Trajan", "Hadrian", "Marcus Aurelius", "Constantine the Great"],
  hispania: ["Trajan", "Hadrian", "Seneca"],
  gaul: ["Vercingetorix", "Brennus"],
  carolingian: ["Charlemagne", "Charles Martel", "Louis the Pious"],
  hre: ["Otto the Great", "Frederick Barbarossa", "Charles V", "Frederick II"],
  napoleon: ["Napoleon", "Napoleon Bonaparte"],
  prussia: ["Frederick the Great", "Otto von Bismarck", "Frederick William I"],
  spanish: ["Isabella I", "Philip II", "Charles V", "Ferdinand II"],
  british: ["Queen Victoria", "Elizabeth I", "Winston Churchill", "Horatio Nelson", "Duke of Wellington"],

  // ---- The Steppe & Russia ----
  scythia: ["Ateas"],
  kievan: ["Vladimir the Great", "Yaroslav the Wise", "Oleg of Novgorod"],
  tsardom: ["Ivan the Terrible", "Boris Godunov"],
  russian: ["Peter the Great", "Catherine the Great", "Nicholas II"],
  ussr: ["Lenin", "Stalin", "Mikhail Gorbachev", "Nikita Khrushchev", "Leon Trotsky"],
  mongol: ["Genghis Khan", "Kublai Khan", "Ögedei Khan"],
  xiongnu: ["Modu Chanyu"],
  timurid: ["Timur", "Tamerlane", "Ulugh Beg", "Babur"],
  sogdiana: ["Spitamenes"],

  // ---- South Asia ----
  maurya: ["Ashoka the Great", "Chandragupta Maurya", "Chanakya"],
  gupta: ["Chandragupta II", "Samudragupta", "Aryabhata"],
  mughal: ["Akbar", "Shah Jahan", "Aurangzeb", "Babur"],
  kushan: ["Kanishka"],
  ghaznavid: ["Mahmud of Ghazni"],

  // ---- East Asia ----
  qin: ["Qin Shi Huang"],
  han: ["Emperor Wu of Han", "Liu Bang"],
  tang: ["Emperor Taizong of Tang", "Wu Zetian", "Emperor Xuanzong"],
  heian: ["Murasaki Shikibu", "Fujiwara no Michinaga"],
  japan: ["Emperor Meiji", "Hirohito"],
  silla: ["Muyeol of Silla", "Kim Yushin"],
  goryeo: ["Wang Geon"],

  // ---- Southeast Asia ----
  khmer: ["Suryavarman II", "Jayavarman VII"],
  pagan: ["Anawrahta", "Kyansittha"],
  sukhothai: ["Ramkhamhaeng"],
  ayutthaya: ["Naresuan"],
  majapahit: ["Hayam Wuruk", "Gajah Mada"],
  daiviet: ["Lê Lợi", "Trần Hưng Đạo", "Lý Thái Tổ"],

  // ---- The Americas ----
  maya: ["Pacal the Great"],
  aztec: ["Montezuma II", "Cuauhtémoc", "Itzcoatl"],
  inca: ["Pachacuti", "Atahualpa", "Huayna Capac", "Manco Cápac"],
};
