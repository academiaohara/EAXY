import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const modelosAtomicosParticulasFb1Lesson: InteractiveLesson = {
  slug: "modelos-atomicos-particulas-fb1",
  title: "1. Modelos atómicos y partículas subatómicas",
  subtitle: FB1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("hist", "Evolución de los modelos atómicos", [
      { kind: "steps", items: [
        "**Dalton** (1803): átomos indivisibles e indestructibles; los de un elemento son idénticos. Explica las leyes ponderales.",
        "**Thomson** (1897): descubre el **electrón** (rayos catódicos). Modelo del «**pudín de pasas**»: esfera positiva con electrones incrustados.",
        "**Rutherford** (1911): con la dispersión de partículas α en una lámina de oro descubre el **núcleo**: pequeño, denso y positivo, con los electrones girando a su alrededor.",
        "Problemas: según la física clásica un electrón en órbita **emitiría energía y caería** al núcleo, y no explica los **espectros de rayas**.",
      ] },
    ], anim("fq2-rutherford"), "visual-top"),
    slide("part", "Partículas subatómicas", [
      { kind: "steps", items: [
        "**Protón**: carga +1,602·10⁻¹⁹ C, masa ≈ 1,673·10⁻²⁷ kg (1 u). **Neutrón**: sin carga, masa ≈ 1 u (**Chadwick**, 1932). **Electrón**: carga −1,602·10⁻¹⁹ C, masa ≈ 1/1836 u.",
        "El **núcleo** (protones y neutrones, los **nucleones**) concentra casi toda la masa; su radio ≈ 10⁻¹⁵ m, frente a ≈ 10⁻¹⁰ m del átomo: el átomo es casi vacío.",
        "**Z** (número atómico) = nº de protones: define el elemento. **A** (número másico) = protones + neutrones.",
        "Átomo neutro: electrones = Z. **Ion**: si pierde electrones es un **catión** (+); si gana, un **anión** (−).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Isótopos e iones", [
      { kind: "text", text: "Cambia Z, A y la carga. ¿Qué cambia entre dos isótopos? ¿Y entre un átomo y su ion?" },
    ], tool("fb1-particulas-isotopos-explorador"), "visual-top"),
    slide("iso", "Isótopos y masa atómica", [
      { kind: "steps", items: [
        "**Isótopos**: mismo Z, distinto A (distinto nº de neutrones): ¹H, ²H, ³H; ¹²C, ¹³C, ¹⁴C. Química casi idéntica; masas y propiedades nucleares distintas.",
        "La **masa atómica** de un elemento es la **media ponderada** de las masas de sus isótopos según su abundancia: **M = Σ (abundancia × masa)**.",
        "Ejemplo del cloro: 75,8 % de ³⁵Cl (34,97 u) y 24,2 % de ³⁷Cl (36,97 u) → **35,45 u**.",
        "La **unidad de masa atómica (u)** es 1/12 de la masa del ¹²C: 1 u = 1,6605·10⁻²⁷ kg.",
      ] },
    ], undefined, "stack"),
    calc("calc-n", "Neutrones", "El isótopo ¹⁴C tiene Z = 6. ¿Cuántos neutrones tiene?", nums(8), "N = A − Z = 14 − 6 = 8.", "N = A − Z."),
    calc("calc-e", "Electrones de un ion", "El ion Fe³⁺ (Z = 26) tiene ¿cuántos electrones?", nums(23), "Electrones = Z − carga = 26 − 3 = 23.", "Un catión pierde electrones."),
    calc("calc-masa", "Masa atómica media", "Un elemento tiene dos isótopos: 80 % de masa 10 u y 20 % de masa 11 u. ¿Cuál es su masa atómica media, en u?", nums(10.2), "M = 0,8·10 + 0,2·11 = 10,2 u.", "Media ponderada."),
    sort("clasifica", "Modelo atómico", "Relaciona cada hallazgo con el científico.",
      [["tho", "Thomson", "cobalt"], ["rut", "Rutherford", "emerald"], ["cha", "Chadwick", "rose"]],
      [["Descubre el electrón con los rayos catódicos", "tho"], ["Modelo del pudín de pasas", "tho"], ["Experimento de la lámina de oro", "rut"], ["Propone un núcleo pequeño y positivo", "rut"], ["Descubre el neutrón", "cha"], ["Completa la composición del núcleo (protones y neutrones)", "cha"]],
      "Cada modelo añade una pieza al anterior.",
    ),
    pick("check", "Isótopos", "¿Qué tienen en común dos isótopos del mismo elemento?",
      "El número de protones",
      [["El número de neutrones", "Es justo lo que cambia."], ["El número másico", "Cambia al variar los neutrones."], ["La masa", "Su masa es distinta."]],
      "Mismo Z, distinto A.",
    ),
  ],
};
