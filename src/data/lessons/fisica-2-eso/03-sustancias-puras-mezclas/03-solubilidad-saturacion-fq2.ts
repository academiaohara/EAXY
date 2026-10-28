import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const solubilidadSaturacionFq2Lesson: InteractiveLesson = {
  slug: "solubilidad-saturacion-fq2",
  title: "3. Solubilidad y saturación",
  subtitle: FQ2_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Hasta cuánto se disuelve", [
      { kind: "steps", items: [
        "No se puede disolver **cualquier cantidad** de soluto en una cantidad de disolvente.",
        "La **solubilidad** es la **máxima cantidad de soluto** que se disuelve en una cantidad dada de disolvente, a una temperatura determinada.",
        "Suele darse en **g de soluto por 100 g de agua** (o por 100 mL).",
        "Es una **propiedad característica** de cada sustancia y depende de la **temperatura**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Curva de solubilidad", [
      { kind: "text", text: "Elige una sal, cambia la temperatura y la cantidad de sal. Mira si la disolución es insaturada, saturada o sobresaturada." },
    ], tool("fq2-solubilidad-curva-explorador"), "visual-top"),
    slide("tipos", "Tipos de disolución", [
      { kind: "steps", items: [
        "**Insaturada**: tiene menos soluto que el máximo; admite **más**.",
        "**Saturada**: tiene **justo el máximo**; si se añade más, no se disuelve.",
        "**Sobresaturada**: tiene **más** que el máximo (se consigue a veces al enfriar una disolución saturada); el exceso **precipita**.",
        "En general la solubilidad de los **sólidos aumenta** con la temperatura y la de los **gases disminuye**.",
      ] },
    ]),
    calc("calc-sat", "Sal sin disolver", "A 20 °C la solubilidad de una sal es 32 g por 100 g de agua. Se añaden 50 g a 100 g de agua. ¿Cuántos gramos quedan sin disolver?", nums(18), "50 − 32 = 18 g.", "Resta la solubilidad a lo que añades."),
    calc("calc-agua", "Más agua", "Con esa misma sal (32 g por 100 g de agua a 20 °C), ¿cuántos gramos se disuelven en 250 g de agua?", nums(80), "32 · 250 / 100 = 80 g.", "La solubilidad es proporcional a la cantidad de agua."),
    sort("clasifica", "¿Cómo está la disolución?", "A una temperatura la solubilidad de una sal es 40 g por 100 g de agua. Clasifica cada caso (por 100 g de agua).",
      [["ins", "Insaturada", "cobalt"], ["sat", "Saturada", "amber"], ["sob", "Sobresaturada o con exceso", "emerald"]],
      [["25 g disueltos", "ins"], ["10 g disueltos", "ins"], ["40 g disueltos", "sat"], ["Justo el máximo posible", "sat"], ["55 g añadidos", "sob"], ["Queda sal en el fondo", "sob"]],
      "Se compara la cantidad con la solubilidad.",
    ),
    pick("check", "Calentar", "¿Qué le ocurre en general a la solubilidad de un sólido en agua al calentar?",
      "Aumenta",
      [["Disminuye", "Esa es la tendencia de los gases."], ["No cambia nunca", "Depende de la sustancia, pero en general aumenta."], ["Se anula", "No es así."]],
      "La mayoría de los sólidos se disuelven mejor en agua caliente.",
    ),
  ],
};
