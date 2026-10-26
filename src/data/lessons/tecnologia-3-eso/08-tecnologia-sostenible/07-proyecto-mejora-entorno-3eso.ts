import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const proyectoMejoraEntorno3esoLesson: InteractiveLesson = {
  slug: "proyecto-mejora-entorno-3eso",
  title: "7. Proyecto de mejora del entorno",
  subtitle: TECESO3_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Tecnología para mejorar tu entorno", [
      { kind: "steps", items: [
        "Un **proyecto de mejora** parte de un problema real de tu centro, barrio o pueblo: energía, residuos, accesibilidad, movilidad.",
        "Se sigue el ciclo: **detectar → especificar → diseñar y simular → construir → evaluar → difundir**.",
        "Hay que **medir** antes y después para saber si se ha mejorado.",
        "En **Asturias**: gestión de residuos, aprovechamiento del agua, eficiencia en edificios públicos y movilidad rural.",
      ] },
    ], undefined, "stack"),
    slide("matriz", "Elige entre ideas", [
      { kind: "text", text: "Compara varias propuestas con criterios ponderados." },
    ], tool("matriz-decision-explorador"), "visual-top"),
    slide("residuos", "Residuos del centro", [
      { kind: "text", text: "Un proyecto típico: reducir y separar los residuos del instituto." },
    ], tool("eso2-residuos-hogar-explorador"), "visual-top"),
    slide("huella", "Huella ambiental", [
      { kind: "text", text: "Mide el impacto de un producto o de una actividad antes de proponer cambios." },
    ], tool("huella-producto-explorador"), "visual-top"),
    slide("ciclo", "Tu propuesta", [
      { kind: "steps", items: [
        "**Problema** medido (por ejemplo: el centro gasta 5 000 kWh al mes).",
        "**Objetivo** con número (reducir un 15 %).",
        "**Solución** y presupuesto (sensores de presencia, LED, aislamiento).",
        "**Indicador** para evaluar (kWh antes y después).",
        "**Difusión**: carteles, charlas o un panel con los datos.",
      ] },
    ]),
    calc("calc-obj", "Objetivo", "El centro gasta 5 000 kWh al mes y quiere reducir un 15 %. ¿Cuántos kWh al mes debe gastar?", nums(4250), "5 000 · 0,85 = 4 250 kWh.", "Quita el 15 %."),
    calc("calc-pay", "¿Compensa?", "Cambiar las luces cuesta 900 € y ahorra 75 € al mes. ¿En cuántos meses se recupera?", nums(12), "900 / 75 = 12 meses.", "Inversión entre ahorro mensual."),
    sort("clasifica-proy", "Etapa del proyecto", "Relaciona cada acción con su etapa.",
      [["det", "Detectar y especificar", "cobalt"], ["dis", "Diseñar y construir", "amber"], ["eva", "Evaluar y difundir", "emerald"]],
      [["Medir cuánta energía se gasta", "det"], ["Fijar un objetivo del 15 %", "det"], ["Elegir la solución con una matriz", "dis"], ["Instalar sensores de presencia", "dis"], ["Comparar los kWh antes y después", "eva"], ["Presentar resultados a la comunidad", "eva"]],
      "Cada etapa aporta una pieza del ciclo.",
    ),
    pick("check-medir", "Medir", "¿Por qué hay que medir antes y después de un proyecto de mejora?",
      "Para saber con datos si la mejora ha funcionado y cuánto",
      [["Para llenar la memoria", "No es la razón."], ["Porque lo pide el profesor", "Tiene sentido técnico."], ["No es necesario", "Sin datos no se puede evaluar."]],
      "Una mejora sin medida es solo una impresión.",
    ),
  ],
};
