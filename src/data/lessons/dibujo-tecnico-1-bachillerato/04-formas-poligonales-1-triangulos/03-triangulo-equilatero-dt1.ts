import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const trianguloEquilateroDt1Lesson: InteractiveLesson = {
  slug: "triangulo-equilatero-dt1",
  title: "3. Construcción del triángulo equilátero",
  subtitle: DT1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("lado", "Equilátero a partir del lado", [], bench("equilatero-lado", [
      { title: "El dato es el lado", text: "Un equilátero tiene **los tres lados iguales**, así que conocer el lado $a$ es conocerlos todos. Se resuelve como el problema de los tres lados.", fact: "a = b = c" },
      { title: "Se toma la medida a", text: "Se **abre el compás** hasta que la punta seca esté en un extremo del segmento $a$ y la mina en el otro: la abertura del compás es ahora $a$.", fact: "Abertura = a" },
      { title: "Se lleva a la recta: BC = a", text: "Se marca el punto $B$ en la recta, se **clava la punta seca en $B$** sin cambiar la abertura y se traza un pequeño arco que corta a la recta: ese corte es $C$. Así queda el lado $BC = a$.", fact: "BC = a" },
      { title: "Arco de radio a desde B", text: "Con la abertura $a$ y la punta seca en $B$ se traza un arco por encima de $BC$.", fact: "AB = a" },
      { title: "Arco de radio a desde C", text: "**Sin cambiar la abertura**, se clava la punta en $C$ y se traza otro arco. Donde se cortan los arcos está el tercer vértice $A$.", fact: "AC = a" },
      { title: "Se une A con B y con C", text: "Con la regla se unen $A$ con $B$ y con $C$: queda el equilátero $ABC$, con los tres lados iguales a $a$.", fact: "Equilátero ABC" },
    ]), "stack"),

    benchTask("lado-practica", "Construye el triángulo equilátero", "equilatero-lado-practica", [
      { title: "Toma a", text: "Toca los dos extremos del segmento $a$ para tomar su medida con el compás.", fact: "Abertura = a" },
      { title: "Clava en B", text: "Toca $B$ para clavar la punta seca." },
      { title: "Arco desde B", text: "Traza un arco por encima de $BC$." },
      { title: "Clava en C", text: "Toca $C$ sin cambiar la abertura." },
      { title: "Arco desde C", text: "Traza el arco que corta al anterior: ahí está $A$." },
      { title: "Cierra el triángulo", text: "La regla traza sola los lados $AB$ y $AC$." },
    ], {
      question: "Construye el triángulo equilátero de lado a.",
      hint: "Dos arcos de radio a, uno desde cada extremo de BC.",
      explanation: "A está a la distancia a de B y de C, así que los tres lados miden a.",
    }),

    slide("altura", "Equilátero a partir de la altura", [], bench("equilatero-altura", [
      { title: "El dato es la altura", text: "Se conoce la altura $h$. **Todos los equiláteros son semejantes**: se construye uno cualquiera y se amplía hasta que su altura valga $h$.", fact: "Todos los equiláteros son semejantes" },
      { title: "Un equilátero cualquiera: arco desde 1", text: "Sobre una recta se marcan dos puntos $1$ y $2$ a una distancia cualquiera y, con esa abertura y la punta en $1$, se traza un arco.", fact: "Lado cualquiera" },
      { title: "Arco desde 2 con la misma abertura", text: "Con la **misma abertura** y la punta en $2$ se traza otro arco. Donde se cortan está el vértice $3$ del equilátero $1\\text{-}2\\text{-}3$.", fact: "Vértice 3" },
      { title: "Su altura 3-N", text: "Se traza la altura desde $3$, perpendicular a la base. Su pie es $N$.", fact: "Altura = 3-N" },
      { title: "Se prolonga la recta 3-N", text: "La recta $3\\text{-}N$ se **prolonga** por encima del vértice $3$.", fact: "Prolongación" },
      { title: "Se toma la medida h", text: "Se **abre el compás** hasta que la punta seca esté en un extremo del segmento $h$ y la mina en el otro: la abertura del compás es ahora $h$.", fact: "Abertura = h" },
      { title: "Se lleva h desde N: vértice A", text: "Se clava la punta seca en $N$ y, con la abertura $h$, se traza un arco que corta a la prolongación: ese corte es el vértice $A$.", fact: "NA = h" },
      { title: "Paralela a 1-3 por A", text: "Con la escuadra y el cartabón se traza por $A$ la **paralela** al lado $1\\text{-}3$ hasta la base: corta en $C$.", fact: "Paralela a 1-3" },
      { title: "Paralela a 2-3 por A", text: "Se traza por $A$ la paralela al lado $2\\text{-}3$: corta a la base en $B$. El triángulo $ABC$ es equilátero y su altura vale $h$.", fact: "ABC: altura h" },
    ]), "stack"),

    benchTask("altura-practica", "Construye el equilátero de altura dada", "equilatero-altura-practica", [
      { title: "Toma h", text: "Toca los dos extremos del segmento $h$ para tomar su medida con el compás.", fact: "Abertura = h" },
      { title: "Clava en N", text: "Toca $N$ para clavar la punta seca." },
      { title: "Arco", text: "Traza el arco que corta a la prolongación de $3\\text{-}N$: ahí está $A$." },
      { title: "Primera paralela", text: "Desliza la escuadra sobre el cartabón hasta que su filo pase por $A$: es la paralela al lado $1\\text{-}3$.", fact: "Paralela a 1-3" },
      { title: "Segunda paralela", text: "Lo mismo con el lado $2\\text{-}3$.", fact: "Paralela a 2-3" },
      { title: "Cierra el triángulo", text: "La regla traza sola los lados $CA$, $AB$ y $CB$." },
    ], {
      question: "Construye un triángulo equilátero cuya altura mida h.",
      hint: "Lleva h desde N sobre la recta 3-N y traza por A las paralelas a los lados del equilátero pequeño.",
      explanation: "A está a la altura h y las paralelas por A a 1-3 y 2-3 cortan a la base en C y B: el triángulo ABC es semejante al 1-2-3, luego es equilátero.",
    }),
  ],
};
