import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const atomosMoleculasIonesFq2Lesson: InteractiveLesson = {
  slug: "atomos-moleculas-iones-fq2",
  title: "5. Átomos, moléculas e iones: fórmulas",
  subtitle: FQ2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cómo se agrupan los átomos", [
      { kind: "steps", items: [
        "Casi ningún átomo está **solo** en la naturaleza (salvo los gases nobles): se agrupan.",
        "Una **molécula** es un grupo de átomos **unidos** (H₂, O₂, H₂O, CO₂).",
        "En los compuestos **iónicos** (sal, NaCl) hay una **red de iones** positivos y negativos, no moléculas.",
        "En los **metales** los átomos están unidos en una red con electrones que se mueven libremente.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Fórmulas químicas", [
      { kind: "text", text: "Elige una sustancia y cuenta los átomos de cada elemento. Mira su masa molecular." },
    ], tool("fq2-formulas-moleculas-explorador"), "visual-top"),
    slide("formula", "Leer una fórmula", [
      { kind: "steps", items: [
        "Los **símbolos** dicen qué elementos hay; los **subíndices**, **cuántos átomos** de cada uno (H₂O: 2 H y 1 O).",
        "Si no hay subíndice, es **1**. El **coeficiente** delante de la fórmula (2 H₂O) indica cuántas moléculas hay.",
        "**Sustancia simple**: un solo elemento (O₂, H₂). **Compuesto**: varios elementos (H₂O, CO₂).",
        "La **masa molecular** es la **suma** de las masas atómicas de sus átomos (en u).",
      ] },
    ]),
    calc("calc-ato", "Átomos de la glucosa", "La glucosa es C₆H₁₂O₆. ¿Cuántos átomos tiene una molécula en total?", nums(24), "6 + 12 + 6 = 24 átomos.", "Suma los subíndices."),
    calc("calc-mm", "Masa molecular del agua", "La masa atómica del H es 1 u y la del O, 16 u. ¿Cuál es la masa molecular del H₂O, en u?", nums(18), "2 · 1 + 16 = 18 u.", "Dos hidrógenos y un oxígeno."),
    calc("calc-co2", "Masa del dióxido de carbono", "C = 12 u y O = 16 u. ¿Cuánto vale la masa molecular del CO₂, en u?", nums(44), "12 + 2 · 16 = 44 u.", "Un carbono y dos oxígenos."),
    sort("clasifica", "Simple o compuesto", "Clasifica cada sustancia.",
      [["sim", "Sustancia simple", "cobalt"], ["com", "Compuesto", "amber"]],
      [["O₂", "sim"], ["H₂", "sim"], ["Fe", "sim"], ["H₂O", "com"], ["CO₂", "com"], ["NaCl", "com"]],
      "Una sustancia simple tiene un solo elemento.",
    ),
    pick("check", "Subíndices", "¿Qué indica el 2 de la fórmula H₂O?",
      "Que hay 2 átomos de hidrógeno en cada molécula",
      [["Que hay 2 moléculas de agua", "Eso lo indicaría un coeficiente delante."], ["Que el agua pesa 2 g", "No es una masa."], ["Que hay 2 átomos de oxígeno", "El subíndice se refiere al símbolo que le precede."]],
      "El subíndice se refiere al átomo que está justo delante.",
    ),
  ],
};
