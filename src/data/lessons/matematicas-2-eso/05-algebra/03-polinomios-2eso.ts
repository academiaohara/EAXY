import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_5_SUBTITLE } from "@/data/lessons/shared";

export const polinomios2esoLesson: InteractiveLesson = {
  slug: "polinomios-2eso",
  title: "3. Polinomios",
  subtitle: TEMA_2ESO_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [
        {
          label: "No semejantes",
          message: "Un polinomio no tiene dos términos semejantes: si los tuviera, se sumarían y quedaría un solo término.",
        },
        {
          label: "Término independiente",
          message: "Es el que no lleva letra. En $3x^3 + 5x - 4$ es $-4$. Si no hay ninguno, el polinomio «no tiene».",
        },
      ],
      title: "Qué es un polinomio",
      blocks: [
        {
          kind: "definition",
          text: "Un **polinomio** es una expresión algebraica formada por **sumas y restas de monomios no semejantes**. Cada sumando es un **término**.",
        },
        {
          kind: "facts",
          items: [
            { tex: "3x^3 + 5x - 4", label: "términos: $3x^3$, $5x$, $-4$" },
            { tex: "-3ab + 4b", label: "términos: $-3ab$, $4b$" },
          ],
        },
        {
          kind: "compare",
          left: { title: "Binomio", text: "Dos términos.", math: ["-3ab + 4b"], tone: "ok" },
          right: { title: "Trinomio", text: "Tres términos.", math: ["x^2 - 3x + 1"], tone: "info" },
        },
      ],
      arrange: "stack",
    },
    {
      id: "grado",
      type: "slide",
      help: [
        {
          label: "El término de mayor grado",
          message: "Se calcula el grado de cada término y el mayor es el del polinomio: en $3x^3 + 5x - 4$ son $3$, $1$ y $0$.",
        },
        {
          label: "Término independiente",
          message: "Un número solo tiene grado $0$.",
        },
      ],
      title: "Grado y término independiente",
      blocks: [
        {
          kind: "rule",
          text: "El **grado** de un polinomio es el del **término de mayor grado**. El **término independiente** es el que solo tiene número.",
        },
        {
          kind: "example",
          lines: [
            { math: "3x^3 + 5x - 4", note: "grado $3$; independiente $-4$" },
            { math: "-3ab + 4b", note: "grado $2$ ($ab$); sin término independiente" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-grado",
      type: "fill_in_blank",
      help: [
        {
          label: "Grado de cada término",
          message: "$2x^4$ → $4$; $-x^2y^3$ → $5$; $7$ → $0$. El mayor es el grado del polinomio.",
        },
      ],
      title: "Grado de un polinomio",
      question: "¿Cuál es el grado de $2x^4 - x^2y^3 + 7$? (solo el número)",
      correctAnswers: ["5"],
      explanation: "Grados de los términos: $4$, $2 + 3 = 5$ y $0$. El mayor es $5$.",
    },
    {
      id: "suma-resta",
      type: "slide",
      help: [
        {
          label: "Agrupa los semejantes",
          message: "Ordena los términos por grado y suma o resta los coeficientes de los que tengan la misma parte literal.",
        },
        {
          label: "Signo menos delante",
          message: "Al restar un polinomio, se cambia el signo de **todos** sus términos.",
        },
      ],
      title: "Suma y resta de polinomios",
      blocks: [
        {
          kind: "text",
          text: "Se **agrupan los términos semejantes** y se suman o restan sus coeficientes.",
        },
        {
          kind: "example",
          lines: [
            { math: "(3x^2 + 2x - 1) + (x^2 - 5x + 4) = 4x^2 - 3x + 3" },
            { math: "(3x^2 + 2x - 1) - (x^2 - 5x + 4) = 2x^2 + 7x - 5" },
          ],
        },
        {
          kind: "warning",
          text: "En la resta, el signo menos cambia **todos** los términos del segundo paréntesis.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          titles: ["Suma", "Resta"],
          expr: [
            { tokens: ["(3x²+2x−1)", "+", "(x²−5x+4)"], note: "quitamos paréntesis: no cambian los signos." },
            { tokens: ["3x²", "+", "2x", "−", "1", "+", "x²", "−", "5x", "+", "4"], note: "agrupamos los semejantes." },
            { tokens: ["4x²", "−", "3x", "+", "3"], fresh: [0, 4], note: "$3x^2 + x^2 = 4x^2$; $2x - 5x = -3x$; $-1 + 4 = 3$." },
          ],
          expr2: [
            { tokens: ["(3x²+2x−1)", "−", "(x²−5x+4)"], note: "el signo menos cambia todos los signos del segundo." },
            { tokens: ["3x²", "+", "2x", "−", "1", "−", "x²", "+", "5x", "−", "4"], note: "agrupamos los semejantes." },
            { tokens: ["2x²", "+", "7x", "−", "5"], fresh: [0, 4], note: "$3x^2 - x^2 = 2x^2$; $2x + 5x = 7x$; $-1 - 4 = -5$." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-suma",
      type: "predict",
      help: [
        {
          label: "Agrupa por tipo",
          message: "Términos en $x^2$ con términos en $x^2$, términos en $x$ con términos en $x$ y números con números.",
        },
      ],
      title: "Suma de polinomios",
      question: "¿Cuánto vale $(5x^2 - 3x + 2) + (2x^2 + x - 7)$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$7x^2 - 2x - 5$" },
        { id: "b", label: "$7x^4 - 2x - 5$", incorrectFeedback: "Al sumar monomios semejantes la parte literal no cambia: $5x^2 + 2x^2 = 7x^2$." },
        { id: "c", label: "$7x^2 - 4x - 5$", incorrectFeedback: "$-3x + x = -2x$, no $-4x$." },
        { id: "d", label: "$3x^2 - 4x + 9$", incorrectFeedback: "Has restado en lugar de sumar." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$5x^2 + 2x^2 = 7x^2$; $-3x + x = -2x$; $2 - 7 = -5$.",
    },
    {
      id: "check-resta",
      type: "predict",
      help: [
        {
          label: "Cambia los signos",
          message: "$-(x^2 - 5x + 4) = -x^2 + 5x - 4$.",
        },
      ],
      title: "Resta de polinomios",
      question: "¿Cuánto vale $(4x^2 + 3x) - (x^2 - 2x + 1)$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$3x^2 + 5x - 1$" },
        { id: "b", label: "$3x^2 + x + 1$", incorrectFeedback: "No se cambió el signo del $-2x$ ni del $1$ del segundo polinomio." },
        { id: "c", label: "$3x^2 + 5x + 1$", incorrectFeedback: "El signo de $+1$ también debe cambiar: $-1$." },
        { id: "d", label: "$5x^2 + x - 1$", incorrectFeedback: "Has sumado $x^2$ en lugar de restarlo." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$4x^2 + 3x - x^2 + 2x - 1 = 3x^2 + 5x - 1$.",
    },
    {
      id: "check-valor",
      type: "fill_in_blank",
      help: [
        {
          label: "Sustituye con cuidado",
          message: "Con $x = -1$: $2 \\cdot (-1)^2 - 3 \\cdot (-1) + 1$. Recuerda que $(-1)^2 = 1$.",
        },
      ],
      title: "Valor numérico",
      question: "Calcula el valor de $2x^2 - 3x + 1$ para $x = -1$ (solo el número)",
      correctAnswers: ["6"],
      explanation: "$2 \\cdot 1 - 3 \\cdot (-1) + 1 = 2 + 3 + 1 = 6$.",
    },
  ],
};
