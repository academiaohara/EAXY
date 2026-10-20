import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const divisionFracciones3esoLesson: InteractiveLesson = {
  slug: "division-fracciones-3eso",
  title: "4. División de fracciones",
  subtitle: TEMA_3ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "inversa",
      type: "slide",
      help: [
        {
          label: "Por qué se llama inversa",
          message: "Una fracción por su inversa da $1$: $\\frac{5}{7} \\cdot \\frac{7}{5} = 1$, igual que $2 \\cdot \\frac{1}{2} = 1$.",
        },
        {
          label: "Inversa de un entero",
          message: "La inversa de $3$ es $\\frac{1}{3}$, porque $3 = \\frac{3}{1}$.",
        },
      ],
      title: "Dividir es multiplicar por la inversa",
      blocks: [
        {
          kind: "definition",
          text: "La **inversa** de $\\frac{a}{b}$ es $\\frac{b}{a}$, porque $\\frac{a}{b} \\cdot \\frac{b}{a} = 1$. Dividir entre una fracción es **multiplicar por su inversa**.",
        },
        {
          kind: "rule",
          formula: "\\dfrac{a}{b} : \\dfrac{c}{d} = \\dfrac{a}{b} \\cdot \\dfrac{d}{c} = \\dfrac{a \\cdot d}{b \\cdot c}",
        },
        {
          kind: "text",
          text: "En la práctica: se multiplican los números de los **extremos** para el numerador y los **medios** para el denominador.",
        },
      ],
      visual: { kind: "anim", scene: "simplificar-factores", params: { a: 4, b: 8, c: 3, d: 4, inv: true } },
    },
    {
      id: "contar",
      type: "slide",
      help: [
        {
          label: "Cuántas veces cabe",
          message: "$\\frac{1}{2} : \\frac{1}{8}$ pregunta cuántos octavos caben en medio: caben $4$.",
        },
        {
          label: "Dividir hace crecer",
          message: "Dividir entre una fracción menor que $1$ da un resultado mayor que el dividendo.",
        },
      ],
      title: "Un problema de verdad",
      blocks: [
        {
          kind: "example",
          title: "Frascos de perfume",
          lines: [
            { math: "\\text{Cada frasco} = \\dfrac{3}{20}\\ \\text{L}\\quad;\\quad \\text{Bidón} = \\dfrac{9}{2}\\ \\text{L}" },
            { math: "\\dfrac{9}{2} : \\dfrac{3}{20} = \\dfrac{9}{2} \\cdot \\dfrac{20}{3} = \\dfrac{180}{6} = 30" },
            { math: "\\text{Se llenan } 30\\ \\text{frascos}" },
          ],
        },
        {
          kind: "warning",
          text: "Se da la vuelta a la **segunda** fracción (el divisor), nunca a la primera.",
        },
      ],
      visual: { kind: "anim", scene: "fraccion-cabe", params: { a: 1, b: 2, c: 1, d: 8 } },
    },
    {
      id: "check-division",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Da la vuelta al divisor",
          message: "$\\frac{3}{4} : \\frac{9}{8} = \\frac{3}{4} \\cdot \\frac{8}{9}$. Después tacha factores comunes.",
        },
      ],
      title: "Dividir fracciones",
      question: "Calcula $\\dfrac{3}{4} : \\dfrac{9}{8}$ y da la fracción irreducible.",
      correctAnswers: ["2/3"],
      explanation: "$\\frac{3 \\cdot 8}{4 \\cdot 9} = \\frac{24}{36} = \\frac{2}{3}$.",
    },
    {
      id: "check-entero",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Divisor entero",
          message: "Dividir entre $3$ es multiplicar por $\\frac{1}{3}$: $\\frac{6}{11} : 3 = \\frac{6}{11} \\cdot \\frac{1}{3}$.",
        },
      ],
      title: "Fracción entre un entero",
      question: "Calcula $\\dfrac{6}{11} : 3$ y da la fracción irreducible.",
      correctAnswers: ["2/11"],
      explanation: "$\\frac{6}{33} = \\frac{2}{11}$.",
    },
    {
      id: "check-problema",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "¿Qué operación?",
          message: "Quieres saber cuántos envases de $\\frac{3}{4}$ de litro salen de $9$ litros: es una división.",
        },
      ],
      title: "Cuántas botellas",
      question: "Con un depósito de $9$ litros se llenan botellas de $\\dfrac{3}{4}$ de litro. ¿Cuántas botellas se llenan? (solo el número)",
      correctAnswers: ["12"],
      explanation: "$9 : \\frac{3}{4} = 9 \\cdot \\frac{4}{3} = 12$ botellas.",
    },
    {
      id: "check-signos",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Signos",
          message: "Negativo entre positivo da negativo. Después, da la vuelta al divisor.",
        },
      ],
      title: "Con signo negativo",
      question: "Calcula $\\left(-\\dfrac{4}{5}\\right) : \\dfrac{8}{15}$ y da la fracción irreducible.",
      correctAnswers: ["-3/2", "-3 / 2"],
      explanation: "$-\\frac{4}{5} \\cdot \\frac{15}{8} = -\\frac{60}{40} = -\\frac{3}{2}$.",
    },
  ],
};
