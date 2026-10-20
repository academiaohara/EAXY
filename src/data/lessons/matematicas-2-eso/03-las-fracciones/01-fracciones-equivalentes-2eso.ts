import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_3_SUBTITLE } from "@/data/lessons/shared";

export const fraccionesEquivalentes2esoLesson: InteractiveLesson = {
  slug: "fracciones-equivalentes-2eso",
  title: "1. Fracciones equivalentes",
  subtitle: TEMA_2ESO_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "equivalentes",
      type: "slide",
      help: [
        {
          label: "Mismo trozo, distinto reparto",
          message: "Si partes la unidad en más trozos pero tomas proporcionalmente más, la porción coloreada es la misma.",
        },
        {
          label: "Mismo valor",
          message: "Si divides numerador entre denominador, las fracciones equivalentes dan el mismo decimal: $\\frac{2}{5} = \\frac{4}{10} = 0{,}4$.",
        },
      ],
      title: "Fracciones equivalentes",
      blocks: [
        {
          kind: "definition",
          text: "Dos fracciones son **equivalentes** cuando expresan la **misma porción** de la unidad: tienen el mismo valor.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{1}{2} = \\dfrac{3}{6}", note: "la mitad de la barra" },
            { math: "\\dfrac{2}{5} = \\dfrac{4}{10} = 0{,}4" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "fraccion-equivalente", params: { a: 1, b: 2, c: 3 } },
    },
    {
      id: "producto-cruzado",
      type: "slide",
      help: [
        {
          label: "Por qué funciona",
          message: "Si $\\frac{a}{b} = \\frac{c}{d}$, al llevarlas a denominador común $b \\cdot d$ los numeradores son $a \\cdot d$ y $c \\cdot b$, y tienen que coincidir.",
        },
        {
          label: "Un ejemplo",
          message: "$\\frac{2}{5}$ y $\\frac{6}{15}$: $2 \\cdot 15 = 30$ y $6 \\cdot 5 = 30$. Son equivalentes.",
        },
      ],
      title: "Cómo reconocerlas: productos cruzados",
      blocks: [
        {
          kind: "rule",
          title: "Propiedad fundamental",
          text: "Dos fracciones son equivalentes si los **productos cruzados** son iguales.",
          formula: "\\dfrac{a}{b} = \\dfrac{c}{d} \\iff a \\cdot d = b \\cdot c",
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{2}{5} \\text{ y } \\dfrac{6}{15}: \\quad 2 \\cdot 15 = 30 = 5 \\cdot 6", note: "equivalentes" },
            { math: "\\dfrac{3}{4} \\text{ y } \\dfrac{5}{6}: \\quad 3 \\cdot 6 = 18 \\ne 20 = 4 \\cdot 5", note: "no equivalentes" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "amplificar-simplificar",
      type: "slide",
      help: [
        {
          label: "Por qué no cambia el valor",
          message: "Multiplicar numerador y denominador por $n$ es multiplicar por $\\frac{n}{n} = 1$.",
        },
        {
          label: "Hasta cuándo simplificar",
          message: "Hasta que numerador y denominador no tengan divisores comunes aparte del $1$. Entonces la fracción es irreducible.",
        },
      ],
      title: "Amplificar y simplificar",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Amplificar",
            text: "**Multiplicar** numerador y denominador por el mismo número.",
            math: ["\\dfrac{2}{5} = \\dfrac{2 \\cdot 3}{5 \\cdot 3} = \\dfrac{6}{15}"],
            tone: "ok",
          },
          right: {
            title: "Simplificar",
            text: "**Dividir** numerador y denominador por el mismo número.",
            math: ["\\dfrac{16}{24} = \\dfrac{16 : 8}{24 : 8} = \\dfrac{2}{3}"],
            tone: "info",
          },
        },
        {
          kind: "rule",
          title: "Fracción irreducible",
          text: "Es la que **no se puede simplificar más**: se obtiene dividiendo entre el **m.c.d.** de numerador y denominador.",
        },
      ],
      visual: { kind: "tool", tool: "fraccion-equivalentes", params: { n: 2, d: 5, k: 2 }, hint: "Cambia el multiplicador y observa que el trozo coloreado no cambia." },
    },
    {
      id: "check-cruzado",
      type: "predict",
      help: [
        {
          label: "Multiplica en cruz",
          message: "Para cada opción calcula $2 \\cdot d$ y $5 \\cdot c$. Si coinciden, es equivalente a $\\frac{2}{5}$.",
        },
      ],
      title: "¿Cuál es equivalente?",
      question: "¿Cuál de estas fracciones es equivalente a $\\dfrac{2}{5}$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$\\dfrac{12}{30}$" },
        { id: "b", label: "$\\dfrac{4}{15}$", incorrectFeedback: "$2 \\cdot 15 = 30$ y $5 \\cdot 4 = 20$: no coinciden." },
        { id: "c", label: "$\\dfrac{5}{2}$", incorrectFeedback: "Es la inversa: vale $2{,}5$, no $0{,}4$." },
        { id: "d", label: "$\\dfrac{3}{6}$", incorrectFeedback: "$2 \\cdot 6 = 12$ y $5 \\cdot 3 = 15$: no coinciden." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$2 \\cdot 30 = 60 = 5 \\cdot 12$. Además $\\frac{12}{30} = \\frac{12 : 6}{30 : 6} = \\frac{2}{5}$.",
    },
    {
      id: "check-irreducible",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Busca el m.c.d.",
          message: "$18 = 2 \\cdot 3^2$ y $24 = 2^3 \\cdot 3$: el m.c.d. es $2 \\cdot 3 = 6$.",
        },
      ],
      title: "Fracción irreducible",
      question: "Escribe la fracción irreducible equivalente a $\\dfrac{18}{24}$.",
      correctAnswers: ["3/4"],
      explanation: "$\\text{m.c.d.}(18, 24) = 6$ y $\\frac{18 : 6}{24 : 6} = \\frac{3}{4}$.",
    },
    {
      id: "check-termino",
      type: "fill_in_blank",
      help: [
        {
          label: "Productos cruzados",
          message: "$\\frac{3}{4} = \\frac{x}{20}$ implica $3 \\cdot 20 = 4 \\cdot x$.",
        },
      ],
      title: "Término desconocido",
      question: "Halla $x$ para que $\\dfrac{3}{4} = \\dfrac{x}{20}$ (solo el número)",
      correctAnswers: ["15"],
      explanation: "$3 \\cdot 20 = 4 \\cdot x \\Rightarrow x = 60 : 4 = 15$. También: $20 = 4 \\cdot 5$, así que $x = 3 \\cdot 5$.",
    },
  ],
};
