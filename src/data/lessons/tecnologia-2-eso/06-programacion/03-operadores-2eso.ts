import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const operadores2esoLesson: InteractiveLesson = {
  slug: "operadores-2eso",
  title: "3. Operadores aritméticos, de comparación y lógicos",
  subtitle: TECESO2_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("tipos", "Tres familias de operadores", [
      { kind: "steps", items: [
        "**Aritméticos**: suma (+), resta (−), producto (·), división (/), **cociente** entero y **resto** (%).",
        "**De comparación**: mayor (>), menor (<), igual (=), distinto (≠), mayor o igual (≥). Dan **verdadero** o **falso**.",
        "**Lógicos**: **y**, **o**, **no**. Combinan condiciones.",
        "Se aplican con una **prioridad**: primero los paréntesis, luego · y /, luego + y −.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Pruébalos", [
      { kind: "text", text: "Cambia a y b, y alterna entre las tres familias de operadores." },
    ], tool("eso2-operadores-explorador"), "visual-top"),
    slide("resto", "El operador resto, muy útil", [
      { kind: "example", title: "Usos del resto (%)", lines: [
        { math: "17 \\bmod 5 = 2", note: "17 = 3 · 5 + 2: sobra 2." },
        { math: "n \\bmod 2 = 0", note: "El número n es par." },
        { math: "n \\bmod 10", note: "La última cifra de n." },
      ] },
    ]),
    calc("calc-resto", "Calcula el resto", "¿Cuánto es 29 % 6 (el resto de dividir 29 entre 6)?", nums(5), "29 = 4 · 6 + 5: el resto es 5.", "Busca el mayor múltiplo de 6 que no pase de 29."),
    calc("calc-prior", "Prioridad de operadores", "¿Cuánto vale 2 + 3 · 4?", nums(14), "Primero el producto: 3 · 4 = 12; después 2 + 12 = 14.", "El producto tiene prioridad sobre la suma."),
    sort("clasifica-op", "¿Verdadero o falso?", "Con a = 8 y b = 3, clasifica cada expresión.",
      [["ver", "Verdadero", "emerald"], ["fal", "Falso", "rose"]],
      [["a > b", "ver"], ["a ≠ b", "ver"], ["(a > 5) y (b < 5)", "ver"], ["a = b", "fal"], ["(a < 5) y (b < 5)", "fal"], ["no (a > b)", "fal"]],
      "Con y deben cumplirse las dos condiciones; con no se invierte el resultado.",
    ),
    pick("check-igual", "Asignar o comparar", "En pseudocódigo, ¿qué diferencia hay entre «x ← 5» y «x = 5»?",
      "«←» asigna el valor 5 a x; «=» comprueba si x vale 5",
      [["Son idénticos", "Uno cambia la variable y el otro la compara."], ["«=» asigna y «←» compara", "Está al revés."], ["Ninguno de los dos se usa", "Ambos son habituales."]],
      "Confundir asignación y comparación es uno de los errores más frecuentes al empezar a programar.",
    ),
  ],
};
