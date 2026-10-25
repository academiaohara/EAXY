import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_3_SUBTITLE } from "@/data/lessons/shared";

export const limitesCalculo1bachLesson: InteractiveLesson = {
  slug: "limites-calculo-1bach",
  title: "8. Cálculo de límites de sucesiones",
  subtitle: TEMA_1BACH_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "basicos",
      type: "slide",
      help: [{ label: "Por qué", message: "Cuando $n$ es enorme, $n^2$ es mucho mayor que $n$, y un número fijo como $3$ o $5$ apenas importa frente a ellos." }],
      title: "Los límites básicos",
      blocks: [
        { kind: "facts", items: [
          { tex: "\\lim c = c", label: "una constante" },
          { tex: "\\lim n^k = +\\infty\\ (k > 0)", label: "potencias de n" },
          { tex: "\\lim \\dfrac{1}{n^k} = 0\\ (k > 0)", label: "inversas" },
        ] },
        { kind: "rule", title: "Operaciones", text: "El límite de una **suma**, un **producto** o un **cociente** (con denominador no nulo en el límite) es la suma, el producto o el cociente de los límites." },
      ],
      arrange: "stack",
    },
    {
      id: "cociente",
      type: "slide",
      help: [{ label: "Dividir arriba y abajo", message: "Se divide numerador y denominador entre la mayor potencia de $n$: los términos $\\frac{k}{n^j}$ que quedan tienden a $0$." }],
      title: "Cociente de polinomios en n",
      blocks: [
        { kind: "facts", items: [
          { tex: "p < q", label: "grado del numerador < denominador → límite 0" },
          { tex: "p = q", label: "mismo grado → cociente de los coeficientes principales" },
          { tex: "p > q", label: "grado del numerador > denominador → ±∞" },
        ] },
        { kind: "example", title: "(3n + 1)/(2n + 5)", lines: [
          { math: "\\dfrac{3n + 1}{2n + 5} = \\dfrac{3 + \\frac{1}{n}}{2 + \\frac{5}{n}} \\longrightarrow \\dfrac{3}{2}" },
        ] },
      ],
      visual: { kind: "tool", tool: "limite-racional-explorador", initial: [1, 3, 1, 2], hint: "Cambia los grados y mira la tabla con n = 10, 1 000 y 1 000 000: ¿hacia qué valor se asienta?" },
    },
    {
      id: "check-igual",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Mismo grado: cociente de los coeficientes de $n^2$." }],
      title: "Mismo grado",
      question: "Calcula $\\lim_{n\\to\\infty}\\dfrac{5n^2 + 1}{2n^2 - 3}$. (con coma decimal)",
      correctAnswers: ["2,5", "2.5", "5/2"],
      explanation: "Numerador y denominador son de grado $2$: el límite es $\\frac{5}{2} = 2{,}5$.",
    },
    {
      id: "check-menor",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "El numerador es de grado $1$ y el denominador de grado $2$." }],
      title: "Grado menor arriba",
      question: "Calcula $\\lim_{n\\to\\infty}\\dfrac{n + 1}{n^2 + 3}$.",
      choices: [
        { id: "a", label: "$0$" },
        { id: "b", label: "$1$", incorrectFeedback: "Solo valdría $1$ si los dos tuvieran el mismo grado y coeficiente principal." },
        { id: "c", label: "$+\\infty$", incorrectFeedback: "El denominador crece **más deprisa** que el numerador: el cociente se hace pequeño." },
        { id: "d", label: "$\\frac{1}{3}$", incorrectFeedback: "Has dividido los términos independientes, pero para $n$ grande no son los que mandan." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\frac{n+1}{n^2+3} = \\frac{\\frac{1}{n} + \\frac{1}{n^2}}{1 + \\frac{3}{n^2}} \\to \\frac{0}{1} = 0$.",
    },
    {
      id: "check-mayor",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "El numerador es de grado $3$ y el denominador de grado $1$; ambos coeficientes principales son positivos." }],
      title: "Grado mayor arriba",
      question: "Calcula $\\lim_{n\\to\\infty}\\dfrac{n^3 + 1}{2n + 1}$.",
      choices: [
        { id: "a", label: "$+\\infty$" },
        { id: "b", label: "$0$", incorrectFeedback: "Ocurriría con mayor grado **abajo**. Aquí manda el numerador." },
        { id: "c", label: "$\\frac{1}{2}$", incorrectFeedback: "Eso exigiría igualdad de grados." },
        { id: "d", label: "$2$", incorrectFeedback: "No hay ninguna razón para que dé $2$: los grados son distintos." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "El numerador (grado $3$) crece mucho más deprisa que el denominador (grado $1$); con signos positivos el cociente tiende a $+\\infty$.",
    },
    {
      id: "indeterminacion",
      type: "slide",
      help: [{ label: "Indeterminaciones", message: "$\\frac{\\infty}{\\infty}$, $\\infty - \\infty$, $0\\cdot\\infty$, $\\frac{0}{0}$… no tienen valor fijo: depende de **cómo** crecen cada parte. Hay que transformar la expresión (en el tema de límites verás más técnicas)." }],
      title: "Cuidado: ∞/∞ no es 1",
      blocks: [
        { kind: "text", text: "Al sustituir «$n = \\infty$» en un cociente de polinomios sale $\\frac{\\infty}{\\infty}$, que es una **indeterminación**: puede dar cualquier valor según los grados." },
        { kind: "example", lines: [
          { math: "\\dfrac{n}{n} \\to 1,\\qquad \\dfrac{n}{n^2} \\to 0,\\qquad \\dfrac{n^2}{n} \\to +\\infty,\\qquad \\dfrac{3n}{n} \\to 3" },
        ] },
        { kind: "text", text: "Los cuatro son de la forma $\\frac{\\infty}{\\infty}$ y dan resultados distintos. Por eso se compara el **grado**." },
      ],
      arrange: "stack",
    },
    {
      id: "check-signo",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Mismo grado: cociente de $-2n$ (coef. $-2$) entre $2n$ (coef. $2$)... y el $1$ del numerador va con $-2n$." }],
      title: "Con signos",
      question: "Calcula $\\lim_{n\\to\\infty}\\dfrac{1 - 2n}{1 + 2n}$. (solo el número)",
      correctAnswers: ["-1", "−1"],
      explanation: "Mismo grado ($1$): $\\frac{-2}{2} = -1$. Numéricamente, con $n = 1000$: $\\frac{-1999}{2001} \\approx -0{,}999$.",
    },
  ],
};
