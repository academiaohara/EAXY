import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const circuitosSerieParaleloFq3Lesson: InteractiveLesson = {
  slug: "circuitos-serie-paralelo-fq3",
  title: "4. Circuitos en serie y en paralelo",
  subtitle: FQ3_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("def", "Dos formas de conectar", [
      { kind: "steps", items: [
        "**En serie**: los receptores se conectan **uno a continuación de otro**, formando un único camino.",
        "**En paralelo**: los receptores se conectan **entre los mismos dos puntos**, formando varios caminos.",
        "Los **símbolos** de los circuitos: pila, interruptor, bombilla, resistencia, amperímetro (A), voltímetro (V).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Serie y paralelo", [
      { kind: "text", text: "Cambia el tipo de asociación y los valores de R. Mira la intensidad y la tensión en cada resistencia." },
    ], tool("fq3-circuito-explorador"), "visual-top"),
    slide("serie", "En serie", [
      { kind: "steps", items: [
        "La **intensidad** es la **misma** en todos los receptores: I = I₁ = I₂.",
        "La **tensión** se **reparte**: V = V₁ + V₂.",
        "La **resistencia equivalente** es la **suma**: R = R₁ + R₂.",
        "Si un receptor se funde, **se corta todo el circuito** (como las antiguas luces de Navidad).",
      ] },
    ]),
    slide("paralelo", "En paralelo", [
      { kind: "steps", items: [
        "La **tensión** es la **misma** en todos los receptores: V = V₁ = V₂.",
        "La **intensidad total** se **reparte**: I = I₁ + I₂.",
        "**1/R = 1/R₁ + 1/R₂**: la resistencia equivalente es **menor** que la menor de las resistencias.",
        "Si un receptor se funde, **los demás siguen funcionando**. Así se conectan los **enchufes** de una casa.",
      ] },
    ]),
    calc("calc-serie", "Resistencia en serie", "Dos resistencias de 10 Ω y 20 Ω se conectan en serie. ¿Cuánto vale la resistencia total, en Ω?", nums(30), "R = 10 + 20 = 30 Ω.", "Se suman."),
    calc("calc-iserie", "Intensidad en serie", "Ese conjunto se conecta a 12 V. ¿Qué intensidad circula, en A?", nums(0.4), "I = 12 / 30 = 0,4 A.", "I = V/R."),
    calc("calc-v1", "Tensión en R₁", "En el circuito anterior, ¿qué tensión hay en la resistencia de 10 Ω, en V?", nums(4), "V₁ = 0,4 · 10 = 4 V.", "V = I·R."),
    calc("calc-par", "Resistencias iguales en paralelo", "Dos resistencias iguales de 20 Ω se conectan en paralelo. ¿Cuánto vale la resistencia total, en Ω?", nums(10), "1/R = 1/20 + 1/20 = 1/10 → R = 10 Ω.", "Con dos iguales: la mitad."),
    calc("calc-par2", "Paralelo distinto", "Una de 10 Ω y otra de 40 Ω en paralelo. ¿Cuánto vale R, en Ω?", nums(8), "1/R = 1/10 + 1/40 = 5/40 → R = 8 Ω.", "Suma las inversas."),
    sort("clasifica", "Serie o paralelo", "Clasifica cada propiedad.",
      [["se", "En serie", "amber"], ["pa", "En paralelo", "cobalt"]],
      [["La intensidad es la misma en todos los receptores", "se"], ["R total = R₁ + R₂", "se"], ["Si uno se funde, se apaga todo", "se"], ["La tensión es la misma en todos los receptores", "pa"], ["Si uno se funde, los demás siguen", "pa"], ["Los enchufes de una casa", "pa"]],
      "Serie: una intensidad; paralelo: una tensión.",
    ),
    pick("check", "Resistencia total", "¿Cómo es la resistencia equivalente de dos resistencias en paralelo?",
      "Menor que cada una de ellas",
      [["Mayor que cada una", "Eso ocurre en serie."], ["Igual a la suma", "Eso es en serie."], ["Igual a la mayor", "Es menor que la menor."]],
      "Hay más caminos para la corriente.",
    ),
  ],
};
