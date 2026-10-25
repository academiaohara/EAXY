import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_3_SUBTITLE } from "@/data/lessons/shared";

export const raicesPolinomioCcss1Lesson: InteractiveLesson = {
  slug: "raices-polinomio-ccss1",
  title: "4. Raíces de un polinomio",
  subtitle: TEMA_CCSS1_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [{ label: "Raíz, cero, solución", message: "Son nombres para lo mismo: $\\alpha$ es raíz (o cero) de $P$ cuando $P(\\alpha) = 0$, y solución de la ecuación $P(x) = 0$." }],
      title: "¿Qué es una raíz?",
      blocks: [
        { kind: "definition", text: "Un número $\\alpha$ es una **raíz** (o **cero**) del polinomio $P$ si $P(\\alpha) = 0$." },
        { kind: "example", lines: [
          { math: "x^2 - 2:\\ \\text{raíces } \\pm\\sqrt{2}\\ \\text{(irracionales)}" },
          { math: "x^2 + 4:\\ \\text{no tiene raíces reales}\\ (x^2 + 4 \\geq 4 > 0)" },
          { math: "2x^2 + 3x - 2:\\ \\text{raíz } \\tfrac{1}{2}\\ \\text{(Ruffini da resto 0)}" },
        ] },
        { kind: "warning", text: "Un polinomio de grado $n$ tiene **como mucho $n$ raíces reales**, y alguna puede estar repetida." },
      ],
      arrange: "stack",
    },
    {
      id: "candidatas",
      type: "slide",
      help: [{ label: "Demostración", message: "Si $\\alpha$ entero es raíz, $a_n\\alpha^n + \\cdots + a_1\\alpha = -a_0$. El primer miembro es múltiplo de $\\alpha$, luego $\\alpha$ divide a $a_0$." }],
      title: "¿Dónde buscar las raíces enteras?",
      blocks: [
        { kind: "rule", title: "Si los coeficientes son enteros", text: "Las **raíces enteras** de $P(x) = a_n x^n + \\cdots + a_0$ son **divisores del término independiente** $a_0$." },
        { kind: "example", title: "x³ − 6x² + 11x − 6", lines: [
          { math: "\\text{Candidatas: } \\pm 1,\\ \\pm 2,\\ \\pm 3,\\ \\pm 6" },
          { math: "P(1) = 0,\\ P(2) = 0,\\ P(3) = 0 \\quad \\text{(las tres raíces)}" },
        ] },
        { kind: "text", text: "Se prueba cada candidata con la regla de Ruffini: la que da resto $0$ es raíz." },
      ],
      visual: { kind: "tool", tool: "ruffini-explorador", initial: [1, -6, 11, -6, 1], hint: "Prueba a = 1, 2, 3 y 6: ¿cuáles dan resto 0?" },
    },
    {
      id: "check-candidata",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "El término independiente de $x^3 + 2x^2 - 5x - 6$ es $-6$; sus divisores son $\\pm 1, \\pm 2, \\pm 3, \\pm 6$." }],
      title: "Candidatas",
      question: "Para $x^3 + 2x^2 - 5x - 6$, ¿cuál de estos números **no puede** ser una raíz entera?",
      choices: [
        { id: "a", label: "$4$" },
        { id: "b", label: "$-3$", incorrectFeedback: "$-3$ divide a $-6$ y de hecho $P(-3) = -27 + 18 + 15 - 6 = 0$: es raíz." },
        { id: "c", label: "$2$", incorrectFeedback: "$2$ divide a $-6$ y $P(2) = 8 + 8 - 10 - 6 = 0$: es raíz." },
        { id: "d", label: "$-1$", incorrectFeedback: "$-1$ divide a $-6$ y $P(-1) = -1 + 2 + 5 - 6 = 0$: es raíz." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$4$ no divide a $-6$, así que no puede ser raíz entera. Las raíces son $2$, $-1$ y $-3$.",
    },
    {
      id: "multiplicidad",
      type: "slide",
      help: [{ label: "Multiplicidad", message: "Una raíz tiene multiplicidad $m$ si $(x - a)^m$ divide a $P$ pero $(x - a)^{m+1}$ no. Las raíces de multiplicidad par no cambian el signo del polinomio." }],
      title: "Raíces repetidas",
      blocks: [
        { kind: "example", title: "x³ − 4x² + 5x − 2", lines: [
          { math: "= (x - 1)^2 (x - 2)" },
          { math: "x_1 = 1\\ \\text{(doble)},\\qquad x_2 = 2" },
        ] },
        { kind: "text", text: "La raíz $1$ aparece **dos veces** como factor: tiene multiplicidad $2$. Cuenta como dos raíces al contar hasta el grado." },
      ],
      visual: { kind: "tool", tool: "raices-factores-explorador", initial: [1, 1, 2, 1], hint: "Pon dos raíces iguales: la curva toca el eje sin atravesarlo." },
    },
    {
      id: "check-maximo",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Una raíz por cada factor $(x - a)$ distinto, y hay como mucho tantos como el grado." }],
      title: "Máximo de raíces",
      question: "¿Cuántas raíces reales **distintas** puede tener, como máximo, un polinomio de grado $4$? (solo el número)",
      correctAnswers: ["4"],
      explanation: "Un polinomio de grado $n$ tiene como mucho $n$ raíces reales. El caso máximo es cuando las cuatro son distintas, como $(x-1)(x-2)(x-3)(x-4)$.",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Mira los factores: cada $(x - a)$ distinto aporta una raíz; $x^2 + 1$ no se anula nunca." }],
      title: "¿Cuántas raíces reales distintas?",
      question: "Clasifica cada polinomio según su número de raíces reales distintas.",
      groups: [
        { id: "0", label: "Ninguna", tone: "amber" },
        { id: "1", label: "Una", tone: "cobalt" },
        { id: "2", label: "Dos", tone: "emerald" },
        { id: "3", label: "Tres", tone: "violet" },
      ],
      items: [
        { id: "a", text: "$x^2 + 1$", group: "0" },
        { id: "b", text: "$(x - 1)^2$", group: "1" },
        { id: "c", text: "$x^2 - 4$", group: "2" },
        { id: "d", text: "$x^3 - x$", group: "3" },
        { id: "e", text: "$x^3 + 1$", group: "1" },
        { id: "f", text: "$x^2(x - 2)$", group: "2" },
      ],
      hint: "$x^3 - x = x(x-1)(x+1)$ y $x^3 + 1 = (x+1)(x^2 - x + 1)$, donde el segundo factor no se anula.",
    },
  ],
};
