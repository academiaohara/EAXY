import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const evaluacionSolucionesSosteniblesLesson: InteractiveLesson = {
  slug: "evaluacion-soluciones-sostenibles",
  title: "10. Evaluación comparativa de soluciones sostenibles",
  subtitle: TEC1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("indicadores", "Indicadores y criterios", [
      { kind: "steps", items: [
        "**Ambientales**: emisiones (kg CO₂e), consumo de energía (kWh) y de agua (L), residuos (kg).",
        "**Sociales**: accesibilidad, empleo, seguridad, salud, aceptación.",
        "**Económicos**: coste de inversión, coste de operación, coste del ciclo de vida.",
        "**Técnicos**: rendimiento, fiabilidad, mantenimiento.",
      ] },
      { kind: "text", text: "Un buen criterio es **medible**, **relevante** para el problema y **comparable** entre alternativas." },
    ], undefined, "stack"),
    slide("matriz", "Panel de escenarios: movilidad de un barrio", [
      { kind: "text", text: "Compara autobús eléctrico, bicicleta compartida, coche de gasolina y tren de cercanías. Cambia los **pesos** (la importancia que das a cada criterio) y observa cuándo cambia la ganadora. Una buena argumentación explica por qué esos pesos." },
    ], tool("matriz-decision-explorador", { n: 3 }), "visual-top"),
    slide("compromisos", "Compromisos y argumentación", [
      { kind: "steps", items: [
        "Casi nunca hay una solución mejor en todo: hay **compromisos** entre coste, rendimiento e impacto.",
        "Los **pesos** son una decisión de valores: se justifican con las necesidades de las personas afectadas.",
        "Se hace un **análisis de sensibilidad**: ¿sigue ganando la misma opción si cambian algo los pesos o los datos?",
        "Se exponen **ventajas, desventajas e incertidumbres** de la solución elegida.",
      ] },
      { kind: "warning", title: "Pesos hechos a medida", text: "Ajustar los pesos hasta que gane la opción favorita no es evaluar, es justificar una decisión tomada. Los pesos se fijan antes de puntuar." },
    ]),
    slide("indic", "Comprueba cómo afectan las decisiones", [
      { kind: "text", text: "Repasa el efecto de distintas decisiones sobre las tres dimensiones antes de ponderar: una solución con una dimensión muy baja puede no ser aceptable aunque la media sea buena." },
    ], tool("indicadores-decision-explorador"), "visual-top"),
    calc("calc-pond", "Puntuación ponderada", "Una opción obtiene $8$ en emisiones (peso $2$) y $6$ en coste (peso $1$). ¿Cuál es su puntuación ponderada? (2 decimales)",
      nums(7.33), "$(8\\cdot 2 + 6\\cdot 1)/(2+1) = 22/3 = 7{,}33$.", "Suma de peso × nota dividida entre la suma de pesos."),
    calc("calc-coste", "Coste del ciclo de vida", "Una luminaria cuesta $120$ € y gasta $15$ € de electricidad al año durante $10$ años. ¿Cuál es su coste total del ciclo de vida, en €?",
      nums(270), "$120 + 15\\cdot 10 = 270$ €. Otra luminaria de $60$ € que gaste $30$ €/año costaría $360$ €.", "Inversión más gasto anual por años."),
    sort("clasifica-criterio", "Dimensión del criterio", "Clasifica cada criterio de evaluación.",
      [["amb", "Ambiental", "emerald"], ["soc", "Social", "cobalt"], ["eco", "Económico", "amber"]],
      [["kg de CO₂e por viaje", "amb"], ["Litros de agua por unidad", "amb"], ["Accesibilidad para personas con movilidad reducida", "soc"], ["Empleos creados", "soc"], ["Coste de inversión inicial", "eco"], ["Coste de mantenimiento anual", "eco"]],
      "Emisiones y agua son ambientales; accesibilidad y empleo, sociales; inversión y mantenimiento, económicos.",
    ),
    pick("check-sens", "Análisis de sensibilidad", "Al subir un poco el peso del coste cambia la opción ganadora. ¿Qué indica?",
      "Que la decisión es sensible a los pesos y que hay que justificarlos y comunicar esa incertidumbre",
      [["Que la matriz es inútil", "Es justo lo que la hace informativa."], ["Que hay que escoger siempre la más barata", "El peso del coste es una decisión de valores, no una regla."], ["Que se deben cambiar los pesos hasta que gane la preferida", "Eso sería manipular la evaluación."]],
      "Una decisión robusta gana con distintos pesos razonables; si no, hay que explicar de qué depende.",
    ),
    slide("proyecto", "Proyecto del tema", [
      { kind: "text", text: "**Proyecto integrador**: compara dos soluciones para una necesidad real (movilidad, iluminación o climatización) y recomienda una mediante indicadores justificados." },
      { kind: "steps", title: "Entregable", items: [
        "Descripción de la necesidad y de las dos alternativas.",
        "Criterios ambientales, sociales y económicos con su unidad y sus pesos justificados.",
        "Tabla de datos con la fuente de cada cifra y sus incertidumbres.",
        "Cálculo de la puntuación y análisis de sensibilidad.",
        "Recomendación con ventajas, desventajas y qué haría cambiar de opinión.",
      ] },
    ], undefined, "stack"),
  ],
};
