import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const tangenciasRectaCircunferenciaDt2Lesson: InteractiveLesson = {
  slug: "tangencias-recta-circunferencia-dt2",
  title: "4. Tangencias a una recta y una circunferencia",
  subtitle: DT2_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "El problema de Apolonio", [
      { kind: "steps", items: [
        "Apolonio de Perge planteó hallar la circunferencia **tangente a tres elementos** dados, que pueden ser **puntos, rectas o circunferencias**.",
        "Según la combinación hay **10 casos**: PPP, PPR, PRR, RRR, PPC, PRC, RRC, PCC, RCC y CCC (P punto, R recta, C circunferencia).",
        "Los casos con puntos se resuelven con **potencia** y **eje radical**; los de solo rectas, con **bisectrices**.",
        "Aquí se estudia uno: tangente a una **recta en un punto T** y a una **circunferencia**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Radios con la potencia de T", [
      { kind: "text", text: "Mueve T sobre la recta y cambia el radio de la circunferencia dada. Observa las dos soluciones." },
    ], tool("dt2-tangente-recta-circulo-explorador"), "visual-top"),
    slide("construccion", "Cómo se traza", [
      { kind: "steps", items: [
        "El centro de la solución está en la **perpendicular a la recta por T**.",
        "Un truco clásico: se lleva sobre esa perpendicular el radio **R** de la circunferencia dada, hacia ambos lados de T (se obtienen **M** y **N**).",
        "El centro buscado equidista de T y de la circunferencia dada, así que está en la **mediatriz** de **TM** o de **TN**, cada una con su perpendicular.",
        "Los puntos de tangencia con la circunferencia dada están sobre la **línea de centros**.",
      ] },
    ]),
    slide("otros", "Otros casos con potencia", [
      { kind: "steps", items: [
        "**Por un punto y tangente a dos rectas**: el centro está en la **bisectriz**; se usa una homotecia o la potencia del punto respecto de la circunferencia auxiliar.",
        "**Por dos puntos y tangente a una circunferencia**: se traza una circunferencia auxiliar por A y B que corte a la dada; el **centro radical** de las tres da el punto de tangencia.",
        "**Tangente a tres circunferencias**: la solución más general; se resuelve con ejes radicales y **inversión**.",
      ] },
    ]),
    calc("calc-pot", "Potencia de T", "La circunferencia dada tiene centro a 5 cm de altura y radio 1,5 cm. T está a 2 cm en horizontal del centro. La potencia de T es 2² + 5² − 1,5². ¿Cuánto vale, en cm²?", nums(26.75), "4 + 25 − 2,25 = 26,75 cm².", "Suma los cuadrados de las distancias y resta R²."),
    calc("calc-rho", "Radio de la solución exterior", "Con esa potencia, el radio de la solución exterior es p / (2(h + R)) con h = 5 y R = 1,5. ¿Cuánto vale, con dos decimales?", nums(2.06, 2.0577), "26,75 / 13 ≈ 2,06 cm.", "El denominador es 2 · 6,5 = 13."),
    sort("clasifica", "¿Qué método?", "Asocia cada caso del problema de Apolonio con la herramienta principal para resolverlo.",
      [["bis", "Bisectrices", "cobalt"], ["pot", "Potencia y eje radical", "amber"]],
      [["Tangente a tres rectas", "bis"], ["Tangente a dos rectas que se cortan", "bis"], ["Por dos puntos y tangente a una recta", "pot"], ["Por dos puntos y tangente a una circunferencia", "pot"], ["Por un punto, con centro radical", "pot"]],
      "Las rectas se tratan con bisectrices; los puntos con potencia y eje radical.",
    ),
    pick("check", "Número de casos", "¿Cuántos casos distintos tiene el problema de Apolonio?",
      "Diez",
      [["Tres", "Son más: cada combinación de puntos, rectas y circunferencias cuenta."], ["Seis", "Faltan combinaciones."], ["Veinte", "Son menos: los tres elementos se combinan sin orden."]],
      "Las combinaciones sin orden de tres elementos entre punto, recta y circunferencia dan diez casos.",
    ),
  ],
};
