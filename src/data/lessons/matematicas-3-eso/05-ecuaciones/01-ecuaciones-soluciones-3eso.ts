import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_5_SUBTITLE } from "@/data/lessons/shared";

export const ecuacionesSoluciones3esoLesson: InteractiveLesson = {
  slug: "ecuaciones-soluciones-3eso",
  title: "1. Ecuaciones y soluciones",
  subtitle: TEMA_3ESO_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "identidad-ecuacion",
      type: "slide",
      help: [
        {
          label: "Prueba valores",
          message: "Sustituye varios valores: si la igualdad se cumple siempre, es una identidad; si solo con algunos, es una ecuación.",
        },
        {
          label: "Dos ejemplos",
          message: "$5(x + 4) = 5x + 20$ se cumple siempre (se reduce a $0 = 0$). $5(x + 4) = x + 44$ solo se cumple con $x = 6$.",
        },
      ],
      title: "Identidad o ecuación",
      blocks: [
        {
          kind: "compare",
          left: { title: "Identidad", text: "Igualdad que se cumple para **cualquier** valor de las letras.", math: ["5(x + 4) = 5x + 20"], tone: "ok" },
          right: { title: "Ecuación", text: "Igualdad que se cumple solo para **algunos** valores de la incógnita.", math: ["5(x + 4) = x + 44"], tone: "info" },
        },
        {
          kind: "text",
          text: "En una ecuación, lo que hay a cada lado del signo $=$ es un **miembro**; los sumandos son los **términos**; la letra desconocida es la **incógnita**.",
        },
      ],
      visual: { kind: "anim", scene: "ecuacion-identidad" },
    },
    {
      id: "solucion",
      type: "slide",
      help: [
        {
          label: "Sustituir",
          message: "Para saber si un valor es solución, sustitúyelo en los dos miembros: si dan lo mismo, lo es.",
        },
        {
          label: "Resolver",
          message: "Resolver es hallar todas las soluciones, o comprobar que no hay ninguna.",
        },
      ],
      title: "Solución de una ecuación",
      blocks: [
        {
          kind: "definition",
          text: "La **solución** de una ecuación es el valor de la incógnita que hace cierta la igualdad. **Resolver** una ecuación es hallar sus soluciones o averiguar que no tiene.",
        },
        {
          kind: "example",
          title: "¿Es x = 2 solución de 2x² − 10 = 3x?",
          lines: [
            { math: "\\text{Primer miembro: } 2 \\cdot 2^2 - 10 = -2" },
            { math: "\\text{Segundo miembro: } 3 \\cdot 2 = 6" },
            { math: "-2 \\ne 6 \\Rightarrow x = 2 \\text{ no es solución}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "comprobar-solucion" },
    },
    {
      id: "tanteo",
      type: "slide",
      help: [
        {
          label: "Acota",
          message: "$3^6 = 729$ y $4^6 = 4\\,096$: como $1\\,200$ está entre ambos, la solución está entre $3$ y $4$.",
        },
        {
          label: "Afina",
          message: "Prueba $3{,}1$; $3{,}2$; $3{,}3$… hasta que el resultado pase del valor buscado.",
        },
      ],
      title: "Resolver por tanteo",
      blocks: [
        {
          kind: "text",
          text: "Cualquier camino que lleve a la solución es válido, también **probar valores**. Con la calculadora se puede afinar hasta donde interese.",
        },
        {
          kind: "example",
          title: "x⁶ = 1 200",
          lines: [
            { math: "3^6 = 729 < 1\\,200 < 4\\,096 = 4^6 \\Rightarrow 3 < x < 4" },
            { math: "3{,}2^6 = 1\\,073{,}7\\ldots < 1\\,200 < 1\\,291{,}4\\ldots = 3{,}3^6" },
            { math: "x \\approx 3{,}2" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-identidad",
      type: "predict",
      help: [
        {
          label: "Reduce",
          message: "Desarrolla el producto y simplifica: si los dos miembros quedan iguales siempre, es una identidad.",
        },
      ],
      title: "Identidad o ecuación",
      question: "¿Cuál de estas igualdades es una identidad?",
      mode: "choice",
      choices: [
        { id: "a", label: "$2(x + 3) = 2x + 6$" },
        { id: "b", label: "$2x + 3 = 8$", incorrectFeedback: "Solo se cumple con $x = 2{,}5$: es una ecuación." },
        { id: "c", label: "$x^2 - x + 4 = x + 4$", incorrectFeedback: "Solo se cumple con $x = 0$ o $x = 2$: es una ecuación." },
        { id: "d", label: "$5(x + 4) = x + 44$", incorrectFeedback: "Solo se cumple con $x = 6$: es una ecuación." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$2(x + 3) = 2x + 6$ se cumple para cualquier valor de $x$.",
    },
    {
      id: "check-solucion",
      type: "predict",
      help: [
        {
          label: "Sustituye",
          message: "Prueba cada valor en $x^2 - 5x + 6$: debe dar $0$.",
        },
      ],
      title: "¿Qué valor es solución?",
      question: "¿Cuál de estos valores es solución de $x^2 - 5x + 6 = 0$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$x = 2$" },
        { id: "b", label: "$x = 0$", incorrectFeedback: "$0 - 0 + 6 = 6 \\ne 0$." },
        { id: "c", label: "$x = 1$", incorrectFeedback: "$1 - 5 + 6 = 2 \\ne 0$." },
        { id: "d", label: "$x = 6$", incorrectFeedback: "$36 - 30 + 6 = 12 \\ne 0$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$2^2 - 5 \\cdot 2 + 6 = 4 - 10 + 6 = 0$.",
    },
    {
      id: "check-tanteo",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Potencias de 5",
          message: "$5^1 = 5$, $5^2 = 25$, $5^3 = 125$… ¿cuándo llegas a $3\\,125$?",
        },
      ],
      title: "Tanteo",
      question: "Halla por tanteo la solución entera de $x^5 = 3\\,125$ (solo el número).",
      correctAnswers: ["5"],
      explanation: "$5^5 = 3\\,125$.",
    },
  ],
};
