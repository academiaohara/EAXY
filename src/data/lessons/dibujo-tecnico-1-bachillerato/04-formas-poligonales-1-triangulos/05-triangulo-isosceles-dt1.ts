import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const trianguloIsoscelesDt1Lesson: InteractiveLesson = {
  slug: "triangulo-isosceles-dt1",
  title: "5. Construcción del triángulo isósceles",
  subtitle: DT1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("lado-angulo", "Dados el lado igual y el ángulo desigual", [], bench("isosceles-lado-angulo", [
      { title: "Los datos", text: "Se conocen el lado igual $a$ y el ángulo desigual $\\hat B = 40^\\circ$, el que forman los dos lados iguales. El isósceles tiene dos lados iguales, así que dos datos bastan.", fact: "Lado a y ángulo B" },
      { title: "Se toma la medida a", text: "Se **abre el compás** hasta que la punta seca esté en un extremo del segmento $a$ y la mina en el otro: la abertura del compás es ahora $a$.", fact: "Abertura = a" },
      { title: "Se lleva a la recta: BC = a", text: "Se marca el punto $B$ en la recta, se **clava la punta seca en $B$** sin cambiar la abertura y se traza un pequeño arco que corta a la recta: ese corte es $C$. Así queda el lado $BC = a$.", fact: "BC = a" },
      { title: "El ángulo B con el transportador", text: "Con el transportador centrado en $B$ y su base sobre $BC$ se marca el ángulo de $40^\\circ$.", fact: "B = 40°" },
      { title: "Se traza el lado desde B", text: "Se apoya la regla en $B$ y en la marca y se traza el lado, **más largo que $a$**.", fact: "Lado del ángulo B" },
      { title: "Con la misma abertura, arco desde B", text: "Sin cambiar la abertura $a$, se clava la punta en $B$ y se traza un arco que corta al lado: ese corte es $A$. Así $BA = BC$.", fact: "BA = BC = a" },
      { title: "Se une A con C", text: "Con la regla se une $A$ con $C$ y el triángulo isósceles queda completo.", fact: "Isósceles ABC" },
    ]), "stack"),

    benchTask("lado-angulo-practica", "Construye el isósceles con el lado igual y el ángulo", "isosceles-lado-angulo-practica", [
      { title: "Ángulo B", text: "Marca con el transportador el ángulo $\\hat B = 40^\\circ$ en el vértice $B$.", fact: "40° en B" },
      { title: "Toma a", text: "Toca los dos extremos del segmento $a$ para tomar su medida con el compás.", fact: "Abertura = a" },
      { title: "Clava en B", text: "Toca $B$ para clavar la punta seca." },
      { title: "Arco", text: "Traza el arco que corta al lado del ángulo: ahí está $A$." },
      { title: "Cierra el triángulo", text: "La regla traza sola los lados $BA$ y $AC$." },
    ], {
      question: "Construye el triángulo isósceles de lado igual a y ángulo desigual B = 40°.",
      hint: "Marca el ángulo en B y corta su lado con un arco de radio a desde B.",
      explanation: "BA y BC miden lo mismo (a) y forman el ángulo B.",
    }),

    slide("desigual", "Dados el lado desigual y un ángulo igual", [], bench("isosceles-desigual", [
      { title: "Los datos", text: "Se conocen el **lado desigual** $b$ y un **ángulo igual** $\\hat A = 55^\\circ$: los dos ángulos de la base son iguales.", fact: "Lado b y ángulo A" },
      { title: "Se toma la medida b", text: "Se **abre el compás** hasta que la punta seca esté en un extremo del segmento $b$ y la mina en el otro: la abertura del compás es ahora $b$.", fact: "Abertura = b" },
      { title: "Se lleva a la recta: AC = b", text: "Se marca el punto $A$ en la recta, se **clava la punta seca en $A$** sin cambiar la abertura y se traza un pequeño arco que corta a la recta: ese corte es $C$. Así queda la base $AC = b$.", fact: "AC = b" },
      { title: "El ángulo A con el transportador", text: "Con el transportador centrado en $A$ y su base sobre $AC$ se marca el ángulo de $55^\\circ$.", fact: "A = 55°" },
      { title: "Se traza el lado desde A", text: "Se apoya la regla en $A$ y en la marca y se traza el lado.", fact: "Lado desde A" },
      { title: "El mismo ángulo en C", text: "Como los ángulos de la base son iguales, en $C$ se marca **otros $55^\\circ$**, midiéndolos desde $CA$.", fact: "C = A = 55°" },
      { title: "Se traza el lado desde C", text: "Se traza el lado desde $C$.", fact: "Lado desde C" },
      { title: "El vértice B", text: "Los dos lados se cortan en el vértice $B$: el triángulo queda con $BA = BC$.", fact: "BA = BC" },
    ]), "stack"),

    benchTask("desigual-practica", "Construye el isósceles con el lado desigual y el ángulo", "isosceles-desigual-practica", [
      { title: "Ángulo A", text: "Marca con el transportador el ángulo $\\hat A = 55^\\circ$ en $A$.", fact: "55° en A" },
      { title: "Ángulo C", text: "Marca el mismo ángulo en $C$, midiéndolo desde $CA$.", fact: "55° en C" },
      { title: "Marca B", text: "Toca el punto $B$ donde se cortan los dos lados.", fact: "B = corte" },
      { title: "Cierra el triángulo", text: "La regla traza sola los lados $AB$ y $CB$." },
    ], {
      question: "Construye el triángulo isósceles de lado desigual b = AC y ángulos iguales de 55°.",
      hint: "Los dos ángulos de la base valen lo mismo: 55° en A y 55° en C.",
      explanation: "Con los ángulos de la base iguales, BA = BC.",
    }),

    slide("igual-angulo", "Dados el lado igual y un ángulo igual", [], bench("isosceles-igual-angulo", [
      { title: "Los datos", text: "Se conocen el lado igual $a$ y un ángulo igual $\\hat C = 62^\\circ$ (uno de los de la base).", fact: "Lado a y ángulo C" },
      { title: "El ángulo C con el transportador", text: "Sobre la recta de la base se marca el vértice $C$ y, con el transportador, el ángulo de $62^\\circ$ hacia el interior.", fact: "C = 62°" },
      { title: "Se traza el lado desde C", text: "Se apoya la regla en $C$ y en la marca y se traza el lado.", fact: "Lado desde C" },
      { title: "Se toma la medida a", text: "Se **abre el compás** hasta que la punta seca esté en un extremo del segmento $a$ y la mina en el otro: la abertura del compás es ahora $a$.", fact: "Abertura = a" },
      { title: "Se lleva a sobre el lado: B", text: "Con la punta seca en $C$ se traza un arco de radio $a$ que corta al lado: ese corte es $B$, con $CB = a$.", fact: "CB = a" },
      { title: "Con la misma abertura, arco desde B: A", text: "Sin cambiar la abertura, se clava la punta en $B$ y se corta la base: el corte es $A$ y se cumple $BA = BC$.", fact: "BA = a" },
      { title: "Se une B con A", text: "Se une $B$ con $A$ con la regla: el triángulo isósceles queda completo.", fact: "Isósceles ABC" },
    ]), "stack"),

    benchTask("igual-angulo-practica", "Construye el isósceles con el lado igual y un ángulo igual", "isosceles-igual-angulo-practica", [
      { title: "Ángulo C", text: "Marca con el transportador el ángulo $\\hat C = 62^\\circ$ en $C$, midiéndolo desde la base.", fact: "62° en C" },
      { title: "Toma a", text: "Toca los dos extremos del segmento $a$ para tomar su medida.", fact: "Abertura = a" },
      { title: "Clava en C", text: "Toca $C$ para clavar la punta seca." },
      { title: "Arco desde C", text: "Traza el arco que corta al lado del ángulo: ahí está $B$." },
      { title: "Clava en B", text: "Toca $B$ sin cambiar la abertura." },
      { title: "Arco desde B", text: "Traza el arco que corta a la base: ahí está $A$." },
      { title: "Cierra el triángulo", text: "La regla traza sola los lados $CB$, $BA$ y $AC$." },
    ], {
      question: "Construye el triángulo isósceles de lado igual a y ángulo C = 62°.",
      hint: "B a distancia a de C sobre el lado del ángulo y A a distancia a de B sobre la base.",
      explanation: "B está a la distancia a de C y A a la misma distancia de B: BC = BA.",
    }),
  ],
};
