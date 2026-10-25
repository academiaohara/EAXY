import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_3_SUBTITLE } from "@/data/lessons/shared";

export const inecuacionesPrimerGradoCcss1Lesson: InteractiveLesson = {
  slug: "inecuaciones-primer-grado-ccss1",
  title: "9. Inecuaciones de primer grado y su gráfica",
  subtitle: TEMA_CCSS1_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "resolver",
      type: "slide",
      help: [{ label: "Comprobar", message: "Prueba un valor de la solución y uno de fuera: $x = 5$ cumple $25 - 3 \\geq 10 + 9$ ($22 \\geq 19$) y $x = 0$ no ($-3 \\geq 9$ es falso)." }],
      title: "Resolver y escribir la solución",
      blocks: [
        { kind: "example", title: "5x − 3 ≥ 2x + 9", lines: [
          { math: "5x - 2x \\geq 9 + 3" },
          { math: "3x \\geq 12 \\Rightarrow x \\geq 4" },
          { math: "x \\in [4, +\\infty)" },
        ] },
        { kind: "text", text: "Se aplican las mismas transformaciones que en una ecuación, **invirtiendo el sentido** al multiplicar o dividir por un número negativo." },
      ],
      visual: { kind: "tool", tool: "inecuacion-explorador", initial: [-2, 1, 7, 2], hint: "Pon a negativo y comprueba que el sentido se invierte." },
    },
    {
      id: "grafica",
      type: "slide",
      help: [{ label: "Idea gráfica", message: "$ax + b > 0$ pregunta dónde la recta $y = ax + b$ está por encima del eje horizontal. El corte con el eje, $x = -\\frac{b}{a}$, separa las zonas." }],
      title: "Interpretación gráfica",
      blocks: [
        { kind: "text", text: "Resolver $ax + b > 0$ equivale a preguntar **para qué valores de $x$ la recta $y = ax + b$ queda por encima del eje horizontal**." },
        { kind: "example", title: "2x − 6 > 0", lines: [
          { math: "\\text{La recta } y = 2x - 6 \\text{ corta al eje en } x = 3" },
          { math: "\\text{Está por encima del eje para } x > 3 \\Rightarrow (3, +\\infty)" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-resolver",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Dividir entre $-3$ invierte el sentido." }],
      title: "Coeficiente negativo",
      question: "Resuelve $-3x + 6 < 0$.",
      choices: [
        { id: "a", label: "$x > 2$" },
        { id: "b", label: "$x < 2$", incorrectFeedback: "Has dividido entre $-3$ sin invertir el sentido." },
        { id: "c", label: "$x > -2$", incorrectFeedback: "$-3x < -6 \\Rightarrow x > 2$; el signo del $2$ se mantiene." },
        { id: "d", label: "$x < -2$", incorrectFeedback: "Ni el valor ni el sentido son correctos." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$-3x < -6$; al dividir entre $-3$ el sentido se invierte: $x > 2$.",
    },
    {
      id: "sistema",
      type: "slide",
      help: [{ label: "Intersección", message: "«Y» significa que se cumplan **las dos**: la solución es la intersección de las soluciones." }],
      title: "Sistemas de inecuaciones con una incógnita",
      blocks: [
        { kind: "steps", items: [
          "Se resuelve cada inecuación por separado.",
          "Se representan las dos soluciones en la recta.",
          "La solución del sistema es la **intersección**: lo que cumple ambas.",
        ] },
        { kind: "example", title: "2x − 1 > 3  y  x + 4 ≤ 9", lines: [
          { math: "2x > 4 \\Rightarrow x > 2\\qquad x \\leq 5" },
          { math: "x \\in (2, +\\infty) \\cap (-\\infty, 5] = (2, 5]" },
        ] },
      ],
      visual: { kind: "tool", tool: "sistema-inecuaciones-explorador", initial: [5, 1, 2, 2], hint: "Cambia los valores para que no se solapen: ¿qué pasa con la solución?" },
    },
    {
      id: "check-enteros",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Enteros mayores que $2$ y menores o iguales que $5$: $3, 4, 5$." }],
      title: "Soluciones enteras",
      question: "¿Cuántos números **enteros** cumplen $2 < x \\leq 5$? (solo el número)",
      correctAnswers: ["3"],
      explanation: "Son $3$, $4$ y $5$: el $2$ no entra (desigualdad estricta) y el $5$ sí.",
    },
    {
      id: "check-vacio",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "¿Hay algún número mayor que $7$ y menor que $3$ a la vez?" }],
      title: "Sin solución",
      question: "¿Cuál es la solución del sistema $x > 7$ y $x < 3$?",
      choices: [
        { id: "a", label: "No tiene solución (conjunto vacío)" },
        { id: "b", label: "$(3, 7)$", incorrectFeedback: "Esos números son mayores que $3$, no menores." },
        { id: "c", label: "$(-\\infty, 3) \\cup (7, +\\infty)$", incorrectFeedback: "Eso sería «una **o** la otra». Con «y» deben cumplirse las dos a la vez." },
        { id: "d", label: "Todos los números reales", incorrectFeedback: "Ningún número cumple las dos condiciones a la vez." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(7, +\\infty) \\cap (-\\infty, 3) = \\emptyset$: los intervalos no se solapan.",
    },
  ],
};
