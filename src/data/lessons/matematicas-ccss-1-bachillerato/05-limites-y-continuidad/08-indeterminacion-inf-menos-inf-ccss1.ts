import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_5_SUBTITLE } from "@/data/lessons/shared";

export const indeterminacionInfMenosInfCcss1Lesson: InteractiveLesson = {
  slug: "indeterminacion-inf-menos-inf-ccss1",
  title: "8. Indeterminaciones ∞ − ∞ y 0 · ∞",
  subtitle: TEMA_CCSS1_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "inf-menos-inf",
      type: "slide",
      help: [{ label: "Idea", message: "Cada fracción tiende a infinito, pero **sumadas** pueden dar un número. Se opera antes de calcular el límite." }],
      title: "∞ − ∞: operar antes de calcular",
      blocks: [
        { kind: "text", text: "En diferencias de fracciones se reduce a **común denominador** y se simplifica: así aparece el comportamiento real de la expresión." },
        { kind: "example", title: "lím x→1 de 1/(x − 1) − 2/(x² − 1)", lines: [
          { math: "\\infty - \\infty\\ \\text{(indeterminado)}" },
          { math: "\\dfrac{1}{x - 1} - \\dfrac{2}{x^2 - 1} = \\dfrac{(x + 1) - 2}{x^2 - 1} = \\dfrac{x - 1}{(x - 1)(x + 1)} = \\dfrac{1}{x + 1}" },
          { math: "\\lim_{x\\to 1}\\dfrac{1}{x + 1} = \\dfrac{1}{2}" },
        ] },
      ],
      visual: { kind: "tool", tool: "resta-fracciones-explorador", initial: [2, 1], hint: "Con k = 2 y r = 1 es el ejemplo de la diapositiva. Cambia k: si no es 2r, el límite no existe (laterales ±∞)." },
    },
    {
      id: "check-resta",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "El resultado de la simplificación es $\\frac{1}{x + 1}$." }],
      title: "Resultado de ∞ − ∞",
      question: "Con el ejemplo anterior, ¿cuánto vale $\\displaystyle\\lim_{x\\to 1}\\left(\\dfrac{1}{x - 1} - \\dfrac{2}{x^2 - 1}\\right)$? (fracción o decimal)",
      correctAnswers: ["1/2", "0,5", "0.5"],
      explanation: "Tras operar queda $\\frac{1}{x+1}$, que en $x = 1$ vale $\\frac{1}{2}$.",
    },
    {
      id: "inf-lateral",
      type: "slide",
      help: [{ label: "Con denominador 0", message: "Si tras operar queda un número distinto de $0$ entre $0$, se estudian los laterales: el signo del denominador a cada lado decide." }],
      title: "Cuando la resta da infinito",
      blocks: [
        { kind: "example", title: "lím x→2 de 1/(x² − 4) − 1/(x − 2)", lines: [
          { math: "\\dfrac{1}{x^2 - 4} - \\dfrac{1}{x - 2} = \\dfrac{1 - (x + 2)}{x^2 - 4} = \\dfrac{-(x + 1)}{x^2 - 4}" },
          { math: "x \\to 2:\\ \\dfrac{-3}{0}\\ \\Rightarrow\\ \\lim_{x\\to 2^+} = -\\infty,\\quad \\lim_{x\\to 2^-} = +\\infty" },
        ] },
        { kind: "text", text: "A la derecha de $2$, $x^2 - 4 > 0$ y el cociente es negativo; a la izquierda, $x^2 - 4 < 0$ y es positivo. Los laterales no coinciden: **no hay límite**." },
      ],
      arrange: "stack",
    },
    {
      id: "check-lateral",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Mira el signo del numerador y del denominador a la derecha de $2$." }],
      title: "Signo del lateral",
      question: "Con $f(x) = \\dfrac{-(x + 1)}{x^2 - 4}$, ¿cuánto vale $\\displaystyle\\lim_{x\\to 2^+} f(x)$?",
      choices: [
        { id: "a", label: "$-\\infty$" },
        { id: "b", label: "$+\\infty$", incorrectFeedback: "A la derecha de $2$: numerador $-3 < 0$ y denominador $0^+ > 0$, luego el cociente es negativo." },
        { id: "c", label: "$0$", incorrectFeedback: "Es el denominador el que se anula, no el numerador." },
        { id: "d", label: "$-3$", incorrectFeedback: "$-3$ es solo el numerador al sustituir." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Numerador $\\to -3$ y denominador $\\to 0^+$: $\\frac{-3}{0^+} = -\\infty$.",
    },
    {
      id: "cero-por-inf",
      type: "slide",
      help: [{ label: "Idea", message: "Se escribe el producto como **cociente** y se simplifica, normalmente factorizando." }],
      title: "0 · ∞: pasar a una sola fracción",
      blocks: [
        { kind: "example", title: "lím x→−3 de (x² + 6x + 9)·1/(x + 3)", lines: [
          { math: "0\\cdot\\infty\\ \\text{(indeterminado)}" },
          { math: "(x^2 + 6x + 9)\\cdot\\dfrac{1}{x + 3} = \\dfrac{(x + 3)^2}{x + 3} = x + 3" },
          { math: "\\lim_{x\\to -3}(x + 3) = 0" },
        ] },
        { kind: "example", title: "lím x→2 de (x − 2)·1/(x² − x − 2)", lines: [
          { math: "x^2 - x - 2 = (x + 1)(x - 2)\\ \\Rightarrow\\ \\dfrac{x - 2}{(x + 1)(x - 2)} = \\dfrac{1}{x + 1}" },
          { math: "\\lim_{x\\to 2}\\dfrac{1}{x + 1} = \\dfrac{1}{3}" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-producto",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$x^2 - 4x + 4 = (x - 2)^2$, así que $\\frac{(x - 2)^2}{x - 2} = x - 2$." }],
      title: "Un producto 0 · ∞",
      question: "Calcula $\\displaystyle\\lim_{x\\to 2}(x^2 - 4x + 4)\\cdot\\dfrac{1}{x - 2}$. (solo el número)",
      correctAnswers: ["0"],
      explanation: "$(x - 2)^2\\cdot\\frac{1}{x - 2} = x - 2 \\to 0$.",
    },
  ],
};
