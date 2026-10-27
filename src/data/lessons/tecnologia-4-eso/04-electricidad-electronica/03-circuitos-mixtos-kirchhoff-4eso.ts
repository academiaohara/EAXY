import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const circuitosMixtosKirchhoff4esoLesson: InteractiveLesson = {
  slug: "circuitos-mixtos-kirchhoff-4eso",
  title: "3. Circuitos mixtos y leyes de Kirchhoff",
  subtitle: TECESO4_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Serie y paralelo a la vez", [
      { kind: "steps", items: [
        "**Serie**: misma corriente; las resistencias se **suman**.",
        "**Paralelo**: misma tensión; se suman las **inversas**: 1/R = 1/R₁ + 1/R₂.",
        "En un circuito **mixto** se reduce paso a paso: primero los paralelos y luego los series.",
        "**Kirchhoff de nudos**: la suma de corrientes que entran en un nudo es la que sale.",
        "**Kirchhoff de mallas**: la suma de tensiones en una malla es cero.",
      ] },
    ], undefined, "stack"),
    slide("mixto", "Resuelve un circuito mixto", [
      { kind: "text", text: "R₁ en serie con el paralelo de R₂ y R₃. Cambia los valores y observa cómo se reparte la corriente." },
    ], tool("eso4-circuito-mixto-explorador"), "visual-top"),
    slide("kirch", "Las leyes de Kirchhoff", [
      { kind: "text", text: "Comprueba que se cumplen las dos leyes en un circuito." },
    ], tool("kirchhoff-explorador"), "visual-top"),
    calc("calc-par", "Resistencia en paralelo", "Dos resistencias de 220 Ω y 330 Ω en paralelo, ¿cuántos Ω equivalen? (R₁·R₂ / (R₁+R₂))", nums(132), "220 · 330 / 550 = 132 Ω.", "Producto entre suma."),
    calc("calc-req", "Equivalente total", "Si se pone en serie una resistencia de 100 Ω, ¿cuántos Ω tiene el conjunto?", nums(232), "100 + 132 = 232 Ω.", "Suma la serie."),
    calc("calc-i", "Corriente total", "Con una fuente de 12 V y 232 Ω, ¿cuántos mA circulan? (redondea a un entero)", nums(52, 51.7), "12 / 232 = 0,0517 A ≈ 52 mA.", "Ley de Ohm: V entre R."),
    sort("clasifica-conex", "¿Serie o paralelo?", "Clasifica cada propiedad.",
      [["ser", "Serie", "cobalt"], ["par", "Paralelo", "amber"]],
      [["Pasa la misma corriente por todos", "ser"], ["Las resistencias se suman", "ser"], ["Si uno se funde, se corta todo", "ser"], ["Todos tienen la misma tensión", "par"], ["La corriente se reparte", "par"], ["Si uno se funde, los demás siguen", "par"]],
      "En casa los aparatos van en paralelo; los fusibles, en serie.",
    ),
    pick("check-kirch", "Un nudo", "A un nudo llegan 3 A y 2 A y sale una corriente por otra rama. ¿Cuánto vale?",
      "5 A",
      [["1 A", "Se suman las que entran."], ["6 A", "No coincide."], ["0 A", "La corriente no desaparece."]],
      "La corriente no se acumula en un nudo: entra tanto como sale.",
    ),
  ],
};
