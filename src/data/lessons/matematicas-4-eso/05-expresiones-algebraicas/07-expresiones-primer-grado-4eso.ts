import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_5_SUBTITLE } from "@/data/lessons/shared";

export const expresionesPrimerGrado4esoLesson: InteractiveLesson = {
  slug: "expresiones-primer-grado-4eso",
  title: "7. Expresiones de primer grado",
  subtitle: TEMA_4ESO_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "parentesis",
      type: "slide",
      help: [
        {
          label: "Primero repartir",
          message: "Cada número delante de un paréntesis se reparte con su signo: $3(5x - 7) = 15x - 21$ y $-2(x - 5) = -2x + 10$.",
        },
        {
          label: "Después, semejantes",
          message: "Cuando no quedan paréntesis, se agrupan los términos en $x$ por un lado y los números por otro.",
        },
      ],
      title: "Quitar paréntesis y reducir",
      blocks: [
        {
          kind: "steps",
          title: "Para simplificar",
          items: [
            "Multiplica cada número por su paréntesis (**con su signo**).",
            "Quita los paréntesis.",
            "Agrupa los términos **en $x$** y los **números**.",
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "3(5x - 7) + 2(x - 1) - 5x + 3" },
            { math: "= 15x - 21 + 2x - 2 - 5x + 3 = 12x - 20" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["3(5x−7)", "+", "2(x−1)", "−", "5x", "+", "3"], active: [0, 2], note: "repartimos cada número por su paréntesis." },
            { tokens: ["15x−21", "+", "2x−2", "−", "5x", "+", "3"], active: [0, 6], note: "agrupamos las $x$: $15 + 2 - 5 = 12$." },
            { tokens: ["12x", "−", "21", "−", "2", "+", "3"], active: [2, 6], note: "y los números: $-21 - 2 + 3 = -20$." },
            { tokens: ["12x−20"], fresh: [0, 0], note: "forma reducida." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-parentesis",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Reparte",
          message: "$3(x - 1) = 3x - 3$; $5(x - 2) = 5x - 10$. Después: $3x - 3 + 5x - 10 - 7x$.",
        },
      ],
      title: "Reducir",
      question: "Simplifica $3(x - 1) + 5(x - 2) - 7x$. El resultado es $x - k$. ¿Cuánto vale $k$? (solo el número)",
      correctAnswers: ["13"],
      explanation: "$3x - 3 + 5x - 10 - 7x = x - 13$.",
    },
    {
      id: "check-cancela",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Reparte",
          message: "$3(1 - x) = 3 - 3x$ y $-2(x - 5) = -2x + 10$. Agrupa las $x$: $5 - 3 - 2 = 0$.",
        },
      ],
      title: "Cuando desaparece la x",
      question: "Simplifica $5x + 3(1 - x) - 12 - 2(x - 5)$. El resultado es un **número**. ¿Cuál? (escribe el número con su signo)",
      correctAnswers: ["1", "+1"],
      explanation: "$5x + 3 - 3x - 12 - 2x + 10 = 0x + 1 = 1$.",
    },
    {
      id: "denominadores",
      type: "slide",
      help: [
        {
          label: "Por qué se puede",
          message: "Multiplicar **toda** la expresión por un número no cambia la forma de la expresión, solo la escala; así los números son más cómodos. Hay que acordarse de que el resultado está multiplicado por ese número.",
        },
        {
          label: "Cada término",
          message: "Se multiplica **cada término**. Un denominador se simplifica con el m.c.m.: $12 \\cdot \\frac{x}{2} = 6x$.",
        },
      ],
      title: "Quitar denominadores: multiplicar por el m.c.m.",
      blocks: [
        {
          kind: "steps",
          title: "Método",
          items: [
            "Calcula el **m.c.m.** de los denominadores.",
            "Multiplica **cada término** por él.",
            "Simplifica cada denominador con el m.c.m.",
            "Reduce los términos semejantes.",
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "12\\left(\\dfrac{x}{2} - \\dfrac{x}{3} + \\dfrac{3}{4}\\right) = 6x - 4x + 9 = 2x + 9" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "denominadores-mcm", params: { nums: [1, 2, 1, -1, 3, 1, 3, 4, 0] } },
    },
    {
      id: "explora-mcm",
      type: "slide",
      help: [
        {
          label: "m.c.m.",
          message: "El m.c.m. es el menor número que es múltiplo de todos los denominadores. Cada denominador se divide en él una cantidad exacta de veces.",
        },
      ],
      title: "Explora: el m.c.m. y los factores",
      blocks: [
        {
          kind: "text",
          text: "Elige tres denominadores. La herramienta calcula el **m.c.m.** y por cuánto queda multiplicado cada término.",
        },
      ],
      visual: { kind: "tool", tool: "mcm-explorador", initial: [2, 3, 4], hint: "Prueba 6, 10 y 15: ¿cuál es el m.c.m.?" },
    },
    {
      id: "check-mcm",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Multiplica cada término",
          message: "$12 \\cdot \\frac{x}{2} = 6x$; $12 \\cdot \\frac{x}{3} = 4x$; $12 \\cdot \\frac{3}{4} = 9$.",
        },
      ],
      title: "Multiplicar por 12",
      question: "Multiplica por $12$ y simplifica: $\\dfrac{x}{2} - \\dfrac{x}{3} + \\dfrac{3}{4}$.",
      choices: [
        { id: "a", label: "$2x + 9$" },
        { id: "b", label: "$2x + 3$", incorrectFeedback: "$12 \\cdot \\frac{3}{4} = 9$, no $3$: hay que multiplicar también el término sin $x$." },
        { id: "c", label: "$x/6 + 3/4$", incorrectFeedback: "Esa es la expresión original reducida, sin multiplicar por $12$." },
        { id: "d", label: "$10x + 9$", incorrectFeedback: "$-\\frac{x}{3}$ da $-4x$ (resta): $6x - 4x = 2x$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$6x - 4x + 9 = 2x + 9$.",
    },
    {
      id: "check-20",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Multiplica por 20",
          message: "$20 \\cdot \\frac{3(x - 2)}{4} = 15(x - 2)$ y $20 \\cdot \\frac{2x - 4}{5} = 4(2x - 4)$ y $20 \\cdot 1 = 20$.",
        },
      ],
      title: "Con paréntesis y denominadores",
      question: "Multiplica por $20$ y simplifica $\\dfrac{3(x - 2)}{4} - \\dfrac{2x - 4}{5} + 1$. El resultado es $7x + k$. ¿Cuánto vale $k$? (escribe el número con su signo)",
      correctAnswers: ["6", "+6"],
      explanation: "$15(x - 2) - 4(2x - 4) + 20 = 15x - 30 - 8x + 16 + 20 = 7x + 6$.",
    },
    {
      id: "sustituir",
      type: "slide",
      help: [
        {
          label: "Con paréntesis",
          message: "Al sustituir una letra por una expresión, ponla **entre paréntesis**: $4x$ con $x = 7 - 4y$ es $4(7 - 4y)$.",
        },
      ],
      title: "Sustituir una letra por una expresión",
      blocks: [
        {
          kind: "text",
          text: "En $4x + 3y - 3$, sustituimos $x$ por $7 - 4y$: **se pone entre paréntesis** y se reduce.",
        },
        {
          kind: "example",
          lines: [
            { math: "4(7 - 4y) + 3y - 3 = 28 - 16y + 3y - 3 = -13y + 25" },
          ],
        },
        {
          kind: "text",
          text: "Es el paso clave del **método de sustitución** de los sistemas de ecuaciones.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-sustituir",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Paréntesis",
          message: "$2x - 3y + 1$ con $x = 1 + 5y$: $2(1 + 5y) - 3y + 1 = 2 + 10y - 3y + 1$.",
        },
      ],
      title: "Sustituir y reducir",
      question: "En $2x - 3y + 1$ sustituye $x$ por $1 + 5y$ y reduce. El resultado es $ky + 3$. ¿Cuánto vale $k$? (solo el número)",
      correctAnswers: ["7"],
      explanation: "$2(1 + 5y) - 3y + 1 = 2 + 10y - 3y + 1 = 7y + 3$.",
    },
    {
      id: "check-traducir",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Una subida del 12 %",
          message: "Una subida del $12\\,\\%$ multiplica por $1{,}12$: $x + 0{,}12x = 1{,}12x$.",
        },
      ],
      title: "Traducir y simplificar",
      question: "Invertí una cantidad $x$ y ha aumentado un $12\\,\\%$. ¿Qué cantidad tengo ahora?",
      choices: [
        { id: "a", label: "$1{,}12x$" },
        { id: "b", label: "$0{,}12x$", incorrectFeedback: "Eso es solo el **aumento**. La cantidad actual es lo que había más el aumento." },
        { id: "c", label: "$x + 12$", incorrectFeedback: "El $12\\,\\%$ es de $x$, no $12$ unidades fijas." },
        { id: "d", label: "$12x$", incorrectFeedback: "Se ha multiplicado por $12$, no por $1{,}12$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$x + 0{,}12x = 1{,}12x$ (es el índice de variación del tema anterior).",
    },
  ],
};
