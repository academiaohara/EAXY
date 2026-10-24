import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_2_SUBTITLE } from "@/data/lessons/shared";

export const polinomiosDivision1bachLesson: InteractiveLesson = {
  slug: "polinomios-division-1bach",
  title: "2. División de polinomios",
  subtitle: TEMA_1BACH_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "algoritmo",
      type: "slide",
      help: [{ label: "Como con números", message: "Es el mismo algoritmo que dividir enteros, pero «el más grande» se decide por el grado: se divide el término de mayor grado del resto entre el de mayor grado del divisor." }],
      title: "Dividir polinomios paso a paso",
      blocks: [
        { kind: "rule", title: "Prueba de la división", formula: "D(x) = d(x)\\cdot c(x) + r(x),\\qquad \\text{gr}(r) < \\text{gr}(d)" },
        { kind: "steps", title: "Algoritmo", items: [
          "Se divide el término de mayor grado del dividendo entre el del divisor: sale un término del cociente.",
          "Se multiplica ese término por el divisor y se **resta** del dividendo.",
          "Se repite con el resto hasta que su grado sea menor que el del divisor.",
        ] },
      ],
      visual: { kind: "anim", scene: "division-polinomios", params: { p: [2, -7, -11, 13], q: [2, 3] } },
    },
    {
      id: "resultado",
      type: "slide",
      help: [{ label: "Comprobar", message: "$(2x+3)(x^2-5x+2) + 7 = 2x^3 - 10x^2 + 4x + 3x^2 - 15x + 6 + 7 = 2x^3 - 7x^2 - 11x + 13$ ✓." }],
      title: "Cociente y resto",
      blocks: [
        { kind: "example", title: "(2x³ − 7x² − 11x + 13) : (2x + 3)", lines: [
          { math: "\\text{cociente } c(x) = x^2 - 5x + 2" },
          { math: "\\text{resto } r(x) = 7" },
          { math: "2x^3 - 7x^2 - 11x + 13 = (2x+3)(x^2 - 5x + 2) + 7" },
        ] },
        { kind: "text", text: "Como el divisor tiene grado $1$, el resto es un **número**: su grado debe ser menor que $1$." },
      ],
      arrange: "stack",
    },
    {
      id: "check-resto",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "El resto tiene grado menor que el del divisor; $x^2 + 1$ tiene grado $2$." }],
      title: "Grado del resto",
      question: "Al dividir un polinomio entre $x^2 + 1$, ¿cuál es el **mayor grado** que puede tener el resto? (solo el número)",
      correctAnswers: ["1"],
      explanation: "El resto debe tener grado menor que el divisor ($2$), así que como mucho $1$: de la forma $ax + b$.",
    },
    {
      id: "check-prueba",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Aplica $D = d\\cdot c + r$ con $d = x - 1$, $c = x + 2$, $r = 3$." }],
      title: "Reconstruir el dividendo",
      question: "Al dividir $D(x)$ entre $d(x) = x - 1$ se obtiene cociente $x + 2$ y resto $3$. ¿Cuánto vale $D(x)$?",
      choices: [
        { id: "a", label: "$x^2 + x + 1$" },
        { id: "b", label: "$x^2 + x - 2$", incorrectFeedback: "Es $(x-1)(x+2)$: falta **sumar el resto** $3$." },
        { id: "c", label: "$x^2 + 3x + 1$", incorrectFeedback: "Revisa el producto $(x-1)(x+2) = x^2 + x - 2$; luego se suma $3$." },
        { id: "d", label: "$x + 5$", incorrectFeedback: "Has sumado los polinomios en lugar de multiplicar divisor y cociente." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$D = (x-1)(x+2) + 3 = x^2 + x - 2 + 3 = x^2 + x + 1$.",
    },
    {
      id: "exacta",
      type: "slide",
      help: [{ label: "Para qué", message: "Dividir exactamente es lo mismo que **factorizar**: $x^2 - 1 = (x-1)(x+1)$. Es la base de las lecciones siguientes." }],
      title: "División exacta",
      blocks: [
        { kind: "definition", text: "La división es **exacta** cuando el resto es $0$. Entonces $D(x) = d(x)\\cdot c(x)$ y se dice que $D$ es **divisible** por $d$." },
        { kind: "example", lines: [
          { math: "(x^2 - 1) : (x - 1) = x + 1 \\qquad \\text{resto } 0" },
          { math: "(x^3 - 1) : (x - 1) = x^2 + x + 1 \\qquad \\text{resto } 0" },
        ] },
      ],
      visual: { kind: "anim", scene: "division-polinomios", params: { p: [1, 0, 0, -1], q: [1, -1] } },
    },
    {
      id: "check-exacta",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$x^3 + 1 = (x+1)(x^2 - x + 1)$." }],
      title: "¿Resto cero?",
      question: "¿Cuál es el resto de dividir $x^3 + 1$ entre $x + 1$? (solo el número)",
      correctAnswers: ["0"],
      explanation: "$x^3 + 1 = (x+1)(x^2 - x + 1)$, así que la división es exacta: el resto es $0$.",
    },
  ],
};
