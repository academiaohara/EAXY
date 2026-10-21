import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const racionalesEquivalentes3esoLesson: InteractiveLesson = {
  slug: "racionales-equivalentes-3eso",
  title: "1. Números racionales y fracciones equivalentes",
  subtitle: TEMA_3ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "racionales",
      type: "slide",
      help: [
        {
          label: "¿Todo número es fracción?",
          message: "Todo entero es una fracción con denominador $1$: $5 = \\frac{5}{1}$. Por eso $\\mathbb{Z} \\subset \\mathbb{Q}$.",
        },
        {
          label: "Dos tipos",
          message: "Si el numerador es múltiplo del denominador, el cociente es entero ($\\frac{6}{3} = 2$). Si no, es un número fraccionario ($\\frac{17}{2} = 8{,}5$).",
        },
      ],
      title: "Fracciones y números racionales",
      blocks: [
        {
          kind: "definition",
          text: "Una **fracción** es el cociente indicado de dos números **enteros**. El conjunto de todos los números que se pueden escribir como fracción es el de los **racionales**, $\\mathbb{Q}$.",
        },
        {
          kind: "compare",
          left: { title: "Cociente entero", text: "El numerador es múltiplo del denominador.", math: ["\\dfrac{6}{3} = 2", "\\dfrac{-12}{3} = -4"], tone: "ok" },
          right: { title: "Número fraccionario", text: "La división no es exacta.", math: ["\\dfrac{17}{2} = 8 + \\dfrac{1}{2}", "\\dfrac{-13}{5} = -2 - \\dfrac{3}{5}"], tone: "info" },
        },
      ],
      visual: { kind: "tool", tool: "fraccion-explorador", params: { n: 7, d: 4 }, hint: "Cambia numerador y denominador y observa cuándo la fracción vale más que 1." },
    },
    {
      id: "equivalentes",
      type: "slide",
      help: [
        {
          label: "Mismo número, muchas fracciones",
          message: "$\\frac{3}{5} = \\frac{6}{10} = \\frac{9}{15} = \\dots$ son formas distintas de escribir un mismo número racional.",
        },
        {
          label: "Comprobación rápida",
          message: "Si los productos cruzados coinciden, son equivalentes: $18 \\cdot 35 = 630 = 30 \\cdot 21$.",
        },
      ],
      title: "Simplificar y reconocer fracciones equivalentes",
      blocks: [
        {
          kind: "rule",
          title: "Simplificar",
          text: "Se **divide** numerador y denominador por un divisor común. Cuando ya no se puede, la fracción es **irreducible**.",
          formula: "\\dfrac{3\\,000}{4\\,500} = \\dfrac{30}{45} = \\dfrac{2}{3}",
        },
        {
          kind: "text",
          text: "Dos fracciones son **equivalentes** si al simplificarlas dan la misma fracción irreducible; o, de forma equivalente, si sus **productos cruzados** coinciden.",
        },
        {
          kind: "example",
          title: "¿18/30 y 21/35?",
          lines: [
            { math: "\\dfrac{18}{30} = \\dfrac{3}{5}", note: "÷ 6" },
            { math: "\\dfrac{21}{35} = \\dfrac{3}{5}", note: "÷ 7" },
            { math: "\\text{Son equivalentes}" },
          ],
        },
      ],
      visual: { kind: "tool", tool: "fraccion-equivalentes", params: { n: 3, d: 5, k: 2 }, hint: "Sube el multiplicador: la zona coloreada no cambia." },
    },
    {
      id: "comparar",
      type: "slide",
      help: [
        {
          label: "Con un caso fácil",
          message: "Con el mismo denominador, basta comparar numeradores: $\\frac{5}{8} > \\frac{3}{8}$.",
        },
        {
          label: "Con negativos",
          message: "Entre dos fracciones negativas es menor la que tiene mayor valor absoluto: $-\\frac{3}{4} < -\\frac{1}{2}$.",
        },
      ],
      title: "Comparar fracciones",
      blocks: [
        {
          kind: "steps",
          title: "Reducir a común denominador",
          items: [
            "Calcula el **m.c.m.** de los denominadores.",
            "Sustituye cada fracción por otra equivalente con ese denominador.",
            "Ordena según los **numeradores**.",
          ],
        },
        {
          kind: "example",
          title: "Ordena 7/12, 5/8 y 9/16",
          lines: [
            { math: "\\text{m.c.m.}(12, 8, 16) = 48" },
            { math: "\\dfrac{7}{12} = \\dfrac{28}{48},\\quad \\dfrac{5}{8} = \\dfrac{30}{48},\\quad \\dfrac{9}{16} = \\dfrac{27}{48}" },
            { math: "\\dfrac{9}{16} < \\dfrac{7}{12} < \\dfrac{5}{8}" },
          ],
        },
        {
          kind: "warning",
          text: "Más denominador no significa más grande: $\\frac{1}{8}$ es menor que $\\frac{1}{3}$ porque las partes son más pequeñas.",
        },
      ],
      visual: { kind: "anim", scene: "fracciones-orden" },
    },
    {
      id: "check-equivalente",
      type: "predict",
      help: [
        {
          label: "Productos cruzados",
          message: "Para cada opción calcula $4 \\cdot d$ y $7 \\cdot n$ y mira si coinciden.",
        },
      ],
      title: "¿Cuál es equivalente?",
      question: "¿Cuál de estas fracciones es equivalente a $\\dfrac{4}{7}$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$\\dfrac{20}{35}$" },
        { id: "b", label: "$\\dfrac{8}{15}$", incorrectFeedback: "$4 \\cdot 15 = 60$ y $7 \\cdot 8 = 56$: no coinciden." },
        { id: "c", label: "$\\dfrac{12}{28}$", incorrectFeedback: "Se simplifica a $\\frac{3}{7}$, no a $\\frac{4}{7}$." },
        { id: "d", label: "$\\dfrac{7}{4}$", incorrectFeedback: "Es la inversa: vale más que $1$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\frac{20}{35} = \\frac{20 : 5}{35 : 5} = \\frac{4}{7}$.",
    },
    {
      id: "check-irreducible",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Divisor común",
          message: "$54$ y $72$ son múltiplos de $18$. Divide ambos entre el m.c.d.",
        },
      ],
      title: "Fracción irreducible",
      question: "Simplifica $\\dfrac{54}{72}$ hasta la fracción irreducible.",
      correctAnswers: ["3/4"],
      explanation: "$\\text{m.c.d.}(54, 72) = 18$, y $\\frac{54 : 18}{72 : 18} = \\frac{3}{4}$.",
    },
    {
      id: "check-negativas",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "El signo",
          message: "El signo menos puede ir en el numerador o delante: $\\frac{-12}{-18}$ es positiva porque dividir dos negativos da positivo.",
        },
      ],
      title: "Con signos",
      question: "Simplifica $\\dfrac{-12}{-18}$ y escribe la fracción irreducible.",
      correctAnswers: ["2/3"],
      explanation: "Negativo entre negativo es positivo: $\\frac{12}{18} = \\frac{2}{3}$.",
    },
    {
      id: "check-ordenar",
      type: "predict",
      help: [
        {
          label: "Denominador común",
          message: "$\\text{m.c.m.}(6, 4, 3) = 12$: pasa las tres a doceavos.",
        },
      ],
      title: "La mayor de tres",
      question: "¿Cuál es la mayor de estas fracciones: $\\dfrac{5}{6}$, $\\dfrac{3}{4}$ y $\\dfrac{2}{3}$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$\\dfrac{5}{6}$" },
        { id: "b", label: "$\\dfrac{3}{4}$", incorrectFeedback: "En doceavos vale $\\frac{9}{12}$, menos que $\\frac{10}{12}$." },
        { id: "c", label: "$\\dfrac{2}{3}$", incorrectFeedback: "En doceavos vale $\\frac{8}{12}$: es la menor." },
      ],
      correctChoiceId: "a",
      explanation: "En doceavos: $\\frac{10}{12} > \\frac{9}{12} > \\frac{8}{12}$.",
    },
  ],
};
