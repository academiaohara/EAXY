import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_6_SUBTITLE } from "@/data/lessons/shared";

export const ecuacionesDenominadores2esoLesson: InteractiveLesson = {
  slug: "ecuaciones-denominadores-2eso",
  title: "3. Ecuaciones con denominadores",
  subtitle: TEMA_2ESO_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "idea",
      type: "slide",
      help: [
        {
          label: "Por qué se puede",
          message: "Multiplicar los dos miembros por el mismo número (distinto de $0$) da una ecuación equivalente, con la misma solución.",
        },
        {
          label: "Por qué el m.c.m.",
          message: "Con el m.c.m. de los denominadores desaparecen todos y los números son los más pequeños posible.",
        },
      ],
      title: "Eliminar denominadores",
      blocks: [
        {
          kind: "rule",
          text: "Para eliminar los denominadores se **multiplican los dos miembros** por el **m.c.m.** de todos ellos.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{x}{3} + \\dfrac{x}{4} = \\dfrac{7}{6}", note: "ecuación" },
            { math: "\\text{m.c.m.}(3, 4, 6) = 12" },
            { math: "12 \\cdot \\dfrac{x}{3} + 12 \\cdot \\dfrac{x}{4} = 12 \\cdot \\dfrac{7}{6}" },
            { math: "4x + 3x = 14 \\to 7x = 14 \\to x = 2" },
          ],
        },
        {
          kind: "warning",
          text: "Hay que multiplicar **todos los términos**, también los que no llevan denominador.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["x/3", "+", "x/4", "=", "7/6"], note: "m.c.m.$(3, 4, 6) = 12$: multiplicamos todo por $12$." },
            { tokens: ["12·x/3", "+", "12·x/4", "=", "12·7/6"], active: [0, 4], note: "simplificamos cada término." },
            { tokens: ["4x", "+", "3x", "=", "14"], fresh: [0, 4], note: "ya no hay denominadores." },
            { tokens: ["7x", "=", "14"], note: "reducimos." },
            { tokens: ["x", "=", "2"], fresh: [2, 2], note: "solución: $x = 2$." },
          ],
        },
      },
    },
    {
      id: "con-parentesis",
      type: "slide",
      help: [
        {
          label: "Numerador completo",
          message: "En $\\frac{x + 1}{2}$ el numerador $x + 1$ es un bloque: al multiplicar por $6$ y simplificar queda $3(x + 1)$, con paréntesis.",
        },
      ],
      title: "Cuando el numerador tiene varios términos",
      blocks: [
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{x + 1}{2} - \\dfrac{x}{3} = 1", note: "ecuación" },
            { math: "\\text{m.c.m.}(2, 3) = 6" },
            { math: "3(x + 1) - 2x = 6" },
            { math: "3x + 3 - 2x = 6 \\to x + 3 = 6 \\to x = 3" },
          ],
        },
        {
          kind: "warning",
          text: "El numerador $x + 1$ se convierte en $3(x + 1)$: **hay que poner paréntesis** para multiplicar el signo y todos los términos.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-calculo",
      type: "fill_in_blank",
      help: [
        {
          label: "m.c.m.",
          message: "$\\text{m.c.m.}(2, 3) = 6$. $6 \\cdot \\frac{x}{2} = 3x$ y $6 \\cdot \\frac{x}{3} = 2x$.",
        },
      ],
      title: "Un caso sencillo",
      question: "Resuelve $\\dfrac{x}{2} + \\dfrac{x}{3} = 5$ (solo el valor de $x$)",
      correctAnswers: ["6"],
      explanation: "Multiplicando por $6$: $3x + 2x = 30$; $5x = 30$; $x = 6$.",
    },
    {
      id: "check-mcm",
      type: "predict",
      help: [
        {
          label: "Denominadores",
          message: "Los denominadores son $3$ y $2$ (y el número entero no tiene). El m.c.m. es el menor múltiplo común.",
        },
      ],
      title: "Qué ecuación resulta",
      question: "Al multiplicar $\\dfrac{2x - 1}{3} = \\dfrac{x}{2}$ por el m.c.m. de los denominadores, resulta:",
      mode: "choice",
      choices: [
        { id: "a", label: "$2(2x - 1) = 3x$" },
        { id: "b", label: "$2x - 1 = x$", incorrectFeedback: "No basta con quitar los denominadores: hay que multiplicar por $6$." },
        { id: "c", label: "$3(2x - 1) = 2x$", incorrectFeedback: "Se han intercambiado los factores: $6 : 3 = 2$ multiplica al primer miembro y $6 : 2 = 3$ al segundo." },
        { id: "d", label: "$2x - 1 = 3x$", incorrectFeedback: "El primer miembro también se multiplica por $2$, y con paréntesis." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\text{m.c.m.}(3, 2) = 6$: $6 \\cdot \\frac{2x - 1}{3} = 2(2x - 1)$ y $6 \\cdot \\frac{x}{2} = 3x$.",
    },
    {
      id: "check-resolver",
      type: "fill_in_blank",
      help: [
        {
          label: "Continúa desde la ecuación sin denominadores",
          message: "$2(2x - 1) = 3x \\to 4x - 2 = 3x \\to x = 2$.",
        },
      ],
      title: "Resolver",
      question: "Resuelve $\\dfrac{2x - 1}{3} = \\dfrac{x}{2}$ (solo el valor de $x$)",
      correctAnswers: ["2"],
      explanation: "$4x - 2 = 3x \\Rightarrow x = 2$. Comprobación: $\\frac{3}{3} = 1 = \\frac{2}{2}$.",
    },
  ],
};
