import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const formulasMasaMolecularMolFq3Lesson: InteractiveLesson = {
  slug: "formulas-masa-molecular-mol-fq3",
  title: "5. Fórmulas, masa molecular y mol",
  subtitle: FQ3_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Leer una fórmula", [
      { kind: "steps", items: [
        "Una **fórmula química** indica los **elementos** presentes y cuántos **átomos** de cada uno hay: en **C₆H₁₂O₆** hay 6 C, 12 H y 6 O.",
        "El **subíndice** afecta solo al símbolo que le precede; un **coeficiente** delante multiplica toda la fórmula: **3 H₂O** son 3 moléculas, con 6 H y 3 O.",
        "La **masa atómica** (en **u**) está en la tabla periódica: H = 1, C = 12, N = 14, O = 16, Na = 23, Cl = 35,5.",
        "La **masa molecular** es la suma de las masas atómicas de todos los átomos de la fórmula.",
      ] },
    ], undefined, "stack"),
    slide("mol", "El mol", [
      { kind: "steps", items: [
        "Contar átomos de uno en uno es imposible: se usa el **mol**, que agrupa **6,022 · 10²³** partículas (**número de Avogadro**).",
        "La **masa molar** M (g/mol) vale lo mismo que la masa molecular en u: el agua (18 u) tiene **M = 18 g/mol**.",
        "**n = m / M**: moles = gramos / masa molar.",
        "**Nº de moléculas = n · 6,022 · 10²³**.",
      ] },
    ]),
    slide("explora", "Gramos y moles", [
      { kind: "text", text: "Elige una sustancia y una masa. ¿Cuántos moles hay? ¿Cuántas unidades fórmula?" },
    ], tool("fq3-mol-explorador"), "visual-top"),
    calc("calc-mm", "Masa molecular", "Calcula la masa molecular del CO₂, en u. (C = 12, O = 16)", nums(44), "12 + 2·16 = 44 u.", "Suma las masas de todos los átomos."),
    calc("calc-mm2", "Masa del amoniaco", "Calcula la masa molecular del NH₃, en u. (N = 14, H = 1)", nums(17), "14 + 3·1 = 17 u.", "Suma 14 y tres veces 1."),
    calc("calc-n", "Moles", "¿Cuántos moles son 36 g de agua (M = 18 g/mol)?", nums(2), "n = 36 / 18 = 2 mol.", "Divide la masa entre la masa molar."),
    calc("calc-m", "Gramos", "¿Cuántos gramos son 0,5 mol de NaCl (M = 58,5 g/mol)? (redondea a un decimal)", nums(29.2, 29.25, 29.3), "m = 0,5 · 58,5 = 29,25 g.", "Multiplica moles por masa molar."),
    sort("clasifica", "Átomos totales", "Asocia cada fórmula con el número total de átomos de una molécula.",
      [["tres", "3 átomos", "cobalt"], ["cuatro", "4 átomos", "amber"], ["cinco", "5 átomos", "emerald"]],
      [["H₂O", "tres"], ["CO₂", "tres"], ["NH₃", "cuatro"], ["H₂O₂", "cuatro"], ["CH₄", "cinco"], ["CCl₄", "cinco"]],
      "Suma los subíndices.",
    ),
    pick("check", "El mol", "¿Qué es un mol?",
      "Una cantidad de 6,022 · 10²³ partículas",
      [["Un gramo de sustancia", "No depende de la masa."], ["Una molécula grande", "Es una cantidad, no una partícula."], ["La masa de un átomo", "Eso es la masa atómica."]],
      "Número de Avogadro de partículas.",
    ),
  ],
};
