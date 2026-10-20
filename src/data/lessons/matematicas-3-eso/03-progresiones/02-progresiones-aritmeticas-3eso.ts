import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_3_SUBTITLE } from "@/data/lessons/shared";

export const progresionesAritmeticas3esoLesson: InteractiveLesson = {
  slug: "progresiones-aritmeticas-3eso",
  title: "2. Progresiones aritméticas",
  subtitle: TEMA_3ESO_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [
        {
          label: "Diferencia constante",
          message: "Si restas cada término al siguiente y siempre obtienes lo mismo, es una progresión aritmética.",
        },
        {
          label: "Puede ser negativa",
          message: "Si $d < 0$ la progresión decrece: $9, 7, 5, 3, \\dots$ tiene $d = -2$.",
        },
      ],
      title: "Sumar siempre lo mismo",
      blocks: [
        {
          kind: "definition",
          text: "Una **progresión aritmética** es una sucesión en la que se pasa de cada término al siguiente **sumando un mismo número**, positivo o negativo, llamado **diferencia** $d$.",
        },
        {
          kind: "example",
          lines: [
            { math: "2, 5, 8, 11, 14, \\dots \\quad d = 3" },
            { math: "9, 7, 5, 3, 1, -1, \\dots \\quad d = -2" },
            { math: "5{,}83;\\ 5{,}87;\\ 5{,}91;\\ \\dots \\quad d = 0{,}04" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "progresion-pasos", params: { a: 2, b: 3, c: 5, d: 100, prog: "aritmetica" } },
    },
    {
      id: "termino-general",
      type: "slide",
      help: [
        {
          label: "Cuenta los pasos",
          message: "De $a_1$ a $a_{100}$ hay $99$ pasos, no $100$: el primer término no cuenta como paso.",
        },
        {
          label: "Otra forma",
          message: "Se puede escribir como $a_n = d \\cdot n + (a_1 - d)$: una función de $n$ de primer grado.",
        },
      ],
      title: "Término general de una progresión aritmética",
      blocks: [
        {
          kind: "rule",
          text: "Para pasar de $a_1$ a $a_n$ se dan $n-1$ pasos de amplitud $d$:",
          formula: "a_n = a_1 + (n - 1) \\cdot d",
        },
        {
          kind: "example",
          title: "1, 6, 11, 16, … (a₁ = 1, d = 5)",
          lines: [
            { math: "a_n = 1 + (n - 1) \\cdot 5 = 5n - 4" },
            { math: "a_{100} = 5 \\cdot 100 - 4 = 496" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "hallar-d",
      type: "slide",
      help: [
        {
          label: "Pasos entre dos términos",
          message: "De $a_2$ a $a_5$ hay $3$ pasos: $5 - 2$. Por eso $a_5 - a_2 = 3d$.",
        },
        {
          label: "Primer término",
          message: "Una vez tienes $d$, puedes retroceder hasta $a_1$ restando $d$ las veces necesarias.",
        },
      ],
      title: "Conociendo dos términos",
      blocks: [
        {
          kind: "text",
          text: "Si se conocen dos términos $a_p$ y $a_q$, entre ellos hay $q - p$ pasos de amplitud $d$:",
        },
        {
          kind: "formula",
          tex: "d = \\dfrac{a_q - a_p}{q - p}",
        },
        {
          kind: "example",
          title: "a₂ = 10 y a₅ = 19",
          lines: [
            { math: "d = \\dfrac{19 - 10}{5 - 2} = 3" },
            { math: "a_1 = a_2 - d = 7" },
            { math: "a_n = 7 + (n - 1) \\cdot 3 = 3n + 4" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-general",
      type: "predict",
      help: [
        {
          label: "Identifica a₁ y d",
          message: "Aquí $a_1 = -8$ y cada término se obtiene restando $4$: $d = -4$.",
        },
      ],
      title: "Término general",
      question: "¿Cuál es el término general de la progresión aritmética $-8, -12, -16, -20, \\dots$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$a_n = -4n - 4$" },
        { id: "b", label: "$a_n = -4n - 8$", incorrectFeedback: "Daría $a_1 = -12$, pero el primer término es $-8$." },
        { id: "c", label: "$a_n = 4n - 12$", incorrectFeedback: "La progresión decrece: $d = -4$, no $4$." },
        { id: "d", label: "$a_n = -8n$", incorrectFeedback: "Daría $-8, -16, -24, \\dots$: $d$ sería $-8$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$a_n = -8 + (n - 1) \\cdot (-4) = -4n - 4$.",
    },
    {
      id: "check-termino",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Aplica la fórmula",
          message: "$a_{20} = a_1 + 19 \\cdot d$ con $a_1 = 11$ y $d = 3$.",
        },
      ],
      title: "Un término lejano",
      question: "En una progresión aritmética $a_1 = 11$ y $d = 3$. Calcula $a_{20}$ (solo el número).",
      correctAnswers: ["68"],
      explanation: "$a_{20} = 11 + 19 \\cdot 3 = 68$.",
    },
    {
      id: "check-diferencia",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Cuántos pasos hay",
          message: "De $a_1$ a $a_{10}$ hay $9$ pasos: $34 = 7 + 9d$.",
        },
      ],
      title: "Hallar la diferencia",
      question: "En una progresión aritmética $a_1 = 7$ y $a_{10} = 34$. ¿Cuánto vale la diferencia $d$? (solo el número)",
      correctAnswers: ["3"],
      explanation: "$d = \\frac{34 - 7}{10 - 1} = 3$.",
    },
    {
      id: "check-problema",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Una progresión",
          message: "La distancia al escenario aumenta lo mismo de fila en fila: es una progresión aritmética. Entre la fila $1$ y la $8$ hay $7$ pasos.",
        },
      ],
      title: "Las filas del teatro",
      question: "En un teatro, la primera fila dista $4{,}5$ m del escenario y la octava, $9{,}75$ m. ¿Cuántos metros hay entre dos filas consecutivas? (solo el número)",
      correctAnswers: ["0,75", "0.75"],
      explanation: "$d = \\frac{9{,}75 - 4{,}5}{8 - 1} = \\frac{5{,}25}{7} = 0{,}75$ m.",
    },
  ],
};
