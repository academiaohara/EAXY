import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { anim, slide } from "@/data/lessons/tec1-helpers";

export const traslacionDt1Lesson: InteractiveLesson = {
  slug: "traslacion-dt1",
  title: "1. Traslación",
  subtitle: DT1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("transformaciones", "Transformaciones del plano", [
      { kind: "definition", text: "Una **transformación** hace corresponder a cada punto de una figura otro punto del plano. Las más sencillas son la **traslación**, el **giro** y la **homotecia**." },
    ], anim("dt1-transformaciones-tipos"), "visual-top"),
    slide("traslacion", "La traslación", [
      { kind: "definition", text: "Dado un vector $\\overrightarrow{VV'}$, cada punto $A$ pasa a $A'$ con $\\overrightarrow{AA'}$ **equipolente** a $\\overrightarrow{VV'}$: misma dirección, magnitud y sentido." },
      { kind: "facts", items: [
        { tex: "T(A) \\equiv A'", label: "Transformado de A" },
        { tex: "\\overrightarrow{AA'} = \\overrightarrow{BB'} \\Rightarrow AB = A'B'", label: "AA′B′B es un paralelogramo" },
      ] },
    ], anim("dt1-traslacion"), "visual-top"),
    slide("traslacion-propiedades", "Qué ocurre con las figuras", [
      { kind: "relations", items: [
        { left: "Una recta", relation: "se transforma en", right: "otra recta paralela" },
        { left: "Un ángulo", relation: "se transforma en", right: "otro ángulo igual" },
        { left: "Un polígono", relation: "se transforma en", right: "otro polígono igual" },
        { left: "Un círculo", relation: "se transforma en", right: "otro círculo igual, con el centro trasladado" },
        { left: "Una recta paralela al vector", relation: "se transforma en", right: "sí misma (recta doble)" },
      ] },
      { kind: "rule", title: "Vector traslación", text: "Su módulo, dirección y sentido son la **amplitud**, la **dirección** y el **sentido** de la traslación. Queda determinada por una pareja de puntos homólogos $A$ y $A'$, y la **aplicación sucesiva** de traslaciones es otra traslación." },
    ]),
    ...construccionPasos("traslacion-figura"),
  ],
};
