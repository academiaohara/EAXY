import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_5_SUBTITLE } from "@/data/lessons/shared";

export const operacionesPolinomios2esoLesson: InteractiveLesson = {
  slug: "operaciones-polinomios-2eso",
  title: "4. Operaciones con polinomios",
  subtitle: TEMA_2ESO_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "forma-practica",
      type: "slide",
      help: [
        {
          label: "Un hueco con 0x",
          message: "Si a un polinomio le falta un término, se rellena con $0$ (por ejemplo $0x$) para que cada columna tenga su semejante.",
        },
        {
          label: "Ordena",
          message: "Escribe los términos de mayor a menor grado: así se alinean por columnas.",
        },
      ],
      title: "Sumar polinomios en columna",
      blocks: [
        {
          kind: "rule",
          text: "Se colocan **uno bajo el otro**, con los **monomios semejantes en la misma columna**, y se suman los coeficientes de cada columna.",
        },
        {
          kind: "example",
          title: "A = 2x³ − 3x² + 6 y B = x² − 5x + 4",
          lines: [
            { math: "A = 2x^3 - 3x^2 + 0x + 6" },
            { math: "B = \\qquad\\ \\ x^2 - 5x + 4" },
            { math: "A + B = 2x^3 - 2x^2 - 5x + 10" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "resta",
      type: "slide",
      help: [
        {
          label: "Restar es sumar el opuesto",
          message: "$A - B = A + (-B)$, y el opuesto de un polinomio tiene todos sus signos cambiados.",
        },
        {
          label: "Cuidado",
          message: "El error más frecuente es cambiar solo el signo del primer término de $B$.",
        },
      ],
      title: "Restar polinomios",
      blocks: [
        {
          kind: "rule",
          text: "Para restar, se **suma el primero con el opuesto del segundo**: se cambia el signo a **todos** los términos del segundo.",
        },
        {
          kind: "example",
          lines: [
            { math: "A = 2x^3 - 3x^2 + 0x + 6" },
            { math: "-B = \\qquad - x^2 + 5x - 4" },
            { math: "A - B = 2x^3 - 4x^2 + 5x + 2" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["(2x³−3x²+6)", "−", "(x²−5x+4)"], note: "restar es sumar el opuesto." },
            { tokens: ["2x³", "−", "3x²", "+", "6", "−", "x²", "+", "5x", "−", "4"], active: [5, 10], note: "se cambian todos los signos del segundo polinomio." },
            { tokens: ["2x³", "−", "4x²", "+", "5x", "+", "2"], fresh: [0, 6], note: "$-3x^2 - x^2 = -4x^2$ y $6 - 4 = 2$." },
          ],
        },
      },
    },
    {
      id: "producto-numero",
      type: "slide",
      help: [
        {
          label: "Distributiva",
          message: "Un número multiplicado por una suma se multiplica por cada sumando: $2 \\cdot (a + b) = 2a + 2b$.",
        },
        {
          label: "Con signos",
          message: "Multiplica coeficiente a coeficiente, respetando la regla de los signos: $2 \\cdot (-4x^2) = -8x^2$.",
        },
      ],
      title: "Producto de un polinomio por un número",
      blocks: [
        {
          kind: "rule",
          text: "Se multiplica el número por **cada término** del polinomio (propiedad distributiva).",
        },
        {
          kind: "example",
          lines: [
            { math: "2 \\cdot (x^3 - 4x^2 + 5x - 1) = 2x^3 - 8x^2 + 10x - 2" },
            { math: "3 \\cdot (2x + 5) = 6x + 15" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-suma",
      type: "predict",
      help: [
        {
          label: "Por columnas",
          message: "$x^3$: $3 + 2$; $x^2$: $-5 - 1$; $x$: $-4 - 7$; números: $4 - 1$.",
        },
      ],
      title: "Suma",
      question: "Si $A = 3x^3 - 5x^2 - 4x + 4$ y $B = 2x^3 - x^2 - 7x - 1$, ¿cuánto vale $A + B$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$5x^3 - 6x^2 - 11x + 3$" },
        { id: "b", label: "$5x^3 - 4x^2 - 11x + 3$", incorrectFeedback: "$-5x^2 + (-x^2) = -6x^2$." },
        { id: "c", label: "$5x^3 - 6x^2 + 3x + 5$", incorrectFeedback: "Esa es la resta, con los signos del segundo cambiados." },
        { id: "d", label: "$5x^6 - 6x^4 - 11x^2 + 3$", incorrectFeedback: "Al sumar monomios semejantes, la parte literal no cambia." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(3 + 2)x^3 + (-5 - 1)x^2 + (-4 - 7)x + (4 - 1) = 5x^3 - 6x^2 - 11x + 3$.",
    },
    {
      id: "check-resta",
      type: "predict",
      help: [
        {
          label: "Cambia los signos de B",
          message: "$-B = -2x^3 + x^2 + 7x + 1$. Súmalo a $A$.",
        },
      ],
      title: "Resta",
      question: "Con los mismos polinomios, ¿cuánto vale $A - B$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$x^3 - 4x^2 + 3x + 5$" },
        { id: "b", label: "$x^3 - 6x^2 + 3x + 3$", incorrectFeedback: "No se ha cambiado el signo de $-x^2$ y de $-1$ del segundo polinomio." },
        { id: "c", label: "$5x^3 - 6x^2 - 11x + 3$", incorrectFeedback: "Esa es $A + B$." },
        { id: "d", label: "$x^3 - 4x^2 - 11x + 5$", incorrectFeedback: "$-4x - (-7x) = -4x + 7x = 3x$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(3 - 2)x^3 + (-5 + 1)x^2 + (-4 + 7)x + (4 + 1) = x^3 - 4x^2 + 3x + 5$.",
    },
    {
      id: "check-producto",
      type: "predict",
      help: [
        {
          label: "Cada término",
          message: "$5 \\cdot x^2 = 5x^2$ y $5 \\cdot (-x) = -5x$.",
        },
      ],
      title: "Producto por un número",
      question: "¿Cuánto vale $5 \\cdot (x^2 - x)$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$5x^2 - 5x$" },
        { id: "b", label: "$5x^2 - x$", incorrectFeedback: "El $5$ multiplica a **todos** los términos del paréntesis." },
        { id: "c", label: "$x^2 - 5x$", incorrectFeedback: "También hay que multiplicar el término $x^2$." },
        { id: "d", label: "$5x^3 - 5x^2$", incorrectFeedback: "El $5$ es un número: no aumenta los exponentes." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$5 \\cdot x^2 + 5 \\cdot (-x) = 5x^2 - 5x$.",
    },
    {
      id: "check-valor",
      type: "fill_in_blank",
      help: [
        {
          label: "Sustituye",
          message: "$3 \\cdot (-2)^2 - 2 \\cdot (-2) + 5 = 12 + 4 + 5$.",
        },
      ],
      title: "Valor numérico",
      question: "Calcula el valor numérico de $3x^2 - 2x + 5$ para $x = -2$ (solo el número)",
      correctAnswers: ["21"],
      explanation: "$3 \\cdot 4 - 2 \\cdot (-2) + 5 = 12 + 4 + 5 = 21$.",
    },
  ],
};
