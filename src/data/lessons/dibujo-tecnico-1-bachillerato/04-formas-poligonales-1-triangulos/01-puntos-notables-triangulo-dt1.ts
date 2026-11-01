import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const puntosNotablesTrianguloDt1Lesson: InteractiveLesson = {
  slug: "puntos-notables-triangulo-dt1",
  title: "1. Rectas y puntos notables del triángulo",
  subtitle: DT1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cuatro puntos, cuatro rectas", [], bench("puntos-notables", [
      { title: "Medianas y baricentro", text: "Las **medianas** unen cada vértice con el punto medio del lado opuesto. Se cortan en el **baricentro G**, el centro de gravedad, que las divide en razón **2 : 1** desde el vértice.", fact: "G: centro de gravedad" },
      { title: "Bisectrices e incentro", text: "Las **bisectrices** dividen cada ángulo en dos iguales. Se cortan en el **incentro I**, el centro de la circunferencia **inscrita**, que toca a los tres lados.", fact: "I: equidista de los lados" },
      { title: "Mediatrices y circuncentro", text: "Las **mediatrices** son las perpendiculares por el punto medio de cada lado. Se cortan en el **circuncentro O**, el centro de la circunferencia **circunscrita**, que pasa por los tres vértices.", fact: "O: equidista de los vértices" },
      { title: "Alturas y ortocentro", text: "Las **alturas** son las perpendiculares desde cada vértice al lado opuesto. Se cortan en el **ortocentro H**.", fact: "H: corte de las alturas" },
      { title: "La recta de Euler", text: "**G, O y H están alineados**: es la **recta de Euler**, con $H = 3G - 2O$. En un triángulo **rectángulo**, O es el punto medio de la hipotenusa y H el vértice del ángulo recto; en un **obtusángulo**, O y H quedan fuera. En el **equilátero** los cuatro coinciden.", fact: "G, O, H alineados" },
    ]), "stack"),

    benchTask("circuncentro-construye", "Halla el circuncentro", "circuncentro-practica", [
      { title: "Clava la punta en A", text: "Para la mediatriz de $AB$, toca el vértice $A$ y clava la punta seca del compás." },
      { title: "Abre más de la mitad de AB", text: "Arrastra la mina hasta una abertura **mayor que la mitad** de $AB$ y pulsa «Fijar abertura».", fact: "Radio > AB / 2" },
      { title: "Arco desde A", text: "Arrastra la mina para trazar un arco **por encima y por debajo** de $AB$." },
      { title: "Clava la punta en B", text: "Toca $B$ sin cambiar la abertura." },
      { title: "Arco desde B", text: "Traza el arco que corta al anterior en **dos puntos**." },
      { title: "Clava la punta en A", text: "Ahora la mediatriz de $AC$: toca de nuevo $A$." },
      { title: "Abre más de la mitad de AC", text: "Fija una abertura **mayor que la mitad** de $AC$.", fact: "Radio > AC / 2" },
      { title: "Arco desde A", text: "Traza el arco a ambos lados de $AC$." },
      { title: "Clava la punta en C", text: "Toca $C$ con la misma abertura." },
      { title: "Arco desde C", text: "Traza el arco que corta al anterior en dos puntos." },
      { title: "Dibuja las dos mediatrices", text: "Toca **dos puntos** de una mediatriz y después los dos de la otra. Donde se cortan queda el circuncentro $O$, y con él la circunferencia circunscrita.", fact: "O equidista de A, B y C" },
    ], {
      question: "Halla el circuncentro del triángulo ABC con las mediatrices de dos de sus lados.",
      hint: "Traza la mediatriz de AB y la de AC con el compás: el punto donde se cortan es el circuncentro.",
      explanation: "Los puntos de la mediatriz de AB equidistan de A y B, y los de la de AC, de A y C. Su corte equidista de los tres vértices: es el centro de la circunferencia circunscrita.",
    }),
  ],
};
