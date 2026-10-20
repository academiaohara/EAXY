import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_3_SUBTITLE } from "@/data/lessons/shared";

export const fraccionesPotencias2esoLesson: InteractiveLesson = {
  slug: "fracciones-potencias-2eso",
  title: "5. Fracciones con potencias",
  subtitle: TEMA_2ESO_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "potencia-fraccion",
      type: "slide",
      help: [
        {
          label: "Desarrolla la potencia",
          message: "$\\left(\\frac{2}{3}\\right)^3 = \\frac{2}{3} \\cdot \\frac{2}{3} \\cdot \\frac{2}{3}$, y al multiplicar fracciones salen $2^3$ arriba y $3^3$ abajo.",
        },
        {
          label: "Paréntesis",
          message: "Sin paréntesis el exponente solo afecta a lo más cercano: $\\frac{2^3}{3}$ no es $\\left(\\frac{2}{3}\\right)^3$.",
        },
      ],
      title: "Potencia de una fracción",
      blocks: [
        {
          kind: "rule",
          text: "Para elevar una fracción a una potencia se eleva **el numerador y el denominador** a esa potencia.",
          formula: "\\left(\\dfrac{a}{b}\\right)^n = \\dfrac{a^n}{b^n}",
        },
        {
          kind: "example",
          lines: [{ math: "\\left(\\dfrac{2}{3}\\right)^3 = \\dfrac{2 \\cdot 2 \\cdot 2}{3 \\cdot 3 \\cdot 3} = \\dfrac{8}{27}" }],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["(2/3)³"], note: "tres factores iguales a $\\frac{2}{3}$." },
            { tokens: ["2/3", "·", "2/3", "·", "2/3"], active: [0, 4], note: "se multiplican numeradores y denominadores." },
            { tokens: ["2·2·2", "/", "3·3·3"], note: "agrupamos factores iguales." },
            { tokens: ["2³", "/", "3³"], note: "como potencias." },
            { tokens: ["8", "/", "27"], fresh: [0, 2], note: "$2^3 = 8$ y $3^3 = 27$." },
          ],
        },
      },
    },
    {
      id: "producto-cociente",
      type: "slide",
      help: [
        {
          label: "El camino más corto",
          message: "Si al multiplicar o dividir las fracciones sale algo sencillo, hazlo antes de elevar: es menos cuenta.",
        },
        {
          label: "Mismo exponente",
          message: "Solo puedes agrupar las bases cuando las dos potencias tienen el mismo exponente.",
        },
      ],
      title: "Potencia de un producto y de un cociente",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Producto",
            text: "La potencia de un producto es el **producto de las potencias**.",
            math: ["\\left(\\dfrac{a}{b} \\cdot \\dfrac{c}{d}\\right)^n = \\left(\\dfrac{a}{b}\\right)^n \\cdot \\left(\\dfrac{c}{d}\\right)^n"],
            tone: "ok",
          },
          right: {
            title: "Cociente",
            text: "La potencia de un cociente es el **cociente de las potencias**.",
            math: ["\\left(\\dfrac{a}{b} : \\dfrac{c}{d}\\right)^n = \\left(\\dfrac{a}{b}\\right)^n : \\left(\\dfrac{c}{d}\\right)^n"],
            tone: "info",
          },
        },
        {
          kind: "example",
          title: "Por el camino más corto",
          lines: [
            { math: "\\left(\\dfrac{5}{6}\\right)^3 \\cdot \\left(\\dfrac{3}{5}\\right)^3 = \\left(\\dfrac{5}{6} \\cdot \\dfrac{3}{5}\\right)^3 = \\left(\\dfrac{1}{2}\\right)^3 = \\dfrac{1}{8}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "misma-base",
      type: "slide",
      help: [
        {
          label: "Como con enteros",
          message: "Las propiedades de las potencias de enteros siguen valiendo con fracciones: mismas bases, se suman o restan exponentes.",
        },
      ],
      title: "Misma base: sumar, restar y multiplicar exponentes",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "\\left(\\dfrac{a}{b}\\right)^m \\cdot \\left(\\dfrac{a}{b}\\right)^n = \\left(\\dfrac{a}{b}\\right)^{m+n}", label: "producto: se suman" },
            { tex: "\\left(\\dfrac{a}{b}\\right)^m : \\left(\\dfrac{a}{b}\\right)^n = \\left(\\dfrac{a}{b}\\right)^{m-n}", label: "cociente: se restan" },
            { tex: "\\left(\\left(\\dfrac{a}{b}\\right)^m\\right)^n = \\left(\\dfrac{a}{b}\\right)^{m \\cdot n}", label: "potencia de potencia: se multiplican" },
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "\\left(\\dfrac{2}{5}\\right)^3 \\cdot \\left(\\dfrac{2}{5}\\right)^4 = \\left(\\dfrac{2}{5}\\right)^7" },
            { math: "\\left(\\left(\\dfrac{1}{2}\\right)^2\\right)^3 = \\left(\\dfrac{1}{2}\\right)^6 = \\dfrac{1}{64}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-fraccion",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Eleva los dos términos",
          message: "$\\left(\\frac{3}{5}\\right)^2 = \\frac{3^2}{5^2}$.",
        },
      ],
      title: "Potencia de una fracción",
      question: "Calcula $\\left(\\dfrac{3}{5}\\right)^2$.",
      correctAnswers: ["9/25"],
      explanation: "$\\frac{3^2}{5^2} = \\frac{9}{25}$.",
    },
    {
      id: "check-exponente",
      type: "predict",
      help: [
        {
          label: "Misma base",
          message: "Las dos potencias tienen base $\\frac{1}{2}$: en un producto, se suman los exponentes.",
        },
      ],
      title: "Reduce a una potencia",
      question: "¿A qué es igual $\\left(\\dfrac{1}{2}\\right)^3 \\cdot \\left(\\dfrac{1}{2}\\right)^2$?",
      mode: "choice",
      choices: [
        { id: "5", label: "$\\left(\\dfrac{1}{2}\\right)^5$" },
        { id: "6", label: "$\\left(\\dfrac{1}{2}\\right)^6$", incorrectFeedback: "Has multiplicado los exponentes; eso es para la potencia de una potencia." },
        { id: "1", label: "$\\left(\\dfrac{1}{2}\\right)^1$", incorrectFeedback: "Has restado: restar es para el cociente." },
        { id: "base", label: "$\\left(\\dfrac{1}{4}\\right)^5$", incorrectFeedback: "La base no cambia: solo se operan los exponentes." },
      ],
      correctChoiceId: "5",
      shuffleChoices: true,
      explanation: "$\\left(\\frac{1}{2}\\right)^{3+2} = \\left(\\frac{1}{2}\\right)^5 = \\frac{1}{32}$.",
    },
  ],
};
