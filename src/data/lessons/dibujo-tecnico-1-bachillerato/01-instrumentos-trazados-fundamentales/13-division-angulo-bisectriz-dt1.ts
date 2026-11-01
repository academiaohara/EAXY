import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, slide } from "@/data/lessons/tec1-helpers";

export const divisionAnguloBisectrizDt1Lesson: InteractiveLesson = {
  slug: "division-angulo-bisectriz-dt1",
  title: "13. Bisectriz (segundo método) y división de un ángulo",
  subtitle: DT1_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    slide("bisectriz", "Bisectriz de un ángulo: segundo método", [], bench("bisectriz-segundo-metodo", [
      { title: "El ángulo", text: "La **bisectriz** de un ángulo es un **lugar geométrico**: divide al ángulo en dos partes iguales y todos sus puntos equidistan de los lados.", fact: "Equidista de los lados" },
      { title: "Primer arco", text: "Con centro en el vértice $A$ se traza un arco cualquiera $\\overset{\\frown}{1\\text{-}2}$, que corta a los lados en $1$ y en $2$.", fact: "Arco 1-2" },
      { title: "Segundo arco", text: "Con centro en $A$ se traza otro arco $\\overset{\\frown}{3\\text{-}4}$ de **distinto radio**, que corta a los lados en $3$ y $4$.", fact: "Arco 3-4" },
      { title: "Las rectas cruzadas", text: "Se trazan las rectas $2\\text{-}3$ y $1\\text{-}4$: se cortan en $B$.", fact: "2-3 y 1-4" },
      { title: "La bisectriz", text: "La **bisectriz** del ángulo es la recta $A$-$B$.", fact: "Bisectriz = recta AB" },
    ]), "stack"),

    slide("division", "División de un ángulo en 2, 4, 8… partes iguales", [], bench("division-angulo-2n", [
      { title: "Dos partes", text: "Sea el ángulo de vértice $V$ y lados $a$ y $b$. La **bisectriz $c$** lo divide en dos partes iguales.", fact: "Bisectriz c" },
      { title: "Cuatro partes", text: "Las bisectrices $d$ y $e$ de cada una de esas partes dividen el ángulo en **cuatro partes iguales**.", fact: "Bisectrices d y e" },
      { title: "Ocho o más", text: "Para un mayor número de divisiones se sigue operando de la misma forma: cada bisectriz **duplica** el número de partes ($2, 4, 8, 16, \\dots$).", fact: "2ⁿ partes" },
    ]), "stack"),
  ],
};
