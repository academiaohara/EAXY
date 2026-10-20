import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_8_SUBTITLE } from "@/data/lessons/shared";

export const formaGeneralRecta3esoLesson: InteractiveLesson = {
  slug: "forma-general-recta-3eso",
  title: "6. Forma general de la ecuación de una recta",
  subtitle: TEMA_3ESO_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "general",
      type: "slide",
      help: [
        {
          label: "Un solo molde",
          message: "Todas las formas anteriores se pueden pasar a $ax + by = c$ moviendo términos de un miembro a otro.",
        },
        {
          label: "El caso b = 0",
          message: "Si $b = 0$ queda $ax = c$, o sea $x = \\frac{c}{a}$: una recta vertical.",
        },
      ],
      title: "ax + by = c",
      blocks: [
        {
          kind: "rule",
          text: "Cualquier ecuación de una recta puede ponerse en la **forma general**:",
          formula: "ax + by = c",
        },
        {
          kind: "example",
          lines: [
            { math: "y = 2x \\to 2x - y = 0\\quad (a = 2,\\ b = -1,\\ c = 0)" },
            { math: "y = 2x - 3 \\to 2x - y = 3" },
            { math: "y = 3 \\to 0x + y = 3" },
            { math: "y = 2 + 3(x - 5) \\to 3x - y = 13" },
          ],
        },
        {
          kind: "warning",
          text: "Si $b = 0$, la recta es vertical y **no** es la gráfica de una función. Si $b \\ne 0$ sí lo es.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "representar",
      type: "slide",
      help: [
        {
          label: "Cortes con los ejes",
          message: "Con $x = 0$ obtienes el corte con el eje $Y$ y con $y = 0$, el corte con el eje $X$.",
        },
        {
          label: "Pendiente",
          message: "Al despejar $y = -\\frac{a}{b}x + \\frac{c}{b}$, la pendiente es $-\\frac{a}{b}$.",
        },
      ],
      title: "Representar y hallar la pendiente",
      blocks: [
        {
          kind: "example",
          title: "3x + 4y = 12",
          lines: [
            { math: "x = 0 \\Rightarrow y = 3 \\quad (0, 3)" },
            { math: "y = 0 \\Rightarrow x = 4 \\quad (4, 0)" },
            { math: "y = -\\dfrac{3}{4}x + 3 \\Rightarrow m = -\\dfrac{3}{4}" },
          ],
        },
        {
          kind: "text",
          text: "Para representar una recta dada en forma general: **dos puntos** (dando valores) o **despejar $y$**.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-pasar",
      type: "predict",
      help: [
        {
          label: "Todo a un lado",
          message: "$y = 2x - 3$: pasa $2x$ al primer miembro cambiando de signo.",
        },
      ],
      title: "Forma general",
      question: "¿Cuál es la forma general $ax + by = c$ de $y = 2x - 3$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$2x - y = 3$" },
        { id: "b", label: "$2x + y = 3$", incorrectFeedback: "Al pasar $y$ y $2x$ de miembro cambian de signo: $2x - y = 3$." },
        { id: "c", label: "$-2x + y = 3$", incorrectFeedback: "Daría $y = 2x + 3$: el término independiente tendría signo contrario." },
        { id: "d", label: "$2x - y = -3$", incorrectFeedback: "$y = 2x - 3 \\Rightarrow 2x - y = 3$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$y = 2x - 3 \\Rightarrow 3 = 2x - y$, es decir, $2x - y = 3$.",
    },
    {
      id: "check-pendiente",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Despeja y",
          message: "$3x + 4y = 12 \\Rightarrow 4y = -3x + 12 \\Rightarrow y = -\\frac{3}{4}x + 3$.",
        },
      ],
      title: "Pendiente",
      question: "¿Cuál es la pendiente de la recta $3x + 4y = 12$?",
      correctAnswers: ["-3/4"],
      explanation: "$y = -\\frac{3}{4}x + 3$, así que $m = -\\frac{3}{4}$.",
    },
    {
      id: "check-cortes",
      type: "fill_in_blank",
      help: [
        {
          label: "x = 0",
          message: "Con $x = 0$: $2 \\cdot 0 + 5y = 10$.",
        },
      ],
      title: "Corte con el eje Y",
      question: "¿En qué valor $y$ corta al eje $Y$ la recta $2x + 5y = 10$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "Con $x = 0$: $5y = 10$, $y = 2$. Corta en $(0, 2)$.",
    },
  ],
};
