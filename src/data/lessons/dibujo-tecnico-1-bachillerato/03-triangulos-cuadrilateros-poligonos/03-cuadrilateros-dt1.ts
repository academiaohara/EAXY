import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const cuadrilaterosDt1Lesson: InteractiveLesson = {
  slug: "cuadrilateros-dt1",
  title: "3. Cuadriláteros: clasificación y construcción",
  subtitle: DT1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Familias de cuadriláteros", [
      { kind: "steps", items: [
        "**Paralelogramos** (dos pares de lados paralelos): **cuadrado**, **rectángulo**, **rombo** y **romboide**.",
        "**Trapecios** (un solo par de lados paralelos): **rectángulo**, **isósceles** y **escaleno**.",
        "**Trapezoides** (ningún par paralelo): como el **deltoide**, con dos pares de lados consecutivos iguales.",
        "Los ángulos interiores de cualquier cuadrilátero suman **360°**.",
      ] },
    ], undefined, "stack"),
    slide("paralelogramos", "Cuándo es qué paralelogramo", [
      { kind: "text", text: "Ajusta los lados y el ángulo. Observa las diagonales de cada tipo." },
    ], tool("dt1-cuadrilatero-explorador"), "visual-top"),
    slide("prop", "Propiedades útiles para construir", [
      { kind: "steps", items: [
        "**Paralelogramo**: lados y ángulos opuestos iguales; las diagonales **se cortan en su punto medio**.",
        "**Rectángulo**: diagonales **iguales**. **Rombo**: diagonales **perpendiculares** y bisectrices de los ángulos.",
        "**Cuadrado**: reúne ambas; el lado es $d/\\sqrt{2}$, con $d$ la diagonal.",
        "**Trapecio isósceles**: lados no paralelos iguales, diagonales iguales y es **inscriptible** en una circunferencia.",
        "Para **construir** un paralelogramo bastan dos lados y el ángulo que forman, o un lado y las dos diagonales.",
      ] },
    ]),
    calc("calc-lado-rombo", "Rombo", "Las diagonales de un rombo miden 6 cm y 8 cm. ¿Cuánto mide su lado, en cm?", nums(5), "Las diagonales son perpendiculares y se cortan en su punto medio: √(3² + 4²) = 5 cm.", "Pitágoras con las semidiagonales."),
    calc("calc-area-rombo", "Área del rombo", "Con esas diagonales, ¿qué área tiene el rombo, en cm²? (d₁·d₂/2)", nums(24), "6 · 8 / 2 = 24 cm².", "Producto de las diagonales entre dos."),
    calc("calc-diag", "Diagonal de un rectángulo", "Un rectángulo de 3 × 4 cm. ¿Cuánto mide la diagonal, en cm?", nums(5), "√(9 + 16) = 5 cm.", "Pitágoras."),
    sort("clasifica-cuad", "¿Qué cuadrilátero es?", "Clasifica cada descripción.",
      [["par", "Paralelogramo", "cobalt"], ["tra", "Trapecio", "amber"], ["tpz", "Trapezoide", "emerald"]],
      [["Rombo", "par"], ["Rectángulo", "par"], ["Cuadrado", "par"], ["Solo un par de lados paralelos", "tra"], ["Trapecio isósceles", "tra"], ["Ningún lado paralelo a otro", "tpz"], ["Deltoide", "tpz"]],
      "Se decide por los pares de lados paralelos.",
    ),
    pick("check-diag", "Diagonales", "Un cuadrilátero tiene las diagonales perpendiculares, se cortan en su punto medio y no son iguales. ¿Cuál es?",
      "Un rombo",
      [["Un rectángulo", "Sus diagonales son iguales y no perpendiculares."], ["Un cuadrado", "Tendría las diagonales iguales."], ["Un trapecio isósceles", "Sus diagonales no se cortan en el punto medio."]],
      "Perpendiculares y bisecadas mutuamente identifican al rombo.",
    ),
  ],
};
