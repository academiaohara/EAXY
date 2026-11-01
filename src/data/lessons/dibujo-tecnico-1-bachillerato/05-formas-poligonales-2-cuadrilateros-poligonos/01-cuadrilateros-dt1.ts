import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const cuadrilaterosDt1Lesson: InteractiveLesson = {
  slug: "cuadrilateros-dt1",
  title: "1. Cuadriláteros: clasificación y construcción",
  subtitle: DT1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Familias de cuadriláteros", [
      { kind: "steps", items: [
        "**Paralelogramos** (dos pares de lados paralelos): **cuadrado**, **rectángulo**, **rombo** y **romboide**.",
        "**Trapecios** (un solo par de lados paralelos): **rectángulo**, **isósceles** y **escaleno**.",
        "**Trapezoides** (ningún par paralelo): como el **deltoide**, con dos pares de lados consecutivos iguales.",
        "Los ángulos interiores de cualquier cuadrilátero suman **360°**.",
      ] },
    ], undefined, "stack"),

    slide("prop", "Propiedades útiles para construir", [
      { kind: "steps", items: [
        "**Paralelogramo**: lados y ángulos opuestos iguales; las diagonales **se cortan en su punto medio**.",
        "**Rectángulo**: diagonales **iguales**. **Rombo**: diagonales **perpendiculares** y bisectrices de los ángulos.",
        "**Cuadrado**: reúne ambas; el lado es $d/\\sqrt{2}$, con $d$ la diagonal.",
        "**Trapecio isósceles**: lados no paralelos iguales, diagonales iguales y es **inscriptible** en una circunferencia.",
        "Para **construir** un paralelogramo bastan dos lados y el ángulo que forman, o un lado y las dos diagonales.",
      ] },
    ], undefined, "stack"),

    slide("rombo", "Rombo dados el lado y una diagonal", [], bench("rombo-compas", [
      { title: "Los datos", text: "Se conoce la diagonal $AC = 24$ cm y el lado $l = 15$ cm. En un rombo **los cuatro lados son iguales**, así que $B$ y $D$ están a distancia $l$ de $A$ y de $C$.", fact: "AB = BC = CD = DA = l" },
      { title: "Arco desde A", text: "Toma $l$ con el compás, clava la punta en $A$ y traza un arco **a los dos lados** de la diagonal." },
      { title: "Arco desde C", text: "Con la misma abertura y la punta en $C$, traza otro arco. Se cortan en **dos puntos**: $B$ y $D$.", fact: "Dos cortes: B y D" },
      { title: "Une los puntos", text: "Une $A$, $B$, $C$ y $D$ con la regla: los cuatro lados valen $l$." },
      { title: "La otra diagonal", text: "Al trazar $BD$ aparece $M$, punto medio de $AC$, y las diagonales forman **90°**: son perpendiculares y se bisecan.", fact: "Diagonales perpendiculares" },
    ]), "stack"),

    benchTask("rombo-construye", "Construye el rombo", "rombo-practica", [
      { title: "Toma el lado l", text: "Toca los dos extremos del segmento $l$: el compás queda con la longitud del lado.", fact: "Abertura = l" },
      { title: "Clava la punta en A", text: "Toca el extremo $A$ de la diagonal." },
      { title: "Arco desde A", text: "Arrastra la mina para trazar el arco **por encima y por debajo** de la diagonal." },
      { title: "Clava la punta en C", text: "Toca el otro extremo, $C$, sin cambiar la abertura." },
      { title: "Arco desde C", text: "Traza el arco que corta al anterior en **dos puntos**." },
      { title: "Marca B", text: "Toca el corte que queda **por encima** de la diagonal: es el vértice $B$." },
      { title: "Marca D", text: "Toca el corte de **abajo**: es el vértice $D$." },
      { title: "Une los puntos", text: "La regla une sola $A$, $B$, $C$ y $D$ y el rombo queda construido.", fact: "Cuatro lados iguales" },
    ], {
      question: "Construye el rombo ABCD conociendo la diagonal AC = 24 cm y el lado l = 15 cm.",
      hint: "B y D están a 15 cm de A y de C: traza arcos de radio l desde los dos extremos de la diagonal.",
      explanation: "Los puntos que distan l de A y de C son los dos cortes de los arcos. Con esos cuatro vértices todos los lados valen l, y como los cortes están en la mediatriz de AC, las diagonales son perpendiculares y se bisecan.",
    }),
  ],
};
