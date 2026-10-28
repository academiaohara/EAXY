import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const maquinasRealesLavadoraBicicleta3esoLesson: InteractiveLesson = {
  slug: "maquinas-reales-lavadora-bicicleta-3eso",
  title: "7. Analizar máquinas reales: lavadora y bicicleta",
  subtitle: TECESO3_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("metodo", "Cómo analizar una máquina", [
      { kind: "steps", items: [
        "**1.** Identifica la **fuente de energía** y el **motor**.",
        "**2.** Localiza los **mecanismos de transmisión** y calcula las **relaciones**.",
        "**3.** Describe la **entrada** (qué mueve) y la **salida** (qué se consigue).",
        "**4.** Estima **velocidades, par y potencias**.",
        "**5.** Evalúa **pérdidas**, **seguridad** y **mantenimiento**.",
      ] },
    ], undefined, "stack"),
    slide("lavadora", "La lavadora", [
      { kind: "text", text: "Un motor eléctrico mueve el tambor mediante una correa entre dos poleas. Calcula las revoluciones del tambor y la fuerza del centrifugado." },
    ], tool("eso3-lavadora-explorador"), "visual-top"),
    slide("bici", "La bicicleta", [
      { kind: "text", text: "La bicicleta combina pedales (palancas), una transmisión por cadena y ruedas. Cambia el plato y el piñón." },
    ], tool("bici-marchas-explorador", { n: 1, a: 4 }), "visual-top"),
    slide("analisis", "Ejemplo de análisis", [
      { kind: "example", title: "Lavadora: poleas del motor y del tambor", lines: [
        { math: "i = d_2 / d_1 = 140 / 30 \\approx 4{,}7" },
        { math: "n_{tambor} = n_{motor} / i = 7\\,000 / 4{,}7 \\approx 1\\,500\\ rpm" },
        { math: "a = \\omega^2 \\cdot r \\approx 629\\,g", note: "Con un tambor de 25 cm de radio, la ropa soporta unos 600 g." },
      ] },
    ]),
    calc("calc-rpm", "Velocidad del tambor", "El motor gira a 7 000 rpm con una polea de 30 mm que mueve otra de 140 mm en el tambor. ¿A cuántas rpm gira el tambor? (redondea a un entero)", nums(1500), "7 000 · 30 / 140 = 1 500 rpm.", "n₂ = n₁ · d₁ / d₂."),
    calc("calc-g", "El centrifugado", "A 1 500 rpm con un tambor de 25 cm de radio, la aceleración en el borde es a = ω² · r. ¿Cuántas veces la gravedad (g) es, aproximadamente?", nums(629), "ω = 2π · 1 500 / 60 ≈ 157,1 rad/s; a = 157,1² · 0,25 ≈ 6 168 m/s² ≈ 629 g.", "Calcula ω y aplica a = ω² · r; divide entre 9,8."),
    sort("clasifica-maq", "Mecanismo de cada máquina", "Relaciona cada máquina con un mecanismo que usa.",
      [["lav", "Lavadora", "cobalt"], ["bic", "Bicicleta", "emerald"], ["coc", "Coche", "amber"]],
      [["Correa entre motor y tambor", "lav"], ["Reducción por poleas", "lav"], ["Plato, cadena y piñón", "bic"], ["Pedales como palancas", "bic"], ["Caja de cambios y diferencial", "coc"], ["Biela-manivela en el motor", "coc"]],
      "Cada máquina combina mecanismos de transmisión y transformación.",
    ),
    pick("check-polea", "Un motor rápido", "¿Por qué la lavadora usa una polea pequeña en el motor y una grande en el tambor?",
      "Para reducir la velocidad y aumentar el par en el tambor",
      [["Para aumentar la velocidad", "Es al revés."], ["Para ahorrar cable", "No es la razón."], ["Por estética", "Hay una razón física."]],
      "El motor eficiente gira rápido; el tambor necesita girar más despacio.",
    ),
  ],
};
