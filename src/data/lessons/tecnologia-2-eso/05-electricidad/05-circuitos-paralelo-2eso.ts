import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const circuitosParalelo2esoLesson: InteractiveLesson = {
  slug: "circuitos-paralelo-2eso",
  title: "5. Circuitos en paralelo",
  subtitle: TECESO2_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Varios caminos para la corriente", [
      { kind: "definition", text: "En un circuito en **paralelo** los receptores se conectan a los mismos dos puntos, de modo que la corriente se **reparte** entre varias ramas." },
      { kind: "steps", items: [
        "La **tensión es la misma** en todas las ramas: V = V₁ = V₂.",
        "Las **intensidades se suman**: I = I₁ + I₂.",
        "La resistencia equivalente cumple **1/R_eq = 1/R₁ + 1/R₂ + …**; para dos resistencias, **R_eq = R₁ · R₂ / (R₁ + R₂)**.",
        "**R_eq es menor** que la menor de las resistencias.",
        "Si una rama se corta, **las demás siguen funcionando**.",
      ] },
    ], undefined, "stack"),
    slide("calculo", "Calcula un circuito en paralelo", [
      { kind: "text", text: "Cambia las resistencias y comprueba que cada rama recibe toda la tensión y que las corrientes suman la total." },
    ], tool("eso2-serie-paralelo-explorador", { n: 1, a: 12, b: 6 }), "visual-top"),
    slide("casa", "Por qué en casa todo va en paralelo", [
      { kind: "compare",
        left: { title: "Ventaja", text: "Cada aparato recibe los **230 V** completos y funciona **aunque otro esté apagado o averiado**.", tone: "key" },
        right: { title: "Inconveniente", text: "Cuantos más aparatos se conectan, **más corriente total** pasa por el cable. Por eso existen los **magnetotérmicos** y los fusibles.", tone: "warn" } },
    ]),
    calc("calc-req2", "Dos resistencias iguales", "Dos resistencias de 10 Ω están en paralelo. ¿Cuál es la resistencia equivalente, en Ω?", nums(5), "10 · 10 / (10 + 10) = 5 Ω. Con dos resistencias iguales se obtiene la mitad.", "R_eq = R₁ · R₂ / (R₁ + R₂)."),
    calc("calc-itot", "Corriente total", "Una pila de 12 V alimenta dos ramas en paralelo de 6 Ω y 12 Ω. ¿Qué intensidad total entrega la pila, en A?", nums(3), "I₁ = 12/6 = 2 A, I₂ = 12/12 = 1 A, I = 2 + 1 = 3 A.", "Calcula la corriente de cada rama y suma."),
    sort("clasifica-sp", "Serie o paralelo", "Clasifica cada característica.",
      [["ser", "Serie", "cobalt"], ["par", "Paralelo", "amber"]],
      [["La intensidad es la misma en todos", "ser"], ["Las resistencias se suman", "ser"], ["Si uno falla, falla todo el circuito", "ser"], ["La tensión es la misma en todas las ramas", "par"], ["Las intensidades se suman", "par"], ["Si una rama falla, las otras siguen", "par"]],
      "Serie: misma intensidad y tensiones que se reparten. Paralelo: misma tensión y corrientes que se reparten.",
    ),
    pick("check-par", "Resistencia equivalente", "¿Cuál es la resistencia equivalente de 4 Ω y 12 Ω en paralelo?",
      "3 Ω, menor que la menor de las dos",
      [["16 Ω, la suma", "Eso sería en serie."], ["8 Ω, la media", "En paralelo no se hace la media."], ["48 Ω, el producto", "Hay que dividir por la suma."]],
      "4 · 12 / (4 + 12) = 48 / 16 = 3 Ω.",
    ),
  ],
};
