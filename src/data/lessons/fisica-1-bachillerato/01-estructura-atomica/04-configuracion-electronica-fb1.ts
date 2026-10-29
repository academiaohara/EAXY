import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const configuracionElectronicaFb1Lesson: InteractiveLesson = {
  slug: "configuracion-electronica-fb1",
  title: "4. Configuración electrónica",
  subtitle: FB1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("reglas", "Reglas de llenado", [
      { kind: "steps", items: [
        "**Principio de construcción (Aufbau)**: los electrones ocupan primero los orbitales de **menor energía**. Orden (regla de Madelung, n + l creciente): **1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p…**",
        "**Principio de exclusión de Pauli**: como máximo **2 electrones** por orbital, con espines opuestos.",
        "**Regla de Hund**: en orbitales de la **misma energía** (los de un subnivel) los electrones se colocan **desapareados** con espines paralelos antes de aparearse.",
        "Se escribe como 1s² 2s² 2p⁶…; con **notación abreviada** del gas noble anterior: Na: [Ne] 3s¹.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Llena los orbitales", [
      { kind: "text", text: "Elige un elemento y su carga. Mira la caja de orbitales, los electrones desapareados y los números cuánticos del último electrón." },
    ], tool("fb1-configuracion-explorador"), "visual-top"),
    slide("exc", "Excepciones e iones", [
      { kind: "steps", items: [
        "Los subniveles **semillenos** (d⁵) o **llenos** (d¹⁰) son especialmente estables: **Cr**: [Ar] 4s¹ 3d⁵ (no 4s² 3d⁴); **Cu**: [Ar] 4s¹ 3d¹⁰; también Mo y Ag.",
        "**Cationes**: se pierden los electrones de la **capa más externa** (mayor n) primero: Fe → Fe²⁺ pierde los **4s**, no los 3d.",
        "**Aniones**: el electrón o electrones extra se añaden siguiendo el orden de llenado: Cl⁻: 1s² 2s² 2p⁶ 3s² 3p⁶ (como el Ar).",
        "Los **electrones de valencia** son los de la capa más externa (y los d/f incompletos en los metales de transición).",
      ] },
    ], undefined, "stack"),
    slide("mag", "Magnetismo y último electrón", [
      { kind: "text", text: "Con **electrones desapareados** el átomo es **paramagnético** (lo atrae un imán); sin ellos, **diamagnético**. Los números cuánticos del **último electrón** (el de mayor energía por el orden de llenado) se dan como (n, l, m_l, m_s), con m_l y m_s siguiendo la regla de Hund: primero los electrones con m_s = +½ en cada orbital." },
    ]),
    calc("calc-ne", "Gas noble", "¿Cuántos electrones tiene el ion Cl⁻ (Z = 17)?", nums(18), "17 + 1 = 18 electrones: como el argón.", "Un anión gana electrones."),
    calc("calc-des", "Desapareados", "¿Cuántos electrones desapareados tiene el nitrógeno (Z = 7, 2p³) en su estado fundamental?", nums(3), "Hund: los tres electrones 2p ocupan orbitales distintos: 3 desapareados.", "Regla de Hund."),
    calc("calc-val", "Electrones de valencia", "¿Cuántos electrones tiene en su capa más externa el azufre (Z = 16)?", nums(6), "1s² 2s² 2p⁶ 3s² 3p⁴: 2 + 4 = 6.", "Suma los de la capa n = 3."),
    calc("calc-fe", "Fe³⁺", "¿Cuántos electrones 3d tiene el Fe³⁺ (Z = 26)? (Fe: [Ar] 4s² 3d⁶)", nums(5), "Pierde 2 de 4s y 1 de 3d: queda 3d⁵.", "Se pierden primero los 4s."),
    sort("clasifica", "Paramagnético o diamagnético", "Clasifica según tengan o no electrones desapareados.",
      [["par", "Paramagnético", "rose"], ["dia", "Diamagnético", "cobalt"]],
      [["N (2p³)", "par"], ["Ne (2p⁶)", "dia"], ["O (2p⁴)", "par"], ["Mg (3s²)", "dia"], ["Na (3s¹)", "par"], ["Zn (4s² 3d¹⁰)", "dia"]],
      "Cuenta los electrones desapareados con la regla de Hund.",
    ),
    pick("check", "Excepción", "¿Cuál es la configuración correcta del cromo (Z = 24)?",
      "[Ar] 4s¹ 3d⁵",
      [["[Ar] 4s² 3d⁴", "Es la esperada, pero el subnivel d semilleno es más estable."], ["[Ar] 4s² 3d⁶", "Eso tendría 26 electrones."], ["[Ar] 3d⁶", "No coincide con Z = 24."]],
      "Un subnivel d semilleno aporta estabilidad.",
    ),
  ],
};
