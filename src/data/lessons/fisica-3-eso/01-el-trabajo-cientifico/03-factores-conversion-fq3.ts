import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const factoresConversionFq3Lesson: InteractiveLesson = {
  slug: "factores-conversion-fq3",
  title: "3. Factores de conversión",
  subtitle: FQ3_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cambiar de unidades", [
      { kind: "steps", items: [
        "Un **factor de conversión** es una fracción que **vale 1** porque numerador y denominador son la **misma cantidad** en unidades distintas: 1000 m / 1 km.",
        "Se **multiplica** por el factor de manera que la unidad que quieres **eliminar** quede en el denominador y se **cancele**.",
        "Se pueden **encadenar** varios factores hasta llegar a la unidad deseada.",
        "Para comprobar el resultado, mira si las **unidades finales** son las esperadas.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Cadenas de factores", [
      { kind: "text", text: "Elige una conversión y mira cómo se cancelan las unidades paso a paso." },
    ], tool("fq3-factores-conversion-explorador"), "visual-top"),
    slide("ejem", "Ejemplos útiles", [
      { kind: "steps", items: [
        "**km/h → m/s**: se divide entre 3,6. Así, 72 km/h = 20 m/s.",
        "**g/cm³ → kg/m³**: se multiplica por 1000. Así, 1 g/cm³ = 1000 kg/m³.",
        "**kWh → J**: 1 kWh = 3 600 000 J = 3,6 · 10⁶ J.",
        "Si la magnitud lleva una unidad **al cuadrado o al cubo**, el factor también se eleva: 1 m² = 10⁴ cm².",
      ] },
    ]),
    calc("calc-v", "Velocidad", "Un coche va a 90 km/h. ¿Cuántos m/s son?", nums(25), "90 · 1000 / 3600 = 25 m/s.", "Multiplica por 1000 y divide entre 3600."),
    calc("calc-d", "Densidad", "El hierro tiene una densidad de 7,8 g/cm³. ¿Cuántos kg/m³ son?", nums(7800), "7,8 · 1000 = 7800 kg/m³.", "1 g/cm³ = 1000 kg/m³."),
    calc("calc-t", "Tiempo", "¿Cuántos segundos hay en 2 días?", nums(172800), "2 · 24 · 3600 = 172 800 s.", "Días → horas → segundos."),
    sort("clasifica", "Factor correcto", "Clasifica cada fracción según valga 1 (factor de conversión válido) o no.",
      [["si", "Factor válido (vale 1)", "emerald"], ["no", "No es un factor válido", "rose"]],
      [["1000 m / 1 km", "si"], ["60 s / 1 min", "si"], ["100 cm / 1 m", "si"], ["10 m / 1 km", "no"], ["1 h / 100 min", "no"], ["1000 g / 1 mg", "no"]],
      "Numerador y denominador deben ser la misma cantidad.",
    ),
    pick("check", "Unidades", "Al convertir 5 km a metros multiplicas por (1000 m / 1 km). ¿Qué unidad se cancela?",
      "Los kilómetros",
      [["Los metros", "Los metros son la unidad final."], ["Ninguna", "Siempre se cancela la unidad de partida."], ["Los segundos", "No intervienen."]],
      "La unidad de partida está en el denominador y se cancela.",
    ),
  ],
};
