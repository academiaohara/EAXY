import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const hojaCalculoFormulas2esoLesson: InteractiveLesson = {
  slug: "hoja-calculo-formulas-2eso",
  title: "3. Hoja de cálculo: fórmulas y presupuestos",
  subtitle: TECESO2_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Una tabla que calcula", [
      { kind: "definition", text: "Una **hoja de cálculo** organiza datos en **filas y columnas**. Cada **celda** tiene una dirección (B2) y puede contener un número, un texto o una **fórmula** que calcula con otras celdas." },
      { kind: "steps", items: [
        "Las fórmulas empiezan por **=** (por ejemplo, =B2*C2).",
        "Funciones útiles: **SUMA**, **PROMEDIO**, **MAX**, **MIN**, **CONTAR**.",
        "Al cambiar un dato, todo lo que depende de él **se recalcula** solo.",
        "Se pueden hacer **gráficos** a partir de los datos.",
      ] },
    ], undefined, "stack"),
    slide("presupuesto", "Un presupuesto con fórmulas", [
      { kind: "text", text: "Cambia las cantidades y observa cómo se actualizan los importes y los totales. Pulsa «Ver fórmulas» para ver qué hay en cada celda." },
    ], tool("eso2-hoja-calculo-explorador"), "visual-top"),
    slide("refs", "Referencias a celdas", [
      { kind: "compare",
        left: { title: "Relativa (B2)", text: "Al **copiar** la fórmula a otra fila, la referencia se **desplaza**: =B2*C2 pasa a =B3*C3.", tone: "info" },
        right: { title: "Absoluta ($B$1)", text: "Con **$**, la referencia **no cambia** al copiar. Sirve para un valor fijo, como el porcentaje de IVA.", tone: "key" } },
    ]),
    calc("calc-importe", "Una fórmula", "En la fila 2, B2 = 6 (cantidad) y C2 = 1,5 (precio). ¿Cuánto vale =B2*C2?", nums(9), "6 · 1,5 = 9.", "Multiplica las dos celdas."),
    calc("calc-iva", "Total con IVA", "Un subtotal de 20 € con un 21 % de IVA da un total de… (en €)", nums(24.2), "20 · 1,21 = 24,2 €.", "Multiplica por 1,21."),
    sort("clasifica-celda", "¿Es una fórmula?", "Decide si cada contenido de celda es una fórmula.",
      [["si", "Es una fórmula", "emerald"], ["no", "No es una fórmula", "rose"]],
      [["=B2*C2", "si"], ["=SUMA(D2:D5)", "si"], ["=PROMEDIO(B2:B9)", "si"], ["Listones", "no"], ["15,5", "no"], ["B2*C2", "no"]],
      "Solo lo que empieza por = se evalúa como fórmula.",
    ),
    pick("check-suma", "Sumar un rango", "¿Qué fórmula suma las celdas de D2 a D5?",
      "=SUMA(D2:D5)",
      [["=D2:D5", "Falta la función."], ["SUMA D2 D5", "Falta el signo igual y la sintaxis."], ["=D2+D5", "Solo sumaría dos celdas."]],
      "El rango D2:D5 incluye todas las celdas entre D2 y D5.",
    ),
  ],
};
