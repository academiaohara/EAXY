import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const planosAcotadosRectaDt1Lesson: InteractiveLesson = {
  slug: "planos-acotados-recta-dt1",
  title: "1. Sistema de planos acotados: punto y recta",
  subtitle: DT1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Alturas con números", [
      { kind: "steps", items: [
        "En el **sistema de planos acotados** se proyecta **ortogonalmente** sobre **un único plano horizontal**, el **plano de comparación** (cota 0).",
        "La **altura** de cada punto no se dibuja: se escribe como **cota**, un número, junto al punto: **A₂**, **B₅**.",
        "Necesita una **escala** (numérica o gráfica) porque las medidas se toman en el plano.",
        "Es el sistema de la **topografía**, la **ingeniería civil** y las **cubiertas**: informa del relieve con un solo dibujo.",
      ] },
    ], undefined, "stack"),
    slide("recta", "La recta y su pendiente", [
      { kind: "text", text: "A tiene cota 2. Mueve B y observa la pendiente, el intervalo y la graduación de la recta." },
    ], tool("dt1-recta-acotada-explorador"), "visual-top"),
    slide("conceptos", "Pendiente e intervalo", [
      { kind: "steps", items: [
        "**Pendiente** $p = \\dfrac{\\Delta h}{d}$, con $d$ la **distancia horizontal** entre los puntos. Se expresa en **%** o como ángulo $\\alpha = \\arctan p$.",
        "**Intervalo** $i = \\dfrac{d}{\\Delta h} = \\dfrac{1}{p}$: la distancia horizontal que **sube una unidad** de cota.",
        "**Graduar** la recta es marcar sobre ella los puntos de **cota entera**, equidistantes un intervalo.",
        "La **verdadera magnitud** es la hipotenusa del triángulo de catetos $d$ y $\\Delta h$.",
      ] },
    ]),
    calc("calc-pend", "Pendiente", "A₂ y B₅ están a 10 m de distancia horizontal. ¿Qué pendiente tiene la recta, en %?", nums(30), "p = (5 − 2)/10 = 0,3 = 30 %.", "Desnivel entre distancia horizontal."),
    calc("calc-int", "Intervalo", "Con esa pendiente, ¿cuál es el intervalo, en m? (dos decimales)", nums(3.33, 3.3333), "i = 10/3 ≈ 3,33 m.", "Inverso de la pendiente."),
    calc("calc-ang", "Ángulo", "¿Qué ángulo forma esa recta con el plano horizontal, en grados? (un decimal)", nums(16.7, 16.70), "arctg 0,3 ≈ 16,7°.", "Arcotangente de la pendiente."),
    calc("calc-real", "Longitud real", "¿Cuánto mide el segmento AB real, en m? (dos decimales; catetos 10 y 3)", nums(10.44, 10.4403), "√(100 + 9) ≈ 10,44 m.", "Pitágoras."),
    sort("clasifica-acot", "¿Qué es?", "Asocia cada concepto con su definición.",
      [["cot", "Cota", "cobalt"], ["pen", "Pendiente", "amber"], ["int", "Intervalo", "emerald"]],
      [["Altura de un punto sobre el plano de comparación", "cot"], ["Número que acompaña al punto en el dibujo", "cot"], ["Desnivel dividido por la distancia horizontal", "pen"], ["Tangente del ángulo con el plano horizontal", "pen"], ["Distancia horizontal por cada unidad de cota", "int"], ["Inverso de la pendiente", "int"]],
      "La cota informa de la altura; la pendiente y el intervalo, de la inclinación.",
    ),
    pick("check-int", "Pendiente y intervalo", "Si aumenta la pendiente de una recta, ¿qué ocurre con su intervalo?",
      "Disminuye, porque se sube la misma altura en menos distancia horizontal",
      [["Aumenta", "Son inversos: si uno crece, el otro decrece."], ["No cambia", "Depende de la pendiente."], ["Se hace cero", "Solo en la vertical (pendiente infinita)."]],
      "El intervalo es el inverso de la pendiente: i = 1/p.",
    ),
  ],
};
