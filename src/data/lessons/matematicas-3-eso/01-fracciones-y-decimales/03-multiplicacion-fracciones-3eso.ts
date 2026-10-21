import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const multiplicacionFracciones3esoLesson: InteractiveLesson = {
  slug: "multiplicacion-fracciones-3eso",
  title: "3. Multiplicación de fracciones",
  subtitle: TEMA_3ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "regla",
      type: "slide",
      help: [
        {
          label: "Una parte de una parte",
          message: "Multiplicar $\\frac{1}{2} \\cdot \\frac{1}{3}$ es tomar la mitad de un tercio: un sexto.",
        },
        {
          label: "No hace falta común denominador",
          message: "Al multiplicar no se busca m.c.m.: se multiplica arriba con arriba y abajo con abajo.",
        },
      ],
      title: "Numerador por numerador, denominador por denominador",
      blocks: [
        {
          kind: "rule",
          text: "El producto de dos fracciones tiene por numerador el producto de numeradores y por denominador el producto de denominadores.",
          formula: "\\dfrac{a}{b} \\cdot \\dfrac{c}{d} = \\dfrac{a \\cdot c}{b \\cdot d}",
        },
        {
          kind: "example",
          title: "4/8 · 3/4",
          lines: [
            { math: "\\dfrac{4}{8} \\cdot \\dfrac{3}{4} = \\dfrac{12}{32}" },
            { math: "\\dfrac{12}{32} = \\dfrac{6}{16} = \\dfrac{3}{8}", note: "simplificando" },
          ],
        },
      ],
      visual: { kind: "tool", tool: "fraction-product", initial: [1, 2, 3, 4], hint: "Cambia las fracciones y observa que la zona solapada es el producto." },
    },
    {
      id: "simplificar-antes",
      type: "slide",
      help: [
        {
          label: "Factoriza",
          message: "Si descompones numeradores y denominadores en factores primos, los factores repetidos arriba y abajo se tachan por parejas.",
        },
        {
          label: "Por qué se puede",
          message: "Tachar un factor común arriba y abajo es dividir por $\\frac{f}{f} = 1$: no cambia el valor.",
        },
      ],
      title: "Simplificar antes de multiplicar",
      blocks: [
        {
          kind: "text",
          text: "Es más cómodo **simplificar antes**: se pueden tachar factores comunes entre **cualquier numerador y cualquier denominador**.",
        },
        {
          kind: "example",
          title: "4/8 · 3/4",
          lines: [
            { math: "\\dfrac{4}{8} \\cdot \\dfrac{3}{4} = \\dfrac{2^2}{2^3} \\cdot \\dfrac{3}{2^2} = \\dfrac{3}{2^3} = \\dfrac{3}{8}" },
          ],
        },
        {
          kind: "warning",
          text: "Solo se tacha en **productos**. En una suma como $\\frac{2+3}{2+5}$ no se puede tachar nada.",
        },
      ],
      visual: { kind: "anim", scene: "simplificar-factores", params: { a: 4, b: 8, c: 3, d: 4 } },
    },
    {
      id: "negativas-enteros",
      type: "slide",
      help: [
        {
          label: "Regla de los signos",
          message: "Igual que con enteros: signos iguales dan positivo; signos distintos, negativo.",
        },
        {
          label: "Entero por fracción",
          message: "Un entero es una fracción con denominador $1$: $6 \\cdot \\frac{5}{9} = \\frac{6}{1} \\cdot \\frac{5}{9}$.",
        },
      ],
      title: "Con signos y con números enteros",
      blocks: [
        {
          kind: "example",
          lines: [
            { math: "\\left(-\\dfrac{3}{10}\\right) \\cdot \\dfrac{5}{6} = -\\dfrac{15}{60} = -\\dfrac{1}{4}" },
            { math: "6 \\cdot \\dfrac{5}{9} = \\dfrac{30}{9} = \\dfrac{10}{3}" },
            { math: "\\left(-\\dfrac{2}{3}\\right) \\cdot \\left(-\\dfrac{9}{4}\\right) = \\dfrac{3}{2}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-producto",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Tacha antes",
          message: "El $9$ y el $6$ comparten el factor $3$; el $14$ y el $7$ comparten el factor $7$.",
        },
      ],
      title: "Producto simplificado",
      question: "Calcula $\\dfrac{9}{14} \\cdot \\dfrac{7}{6}$ y da la fracción irreducible.",
      correctAnswers: ["3/4"],
      explanation: "$\\frac{9 \\cdot 7}{14 \\cdot 6} = \\frac{63}{84} = \\frac{3}{4}$.",
    },
    {
      id: "check-signo",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Primero el signo",
          message: "Un factor negativo y otro positivo: el resultado es negativo.",
        },
      ],
      title: "Producto con signo",
      question: "Calcula $\\left(-\\dfrac{5}{8}\\right) \\cdot \\dfrac{4}{15}$ y da la fracción irreducible.",
      correctAnswers: ["-1/6", "-1 / 6"],
      explanation: "$-\\frac{20}{120} = -\\frac{1}{6}$.",
    },
    {
      id: "check-entero",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Entero como fracción",
          message: "$12 \\cdot \\frac{5}{6} = \\frac{12 \\cdot 5}{6}$: divide primero $12$ entre $6$.",
        },
      ],
      title: "Entero por fracción",
      question: "Calcula $12 \\cdot \\dfrac{5}{6}$ (solo el número).",
      correctAnswers: ["10"],
      explanation: "$\\frac{60}{6} = 10$.",
    },
  ],
};
