import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, tool } from "@/data/lessons/tec1-helpers";

export const circuitosMixtos2esoLesson: InteractiveLesson = {
  slug: "circuitos-mixtos-2eso",
  title: "6. Circuitos mixtos",
  subtitle: TECESO2_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Serie y paralelo a la vez", [
      { kind: "definition", text: "Un circuito **mixto** combina grupos en serie y grupos en paralelo. Se resuelve **reduciéndolo** paso a paso hasta una sola resistencia." },
      { kind: "steps", items: [
        "**1.** Sustituye cada grupo en **paralelo** por su resistencia equivalente.",
        "**2.** Suma las resistencias que queden en **serie**: obtienes R_eq.",
        "**3.** Calcula la intensidad total con **I = V / R_eq**.",
        "**4.** Vuelve atrás: reparte las tensiones y las corrientes en cada grupo.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Reducción paso a paso", [
      { kind: "text", text: "Sigue el método con R1 = 4 Ω en serie con R2 = 6 Ω y R3 = 3 Ω en paralelo." },
    ], anim("eso2-mixto-reduccion"), "text-top"),
    slide("explora", "Prueba con tus valores", [
      { kind: "text", text: "Cambia los valores y avanza por los pasos de la reducción. Comprueba que I₂ + I₃ da siempre la corriente total." },
    ], tool("eso2-mixto-explorador", { a: 12, b: 4 }), "visual-top"),
    calc("calc-rp", "Resistencia del paralelo", "R₂ = 6 Ω y R₃ = 6 Ω están en paralelo. ¿Cuál es su resistencia equivalente, en Ω?", nums(3), "6 · 6 / (6 + 6) = 3 Ω.", "Iguales en paralelo: la mitad."),
    calc("calc-reqm", "Resistencia total", "R₁ = 4 Ω está en serie con ese paralelo de 3 Ω. ¿Cuál es la resistencia total, en Ω?", nums(7), "R_eq = 4 + 3 = 7 Ω.", "Suma la serie."),
    calc("calc-im", "Corriente total", "Si el circuito de 7 Ω se conecta a 14 V, ¿qué intensidad total circula, en A?", nums(2), "I = 14 / 7 = 2 A.", "I = V / R_eq."),
    pick("check-mixto", "Primer paso", "En un circuito mixto, ¿qué se reduce primero?",
      "Los grupos en paralelo, hasta obtener una resistencia equivalente",
      [["La pila", "La pila no se reduce."], ["Todas las resistencias sumadas directamente", "Solo se suman las que están en serie."], ["Nada: hay que probar con un polímetro", "Primero se calcula."]],
      "Se reducen primero los paralelos y después las series, siguiendo el orden de dentro hacia fuera.",
    ),
  ],
};
