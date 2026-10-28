import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const trenesEngranajesCajaCambios3esoLesson: InteractiveLesson = {
  slug: "trenes-engranajes-caja-cambios-3eso",
  title: "4. Trenes de engranajes y caja de cambios",
  subtitle: TECESO3_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("tren", "Varias etapas", [
      { kind: "text", text: "Combinar engranajes en etapas multiplica las relaciones. Cambia los dientes de cada etapa." },
    ], tool("eso2-tren-transmision-explorador"), "visual-top"),
    slide("def", "Velocidad y par", [
      { kind: "rule", title: "Relación total", text: "En un tren de engranajes, la relación total es el producto de las relaciones de cada etapa. Un reductor baja la velocidad y sube el par en la misma proporción (sin pérdidas).", formula: "i_total = i₁ · i₂ · …" },
    ]),
    slide("caja", "La caja de cambios de un coche", [
      { kind: "text", text: "Elige una marcha y las revoluciones del motor y mira la velocidad del coche y el par en las ruedas." },
    ], tool("eso3-caja-cambios-explorador"), "visual-top"),
    slide("porque", "Por qué hacen falta marchas", [
      { kind: "steps", items: [
        "El motor solo rinde bien en un **rango de revoluciones**.",
        "Las **marchas cortas** (1.ª, 2.ª) dan mucho par para arrancar y subir cuestas.",
        "Las **marchas largas** (5.ª, 6.ª) permiten ir deprisa con el motor a pocas revoluciones, ahorrando combustible.",
        "El **diferencial** reparte el giro entre las dos ruedas y aplica una reducción final.",
      ] },
    ]),
    calc("calc-it", "Relación total", "La 1.ª marcha tiene una relación de 3,6 y el diferencial, de 4. ¿Cuál es la relación total?", nums(14.4), "3,6 · 4 = 14,4 : 1.", "Multiplica las dos relaciones."),
    calc("calc-rueda", "Revoluciones de la rueda", "Con esa relación de 14,4 y el motor a 3 000 rpm, ¿cuántas rpm gira la rueda? (redondea a un entero)", nums(208), "3 000 / 14,4 ≈ 208 rpm.", "rpm del motor entre la relación."),
    sort("clasifica-marcha", "Marcha corta o larga", "Clasifica cada situación o característica.",
      [["cor", "Marcha corta (1.ª, 2.ª)", "amber"], ["lar", "Marcha larga (5.ª, 6.ª)", "cobalt"]],
      [["Arrancar con el coche cargado", "cor"], ["Subir una cuesta pronunciada", "cor"], ["Mucho par y poca velocidad", "cor"], ["Ir por autopista a velocidad constante", "lar"], ["Motor a pocas revoluciones", "lar"], ["Poco par y mucha velocidad", "lar"]],
      "Una marcha corta es un reductor grande; una larga, uno pequeño.",
    ),
    pick("check-par", "Más reducción", "Al reducir la velocidad con engranajes, ¿qué ocurre con el par?",
      "Aumenta en la misma proporción (menos las pérdidas)",
      [["Disminuye", "Al revés."], ["No cambia", "Cambia."], ["Se hace cero", "Aumenta."]],
      "La potencia se conserva: si la velocidad baja, el par sube.",
    ),
  ],
};
