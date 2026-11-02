import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, slide } from "@/data/lessons/tec1-helpers";

export const trianguloIsoscelesDt1Lesson: InteractiveLesson = {
  slug: "triangulo-isosceles-dt1",
  title: "5. Construcción del triángulo isósceles",
  subtitle: DT1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("lado-angulo", "Dados el lado igual y el ángulo desigual", [], bench("isosceles-lado-angulo", [
      { title: "Los datos", text: "Se conocen el lado igual $a$ y el ángulo desigual $\\hat B$, el que forman los dos lados iguales. El isósceles tiene dos lados iguales, así que dos datos bastan.", fact: "Lado a y ángulo B" },
      { title: "El lado a", text: "Se sitúa el lado $a = \\overline{BC}$.", fact: "a = BC" },
      { title: "El ángulo en B", text: "Sobre un extremo, el $B$, se construye el ángulo $\\hat B$ con ayuda de un arco.", fact: "Ángulo B en B" },
      { title: "El segundo lado", text: "Se lleva sobre el lado obtenido el lado $a = c$ y se une $A$ con $C$. Los lados $BC$ y $BA$ son iguales.", fact: "BA = BC = a" },
    ]), "stack"),

    slide("desigual", "Dados el lado desigual y un ángulo igual", [], bench("isosceles-desigual", [
      { title: "Los datos", text: "Se conocen el **lado desigual** $b$ y un **ángulo igual** $\\hat A$: los dos ángulos de la base son iguales. La construcción queda para razonarla tú.", fact: "Lado b y ángulo A" },
      { title: "Un ángulo A en cada extremo", text: "Sobre la base $b = \\overline{AC}$ se construye el ángulo $\\hat A$ en $A$ y **el mismo ángulo** en $C$, porque los ángulos de la base son iguales.", fact: "Mismo ángulo en A y en C" },
      { title: "El vértice B", text: "Los dos lados se cortan en el vértice $B$ y el triángulo queda con $BA = BC$.", fact: "BA = BC" },
    ]), "stack"),

    slide("igual-angulo", "Dados el lado igual y un ángulo igual", [], bench("isosceles-igual-angulo", [
      { title: "Los datos", text: "Se conocen el lado igual $a$ y un ángulo igual $\\hat C$ (uno de los de la base).", fact: "Lado a y ángulo C" },
      { title: "El ángulo C", text: "Se construye el ángulo $\\hat C$ en el vértice $C$ con ayuda de un arco.", fact: "Ángulo C" },
      { title: "El lado a = CB", text: "Se toma el lado $a = \\overline{CB}$ sobre el lado inclinado del ángulo: así queda el vértice $B$.", fact: "CB = a" },
      { title: "El tercer vértice", text: "Desde $B$, con **radio $a$**, se corta el otro lado $b$ (la base): ese corte es el tercer vértice $A$ y se cumple $BA = BC$.", fact: "BA = a" },
    ]), "stack"),
  ],
};
