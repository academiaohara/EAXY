import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, calc, nums, pick, slide, tool } from "@/data/lessons/tec1-helpers";

export const escalasNumericasGraficasDt1Lesson: InteractiveLesson = {
  slug: "escalas-numericas-graficas-dt1",
  title: "1. Proporcionalidad y concepto de escala",
  subtitle: DT1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("proporcion", "Reducir o ampliar en la misma proporción", [
      { kind: "steps", items: [
        "Al representar un objeto sobre el papel para tener su «plano industrial», a veces su tamaño, grande o pequeño, **no permite dibujarlo con las medidas reales**. Hay que **reducir o ampliar** las medidas reales **en una misma proporción**.",
        "La **proporción** o **escala del dibujo** es la relación que existe entre las medidas del dibujo y las medidas reales del objeto.",
        "Se llama también **razón** o proporción a la relación entre los valores numéricos de dos segmentos rectilíneos: el número que expresa el valor de un segmento cuando el otro se toma como unidad.",
      ] },
    ], undefined, "stack"),

    slide("escala", "La escala es un cociente", [], bench("escala-concepto", [
      { title: "Dibujo y realidad", text: "Una medida de **1 400 mm** en la realidad se representa en el dibujo por **70 mm**. Hay que decir cuánto se ha reducido.", fact: "Real: 1 400 mm; dibujo: 70 mm" },
      { title: "La escala", text: "La **escala** es el valor de un cociente: $E = \\dfrac{\\text{medidas del cuerpo en el dibujo}}{\\text{medidas del cuerpo en la realidad}} = \\dfrac{70}{1\\,400} = \\dfrac{1}{20}$.", fact: "E = dibujo / realidad" },
      { title: "Cómo se lee", text: "El dibujo cabe **20 veces** en la realidad: la escala es $1/20$ y se lee **«escala 1 es a 20»**, que se escribe $E = 1:20$.", fact: "1:20 = «1 es a 20»" },
    ]), "stack"),

    slide("explora", "Elige la escala", [
      { kind: "text", text: "Indica el tamaño real del objeto y el espacio de la hoja: la herramienta elige la mayor escala normalizada que cabe y dibuja la escala gráfica." },
    ], tool("dt1-escala-explorador"), "visual-top"),

    calc("calc-razon", "Calcula la escala", "Una medida de 1 400 mm se representa en el dibujo por 70 mm. ¿Cuál es N en la escala 1:N?", nums(20), "E = 70/1 400 = 1/20, es decir, 1:20.", "Divide la medida real entre la del dibujo."),
    calc("calc-1-50", "Reducir", "Una pared de 2 m (2000 mm) se dibuja a escala 1:50. ¿Cuántos mm mide en el dibujo?", nums(40), "2000/50 = 40 mm.", "Divide entre 50."),
    calc("calc-2-1", "Ampliar", "Una pieza de 15 mm se dibuja a escala 2:1. ¿Cuántos mm mide en el dibujo?", nums(30), "15 · 2 = 30 mm.", "Multiplica por 2."),
    calc("calc-real", "Medida real", "En un plano a escala 1:200, una distancia mide 45 mm. ¿Cuántos metros reales son?", nums(9), "45 · 200 = 9000 mm = 9 m.", "Multiplica por 200 y pasa a metros."),
    pick("pick-lectura", "Cómo se lee", "La escala E = 1:20 se lee…",
      "«escala 1 es a 20»: 1 unidad del dibujo equivale a 20 de la realidad",
      [["«escala 20 es a 1»: 20 unidades del dibujo equivalen a 1 de la realidad", "Eso sería una ampliación 20:1."], ["«escala 1 menos 20»", "Los dos puntos no son una resta, indican la razón."]],
      "El primer número es el del dibujo y el segundo, el de la realidad.",
    ),
  ],
};
