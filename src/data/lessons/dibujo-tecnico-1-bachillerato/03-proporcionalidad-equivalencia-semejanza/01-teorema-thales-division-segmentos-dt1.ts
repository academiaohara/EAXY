import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const teoremaThalesDivisionSegmentosDt1Lesson: InteractiveLesson = {
  slug: "teorema-thales-division-segmentos-dt1",
  title: "1. Proporcionalidad y teorema de Thales",
  subtitle: DT1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("thales", "Dividir un segmento en partes iguales", [], bench("thales-dividir", [
      { title: "Una semirrecta cualquiera", text: "**Teorema de Thales**: si dos rectas que se cortan son cortadas por **paralelas**, los segmentos que determinan son **proporcionales**. Para dividir $AB$ en tres partes iguales, traza por $A$ una semirrecta cualquiera.", fact: "Las paralelas conservan la razón" },
      { title: "Primera marca", text: "Abre el compás una abertura cualquiera, clava la punta en $A$ y marca el punto **1** sobre la semirrecta." },
      { title: "Segunda marca", text: "**Sin cambiar la abertura**, clava la punta en el punto 1 y marca el punto **2**." },
      { title: "Tercera marca", text: "Repite desde el punto 2 y marca el punto **3**: las tres partes de la semirrecta son iguales.", fact: "Tres aberturas iguales" },
      { title: "Une la última marca con B", text: "Con la regla, une el punto **3** con $B$. Esa recta es la que hay que trasladar." },
      { title: "Traza las paralelas", text: "Con escuadra y cartabón, traza por los puntos 2 y 1 **paralelas** a la recta $3B$. Cortan a $AB$ en $Q$ y en $P$.", fact: "Paralelas por 2 y por 1" },
      { title: "Tres partes iguales", text: "Como las paralelas conservan la razón, $AP = PQ = QB$. Llevando $m$ y $n$ marcas se divide en partes **proporcionales**, y la misma idea resuelve la **cuarta proporcional** $x$ de $\\dfrac{a}{b} = \\dfrac{c}{x}$.", fact: "AP = PQ = QB" },
    ]), "stack"),

    benchTask("thales-marcas", "Divide AB en tres partes iguales", "thales-practica", [
      { title: "Clava la punta en A", text: "Toca el extremo $A$ para clavar la **punta seca** del compás." },
      { title: "Abre el compás", text: "Arrastra la mina para elegir una abertura cualquiera y pulsa «Fijar abertura». Cuanto más grande, más lejos llegarán las marcas.", fact: "Una abertura, tres marcas" },
      { title: "Marca el punto 1", text: "Arrastra la mina para trazar un arco que **corte la semirrecta**." },
      { title: "Pasa al punto 1", text: "**Sin cambiar la abertura**, toca el punto 1 para clavar allí la punta." },
      { title: "Marca el punto 2", text: "Traza otro arco que corte la semirrecta." },
      { title: "Pasa al punto 2", text: "Toca el punto 2." },
      { title: "Marca el punto 3", text: "Traza el tercer arco sobre la semirrecta." },
      { title: "Une el 3 con B", text: "Toca **dos puntos**: la tercera marca y $B$. La regla trazará la recta." },
      { title: "Paralela por la marca 2", text: "Ahora las paralelas, **en el mismo dibujo**. El cartabón queda apoyado en la recta $3B$: **arrastra la escuadra** sobre él, sin girarla, hasta que su filo pase por la marca **2**.", fact: "Cortará a AB a dos tercios" },
      { title: "Paralela por la marca 1", text: "Sigue **deslizando la escuadra** hasta que su filo pase por la marca **1**: segunda paralela. Cortan a $AB$ en $Q$ y en $P$.", fact: "Cortará a AB a un tercio" },
    ], {
      question: "Divide AB en tres partes iguales: marca tres partes iguales sobre la semirrecta con el compás, une la tercera marca con B y traza con escuadra y cartabón las paralelas por las marcas 2 y 1.",
      hint: "No cambies la abertura entre una marca y la siguiente, y desliza la escuadra sobre el cartabón sin girarla.",
      explanation: "Con la misma abertura, las tres marcas quedan a la misma distancia unas de otras; la recta que une la tercera con B se traslada con paralelas (la escuadra desliza sin girar), y las paralelas conservan la razón: AP = PQ = QB.",
    }),
  ],
};
