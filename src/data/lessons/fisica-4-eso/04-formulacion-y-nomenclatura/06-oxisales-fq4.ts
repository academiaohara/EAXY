import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const oxisalesFq4Lesson: InteractiveLesson = {
  slug: "oxisales-fq4",
  title: "6. Oxisales",
  subtitle: FQ4_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Sales de oxoácidos", [
      { kind: "steps", items: [
        "Una **oxisal** resulta de **sustituir el hidrógeno** de un oxoácido por un **metal**: **H₂SO₄ + Na → Na₂SO₄**.",
        "El **oxoanión** es lo que queda del ácido y **conserva su carga**: ClO⁻, ClO₂⁻, ClO₃⁻, ClO₄⁻, NO₂⁻, NO₃⁻, SO₃²⁻, SO₄²⁻, CO₃²⁻, PO₄³⁻.",
        "**Nombres**: el sufijo del ácido cambia: **hipo…oso → hipo…ito**, **-oso → -ito**, **-ico → -ato**, **per…ico → per…ato**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Combina metal y oxoanión", [
      { kind: "text", text: "Elige un metal (y su nº de oxidación) y un oxoanión. Mira la fórmula y el nombre." },
    ], tool("fq4-oxisales-explorador"), "visual-top"),
    slide("nom", "Fórmula y nombre", [
      { kind: "steps", items: [
        "**Fórmula**: metal + oxoanión, intercambiando cargas. El oxoanión va **entre paréntesis** si el subíndice es **mayor que 1**: **Fe₂(SO₄)₃**, **Ca₃(PO₄)₂**.",
        "**Nombre**: **(oxoanión) de (metal)** con romanos si el metal tiene varios números de oxidación: **sulfato de sodio** (Na₂SO₄), **carbonato de calcio** (CaCO₃), **nitrato de plata** (AgNO₃), **sulfato de hierro(III)**.",
        "Ejemplos cotidianos: **NaClO** (hipoclorito de sodio: lejía), **CaCO₃** (caliza y mármol), **KNO₃** (nitrato de potasio: abono).",
      ] },
    ]),
    calc("calc-so4", "Al₂(SO₄)₃", "En el Al₂(SO₄)₃, ¿cuántos grupos SO₄ hay?", nums(3), "Al³⁺ y SO₄²⁻: 2·3 = 3·2.", "Lee el subíndice del paréntesis."),
    calc("calc-o", "Oxígenos del CaCO₃", "¿Cuántos átomos de oxígeno tiene la fórmula CaCO₃?", nums(3), "El ion carbonato CO₃²⁻ tiene 3.", "Mira el subíndice del O."),
    calc("calc-s", "Azufre en el Na₂SO₄", "¿Cuál es el nº de oxidación del S en el sulfato de sodio, Na₂SO₄?", nums(6), "2·(+1) + x + 4·(−2) = 0 → x = +6.", "Suma cargas."),
    calc("calc-fe", "Hierro en el FeSO₄", "En el FeSO₄, ¿cuál es el nº de oxidación del hierro?", nums(2), "SO₄²⁻ (−2): el Fe es +2.", "Una carga positiva para compensar −2."),
    sort("clasifica", "Anión de la sal", "Clasifica cada sal según su oxoanión.",
      [["su", "Sulfato", "amber"], ["ca", "Carbonato", "cobalt"], ["ni", "Nitrato", "rose"]],
      [["Na₂SO₄", "su"], ["CuSO₄", "su"], ["K₂CO₃", "ca"], ["CaCO₃", "ca"], ["KNO₃", "ni"], ["AgNO₃", "ni"]],
      "El oxoanión da el nombre.",
    ),
    pick("check", "Nombre de una oxisal", "¿Cómo se llama el CaCO₃?",
      "Carbonato de calcio",
      [["Carburo de calcio", "El carburo es C⁴⁻."], ["Carbonito de calcio", "El ácido es carbónico: carbonato."], ["Óxido de calcio y carbono", "No es un óxido."]],
      "Ácido carbónico → carbonato.",
    ),
    pick("check2", "Fórmula de una oxisal", "¿Cuál es la fórmula del fosfato de calcio?",
      "Ca₃(PO₄)₂",
      [["CaPO₄", "No queda neutra."], ["Ca₂(PO₄)₃", "Subíndices invertidos."], ["Ca₃PO₄₂", "Falta el paréntesis."]],
      "Ca²⁺ y PO₄³⁻: 3·2 = 2·3.",
    ),
  ],
};
