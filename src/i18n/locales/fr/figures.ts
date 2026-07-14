/**
 * Français — noms des figures notables, là où ils diffèrent de l'anglais.
 *
 * Facultatif : la recherche indexe déjà les noms anglais, donc "Alexander" et
 * "Napoleon" fonctionnent en français aussi. Ceci ne sert qu'à afficher — et à
 * trouver — la forme française ("Alexandre le Grand", "Jules César") quand elle
 * diffère. Les empires absents retombent sur l'anglais.
 */
import type { EmpireId } from "@domain/types";

export const FIGURES_FR: Partial<Record<EmpireId, readonly string[]>> = {
  achaemenid: ["Cyrus le Grand", "Darius le Grand", "Xerxès Ier"],
  byzantine: ["Justinien Ier", "Constantin le Grand", "Basile II", "Héraclius"],
  ottoman: ["Soliman le Magnifique", "Mehmed le Conquérant", "Osman Ier", "Selim Ier"],
  egypt: ["Ramsès II", "Toutânkhamon", "Hatchepsout", "Akhenaton", "Khéops"],
  ptolemaic: ["Cléopâtre", "Ptolémée Ier"],
  carthage: ["Hannibal", "Hamilcar Barca", "Didon"],
  ethiopia: ["Haïlé Sélassié", "Ménélik II", "Théodoros II"],
  greece: ["Périclès", "Léonidas", "Thémistocle", "Solon"],
  macedon: ["Alexandre le Grand", "Philippe II"],
  rome: ["Jules César", "Auguste", "Trajan", "Hadrien", "Marc Aurèle", "Constantin le Grand"],
  gaul: ["Vercingétorix", "Brennos"],
  carolingian: ["Charlemagne", "Charles Martel", "Louis le Pieux"],
  hre: ["Otton le Grand", "Frédéric Barberousse", "Charles Quint", "Frédéric II"],
  napoleon: ["Napoléon", "Napoléon Bonaparte"],
  prussia: ["Frédéric le Grand", "Otto von Bismarck", "Frédéric-Guillaume Ier"],
  spanish: ["Isabelle Ire", "Philippe II", "Charles Quint", "Ferdinand II"],
  british: ["Reine Victoria", "Élisabeth Ire", "Winston Churchill", "Horatio Nelson"],
  kievan: ["Vladimir le Grand", "Iaroslav le Sage", "Oleg de Novgorod"],
  tsardom: ["Ivan le Terrible", "Boris Godounov"],
  russian: ["Pierre le Grand", "Catherine la Grande", "Nicolas II"],
  ussr: ["Lénine", "Staline", "Mikhaïl Gorbatchev", "Nikita Khrouchtchev", "Léon Trotski"],
  mongol: ["Gengis Khan", "Kubilai Khan", "Ögödei"],
  timurid: ["Tamerlan", "Ulugh Beg", "Babur"],
  maurya: ["Ashoka le Grand", "Chandragupta Maurya", "Chânakya"],
  mughal: ["Akbar", "Shah Jahan", "Aurangzeb", "Babur"],
  aztec: ["Moctezuma II", "Cuauhtémoc", "Itzcóatl"],
  inca: ["Pachacutec", "Atahualpa", "Huayna Capac", "Manco Cápac"],
};
