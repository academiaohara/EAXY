import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const parabolaFocoDirectrizDt2Lesson: InteractiveLesson = {
  slug: "parabola-foco-directriz-dt2",
  title: "4. La parábola: foco y directriz",
  subtitle: DT2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Definición", [
      { kind: "steps", items: [
        "La **parábola** es el lugar geométrico de los puntos que **equidistan de un punto fijo F** (el **foco**) **y de una recta fija d** (la **directriz**).",
        "El **eje** es la perpendicular a la directriz que pasa por el foco; la parábola es simétrica respecto de él.",
        "El **vértice** es el punto de la curva en el eje: está a mitad de camino entre el foco y la directriz.",
        "El **parámetro** p es la distancia del foco a la directriz. Con el vértice en el origen, su ecuación es **y² = 2px**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Equidistancia", [
      { kind: "text", text: "Mueve P a lo largo de la curva y cambia f. La distancia al foco y a la directriz siempre coinciden." },
    ], tool("dt2-parabola-explorador"), "visual-top"),
    slide("trazado", "Cómo se traza", [
      { kind: "steps", items: [
        "Se dibujan el eje, la directriz y el foco F.",
        "Se traza una **paralela a la directriz** a una distancia cualquiera d₁ (hacia el lado del foco).",
        "Con un **compás** centrado en F y de radio d₁ se cortan las paralelas en dos puntos, simétricos respecto del eje.",
        "Repitiendo con distintas d₁ se obtienen puntos suficientes para unirlos a mano alzada o con plantilla.",
      ] },
    ]),
    slide("aplicaciones", "Parábolas en la técnica", [
      { kind: "steps", items: [
        "Las **antenas parabólicas** y los **espejos de los telescopios** concentran en el foco los rayos que llegan paralelos al eje.",
        "Los **faros** de un coche hacen lo contrario: una fuente en el foco sale como un haz paralelo.",
        "Un proyectil sin rozamiento describe una parábola; también la forma ideal de los **cables de un puente colgante** con carga uniforme.",
      ] },
    ]),
    calc("calc-p", "Parámetro", "El foco de una parábola está a 3 cm del vértice. ¿Cuánto vale su parámetro p, la distancia foco–directriz, en cm?", nums(6), "p = 2f = 6 cm.", "La directriz está a la misma distancia al otro lado del vértice."),
    calc("calc-pt", "Punto de la parábola", "Con f = 3 cm (y² = 4fx), ¿cuál es la ordenada y positiva del punto de abscisa x = 3 cm? (en cm)", nums(6), "y² = 4·3·3 = 36, y = 6 cm.", "Calcula y² y extrae la raíz."),
    calc("calc-dist", "Distancia a la directriz", "Un punto de esa parábola está a 8 cm del foco. ¿A qué distancia está de la directriz, en cm?", nums(8), "Equidista del foco y de la directriz: 8 cm.", "Es la propia definición."),
    sort("clasifica", "Elementos", "Asocia cada elemento con su descripción.",
      [["foco", "Foco", "cobalt"], ["dir", "Directriz", "amber"], ["vert", "Vértice", "emerald"]],
      [["Punto fijo del que se mide la distancia", "foco"], ["Aquí se concentran los rayos paralelos al eje", "foco"], ["Recta fija perpendicular al eje", "dir"], ["Sus puntos están a la misma distancia que el foco", "dir"], ["Punto de la curva sobre el eje", "vert"], ["A mitad de camino entre foco y directriz", "vert"]],
      "El foco es el punto, la directriz la recta y el vértice el punto medio.",
    ),
    pick("check", "Excentricidad", "¿Qué excentricidad tiene toda parábola?",
      "e = 1",
      [["e = 0", "Esa es la circunferencia."], ["e menor que 1", "Esa es la elipse."], ["e mayor que 1", "Esa es la hipérbola."]],
      "Al ser la distancia al foco igual a la distancia a la directriz, el cociente vale 1.",
    ),
  ],
};
