import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const interseccionesDiedricoDt1Lesson: InteractiveLesson = {
  slug: "intersecciones-diedrico-dt1",
  title: "6. Intersecciones: plano con plano y recta con plano",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("def", "Elementos que se cortan", [
      { kind: "steps", items: [
        "La **intersección de dos planos** que no son paralelos es una **recta**. Se halla por sus **trazas**.",
        "La **traza horizontal** de la recta es el punto donde se cortan las **trazas horizontales** de los planos ($\\alpha_1 \\cap \\beta_1$); la **traza vertical**, donde se cortan las **verticales** ($\\alpha_2 \\cap \\beta_2$).",
        "Se unen las proyecciones homónimas de las trazas: **h con v** (proyección horizontal) y **h′ con v′** (vertical).",
        "Si las trazas **horizontales** son paralelas, la recta es **horizontal**; si lo son las **verticales**, la recta es **frontal**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Dos planos, una recta", [
      { kind: "text", text: "El plano α está fijo. Mueve las trazas de β y observa la recta intersección y sus trazas." },
    ], tool("dt1-interseccion-planos-explorador"), "visual-top"),
    slide("recta-plano", "Recta y plano", [
      { kind: "steps", items: [
        "Para hallar el punto en que una **recta corta a un plano** se usa un **plano auxiliar** que **contenga la recta**; el más sencillo es un **plano proyectante**.",
        "Se halla la **recta intersección** del plano auxiliar con el plano dado.",
        "Esta recta corta a la recta dada en el **punto buscado**.",
        "El punto cuenta como **visible** o **oculto** según su posición respecto a los planos; en este nivel basta con obtener sus dos proyecciones.",
      ] },
    ]),
    calc("calc-xh", "Traza horizontal", "La traza horizontal de α es la recta e = x y la de β es e = 4 − x. ¿Cuánto vale x en el punto en que se cortan, en cm?", nums(2), "x = 4 − x ⇒ x = 2 cm (y e = 2 cm).", "Iguala las dos expresiones de e."),
    calc("calc-zv", "Traza vertical", "La traza vertical de α es z = x y la de β es z = 4 − x. ¿Qué cota tiene el punto en que se cortan, en cm?", nums(2), "x = 2 y z = 2 cm.", "Resuelve x = 4 − x."),
    calc("calc-paral", "Trazas paralelas", "Las trazas verticales de dos planos son paralelas y las horizontales se cortan. ¿Cuántas trazas tiene la recta intersección?", nums(1), "Solo tiene traza horizontal: la recta es paralela al PV (frontal).", "Falta la traza vertical."),
    sort("clasifica-inters", "¿Qué se corta con qué?", "Relaciona cada operación con lo que se obtiene.",
      [["h", "Traza horizontal de la recta", "cobalt"], ["v", "Traza vertical de la recta", "amber"], ["r", "Recta intersección", "emerald"]],
      [["Corte de α₁ con β₁", "h"], ["Está en el PH", "h"], ["Corte de α₂ con β₂", "v"], ["Está en el PV", "v"], ["Resultado de cortar dos planos no paralelos", "r"], ["Se dibuja uniendo h con v y h′ con v′", "r"]],
      "Cada traza de la recta sale de las trazas homónimas de los planos.",
    ),
    pick("check-aux", "Recta y plano", "Para hallar la intersección de una recta con un plano, ¿qué plano auxiliar conviene usar?",
      "Un plano proyectante que contenga la recta",
      [["Un plano paralelo al dado", "No se cortaría con el dado."], ["Un plano que no contenga la recta", "Entonces no daría el punto de corte."], ["Cualquier plano horizontal", "No contiene la recta."]],
      "El plano proyectante tiene una traza que coincide con la proyección de la recta, lo que simplifica el trazado.",
    ),
  ],
};
