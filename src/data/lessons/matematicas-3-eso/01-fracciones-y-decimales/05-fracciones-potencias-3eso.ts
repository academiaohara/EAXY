import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const fraccionesPotencias3esoLesson: InteractiveLesson = {
  slug: "fracciones-potencias-3eso",
  title: "5. Fracciones con potencias",
  subtitle: TEMA_3ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "potencia-fraccion",
      type: "slide",
      help: [
        {
          label: "Por qué",
          message: "$\\left(\\frac{2}{3}\\right)^2 = \\frac{2}{3} \\cdot \\frac{2}{3} = \\frac{2 \\cdot 2}{3 \\cdot 3} = \\frac{2^2}{3^2}$.",
        },
        {
          label: "El signo",
          message: "Un exponente par vuelve positiva la potencia; uno impar conserva el signo de la base.",
        },
      ],
      title: "Elevar una fracción a una potencia",
      blocks: [
        {
          kind: "rule",
          text: "Se elevan **numerador y denominador** al exponente.",
          formula: "\\left(\\dfrac{a}{b}\\right)^n = \\dfrac{a^n}{b^n}",
        },
        {
          kind: "example",
          lines: [
            { math: "\\left(\\dfrac{2}{3}\\right)^3 = \\dfrac{8}{27}" },
            { math: "\\left(-\\dfrac{3}{4}\\right)^2 = \\dfrac{9}{16}", note: "exponente par" },
            { math: "\\left(-\\dfrac{1}{2}\\right)^3 = -\\dfrac{1}{8}", note: "exponente impar" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "fraccion-de-fraccion",
        params: { a: 2, b: 3, c: 2, d: 3 },
        captions: [
          "El cuadrado es la **unidad**. Elevar al cuadrado es multiplicar la fracción por sí misma.",
          "Partimos en **3** columnas y coloreamos **2**: $\\dfrac{2}{3}$ del cuadrado.",
          "Ahora **3** filas y nos quedamos con **2**: otra vez $\\dfrac{2}{3}$, de lo que ya teníamos.",
          "El cruce tiene $2 \\cdot 2 = 4$ cuadraditos de $3 \\cdot 3 = 9$: $\\left(\\dfrac{2}{3}\\right)^2 = \\dfrac{2^2}{3^2} = \\dfrac{4}{9}$. Numerador y denominador se elevan al exponente.",
        ],
      },
    },
    {
      id: "producto-cociente",
      type: "slide",
      help: [
        {
          label: "Para qué sirve",
          message: "Permite repartir una potencia entre los factores, o agruparlos para calcular con números más cómodos.",
        },
        {
          label: "Una suma no",
          message: "$(a + b)^2$ no es $a^2 + b^2$. La propiedad solo vale para productos y cocientes.",
        },
      ],
      title: "Potencia de un producto y de un cociente",
      blocks: [
        {
          kind: "compare",
          left: { title: "Producto", text: "La potencia de un producto es el producto de las potencias.", math: ["(a \\cdot b)^n = a^n \\cdot b^n"], tone: "ok" },
          right: { title: "Cociente", text: "La potencia de un cociente es el cociente de las potencias.", math: ["(a : b)^n = a^n : b^n"], tone: "info" },
        },
        {
          kind: "example",
          lines: [
            { math: "(2 \\cdot 5)^3 = 2^3 \\cdot 5^3 = 8 \\cdot 125 = 1\\,000" },
            { math: "\\left(\\dfrac{6}{2}\\right)^2 = \\dfrac{6^2}{2^2} = \\dfrac{36}{4} = 9" },
          ],
        },
        {
          kind: "warning",
          text: "No se puede repartir la potencia en una suma o una resta: $(3 + 4)^2 = 49$, pero $3^2 + 4^2 = 25$.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "misma-base",
      type: "slide",
      help: [
        {
          label: "Contando factores",
          message: "$a^3 \\cdot a^2 = (a \\cdot a \\cdot a)(a \\cdot a) = a^5$: se cuentan los factores iguales.",
        },
        {
          label: "Cociente",
          message: "$a^5 : a^2$ tacha dos factores arriba y abajo: quedan $a^3$.",
        },
      ],
      title: "Potencias de la misma base",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "a^m \\cdot a^n = a^{m+n}", label: "producto: se suman exponentes" },
            { tex: "a^m : a^n = a^{m-n}", label: "cociente: se restan exponentes" },
            { tex: "(a^m)^n = a^{m \\cdot n}", label: "potencia de potencia: se multiplican" },
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "\\left(\\dfrac{2}{3}\\right)^3 \\cdot \\left(\\dfrac{2}{3}\\right)^2 = \\left(\\dfrac{2}{3}\\right)^5 = \\dfrac{32}{243}" },
            { math: "\\left[\\left(\\dfrac{1}{2}\\right)^2\\right]^3 = \\left(\\dfrac{1}{2}\\right)^6 = \\dfrac{1}{64}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-potencia",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Numerador y denominador",
          message: "$2^4 = 16$ y $3^4 = 81$.",
        },
      ],
      title: "Potencia de una fracción",
      question: "Calcula $\\left(\\dfrac{2}{3}\\right)^4$.",
      correctAnswers: ["16/81"],
      explanation: "$\\frac{2^4}{3^4} = \\frac{16}{81}$.",
    },
    {
      id: "check-signo",
      type: "predict",
      help: [
        {
          label: "Mira el exponente",
          message: "Con exponente impar, el resultado conserva el signo de la base.",
        },
      ],
      title: "El signo del resultado",
      question: "¿Cuál es el valor de $\\left(-\\dfrac{2}{5}\\right)^3$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$-\\dfrac{8}{125}$" },
        { id: "b", label: "$\\dfrac{8}{125}$", incorrectFeedback: "Tres factores negativos dan un resultado negativo." },
        { id: "c", label: "$-\\dfrac{6}{15}$", incorrectFeedback: "El exponente afecta al numerador y al denominador, no se multiplica por ellos." },
        { id: "d", label: "$-\\dfrac{8}{15}$", incorrectFeedback: "También el denominador se eleva al cubo: $5^3 = 125$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\frac{(-2)^3}{5^3} = -\\frac{8}{125}$.",
    },
    {
      id: "check-base",
      type: "fill_in_blank",
      help: [
        {
          label: "Misma base",
          message: "Al multiplicar potencias de la misma base se suman los exponentes: $3 + 4$.",
        },
      ],
      title: "Reduce a una potencia",
      question: "$\\left(\\dfrac{5}{2}\\right)^3 \\cdot \\left(\\dfrac{5}{2}\\right)^4 = \\left(\\dfrac{5}{2}\\right)^n$. ¿Cuánto vale $n$?",
      correctAnswers: ["7"],
      explanation: "$3 + 4 = 7$.",
    },
    {
      id: "check-cociente",
      type: "fill_in_blank",
      help: [
        {
          label: "Resta",
          message: "En un cociente se restan los exponentes: $9 - 6$.",
        },
      ],
      title: "Cociente de potencias",
      question: "$a^9 : a^6 = a^n$. ¿Cuánto vale $n$?",
      correctAnswers: ["3"],
      explanation: "$9 - 6 = 3$.",
    },
  ],
};
