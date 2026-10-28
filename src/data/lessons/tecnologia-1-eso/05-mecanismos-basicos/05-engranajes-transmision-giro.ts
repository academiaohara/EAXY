import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const engranajesTransmisionGiroLesson: InteractiveLesson = {
  slug: "engranajes-transmision-giro",
  title: "5. Engranajes",
  subtitle: TECESO1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Ruedas dentadas que se empujan", [
      { kind: "definition", text: "Un **engranaje** es un par de ruedas dentadas que encajan: al girar una (**conductora**), mueve la otra (**conducida**). Los dientes evitan que patinen." },
      { kind: "steps", items: [
        "Las dos ruedas giran en **sentidos contrarios**.",
        "Para engranar, los dientes deben tener el **mismo tamaño** (mismo módulo).",
        "La rueda con **menos dientes** gira **más rápido**; la de **más dientes**, más despacio y con más fuerza.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Dientes y vueltas", [
      { kind: "text", text: "Mira cuántas vueltas da cada rueda si una tiene el doble de dientes que la otra." },
    ], anim("engranajes-giro"), "split"),
    slide("explora", "Cambia los dientes", [
      { kind: "text", text: "Modifica el número de dientes de cada rueda y la velocidad de entrada. Fíjate en la velocidad de salida y en el sentido de giro." },
    ], tool("engranajes-eso-explorador", { n: 0, a: 10, b: 20 }), "visual-top"),
    slide("regla", "Velocidades y dientes", [
      { kind: "rule", title: "Relación entre velocidades", formula: "n_1 \\cdot z_1 = n_2 \\cdot z_2 \;\\Rightarrow\; n_2 = n_1 \\cdot \\dfrac{z_1}{z_2}" },
      { kind: "text", text: "Donde $n$ son las revoluciones por minuto (rpm) y $z$ el número de dientes. **A más dientes, menos velocidad**: la velocidad es inversamente proporcional al número de dientes." },
    ]),
    calc("calc-rpm", "Velocidad de salida", "Una rueda de 12 dientes gira a 120 rpm y mueve otra de 36 dientes. ¿A cuántas rpm gira la segunda?",
      nums(40), "n₂ = n₁ · z₁ ÷ z₂ = 120 · 12 ÷ 36 = 40 rpm.", "Usa n₂ = n₁ · z₁ ÷ z₂."),
    calc("calc-dientes", "Cuántos dientes", "Una rueda de 40 dientes gira a 30 rpm. Quieres que la que engrana con ella gire a 120 rpm. ¿Cuántos dientes debe tener?",
      nums(10), "n₁·z₁ = n₂·z₂ → 30·40 = 120·z₂ → z₂ = 1200 ÷ 120 = 10 dientes.", "Despeja z₂ = n₁·z₁ ÷ n₂."),
    sort("clasifica-engr", "Más rápido o más lento", "Decide cómo gira la rueda conducida respecto a la conductora.",
      [["rap", "Gira más rápido", "amber"], ["len", "Gira más despacio", "cobalt"], ["ig", "Igual velocidad", "emerald"]],
      [["Conductora de 40 dientes, conducida de 10", "rap"], ["Conductora de 30, conducida de 15", "rap"], ["Conductora de 10, conducida de 30", "len"], ["Conductora de 12, conducida de 24", "len"], ["Conductora de 20, conducida de 20", "ig"]],
      "La rueda con menos dientes es la que más rápido gira; con igual número, ambas giran igual.",
    ),
    pick("check-sentido", "Sentido de giro", "Dos engranajes iguales están engranados. Si el primero gira en el sentido de las agujas del reloj, ¿cómo gira el segundo?",
      "En sentido contrario",
      [["En el mismo sentido", "Eso ocurre con una correa abierta, no con engranajes directos."], ["Se queda parado", "Los dientes obligan a girar a la otra rueda."], ["Gira en un sentido u otro según el día", "Siempre es el contrario."]],
      "Los dientes de una rueda empujan los de la otra: se invierte el sentido de giro.",
    ),
  ],
};
