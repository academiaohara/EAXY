import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_5_SUBTITLE } from "@/data/lessons/shared";

export const sumaRestaPolinomios4esoLesson: InteractiveLesson = {
  slug: "suma-resta-polinomios-4eso",
  title: "4. Suma y resta de polinomios",
  subtitle: TEMA_4ESO_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "suma",
      type: "slide",
      help: [
        {
          label: "En columnas",
          message: "Los términos del mismo grado van en la misma columna. Donde falta un grado, se deja un hueco (equivale a un $0$).",
        },
        {
          label: "Paréntesis",
          message: "Con un signo $+$ delante, se quitan los paréntesis sin cambiar nada: $(x^2 + 3x + 2) + (2x^2 - 5) = 3x^2 + 3x - 3$.",
        },
      ],
      title: "Sumar: agrupar los semejantes",
      blocks: [
        {
          kind: "text",
          text: "Para **sumar** dos polinomios se agrupan sus términos y se **simplifican los monomios semejantes**.",
        },
        {
          kind: "example",
          lines: [
            { math: "(x^2 + 3x + 2) + (2x^2 - 5)" },
            { math: "= 3x^2 + 3x - 3" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "polinomios-columna", params: { nums: [0, 3, 5, -2, 1, 4, 0, -5], op: "+" } },
    },
    {
      id: "resta",
      type: "slide",
      help: [
        {
          label: "Cambiar todos los signos",
          message: "$-(x^3 + 2x^2 - 5x - 11) = -x^3 - 2x^2 + 5x + 11$. El signo menos delante de un paréntesis cambia el signo de **todos** los términos de dentro.",
        },
        {
          label: "El error típico",
          message: "El error más común es cambiar solo el signo del **primer** término. Cambian todos.",
        },
      ],
      title: "Restar: sumar el opuesto",
      blocks: [
        {
          kind: "definition",
          text: "El **opuesto** de un polinomio es el que resulta de **cambiar de signo todos sus términos**. Restar es sumar el opuesto del sustraendo.",
        },
        {
          kind: "example",
          lines: [
            { math: "(3x + 1) - (2x - 3) = 3x + 1 - 2x + 3 = x + 4" },
          ],
        },
        {
          kind: "warning",
          text: "En $-(2x - 3)$ cambian de signo **los dos** términos: $-2x + 3$. No $-2x - 3$.",
        },
      ],
      visual: { kind: "anim", scene: "polinomios-columna", params: { nums: [0, 3, 5, -2, 1, 4, 0, -5], op: "-" } },
    },
    {
      id: "explora",
      type: "slide",
      help: [
        {
          label: "Comprobación",
          message: "Una forma de comprobar: sustituye un valor de $x$ en los tres polinomios y mira si $A(x) + B(x)$ coincide con el resultado.",
        },
      ],
      title: "Explora: suma y resta con coeficientes",
      blocks: [
        {
          kind: "text",
          text: "Cambia los coeficientes de $A$ y de $B$ y alterna entre suma y resta. Fíjate en cuándo **baja el grado** del resultado.",
        },
      ],
      visual: { kind: "tool", tool: "polinomios-operador", initial: [0, 3, 5, -2, 1, 4, 0, -5, 0], hint: "Haz que A y B tengan el mismo coeficiente de x³ y resta: ¿qué pasa con el grado?" },
    },
    {
      id: "check-opuesto",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Cambia todos",
          message: "El opuesto cambia el signo de cada término, incluido el término independiente.",
        },
      ],
      title: "El opuesto",
      question: "¿Cuál es el opuesto de $x^3 + 2x^2 - 5x - 11$?",
      choices: [
        { id: "a", label: "$-x^3 - 2x^2 + 5x + 11$" },
        { id: "b", label: "$-x^3 + 2x^2 - 5x - 11$", incorrectFeedback: "Solo se ha cambiado el primer término. Hay que cambiarlos **todos**." },
        { id: "c", label: "$x^3 - 2x^2 + 5x + 11$", incorrectFeedback: "Se ha cambiado el signo de los términos pero no del primero." },
        { id: "d", label: "$-x^3 - 2x^2 + 5x - 11$", incorrectFeedback: "Falta cambiar el signo del término independiente: $-11 \\to +11$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Cambian todos: $-x^3 - 2x^2 + 5x + 11$.",
    },
    {
      id: "check-suma-pq",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Coeficientes de x³",
          message: "$P = x^4 - 3x^3 + 5x + 3$ y $Q = 5x^3 + 3x^2 - 11$. En $x^3$: $-3 + 5 = 2$.",
        },
      ],
      title: "P + Q",
      question: "Sean $P = x^4 - 3x^3 + 5x + 3$ y $Q = 5x^3 + 3x^2 - 11$. En $P + Q$, ¿cuál es el coeficiente de $x^3$? (escribe el número con su signo)",
      correctAnswers: ["2", "+2"],
      explanation: "$P + Q = x^4 + 2x^3 + 3x^2 + 5x - 8$. El coeficiente de $x^3$ es $-3 + 5 = 2$.",
    },
    {
      id: "check-resta-pq",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Término independiente",
          message: "$P - Q$: el término independiente es $3 - (-11) = 14$.",
        },
      ],
      title: "P − Q",
      question: "Con los mismos $P$ y $Q$, ¿cuál es el término independiente de $P - Q$? (escribe el número con su signo)",
      correctAnswers: ["14", "+14"],
      explanation: "$P - Q = x^4 - 8x^3 - 3x^2 + 5x + 14$. Término independiente: $3 - (-11) = 14$.",
    },
    {
      id: "check-resta-binomios",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Quita paréntesis",
          message: "$(2x^2 + x - 3) - (x^2 - 2x + 1) = 2x^2 + x - 3 - x^2 + 2x - 1$.",
        },
      ],
      title: "Una resta",
      question: "Calcula $(2x^2 + x - 3) - (x^2 - 2x + 1)$.",
      choices: [
        { id: "a", label: "$x^2 + 3x - 4$" },
        { id: "b", label: "$x^2 - x - 2$", incorrectFeedback: "El signo menos cambia **todos** los términos del segundo polinomio: $-(-2x) = +2x$." },
        { id: "c", label: "$3x^2 - x - 2$", incorrectFeedback: "Es una **resta**: $2x^2 - x^2 = x^2$, no $2x^2 + x^2$." },
        { id: "d", label: "$x^2 + 3x - 2$", incorrectFeedback: "El último término: $-3 - 1 = -4$, no $-2$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$2x^2 + x - 3 - x^2 + 2x - 1 = x^2 + 3x - 4$.",
    },
  ],
};
