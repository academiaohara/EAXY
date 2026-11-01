import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { benchParte, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const operacionesReglaCompasDt1Lesson: InteractiveLesson = {
  slug: "operaciones-regla-compas-dt1",
  title: "2. Operaciones con la regla y el compás",
  subtitle: DT1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("op-recta", "Recta por dos puntos", [], benchParte("operaciones-regla-compas", 0, [
      { title: "Recta por dos puntos", text: "Con la **regla** se traza la **recta $r$** que pasa por dos puntos dados $A$ y $B$.", fact: "Regla: rectas" },
    ]), "stack"),

    slide("op-interseccion", "Intersección de dos rectas", [], benchParte("operaciones-regla-compas", 1, [
      { title: "Intersección de dos rectas", text: "El **punto $P$** donde se cortan dos rectas $r$ y $s$ es su **intersección**.", fact: "P = r ∩ s" },
    ]), "stack"),

    slide("op-circunferencia", "La circunferencia", [], benchParte("operaciones-regla-compas", 2, [
      { title: "Circunferencia", text: "Con el **compás** se traza la circunferencia de **centro $O$ y radio $R$**: la punta seca en $O$ y la mina a distancia $R$.", fact: "Compás: circunferencias y arcos" },
    ]), "stack"),

    slide("op-cortes", "Cortes con una circunferencia", [], benchParte("operaciones-regla-compas", 3, [
      { title: "Recta y circunferencia", text: "Una recta y una circunferencia se cortan, como mucho, en **dos puntos** $A$ y $B$.", fact: "Hasta 2 puntos" },
      { title: "Dos circunferencias", text: "Dos circunferencias que se cortan lo hacen en **dos puntos** $A$ y $B$. Es la base de casi todas las construcciones con compás.", fact: "Hasta 2 puntos" },
    ]), "stack"),

    slide("op-segmento", "Transporte de un segmento", [], benchParte("operaciones-regla-compas", 5, [
      { title: "Transporte de un segmento", text: "Se toma el segmento $AB$ con el compás, se clava la punta en $C$ y se traza un arco que corta a la recta en $D$: $CD = AB$.", fact: "CD = AB" },
    ]), "stack"),

    slide("op-angulo", "Transporte de un ángulo", [], benchParte("operaciones-regla-compas", 6, [
      { title: "Transporte de un ángulo", text: "En el ángulo de vértice $A$ se traza un arco que corta a los lados en dos puntos; se toma con el compás la **distancia entre esos dos cortes** (la cuerda). Con la misma abertura de arco se traza otro desde $B$, y desde el corte con la base se marca la cuerda: el ángulo en $B$ es igual al de $A$ (se ve con detalle más adelante, al trasladar un ángulo).", fact: "Misma abertura, misma cuerda" },
    ]), "stack"),

    benchTask("transporte-segmento", "Transporta un segmento", "transporte-segmento-practica", [
      { title: "Toma el segmento AB", text: "Toca los dos extremos del segmento $AB$: el compás queda con su longitud.", fact: "Abertura = AB" },
      { title: "Clava la punta en C", text: "Toca el punto $C$ de la recta, sin cambiar la abertura." },
      { title: "Traza el arco", text: "Arrastra la mina para trazar un arco que **corte a la recta** a la derecha de $C$." },
      { title: "Marca D", text: "Toca el punto donde el arco corta a la recta: es el extremo $D$." },
      { title: "Une C con D", text: "La regla traza sola el segmento $CD$: es igual a $AB$.", fact: "CD = AB" },
    ], {
      question: "Transporta el segmento AB sobre la recta, a partir del punto C.",
      hint: "No cambies la abertura del compás: el arco con centro en C y radio AB corta a la recta en D.",
      explanation: "El compás conserva la abertura entre dos usos, así que el arco con centro en C y radio AB corta a la recta a una distancia AB de C: CD = AB, sin medir con la regla.",
    }),
  ],
};
