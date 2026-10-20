import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_7_SUBTITLE } from "@/data/lessons/shared";

export const ecuacionesDosIncognitas2esoLesson: InteractiveLesson = {
  slug: "ecuaciones-dos-incognitas-2eso",
  title: "1. Ecuaciones con dos incógnitas",
  subtitle: TEMA_2ESO_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "ecuacion-lineal",
      type: "slide",
      help: [
        {
          label: "Dos valores que no conoces",
          message: "Con una sola ecuación no puedes saber la edad de cada uno: hay muchas parejas de edades que suman $50$.",
        },
        {
          label: "Por qué «lineal»",
          message: "Porque las incógnitas están a la primera potencia y no se multiplican entre sí. Su gráfica es una recta.",
        },
      ],
      title: "Ecuación lineal con dos incógnitas",
      blocks: [
        {
          kind: "text",
          text: "La edad de Alba y la de Mario suman $50$ años. Llamamos $x$ a la edad de Alba e $y$ a la de Mario.",
        },
        {
          kind: "definition",
          text: "Una **ecuación lineal con dos incógnitas** expresa la relación entre dos valores desconocidos. Su forma general es $ax + by = c$.",
        },
        {
          kind: "formula",
          tex: "x + y = 50",
        },
        {
          kind: "text",
          text: "Tiene **muchas soluciones**: $x = 10, y = 40$; $x = 25, y = 25$; $x = 50, y = 0$…",
        },
      ],
      arrange: "stack",
    },
    {
      id: "soluciones",
      type: "slide",
      help: [
        {
          label: "Un par de valores",
          message: "Una solución no es un número, sino una pareja $(x, y)$: los dos valores a la vez.",
        },
        {
          label: "Despejar",
          message: "Despeja una incógnita: $y = 12 - 3x$. Da valores a $x$ y calcula $y$.",
        },
      ],
      title: "Soluciones: parejas de valores",
      blocks: [
        {
          kind: "rule",
          text: "Una **solución** es una pareja $(x, y)$ que, al sustituirla, hace **cierta la igualdad**.",
        },
        {
          kind: "example",
          title: "3x + y = 12",
          lines: [
            { math: "(1, 9): \\ 3 \\cdot 1 + 9 = 12", note: "solución" },
            { math: "(4, 1): \\ 3 \\cdot 4 + 1 = 13 \\ne 12", note: "no es solución" },
          ],
        },
        {
          kind: "text",
          text: "Para **encontrar soluciones**, se despeja una incógnita ($y = 12 - 3x$) y se dan valores a la otra.",
        },
        {
          kind: "facts",
          items: [
            { tex: "x = 0 \\to y = 12" },
            { tex: "x = 1 \\to y = 9" },
            { tex: "x = 2 \\to y = 6" },
            { tex: "x = 3 \\to y = 3" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "grafica-recta",
      type: "interactive_tool",
      help: [
        {
          label: "Cada punto, una solución",
          message: "Cada punto de la recta es una pareja $(x, y)$ que cumple la ecuación.",
        },
        {
          label: "Con dos puntos basta",
          message: "Dos puntos determinan una recta: calcula dos soluciones, márcalas y únelas.",
        },
      ],
      title: "La recta asociada",
      tool: "system-graph",
      content: [
        "Cada ecuación lineal tiene una **recta** asociada en el plano. **Cada punto de la recta** es una solución de la ecuación.",
      ],
      graph: {
        lines: [{ id: "r", label: "$3x + y = 12$", form: "standard", a: 3, b: 1, c: 12, color: "#2f5fe0" }],
        highlightPoints: [
          { x: 1, y: 9, label: "(1, 9)" },
          { x: 2, y: 6, label: "(2, 6)" },
          { x: 3, y: 3, label: "(3, 3)" },
        ],
        xMin: -1,
        xMax: 6,
        yMin: -2,
        yMax: 14,
      },
    },
    {
      id: "check-solucion",
      type: "predict",
      help: [
        {
          label: "Sustituye",
          message: "Prueba cada pareja en $2x + y = 7$: debe salir $7$.",
        },
      ],
      title: "¿Cuál es solución?",
      question: "¿Cuál de estas parejas es solución de $2x + y = 7$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$(2, 3)$" },
        { id: "b", label: "$(3, 2)$", incorrectFeedback: "$2 \\cdot 3 + 2 = 8 \\ne 7$." },
        { id: "c", label: "$(1, 4)$", incorrectFeedback: "$2 \\cdot 1 + 4 = 6 \\ne 7$." },
        { id: "d", label: "$(4, 1)$", incorrectFeedback: "$2 \\cdot 4 + 1 = 9 \\ne 7$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$2 \\cdot 2 + 3 = 7$: la pareja $(x, y) = (2, 3)$ cumple la ecuación. Ojo: el orden importa, $(3, 2)$ no es solución.",
    },
    {
      id: "check-tabla",
      type: "fill_in_blank",
      help: [
        {
          label: "Sustituye $x$",
          message: "$2x + 3y = 12$ con $x = 3$: $6 + 3y = 12$.",
        },
      ],
      title: "Completar una solución",
      question: "En la ecuación $2x + 3y = 12$, si $x = 3$, ¿cuánto vale $y$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$2 \\cdot 3 + 3y = 12 \\Rightarrow 3y = 6 \\Rightarrow y = 2$.",
    },
    {
      id: "check-forma",
      type: "predict",
      help: [
        {
          label: "Despeja la $y$",
          message: "En $3x + y = 12$ la $y$ no tiene coeficiente: pasa el $3x$ restando.",
        },
      ],
      title: "Despejar una incógnita",
      question: "Si $3x + y = 12$, ¿cuánto vale $y$ en función de $x$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$y = 12 - 3x$" },
        { id: "b", label: "$y = 12 + 3x$", incorrectFeedback: "Lo que suma pasa restando al otro miembro." },
        { id: "c", label: "$y = \\dfrac{12}{3x}$", incorrectFeedback: "El $3x$ está sumando, no multiplicando a la $y$." },
        { id: "d", label: "$y = 4x$", incorrectFeedback: "Has dividido $12$ entre $3$ y has olvidado que el $3x$ resta." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$3x + y = 12 \\Rightarrow y = 12 - 3x$.",
    },
  ],
};
