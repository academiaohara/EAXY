import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, slide } from "@/data/lessons/tec1-helpers";

export const escalasNumericasGraficasDt1Lesson: InteractiveLesson = {
  slug: "escalas-numericas-graficas-dt1",
  title: "1. Proporcionalidad y concepto de escala",
  subtitle: DT1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("proporcion", "Reducir o ampliar en la misma proporción", [], bench("escala-proporcion", [
      { title: "Una pieza demasiado grande", text: "Al representar un cuerpo sobre el papel para obtener su «plano industrial», muchas veces su tamaño real **no cabe en la hoja** (o es tan pequeño que no se aprecia).", fact: "Hay que reducir o ampliar" },
      { title: "La misma proporción", text: "Se **reducen o amplían** las medidas reales **en una misma proporción**: todas las medidas del dibujo guardan la misma relación con las reales. Esa relación es la **proporción** o **escala del dibujo**.", fact: "Todas las medidas, en la misma proporción" },
      { title: "Razón entre dos segmentos", text: "Se llama **razón** o proporción a la relación entre los valores de dos segmentos rectilíneos: el número que expresa el valor de un segmento cuando el otro se toma como unidad. Aquí, $AB/ab = 3$.", fact: "AB / ab = 3" },
    ]), "stack"),

    slide("escala", "La escala es un cociente", [], bench("escala-concepto", [
      { title: "Dibujo y realidad", text: "Una medida de **1 400 mm** en la realidad se representa en el dibujo por **70 mm**. Hay que decir cuánto se ha reducido.", fact: "Real: 1 400 mm; dibujo: 70 mm" },
      { title: "La escala", text: "La **escala** es el valor de un cociente: $E = \\dfrac{\\text{medidas del cuerpo en el dibujo}}{\\text{medidas del cuerpo en la realidad}} = \\dfrac{70}{1\\,400} = \\dfrac{1}{20}$.", fact: "E = dibujo / realidad" },
      { title: "Cómo se lee", text: "El dibujo cabe **20 veces** en la realidad: la escala es $1/20$ y se lee **«escala 1 es a 20»**, que se escribe $E = 1:20$.", fact: "1:20 = «1 es a 20»" },
    ]), "stack"),

    slide("explora", "Elige la escala", [], bench("escala-explorador", [
      { title: "La mayor escala normalizada que cabe", text: "Indica el **tamaño real** del objeto y el **espacio** de la hoja: se elige la **mayor escala normalizada** con la que el objeto cabe. La **cota** sigue indicando la medida real, sea cual sea la escala.", fact: "Escala = dibujo / real" },
    ]), "stack"),
  ],
};
