import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const reaccionesQuimicasFq2Lesson: InteractiveLesson = {
  slug: "reacciones-quimicas-fq2",
  title: "2. Las reacciones químicas: reactivos y productos",
  subtitle: FQ2_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Qué ocurre en una reacción", [
      { kind: "steps", items: [
        "En una **reacción química** unas sustancias, los **reactivos**, se transforman en otras, los **productos**.",
        "Se representa con una **ecuación química**: reactivos → productos. Por ejemplo, 2 H₂ + O₂ → 2 H₂O.",
        "Según el **modelo de partículas**, los **enlaces** de los reactivos se **rompen** y los **átomos** se **reordenan** formando moléculas nuevas.",
        "Los átomos **no cambian**: son los mismos antes y después; cambia cómo están unidos.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Avance de la reacción", [
      { kind: "text", text: "Elige una reacción y avanza. Mira cómo se gastan los reactivos y aparecen los productos." },
    ], tool("fq2-avance-reaccion-explorador"), "visual-top"),
    slide("ecua", "Leer una ecuación", [
      { kind: "steps", items: [
        "A la **izquierda** de la flecha, los **reactivos**; a la **derecha**, los **productos**; la flecha significa «se transforman en».",
        "Los **coeficientes** (números delante) indican la **proporción** en que reaccionan y se forman.",
        "Ejemplo: en CH₄ + 2 O₂ → CO₂ + 2 H₂O, **1** metano reacciona con **2** oxígenos y forma **1** CO₂ y **2** aguas.",
        "A veces se indica el **estado**: (s) sólido, (l) líquido, (g) gas.",
      ] },
    ]),
    calc("calc-h2", "Hidrógeno gastado", "En 2 H₂ + O₂ → 2 H₂O, ¿cuántas moléculas de agua se forman a partir de 4 moléculas de hidrógeno?", nums(4), "2 H₂ dan 2 H₂O: 4 H₂ dan 4 H₂O.", "Hay la misma proporción 1:1 entre H₂ y H₂O."),
    calc("calc-o2", "Oxígeno necesario", "Siguiendo esa ecuación, ¿cuántas moléculas de O₂ hacen falta para 4 moléculas de H₂?", nums(2), "Por cada 2 H₂ hace falta 1 O₂: para 4 H₂, 2 O₂.", "Mitad de moléculas de oxígeno que de hidrógeno."),
    calc("calc-co2", "Metano", "En CH₄ + 2 O₂ → CO₂ + 2 H₂O, ¿cuántas moléculas de agua salen al quemarse 3 moléculas de metano?", nums(6), "Cada CH₄ da 2 H₂O: 3 · 2 = 6.", "Multiplica por el coeficiente del agua."),
    sort("clasifica", "Reactivo o producto", "En la combustión del metano, CH₄ + 2 O₂ → CO₂ + 2 H₂O, clasifica cada sustancia.",
      [["rea", "Reactivo", "cobalt"], ["pro", "Producto", "amber"]],
      [["CH₄", "rea"], ["O₂", "rea"], ["Lo que se gasta", "rea"], ["CO₂", "pro"], ["H₂O", "pro"], ["Lo que se forma", "pro"]],
      "Los reactivos están a la izquierda; los productos, a la derecha.",
    ),
    pick("check", "Átomos", "Durante una reacción química, ¿qué ocurre con los átomos?",
      "Se reordenan: no se crean ni se destruyen",
      [["Se destruyen y se crean otros", "Los átomos se conservan."], ["Se convierten en otros elementos", "Eso sería una reacción nuclear."], ["Desaparecen los electrones", "Siguen todos los átomos."]],
      "Los enlaces se rompen y se forman otros: los átomos son los mismos.",
    ),
  ],
};
