import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const composicionCentesimalFb1Lesson: InteractiveLesson = {
  slug: "composicion-centesimal-fb1",
  title: "2. Composición centesimal",
  subtitle: FB1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Qué es la composición centesimal", [
      { kind: "steps", items: [
        "La **composición centesimal** de un compuesto indica el **porcentaje en masa** de cada elemento: cuántos gramos del elemento hay en 100 g de compuesto.",
        "**% de un elemento = (n · A_r / M) · 100**, con n el nº de átomos del elemento en la fórmula, A_r su masa atómica y M la masa molar del compuesto.",
        "Los porcentajes de todos los elementos **suman 100**.",
        "Es una **propiedad del compuesto** (ley de las proporciones definidas de Proust): el agua tiene siempre 11,1 % de H y 88,9 % de O, sea cual sea su origen.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Calcula los porcentajes", [
      { kind: "text", text: "Elige un compuesto y comprueba cuánto aporta cada elemento. Cambia la masa de la muestra y mira los gramos de cada uno." },
    ], tool("fb1-composicion-centesimal-explorador"), "visual-top"),
    slide("uso", "Para qué sirve", [
      { kind: "steps", items: [
        "**Masa de un elemento en una muestra**: m = (% · m_muestra)/100. Con ella se comparan **abonos** (nitrógeno en NH₄NO₃ frente a CO(NH₂)₂), **minerales** (hierro en Fe₂O₃ frente a Fe₃O₄) o **alimentos**.",
        "Se usa para saber si una **muestra es pura** comparando su composición con la teórica.",
        "En sentido inverso, a partir de los porcentajes experimentales se calcula la **fórmula empírica** del compuesto (siguiente lección).",
      ] },
    ], undefined, "stack"),
    slide("ejemplo", "Un ejemplo", [
      { kind: "text", text: "Composición centesimal del **CaCO₃** (M = 40 + 12 + 3·16 = 100 g/mol): Ca = 40/100 = **40 %**; C = 12/100 = **12 %**; O = 48/100 = **48 %**. Suma 100 %. En **250 g** de caliza pura hay 250·0,40 = **100 g de calcio**." },
    ]),
    calc("calc-pct", "Porcentaje de oxígeno en el agua", "¿Qué porcentaje en masa de oxígeno tiene el agua (H₂O)? Redondea a una cifra decimal.", nums(88.9, 89), "16/18 = 0,889 → 88,9 %.", "% = 16/18 · 100."),
    calc("calc-na", "Sodio en NaCl", "¿Qué porcentaje de sodio tiene el NaCl? (Na 23; Cl 35,5) Redondea a una cifra decimal.", nums(39.3, 39), "23/58,5 = 0,393 → 39,3 %.", "M(NaCl) = 58,5."),
    calc("calc-masa", "Masa del elemento", "¿Cuántos gramos de hierro hay en 200 g de Fe₂O₃? (Fe 56; O 16; M = 160 g/mol)", nums(140), "% Fe = 112/160 = 70 % → 140 g.", "2·56 = 112 g de Fe por mol."),
    calc("calc-suma", "Suma de porcentajes", "En un compuesto de dos elementos, uno es el 25 % en masa. ¿Cuál es el porcentaje del otro?", nums(75), "100 − 25 = 75 %.", "Suman 100."),
    sort("clasifica", "¿Cambia con la muestra?", "Indica si la magnitud depende o no de la cantidad de muestra.",
      [["dep", "Depende de la cantidad", "rose"], ["nodep", "No depende", "cobalt"]],
      [["La masa de oxígeno en una muestra de agua", "dep"], ["El % de oxígeno del agua", "nodep"], ["La masa molar del agua", "nodep"], ["El nº de moles de agua", "dep"], ["La composición centesimal del CO₂", "nodep"], ["El nº de átomos de H", "dep"]],
      "Las magnitudes intensivas no dependen de la cantidad.",
    ),
    pick("check", "Proust", "¿Qué establece la ley de las proporciones definidas?",
      "Un compuesto contiene siempre los mismos elementos en la misma proporción en masa",
      [["Que la masa total se conserva en una reacción", "Esa es la ley de Lavoisier."], ["Que los gases ocupan el mismo volumen", "Esa es la hipótesis de Avogadro."], ["Que los átomos no se dividen", "Es un postulado de Dalton."]],
      "Cada compuesto tiene una composición fija.",
    ),
  ],
};
