import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const tablasGraficasProporcionalidadFq2Lesson: InteractiveLesson = {
  slug: "tablas-graficas-proporcionalidad-fq2",
  title: "4. Tablas, gráficas y proporcionalidad",
  subtitle: FQ2_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Ordenar los datos", [
      { kind: "steps", items: [
        "Los datos de un experimento se ordenan en una **tabla**: una columna por magnitud, con su **unidad**.",
        "La **gráfica** muestra cómo se relacionan: la **variable independiente** va en el **eje horizontal** y la **dependiente** en el **vertical**.",
        "Cada eje lleva su **magnitud y unidad** y una **escala** uniforme.",
        "Se marcan los puntos y se traza la **línea que mejor los representa**, sin unirlos uno a uno.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Un muelle que se estira", [
      { kind: "text", text: "Se cuelgan masas de un muelle y se mide cuánto se alarga. Ajusta la pendiente de la recta hasta que pase cerca de los puntos." },
    ], tool("fq2-grafica-proporcional-explorador"), "visual-top"),
    slide("prop", "Proporcionalidad directa", [
      { kind: "steps", items: [
        "Dos magnitudes son **directamente proporcionales** si, al **multiplicar** una por un número, la otra queda multiplicada por **el mismo número**.",
        "Su cociente **y / x** es **constante**: es la **constante de proporcionalidad** o **pendiente**.",
        "La gráfica es una **recta que pasa por el origen**.",
        "Si el cociente **no** es constante o la recta no pasa por el origen, la relación **no** es de proporcionalidad directa.",
      ] },
    ]),
    calc("calc-k", "Constante", "Un muelle se alarga 2 cm con 100 g y 4 cm con 200 g. ¿Cuánto vale la constante y / x, en cm por cada 100 g?", nums(2), "2 / 1 = 4 / 2 = 2 cm por cada 100 g.", "Divide el alargamiento entre las centenas de gramos."),
    calc("calc-pred", "Predicción", "Con esa constante (2 cm por cada 100 g), ¿cuánto se alargará con 350 g, en cm?", nums(7), "3,5 · 2 = 7 cm.", "350 g son 3,5 veces 100 g."),
    sort("clasifica", "¿Proporcionalidad directa?", "Clasifica cada situación.",
      [["si", "Directamente proporcional", "cobalt"], ["no", "No lo es", "amber"]],
      [["Precio de las naranjas según el peso", "si"], ["Alargamiento de un muelle según la masa", "si"], ["Distancia recorrida a velocidad constante según el tiempo", "si"], ["Altura de una persona según su edad", "no"], ["Temperatura de una habitación a lo largo del día", "no"], ["Cantidad de agua en un depósito que se llena y se vacía", "no"]],
      "Si al doblar una se dobla la otra y la recta pasa por el origen, es proporcionalidad directa.",
    ),
    pick("check", "Los ejes", "¿Qué se representa en el eje horizontal de una gráfica?",
      "La variable independiente",
      [["La variable dependiente", "Esa va en el eje vertical."], ["Las variables controladas", "No se representan."], ["El error", "No es una variable de la gráfica."]],
      "Por convención, lo que se cambia va en el eje horizontal y lo que se mide, en el vertical.",
    ),
  ],
};
