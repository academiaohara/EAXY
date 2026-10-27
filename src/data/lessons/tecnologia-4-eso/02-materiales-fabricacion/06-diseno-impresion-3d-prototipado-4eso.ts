import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const disenoImpresion3dPrototipado4esoLesson: InteractiveLesson = {
  slug: "diseno-impresion-3d-prototipado-4eso",
  title: "6. Diseño para fabricación digital e impresión 3D",
  subtitle: TECESO4_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Diseñar pensando en cómo se fabrica", [
      { kind: "steps", items: [
        "**DFM** (diseño para la fabricación): el diseño debe **poder fabricarse** con la máquina elegida y con poco coste.",
        "En **impresión 3D**: evitar **voladizos** de más de ~45° sin soportes, orientar la pieza para que las capas aguanten el esfuerzo y fijar un **espesor mínimo** de pared.",
        "En **corte láser**: piezas planas, **radios** en las esquinas internas y una **holgura** (kerf) en los encajes.",
        "En **fresado CNC**: evitar esquinas internas vivas y rebajes profundos.",
        "**Tolerancias**: las piezas impresas necesitan holguras de 0,2–0,4 mm para que encajen.",
      ] },
    ], undefined, "stack"),
    slide("impr", "Calcula una impresión", [
      { kind: "text", text: "Cambia la altura de capa, el relleno y el tamaño. Mira el tiempo, el material y el coste." },
    ], tool("eso2-impresion3d-explorador"), "visual-top"),
    slide("laser", "Corte láser", [
      { kind: "text", text: "Para piezas planas el corte láser es más rápido. Calcula el tiempo según el contorno." },
    ], tool("eso3-laser-explorador"), "visual-top"),
    slide("iter", "Prototipar rápido", [
      { kind: "steps", items: [
        "**Prototipo rápido**: se imprime, se prueba, se mejora y se vuelve a imprimir en horas.",
        "Cada iteración **detecta un fallo** pronto, cuando corregirlo es barato.",
        "Se **documenta** cada versión: cambios, motivos y resultados.",
        "El prototipo **no tiene que ser perfecto**: tiene que **responder una pregunta** (¿encaja?, ¿aguanta?, ¿se agarra bien?).",
      ] },
    ]),
    calc("calc-capas", "Número de capas", "Una pieza de 30 mm de alto se imprime con capas de 0,2 mm. ¿Cuántas capas son?", nums(150), "30 / 0,2 = 150 capas.", "Altura entre altura de capa."),
    calc("calc-masa", "Masa", "Una pieza imprimida en PLA (1,25 g/cm³) ocupa 40 cm³ de material. ¿Cuántos g pesa?", nums(50), "40 · 1,25 = 50 g.", "Volumen por densidad."),
    sort("clasifica-dfm", "¿Qué técnica conviene?", "Elige la fabricación más adecuada.",
      [["imp", "Impresión 3D", "emerald"], ["las", "Corte láser", "amber"], ["cnc", "Fresado CNC", "cobalt"]],
      [["Pieza con huecos internos y forma orgánica", "imp"], ["Prototipo único en una tarde", "imp"], ["Caja hecha de paneles planos de madera", "las"], ["Cientos de piezas planas de metacrilato", "las"], ["Pieza de aluminio de alta precisión", "cnc"], ["Molde de metal", "cnc"]],
      "Cada técnica tiene su ámbito ideal.",
    ),
    pick("check-voladizo", "Voladizo", "Una pieza tiene un saliente casi horizontal. ¿Qué es mejor en impresión 3D?",
      "Reorientar la pieza o añadir soportes, o rediseñar el saliente a menos de 45°",
      [["Imprimirlo sin hacer nada", "Se caerán las capas."], ["Aumentar la velocidad", "Empeoraría."], ["Reducir la temperatura a cero", "No funciona."]],
      "Una capa necesita apoyarse en la anterior.",
    ),
  ],
};
