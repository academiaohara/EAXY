import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, slide } from "@/data/lessons/tec1-helpers";

export const cuadrilaterosDt1Lesson: InteractiveLesson = {
  slug: "cuadrilateros-dt1",
  title: "1. Cuadriláteros: definiciones, clases y propiedades",
  subtitle: DT1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Familias de cuadriláteros", [], bench("cuadrilateros-familias", [
      { title: "Paralelogramos", text: "**Paralelogramos** (dos pares de lados paralelos): **cuadrado**, **rectángulo**, **rombo** y **romboide**.", fact: "Dos pares paralelos" },
      { title: "Trapecios", text: "**Trapecios** (un solo par de lados paralelos): **rectángulo**, **isósceles** y **escaleno**.", fact: "Un par paralelo" },
      { title: "Trapezoides", text: "**Trapezoides** (ningún par paralelo): como el **deltoide**, con dos pares de lados consecutivos iguales.", fact: "Ningún par paralelo" },
      { title: "Suma de ángulos", text: "Los ángulos interiores de cualquier cuadrilátero suman **360°**.", fact: "360°" },
    ]), "stack"),

    slide("prop", "Propiedades útiles para construir", [], bench("cuadrilateros-propiedades", [
      { title: "Paralelogramo", text: "**Paralelogramo**: lados y ángulos opuestos iguales; las diagonales **se cortan en su punto medio**.", fact: "Diagonales: punto medio" },
      { title: "Rectángulo y rombo", text: "**Rectángulo**: diagonales **iguales**. **Rombo**: diagonales **perpendiculares** y bisectrices de los ángulos.", fact: "Iguales / perpendiculares" },
      { title: "Cuadrado", text: "**Cuadrado**: reúne ambas; el lado es $d/\\sqrt{2}$, con $d$ la diagonal.", fact: "l = d / √2" },
      { title: "Trapecio isósceles", text: "**Trapecio isósceles**: lados no paralelos iguales, diagonales iguales y es **inscriptible** en una circunferencia.", fact: "Inscriptible" },
      { title: "Para construir", text: "Para **construir** un paralelogramo bastan dos lados y el ángulo que forman, o un lado y las dos diagonales.", fact: "Dos lados y el ángulo" },
    ]), "stack"),
  ],
};
