import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const documentacionTecnica3esoLesson: InteractiveLesson = {
  slug: "documentacion-tecnica-3eso",
  title: "4. Documentación técnica: memoria, planos y hoja de costes",
  subtitle: TECESO3_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Documentar para que se entienda", [
      { kind: "steps", items: [
        "La **documentación técnica** permite que otra persona entienda, repita o mejore el proyecto.",
        "**Memoria**: problema, requisitos, soluciones estudiadas, decisión, proceso y conclusiones.",
        "**Planos**: vistas acotadas del objeto, con escala, para fabricarlo.",
        "**Hoja de costes y lista de materiales**: cantidades, precios y proveedores.",
        "**Manual de uso y montaje**, y **registro de pruebas**.",
      ] },
    ], undefined, "stack"),
    slide("memoria", "La memoria", [
      { kind: "text", text: "Ordena las secciones de una memoria y comprueba que nada falta." },
    ], tool("eso2-memoria-explorador"), "visual-top"),
    slide("escala", "Planos y escala", [
      { kind: "text", text: "Un plano reduce o amplía el objeto con una escala. Convierte medidas entre el plano y la realidad." },
    ], tool("eso2-escala-conversion-explorador"), "visual-top"),
    slide("version", "Control de versiones", [
      { kind: "steps", items: [
        "Guarda **cada versión** del diseño con fecha y un nombre claro (v1, v2…).",
        "Anota **qué cambió y por qué**.",
        "Haz **copias de seguridad** en la nube del centro o en un repositorio.",
        "Cita las **fuentes** y los materiales de otros: respeta las licencias.",
      ] },
    ]),
    calc("calc-escala", "Medida real", "En un plano a escala 1:5 una pieza mide 36 mm. ¿Cuántos mm mide en la realidad?", nums(180), "36 · 5 = 180 mm.", "Multiplica por el denominador de la escala."),
    calc("calc-plano", "Medida en el plano", "Una pieza de 450 mm se dibuja a escala 1:10. ¿Cuántos mm mide en el plano?", nums(45), "450 / 10 = 45 mm.", "Divide entre el denominador."),
    sort("clasifica-doc", "¿Dónde va?", "Decide en qué documento va cada información.",
      [["mem", "Memoria", "cobalt"], ["pla", "Plano", "amber"], ["cos", "Hoja de costes", "emerald"]],
      [["El problema y los requisitos", "mem"], ["Conclusiones y mejoras", "mem"], ["Vistas acotadas a escala", "pla"], ["Medidas de cada pieza", "pla"], ["Precio de cada material", "cos"], ["Horas de trabajo", "cos"]],
      "Cada documento tiene su función.",
    ),
    pick("check-doc", "Por qué documentar", "¿Para qué sirve sobre todo documentar un proyecto?",
      "Para que otras personas puedan entenderlo, repetirlo y mejorarlo",
      [["Para que ocupe más páginas", "No es la razón."], ["Solo para aprobar", "Va más allá de la nota."], ["Para esconder los fallos", "Se documentan también los fallos."]],
      "Un proyecto sin documentar no se puede reproducir.",
    ),
  ],
};
