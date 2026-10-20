import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_3_SUBTITLE } from "@/data/lessons/shared";

export const sucesiones3esoLesson: InteractiveLesson = {
  slug: "sucesiones-3eso",
  title: "1. Sucesiones y término general",
  subtitle: TEMA_3ESO_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "concepto",
      type: "slide",
      help: [
        {
          label: "Busca el criterio",
          message: "Mira cómo se pasa de un término al siguiente: ¿se suma, se multiplica, se usan los anteriores?",
        },
        {
          label: "Un caso",
          message: "En $2, 4, 8, 16, \\dots$ cada término es el doble del anterior.",
        },
      ],
      title: "Qué es una sucesión",
      blocks: [
        {
          kind: "definition",
          text: "Una **sucesión** es un conjunto de números dados **ordenadamente**, de modo que se puedan numerar: primero, segundo, tercero… Cada número es un **término** y se escribe con subíndice: $s_1, s_2, s_3, \\dots$",
        },
        {
          kind: "example",
          title: "Cada una sigue su criterio",
          lines: [
            { math: "1, 5, 9, 13, 17, \\dots", note: "se suma 4" },
            { math: "170, 120, 70, 20, -30, \\dots", note: "se resta 50" },
            { math: "2, 4, 8, 16, 32, \\dots", note: "se multiplica por 2" },
            { math: "1, -3, 9, -27, 81, \\dots", note: "se multiplica por −3" },
            { math: "1, 4, 9, 16, 25, \\dots", note: "cuadrado de la posición" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "termino-general",
      type: "slide",
      help: [
        {
          label: "Una fórmula con n",
          message: "El término general permite calcular cualquier término sin conocer los anteriores: basta dar a $n$ el lugar que ocupa.",
        },
        {
          label: "Cómo encontrarlo",
          message: "En $1, 5, 9, 13, \\dots$ se suma $4$ cada vez, así que aparece $4n$. Falta ajustar: $4 \\cdot 1 = 4$ y el primer término es $1$, así que se resta $3$.",
        },
      ],
      title: "Término general",
      blocks: [
        {
          kind: "rule",
          text: "El **término general** $a_n$ es la expresión que da un término cualquiera a partir de su lugar $n$.",
          formula: "1, 5, 9, 13, 17, \\dots \\quad\\Rightarrow\\quad a_n = 4n - 3",
        },
        {
          kind: "example",
          lines: [
            { math: "a_1 = 4 \\cdot 1 - 3 = 1,\\quad a_2 = 5,\\quad a_3 = 9" },
            { math: "a_{100} = 4 \\cdot 100 - 3 = 397" },
          ],
        },
      ],
      visual: { kind: "tool", tool: "valor-numerico", params: { a: 4, b: -3, n: 3 }, hint: "Mueve $n$ y mira cómo se obtiene cada término con $4n - 3$." },
    },
    {
      id: "recurrente",
      type: "slide",
      help: [
        {
          label: "Necesitas los anteriores",
          message: "En una sucesión recurrente no puedes saltar al término $100$ sin haber calculado los anteriores.",
        },
        {
          label: "Los dos primeros",
          message: "Una sucesión recurrente también necesita decir con qué términos empieza: en Fibonacci, $1$ y $1$.",
        },
      ],
      title: "Sucesiones recurrentes",
      blocks: [
        {
          kind: "text",
          text: "Algunas sucesiones no tienen una fórmula sencilla en $n$: cada término se obtiene **operando con los anteriores**. Se dice que están dadas en forma **recurrente**.",
        },
        {
          kind: "example",
          title: "Sucesión de Fibonacci",
          lines: [
            { math: "1, 1, 2, 3, 5, 8, 13, 21, \\dots" },
            { math: "f_n = f_{n-1} + f_{n-2}", note: "cada término es la suma de los dos anteriores" },
          ],
        },
        {
          kind: "example",
          title: "Otra recurrente",
          lines: [
            { math: "a_1 = 1,\\quad a_n = 2a_{n-1} + 3" },
            { math: "1, 5, 13, 29, 61, \\dots" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-siguiente",
      type: "predict",
      help: [
        {
          label: "Diferencias",
          message: "Resta cada término al siguiente: $12-7$, $17-12$, $22-17$.",
        },
      ],
      title: "Siguiente término",
      question: "En la sucesión $7, 12, 17, 22, \\dots$, ¿qué término viene después?",
      mode: "choice",
      choices: [
        { id: "a", label: "$27$" },
        { id: "b", label: "$26$", incorrectFeedback: "Se suma $5$ en cada paso: $22 + 5 = 27$." },
        { id: "c", label: "$44$", incorrectFeedback: "No se multiplica por $2$: las diferencias son siempre $5$." },
        { id: "d", label: "$32$", incorrectFeedback: "Se ha sumado $10$; el paso es de $5$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Cada término es el anterior más $5$: $22 + 5 = 27$.",
    },
    {
      id: "check-termino",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Sustituye n",
          message: "Para $a_{10}$ pon $n = 10$ en la fórmula.",
        },
      ],
      title: "Valor de un término",
      question: "Calcula el décimo término de la sucesión de término general $a_n = 7n - 10$ (solo el número).",
      correctAnswers: ["60"],
      explanation: "$a_{10} = 7 \\cdot 10 - 10 = 60$.",
    },
    {
      id: "check-general",
      type: "predict",
      help: [
        {
          label: "Prueba con n = 1",
          message: "Comprueba cada fórmula con $n = 1$ y $n = 2$: deben dar $3$ y $9$.",
        },
      ],
      title: "Encontrar el término general",
      question: "¿Cuál es el término general de la sucesión $3, 9, 27, 81, \\dots$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$a_n = 3^n$" },
        { id: "b", label: "$a_n = 3n$", incorrectFeedback: "Daría $3, 6, 9, 12, \\dots$." },
        { id: "c", label: "$a_n = n^3$", incorrectFeedback: "Daría $1, 8, 27, 64, \\dots$." },
        { id: "d", label: "$a_n = 6n - 3$", incorrectFeedback: "Daría $3, 9, 15, 21, \\dots$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Cada término se multiplica por $3$: $a_1 = 3^1$, $a_2 = 3^2$, $a_3 = 3^3$…",
    },
    {
      id: "check-recurrente",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Aplica la regla",
          message: "$a_2 = 2 \\cdot a_1 + 3$, después $a_3 = 2 \\cdot a_2 + 3$, y así hasta $a_4$.",
        },
      ],
      title: "Una sucesión recurrente",
      question: "Una sucesión cumple $a_1 = 5$ y $a_n = 2a_{n-1} + 3$. Calcula $a_4$ (solo el número).",
      correctAnswers: ["61"],
      explanation: "$a_2 = 13$, $a_3 = 29$, $a_4 = 61$.",
    },
  ],
};
