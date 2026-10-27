import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const reaccionesApoyosTi2Lesson: InteractiveLesson = {
  slug: "reacciones-apoyos-ti2",
  title: "4. Apoyos y reacciones en una viga",
  subtitle: TECTI2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Tipos de apoyo", [
      { kind: "steps", items: [
        "**Apoyo simple (móvil)**: impide el movimiento perpendicular al apoyo. **1 reacción** (vertical).",
        "**Apoyo articulado (fijo)**: impide los desplazamientos; permite el giro. **2 reacciones** (horizontal y vertical).",
        "**Empotramiento**: impide desplazamientos y giro. **3 reacciones** (dos fuerzas y un momento).",
        "Una viga con un apoyo articulado y uno simple es **isostática**: 3 incógnitas y 3 ecuaciones.",
      ] },
    ], undefined, "stack"),
    slide("calc", "Reacciones de una viga biapoyada", [
      { kind: "text", text: "Coloca la carga puntual y la carga uniforme. Las reacciones salen de ΣM = 0 y ΣF = 0." },
    ], tool("ti2-reacciones-explorador"), "visual-top"),
    slide("regla", "Resolverlo a mano", [
      { kind: "steps", items: [
        "Σ$M_A$ = 0: $R_B$·L = P·a + (q·L)·(L/2) → se obtiene $R_B$.",
        "Σ$F_y$ = 0: $R_A$ + $R_B$ = P + q·L → se obtiene $R_A$.",
        "Comprobación: Σ$M_B$ = 0 debe dar el mismo $R_A$.",
        "Si una reacción sale **negativa**, actúa en sentido contrario al supuesto (el apoyo tiende a levantarse).",
      ] },
    ]),
    calc("calc-rb", "Reacción en B", "Una viga de 6 m con una carga puntual de 30 kN a 2 m del apoyo A (sin carga uniforme). ¿Cuánto vale $R_B$, en kN? (30·2/6)", nums(10), "30 · 2 / 6 = 10 kN.", "Momentos respecto a A."),
    calc("calc-ra", "Reacción en A", "Con esos datos, ¿cuánto vale $R_A$, en kN?", nums(20), "30 − 10 = 20 kN.", "ΣF = 0."),
    calc("calc-q", "Con carga uniforme", "Una viga de 4 m con 10 kN/m uniformes, ¿cuánto vale cada reacción, en kN?", nums(20), "q·L = 40 kN, repartida a partes iguales: 20 kN cada una.", "La mitad de la carga total."),
    sort("clasifica-apoyo", "¿Cuántas reacciones?", "Clasifica cada apoyo según sus reacciones.",
      [["r1", "1 reacción", "cobalt"], ["r2", "2 reacciones", "amber"], ["r3", "3 reacciones", "emerald"]],
      [["Apoyo simple sobre rodillos", "r1"], ["Pila de un puente con neopreno", "r1"], ["Apoyo articulado (pasador)", "r2"], ["Bisagra fija", "r2"], ["Empotramiento", "r3"], ["Mástil clavado en un bloque de hormigón", "r3"]],
      "Cada restricción añade una reacción.",
    ),
    pick("check-neg", "Reacción negativa", "En una viga con voladizo, una reacción sale negativa. ¿Qué significa?",
      "Que actúa hacia abajo: el apoyo tiende a levantarse y debe anclarse",
      [["Que el cálculo es erróneo", "Es un resultado válido."], ["Que el apoyo no carga", "Sí actúa, en sentido contrario."], ["Que la viga es inestable siempre", "Se puede resolver anclando."]],
      "El signo indica el sentido real de la reacción.",
    ),
  ],
};
