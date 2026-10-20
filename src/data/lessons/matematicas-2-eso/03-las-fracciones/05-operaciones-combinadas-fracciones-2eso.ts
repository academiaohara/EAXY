import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_3_SUBTITLE } from "@/data/lessons/shared";

export const operacionesCombinadasFracciones2esoLesson: InteractiveLesson = {
  slug: "operaciones-combinadas-fracciones-2eso",
  title: "5. Operaciones combinadas con fracciones",
  subtitle: TEMA_2ESO_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "prioridad",
      type: "slide",
      help: [
        {
          label: "Mismas reglas que con enteros",
          message: "Con fracciones el orden de las operaciones es el mismo: paréntesis, productos y cocientes, y al final sumas y restas.",
        },
        {
          label: "Simplifica por el camino",
          message: "Simplificar las fracciones intermedias evita números grandes y facilita el cálculo siguiente.",
        },
      ],
      title: "Prioridad de las operaciones",
      blocks: [
        {
          kind: "steps",
          items: [
            "**Paréntesis** (de dentro hacia fuera).",
            "**Productos y cocientes**, de izquierda a derecha.",
            "**Sumas y restas**.",
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{1}{2} + \\dfrac{3}{4} \\cdot \\dfrac{2}{3} = \\dfrac{1}{2} + \\dfrac{6}{12} = \\dfrac{1}{2} + \\dfrac{1}{2} = 1" },
          ],
        },
        {
          kind: "warning",
          text: "No se suma primero: $\\frac{1}{2} + \\frac{3}{4}$ no es lo que hay que calcular antes, porque el producto tiene prioridad.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "parentesis",
      type: "slide",
      help: [
        {
          label: "Primero el paréntesis",
          message: "$\\frac{3}{2} - \\frac{2}{5}$ con denominador común $10$ da $\\frac{15}{10} - \\frac{4}{10} = \\frac{11}{10}$.",
        },
        {
          label: "Después simplifica en cruz",
          message: "En $\\frac{5}{11} \\cdot \\frac{11}{10}$ se tachan los $11$ y se simplifica $\\frac{5}{10} = \\frac{1}{2}$.",
        },
      ],
      title: "Con paréntesis",
      blocks: [
        {
          kind: "example",
          title: "Producto por un paréntesis",
          lines: [
            { math: "\\dfrac{5}{11} \\cdot \\left(\\dfrac{3}{2} - \\dfrac{2}{5}\\right) = \\dfrac{5}{11} \\cdot \\dfrac{11}{10} = \\dfrac{1}{2}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "fraccion-combinada", params: { a: 5, b: 11, c: 3, d: 2, e: 2, f: 5, op: "-" } },
    },
    {
      id: "cocientes",
      type: "slide",
      help: [
        {
          label: "Paréntesis, después división",
          message: "$\\frac{2}{3} - \\frac{1}{6} = \\frac{4}{6} - \\frac{1}{6} = \\frac{3}{6} = \\frac{1}{2}$.",
        },
        {
          label: "Dividir entre una fracción",
          message: "Se usa el producto en cruz: $\\frac{1}{2} : \\frac{1}{4} = \\frac{1 \\cdot 4}{2 \\cdot 1} = 2$.",
        },
      ],
      title: "Con una división",
      blocks: [
        {
          kind: "example",
          lines: [
            { math: "\\left(\\dfrac{2}{3} - \\dfrac{1}{6}\\right) : \\dfrac{1}{4}" },
            { math: "= \\dfrac{3}{6} : \\dfrac{1}{4} = \\dfrac{1}{2} : \\dfrac{1}{4} = \\dfrac{4}{2} = 2" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-prioridad",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Producto primero",
          message: "$\\frac{1}{3} \\cdot \\frac{3}{4} = \\frac{1}{4}$. Después resta $\\frac{5}{6} - \\frac{1}{4}$ con denominador $12$.",
        },
      ],
      title: "Producto y resta",
      question: "Calcula $\\dfrac{5}{6} - \\dfrac{1}{3} \\cdot \\dfrac{3}{4}$ (fracción irreducible).",
      correctAnswers: ["7/12"],
      explanation: "$\\frac{1}{3} \\cdot \\frac{3}{4} = \\frac{1}{4}$; $\\frac{5}{6} - \\frac{1}{4} = \\frac{10}{12} - \\frac{3}{12} = \\frac{7}{12}$.",
    },
    {
      id: "check-parentesis",
      type: "predict",
      help: [
        {
          label: "El paréntesis primero",
          message: "$\\frac{1}{2} + \\frac{1}{3} = \\frac{5}{6}$. Luego multiplica por $\\frac{6}{5}$.",
        },
      ],
      title: "Un paréntesis",
      question: "¿Cuánto vale $\\left(\\dfrac{1}{2} + \\dfrac{1}{3}\\right) \\cdot \\dfrac{6}{5}$?",
      mode: "choice",
      choices: [
        { id: "1", label: "$1$" },
        { id: "a", label: "$\\dfrac{3}{5}$", incorrectFeedback: "Has multiplicado solo $\\frac{1}{2} \\cdot \\frac{6}{5}$ y no has usado todo el paréntesis." },
        { id: "b", label: "$\\dfrac{6}{5}$", incorrectFeedback: "Has olvidado multiplicar por la suma del paréntesis, $\\frac{5}{6}$." },
        { id: "c", label: "$\\dfrac{36}{25}$", incorrectFeedback: "Has elevado al cuadrado; el producto de $\\frac{5}{6}$ y $\\frac{6}{5}$ es $1$." },
      ],
      correctChoiceId: "1",
      shuffleChoices: true,
      explanation: "$\\frac{5}{6} \\cdot \\frac{6}{5} = 1$ (son fracciones inversas).",
    },
    {
      id: "check-division",
      type: "fill_in_blank",
      help: [
        {
          label: "Paréntesis primero",
          message: "$\\frac{2}{3} - \\frac{1}{6} = \\frac{1}{2}$. Después, $\\frac{1}{2} : \\frac{1}{4}$.",
        },
      ],
      title: "Con una división",
      question: "Calcula $\\left(\\dfrac{2}{3} - \\dfrac{1}{6}\\right) : \\dfrac{1}{4}$ (solo el número)",
      correctAnswers: ["2"],
      explanation: "$\\frac{1}{2} : \\frac{1}{4} = \\frac{4}{2} = 2$: en $\\frac{1}{2}$ caben dos trozos de $\\frac{1}{4}$.",
    },
  ],
};
