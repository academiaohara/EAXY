import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_5_SUBTITLE } from "@/data/lessons/shared";

export const ecuacionesDenominadores3esoLesson: InteractiveLesson = {
  slug: "ecuaciones-denominadores-3eso",
  title: "3. Ecuaciones con denominadores",
  subtitle: TEMA_3ESO_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "mcm",
      type: "slide",
      help: [
        {
          label: "Por qué se puede",
          message: "Multiplicar los dos miembros por el mismo número distinto de cero da una ecuación equivalente.",
        },
        {
          label: "Todos los términos",
          message: "Hay que multiplicar **cada** término, incluidos los que no tienen denominador (los enteros).",
        },
      ],
      title: "Quitar denominadores con el m.c.m.",
      blocks: [
        {
          kind: "rule",
          text: "Para eliminar los denominadores se multiplican **ambos miembros** por el **m.c.m.** de todos ellos.",
        },
        {
          kind: "example",
          title: "x/3 + x/4 = 7/6 + 1",
          lines: [
            { math: "\\text{m.c.m.}(3, 4, 6) = 12" },
            { math: "12 \\cdot \\dfrac{x}{3} + 12 \\cdot \\dfrac{x}{4} = 12 \\cdot \\dfrac{7}{6} + 12 \\cdot 1" },
            { math: "4x + 3x = 14 + 12 \\Rightarrow 7x = 26" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "balanza-ecuacion", params: { a: 2, b: 0, c: 8 } },
    },
    {
      id: "con-parentesis",
      type: "slide",
      help: [
        {
          label: "El numerador es un bloque",
          message: "Cuando el numerador es una suma o resta, el factor que multiplica a la fracción multiplica a todo el numerador: usa paréntesis.",
        },
        {
          label: "Signo menos delante",
          message: "Si delante de la fracción hay un signo menos, al quitar el denominador y abrir el paréntesis cambian todos los signos del numerador.",
        },
      ],
      title: "Con paréntesis en el numerador",
      blocks: [
        {
          kind: "example",
          title: "(x + 2)/3 − (x − 1)/2 = 1",
          lines: [
            { math: "\\text{m.c.m.}(3, 2) = 6" },
            { math: "2(x + 2) - 3(x - 1) = 6" },
            { math: "2x + 4 - 3x + 3 = 6" },
            { math: "-x + 7 = 6 \\Rightarrow x = 1" },
          ],
        },
        {
          kind: "warning",
          text: "$-3(x - 1) = -3x + 3$: el signo $-$ afecta a los dos términos del paréntesis.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-mcm",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Divisores",
          message: "El m.c.m. de $4$, $6$ y $3$ es el menor múltiplo común: $12$.",
        },
      ],
      title: "Por qué número multiplicar",
      question: "Para quitar denominadores en $\\dfrac{x}{4} - \\dfrac{x}{6} = \\dfrac{1}{3}$, ¿por qué número multiplicas los dos miembros? (el menor posible)",
      correctAnswers: ["12"],
      explanation: "$\\text{m.c.m.}(4, 6, 3) = 12$.",
    },
    {
      id: "check-resolver",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "m.c.m. = 6",
          message: "$6 \\cdot \\frac{x}{2} = 3x$ y $6 \\cdot \\frac{x}{3} = 2x$. El $5$ pasa a $30$.",
        },
      ],
      title: "Resuelve",
      question: "Resuelve $\\dfrac{x}{2} + \\dfrac{x}{3} = 5$ (solo el número).",
      correctAnswers: ["6"],
      explanation: "$3x + 2x = 30 \\Rightarrow 5x = 30 \\Rightarrow x = 6$. Comprobación: $3 + 2 = 5$.",
    },
    {
      id: "check-parentesis",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Multiplica por 6",
          message: "$6 \\cdot \\frac{x + 1}{2} = 3(x + 1)$ y $6 \\cdot \\frac{x - 1}{3} = 2(x - 1)$.",
        },
      ],
      title: "Con paréntesis",
      question: "Resuelve $\\dfrac{x + 1}{2} - \\dfrac{x - 1}{3} = 2$ (solo el número).",
      correctAnswers: ["7"],
      explanation: "$3(x + 1) - 2(x - 1) = 12 \\Rightarrow 3x + 3 - 2x + 2 = 12 \\Rightarrow x = 7$.",
    },
    {
      id: "check-error",
      type: "predict",
      help: [
        {
          label: "Todos los términos",
          message: "Si multiplicas por $6$ el término con fracción, el entero $2$ también se multiplica por $6$.",
        },
      ],
      title: "Detecta el error",
      question: "Un alumno quita denominadores en $\\dfrac{x}{2} + 2 = \\dfrac{x}{3}$ multiplicando por $6$ y escribe $3x + 2 = 2x$. ¿Qué ha hecho mal?",
      mode: "choice",
      choices: [
        { id: "a", label: "No ha multiplicado el $2$ por $6$: debería ser $3x + 12 = 2x$" },
        { id: "b", label: "El m.c.m. es $5$, no $6$", incorrectFeedback: "El m.c.m. de $2$ y $3$ es $6$; eso está bien." },
        { id: "c", label: "No se pueden quitar denominadores", incorrectFeedback: "Sí se pueden: multiplicando todos los términos por el m.c.m." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Hay que multiplicar **todos** los términos: $6 \\cdot 2 = 12$, así que $3x + 12 = 2x$ y $x = -12$.",
    },
  ],
};
