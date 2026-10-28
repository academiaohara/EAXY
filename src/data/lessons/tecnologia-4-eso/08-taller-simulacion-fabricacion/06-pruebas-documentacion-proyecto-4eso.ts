import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const pruebasDocumentacionProyecto4esoLesson: InteractiveLesson = {
  slug: "pruebas-documentacion-proyecto-4eso",
  title: "6. Pruebas, documentación y proyecto de taller",
  subtitle: TECESO4_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Construir y comprobar", [
      { kind: "steps", items: [
        "**Plan de construcción**: lista de piezas, herramientas, orden de montaje y tiempos.",
        "**Prototipo**: se construye por partes y se comprueba cada parte antes del montaje final.",
        "**Pruebas de funcionamiento**: ¿hace lo que se pidió? Se miden las magnitudes y se comparan con las especificaciones.",
        "**Registro**: cada fallo, su causa y su solución.",
        "**Documentación final**: memoria, planos, lista de materiales, costes, manual de uso y de montaje.",
      ] },
    ], undefined, "stack"),
    slide("pruebas", "Evalúa tu prototipo", [
      { kind: "text", text: "Anota las medidas y compáralas con cada requisito." },
    ], tool("eso2-pruebas-prototipo-explorador"), "visual-top"),
    slide("memoria", "La memoria técnica", [
      { kind: "text", text: "Ordena los apartados de la memoria de tu proyecto." },
    ], tool("eso2-memoria-explorador"), "visual-top"),
    slide("proy", "Proyecto final", [
      { kind: "steps", items: [
        "**Elige** un problema real (un sistema automático, una máquina sencilla, un dispositivo accesible).",
        "**Especifica** con valores medibles y **planifica** con el camino crítico.",
        "**Diseña** y **simula** (CAD, circuito, mecanismo) y fabrica con las técnicas del taller.",
        "**Ensaya**, mejora y **documenta**; **comunica** los resultados con datos.",
        "Revisa la **sostenibilidad** (materiales, energía, reparabilidad) y la **accesibilidad**.",
      ] },
    ]),
    calc("calc-plazo", "Plazo", "Un proyecto tiene tareas críticas de 3, 2, 4, 2 y 2 días en cadena. ¿Cuántos días dura?", nums(13), "3 + 2 + 4 + 2 + 2 = 13 días.", "Suma el camino crítico."),
    calc("calc-cumple", "Cumplimiento", "El prototipo cumple 10 de 12 especificaciones. ¿Qué porcentaje cumple? (redondea a un entero)", nums(83, 83.3), "10 / 12 = 0,833 = 83 %.", "Cumplidas entre totales."),
    sort("clasifica-fase", "¿En qué fase?", "Relaciona cada actividad con su fase.",
      [["dis", "Diseño y simulación", "cobalt"], ["con", "Construcción", "amber"], ["eva", "Evaluación y documentación", "emerald"]],
      [["Modelar en CAD", "dis"], ["Simular el circuito", "dis"], ["Cortar y mecanizar las piezas", "con"], ["Soldar y montar", "con"], ["Medir y comparar con las especificaciones", "eva"], ["Redactar la memoria", "eva"]],
      "Cada fase aporta una pieza del proyecto.",
    ),
    pick("check-fin", "Cierre", "Un proyecto funciona, pero no se ha documentado. ¿Qué ocurre?",
      "Nadie más podrá entenderlo, repetirlo ni mejorarlo",
      [["Nada, lo importante es que funcione", "Sin documentación no es reproducible."], ["Es mejor porque es más corto", "Pierde su valor."], ["Se puede documentar un año después sin problema", "Se olvidan los detalles."]],
      "La documentación es parte del producto.",
    ),
  ],
};
