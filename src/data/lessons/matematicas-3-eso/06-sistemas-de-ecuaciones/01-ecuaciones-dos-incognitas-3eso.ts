import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_6_SUBTITLE } from "@/data/lessons/shared";

export const ecuacionesDosIncognitas3esoLesson: InteractiveLesson = {
  slug: "ecuaciones-dos-incognitas-3eso",
  title: "1. Ecuaciones con dos incógnitas",
  subtitle: TEMA_3ESO_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "soluciones",
      type: "slide",
      help: [
        {
          label: "Un par de valores",
          message: "Una solución no es un solo número, sino un **par**: un valor para $x$ y otro para $y$ que juntos cumplen la igualdad.",
        },
        {
          label: "Muchas soluciones",
          message: "Si eliges $x$, la ecuación fija $y$: por eso hay tantas soluciones como valores de $x$ quieras probar.",
        },
      ],
      title: "Ecuaciones lineales con dos incógnitas",
      blocks: [
        {
          kind: "definition",
          text: "Una **ecuación lineal con dos incógnitas** relaciona dos valores desconocidos, $ax + by = c$. Una **solución** es todo par $(x, y)$ que hace cierta la igualdad; tiene **infinitas** soluciones.",
        },
        {
          kind: "example",
          title: "La edad de Alba y Mario suma 50 años: x + y = 50",
          lines: [
            { math: "x = 10,\\ y = 40 \\quad\\checkmark" },
            { math: "x = 25,\\ y = 25 \\quad\\checkmark" },
            { math: "2x - 3y = 3:\\ x = 6,\\ y = 3 \\quad\\checkmark" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "grafica",
      type: "slide",
      help: [
        {
          label: "Tabla de valores",
          message: "Despeja $y$ y da valores a $x$ para obtener puntos; dos puntos bastan para trazar la recta, y un tercero sirve de comprobación.",
        },
        {
          label: "Punto = solución",
          message: "Cada punto de la recta es una solución; un punto que no esté en ella no cumple la ecuación.",
        },
      ],
      title: "Una ecuación lineal es una recta",
      blocks: [
        {
          kind: "text",
          text: "Si interpretamos cada solución como un **punto** del plano, las soluciones de la ecuación forman una **recta**.",
        },
        {
          kind: "steps",
          items: [
            "**Despeja** $y$.",
            "Da valores a $x$ y calcula los de $y$.",
            "Dibuja los puntos y traza la recta.",
          ],
        },
        {
          kind: "example",
          title: "2x − 3y = 3 → y = (2x − 3)/3",
          lines: [
            { math: "x = -3 \\to y = -3;\\quad x = 0 \\to y = -1;\\quad x = 3 \\to y = 1;\\quad x = 6 \\to y = 3" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "sistema-rectas", params: { sys: "unica" } },
    },
    {
      id: "check-solucion",
      type: "predict",
      help: [
        {
          label: "Sustituye",
          message: "Para cada par, calcula $3x - 5y$ y mira si da $10$.",
        },
      ],
      title: "¿Es solución?",
      question: "¿Cuál de estos pares es solución de $3x - 5y = 10$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$x = 0,\\ y = -2$" },
        { id: "b", label: "$x = 4,\\ y = 1$", incorrectFeedback: "$12 - 5 = 7 \\ne 10$." },
        { id: "c", label: "$x = 2,\\ y = 2$", incorrectFeedback: "$6 - 10 = -4 \\ne 10$." },
        { id: "d", label: "$x = 1,\\ y = 1$", incorrectFeedback: "$3 - 5 = -2 \\ne 10$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Con $x = 0$, $y = -2$: $0 + 10 = 10$. Otra solución es $x = 5$, $y = 1$: una ecuación lineal tiene infinitas.",
    },
    {
      id: "check-despejar",
      type: "fill_in_blank",
      help: [
        {
          label: "Despeja y",
          message: "$2x + y = 7 \\Rightarrow y = 7 - 2x$. Sustituye $x = 3$.",
        },
      ],
      title: "Hallar una solución",
      question: "En la ecuación $2x + y = 7$, si $x = 3$, ¿cuánto vale $y$? (solo el número)",
      correctAnswers: ["1"],
      explanation: "$y = 7 - 2 \\cdot 3 = 1$.",
    },
    {
      id: "check-cuantas",
      type: "predict",
      help: [
        {
          label: "Cada x da una y",
          message: "Para cada valor de $x$ existe un valor de $y$ que cumple la ecuación.",
        },
      ],
      title: "Cuántas soluciones",
      question: "¿Cuántas soluciones tiene una ecuación lineal con dos incógnitas como $x + y = 50$?",
      mode: "choice",
      choices: [
        { id: "inf", label: "Infinitas" },
        { id: "una", label: "Una sola", incorrectFeedback: "Para cada valor de $x$ hay un $y$ distinto que sirve." },
        { id: "dos", label: "Dos", incorrectFeedback: "Ya hemos visto $(10, 40)$, $(25, 25)$, $(0, 50)$..." },
      ],
      correctChoiceId: "inf",
      shuffleChoices: true,
      explanation: "Cada punto de la recta $x + y = 50$ es una solución: hay infinitas.",
    },
  ],
};
