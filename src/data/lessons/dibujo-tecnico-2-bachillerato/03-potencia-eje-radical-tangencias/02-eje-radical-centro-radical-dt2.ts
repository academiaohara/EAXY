import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const ejeRadicalCentroRadicalDt2Lesson: InteractiveLesson = {
  slug: "eje-radical-centro-radical-dt2",
  title: "2. Eje radical y centro radical",
  subtitle: DT2_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Igual potencia respecto de dos circunferencias", [
      { kind: "steps", items: [
        "Dadas dos circunferencias, los puntos que tienen **la misma potencia** respecto de ambas forman una **recta**: el **eje radical**.",
        "Es siempre **perpendicular a la línea de centros**.",
        "Si las circunferencias son **secantes**, el eje pasa por sus dos puntos de corte. Si son **tangentes**, es la tangente común en el punto de contacto.",
        "Si son **concéntricas**, no existe: no hay puntos de igual potencia.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Mueve las circunferencias", [
      { kind: "text", text: "Cambia radios y distancia. Sitúa el punto Q sobre el eje y comprueba que las dos potencias coinciden." },
    ], tool("dt2-eje-radical-explorador"), "visual-top"),
    slide("constr-anim", "Trazado con una auxiliar", [
      { kind: "text", text: "Mira cómo se traza el eje radical con una circunferencia auxiliar y el centro radical." },
    ], anim("dt2-eje-radical-construccion"), "visual-top"),
    slide("centro", "El centro radical", [
      { kind: "steps", items: [
        "Con **tres** circunferencias (centros no alineados) se tienen **tres** ejes radicales, uno por cada pareja.",
        "Los tres ejes se cortan en **un solo punto**: el **centro radical**.",
        "Ese punto tiene la **misma potencia** respecto de las tres circunferencias.",
        "Si el centro radical es exterior, las **tangentes** trazadas desde él a las tres circunferencias miden lo mismo: **una circunferencia con centro en él las corta ortogonalmente**.",
      ] },
    ]),
    slide("construccion", "Cómo se traza el eje radical", [
      { kind: "steps", items: [
        "Se traza una **tercera circunferencia auxiliar** que corte a las dos dadas.",
        "Se dibujan los dos **ejes radicales** auxiliares (las cuerdas comunes de la auxiliar con cada una).",
        "Se cortan en un punto **M**: es un punto del eje radical buscado, porque tiene la misma potencia respecto de las tres.",
        "Por **M** se traza la perpendicular a la línea de centros: ese es el eje radical.",
      ] },
    ]),
    calc("calc-x", "Posición del eje", "Dos circunferencias con centros a D = 8 cm, de radios r₁ = 5 cm y r₂ = 3 cm. El eje radical está a x = (D² + r₁² − r₂²) / (2D) del primer centro. ¿Cuánto vale x en cm?", nums(5), "x = (64 + 25 − 9) / 16 = 80 / 16 = 5 cm.", "Calcula numerador y divide entre 2D = 16."),
    calc("calc-igual", "Radios iguales", "Si dos circunferencias tienen el mismo radio y los centros están a 6 cm, ¿a qué distancia de un centro está el eje radical, en cm?", nums(3), "Con r₁ = r₂ queda x = D/2 = 3 cm: es la mediatriz.", "Los términos de los radios se cancelan."),
    sort("clasifica", "¿Qué eje o punto?", "Relaciona cada afirmación con el elemento correspondiente.",
      [["eje", "Eje radical", "cobalt"], ["cen", "Centro radical", "amber"]],
      [["Es una recta", "eje"], ["Perpendicular a la línea de centros", "eje"], ["Pasa por los puntos de corte de dos circunferencias secantes", "eje"], ["Es un punto", "cen"], ["Se obtiene con tres circunferencias", "cen"], ["Intersección de los tres ejes radicales", "cen"]],
      "El eje es una recta por pareja; el centro es el punto común de los tres ejes.",
    ),
    pick("check", "Circunferencias tangentes", "Dos circunferencias son tangentes exteriores. ¿Qué recta es su eje radical?",
      "La tangente común en el punto de contacto",
      [["La línea de centros", "El eje es perpendicular a ella."], ["La mediatriz de los radios", "No se define así."], ["No tienen eje radical", "Sí lo tienen."]],
      "El punto de contacto tiene potencia cero respecto de las dos, y el eje es perpendicular a la línea de centros por él.",
    ),
  ],
};
