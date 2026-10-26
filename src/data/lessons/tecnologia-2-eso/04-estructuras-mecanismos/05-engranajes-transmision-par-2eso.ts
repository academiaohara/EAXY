import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const engranajesTransmisionPar2esoLesson: InteractiveLesson = {
  slug: "engranajes-transmision-par-2eso",
  title: "5. Engranajes: relación de transmisión, par y potencia",
  subtitle: TECESO2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("giro", "Cómo giran los engranajes", [
      { kind: "text", text: "Dos engranajes engranados giran en sentidos contrarios. La rueda con más dientes gira más despacio." },
    ], anim("engranajes-giro"), "text-top"),
    slide("relacion", "Relación de transmisión", [
      { kind: "rule", title: "Relación de transmisión", text: "Cociente entre la velocidad de entrada y la de salida. Coincide con el de los dientes de la conducida entre los de la motriz.", formula: "i = n₁ / n₂ = z₂ / z₁" },
      { kind: "steps", items: [
        "Si **i > 1**, es un **reductor**: sale más despacio y con **más par**.",
        "Si **i < 1**, es un **multiplicador**: sale más rápido y con menos par.",
        "En un tren de varias etapas, las relaciones **se multiplican**: i = i₁ · i₂.",
        "La **potencia** (par × velocidad angular) no aumenta: con rozamiento, la de salida es algo menor.",
      ] },
    ], undefined, "stack"),
    slide("tren", "Un reductor de dos etapas", [
      { kind: "text", text: "Cambia los dientes de cada etapa y observa la velocidad, el par y las potencias." },
    ], tool("eso2-tren-transmision-explorador"), "visual-top"),
    calc("calc-i", "Relación de una etapa", "Un piñón de 10 dientes mueve una rueda de 40 dientes. ¿Cuál es la relación de transmisión i?", nums(4), "i = z₂ / z₁ = 40 / 10 = 4.", "i = dientes de la conducida entre dientes de la motriz."),
    calc("calc-rpm", "Velocidad de salida", "El motor gira a 1 200 rpm y el reductor tiene i = 4. ¿A cuántas rpm gira la salida?", nums(300), "n₂ = n₁ / i = 1 200 / 4 = 300 rpm.", "n₂ = n₁ / i."),
    calc("calc-par", "Par de salida", "El motor da 2 N·m y el reductor tiene i = 4 sin pérdidas. ¿Qué par hay en la salida, en N·m?", nums(8), "M₂ = M₁ · i = 2 · 4 = 8 N·m.", "El par se multiplica por i (sin rozamiento)."),
    sort("clasifica-trans", "Reductor o multiplicador", "Clasifica cada situación.",
      [["red", "Reductor", "cobalt"], ["mul", "Multiplicador", "amber"]],
      [["Un engranaje pequeño mueve uno grande", "red"], ["La salida gira más despacio", "red"], ["Se gana par", "red"], ["Un engranaje grande mueve uno pequeño", "mul"], ["La salida gira más deprisa", "mul"], ["Se pierde par", "mul"]],
      "Un reductor baja la velocidad y sube el par; un multiplicador hace lo contrario.",
    ),
    pick("check-potencia", "¿Gana potencia?", "Un reductor multiplica el par por 4. ¿Qué ocurre con la potencia?",
      "No aumenta: la velocidad baja a la cuarta parte y se pierde algo por rozamiento",
      [["Se multiplica por 4", "Entonces se crearía energía de la nada."], ["Se hace cero", "Sigue habiendo potencia de salida."], ["Se multiplica por 16", "Las relaciones no se combinan así."]],
      "Potencia = par × velocidad angular: si el par sube, la velocidad baja en la misma proporción.",
    ),
  ],
};
