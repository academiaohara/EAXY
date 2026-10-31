import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const tiposReaccionesCombustionFq4Lesson: InteractiveLesson = {
  slug: "tipos-reacciones-combustion-fq4",
  title: "4. Tipos de reacciones y combustión",
  subtitle: FQ4_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Clasificar reacciones", [
      { kind: "steps", items: [
        "**Síntesis**: dos o más sustancias dan **una**: A + B → AB. Fe + S → FeS.",
        "**Descomposición**: una sustancia da **dos o más**: AB → A + B. CaCO₃ → CaO + CO₂.",
        "**Sustitución simple**: un **elemento** desplaza a otro: A + BC → AC + B. Zn + 2 HCl → ZnCl₂ + H₂.",
        "**Doble sustitución**: dos compuestos **intercambian** iones: AB + CD → AD + CB. AgNO₃ + NaCl → AgCl↓ + NaNO₃ (**precipitación**).",
      ] },
    ], undefined, "stack"),
    slide("explora", "¿De qué tipo es?", [
      { kind: "text", text: "Recorre los ejemplos y mira cómo se clasifica cada reacción." },
    ], tool("fq4-tipos-reaccion-explorador"), "visual-top"),
    slide("comb", "Combustión", [
      { kind: "steps", items: [
        "La **combustión** es la reacción de una sustancia con **oxígeno** que desprende **energía** (luz y calor): **exotérmica**.",
        "**Combustión completa** de un hidrocarburo: **CₓHᵧ + O₂ → CO₂ + H₂O**. CH₄ + 2 O₂ → CO₂ + 2 H₂O.",
        "**Combustión incompleta** (poco oxígeno): se forma **CO** (tóxico) o **hollín** (C).",
        "Las combustiones de combustibles fósiles emiten **CO₂**, un gas de efecto invernadero.",
      ] },
    ]),
    calc("calc-co2", "CO₂ de la combustión", "En C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O, ¿cuántos mol de CO₂ se forman por cada mol de propano?", nums(3), "El coeficiente del CO₂ es 3.", "Mira los coeficientes."),
    calc("calc-o2", "Oxígeno necesario", "En esa combustión, ¿cuántos mol de O₂ consume 1 mol de propano?", nums(5), "El coeficiente del O₂ es 5.", "Mira los coeficientes."),
    calc("calc-masa", "Masa de CO₂", "Se queman 16 g de CH₄ (M = 16). ¿Cuántos g de CO₂ se forman? (M(CO₂) = 44)", nums(44), "1 mol de CH₄ → 1 mol de CO₂ = 44 g.", "Relación 1 : 1."),
    sort("clasifica", "Tipo de reacción", "Clasifica cada reacción.",
      [["si", "Síntesis", "emerald"], ["de", "Descomposición", "rose"], ["su", "Sustitución simple", "amber"], ["co", "Combustión", "cobalt"]],
      [["2 H₂ + O₂ → 2 H₂O", "si"], ["N₂ + 3 H₂ → 2 NH₃", "si"], ["2 H₂O → 2 H₂ + O₂", "de"], ["CaCO₃ → CaO + CO₂", "de"], ["Fe + CuSO₄ → FeSO₄ + Cu", "su"], ["Zn + 2 HCl → ZnCl₂ + H₂", "su"], ["CH₄ + 2 O₂ → CO₂ + 2 H₂O", "co"], ["C₂H₅OH + 3 O₂ → 2 CO₂ + 3 H₂O", "co"]],
      "Fíjate en cuántas sustancias hay a cada lado.",
    ),
    pick("check", "Combustión", "¿Cuáles son los productos de la combustión completa de un hidrocarburo?",
      "CO₂ y H₂O",
      [["CO y H₂", "Eso ocurre en combustiones incompletas o reacciones distintas."], ["Solo CO₂", "También se forma agua."], ["O₂ y H₂O", "El O₂ es un reactivo."]],
      "C → CO₂ y H → H₂O.",
    ),
  ],
};
