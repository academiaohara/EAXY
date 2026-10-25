import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_1_SUBTITLE } from "@/data/lessons/shared";

export const potenciasExponenteNegativoCcss1Lesson: InteractiveLesson = {
  slug: "potencias-exponente-negativo-ccss1",
  title: "7. Potencias de exponente negativo",
  subtitle: TEMA_CCSS1_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "exponente-cero",
      type: "slide",
      help: [
        {
          label: "Un cociente de lo mismo",
          message: "Cualquier número dividido entre sí mismo vale $1$: $\\frac{a^3}{a^3} = 1$.",
        },
        {
          label: "Y la propiedad",
          message: "La propiedad del cociente dice que $\\frac{a^3}{a^3} = a^{3-3} = a^0$. Para que todo encaje, $a^0$ tiene que valer $1$.",
        },
      ],
      title: "Exponente cero",
      blocks: [
        {
          kind: "text",
          text: "La propiedad del cociente $a^m : a^n = a^{m-n}$ se pensó para $m > n$. ¿Qué pasa si $m = n$?",
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{a^3}{a^3} = a^{3-3} = a^0" },
            { math: "\\dfrac{a^3}{a^3} = 1" },
          ],
        },
        {
          kind: "rule",
          title: "Definición",
          text: "Todo número distinto de cero elevado a $0$ vale $1$.",
          formula: "a^0 = 1 \\quad (a \\ne 0)",
        },
      ],
      arrange: "stack",
    },
    {
      id: "exponente-negativo",
      type: "slide",
      help: [
        {
          label: "Con factores",
          message: "$\\frac{a^3}{a^5} = \\frac{a \\cdot a \\cdot a}{a \\cdot a \\cdot a \\cdot a \\cdot a} = \\frac{1}{a \\cdot a} = \\frac{1}{a^2}$.",
        },
        {
          label: "El signo menos",
          message: "El exponente negativo no hace negativo el resultado: $2^{-3} = \\frac{1}{8}$, positivo.",
        },
      ],
      title: "Exponente negativo",
      blocks: [
        {
          kind: "example",
          title: "Cociente con m < n",
          lines: [
            { math: "\\dfrac{a^3}{a^5} = a^{3-5} = a^{-2}" },
            { math: "\\dfrac{a^3}{a^5} = \\dfrac{1}{a^2}" },
          ],
        },
        {
          kind: "rule",
          title: "Definición",
          text: "Un exponente negativo indica la **inversa** de la potencia positiva.",
          formula: "a^{-n} = \\dfrac{1}{a^n}",
        },
        {
          kind: "example",
          lines: [
            { math: "3^{-2} = \\dfrac{1}{3^2} = \\dfrac{1}{9}" },
            { math: "\\left(\\dfrac{2}{3}\\right)^{-2} = \\left(\\dfrac{3}{2}\\right)^2 = \\dfrac{9}{4}", note: "se invierte la fracción" },
          ],
        },
        {
          kind: "warning",
          text: "$2^{-3}$ **no** es $-8$ ni $-\\frac{1}{8}$: el signo del exponente invierte, no cambia el signo del número.",
        },
      ],
      visual: { kind: "anim", scene: "potencias-exp-negativo", params: { a: 2 } },
    },
    {
      id: "propiedades",
      type: "slide",
      help: [
        {
          label: "Todo sigue valiendo",
          message: "Las propiedades de producto, cociente y potencia valen con cualquier exponente entero, también negativo o cero.",
        },
        {
          label: "Un ejemplo",
          message: "$4^3 \\cdot 4^{-2} = 4^{3-2} = 4^1 = 4$. Comprueba: $64 \\cdot \\frac{1}{16} = 4$.",
        },
      ],
      title: "Las propiedades siguen valiendo",
      blocks: [
        {
          kind: "text",
          text: "Con exponentes enteros cualesquiera se aplican las **mismas propiedades**: se suman exponentes al multiplicar, se restan al dividir y se multiplican en una potencia de potencia.",
        },
        {
          kind: "example",
          lines: [
            { math: "5^3 \\cdot 5^{-4} = 5^{-1} = \\dfrac{1}{5}" },
            { math: "\\dfrac{x^3}{x^{-2}} = x^{3-(-2)} = x^5" },
            { math: "(2^{-3})^2 = 2^{-6} = \\dfrac{1}{64}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-cero",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Una definición",
          message: "Un número distinto de cero elevado a $0$ vale siempre lo mismo, sea cual sea el número.",
        },
      ],
      title: "Exponente cero",
      question: "Calcula $\\left(\\dfrac{-7}{5}\\right)^0$ (solo el número)",
      correctAnswers: ["1"],
      explanation: "Cualquier base distinta de cero elevada a $0$ vale $1$.",
    },
    {
      id: "check-negativo",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Inversa",
          message: "$2^{-5} = \\frac{1}{2^5}$ y $2^5 = 32$.",
        },
      ],
      title: "Exponente negativo",
      question: "Escribe $2^{-5}$ como fracción.",
      correctAnswers: ["1/32"],
      explanation: "$2^{-5} = \\frac{1}{2^5} = \\frac{1}{32}$.",
    },
    {
      id: "check-fraccion",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Invierte la fracción",
          message: "Un exponente negativo invierte la fracción: $\\left(\\frac{3}{4}\\right)^{-2} = \\left(\\frac{4}{3}\\right)^{2}$.",
        },
      ],
      title: "Fracción con exponente negativo",
      question: "Calcula $\\left(\\dfrac{3}{4}\\right)^{-2}$.",
      correctAnswers: ["16/9"],
      explanation: "$\\left(\\frac{4}{3}\\right)^2 = \\frac{16}{9}$.",
    },
    {
      id: "check-reducir",
      type: "fill_in_blank",
      help: [
        {
          label: "Suma exponentes",
          message: "$a^2 \\cdot a^{-6} = a^{2 + (-6)}$.",
        },
      ],
      title: "Reduce a una potencia",
      question: "$a^2 \\cdot a^{-6} = a^n$. ¿Cuánto vale $n$? (solo el número)",
      correctAnswers: ["-4"],
      explanation: "$2 + (-6) = -4$, es decir, $a^{-4} = \\frac{1}{a^4}$.",
    },
    {
      id: "check-inversa",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$\\left(\\tfrac13\\right)^{-2} = 3^{2}$: el exponente negativo invierte la base." }],
      title: "Invertir la base",
      question: "Calcula $\\left(\\dfrac13\\right)^{-2}$. (solo el número)",
      correctAnswers: ["9"],
      explanation: "$\\left(\\dfrac13\\right)^{-2} = \\left(\\dfrac31\\right)^{2} = 3^2 = 9$.",
    },
  ],
};
