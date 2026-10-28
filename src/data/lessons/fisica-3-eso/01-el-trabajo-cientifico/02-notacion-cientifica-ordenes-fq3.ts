import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const notacionCientificaOrdenesFq3Lesson: InteractiveLesson = {
  slug: "notacion-cientifica-ordenes-fq3",
  title: "2. Notación científica y órdenes de magnitud",
  subtitle: FQ3_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Números muy grandes y muy pequeños", [
      { kind: "steps", items: [
        "La **notación científica** escribe un número como **a · 10ⁿ**, con **1 ≤ a < 10** y n entero.",
        "Si el número es **grande**, n es **positivo**: 300 000 000 = 3 · 10⁸. Si es **pequeño**, n es **negativo**: 0,000 004 = 4 · 10⁻⁶.",
        "El exponente n indica el **orden de magnitud**: cada unidad más es un número **10 veces mayor**.",
        "Para **multiplicar**, se multiplican las mantisas y se **suman** los exponentes; para **dividir**, se **restan**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "De los átomos a la galaxia", [
      { kind: "text", text: "Recorre la escala de tamaños del universo y observa el orden de magnitud de cada objeto." },
    ], tool("fq3-ordenes-magnitud-explorador"), "visual-top"),
    slide("oper", "Operar con potencias de 10", [
      { kind: "steps", items: [
        "(3 · 10⁴) · (2 · 10³) = 6 · 10⁷: se multiplican 3 · 2 y se suman 4 + 3.",
        "(8 · 10⁶) / (4 · 10²) = 2 · 10⁴: se divide 8 / 4 y se restan 6 − 2.",
        "Si la mantisa sale **mayor o igual que 10**, se ajusta: 12 · 10⁵ = 1,2 · 10⁶.",
      ] },
    ]),
    calc("calc-exp", "Exponente", "El Sol está a 150 000 000 km de la Tierra. Escrito como 1,5 · 10ⁿ km, ¿cuánto vale n?", nums(8), "150 000 000 = 1,5 · 10⁸: n = 8.", "Cuenta cuántos lugares se desplaza la coma."),
    calc("calc-neg", "Exponente negativo", "El diámetro de un átomo es 0,000 000 000 1 m = 1 · 10ⁿ m. ¿Cuánto vale n?", nums(-10), "0,000 000 000 1 = 10⁻¹⁰: n = −10.", "La coma se mueve 10 lugares a la derecha."),
    calc("calc-mul", "Producto", "Calcula (3 · 10⁴) · (2 · 10³) = 6 · 10ⁿ. ¿Cuánto vale n?", nums(7), "Se suman los exponentes: 4 + 3 = 7.", "Multiplicar potencias de la misma base: se suman exponentes."),
    sort("clasifica", "Orden de magnitud", "Asocia cada cantidad con su orden de magnitud aproximado.",
      [["a", "10⁻¹⁰ m", "cobalt"], ["b", "10⁰ m", "amber"], ["c", "10⁷ m", "rose"]],
      [["Un átomo", "a"], ["Una molécula pequeña", "a"], ["Una persona", "b"], ["Una mesa", "b"], ["El diámetro de la Tierra", "c"], ["La distancia Madrid–Nueva York", "c"]],
      "El orden de magnitud es la potencia de 10 más próxima.",
    ),
    pick("check", "Escritura correcta", "¿Cuál está bien escrito en notación científica?",
      "4,5 · 10⁶",
      [["45 · 10⁵", "La mantisa debe estar entre 1 y 10."], ["0,45 · 10⁷", "La mantisa debe ser mayor o igual que 1."], ["4,5 · 6¹⁰", "La base debe ser 10."]],
      "La mantisa va entre 1 y 10 y la base es 10.",
    ),
  ],
};
