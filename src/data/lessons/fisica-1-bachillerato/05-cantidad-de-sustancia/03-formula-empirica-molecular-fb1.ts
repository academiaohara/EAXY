import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const formulaEmpiricaMolecularFb1Lesson: InteractiveLesson = {
  slug: "formula-empirica-molecular-fb1",
  title: "3. Fórmula empírica y fórmula molecular",
  subtitle: FB1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Empírica frente a molecular", [
      { kind: "steps", items: [
        "La **fórmula empírica** expresa la **proporción más sencilla** (números enteros) entre los átomos de un compuesto. Es la única que se puede dar para los **compuestos iónicos** (NaCl, Fe₂O₃).",
        "La **fórmula molecular** indica el **número real de átomos** de cada elemento en la molécula. Es un **múltiplo** de la empírica: **molecular = (empírica)ₙ**.",
        "Compuestos distintos pueden tener la misma empírica: CH₂O es la de la **glucosa** (C₆H₁₂O₆) y la del **ácido acético** (C₂H₄O₂).",
        "Para hallar la molecular hace falta, además, la **masa molar**.",
      ] },
    ], undefined, "stack"),
    slide("metodo", "Método", [
      { kind: "steps", items: [
        "**1.** Si los datos son porcentajes, toma **100 g** de compuesto: cada % son gramos.",
        "**2.** Pasa cada masa a **moles** dividiendo por su masa atómica.",
        "**3.** **Divide todos entre el menor** número de moles.",
        "**4.** Si no salen enteros (1,5 ; 1,33 ; 2,5…), **multiplica** todos por 2, 3, 4… hasta obtenerlos: ese es el subíndice de cada elemento.",
        "**5.** Con la **masa molar M**: n = M / M(empírica), y multiplica los subíndices por n.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Resuelve problemas paso a paso", [
      { kind: "text", text: "Elige un problema. Fíjate en la tabla de moles y razones y en cómo se obtiene la fórmula molecular." },
    ], tool("fb1-formula-empirica-explorador"), "visual-top"),
    slide("ejemplo", "Un ejemplo con multiplicador", [
      { kind: "text", text: "Un hidrocarburo tiene 82,8 % de C y 17,2 % de H y M = 58 g/mol. Moles: C = 82,8/12 = 6,9; H = 17,2/1 = 17,2. Dividiendo por 6,9: C = 1; H = 2,49 ≈ **2,5**. Se multiplica por 2: C₂H₅ (empírica, 29 g/mol). n = 58/29 = 2 → **C₄H₁₀** (butano)." },
    ]),
    calc("calc-mol", "Moles de C", "Un compuesto tiene un 40 % de carbono. En 100 g de compuesto, ¿cuántos moles de C hay? (C 12; redondea a 2 decimales)", nums(3.33), "40/12 = 3,33 mol.", "n = masa / masa atómica."),
    calc("calc-razon", "Razón H:C", "En un compuesto hay 3,33 mol de C y 6,66 mol de H. ¿Cuál es el subíndice del H en la fórmula empírica CH_x?", nums(2), "6,66/3,33 = 2 → CH₂.", "Divide entre el menor."),
    calc("calc-n", "Factor n", "La fórmula empírica CH₂O tiene M = 30 g/mol y el compuesto tiene M = 180 g/mol. ¿Cuánto vale n?", nums(6), "n = 180/30 = 6 → C₆H₁₂O₆.", "n = M/M(empírica)."),
    calc("calc-mult", "Multiplicador", "Una razón de moles resulta C : H = 1 : 1,5. ¿Por cuánto hay que multiplicar para obtener enteros?", nums(2), "1,5·2 = 3 → C₂H₃.", "Busca el menor entero que da enteros."),
    sort("clasifica", "Empírica o molecular", "Indica si la fórmula puede ser la molecular o solo la empírica de su sustancia.",
      [["mol", "Fórmula molecular", "emerald"], ["emp", "Solo empírica", "cobalt"]],
      [["C₆H₁₂O₆ (glucosa)", "mol"], ["CH₂O (en la glucosa)", "emp"], ["NaCl", "emp"], ["H₂O₂ (agua oxigenada)", "mol"], ["HO (en el H₂O₂)", "emp"], ["C₆H₆ (benceno)", "mol"]],
      "La empírica es la proporción más simple; la molecular, el nº real.",
    ),
    pick("check", "Misma empírica", "¿Qué se necesita, además de la fórmula empírica, para conocer la fórmula molecular?",
      "La masa molar del compuesto",
      [["La temperatura", "No interviene."], ["El volumen", "No basta."], ["Nada más", "Con la empírica sola no se sabe el múltiplo."]],
      "n = M / M(empírica).",
    ),
  ],
};
