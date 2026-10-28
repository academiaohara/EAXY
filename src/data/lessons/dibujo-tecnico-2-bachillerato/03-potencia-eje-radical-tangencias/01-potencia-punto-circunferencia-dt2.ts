import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const potenciaPuntoCircunferenciaDt2Lesson: InteractiveLesson = {
  slug: "potencia-punto-circunferencia-dt2",
  title: "1. Potencia de un punto respecto de una circunferencia",
  subtitle: DT2_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Un producto que no cambia", [
      { kind: "steps", items: [
        "Desde un punto **P** se trazan **secantes** a una circunferencia: cada una la corta en dos puntos A y B.",
        "El producto **PA · PB** es **el mismo** para todas las secantes que salen de P. A ese valor constante se le llama **potencia** de P respecto de la circunferencia.",
        "Si P es exterior, coincide con el cuadrado de la **tangente**: **PA · PB = PT²**.",
        "En función de la distancia **d** de P al centro y el radio **r**: **p = d² − r²**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Gira la secante", [
      { kind: "text", text: "Mueve el punto P y gira la secante. Observa que los puntos A y B cambian, pero su producto no." },
    ], tool("dt2-potencia-punto-explorador"), "visual-top"),
    slide("signo", "El signo de la potencia", [
      { kind: "steps", items: [
        "**p > 0**: P es **exterior**. Existen tangentes y la longitud de cada una es $\\sqrt{p}$.",
        "**p = 0**: P está **sobre** la circunferencia. La tangente tiene longitud cero.",
        "**p < 0**: P es **interior**. Ninguna recta por P es tangente; el producto se toma con signo negativo porque A y B quedan a lados opuestos de P.",
        "La potencia mide, de un solo número, **dónde está** un punto respecto de la circunferencia y cuánto.",
      ] },
    ]),
    calc("calc-p", "Calcula una potencia", "Una circunferencia tiene radio 3 cm. Un punto P está a 5 cm de su centro. ¿Cuánto vale su potencia en cm²?", nums(16), "p = d² − r² = 25 − 9 = 16 cm².", "Eleva al cuadrado las dos distancias y réstalas."),
    calc("calc-t", "Longitud de la tangente", "Con esa misma potencia, ¿cuánto mide la tangente desde P hasta la circunferencia, en cm?", nums(4), "PT = √16 = 4 cm (es un triángulo 3-4-5).", "La tangente es la raíz cuadrada de la potencia."),
    calc("calc-sec", "Una secante", "Desde P una secante corta la circunferencia en A y B. Se mide PA = 2 cm y la potencia es 16 cm². ¿Cuánto mide PB, en cm?", nums(8), "PA · PB = 16, así que PB = 16 / 2 = 8 cm.", "Divide la potencia entre PA."),
    sort("clasifica", "Posición del punto", "Clasifica cada caso según la posición de P respecto de la circunferencia.",
      [["ext", "Exterior", "cobalt"], ["sobre", "Sobre la circunferencia", "amber"], ["int", "Interior", "emerald"]],
      [["d = 7, r = 4", "ext"], ["d = 5, r = 3", "ext"], ["d = 4, r = 4", "sobre"], ["Potencia cero", "sobre"], ["d = 2, r = 5", "int"], ["Potencia negativa", "int"]],
      "El signo de d² − r² decide la posición del punto.",
    ),
    pick("check", "¿Qué se conserva?", "Giras la secante alrededor de P exterior. ¿Qué valor permanece constante?",
      "El producto PA · PB",
      [["La suma PA + PB", "La suma cambia al girar."], ["La longitud AB", "La cuerda AB cambia."], ["El ángulo APB", "El ángulo cambia con la secante."]],
      "Lo constante es el producto: es la potencia del punto.",
    ),
  ],
};
