import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const ensayosEvaluacionDocumentacion4esoLesson: InteractiveLesson = {
  slug: "ensayos-evaluacion-documentacion-4eso",
  title: "6. Ensayos, evaluación, documentación y mejora iterativa",
  subtitle: TECESO4_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Probar con método", [
      { kind: "steps", items: [
        "Un **plan de ensayos** define **qué se mide**, **cómo**, con **qué instrumento** y **qué resultado se acepta**.",
        "Cada ensayo se compara con una **especificación** (por ejemplo, soportar ≥ 40 N).",
        "Se repite varias veces y se anotan **todos los resultados**, incluidos los fallos.",
        "Se identifica la **causa** de cada fallo y se propone una **mejora**; se cambia **una cosa cada vez**.",
      ] },
    ], undefined, "stack"),
    slide("ensayo", "Evalúa un prototipo", [
      { kind: "text", text: "Anota las medidas del prototipo y compáralas con cada requisito." },
    ], tool("eso2-pruebas-prototipo-explorador"), "visual-top"),
    slide("spec", "Margen de cumplimiento", [
      { kind: "text", text: "No basta con cumplir: interesa saber con qué margen." },
    ], tool("eso3-especificaciones-explorador"), "visual-top"),
    slide("memoria", "La memoria técnica", [
      { kind: "text", text: "La documentación reúne problema, soluciones, decisiones, planos, costes, ensayos y conclusiones." },
    ], tool("eso2-memoria-explorador"), "visual-top"),
    slide("comu", "Comunicar los resultados", [
      { kind: "steps", items: [
        "Adapta el mensaje a la **audiencia**: usuarios, equipo, cliente, jurado.",
        "Estructura: **problema → solución → resultados → mejoras**, con **datos** y **gráficos claros**.",
        "Un buen **prototipo funcionando** convence más que mil palabras.",
        "**Cita las fuentes** y reconoce el trabajo de otros; **no manipules** los datos.",
      ] },
    ]),
    calc("calc-cumple", "Cumplimiento", "Un prototipo cumple 9 de sus 12 especificaciones. ¿Qué porcentaje cumple?", nums(75), "9 / 12 = 0,75 = 75 %.", "Cumplidas entre totales."),
    calc("calc-rep", "Repeticiones", "Se hace un ensayo 5 veces y se obtienen 38, 42, 41, 39 y 40 N. ¿Cuál es el valor medio, en N?", nums(40), "200 / 5 = 40 N.", "Suma entre cinco."),
    sort("clasifica-doc", "¿Dónde se anota?", "Decide dónde va cada información.",
      [["mem", "Memoria", "cobalt"], ["pla", "Planos", "amber"], ["ens", "Registro de ensayos", "emerald"]],
      [["Análisis de la necesidad y conclusiones", "mem"], ["Soluciones estudiadas y decisión", "mem"], ["Vistas acotadas de cada pieza", "pla"], ["Escala y lista de piezas", "pla"], ["Medidas obtenidas y fallos", "ens"], ["Mejoras propuestas tras cada prueba", "ens"]],
      "Cada documento tiene su función.",
    ),
    pick("check-iter", "Iterar", "Un prototipo no cumple una especificación. ¿Qué hace un equipo de ingeniería?",
      "Analiza la causa, mejora el diseño y vuelve a ensayar",
      [["Cambia la especificación para que cumpla", "Sería trampa."], ["Oculta el resultado", "Los fallos enseñan."], ["Da el proyecto por perdido", "Se mejora con otra iteración."]],
      "La ingeniería es un proceso iterativo.",
    ),
  ],
};
