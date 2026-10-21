import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_8_SUBTITLE } from "@/data/lessons/shared";

export const rectaPuntoPendiente3esoLesson: InteractiveLesson = {
  slug: "recta-punto-pendiente-3eso",
  title: "4. Recta conociendo un punto y la pendiente",
  subtitle: TEMA_3ESO_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "formula",
      type: "slide",
      help: [
        {
          label: "De dónde sale",
          message: "Desde el punto $(x_0, y_0)$, avanzar $x - x_0$ hacia la derecha supone subir $m(x - x_0)$: eso da $y = y_0 + m(x - x_0)$.",
        },
        {
          label: "Para qué",
          message: "Basta un punto y la pendiente para fijar la recta: sin $n$, sin tabla de valores.",
        },
      ],
      title: "Ecuación punto-pendiente",
      blocks: [
        {
          kind: "rule",
          text: "Si una recta pasa por $(x_0, y_0)$ y tiene pendiente $m$:",
          formula: "y = y_0 + m(x - x_0)",
        },
        {
          kind: "example",
          title: "Recta por (4, 3) con pendiente 2",
          lines: [
            { math: "y = 3 + 2(x - 4)" },
            { math: "y = 3 + 2x - 8 \\Rightarrow y = 2x - 5" },
          ],
        },
        {
          kind: "warning",
          text: "Es $x - x_0$ con el signo cambiado: para $x_0 = -2$ queda $(x + 2)$.",
        },
      ],
      visual: { kind: "anim", scene: "recta-pendiente", params: { a: 2, b: -5 } },
    },
    {
      id: "ejemplos",
      type: "slide",
      help: [
        {
          label: "Fracciones",
          message: "Con pendiente fraccionaria, reparte el factor al abrir el paréntesis: $-\\frac{2}{3}(x + 2) = -\\frac{2}{3}x - \\frac{4}{3}$.",
        },
        {
          label: "Desde la gráfica",
          message: "Lee un punto de la recta y calcula la pendiente contando cuánto sube por cada cuánto avanza.",
        },
      ],
      title: "Más ejemplos",
      blocks: [
        {
          kind: "example",
          lines: [
            { math: "P(3, 7),\\ m = 4:\\quad y = 7 + 4(x - 3) = 4x - 5" },
            { math: "P(-2, 5),\\ m = -\\tfrac{2}{3}:\\quad y = 5 - \\tfrac{2}{3}(x + 2) = -\\tfrac{2}{3}x + \\tfrac{11}{3}" },
            { math: "P(4, -1),\\ m = 1{,}2:\\quad y = -1 + 1{,}2(x - 4) = 1{,}2x - 5{,}8" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-ecuacion",
      type: "fill_in_blank",
      help: [
        {
          label: "Sustituye",
          message: "$y = 7 + 4(x - 3)$. Abre el paréntesis: $7 + 4x - 12$.",
        },
      ],
      title: "Ecuación explícita",
      question: "Escribe, en la forma y=mx+n, la recta que pasa por $(3, 7)$ y tiene pendiente $4$.",
      correctAnswers: ["y=4x-5"],
      explanation: "$y = 7 + 4(x - 3) = 4x - 5$.",
    },
    {
      id: "check-negativa",
      type: "fill_in_blank",
      help: [
        {
          label: "x₀ = 1",
          message: "$y = -1 + (-2)(x - 1)$. Abre el paréntesis y reduce.",
        },
      ],
      title: "Pendiente negativa",
      question: "Escribe, en la forma y=mx+n, la recta que pasa por $(1, -1)$ con pendiente $-2$.",
      correctAnswers: ["y=-2x+1"],
      explanation: "$y = -1 - 2(x - 1) = -1 - 2x + 2 = -2x + 1$.",
    },
    {
      id: "check-forma",
      type: "predict",
      help: [
        {
          label: "Mira el signo de x₀",
          message: "Con $x_0 = -3$ aparece $x - (-3) = x + 3$.",
        },
      ],
      title: "Elegir la ecuación",
      question: "¿Cuál es la ecuación punto-pendiente de la recta que pasa por $(-3, 1)$ y tiene pendiente $\\frac{5}{4}$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$y = 1 + \\frac{5}{4}(x + 3)$" },
        { id: "b", label: "$y = 1 + \\frac{5}{4}(x - 3)$", incorrectFeedback: "Con $x_0 = -3$ hay que restar $-3$: $x + 3$." },
        { id: "c", label: "$y = -3 + \\frac{5}{4}(x - 1)$", incorrectFeedback: "Se han intercambiado $x_0$ e $y_0$." },
        { id: "d", label: "$y = \\frac{5}{4} + (x + 3)$", incorrectFeedback: "La pendiente multiplica a $(x - x_0)$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$y = y_0 + m(x - x_0)$ con $(x_0, y_0) = (-3, 1)$.",
    },
  ],
};
