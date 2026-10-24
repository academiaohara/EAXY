import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_4_SUBTITLE } from "@/data/lessons/shared";

export const identidadesNotables4esobLesson: InteractiveLesson = {
  slug: "identidades-notables-4esob",
  title: "8. Identidades notables",
  subtitle: TEMA_3ESO_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "cuadrado-suma",
      type: "slide",
      help: [
        {
          label: "Error típico",
          message: "$(a + b)^2$ no es $a^2 + b^2$: falta el doble producto $2ab$.",
        },
        {
          label: "Con números",
          message: "$(5 + 3)^2 = 64$, y $5^2 + 3^2 = 34$. Los $30$ que faltan son $2 \\cdot 5 \\cdot 3$.",
        },
      ],
      title: "Cuadrado de una suma",
      blocks: [
        {
          kind: "definition",
          text: "Una **identidad** es una igualdad algebraica cierta para cualquier valor de las letras. Las **identidades notables** sirven para simplificar expresiones.",
        },
        {
          kind: "rule",
          title: "Cuadrado de una suma",
          formula: "(a + b)^2 = a^2 + 2ab + b^2",
        },
        {
          kind: "example",
          lines: [
            { math: "(3x + 1)^2 = 9x^2 + 6x + 1" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "cuadrado-suma", params: { a: 5, b: 3 } },
    },
    {
      id: "cuadrado-diferencia",
      type: "slide",
      help: [
        {
          label: "Solo cambia un signo",
          message: "El doble producto lleva el signo de la operación del binomio: $+2ab$ en la suma y $-2ab$ en la resta. El último término es siempre positivo.",
        },
        {
          label: "Cómo comprobarlo",
          message: "$(x - 3)^2 = (x - 3)(x - 3) = x^2 - 3x - 3x + 9$.",
        },
      ],
      title: "Cuadrado de una diferencia",
      blocks: [
        {
          kind: "rule",
          formula: "(a - b)^2 = a^2 - 2ab + b^2",
        },
        {
          kind: "example",
          lines: [
            { math: "(5x - 3)^2 = (5x)^2 - 2 \\cdot 5x \\cdot 3 + 3^2 = 25x^2 - 30x + 9" },
            { math: "(x - 7)^2 = x^2 - 14x + 49" },
          ],
        },
        {
          kind: "warning",
          text: "El último término de un cuadrado es **siempre positivo**: $(x - 7)^2$ termina en $+49$, no en $-49$.",
        },
      ],
      visual: { kind: "anim", scene: "cuadrado-diferencia", params: { a: 7, b: 3 } },
    },
    {
      id: "suma-por-diferencia",
      type: "slide",
      help: [
        {
          label: "Se anulan",
          message: "$(a + b)(a - b) = a^2 - ab + ab - b^2$: los dos términos cruzados se cancelan.",
        },
        {
          label: "Solo con los mismos términos",
          message: "Funciona cuando un factor es suma y el otro es diferencia **de los mismos dos términos**.",
        },
      ],
      title: "Suma por diferencia",
      blocks: [
        {
          kind: "rule",
          formula: "(a + b)(a - b) = a^2 - b^2",
        },
        {
          kind: "example",
          lines: [
            { math: "(4x - 3)(4x + 3) = 16x^2 - 9" },
            { math: "(x^2 + 2x)(x^2 - 2x) = x^4 - 4x^2" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "suma-por-diferencia", params: { a: 7, b: 3 } },
    },
    {
      id: "utilidad",
      type: "slide",
      help: [
        {
          label: "Al revés",
          message: "Las identidades se pueden leer de derecha a izquierda: un trinomio como $x^2 + 4x + 4$ es el cuadrado $(x + 2)^2$.",
        },
        {
          label: "Cómo reconocer un cuadrado perfecto",
          message: "Dos de los términos son cuadrados ($x^2$ y $4 = 2^2$) y el tercero es el doble producto de sus raíces ($2 \\cdot x \\cdot 2$).",
        },
      ],
      title: "Para simplificar y para factorizar",
      blocks: [
        {
          kind: "example",
          title: "Simplificar (x + 5)² − (x − 3)²",
          lines: [
            { math: "(x^2 + 10x + 25) - (x^2 - 6x + 9)" },
            { math: "= 16x + 16 = 16(x + 1)" },
          ],
        },
        {
          kind: "example",
          title: "Transformar sumas en productos",
          lines: [
            { math: "x^2 - 9 = (x + 3)(x - 3)" },
            { math: "x^2 + 4x + 4 = (x + 2)^2" },
            { math: "9x^2 - 6x + 1 = (3x - 1)^2" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-desarrollo",
      type: "predict",
      help: [
        {
          label: "Tres términos",
          message: "$(2x - 3)^2 = (2x)^2 - 2 \\cdot 2x \\cdot 3 + 3^2$.",
        },
      ],
      title: "Cuadrado de una diferencia",
      question: "¿Cuál es el desarrollo de $(2x - 3)^2$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$4x^2 - 12x + 9$" },
        { id: "b", label: "$4x^2 - 9$", incorrectFeedback: "Falta el doble producto: $-2 \\cdot 2x \\cdot 3 = -12x$. Eso sería suma por diferencia." },
        { id: "c", label: "$4x^2 + 9$", incorrectFeedback: "Falta el doble producto $-12x$." },
        { id: "d", label: "$4x^2 - 12x - 9$", incorrectFeedback: "El último término es $(-3)^2 = +9$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(2x)^2 - 2 \\cdot 2x \\cdot 3 + 3^2 = 4x^2 - 12x + 9$.",
    },
    {
      id: "check-suma-diferencia",
      type: "fill_in_blank",
      help: [
        {
          label: "Suma por diferencia",
          message: "Los factores son $(5x + 2y)$ y $(5x - 2y)$: el resultado es $(5x)^2 - (2y)^2$.",
        },
      ],
      title: "Suma por diferencia",
      question: "Desarrolla $(5x + 2y)(5x - 2y)$. (escribe el polinomio, por ejemplo x^2-y^2)",
      correctAnswers: ["25x^2-4y^2", "25x²-4y²"],
      explanation: "$(5x)^2 - (2y)^2 = 25x^2 - 4y^2$.",
    },
    {
      id: "check-factorizar",
      type: "predict",
      help: [
        {
          label: "Raíces de los cuadrados",
          message: "$4x^2 = (2x)^2$ y $25 = 5^2$. Una diferencia de cuadrados se factoriza como suma por diferencia.",
        },
      ],
      title: "Diferencia de cuadrados",
      question: "¿En qué producto se transforma $4x^2 - 25$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$(2x + 5)(2x - 5)$" },
        { id: "b", label: "$(2x - 5)^2$", incorrectFeedback: "Ese cuadrado desarrolla a $4x^2 - 20x + 25$." },
        { id: "c", label: "$(4x + 5)(4x - 5)$", incorrectFeedback: "$(4x)^2 = 16x^2$, no $4x^2$." },
        { id: "d", label: "$(2x + 25)(2x - 25)$", incorrectFeedback: "La raíz de $25$ es $5$, no $25$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$4x^2 - 25 = (2x)^2 - 5^2 = (2x + 5)(2x - 5)$.",
    },
    {
      id: "check-simplificar",
      type: "fill_in_blank",
      help: [
        {
          label: "Desarrolla y reduce",
          message: "$(3x - 1)^2 = 9x^2 - 6x + 1$ y $(3x + 1)^2 = 9x^2 + 6x + 1$. Resta con cuidado con los signos.",
        },
      ],
      title: "Simplificar una expresión",
      question: "Simplifica $(3x + 1)^2 - (3x - 1)^2$. (escribe la expresión, por ejemplo 5x)",
      correctAnswers: ["12x"],
      explanation: "$(9x^2 + 6x + 1) - (9x^2 - 6x + 1) = 12x$.",
    },
  ],
};
