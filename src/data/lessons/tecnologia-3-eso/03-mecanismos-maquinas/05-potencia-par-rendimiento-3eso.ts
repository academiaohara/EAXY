import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const potenciaParRendimiento3esoLesson: InteractiveLesson = {
  slug: "potencia-par-rendimiento-3eso",
  title: "5. Potencia, par y rendimiento mecánico",
  subtitle: TECESO3_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Potencia mecánica", [
      { kind: "rule", title: "Potencia de un eje", text: "Es el producto del par por la velocidad angular. Con el par en N·m y la velocidad en rpm:", formula: "P = M · ω = M · 2π · n / 60" },
      { kind: "steps", items: [
        "Se mide en **vatios (W)**.",
        "**Rendimiento** η = potencia útil / potencia suministrada (entre 0 y 1, o en %).",
        "En una **cadena de transmisión**, los rendimientos de cada etapa **se multiplican**.",
        "La energía que no se aprovecha se pierde como **calor** por rozamiento.",
      ] },
    ], undefined, "stack"),
    slide("cadena", "Pérdidas en cada etapa", [
      { kind: "text", text: "Cambia el rendimiento de cada etapa y observa la potencia que llega a la salida." },
    ], tool("eso3-rendimiento-explorador"), "visual-top"),
    slide("mejora", "Cómo mejorar el rendimiento", [
      { kind: "steps", items: [
        "Menos etapas: **cada una pierde** un poco.",
        "**Lubricar** y alinear correctamente los ejes.",
        "Usar **rodamientos** en lugar de contacto directo.",
        "Elegir transmisiones eficientes (engranajes rectos ≈ 95–98 %; sinfín, mucho menos).",
      ] },
    ]),
    calc("calc-p", "Potencia de un motor", "Un motor da 2 N·m a 3 000 rpm. ¿Qué potencia entrega, en W? (P = M · 2π · n / 60, redondea a un entero)", nums(628), "2 · 2π · 3 000 / 60 ≈ 628 W.", "Calcula la velocidad angular en rad/s y multiplica por el par."),
    calc("calc-rend", "Rendimiento total", "Tres etapas con rendimientos del 90 %, 80 % y 95 %. ¿Cuál es el rendimiento total, en %?", nums(68.4), "0,90 · 0,80 · 0,95 = 0,684 = 68,4 %.", "Multiplica los tres rendimientos."),
    calc("calc-perd", "Potencia perdida", "De una entrada de 1 000 W, el sistema entrega 684 W útiles. ¿Cuántos W se pierden?", nums(316), "1 000 − 684 = 316 W.", "Resta la potencia útil."),
    sort("clasifica-rend", "¿Mejora o empeora?", "¿Qué ocurre con el rendimiento total?",
      [["mej", "Mejora", "emerald"], ["emp", "Empeora", "rose"]],
      [["Quitar una etapa innecesaria", "mej"], ["Lubricar los engranajes", "mej"], ["Usar rodamientos", "mej"], ["Añadir más etapas de transmisión", "emp"], ["Dejar que se acumule suciedad en la cadena", "emp"], ["Usar un tornillo sin fin en vez de engranajes", "emp"]],
      "Menos rozamiento y menos etapas dan mayor rendimiento.",
    ),
    pick("check-conserva", "¿Se puede pasar de 100 %?", "¿Puede una máquina real tener un rendimiento superior al 100 %?",
      "No: siempre se pierde parte de la energía como calor",
      [["Sí, si es muy buena", "Violaría la conservación de la energía."], ["Sí, con engranajes", "Ningún mecanismo lo logra."], ["Depende del color", "No tiene relación."]],
      "El rendimiento es siempre menor que 1: la energía no se crea.",
    ),
  ],
};
