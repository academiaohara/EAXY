import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const parPotenciaReductoras4esoLesson: InteractiveLesson = {
  slug: "par-potencia-reductoras-4eso",
  title: "2. Par, potencia y reductoras de varias etapas",
  subtitle: TECESO4_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("anim", "Menos velocidad, más par", [
      { kind: "text", text: "Mira cómo una reductora de dos etapas transforma la velocidad y el par de un motor." },
    ], anim("eso4-reductora-etapas"), "text-top"),
    slide("def", "Par y potencia", [
      { kind: "rule", title: "Potencia mecánica", text: "La potencia de un eje que gira es el par por la velocidad angular.", formula: "P = M · ω" },
      { kind: "text", text: "En una transmisión sin pérdidas la potencia se conserva: si la velocidad baja, el par sube en la misma proporción. Con pérdidas, $P_{\\mathrm{salida}}$ = η · $P_{\\mathrm{entrada}}$." },
    ], undefined, "stack"),
    slide("red", "Diseña una reductora", [
      { kind: "text", text: "Elige el número de etapas y su relación. Observa la velocidad, el par y las pérdidas." },
    ], tool("eso4-reductora-explorador"), "visual-top"),
    slide("rend", "Rendimiento", [
      { kind: "text", text: "Cada etapa pierde energía por rozamiento. Mira cómo cae el rendimiento." },
    ], tool("eso3-rendimiento-explorador"), "visual-top"),
    calc("calc-p", "Potencia del motor", "Un motor da 0,1 N·m a 3 000 rpm. ¿Cuántos W de potencia tiene? (M·2π·n/60, redondea a un decimal)", nums(31.4, 31.42), "0,1 · 314,16 ≈ 31,4 W.", "Par por velocidad angular."),
    calc("calc-itot", "Relación total", "Dos etapas con i = 4 cada una. ¿Cuál es la relación total?", nums(16), "4 · 4 = 16.", "Se multiplican."),
    calc("calc-par", "Par de salida", "Con 0,1 N·m en el motor, i total = 16 y rendimiento total del 92 %, ¿qué par sale? (redondea a un decimal)", nums(1.5, 1.47), "0,1 · 16 · 0,92 = 1,472 N·m.", "Par × relación × rendimiento."),
    sort("clasifica-par", "¿Qué le pasa?", "Una reductora, ¿qué efecto tiene en cada magnitud?",
      [["sub", "Aumenta", "emerald"], ["baj", "Disminuye", "rose"]],
      [["El par de salida", "sub"], ["La relación de transmisión", "sub"], ["Las pérdidas totales", "sub"], ["La velocidad de salida", "baj"], ["El rendimiento total", "baj"], ["La potencia de salida respecto a la de entrada", "baj"]],
      "Reducir velocidad aumenta el par, pero siempre con alguna pérdida.",
    ),
    pick("check-etapas", "Menos etapas", "¿Por qué conviene usar el menor número de etapas posible?",
      "Porque el rendimiento total es el producto de los de cada etapa y cae con cada una",
      [["Porque ocupan más espacio solo", "Hay más razones."], ["Porque aumentan la velocidad", "Pasa lo contrario."], ["No conviene reducir etapas", "Sí, por el rendimiento."]],
      "Tres etapas del 96 % dan un 88,5 %.",
    ),
  ],
};
