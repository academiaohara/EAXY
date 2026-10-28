import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const magnitudesUnidadesSiFq2Lesson: InteractiveLesson = {
  slug: "magnitudes-unidades-si-fq2",
  title: "2. Magnitudes, unidades y notación científica",
  subtitle: FQ2_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Medir con un lenguaje común", [
      { kind: "steps", items: [
        "Una **magnitud** es una propiedad que se puede **medir**: longitud, masa, tiempo, temperatura, volumen…",
        "Medir es **comparar** con una **unidad**: 3 m es tres veces la unidad «metro».",
        "El **Sistema Internacional (SI)** fija unidades comunes para todo el mundo: metro (m), kilogramo (kg), segundo (s), kelvin (K)…",
        "Las **magnitudes derivadas** se obtienen de las básicas: la **superficie** (m²), el **volumen** (m³) o la **densidad** (kg/m³).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Prefijos y conversiones", [
      { kind: "text", text: "Elige un valor y dos prefijos. Mira por qué potencia de 10 hay que multiplicar." },
    ], tool("fq2-unidades-prefijos-explorador"), "visual-top"),
    slide("prefijos", "Múltiplos y submúltiplos", [
      { kind: "steps", items: [
        "**kilo (k)** = 1000 · **mega (M)** = 1 000 000 · **giga (G)** = 10⁹.",
        "**centi (c)** = 0,01 · **mili (m)** = 0,001 · **micro (µ)** = 10⁻⁶ · **nano (n)** = 10⁻⁹.",
        "Para pasar de una unidad **mayor** a una **menor** se **multiplica**; de una menor a una mayor, se **divide**.",
        "Hay que **expresar siempre las magnitudes con su unidad**: un número sin unidad no dice nada.",
      ] },
    ]),
    slide("not", "Notación científica", [
      { kind: "text", text: "Los números muy grandes o muy pequeños se escriben como **mantisa × 10ⁿ**, con la mantisa entre 1 y 10. Por ejemplo, $300\\,000\\,000 = 3 \\cdot 10^{8}$ y $0{,}00042 = 4{,}2 \\cdot 10^{-4}$. Si el exponente es **positivo**, el número es grande; si es **negativo**, pequeño." },
    ]),
    calc("calc-km", "De kilómetros a metros", "Un recorrido mide 2,5 km. ¿Cuántos metros son?", nums(2500), "1 km = 1000 m, así que 2,5 · 1000 = 2500 m.", "Multiplica por 1000."),
    calc("calc-mg", "De gramos a miligramos", "Una pastilla pesa 0,25 g. ¿Cuántos miligramos son?", nums(250), "1 g = 1000 mg: 0,25 · 1000 = 250 mg.", "Pasas a una unidad menor: multiplica."),
    calc("calc-cm", "De centímetros a metros", "Una mesa mide 120 cm. ¿Cuántos metros son?", nums(1.2), "1 m = 100 cm: 120 / 100 = 1,2 m.", "Pasas a una unidad mayor: divide."),
    sort("clasifica", "Magnitud o unidad", "Clasifica cada término.",
      [["mag", "Magnitud", "cobalt"], ["uni", "Unidad", "amber"]],
      [["Longitud", "mag"], ["Masa", "mag"], ["Temperatura", "mag"], ["Metro", "uni"], ["Kilogramo", "uni"], ["Segundo", "uni"]],
      "Una magnitud se mide; una unidad es la referencia con la que se mide.",
    ),
    pick("check", "Notación científica", "¿Cómo se escribe 0,00042 en notación científica?",
      "4,2 · 10⁻⁴",
      [["4,2 · 10⁴", "El exponente positivo indica un número grande."], ["42 · 10⁻⁵", "La mantisa debe estar entre 1 y 10."], ["0,42 · 10⁻³", "La mantisa debe estar entre 1 y 10."]],
      "Se desplaza la coma 4 lugares a la derecha, de modo que el exponente es −4.",
    ),
  ],
};
