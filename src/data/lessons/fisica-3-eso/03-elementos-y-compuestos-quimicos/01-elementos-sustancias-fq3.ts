import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const elementosSustanciasFq3Lesson: InteractiveLesson = {
  slug: "elementos-sustancias-fq3",
  title: "1. Elementos, compuestos y tipos de sustancias",
  subtitle: FQ3_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Elementos y compuestos", [
      { kind: "steps", items: [
        "Un **elemento químico** es un tipo de átomo, definido por su **número atómico**. Se representa con un **símbolo**: H, O, Na, Fe, Cl…",
        "Una **sustancia simple** está formada por átomos de **un solo elemento**: O₂, Fe, C.",
        "Un **compuesto** está formado por átomos de **dos o más elementos** combinados en **proporción fija**: H₂O, NaCl, CO₂.",
        "Los compuestos se pueden **descomponer** en sus elementos mediante reacciones químicas; los elementos, no.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Sustancias por dentro", [
      { kind: "text", text: "Elige una sustancia y mira cómo están dispuestas sus partículas." },
    ], tool("fq3-sustancias-explorador"), "visual-top"),
    slide("part", "Átomos, moléculas, iones", [
      { kind: "steps", items: [
        "Los **gases nobles** son **átomos aislados** (He, Ne, Ar).",
        "Una **molécula** es un grupo de átomos unidos por **enlaces covalentes**: O₂, H₂O, CO₂.",
        "Los **compuestos iónicos** forman **redes de iones** (Na⁺ y Cl⁻) sin moléculas independientes.",
        "Los **metales** forman redes de **cationes** rodeados de electrones libres.",
      ] },
    ]),
    calc("calc-atomos", "Átomos en una molécula", "¿Cuántos átomos hay en una molécula de glucosa, C₆H₁₂O₆?", nums(24), "6 + 12 + 6 = 24 átomos.", "Suma los subíndices."),
    calc("calc-elem", "Elementos distintos", "¿Cuántos elementos distintos hay en el ácido sulfúrico, H₂SO₄?", nums(3), "H, S y O: 3 elementos.", "Cuenta los símbolos distintos."),
    sort("clasifica", "Simple o compuesto", "Clasifica cada sustancia.",
      [["si", "Sustancia simple", "cobalt"], ["co", "Compuesto", "amber"]],
      [["O₂", "si"], ["Fe", "si"], ["N₂", "si"], ["H₂O", "co"], ["NaCl", "co"], ["CO₂", "co"]],
      "Un solo elemento: simple; dos o más: compuesto.",
    ),
    pick("check", "Moléculas de oxígeno", "¿Es el O₂ un compuesto?",
      "No: es una sustancia simple, porque solo tiene átomos de oxígeno",
      [["Sí, porque tiene dos átomos", "Hay dos átomos, pero del mismo elemento."], ["Sí, porque es una molécula", "Una molécula puede ser de una sustancia simple."], ["No: es un átomo", "Es una molécula de dos átomos."]],
      "Compuesto = varios elementos distintos.",
    ),
  ],
};
