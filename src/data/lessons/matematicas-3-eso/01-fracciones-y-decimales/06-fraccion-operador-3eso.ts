import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const fraccionOperador3esoLesson: InteractiveLesson = {
  slug: "fraccion-operador-3eso",
  title: "6. La fracción como operador",
  subtitle: TEMA_3ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "parte-de-cantidad",
      type: "slide",
      help: [
        {
          label: "En dos tiempos",
          message: "Primero divides la cantidad entre el denominador (valor de cada parte) y luego multiplicas por el numerador (partes que tomas).",
        },
        {
          label: "Comprobación",
          message: "Si la fracción es menor que $1$, el resultado es menor que la cantidad total.",
        },
      ],
      title: "Una fracción de una cantidad",
      blocks: [
        {
          kind: "rule",
          text: "La parte $P$ que corresponde a la fracción $\\frac{a}{b}$ de una cantidad $C$ es:",
          formula: "P = \\dfrac{a}{b} \\cdot C",
        },
        {
          kind: "example",
          title: "Los 2/3 de 600 €",
          lines: [
            { math: "600 : 3 = 200\\ \\text{€ cada tercio}" },
            { math: "\\dfrac{2}{3} \\cdot 600 = 2 \\cdot 200 = 400\\ \\text{€}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "fraccion-operador", params: { a: 600, b: 3, c: 2 } },
    },
    {
      id: "total-conocida-parte",
      type: "slide",
      help: [
        {
          label: "Despeja",
          message: "Si $P = \\frac{a}{b} \\cdot C$, multiplicas ambos lados por la inversa y queda $C = P \\cdot \\frac{b}{a}$.",
        },
        {
          label: "Con una parte",
          message: "Si $7$ de las $20$ partes valen $37\\,800$ €, una parte vale $37\\,800 : 7$ y el total es $20$ veces eso.",
        },
      ],
      title: "Conocida la parte, hallar el total",
      blocks: [
        {
          kind: "rule",
          formula: "C = P \\cdot \\dfrac{b}{a}",
        },
        {
          kind: "example",
          title: "Ramiro posee 7/20 de una empresa",
          lines: [
            { math: "P = 37\\,800\\ \\text{€ (su parte)}" },
            { math: "C = 37\\,800 \\cdot \\dfrac{20}{7} = 5\\,400 \\cdot 20 = 108\\,000\\ \\text{€}" },
          ],
        },
        {
          kind: "warning",
          text: "Aquí se multiplica por la fracción **inversa**. Las partes de un todo siempre suman $1$.",
        },
      ],
      visual: { kind: "anim", scene: "fraccion-total", params: { a: 7, b: 20, c: 37800 } },
    },
    {
      id: "fraccion-de-fraccion",
      type: "slide",
      help: [
        {
          label: "Lo que queda",
          message: "Si gastas $\\frac{3}{8}$ del dinero, te quedan $1 - \\frac{3}{8} = \\frac{5}{8}$.",
        },
        {
          label: "Sobre qué se calcula",
          message: "La segunda fracción se aplica a lo que **queda**, no al total: por eso se multiplica $\\frac{5}{12}$ por $\\frac{5}{8}$.",
        },
      ],
      title: "Una fracción de otra fracción",
      blocks: [
        {
          kind: "example",
          title: "Marta gasta 3/8 y luego 5/12 de lo que le queda",
          lines: [
            { math: "\\text{Le queda } 1 - \\dfrac{3}{8} = \\dfrac{5}{8}" },
            { math: "\\text{Gasta después } \\dfrac{5}{12} \\cdot \\dfrac{5}{8} = \\dfrac{25}{96}" },
            { math: "\\text{Total gastado } \\dfrac{36}{96} + \\dfrac{25}{96} = \\dfrac{61}{96}\\ \\to\\ \\text{queda } \\dfrac{35}{96}" },
          ],
        },
        {
          kind: "warning",
          text: "$\\frac{5}{12}$ no es una parte del total, sino de lo que **quedaba**.",
        },
      ],
      visual: { kind: "anim", scene: "fraccion-gasto-resto", params: { a: 3, b: 8, c: 5, d: 12 } },
    },
    {
      id: "check-parte",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Divide y multiplica",
          message: "$216 : 9 = 24$ km por cada novena parte. Toma $5$ de ellas.",
        },
      ],
      title: "Kilómetros recorridos",
      question: "Un ciclista ha recorrido los $\\dfrac{5}{9}$ de una etapa de $216$ km. ¿Cuántos kilómetros lleva? (solo el número)",
      correctAnswers: ["120"],
      explanation: "$\\frac{5}{9} \\cdot 216 = 5 \\cdot 24 = 120$ km.",
    },
    {
      id: "check-total",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Cuánto vale una parte",
          message: "Si $3$ partes de $11$ valen $3\\,900$ €, una parte vale $3\\,900 : 3 = 1\\,300$ €.",
        },
      ],
      title: "Los ahorros",
      question: "He sacado del banco $3\\,900$ €, que son los $\\dfrac{3}{11}$ de mis ahorros. ¿A cuánto ascienden mis ahorros? (solo el número)",
      correctAnswers: ["14300", "14 300", "14.300"],
      explanation: "$3\\,900 \\cdot \\frac{11}{3} = 1\\,300 \\cdot 11 = 14\\,300$ €.",
    },
    {
      id: "check-resto",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Gasta y queda",
          message: "Gasta $\\frac{1}{4}$ y luego $\\frac{1}{3}$ de lo que le quedaba. Primero le queda $\\frac{3}{4}$.",
        },
      ],
      title: "Qué fracción queda",
      question: "Una persona gasta $\\dfrac{1}{4}$ de sus ahorros y después $\\dfrac{1}{3}$ de lo que le quedaba. ¿Qué fracción de los ahorros le queda?",
      correctAnswers: ["1/2"],
      explanation: "Le quedan $\\frac{3}{4}$; gasta $\\frac{1}{3}$ de eso y le quedan $\\frac{2}{3} \\cdot \\frac{3}{4} = \\frac{1}{2}$.",
    },
  ],
};
