import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_2_SUBTITLE } from "@/data/lessons/shared";

export const factorizacion1bachLesson: InteractiveLesson = {
  slug: "factorizacion-1bach",
  title: "5. Factorización de polinomios",
  subtitle: TEMA_1BACH_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "idea",
      type: "slide",
      help: [{ label: "Para qué", message: "Un polinomio factorizado deja ver de golpe sus raíces y su signo, y permite simplificar fracciones y resolver ecuaciones." }],
      title: "Descomponer en factores",
      blocks: [
        { kind: "rule", title: "Si las raíces son x₁, …, xₙ", formula: "P(x) = a_n\\,(x - x_1)(x - x_2)\\cdots(x - x_n)" },
        { kind: "steps", title: "Cómo se hace", items: [
          "Sacar **factor común** si lo hay y reconocer **identidades notables**.",
          "Buscar raíces enteras entre los divisores del término independiente (Ruffini).",
          "Cada raíz $a$ da un factor $(x - a)$; se repite con el cociente.",
          "Si queda un trinomio de segundo grado, se resuelve la ecuación.",
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "ejemplo",
      type: "slide",
      help: [{ label: "Comprobar", message: "$(x-1)^2(x-2) = (x^2-2x+1)(x-2) = x^3 - 4x^2 + 5x - 2$ ✓." }],
      title: "x³ − 4x² + 5x − 2",
      blocks: [
        { kind: "steps", items: [
          "Candidatas: divisores de $-2$, es decir, $\\pm 1, \\pm 2$.",
          "Ruffini con $1$: resto $0$, cociente $x^2 - 3x + 2$.",
          "$x^2 - 3x + 2 = 0 \\Rightarrow x = 1$ y $x = 2$.",
        ] },
        { kind: "formula", tex: "x^3 - 4x^2 + 5x - 2 = (x - 1)^2 (x - 2)" },
      ],
      visual: { kind: "anim", scene: "ruffini-tabla", params: { p: [1, -4, 5, -2], a: 1 } },
    },
    {
      id: "check-notable",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Saca factor común y después aplica la diferencia de cuadrados." }],
      title: "Factor común e identidades",
      question: "¿Cuál es la factorización completa de $x^3 - x$?",
      choices: [
        { id: "a", label: "$x(x - 1)(x + 1)$" },
        { id: "b", label: "$x(x - 1)^2$", incorrectFeedback: "$x^2 - 1$ es una **diferencia de cuadrados**: $(x-1)(x+1)$, no $(x-1)^2$." },
        { id: "c", label: "$(x - 1)(x^2 + x)$", incorrectFeedback: "Está bien pero no es completa: $x^2 + x = x(x+1)$ todavía se factoriza." },
        { id: "d", label: "$x^2(x - 1)$", incorrectFeedback: "Al desarrollar da $x^3 - x^2$, que no es el polinomio." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$x^3 - x = x(x^2 - 1) = x(x - 1)(x + 1)$.",
    },
    {
      id: "tres-raices",
      type: "slide",
      help: [{ label: "Dos veces Ruffini", message: "Tras la primera raíz queda un cociente de grado 2; la segunda raíz deja uno de grado 1 que ya es un factor." }],
      title: "Tres raíces distintas",
      blocks: [
        { kind: "example", title: "x³ − 6x² + 11x − 6", lines: [
          { math: "\\text{Ruffini con } 1 \\to x^2 - 5x + 6" },
          { math: "x^2 - 5x + 6 = (x - 2)(x - 3)" },
          { math: "x^3 - 6x^2 + 11x - 6 = (x-1)(x-2)(x-3)" },
        ] },
      ],
      visual: { kind: "tool", tool: "raices-factores-explorador", initial: [1, 2, 3, 1], hint: "Activa los tres factores y mira cómo cada raíz es un corte con el eje." },
    },
    {
      id: "check-suma",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Las raíces de $(x - 2)(x + 3)(x - 5)$ son $2$, $-3$ y $5$." }],
      title: "Raíces de un producto",
      question: "¿Cuánto suman las raíces de $(x - 2)(x + 3)(x - 5)$? (solo el número)",
      correctAnswers: ["4"],
      explanation: "Las raíces son $2$, $-3$ y $5$, que suman $2 - 3 + 5 = 4$.",
    },
    {
      id: "irreducible",
      type: "slide",
      help: [{ label: "Irreducible en ℝ", message: "En los números complejos todo polinomio se factoriza hasta grado 1: $x^2 + 4 = (x - 2i)(x + 2i)$. Con coeficientes reales, los irreducibles son de grado 1 o de grado 2 sin raíces reales." }],
      title: "Reducible o irreducible",
      blocks: [
        { kind: "definition", text: "Un polinomio es **irreducible** si no se puede escribir como producto de polinomios de menor grado. Un polinomio de grado $2$ es irreducible (en $\\mathbb{R}$) si $\\Delta = b^2 - 4ac < 0$." },
        { kind: "example", lines: [
          { math: "x^2 + 4\\ \\text{es irreducible}\\ (\\Delta = -16)" },
          { math: "x^4 - 16 = (x - 2)(x + 2)(x^2 + 4)" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-x4",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Diferencia de cuadrados dos veces: $x^4 - 16 = (x^2)^2 - 4^2$." }],
      title: "x⁴ − 16",
      question: "¿Cuál es la factorización completa de $x^4 - 16$ con coeficientes reales?",
      choices: [
        { id: "a", label: "$(x - 2)(x + 2)(x^2 + 4)$" },
        { id: "b", label: "$(x - 2)^2 (x + 2)^2$", incorrectFeedback: "Al desarrollar da $(x^2 - 4)^2 = x^4 - 8x^2 + 16$." },
        { id: "c", label: "$(x^2 - 4)(x^2 + 4)$", incorrectFeedback: "Es correcta pero incompleta: $x^2 - 4 = (x-2)(x+2)$." },
        { id: "d", label: "$(x - 4)(x + 4)(x^2 + 1)$", incorrectFeedback: "$x^4 - 16 = (x^2)^2 - 4^2$, no $x^2 \\cdot x^2 - 4\\cdot 4$ con esos factores." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$x^4 - 16 = (x^2 - 4)(x^2 + 4) = (x-2)(x+2)(x^2+4)$, y $x^2 + 4$ no tiene raíces reales.",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Calcula el discriminante $\\Delta = b^2 - 4ac$: si es negativo, es irreducible." }],
      title: "¿Se puede factorizar?",
      question: "Clasifica estos polinomios de segundo grado en $\\mathbb{R}$.",
      groups: [
        { id: "red", label: "Reducible", tone: "emerald" },
        { id: "irr", label: "Irreducible", tone: "amber" },
      ],
      items: [
        { id: "a", text: "$x^2 - 9$", group: "red" },
        { id: "b", text: "$x^2 + 9$", group: "irr" },
        { id: "c", text: "$x^2 - x - 6$", group: "red" },
        { id: "d", text: "$x^2 + x + 1$", group: "irr" },
        { id: "e", text: "$x^2 - 2x + 1$", group: "red" },
        { id: "f", text: "$x^2 + 2x + 5$", group: "irr" },
      ],
      hint: "$x^2 + x + 1$ tiene $\\Delta = -3$ y $x^2 + 2x + 5$ tiene $\\Delta = -16$.",
    },
  ],
};
