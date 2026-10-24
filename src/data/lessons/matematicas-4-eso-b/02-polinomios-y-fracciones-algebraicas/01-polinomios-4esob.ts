import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_5_SUBTITLE } from "@/data/lessons/shared";

export const polinomios4esobLesson: InteractiveLesson = {
  slug: "polinomios-4esob",
  title: "1. Polinomios: traducir, reducir y grado",
  subtitle: TEMA_4ESO_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "traducir",
      type: "slide",
      help: [
        {
          label: "Trozo a trozo",
          message: "Traduce cada parte del enunciado a una expresión corta y después únelas. Si algo se aplica a **varias cosas**, usa paréntesis.",
        },
        {
          label: "Tú eliges la letra",
          message: "La letra representa lo que no se conoce. Si hay varias cantidades relacionadas, expresa las demás en función de **una sola** letra.",
        },
      ],
      title: "Del enunciado al lenguaje algebraico",
      blocks: [
        {
          kind: "text",
          text: "Un **polinomio** es una **suma de monomios** (los términos). Aparecen al traducir enunciados:",
        },
        {
          kind: "example",
          lines: [
            { math: "\\text{Perímetro de un rectángulo: } 2x + 2y" },
            { math: "\\text{El cuadrado de un número más su triple: } x^2 + 3x" },
            { math: "\\text{Edades de Elvira y Lorena (le saca 3 años): } x + (x + 3) = 2x + 3" },
          ],
        },
        {
          kind: "warning",
          text: "«El doble de la edad del año pasado» es $2(x - 1)$, **no** $2x - 1$: el doble afecta a todo lo anterior, y por eso lleva paréntesis.",
        },
      ],
      visual: { kind: "anim", scene: "enunciado-expresion" },
    },
    {
      id: "check-triangulo",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Dos lados iguales",
          message: "Un isósceles tiene dos lados iguales ($y$ cada uno) y uno desigual ($x$). El perímetro es la suma de los tres.",
        },
      ],
      title: "Perímetro de un triángulo isósceles",
      question: "Llama $x$ al lado desigual de un triángulo isósceles e $y$ a cada uno de los lados iguales. ¿Cuál es su perímetro?",
      choices: [
        { id: "a", label: "$x + 2y$" },
        { id: "b", label: "$2x + y$", incorrectFeedback: "Los dos lados **iguales** son los de longitud $y$, así que $y$ se cuenta dos veces." },
        { id: "c", label: "$x + y$", incorrectFeedback: "Faltaría un lado: son tres, y dos de ellos miden $y$." },
        { id: "d", label: "$3xy$", incorrectFeedback: "El perímetro es una **suma** de lados, no un producto." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Lados: $x$, $y$, $y$. Perímetro: $x + y + y = x + 2y$.",
    },
    {
      id: "check-cilindro",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Dos bases y una lateral",
          message: "Área total $= 2 \\cdot \\pi r^2 + 2\\pi r \\cdot h$. Con $h = 4$: $2\\pi r^2 + 8\\pi r$.",
        },
      ],
      title: "Un cilindro de 4 m de altura",
      question: "¿Cuál es el área total de un cilindro de $4$ m de altura en función del radio $r$ de la base?",
      choices: [
        { id: "a", label: "$2\\pi r^2 + 8\\pi r$" },
        { id: "b", label: "$\\pi r^2 + 8\\pi r$", incorrectFeedback: "Hay **dos** bases circulares: $2\\pi r^2$." },
        { id: "c", label: "$2\\pi r^2 + 4\\pi r$", incorrectFeedback: "El área lateral es $2\\pi r \\cdot h = 2\\pi r \\cdot 4 = 8\\pi r$." },
        { id: "d", label: "$2\\pi r^2 \\cdot 8\\pi r$", incorrectFeedback: "Las áreas de las bases y de la superficie lateral se **suman**." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Dos bases: $2\\pi r^2$. Lateral: $2\\pi r \\cdot 4 = 8\\pi r$. Total: $2\\pi r^2 + 8\\pi r$.",
    },
    {
      id: "reducir",
      type: "slide",
      help: [
        {
          label: "Reducir",
          message: "Se agrupan los términos **semejantes** y se suman sus coeficientes. El resultado es la **forma reducida**.",
        },
        {
          label: "Orden",
          message: "Se escribe de mayor a menor grado, aunque el orden no cambia el valor.",
        },
      ],
      title: "Forma reducida y grado",
      blocks: [
        {
          kind: "example",
          lines: [
            { math: "5x^2 + 4x^4 - 2x^2 - 3x^4 + 1 = x^4 + 3x^2 + 1" },
            { math: "3x^3 - 2x^2 - 2x^3 + x - x^3 - 5 = -2x^2 + x - 5" },
          ],
        },
        {
          kind: "rule",
          title: "Grado de un polinomio",
          text: "El **grado** es el mayor de los grados de sus monomios, **una vez reducido**. Los términos de mayor grado pueden anularse.",
        },
        {
          kind: "warning",
          text: "$7x^3 - 5x^2 + 3x^3 - 2x - 10x^3 = -5x^2 - 2x$ tiene grado **2**, no 3: los términos de $x^3$ se anulan.",
        },
      ],
      visual: { kind: "tool", tool: "polinomio-explorador", initial: [0, 1, -2, 1], params: { a: 2 }, hint: "Pon el coeficiente de x³ a 0: el grado baja. Después anula también el de x²." },
    },
    {
      id: "check-reducir",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Agrupa",
          message: "$x^2$: $3 + 1 = 4$. $x$: $2 - 3 = -1$. Constante: $1$.",
        },
      ],
      title: "Reducir",
      question: "Reduce $3x^2 + 2x - 3x + 1 + x^2$.",
      choices: [
        { id: "a", label: "$4x^2 - x + 1$" },
        { id: "b", label: "$4x^2 + 5x + 1$", incorrectFeedback: "$2x - 3x = -x$, no $+5x$: la resta va con signo." },
        { id: "c", label: "$3x^2 - x + 2$", incorrectFeedback: "Los términos $3x^2$ y $x^2$ son semejantes y se suman: $4x^2$." },
        { id: "d", label: "$4x^3 - x + 1$", incorrectFeedback: "Al sumar monomios semejantes el exponente **no cambia**." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$3x^2 + x^2 = 4x^2$; $2x - 3x = -x$; queda $1$: $4x^2 - x + 1$.",
    },
    {
      id: "check-grado-reducido",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Reduce primero",
          message: "Términos en $x^3$: $7x^3 + 3x^3 - 10x^3 = 0$. Quedan $-5x^2 - 2x$.",
        },
      ],
      title: "Grado tras reducir",
      question: "¿Cuál es el grado de $7x^3 - 5x^2 + 3x^3 - 2x - 10x^3$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "Reducido: $-5x^2 - 2x$. Su grado es $2$.",
    },
    {
      id: "check-grado-2var",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Suma de exponentes",
          message: "$5xy^4$: $1 + 4 = 5$. $2y^2$: $2$. $3x^3y^3$: $3 + 3 = 6$. $-2xy$: $2$.",
        },
      ],
      title: "Con dos letras",
      question: "¿Cuál es el grado de $5xy^4 + 2y^2 + 3x^3y^3 - 2xy$? (solo el número)",
      correctAnswers: ["6"],
      explanation: "Los grados de los términos son $5$, $2$, $6$ y $2$. El mayor es $6$ ($3x^3y^3$).",
    },
  ],
};
