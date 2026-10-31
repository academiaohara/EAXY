import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { benchTask } from "@/data/lessons/tec1-helpers";

export const mediatrizBisectrizCompasDt1Lesson: InteractiveLesson = {
  slug: "mediatriz-bisectriz-compas-dt1",
  title: "3. Mediatriz y bisectriz con compás",
  subtitle: DT1_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    benchTask("mediatriz", "Mediatriz de un segmento", "mediatriz-compas", [
      { title: "Arcos desde A", text: "Abre el compás **más de la mitad** de $AB$, clava la punta seca en $A$ y traza un arco por encima y otro por debajo del segmento.", fact: "Abertura mayor que AB/2" },
      { title: "Arcos desde B", text: "**Sin cambiar la abertura**, clava la punta en $B$ y traza otros dos arcos. Cortan a los anteriores en $C$ y $D$." },
      { title: "Une los cortes", text: "La recta $CD$ es la **mediatriz** de $AB$: pasa por su punto medio $M$ y forma $90^\\circ$ con él.", fact: "Perpendicular por el punto medio" },
      { title: "Equidistan de los extremos", text: "Cada punto $Q$ de la mediatriz está a **la misma distancia** de $A$ que de $B$. Arrástralo y compruébalo.", fact: "QA = QB" },
      { title: "Ajusta la abertura", text: "Ahora decide tú: **arrastra la mina del compás** para elegir la abertura. Los arcos desde $A$ y desde $B$ deben cortarse. Pulsa **Comprobar**.", fact: "Abertura mayor que AB/2" },
    ], {
      question: "Elige una abertura del compás con la que los arcos desde A y desde B se corten.",
      hint: "La abertura tiene que ser mayor que la mitad de AB.",
      explanation: "Las circunferencias de radio r centradas en A y en B solo se cortan si r es mayor que la mitad de AB; los cortes equidistan de A y de B y definen la mediatriz.",
    }),

    benchTask("bisectriz", "Bisectriz de un ángulo", "bisectriz-compas", [
      { title: "Arco desde el vértice", text: "Con centro en el vértice $V$, traza un arco que corte a los dos lados en $P$ y $Q$." },
      { title: "Arco desde P", text: "Con una abertura **mayor que la mitad de $PQ$**, clava la punta en $P$ y traza un arco dentro del ángulo.", fact: "Abertura mayor que PQ/2" },
      { title: "Arco desde Q", text: "**Sin cambiar la abertura**, repite desde $Q$. Los dos arcos se cortan en $T$." },
      { title: "Une V con T", text: "La semirrecta $VT$ es la **bisectriz**: divide el ángulo en dos iguales, de $35^\\circ$ cada uno.", fact: "Equidista de los dos lados" },
      { title: "Ajusta la abertura", text: "Ahora decide tú: **arrastra la mina del compás** para elegir la abertura de los arcos desde $P$ y desde $Q$. Deben cortarse. Pulsa **Comprobar**.", fact: "Abertura mayor que PQ/2" },
    ], {
      question: "Elige una abertura del compás con la que los arcos desde P y desde Q se corten.",
      hint: "La abertura tiene que ser mayor que la mitad de PQ.",
      explanation: "Las circunferencias del mismo radio centradas en P y en Q solo se cortan si el radio supera la mitad de PQ; el corte T equidista de los dos lados y define la bisectriz.",
      params: { a: 70 },
    }),
  ],
};
