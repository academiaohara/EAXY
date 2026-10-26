import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const leyOhm2esoLesson: InteractiveLesson = {
  slug: "ley-ohm-2eso",
  title: "2. La ley de Ohm",
  subtitle: TECESO2_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("anim", "Tensión, resistencia e intensidad", [
      { kind: "text", text: "Mira cómo se relacionan las tres magnitudes con la analogía del depósito de agua." },
    ], anim("eso2-ohm-agua"), "text-top"),
    slide("ley", "Enunciado de la ley", [
      { kind: "rule", title: "Ley de Ohm", text: "La intensidad que circula por un conductor es **directamente proporcional** a la tensión e **inversamente proporcional** a la resistencia.", formula: "I = V / R" },
      { kind: "steps", items: [
        "Despejando: **V = I · R** y **R = V / I**.",
        "Con la misma resistencia, **doblar la tensión dobla la intensidad**.",
        "Con la misma tensión, **doblar la resistencia reduce la intensidad a la mitad**.",
        "Usa siempre **V, A y Ω**; convierte antes mA a A y kΩ a Ω.",
      ] },
    ], undefined, "stack"),
    slide("triangulo", "El triángulo de Ohm", [
      { kind: "text", text: "Elige la incógnita y mueve los otros dos datos: el triángulo te muestra la fórmula y la operación." },
    ], tool("eso2-ohm-incognita-explorador"), "visual-top"),
    calc("calc-i", "Calcula la intensidad", "Una lámpara de 12 Ω se conecta a una pila de 24 V. ¿Qué intensidad circula, en A?", nums(2), "I = V / R = 24 / 12 = 2 A.", "I = V / R."),
    calc("calc-v", "Calcula la tensión", "Por una resistencia de 50 Ω circulan 0,2 A. ¿Qué tensión hay entre sus extremos, en V?", nums(10), "V = I · R = 0,2 · 50 = 10 V.", "V = I · R."),
    calc("calc-r", "Calcula la resistencia", "Un aparato conectado a 230 V consume 0,5 A. ¿Cuál es su resistencia, en Ω?", nums(460), "R = V / I = 230 / 0,5 = 460 Ω.", "R = V / I."),
    sort("clasifica-ohm", "¿Qué le pasa a la intensidad?", "Si no cambia nada más, ¿cómo cambia la intensidad?",
      [["sub", "Aumenta", "emerald"], ["baj", "Disminuye", "rose"], ["ig", "No cambia", "cobalt"]],
      [["Se duplica la tensión", "sub"], ["Se reduce la resistencia a la mitad", "sub"], ["Se duplica la resistencia", "baj"], ["Se reduce la tensión a la mitad", "baj"], ["Se cambia la longitud del cable por otro igual", "ig"], ["Se duplican a la vez la tensión y la resistencia", "ig"]],
      "I = V / R: sube con V, baja con R; si V y R se duplican, el cociente no cambia.",
    ),
    pick("check-ohm", "Despejar R", "¿Qué expresión permite calcular la resistencia a partir de V e I?",
      "R = V / I",
      [["R = V · I", "Eso daría la potencia, no la resistencia."], ["R = I / V", "Está invertida: sería la inversa de la resistencia."], ["R = V + I", "Las magnitudes no se suman."]],
      "De I = V / R se despeja R = V / I.",
    ),
  ],
};
