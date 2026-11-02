import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const trianguloRectanguloDt1Lesson: InteractiveLesson = {
  slug: "triangulo-rectangulo-dt1",
  title: "4. Construcción del triángulo rectángulo",
  subtitle: DT1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("catetos", "Dados los dos catetos", [], bench("rectangulo-catetos", [
      { title: "Los datos", text: "Se conocen los **catetos** $b$ y $c$. Como el ángulo recto ya es un dato, con estos dos tenemos los tres que hacen falta.", fact: "Catetos b y c" },
      { title: "Se toma la medida c", text: "Se **abre el compás** hasta que la punta seca esté en un extremo del segmento $c$ y la mina en el otro: la abertura del compás es ahora $c$.", fact: "Abertura = c" },
      { title: "Se lleva a la recta: AB = c", text: "Se marca el punto $A$ en la recta, se **clava la punta seca en $A$** sin cambiar la abertura y se traza un pequeño arco que corta a la recta: ese corte es $B$. Así queda el cateto $AB = c$.", fact: "AB = c" },
      { title: "La perpendicular por A", text: "Con la escuadra se traza por $A$ la **perpendicular** a $AB$: los dos catetos forman $90^\\circ$.", fact: "90° en A" },
      { title: "Se toma la medida b", text: "Se **abre el compás** hasta que la punta seca esté en un extremo del segmento $b$ y la mina en el otro: la abertura del compás es ahora $b$.", fact: "Abertura = b" },
      { title: "Se lleva b sobre la perpendicular: C", text: "Se clava la punta seca en $A$ y, con la abertura $b$, se traza un arco que corta a la perpendicular: ese corte es $C$.", fact: "AC = b" },
      { title: "Se une C con B", text: "Se une $C$ con $B$ con la regla: es la hipotenusa y el triángulo queda completo.", fact: "Hipotenusa BC" },
    ]), "stack"),

    benchTask("catetos-practica", "Construye el rectángulo con los dos catetos", "rectangulo-catetos-practica", [
      { title: "Perpendicular", text: "Marca con el transportador el ángulo recto en $A$: el segundo lado a $90^\\circ$ de $AB$.", fact: "90° en A" },
      { title: "Toma b", text: "Toca los dos extremos del segmento $b$ para tomar su medida con el compás.", fact: "Abertura = b" },
      { title: "Clava en A", text: "Toca $A$ para clavar la punta seca." },
      { title: "Arco", text: "Traza el arco que corta a la perpendicular: ahí está $C$." },
      { title: "Cierra el triángulo", text: "La regla traza sola los lados $AC$ y $CB$." },
    ], {
      question: "Construye el triángulo rectángulo de catetos b y c.",
      hint: "Perpendicular por A y arco de radio b desde A sobre ella.",
      explanation: "Los catetos AB y AC forman 90° y miden c y b; la hipotenusa BC es el tercer lado.",
    }),

    slide("cateto-angulo", "Dados un cateto y un ángulo agudo", [], bench("rectangulo-cateto-angulo", [
      { title: "Los datos", text: "Se conocen un **cateto** $b$ y un **ángulo agudo** $\\hat C = 35^\\circ$. El ángulo recto completa los tres datos.", fact: "Cateto b y ángulo C" },
      { title: "Se toma la medida b", text: "Se **abre el compás** hasta que la punta seca esté en un extremo del segmento $b$ y la mina en el otro: la abertura del compás es ahora $b$.", fact: "Abertura = b" },
      { title: "Se lleva a la recta: AC = b", text: "Se marca el punto $A$ en la recta, se **clava la punta seca en $A$** sin cambiar la abertura y se traza un pequeño arco que corta a la recta: ese corte es $C$. Así queda el cateto $AC = b$.", fact: "AC = b" },
      { title: "El ángulo C con el transportador", text: "Con el transportador centrado en $C$ y su base sobre $CA$ se marca el ángulo de $35^\\circ$, leyendo la escala roja.", fact: "C = 35°" },
      { title: "Se traza el lado desde C", text: "Se apoya la regla en $C$ y en la marca y se traza el lado que sale de $C$.", fact: "Lado del ángulo C" },
      { title: "La perpendicular por A", text: "Con la escuadra se traza por $A$ la **perpendicular** al cateto $AC$ hasta que corte al lado del ángulo.", fact: "90° en A" },
      { title: "Se cortan en B", text: "El corte de la perpendicular con el lado del ángulo es el vértice $B$: el triángulo está construido.", fact: "Vértice B" },
    ]), "stack"),

    benchTask("cateto-angulo-practica", "Construye el rectángulo con un cateto y un ángulo", "rectangulo-cateto-angulo-practica", [
      { title: "Ángulo C", text: "Marca con el transportador el ángulo $\\hat C = 35^\\circ$ en $C$, midiéndolo desde $CA$.", fact: "35° en C" },
      { title: "Ángulo recto", text: "Marca el ángulo recto en $A$.", fact: "90° en A" },
      { title: "Marca B", text: "Toca el punto $B$ donde se cortan los dos lados.", fact: "B = corte" },
      { title: "Cierra el triángulo", text: "La regla traza sola los lados $CB$ y $AB$." },
    ], {
      question: "Construye el triángulo rectángulo de cateto b = AC y ángulo C = 35°.",
      hint: "Un lado a 35° de CA desde C y otro a 90° de AC desde A.",
      explanation: "B está en el lado del ángulo C y en la perpendicular a AC por A.",
    }),

    slide("hipotenusa", "Dados un cateto y la hipotenusa", [], bench("rectangulo-hipotenusa", [
      { title: "Los datos", text: "Se conocen la **hipotenusa** $a$ y un **cateto** $b$.", fact: "Hipotenusa a y cateto b" },
      { title: "Se toma la medida a", text: "Se **abre el compás** hasta que la punta seca esté en un extremo del segmento $a$ y la mina en el otro: la abertura del compás es ahora $a$.", fact: "Abertura = a" },
      { title: "Se lleva a la recta: BC = a", text: "Se marca el punto $B$ en la recta, se **clava la punta seca en $B$** sin cambiar la abertura y se traza un pequeño arco que corta a la recta: ese corte es $C$. Así queda la hipotenusa $BC = a$.", fact: "BC = a" },
      { title: "El punto medio O de BC", text: "Se halla el punto medio $O$ de $BC$ con la mediatriz: dos arcos de la misma abertura desde $B$ y desde $C$ y la recta por sus cortes.", fact: "O: punto medio" },
      { title: "La semicircunferencia de diámetro BC", text: "Con la punta seca en $O$ y la mina en $B$ se traza la **semicircunferencia** de diámetro $BC$. Por el arco capaz, desde cualquiera de sus puntos se ve $BC$ bajo $90^\\circ$.", fact: "Ángulo en la semicircunferencia = 90°" },
      { title: "Se toma la medida b", text: "Se **abre el compás** hasta que la punta seca esté en un extremo del segmento $b$ y la mina en el otro: la abertura del compás es ahora $b$.", fact: "Abertura = b" },
      { title: "Arco de radio b desde C: A", text: "Con la punta seca en $C$ y la abertura $b$ se corta la semicircunferencia: el corte es el vértice $A$.", fact: "CA = b" },
      { title: "Se une A con B y con C", text: "Se unen $A$ con $B$ y con $C$: el ángulo $\\hat A$ es recto.", fact: "A = 90°" },
    ]), "stack"),

    benchTask("hipotenusa-practica", "Construye el rectángulo con cateto e hipotenusa", "rectangulo-hipotenusa-practica", [
      { title: "Toma el radio", text: "Toca $O$ y $B$ para tomar con el compás la medida $OB$, el radio de la semicircunferencia.", fact: "Abertura = OB" },
      { title: "Clava en O", text: "Toca $O$ para clavar la punta seca." },
      { title: "Semicircunferencia", text: "Traza la semicircunferencia por encima de $BC$, de un extremo al otro." },
      { title: "Toma b", text: "Toca los dos extremos del segmento $b$ para tomar su medida.", fact: "Abertura = b" },
      { title: "Clava en C", text: "Toca $C$ para clavar la punta seca." },
      { title: "Arco", text: "Traza el arco que corta a la semicircunferencia: ahí está $A$." },
      { title: "Cierra el triángulo", text: "La regla traza sola los lados $AB$ y $AC$." },
    ], {
      question: "Construye el triángulo rectángulo de hipotenusa a y cateto b.",
      hint: "Semicircunferencia de diámetro BC (centro O) y arco de radio b desde C.",
      explanation: "A está en la semicircunferencia de diámetro BC, así que el ángulo A es recto, y a la distancia b de C.",
    }),
  ],
};
