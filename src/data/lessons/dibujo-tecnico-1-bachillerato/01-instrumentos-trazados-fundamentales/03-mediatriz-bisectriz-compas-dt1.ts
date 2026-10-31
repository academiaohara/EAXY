import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const mediatrizBisectrizCompasDt1Lesson: InteractiveLesson = {
  slug: "mediatriz-bisectriz-compas-dt1",
  title: "3. Mediatriz y bisectriz con compás",
  subtitle: DT1_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    slide("mediatriz", "Mediatriz de un segmento", [], bench("mediatriz-compas", [
      { title: "Arcos desde A", text: "Abre el compás **más de la mitad** de $AB$, clava la punta seca en $A$ y traza un arco por encima y otro por debajo del segmento.", fact: "Abertura mayor que AB/2" },
      { title: "Arcos desde B", text: "Lleva el compás a $B$ **sin cambiar la abertura** y traza otros dos arcos. Cortan a los anteriores en $C$ y $D$." },
      { title: "Une los cortes", text: "Con la regla, la recta $CD$ es la **mediatriz** de $AB$: pasa por su punto medio $M$ y forma $90^\\circ$ con él.", fact: "Perpendicular por el punto medio" },
      { title: "Equidistan de los extremos", text: "Cada punto $Q$ de la mediatriz está a **la misma distancia** de $A$ que de $B$. Arrástralo y compruébalo.", fact: "QA = QB" },
    ]), "stack"),

    benchTask("mediatriz-practica", "Traza la mediatriz", "mediatriz-practica", [
      { title: "Clava la punta seca", text: "Toca uno de los extremos, $A$ o $B$, para clavar la **punta seca** del compás." },
      { title: "Abre el compás", text: "Arrastra la mina para elegir la abertura: debe ser **mayor que la mitad de $AB$**. Cuando te guste, pulsa «Fijar abertura».", fact: "Abertura mayor que AB/2" },
      { title: "Traza el primer arco", text: "Arrastra la mina para dibujar un arco **por encima y por debajo** del segmento." },
      { title: "Cambia de extremo", text: "**Sin cambiar la abertura**, toca el otro extremo para clavar allí la punta seca." },
      { title: "Traza el segundo arco", text: "Dibuja otro arco por encima y por debajo: debe cortar al primero en dos puntos." },
      { title: "Pasa la regla", text: "Toca los **dos puntos** donde se cortan los arcos: la regla se colocará por ellos y trazará la mediatriz. Después pulsa **Comprobar**." },
    ], {
      question: "Construye la mediatriz del segmento AB con compás y regla.",
      hint: "Usa la misma abertura desde A y desde B, mayor que la mitad de AB, y pasa la regla por los dos cortes.",
      explanation: "Los puntos donde se cortan los arcos equidistan de A y de B; la recta que pasa por los dos es la mediatriz.",
    }),

    slide("bisectriz", "Bisectriz de un ángulo", [], bench("bisectriz-compas", [
      { title: "Arco desde el vértice", text: "Con la punta seca en el vértice $V$, traza un arco que corte a los dos lados en $P$ y $Q$." },
      { title: "Arco desde P", text: "Con una abertura **mayor que la mitad de $PQ$**, clava la punta en $P$ y traza un arco dentro del ángulo.", fact: "Abertura mayor que PQ/2" },
      { title: "Arco desde Q", text: "Lleva el compás a $Q$ **sin cambiar la abertura** y repite. Los dos arcos se cortan en $T$." },
      { title: "Une V con T", text: "Con la regla, la semirrecta $VT$ es la **bisectriz**: divide el ángulo en dos iguales, de $35^\\circ$ cada uno.", fact: "Equidista de los dos lados" },
    ], { a: 70 }), "stack"),

    benchTask("bisectriz-practica", "Traza la bisectriz", "bisectriz-practica", [
      { title: "Clava la punta en el vértice", text: "Toca el vértice $V$ para clavar la **punta seca** del compás." },
      { title: "Abre el compás", text: "Arrastra la mina para elegir una abertura que **corte a los dos lados**. Después pulsa «Fijar abertura»." },
      { title: "Traza el primer arco", text: "Arrastra la mina para trazar un arco que **corte los dos lados**: así quedan marcados $P$ y $Q$." },
      { title: "Clava la punta en P o en Q", text: "Toca uno de los dos puntos donde el arco corta a los lados." },
      { title: "Abre el compás otra vez", text: "Ahora la abertura debe ser **mayor que la mitad de $PQ$**. Arrastra la mina y pulsa «Fijar abertura».", fact: "Abertura mayor que PQ/2" },
      { title: "Traza un arco dentro del ángulo", text: "Arrastra la mina para dibujar un arco **hacia el interior** del ángulo." },
      { title: "Cambia de punto", text: "**Sin cambiar la abertura**, toca el otro punto, $Q$ o $P$." },
      { title: "Traza el segundo arco", text: "Dibuja otro arco que **corte al anterior**: ese corte es el punto $T$." },
      { title: "Pasa la regla", text: "Toca **dos puntos**: el vértice $V$ y el punto $T$ donde se cortan los arcos. La regla trazará la bisectriz. Después pulsa **Comprobar**." },
    ], {
      question: "Construye la bisectriz del ángulo con compás y regla.",
      hint: "Haz el arco desde V, usa la misma abertura desde P y desde Q (mayor que la mitad de PQ) y pasa la regla por V y por el corte T.",
      explanation: "El punto donde se cortan los arcos de igual radio desde P y desde Q equidista de los dos lados; la recta que lo une con V es la bisectriz.",
      params: { a: 70 },
    }),
  ],
};
