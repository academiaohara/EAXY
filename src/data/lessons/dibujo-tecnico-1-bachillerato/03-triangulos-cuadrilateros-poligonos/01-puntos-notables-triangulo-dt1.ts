import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const puntosNotablesTrianguloDt1Lesson: InteractiveLesson = {
  slug: "puntos-notables-triangulo-dt1",
  title: "1. Rectas y puntos notables del triángulo",
  subtitle: DT1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cuatro puntos, cuatro rectas", [
      { kind: "steps", items: [
        "**Medianas**: unen cada vértice con el punto medio del lado opuesto. Se cortan en el **baricentro G**, el centro de gravedad. Lo dividen en razón **2 : 1** desde el vértice.",
        "**Bisectrices**: dividen cada ángulo en dos iguales. Se cortan en el **incentro I**, centro de la circunferencia **inscrita**.",
        "**Mediatrices**: perpendiculares por el punto medio de cada lado. Se cortan en el **circuncentro O**, centro de la circunferencia **circunscrita**.",
        "**Alturas**: perpendiculares desde cada vértice al lado opuesto. Se cortan en el **ortocentro H**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Muévelos", [
      { kind: "text", text: "Cambia la posición de C. Mira dónde caen los puntos en triángulos acutángulos, rectángulos y obtusángulos." },
    ], tool("dt1-puntos-notables-explorador"), "visual-top"),
    slide("euler", "Posiciones y la recta de Euler", [
      { kind: "steps", items: [
        "**G** e **I** están siempre **dentro** del triángulo.",
        "En un triángulo **rectángulo**: el circuncentro es el **punto medio de la hipotenusa** y el ortocentro es el **vértice del ángulo recto**.",
        "En un triángulo **obtusángulo**, el circuncentro y el ortocentro quedan **fuera**.",
        "**G, O y H están alineados**: es la **recta de Euler**, y se cumple $H = 3G - 2O$.",
        "En un triángulo **equilátero** los cuatro puntos coinciden.",
      ] },
    ]),
    calc("calc-bari", "Baricentro", "Un triángulo tiene vértices (0, 0), (6, 0) y (0, 9). ¿Cuál es la coordenada y del baricentro?", nums(3), "(0 + 0 + 9)/3 = 3; el baricentro es (2, 3).", "Promedia las coordenadas."),
    calc("calc-circ", "Circuncentro de un rectángulo", "En ese mismo triángulo (rectángulo en el origen), el circuncentro es el punto medio de la hipotenusa que une (6, 0) y (0, 9). ¿Cuál es su coordenada y?", nums(4.5), "(0 + 9)/2 = 4,5; O = (3; 4,5).", "Punto medio de la hipotenusa."),
    calc("calc-medi", "Razón 2:1", "Una mediana mide 9 cm. ¿A qué distancia del vértice está el baricentro, en cm?", nums(6), "2/3 de 9 = 6 cm; del lado, 3 cm.", "El baricentro divide la mediana en 2 : 1."),
    sort("clasifica-puntos", "¿Qué punto es?", "Asocia cada propiedad con el punto notable.",
      [["bar", "Baricentro", "cobalt"], ["inc", "Incentro", "amber"], ["cir", "Circuncentro", "emerald"], ["ort", "Ortocentro", "rose"]],
      [["Punto de corte de las medianas", "bar"], ["Centro de gravedad de una placa triangular", "bar"], ["Equidista de los tres lados", "inc"], ["Centro de la circunferencia inscrita", "inc"], ["Equidista de los tres vértices", "cir"], ["Punto de corte de las mediatrices", "cir"], ["Punto de corte de las alturas", "ort"], ["Vértice del ángulo recto en un triángulo rectángulo", "ort"]],
      "Cada punto sale de un tipo distinto de recta.",
    ),
    pick("check-obtuso", "Fuera del triángulo", "En un triángulo obtusángulo, ¿qué puntos notables quedan fuera?",
      "El circuncentro y el ortocentro",
      [["El baricentro y el incentro", "Esos siempre están dentro."], ["Solo el baricentro", "El baricentro siempre está dentro."], ["Ninguno", "Dos de ellos salen."]],
      "G e I son siempre interiores; O y H salen del triángulo obtusángulo.",
    ),
  ],
};
