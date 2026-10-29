import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const molMasaMolarGasesFq4Lesson: InteractiveLesson = {
  slug: "mol-masa-molar-gases-fq4",
  title: "1. Mol, masa molar y volumen de un gas",
  subtitle: FQ4_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "El mol", [
      { kind: "steps", items: [
        "El **mol** es la unidad de **cantidad de sustancia**: 1 mol contiene **6,022 · 10²³** partículas (**número de Avogadro**, Nₐ).",
        "La **masa molar** M (g/mol) es la masa de 1 mol: coincide numéricamente con la **masa molecular** en u. M(H₂O) = 2·1 + 16 = **18 g/mol**.",
        "**n = m / M** (moles = gramos / masa molar). **N = n · Nₐ** (número de partículas).",
        "Un mol de cualquier sustancia contiene el **mismo número** de partículas, pero **distinta masa**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Del gramo al mol", [
      { kind: "text", text: "Elige una sustancia y una masa. ¿Cuántos moles y cuántas moléculas hay? ¿Qué volumen ocuparía como gas?" },
    ], tool("fq4-mol-gases-explorador"), "visual-top"),
    slide("gas", "Gases", [
      { kind: "steps", items: [
        "**Ecuación de los gases ideales**: **P · V = n · R · T**, con **R = 0,082 atm·L/(mol·K)**, P en atm, V en L y T en **kelvin** (K = °C + 273).",
        "**Condiciones normales (CN)**: 0 °C (273 K) y 1 atm. En CN, **1 mol de cualquier gas ocupa 22,4 L** (**volumen molar**).",
        "**Ley de Avogadro**: volúmenes iguales de gases distintos, a la misma P y T, tienen el mismo número de moléculas.",
      ] },
    ]),
    calc("calc-n", "Moles", "¿Cuántos moles hay en 36 g de agua (M = 18 g/mol)?", nums(2), "n = 36 / 18 = 2 mol.", "n = m/M."),
    calc("calc-m", "Masa", "¿Cuántos gramos son 0,25 mol de CH₄? (M = 16 g/mol)", nums(4), "m = 0,25 · 16 = 4 g.", "m = n·M."),
    calc("calc-v", "Volumen en CN", "¿Qué volumen ocupan 2 mol de O₂ en condiciones normales, en L?", nums(44.8), "V = 2 · 22,4 = 44,8 L.", "22,4 L por cada mol."),
    calc("calc-n2", "Moles de gas", "Una muestra de gas ocupa 11,2 L en CN. ¿Cuántos moles son?", nums(0.5), "n = 11,2 / 22,4 = 0,5 mol.", "Divide entre 22,4."),
    calc("calc-pv", "Gas ideal", "¿Qué volumen ocupa 1 mol de gas a 1 atm y 300 K, en L? (V = nRT/P, R = 0,082)", nums(24.6), "V = 1 · 0,082 · 300 / 1 = 24,6 L.", "Sustituye en PV = nRT."),
    sort("clasifica", "Mismos moles o misma masa", "Clasifica cada afirmación sobre 1 mol de dos sustancias distintas (por ejemplo, 1 mol de H₂O y 1 mol de CO₂).",
      [["si", "Es igual", "emerald"], ["no", "Es distinto", "rose"]],
      [["El número de moléculas", "si"], ["La cantidad de sustancia (mol)", "si"], ["El número de Avogadro", "si"], ["La masa en gramos", "no"], ["La masa molar", "no"], ["El número de átomos por molécula", "no"]],
      "1 mol = Nₐ partículas, pero la masa depende de la sustancia.",
    ),
    pick("check", "Volumen molar", "En condiciones normales, ¿qué volumen ocupa 1 mol de cualquier gas?",
      "22,4 L",
      [["1 L", "Es mucho más."], ["24,6 L", "Eso es a 300 K y 1 atm."], ["Depende del gas", "En CN es igual para todos los gases ideales."]],
      "Volumen molar en CN.",
    ),
  ],
};
