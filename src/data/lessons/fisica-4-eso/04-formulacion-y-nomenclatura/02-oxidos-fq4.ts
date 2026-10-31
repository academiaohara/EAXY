import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const oxidosFq4Lesson: InteractiveLesson = {
  slug: "oxidos-fq4",
  title: "2. Óxidos",
  subtitle: FQ4_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Combinaciones con oxígeno", [
      { kind: "steps", items: [
        "Un **óxido** es un compuesto **binario** formado por un elemento y **oxígeno** (nº de oxidación **−2**).",
        "**Formulación**: se escribe el elemento y el oxígeno, y se **intercambian** los números de oxidación como subíndices, **simplificando** si es posible.",
        "Fe (+3) y O (−2): Fe₂O₃. C (+4) y O (−2): C₂O₄ → **CO₂** (se simplifica).",
        "Los óxidos de **metales** son **óxidos básicos**; los de **no metales**, **óxidos ácidos**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Formula óxidos", [
      { kind: "text", text: "Elige un elemento y un nº de oxidación. Mira la fórmula y los dos nombres." },
    ], tool("fq4-oxidos-explorador"), "visual-top"),
    slide("nom", "Nomenclatura", [
      { kind: "steps", items: [
        "**Sistemática**: prefijos **mono-, di-, tri-, tetra-, penta-, hexa-, hepta-** para el número de átomos de cada elemento. **Trióxido de dihierro** (Fe₂O₃), **dióxido de carbono** (CO₂), **pentaóxido de difósforo** (P₂O₅).",
        "**Stock**: **óxido de (elemento)** y, **solo si el elemento tiene más de un nº de oxidación**, el nº en **romanos y entre paréntesis**: **óxido de hierro(III)**, **óxido de cobre(I)**; pero **óxido de calcio**, **óxido de sodio**.",
        "Se admiten nombres comunes: **monóxido de carbono** (CO), **agua** (H₂O).",
      ] },
    ]),
    calc("calc-al", "Subíndice de oxígeno", "En el Al₂O₃, ¿cuántos átomos de oxígeno hay por fórmula?", nums(3), "Al³⁺ y O²⁻ → Al₂O₃: 3 átomos de O.", "Lee el subíndice."),
    calc("calc-n2o5", "Óxido de nitrógeno(V)", "En el N₂O₅, ¿cuántos átomos de oxígeno hay?", nums(5), "El nitrógeno actúa con +5 y se intercambia: N₂O₅.", "Lee el subíndice."),
    calc("calc-cl", "Nº de oxidación del cloro", "En el Cl₂O₇, ¿cuál es el número de oxidación del cloro?", nums(7), "2x + 7·(−2) = 0 → x = +7.", "Cuenta las cargas negativas."),
    calc("calc-fe", "Hierro", "En el óxido de hierro(II), FeO, ¿cuál es el número de oxidación del hierro?", nums(2), "El número romano entre paréntesis lo indica: II = +2.", "Romano II = 2."),
    sort("clasifica", "Óxido metálico o no metálico", "Clasifica cada óxido.",
      [["me", "Óxido de un metal", "amber"], ["nm", "Óxido de un no metal", "cobalt"]],
      [["Fe₂O₃", "me"], ["CaO", "me"], ["Na₂O", "me"], ["CO₂", "nm"], ["SO₃", "nm"], ["N₂O₅", "nm"]],
      "Los metales forman óxidos básicos; los no metales, óxidos ácidos.",
    ),
    pick("check", "Trióxido de dihierro", "¿Cuál es la fórmula del trióxido de dihierro?",
      "Fe₂O₃",
      [["FeO₃", "Falta el 2 del hierro."], ["Fe₃O₂", "Están invertidos los subíndices."], ["Fe₂O", "Faltan los tres oxígenos."]],
      "Prefijos: di- para el hierro, tri- para el oxígeno.",
    ),
    pick("check2", "Nombre en Stock", "¿Cómo se llama el CuO en nomenclatura de Stock?",
      "Óxido de cobre(II)",
      [["Óxido de cobre(I)", "Ese es el Cu₂O."], ["Óxido de cobre", "El cobre tiene dos números de oxidación: hay que indicarlo."], ["Dióxido de cobre", "Eso es sistemática y para CuO₂."]],
      "Cu(II) con O(−2): CuO.",
    ),
  ],
};
