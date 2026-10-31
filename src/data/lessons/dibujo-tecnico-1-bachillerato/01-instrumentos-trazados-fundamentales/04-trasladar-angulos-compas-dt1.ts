import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const trasladarAngulosCompasDt1Lesson: InteractiveLesson = {
  slug: "trasladar-angulos-compas-dt1",
  title: "4. Trasladar un ángulo con compás",
  subtitle: DT1_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    slide("trasladar", "Trasladar un ángulo", [], bench("trasladar-angulo-compas", [
      { title: "Arco en el ángulo original", text: "Con la punta seca en el vértice $V$, traza un arco que corte a los dos lados en $P$ y $Q$." },
      { title: "El mismo arco en la nueva semirrecta", text: "**Sin cambiar la abertura**, clava la punta en el nuevo vértice $V'$ y traza un arco que corte a la semirrecta en $P'$." },
      { title: "Toma la medida PQ", text: "Abre el compás tomando la distancia entre $P$ y $Q$: punta seca en $P$ y mina en $Q$.", fact: "Abertura = PQ" },
      { title: "Corta el arco", text: "Sin variar esa abertura, clava la punta en $P'$ y traza un arco que corte al anterior en $Q'$." },
      { title: "Une V' con Q'", text: "Con la regla, la semirrecta $V'Q'$ forma con la base **el mismo ángulo** que el original: los triángulos $VPQ$ y $V'P'Q'$ tienen los tres lados iguales.", fact: "Tres lados iguales → ángulos iguales" },
    ], { a: 55 }), "stack"),

    benchTask("trasladar-practica", "Traslada el ángulo", "trasladar-practica", [
      { title: "Clava la punta en V", text: "Toca el vértice $V$ del ángulo para clavar la **punta seca** del compás." },
      { title: "Abre el compás", text: "Arrastra la mina para elegir una abertura que **corte a los dos lados**. Después pulsa «Fijar abertura»." },
      { title: "Traza el primer arco", text: "Arrastra la mina para trazar un arco que **corte los dos lados**: así quedan marcados $P$ y $Q$." },
      { title: "Lleva la punta a V'", text: "**Sin cambiar la abertura**, toca el vértice $V'$ de la nueva semirrecta." },
      { title: "Traza el mismo arco", text: "Arrastra la mina para trazar un arco que **corte la semirrecta** y suba por encima de ella." },
      { title: "Toma la medida PQ", text: "Ahora mide la distancia entre $P$ y $Q$: toca $P$ para clavar la punta y $Q$ para colocar la mina.", fact: "Abertura = PQ" },
      { title: "Clava la punta en P'", text: "Toca el punto $P'$ donde el arco corta a la semirrecta." },
      { title: "Corta el arco", text: "Arrastra la mina para trazar un arco que **corte al anterior**: ese corte es el punto $Q'$." },
      { title: "Pasa la regla", text: "Toca **dos puntos**: el vértice $V'$ y el punto $Q'$ donde se cortan los arcos. La regla trazará el ángulo." },
    ], {
      question: "Traslada el ángulo de vértice V a la semirrecta de origen V' con compás y regla.",
      hint: "Haz el mismo arco en V y en V', toma la distancia PQ y córtala desde P' para encontrar Q'.",
      explanation: "Los triángulos VPQ y V'P'Q' tienen los tres lados iguales (dos radios iguales y la misma distancia PQ), así que sus ángulos en V y en V' son iguales.",
      params: { a: 55 },
    }),
  ],
};
