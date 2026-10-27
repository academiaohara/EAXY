import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const toleranciasAjustes4esoLesson: InteractiveLesson = {
  slug: "tolerancias-ajustes-4eso",
  title: "4. Tolerancias, ajustes y medición",
  subtitle: TECESO4_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Nada se fabrica exacto", [
      { kind: "steps", items: [
        "Ninguna pieza sale con la medida exacta: se admite una **tolerancia** entre una medida máxima y una mínima.",
        "Se escribe, por ejemplo, **20 ±0,1 mm** o **Ø20 H7/g6**.",
        "Una **tolerancia pequeña** da más precisión, pero **cuesta más** fabricarla y medirla.",
        "Un **ajuste** describe cómo encajan dos piezas (eje y agujero) y qué holgura o apriete hay.",
      ] },
    ], undefined, "stack"),
    slide("ajuste", "Eje y agujero", [
      { kind: "text", text: "Ajusta las desviaciones del agujero y del eje en micras y mira la holgura y el tipo de ajuste." },
    ], tool("eso4-ajuste-explorador"), "visual-top"),
    slide("calibre", "Medir con precisión", [
      { kind: "text", text: "Para comprobar una tolerancia hay que medir con un instrumento adecuado. Practica con el pie de rey." },
    ], tool("eso2-calibre-explorador"), "visual-top"),
    slide("tipos", "Tipos de ajuste", [
      { kind: "steps", items: [
        "**Con juego**: el eje siempre entra y gira libre (cojinetes, ejes de poleas locas).",
        "**Con apriete**: el eje es mayor que el agujero y se monta **a presión** o calentando (ruedas calzadas, rodamientos en su alojamiento).",
        "**Indeterminado**: puede quedar con un poco de juego o de apriete (piezas que se deben centrar y desmontar).",
        "Se eligen por la **función**, no por el gusto: más apriete = más fuerza de sujeción.",
      ] },
    ]),
    calc("calc-tol", "Tolerancia total", "Una pieza se fabrica a 20 ±0,1 mm. ¿Cuál es la tolerancia total, en mm?", nums(0.2), "0,1 + 0,1 = 0,2 mm.", "Suma la parte positiva y la negativa."),
    calc("calc-max", "Holgura máxima", "Agujero con ES = +25 µm y EI = 0; eje con es = −10 µm y ei = −29 µm. ¿Cuál es la holgura máxima (ES − ei), en µm?", nums(54), "25 − (−29) = 54 µm.", "ES menos ei."),
    calc("calc-min", "Holgura mínima", "Con los mismos datos, ¿cuál es la holgura mínima (EI − es), en µm?", nums(10), "0 − (−10) = 10 µm.", "EI menos es."),
    sort("clasifica-ajuste", "¿Qué ajuste?", "Elige el ajuste más adecuado para cada pieza.",
      [["jue", "Con juego", "emerald"], ["apr", "Con apriete", "rose"]],
      [["Eje que gira en un cojinete", "jue"], ["Pasador que debe poder retirarse a mano", "jue"], ["Polea loca sobre su eje", "jue"], ["Rueda dentada fija a su eje sin chaveta", "apr"], ["Aro de un rodamiento en su alojamiento", "apr"], ["Casquillo introducido a presión", "apr"]],
      "El juego permite el giro; el apriete evita que se muevan.",
    ),
    pick("check-tol", "Más precisión", "¿Qué ocurre con el coste de una pieza si se exige una tolerancia mucho menor?",
      "Aumenta, porque hacen falta máquinas y mediciones más precisas",
      [["Disminuye", "Se encarece."], ["No cambia", "Cuesta más."], ["Se anula", "No se anula."]],
      "Conviene exigir solo la precisión que la función necesita.",
    ),
  ],
};
