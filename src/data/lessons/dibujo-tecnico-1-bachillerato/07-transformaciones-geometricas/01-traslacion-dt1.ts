import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide } from "@/data/lessons/tec1-helpers";

export const traslacionDt1Lesson: InteractiveLesson = {
  slug: "traslacion-dt1",
  title: "1. Traslación",
  subtitle: DT1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("transformaciones", "Transformaciones geométricas y traslación", [
      { kind: "definition", text: "Una **transformación** es una correspondencia entre dos elementos de un conjunto. Aquí se estudian las más sencillas del plano: la **traslación**, el **giro** y la **homotecia**." },
      { kind: "definition", text: "Dado un vector $d = \\overrightarrow{VV'}$ de un plano, la **traslación** $T$ hace corresponder a cada punto $A$ de la figura $F$ otro punto $A'$ de la figura $F'$ tal que $\\overrightarrow{AA'}$ es **equipolente** a $\\overrightarrow{VV'}$: misma dirección, magnitud y sentido." },
      { kind: "facts", items: [
        { tex: "T(A) \\equiv A'", label: "Transformado de A" },
        { tex: "\\overrightarrow{AA'} = \\overrightarrow{BB'} \\Rightarrow AB = A'B'", label: "AA′B′B es un paralelogramo" },
      ] },
      { kind: "text", text: "En toda traslación la figura transformada de una **recta** es otra recta **paralela**; la de un **ángulo**, otro ángulo igual; la de un **polígono**, otro polígono **igual**; y la de un **círculo**, otro círculo igual cuyo centro es el trasladado del centro. Una recta paralela al vector se transforma en sí misma." },
      { kind: "text", text: "El vector se llama **vector traslación**; su módulo, dirección y sentido son la **amplitud**, la **dirección** y el **sentido** de la traslación. La traslación queda determinada conociendo una pareja de puntos homólogos $A$ y $A'$, y la aplicación sucesiva de traslaciones produce otra traslación." },
    ]),
    ...construccionPasos("traslacion-figura"),
  ],
};
