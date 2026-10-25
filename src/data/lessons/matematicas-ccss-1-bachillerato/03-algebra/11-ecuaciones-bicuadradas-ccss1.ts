import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_3_SUBTITLE } from "@/data/lessons/shared";

export const ecuacionesBicuadradasCcss1Lesson: InteractiveLesson = {
  slug: "ecuaciones-bicuadradas-ccss1",
  title: "11. Ecuaciones bicuadradas y factorizables",
  subtitle: TEMA_CCSS1_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "bicuadrada",
      type: "slide",
      help: [{ label: "Por qué se llama así", message: "Es de cuarto grado pero solo tiene potencias pares, así que es una ecuación de segundo grado en $x^2$." }],
      title: "Cambio de variable: t = x²",
      blocks: [
        { kind: "definition", text: "Una **ecuación bicuadrada** es de la forma $ax^4 + bx^2 + c = 0$. Se resuelve con el cambio $t = x^2$, que da $at^2 + bt + c = 0$." },
        { kind: "example", title: "x⁴ − 5x² + 4 = 0", lines: [
          { math: "t^2 - 5t + 4 = 0 \\Rightarrow t = 1,\\ t = 4" },
          { math: "x^2 = 1 \\Rightarrow x = \\pm 1\\qquad x^2 = 4 \\Rightarrow x = \\pm 2" },
        ] },
        { kind: "text", text: "Cada valor positivo de $t$ da **dos** soluciones, $\\pm\\sqrt{t}$." },
      ],
      arrange: "stack",
    },
    {
      id: "negativos",
      type: "slide",
      help: [{ label: "Por qué se descarta", message: "$x^2 = t$ con $t < 0$ no tiene solución real, porque un cuadrado real nunca es negativo." }],
      title: "Cuidado con t negativo",
      blocks: [
        { kind: "example", title: "x⁴ + x² − 6 = 0", lines: [
          { math: "t^2 + t - 6 = 0 \\Rightarrow t = 2,\\ t = -3" },
          { math: "x^2 = 2 \\Rightarrow x = \\pm\\sqrt{2}" },
          { math: "x^2 = -3 \\Rightarrow \\text{sin solución real}" },
        ] },
        { kind: "warning", text: "Solo las raíces $t \\geq 0$ dan soluciones reales de $x$. Con $t = 0$ sale $x = 0$ (una sola)." },
      ],
      arrange: "stack",
    },
    {
      id: "check-cuantas",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Con $t = x^2$: $t^2 - 13t + 36 = 0$ da $t = 4$ y $t = 9$." }],
      title: "Cuántas soluciones",
      question: "¿Cuántas soluciones reales tiene $x^4 - 13x^2 + 36 = 0$? (solo el número)",
      correctAnswers: ["4"],
      explanation: "$t^2 - 13t + 36 = 0$ da $t = 4$ y $t = 9$; entonces $x = \\pm 2$ y $x = \\pm 3$: cuatro soluciones.",
    },
    {
      id: "check-ninguna",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$t^2 + 3t + 2 = (t + 1)(t + 2)$." }],
      title: "x⁴ + 3x² + 2 = 0",
      question: "La ecuación $x^4 + 3x^2 + 2 = 0$ tiene…",
      choices: [
        { id: "a", label: "ninguna solución real" },
        { id: "b", label: "cuatro soluciones reales", incorrectFeedback: "Las raíces de $t$ son $-1$ y $-2$, ambas negativas." },
        { id: "c", label: "dos soluciones reales", incorrectFeedback: "Ninguna $t$ es positiva, así que no sale ninguna $x$ real." },
        { id: "d", label: "una solución real", incorrectFeedback: "Ninguna $t$ es positiva ni nula." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$t = x^2$ da $t = -1$ y $t = -2$. Como $x^2 \\geq 0$, ninguna sirve. (Es evidente: $x^4 + 3x^2 + 2 \\geq 2 > 0$.)",
    },
    {
      id: "cubica",
      type: "slide",
      help: [{ label: "Método general", message: "Para cualquier ecuación polinómica: se pasa todo a un miembro, se factoriza con Ruffini y se iguala a cero cada factor." }],
      title: "Ecuaciones factorizables",
      blocks: [
        { kind: "example", title: "x³ − 2x² − 5x + 6 = 0", lines: [
          { math: "\\text{Ruffini con } 1 \\to x^2 - x - 6 = (x - 3)(x + 2)" },
          { math: "(x - 1)(x - 3)(x + 2) = 0 \\Rightarrow x = 1,\\ x = 3,\\ x = -2" },
        ] },
        { kind: "text", text: "Un producto vale cero cuando algún factor vale cero: **cada factor da una solución**." },
      ],
      visual: { kind: "tool", tool: "ruffini-explorador", initial: [1, -2, -5, 6, 1], hint: "Con a = 1 el resto es 0. Divide el cociente y obtendrás las otras dos raíces." },
    },
    {
      id: "check-suma",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Las soluciones son $1$, $3$ y $-2$." }],
      title: "Suma de soluciones",
      question: "¿Cuánto suman las soluciones de $x^3 - 2x^2 - 5x + 6 = 0$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$1 + 3 + (-2) = 2$. (También es $-\\frac{b}{a} = 2$, la fórmula de Vieta para el cúbico.)",
    },
  ],
};
