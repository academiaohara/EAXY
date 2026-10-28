import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const planosMontajeDespieceDt2Lesson: InteractiveLesson = {
  slug: "planos-montaje-despiece-dt2",
  title: "5. Planos de montaje y listas de piezas",
  subtitle: DT2_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "El conjunto", [
      { kind: "steps", items: [
        "Un **plano de conjunto** o de **montaje** muestra cómo se **ensamblan** las piezas de un mecanismo o una estructura.",
        "Cada pieza lleva un **globo numerado** que se une a ella con una línea fina y remite a la **lista de piezas**.",
        "Se acotan solo las medidas de **conjunto**: dimensiones totales, distancias entre ejes, cotas de montaje.",
        "El **despiece** es el conjunto de planos de taller de cada pieza especial.",
      ] },
    ], undefined, "stack"),
    slide("explora", "La lista de piezas", [
      { kind: "text", text: "Cambia el número de tornillos y mira cómo se recalcula la lista de piezas y la masa del conjunto." },
    ], tool("dt2-lista-piezas-explorador"), "visual-top"),
    slide("lista", "Qué lleva la lista", [
      { kind: "steps", items: [
        "**Posición** (el número del globo), **cantidad**, **denominación**, **material** y **observaciones** (norma, dimensiones).",
        "Las piezas **normalizadas** se designan por su **norma** y se compran hechas: tornillos, tuercas, arandelas, rodamientos.",
        "Las piezas **especiales** remiten a su **plano de taller** por su referencia.",
        "Se numera siguiendo el sentido de las agujas del reloj o en columna, y los globos no se cruzan.",
      ] },
    ]),
    calc("calc-cant", "Cantidades", "Una brida se une con 6 tornillos. Cada tornillo lleva 1 tuerca y 2 arandelas. ¿Cuántas arandelas se necesitan en total?", nums(12), "6 · 2 = 12 arandelas.", "Multiplica tornillos por arandelas por tornillo."),
    calc("calc-masa", "Masa de tornillería", "Cada tornillo pesa 0,05 kg y cada tuerca 0,02 kg. Con 6 tornillos y 6 tuercas, ¿cuántos kg pesan juntos?", nums(0.42), "6 · 0,05 + 6 · 0,02 = 0,42 kg.", "Suma las dos masas."),
    sort("clasifica", "Plano de taller o de conjunto", "Clasifica cada característica.",
      [["tal", "Plano de taller", "cobalt"], ["con", "Plano de conjunto", "amber"]],
      [["Define una sola pieza", "tal"], ["Lleva tolerancias y acabado superficial", "tal"], ["Se usa para fabricar", "tal"], ["Muestra el ensamblaje de varias piezas", "con"], ["Lleva globos numerados y lista de piezas", "con"], ["Se usa para montar", "con"]],
      "El de taller fabrica una pieza; el de conjunto las ensambla.",
    ),
    pick("check", "Globos", "¿Para qué sirven los globos numerados en un plano de conjunto?",
      "Para identificar cada pieza con su fila de la lista",
      [["Para indicar la cota", "No."], ["Para señalar la escala", "No."], ["Para marcar los cortes", "No."]],
      "El número del globo coincide con la posición de la lista de piezas.",
    ),
  ],
};
