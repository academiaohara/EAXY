import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_4_SUBTITLE } from "@/data/lessons/shared";

export const polinomios3esoLesson: InteractiveLesson = {
  slug: "polinomios-3eso",
  title: "3. Polinomios",
  subtitle: TEMA_3ESO_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "concepto",
      type: "slide",
      help: [
        {
          label: "Sumandos",
          message: "Cada sumando (con su signo) es un término. En $3x^3 + 5x - 4$ hay tres términos.",
        },
        {
          label: "Reducir primero",
          message: "Antes de dar el grado hay que sumar los términos semejantes: pueden cancelarse y cambiar el grado.",
        },
      ],
      title: "Qué es un polinomio",
      blocks: [
        {
          kind: "definition",
          text: "Un **polinomio** es una suma o resta de monomios no semejantes. Cada sumando es un **término**; el que no lleva letra es el **término independiente**.",
        },
        {
          kind: "example",
          title: "Elementos de un polinomio",
          lines: [
            { math: "3x^3 + 5x - 4:\\ \\text{términos } 3x^3,\\ 5x,\\ -4;\\ \\text{independiente } -4;\\ \\text{grado } 3" },
            { math: "-3ab + 4b:\\ \\text{términos } -3ab,\\ 4b;\\ \\text{sin independiente};\\ \\text{grado } 2" },
          ],
        },
        {
          kind: "rule",
          title: "Grado",
          text: "Es el mayor grado de sus monomios, **una vez reducido** el polinomio.",
          formula: "7x^3 + 5x^2 + 3x^3 - 2x - 10x^3 = 5x^2 - 2x \\Rightarrow \\text{grado } 2",
        },
      ],
      arrange: "stack",
    },
    {
      id: "valor-numerico",
      type: "slide",
      help: [
        {
          label: "Sustituir",
          message: "Reemplaza la letra por el número y haz las operaciones respetando la jerarquía: primero potencias, después productos y por último sumas.",
        },
        {
          label: "Raíz",
          message: "Si al sustituir sale $0$, ese número hace que el polinomio «se anule»: es una raíz.",
        },
      ],
      title: "Valor numérico y raíces",
      blocks: [
        {
          kind: "definition",
          text: "El **valor numérico** de un polinomio en $x = a$ es el número que sale al sustituir la letra por $a$. Si es $0$, $a$ es una **raíz** del polinomio.",
        },
        {
          kind: "example",
          title: "P(x) = 2x³ − 5x² + 7 en x = 2",
          lines: [
            { math: "P(2) = 2 \\cdot 2^3 - 5 \\cdot 2^2 + 7" },
            { math: "= 2 \\cdot 8 - 5 \\cdot 4 + 7 = 16 - 20 + 7 = 3" },
          ],
        },
        {
          kind: "example",
          title: "Una raíz",
          lines: [
            { math: "Q(x) = x^2 - 4:\\quad Q(2) = 4 - 4 = 0" },
            { math: "x = 2 \\text{ es una raíz de } Q" },
          ],
        },
      ],
      visual: { kind: "tool", tool: "valor-numerico", params: { a: 2, b: 7, n: 2 }, hint: "Cambia el valor de $n$ y observa cómo cambia el resultado de la expresión." },
    },
    {
      id: "check-grado",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Reduce",
          message: "$3x^3 - 3x^3$ se cancela. El término de mayor grado que queda es $5x^2$.",
        },
      ],
      title: "Grado tras reducir",
      question: "¿Cuál es el grado del polinomio $3x^3 + 5x^2 - 3x^3 + x$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "Los términos de grado $3$ se cancelan: queda $5x^2 + x$, de grado $2$.",
    },
    {
      id: "check-valor",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Sustituye x = −1",
          message: "$(-1)^2 = 1$ y $(-1)^3 = -1$. Calcula cada término con cuidado con los signos.",
        },
      ],
      title: "Valor numérico",
      question: "Calcula el valor de $P(x) = x^3 - 2x^2 + 3x + 1$ para $x = -1$ (solo el número).",
      correctAnswers: ["-5"],
      explanation: "$(-1)^3 - 2(-1)^2 + 3(-1) + 1 = -1 - 2 - 3 + 1 = -5$.",
    },
    {
      id: "check-raiz",
      type: "predict",
      help: [
        {
          label: "Sustituye cada valor",
          message: "Una raíz es un valor que hace $P = 0$. Prueba los tres valores en $x^2 - 5x + 6$.",
        },
      ],
      title: "¿Cuál es raíz?",
      question: "¿Cuál de estos valores es raíz del polinomio $x^2 - 5x + 6$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$x = 3$" },
        { id: "b", label: "$x = 1$", incorrectFeedback: "$1 - 5 + 6 = 2$, no es $0$." },
        { id: "c", label: "$x = 4$", incorrectFeedback: "$16 - 20 + 6 = 2$, no es $0$." },
        { id: "d", label: "$x = -2$", incorrectFeedback: "$4 + 10 + 6 = 20$, no es $0$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$3^2 - 5 \\cdot 3 + 6 = 9 - 15 + 6 = 0$. (También $x = 2$ es raíz.)",
    },
  ],
};
