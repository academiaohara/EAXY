import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const enlaceCovalenteLewisFb1Lesson: InteractiveLesson = {
  slug: "enlace-covalente-lewis-fb1",
  title: "2. Enlace covalente y estructuras de Lewis",
  subtitle: FB1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("cov", "El enlace covalente", [
      { kind: "steps", items: [
        "Se forma entre **no metales** (electronegatividades parecidas y altas): los átomos **comparten pares de electrones** para completar su capa de valencia.",
        "**Enlace sencillo** (1 par), **doble** (2 pares) y **triple** (3 pares). Al crecer el orden de enlace, el enlace es **más corto y más fuerte**: C–C 154 pm (348 kJ/mol), C=C 134 pm (614 kJ/mol), C≡C 120 pm (839 kJ/mol).",
        "Un **enlace dativo o coordinado** es aquel en que **ambos electrones** los aporta un solo átomo (NH₄⁺, H₃O⁺).",
        "Si los átomos tienen distinta electronegatividad, el par se desplaza hacia el más electronegativo: **enlace polar** con cargas parciales δ+ y δ−.",
      ] },
    ], undefined, "stack"),
    slide("lewis", "Estructuras de Lewis", [
      { kind: "steps", items: [
        "**1.** Suma los electrones de valencia de todos los átomos (ajusta la carga). **2.** Coloca el átomo menos electronegativo en el centro (H nunca). **3.** Une con enlaces sencillos. **4.** Reparte el resto en pares solitarios para completar octetos. **5.** Si faltan electrones, forma dobles o triples enlaces.",
        "Verificación: **E = 2·(pares enlazantes + pares solitarios)**.",
        "**Excepciones**: **octeto incompleto** (BF₃, BeCl₂), **octeto expandido** (PCl₅, SF₆; solo con orbitales d disponibles), y **moléculas con nº impar de electrones** (NO, NO₂: radicales).",
        "Si hay varias estructuras equivalentes, existe **resonancia** (O₃, SO₂, CO₃²⁻): la estructura real es un **híbrido** con enlaces de longitud intermedia.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Cuenta los pares", [
      { kind: "text", text: "Elige una molécula. ¿Cuántos pares compartidos y solitarios tiene? Comprueba que suman los electrones de valencia." },
    ], tool("fb1-lewis-explorador"), "visual-top"),
    slide("prop", "Propiedades", [
      { kind: "steps", items: [
        "**Sustancias moleculares**: moléculas aisladas unidas por **fuerzas intermoleculares** débiles → bajas temperaturas de fusión y ebullición, a menudo gases o líquidos; no conducen la electricidad.",
        "**Sólidos covalentes reticulares** (diamante, cuarzo SiO₂): red de enlaces covalentes en 3D → T de fusión **muy alta**, **muy duros**, aislantes e insolubles.",
        "El **grafito** tiene láminas de hexágonos con electrones π deslocalizados: conduce la electricidad y es blando.",
      ] },
    ], undefined, "stack"),
    calc("calc-e", "Electrones de valencia", "¿Cuántos electrones de valencia totales tiene la molécula de agua (H₂O)?", nums(8), "2·1 + 6 = 8 electrones.", "H aporta 1 y O aporta 6."),
    calc("calc-co2", "Pares solitarios del CO₂", "El CO₂ tiene 16 electrones de valencia y 4 pares enlazantes (dos dobles enlaces). ¿Cuántos pares solitarios tiene en total?", nums(4), "(16 − 2·4)/2 = 4 pares (2 en cada O).", "E = 2·(enlazantes + solitarios)."),
    calc("calc-nh4", "Ion amonio", "¿Cuántos electrones de valencia tiene el NH₄⁺? (N: 5, H: 1)", nums(8), "5 + 4 − 1 = 8.", "Resta la carga positiva."),
    calc("calc-n2", "Orden de enlace", "¿Cuántos pares de electrones comparten los dos átomos de N en la molécula N₂?", nums(3), "Triple enlace: 3 pares.", "N tiene 5 e⁻ de valencia y necesita 3 más."),
    sort("clasifica", "Octeto", "Clasifica cada caso.",
      [["oct", "Cumple el octeto", "emerald"], ["exc", "Excepción", "rose"]],
      [["H₂O", "oct"], ["CH₄", "oct"], ["NH₃", "oct"], ["BF₃", "exc"], ["PCl₅", "exc"], ["SF₆", "exc"]],
      "BF₃ (6 e⁻) es incompleto; PCl₅ y SF₆ están expandidos.",
    ),
    pick("check", "Orden de enlace", "Entre C–C, C=C y C≡C, ¿cuál es más corto?",
      "C≡C",
      [["C–C", "Es el más largo."], ["C=C", "Es de longitud intermedia."], ["Los tres miden lo mismo", "Más pares compartidos acortan el enlace."]],
      "A mayor orden de enlace, menor longitud y mayor energía.",
    ),
  ],
};
