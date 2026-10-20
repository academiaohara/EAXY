import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_3_SUBTITLE } from "@/data/lessons/shared";

export const multiplicacionFracciones2esoLesson: InteractiveLesson = {
  slug: "multiplicacion-fracciones-2eso",
  title: "3. Multiplicación de fracciones",
  subtitle: TEMA_2ESO_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "producto",
      type: "slide",
      help: [
        {
          label: "Una fracción de una fracción",
          message: "$\\frac{3}{4} \\cdot \\frac{2}{5}$ es tomar $\\frac{3}{4}$ de $\\frac{2}{5}$: se parte la unidad en $4 \\cdot 5 = 20$ trozos y se cogen $3 \\cdot 2 = 6$.",
        },
        {
          label: "No hace falta común denominador",
          message: "A diferencia de la suma, aquí los denominadores no tienen que ser iguales.",
        },
      ],
      title: "Numerador por numerador, denominador por denominador",
      blocks: [
        {
          kind: "rule",
          text: "Se multiplican los **numeradores** entre sí y los **denominadores** entre sí.",
          formula: "\\dfrac{a}{b} \\cdot \\dfrac{c}{d} = \\dfrac{a \\cdot c}{b \\cdot d}",
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{4}{8} \\cdot \\dfrac{3}{4} = \\dfrac{12}{32} = \\dfrac{6}{16} = \\dfrac{3}{8}", note: "simplificando entre $2$" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "fraccion-de-fraccion", params: { a: 3, b: 4, c: 2, d: 5 } },
    },
    {
      id: "simplificar-antes",
      type: "slide",
      help: [
        {
          label: "Por qué se puede tachar en cruz",
          message: "El producto es una sola fracción $\\frac{a \\cdot c}{b \\cdot d}$: puedes tachar cualquier factor del numerador con uno igual del denominador, aunque vengan de fracciones distintas.",
        },
        {
          label: "Con primos",
          message: "Al factorizar se ve qué se tacha: $\\frac{4}{8} \\cdot \\frac{3}{4} = \\frac{2^2 \\cdot 3}{2^3 \\cdot 2^2}$.",
        },
      ],
      title: "Simplifica antes de multiplicar",
      blocks: [
        {
          kind: "text",
          text: "Es más cómodo **factorizar** numeradores y denominadores y tachar los factores iguales antes de hacer ningún producto.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{4}{8} \\cdot \\dfrac{3}{4} = \\dfrac{2^2 \\cdot 3}{2^3 \\cdot 2^2} = \\dfrac{3}{2^3} = \\dfrac{3}{8}" },
          ],
        },
        {
          kind: "warning",
          text: "Solo se tacha en **productos**. En una suma no se pueden tachar sumandos.",
        },
      ],
      visual: { kind: "anim", scene: "simplificar-factores", params: { a: 4, b: 8, c: 3, d: 4 } },
    },
    {
      id: "explora",
      type: "slide",
      help: [
        {
          label: "Qué ver",
          message: "La zona solapada son los trozos del producto: $a \\cdot c$ de $b \\cdot d$.",
        },
      ],
      title: "El producto como área",
      blocks: [
        {
          kind: "text",
          text: "En el cuadrado unidad, la primera fracción reparte las **columnas** y la segunda las **filas**. La zona solapada es el resultado.",
        },
      ],
      visual: { kind: "tool", tool: "fraction-product", initial: [3, 4, 2, 5], hint: "Cambia numeradores y denominadores y compara el solape con el producto." },
      arrange: "visual-top",
    },
    {
      id: "check-producto",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Factoriza",
          message: "$\\frac{2}{3} \\cdot \\frac{9}{10}$: el $9$ y el $3$ comparten el $3$; el $2$ y el $10$ comparten el $2$.",
        },
      ],
      title: "Producto",
      question: "Calcula $\\dfrac{2}{3} \\cdot \\dfrac{9}{10}$ (fracción irreducible).",
      correctAnswers: ["3/5"],
      explanation: "$\\frac{2 \\cdot 9}{3 \\cdot 10} = \\frac{18}{30} = \\frac{3}{5}$.",
    },
    {
      id: "check-problema",
      type: "predict",
      help: [
        {
          label: "Una fracción de una fracción",
          message: "«$\\frac{2}{5}$ de $\\frac{3}{4}$» se calcula multiplicando: $\\frac{2}{5} \\cdot \\frac{3}{4}$.",
        },
      ],
      title: "Parte del terreno",
      question: "De un terreno, $\\dfrac{3}{4}$ son de cultivo. Dos quintos de la parte cultivada son de olivar. ¿Qué fracción del terreno es olivar?",
      mode: "choice",
      choices: [
        { id: "3-10", label: "$\\dfrac{3}{10}$" },
        { id: "23-20", label: "$\\dfrac{23}{20}$", incorrectFeedback: "Has sumado; «de» indica producto, y el resultado no puede pasar de la unidad." },
        { id: "5-9", label: "$\\dfrac{5}{9}$", incorrectFeedback: "No se suman numeradores ni denominadores al multiplicar." },
        { id: "8-15", label: "$\\dfrac{8}{15}$", incorrectFeedback: "Es $\\frac{4}{5} \\cdot \\frac{2}{3}$, no los datos del problema." },
      ],
      correctChoiceId: "3-10",
      shuffleChoices: true,
      explanation: "$\\frac{2}{5} \\cdot \\frac{3}{4} = \\frac{6}{20} = \\frac{3}{10}$ del terreno.",
    },
  ],
};
