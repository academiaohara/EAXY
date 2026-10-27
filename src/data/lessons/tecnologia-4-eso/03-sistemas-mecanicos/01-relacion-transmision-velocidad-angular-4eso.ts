import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const relacionTransmisionVelocidadAngular4esoLesson: InteractiveLesson = {
  slug: "relacion-transmision-velocidad-angular-4eso",
  title: "1. Relación de transmisión y velocidad angular",
  subtitle: TECESO4_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Medir el giro con rigor", [
      { kind: "steps", items: [
        "La **velocidad angular** ω mide cuánto gira un eje por segundo: **ω = 2π·n / 60** (rad/s si n está en rpm).",
        "En un par de engranajes: **n₁ · z₁ = n₂ · z₂**, y la **relación de transmisión** es **i = n₁/n₂ = z₂/z₁**.",
        "**i > 1**: reductor (sale más despacio y con más par). **i < 1**: multiplicador (sale más deprisa y con menos par).",
        "Dos ruedas que engranan giran en **sentidos contrarios**; con una rueda intermedia («loca») se invierte el sentido sin cambiar i.",
      ] },
    ], undefined, "stack"),
    slide("tool", "Calcula una etapa", [
      { kind: "text", text: "Elige los dientes de cada rueda, la velocidad de entrada y el par: calcula la velocidad, ω, el par y la potencia de salida." },
    ], tool("eso4-transmision-explorador"), "visual-top"),
    slide("tren", "Varias etapas", [
      { kind: "text", text: "En un tren de varias ruedas las relaciones de cada etapa se multiplican. Compruébalo." },
    ], tool("eso2-tren-transmision-explorador"), "visual-top"),
    slide("poleas", "Poleas y cadenas", [
      { kind: "steps", items: [
        "Con **poleas y correas** o **piñones y cadena** la relación se calcula con los **diámetros** o los **dientes**: i = D₂/D₁ = z₂/z₁.",
        "La correa **desliza** un poco; la cadena y la correa dentada **no**.",
        "Los dos ejes giran en el **mismo sentido** (salvo correa cruzada).",
      ] },
    ]),
    calc("calc-i", "Relación", "Una rueda motriz de 20 dientes mueve una conducida de 60. ¿Cuánto vale la relación i = z₂/z₁?", nums(3), "60 / 20 = 3.", "Dientes de la conducida entre los de la motriz."),
    calc("calc-n2", "Velocidad de salida", "Con n₁ = 1 500 rpm e i = 3, ¿a cuántas rpm gira la rueda conducida?", nums(500), "1 500 / 3 = 500 rpm.", "n₂ = n₁ / i."),
    calc("calc-w", "Velocidad angular", "Un eje gira a 500 rpm. ¿Cuántos rad/s son? (2π·500/60, redondea a un decimal)", nums(52.4, 52.36), "2π · 500 / 60 ≈ 52,36 rad/s.", "ω = 2π·n/60."),
    sort("clasifica-red", "Reductor o multiplicador", "Clasifica cada transmisión según su efecto.",
      [["red", "Reductor (i > 1)", "cobalt"], ["mul", "Multiplicador (i < 1)", "amber"]],
      [["Motriz de 10 dientes, conducida de 40", "red"], ["Motor a ruedas de un coche en 1.ª marcha", "red"], ["Polea pequeña mueve una grande", "red"], ["Motriz de 40 dientes, conducida de 10", "mul"], ["Pedales a rueda trasera con plato grande y piñón pequeño", "mul"], ["Batidora: motor lento a cuchillas rápidas", "mul"]],
      "Reducir velocidad es ganar par; multiplicarla es perderlo.",
    ),
    pick("check-sent", "Sentido de giro", "Dos engranajes exteriores engranan entre sí. ¿Cómo giran?",
      "En sentidos contrarios",
      [["En el mismo sentido", "Eso ocurre con una cadena."], ["No giran", "Se transmiten movimiento."], ["Uno gira y el otro queda parado", "Engranan, así que ambos giran."]],
      "Una rueda intermedia permite invertir el sentido.",
    ),
  ],
};
