import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_7_SUBTITLE } from "@/data/lessons/shared";

export const indeterminacionCeroCero1bachLesson: InteractiveLesson = {
  slug: "indeterminacion-cero-cero-1bach",
  title: "9. Indeterminación 0/0: factorizar y conjugado",
  subtitle: TEMA_1BACH_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "factorizar",
      type: "slide",
      help: [{ label: "Por qué sale 0/0", message: "Si $x = a$ anula numerador y denominador, ambos tienen el factor $(x - a)$. Se **simplifica** y se vuelve a sustituir." }],
      title: "0/0 con polinomios: factorizar",
      blocks: [
        { kind: "steps", items: [
          "Se **factorizan** numerador y denominador (Ruffini, ecuaciones de 2.º grado, identidades notables).",
          "Se **simplifica** el factor $(x - a)$ que anulaba ambos.",
          "Se **sustituye** otra vez.",
        ] },
        { kind: "example", title: "lím x→1 de (x² + 2x − 3)/(x² + x − 2)", lines: [
          { math: "\\dfrac{x^2 + 2x - 3}{x^2 + x - 2} = \\dfrac{(x - 1)(x + 3)}{(x - 1)(x + 2)} = \\dfrac{x + 3}{x + 2}" },
          { math: "\\lim_{x\\to 1}\\dfrac{x + 3}{x + 2} = \\dfrac{4}{3}" },
        ] },
      ],
      visual: { kind: "tool", tool: "cero-cero-explorador", initial: [0, 1, -3, -2], hint: "Es el ejemplo de la diapositiva (a = 1, b = −3, c = −2). Cambia a, b y c: el hueco de la gráfica está en x = a y el límite es (a − b)/(a − c). Si c = a, la fracción simplificada sigue dando 0 abajo." },
    },
    {
      id: "check-factor",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$x^2 - 9 = (x - 3)(x + 3)$." }],
      title: "Factorizar",
      question: "Calcula $\\displaystyle\\lim_{x\\to 3}\\dfrac{x^2 - 9}{x - 3}$. (solo el número)",
      correctAnswers: ["6"],
      explanation: "$\\dfrac{(x - 3)(x + 3)}{x - 3} = x + 3 \\to 6$.",
    },
    {
      id: "check-factor2",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$x^2 + 5x + 6 = (x + 2)(x + 3)$." }],
      title: "Otra factorización",
      question: "Calcula $\\displaystyle\\lim_{x\\to -2}\\dfrac{x^2 + 5x + 6}{x + 2}$. (solo el número)",
      correctAnswers: ["1"],
      explanation: "$\\dfrac{(x + 2)(x + 3)}{x + 2} = x + 3 \\to 1$.",
    },
    {
      id: "conjugado",
      type: "slide",
      help: [{ label: "Idea", message: "Multiplicar y dividir por el conjugado $\\sqrt{A} + s$ convierte $\\sqrt{A} - s$ en $A - s^2$, que sí se puede simplificar." }],
      title: "0/0 con raíces: el conjugado",
      blocks: [
        { kind: "example", title: "lím x→−1 de (√(x + 5) − 2)/(x + 1)", lines: [
          { math: "\\dfrac{\\sqrt{x + 5} - 2}{x + 1}\\cdot\\dfrac{\\sqrt{x + 5} + 2}{\\sqrt{x + 5} + 2} = \\dfrac{(x + 5) - 4}{(x + 1)(\\sqrt{x + 5} + 2)}" },
          { math: "= \\dfrac{x + 1}{(x + 1)(\\sqrt{x + 5} + 2)} = \\dfrac{1}{\\sqrt{x + 5} + 2}\\ \\longrightarrow\\ \\dfrac{1}{4}" },
        ] },
      ],
      visual: { kind: "tool", tool: "cero-cero-explorador", initial: [1, 2, 5], hint: "Con s = 2 y k = 5 es el ejemplo de la diapositiva. Cambia s y k: el límite siempre es 1/(2s)." },
    },
    {
      id: "check-conj",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Multiplica por $\\sqrt{x + 9} + 3$: el numerador queda $x$ y se simplifica con el denominador." }],
      title: "Conjugado",
      question: "Calcula $\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sqrt{x + 9} - 3}{x}$. (fracción)",
      correctAnswers: ["1/6", "0,1667", "0.1667", "0,167", "0.167"],
      explanation: "$\\dfrac{x}{x(\\sqrt{x + 9} + 3)} = \\dfrac{1}{\\sqrt{x + 9} + 3} \\to \\dfrac{1}{6}$.",
    },
    {
      id: "check-que-hacer",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Piensa en qué factor común tienen numerador y denominador cuando sale $0/0$." }],
      title: "Qué hacer con 0/0",
      question: "Cuando al sustituir en un cociente de polinomios sale $\\frac{0}{0}$, lo adecuado es…",
      choices: [
        { id: "a", label: "factorizar, simplificar el factor común $(x - a)$ y sustituir de nuevo" },
        { id: "b", label: "decir que el límite vale $0$", incorrectFeedback: "$\\frac{0}{0}$ no es $0$: es una indeterminación." },
        { id: "c", label: "decir que el límite vale $1$", incorrectFeedback: "$\\frac{0}{0}$ no es $1$: depende de las funciones." },
        { id: "d", label: "decir que no existe", incorrectFeedback: "Casi siempre existe (es el caso típico de límite finito con hueco)." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Que salga $0/0$ delata un factor $(x - a)$ común. Al eliminarlo se resuelve la indeterminación.",
    },
  ],
};
