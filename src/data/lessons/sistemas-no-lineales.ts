import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_7_SUBTITLE } from "@/data/lessons/shared";

export const sistemasNoLinealesLesson: InteractiveLesson = {
  slug: "sistemas-no-lineales",
  title: "4. Sistemas no lineales",
  subtitle: TEMA_7_SUBTITLE,
  steps: [
    {
      id: "intro",
      type: "concept",
      title: "¿Qué es un sistema no lineal?",
      content: [
        "Un sistema es **no lineal** cuando al menos una ecuación no es de primer grado: contiene $x^2$, $y^2$, $x \\cdot y$, raíces o incógnitas en el denominador.",
        "Se resuelven con los mismos métodos (sustitución, reducción…), pero hay que **comprobar** las soluciones al final.",
      ],
      warning:
        "Si hay raíces o incógnitas en el denominador, pueden aparecer soluciones falsas. ¡Comprueba siempre en el sistema original!",
    },
    {
      id: "ejemplo-animado",
      type: "animated_solution",
      title: "Ejemplo resuelto del libro",
      content: [
        "Resolvemos el sistema del ejercicio resuelto. Avanza paso a paso:",
      ],
      math: ["\\begin{cases} y - x = 1 \\\\ x^2 + y^2 = 5 \\end{cases}"],
      frames: [
        {
          caption: "Despejamos $y$ en la ecuación lineal:",
          math: "y = 1 + x",
        },
        {
          caption: "Sustituimos en la ecuación no lineal:",
          math: "x^2 + (1 + x)^2 = 5",
        },
        {
          caption: "Desarrollamos y simplificamos:",
          math: "x^2 + 1 + 2x + x^2 = 5 \\implies 2x^2 + 2x - 4 = 0",
        },
        {
          caption: "Dividimos entre 2:",
          math: "x^2 + x - 2 = 0",
        },
        {
          caption: "Resolvemos la ecuación de 2.º grado:",
          math: "x_1 = 1,\\quad x_2 = -2",
        },
        {
          caption: "Hallamos $y$ con $y = 1 + x$:",
          math: "y_1 = 2,\\quad y_2 = -1",
        },
        {
          caption: "Soluciones del sistema:",
          math: "(1, 2) \\quad\\text{y}\\quad (-2, -1)",
        },
      ],
    },
    {
      id: "grafica-parcial",
      type: "interactive_tool",
      title: "La parte lineal del sistema",
      tool: "system-graph",
      content: [
        "La ecuación $y - x = 1$ es una recta. Las soluciones del sistema deben estar sobre ella. La segunda ecuación ($x^2 + y^2 = 5$) sería una circunferencia; aquí ves la recta donde buscamos los puntos de corte.",
      ],
      graph: {
        lines: [
          { id: "r1", label: "$y - x = 1$", form: "standard", a: -1, b: 1, c: 1, color: "#2f5fe0" },
        ],
        highlightPoints: [
          { x: 1, y: 2, label: "(1, 2)" },
          { x: -2, y: -1, label: "(-2, -1)" },
        ],
        xMin: -4,
        xMax: 3,
        yMin: -3,
        yMax: 4,
      },
    },
    {
      id: "check-tipo",
      type: "multiple_choice",
      title: "Comprueba lo aprendido",
      question: "¿Cuál de los siguientes sistemas es NO lineal?",
      options: [
        { id: "a", text: "$y - x = 1$ / $2x + y = 3$" },
        { id: "b", text: "$y - x = 1$ / $x^2 + y^2 = 5$" },
        { id: "c", text: "$3x + 2y = 0$ / $x - y = 4$" },
      ],
      correctOptionId: "b",
      explanation: "El sistema B contiene $x^2 + y^2 = 5$, una ecuación de segundo grado.",
    },
    {
      id: "despejar",
      type: "fill_in_blank",
      title: "Practica — Despejar",
      question: "Si despejamos $y$ en $y - x = 1$, obtenemos: $y =$",
      correctAnswers: ["1 + x", "x + 1", "1+x", "x+1"],
      hint: "Suma $x$ a ambos lados.",
      explanation: "$y = 1 + x$.",
    },
    {
      id: "soluciones",
      type: "multiple_choice",
      title: "Practica — Soluciones completas",
      question: "¿Cuáles son los pares $(x, y)$ del sistema $\\begin{cases} y - x = 1 \\\\ x^2 + y^2 = 5 \\end{cases}$?",
      options: [
        { id: "a", text: "$(1, 2)$ y $(-2, -1)$" },
        { id: "b", text: "$(2, 1)$ y $(-1, -2)$" },
      ],
      correctOptionId: "a",
      explanation: "Son las soluciones del ejemplo resuelto. Comprueba sustituyendo en ambas ecuaciones.",
    },
  ],
};
