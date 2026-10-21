import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_7_SUBTITLE } from "@/data/lessons/shared";

export const expresionAnalitica3esoLesson: InteractiveLesson = {
  slug: "expresion-analitica-3eso",
  title: "5. Expresión analítica de una función",
  subtitle: TEMA_3ESO_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "formula",
      type: "slide",
      help: [
        {
          label: "Una fórmula exacta",
          message: "La gráfica o el enunciado dan una idea aproximada; la fórmula relaciona las variables **exactamente**.",
        },
        {
          label: "Restricciones",
          message: "A veces la fórmula solo vale en un intervalo: aquí la base debe estar entre $0$ y $40$ para que exista el rectángulo.",
        },
      ],
      title: "De la tabla a la fórmula",
      blocks: [
        {
          kind: "text",
          text: "Con un hilo de **80 cm** unido por sus extremos formamos rectángulos distintos. Si la base mide $x$, la altura depende de ella:",
        },
        {
          kind: "example",
          lines: [
            { math: "x = 10 \\to y = 30;\\quad x = 15 \\to y = 25;\\quad x = 20 \\to y = 20;\\quad x = 35 \\to y = 5" },
            { math: "\\text{El semiperímetro es } 40:\\quad y = 40 - x,\\ 0 < x < 40" },
          ],
        },
        {
          kind: "definition",
          text: "La **expresión analítica** de una función es una ecuación que relaciona **algebraicamente** las dos variables.",
        },
      ],
      visual: { kind: "anim", scene: "tabla-formula", params: { a: -1, b: 40, c: 5, d: 5 } },
    },
    {
      id: "usos",
      type: "slide",
      help: [
        {
          label: "Sustituir",
          message: "Para calcular $y$ para un $x$ dado, sustituye en la fórmula y opera.",
        },
        {
          label: "Despejar",
          message: "Para saber qué $x$ da un $y$ concreto, iguala la fórmula a ese valor y resuelve la ecuación.",
        },
      ],
      title: "Qué se puede hacer con una fórmula",
      blocks: [
        {
          kind: "steps",
          items: [
            "**Calcular** $y$ sustituyendo un valor de $x$.",
            "**Hallar** el valor de $x$ para un $y$ dado resolviendo la ecuación.",
            "**Construir** una tabla de valores y representarla.",
          ],
        },
        {
          kind: "example",
          title: "y = 40 − x",
          lines: [
            { math: "x = 30 \\Rightarrow y = 10" },
            { math: "y = 25 \\Rightarrow 40 - x = 25 \\Rightarrow x = 15" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-calcular",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Sustituye",
          message: "$y = 40 - x$ con $x = 12$.",
        },
      ],
      title: "Calcular con la fórmula",
      question: "Con la fórmula $y = 40 - x$, ¿qué altura tiene el rectángulo de base $x = 12$ cm? (solo el número)",
      correctAnswers: ["28"],
      explanation: "$y = 40 - 12 = 28$ cm.",
    },
    {
      id: "check-despejar",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Ecuación",
          message: "Plantea $40 - x = 18$ y despeja $x$.",
        },
      ],
      title: "Hallar x",
      question: "Con $y = 40 - x$, ¿qué base corresponde a una altura de $18$ cm? (solo el número)",
      correctAnswers: ["22"],
      explanation: "$40 - x = 18 \\Rightarrow x = 22$ cm.",
    },
    {
      id: "check-formula",
      type: "predict",
      help: [
        {
          label: "Área constante",
          message: "El área es base por altura: $x \\cdot y = 12$. Despeja $y$.",
        },
      ],
      title: "Elegir la fórmula",
      question: "Queremos rectángulos de área $12$ m². Si la base es $x$ y la altura es $y$, ¿qué fórmula relaciona las variables?",
      mode: "choice",
      choices: [
        { id: "a", label: "$y = \\dfrac{12}{x}$" },
        { id: "b", label: "$y = 12x$", incorrectFeedback: "Con $x = 6$ daría $y = 72$, y el área sería $432$." },
        { id: "c", label: "$y = \\dfrac{x}{12}$", incorrectFeedback: "Con $x = 6$ daría $y = 0{,}5$, y el área sería $3$." },
        { id: "d", label: "$y = 12 - x$", incorrectFeedback: "Esa es una relación de suma, no de producto." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$x \\cdot y = 12 \\Rightarrow y = \\frac{12}{x}$. Con $x = 6$ da $y = 2$.",
    },
  ],
};
