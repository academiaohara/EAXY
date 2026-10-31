import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const escalasNumericasGraficasDt1Lesson: InteractiveLesson = {
  slug: "escalas-numericas-graficas-dt1",
  title: "3. Escalas numéricas y gráficas",
  subtitle: DT1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("def", "Reducir y ampliar con rigor", [
      { kind: "steps", items: [
        "La **escala** es la razón entre una longitud del **dibujo** y la longitud **real** que representa: $E = \\dfrac{\\text{dibujo}}{\\text{real}}$.",
        "**1:1** natural. **Ampliación**: **2:1, 5:1, 10:1, 20:1, 50:1**. **Reducción**: **1:2, 1:5, 1:10, 1:20, 1:50, 1:100, 1:200, 1:500, 1:1000**.",
        "Solo se utilizan las escalas **normalizadas** (ISO 5455), indicadas en el cuadro de rotulación.",
        "Las **cotas** siempre expresan la medida **real**, sea cual sea la escala del dibujo.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Elige la escala", [
      { kind: "text", text: "Indica el tamaño real del objeto y el espacio de la hoja: la herramienta elige la mayor escala normalizada que cabe y dibuja la escala gráfica." },
    ], tool("dt1-escala-explorador"), "visual-top"),
    slide("grafica", "Escala gráfica", [
      { kind: "steps", items: [
        "La **escala gráfica** es un segmento dividido en partes iguales, rotulado con las **medidas reales**.",
        "Tiene un **talón** a la izquierda dividido en subdivisiones para leer fracciones.",
        "Si el plano se **fotocopia** o se amplía, la escala gráfica cambia **con él** y **sigue siendo válida**; la numérica ya no lo es.",
        "Para **construirla**: se lleva sobre una línea la unidad (1 m) a la escala dada y se repite.",
      ] },
    ]),
    calc("calc-1-50", "Reducir", "Una pared de 2 m (2000 mm) se dibuja a escala 1:50. ¿Cuántos mm mide en el dibujo?", nums(40), "2000/50 = 40 mm.", "Divide entre 50."),
    calc("calc-2-1", "Ampliar", "Una pieza de 15 mm se dibuja a escala 2:1. ¿Cuántos mm mide en el dibujo?", nums(30), "15 · 2 = 30 mm.", "Multiplica por 2."),
    calc("calc-real", "Medida real", "En un plano a escala 1:200, una distancia mide 45 mm. ¿Cuántos metros reales son?", nums(9), "45 · 200 = 9000 mm = 9 m.", "Multiplica por 200 y pasa a metros."),
    calc("calc-adec", "Escala adecuada", "Un objeto de 1250 mm debe caber en 400 mm de hoja. ¿Cuál es el denominador de la mayor escala de reducción normalizada que lo permite (1:n)?", nums(5), "1:2 daría 625 mm (no cabe); 1:5 da 250 mm (cabe): n = 5.", "Prueba 1:2 y 1:5."),
    sort("clasifica-esc", "¿Ampliación o reducción?", "Clasifica cada escala.",
      [["amp", "Ampliación", "cobalt"], ["nat", "Tamaño natural", "amber"], ["red", "Reducción", "emerald"]],
      [["2:1", "amp"], ["10:1", "amp"], ["1:1", "nat"], ["1:50", "red"], ["1:100", "red"], ["1:1000", "red"]],
      "El primer número es el dibujo y el segundo, la realidad.",
    ),
    pick("check-cota", "Las cotas", "Un plano está a escala 1:100. Una pared mide 30 mm en el dibujo. ¿Qué cota se escribe?",
      "3000 mm (3 m), la medida real",
      [["30 mm, la del dibujo", "Las cotas son siempre reales."], ["300 mm", "Se multiplica por 100, no por 10."], ["0,3 mm", "Se multiplica, no se divide."]],
      "Cualquiera que lea el plano necesita la medida real, no la del papel.",
    ),
  ],
};
