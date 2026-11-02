import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchParte, slide } from "@/data/lessons/tec1-helpers";

export const triangulosClasesLineasDt1Lesson: InteractiveLesson = {
  slug: "triangulos-clases-lineas-dt1",
  title: "1. Triángulos: definiciones, clases y líneas notables",
  subtitle: DT1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "El triángulo y sus clases", [], benchParte("triangulos-clasificacion", 0, [
      { title: "Según sus lados", text: "El **triángulo** es la figura plana limitada por **tres rectas** que se cortan de dos en dos: tiene tres lados y tres ángulos. Por sus lados es **equilátero** (3 iguales), **isósceles** (2 iguales) o **escaleno** (ninguno igual).", fact: "Equilátero, isósceles, escaleno" },
      { title: "Según sus ángulos", text: "Por sus ángulos es **acutángulo** (los tres menores de $90^\\circ$), **rectángulo** (uno de $90^\\circ$) u **obtusángulo** (uno mayor de $90^\\circ$).", fact: "Acutángulo, rectángulo, obtusángulo" },
      { title: "Suma de ángulos y desigualdad", text: "Los ángulos se nombran con letras mayúsculas y los lados opuestos, con las mismas letras en minúscula. Siempre se cumple $\\hat A + \\hat B + \\hat C = 180^\\circ$. Para que exista el triángulo, **cada lado** debe ser **menor** que la suma de los otros dos y **mayor** que su diferencia.", fact: "A + B + C = 180°" },
    ]), "stack"),

    slide("lineas", "Líneas notables de un triángulo", [], bench("triangulo-lineas-notables", [
      { title: "Mediatriz de un lado", text: "La **mediatriz** de un lado es la recta **perpendicular** a él en su **punto medio**. Todos sus puntos están a la misma distancia de los extremos del lado.", fact: "Perpendicular por el punto medio" },
      { title: "Mediana de un lado", text: "La **mediana** es el segmento que une un **vértice** con el **punto medio** del lado opuesto.", fact: "Vértice → punto medio" },
      { title: "Bisectriz de un ángulo", text: "La **bisectriz** de un ángulo es la recta que lo **divide en dos partes iguales**.", fact: "Divide el ángulo en dos iguales" },
      { title: "Altura de un triángulo", text: "La **altura** es el segmento **perpendicular** trazado desde un vértice al lado opuesto (o a su prolongación).", fact: "Perpendicular desde el vértice" },
    ]), "stack"),
  ],
};
