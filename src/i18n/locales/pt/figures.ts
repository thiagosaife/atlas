/**
 * Português (Brasil) — nomes de figuras notáveis, onde diferem do inglês.
 *
 * Opcional: a busca já indexa os nomes em inglês, então "Alexander" e "Napoleon"
 * funcionam em português também. Isto serve para exibir — e encontrar — a forma
 * portuguesa ("Alexandre, o Grande", "Júlio César") quando ela difere. Impérios
 * ausentes recaem sobre o inglês.
 */
import type { EmpireId } from "@domain/types";

export const FIGURES_PT: Partial<Record<EmpireId, readonly string[]>> = {
  achaemenid: ["Ciro, o Grande", "Dario, o Grande", "Xerxes I"],
  byzantine: ["Justiniano I", "Constantino, o Grande", "Basílio II", "Heráclio"],
  ottoman: ["Solimão, o Magnífico", "Maomé, o Conquistador", "Osman I", "Selim I"],
  egypt: ["Ramessés II", "Tutancâmon", "Hatshepsut", "Akhenaton", "Quéops"],
  ptolemaic: ["Cleópatra", "Ptolomeu I"],
  carthage: ["Aníbal", "Amílcar Barca", "Dido"],
  ethiopia: ["Hailé Selassié", "Menelik II", "Teodoro II"],
  greece: ["Péricles", "Leônidas", "Temístocles", "Sólon"],
  macedon: ["Alexandre, o Grande", "Filipe II"],
  rome: ["Júlio César", "Augusto", "Trajano", "Adriano", "Marco Aurélio", "Constantino, o Grande"],
  gaul: ["Vercingetórix", "Breno"],
  carolingian: ["Carlos Magno", "Carlos Martel", "Luís, o Piedoso"],
  hre: ["Oto, o Grande", "Frederico Barbarossa", "Carlos V", "Frederico II"],
  napoleon: ["Napoleão", "Napoleão Bonaparte"],
  prussia: ["Frederico, o Grande", "Otto von Bismarck", "Frederico Guilherme I"],
  spanish: ["Isabel I", "Filipe II", "Carlos V", "Fernando II"],
  british: ["Rainha Vitória", "Isabel I", "Winston Churchill", "Horácio Nelson"],
  kievan: ["Vladimir, o Grande", "Iaroslau, o Sábio", "Oleg de Novgorod"],
  tsardom: ["Ivã, o Terrível", "Boris Godunov"],
  russian: ["Pedro, o Grande", "Catarina, a Grande", "Nicolau II"],
  ussr: ["Lênin", "Stálin", "Mikhail Gorbatchev", "Nikita Khrushchov", "Leon Trótski"],
  mongol: ["Gêngis Khan", "Kublai Khan", "Ogedai"],
  timurid: ["Tamerlão", "Ulugue Begue", "Babur"],
  maurya: ["Asoka, o Grande", "Chandragupta Máuria", "Chanakya"],
  mughal: ["Akbar", "Shah Jahan", "Aurangzeb", "Babur"],
  aztec: ["Montezuma II", "Cuauhtémoc", "Itzcóatl"],
  inca: ["Pachacuti", "Atahualpa", "Huayna Cápac", "Manco Cápac"],
};
