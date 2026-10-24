import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_2_SUBTITLE } from "@/data/lessons/shared";

export const fraccionesAlgebraicas1bachLesson: InteractiveLesson = {
  slug: "fracciones-algebraicas-1bach",
  title: "6. Fracciones algebraicas",
  subtitle: TEMA_1BACH_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [{ label: "Equivalentes donde ambas tienen sentido", message: "$\\frac{3x^2}{x}$ y $3x$ valen lo mismo para $x \\neq 0$, pero la fracción no se puede evaluar en $x = 0$." }],
      title: "Cociente de polinomios",
      blocks: [
        { kind: "definition", text: "Una **fracción algebraica** es $\\dfrac{P(x)}{Q(x)}$ con $P$ y $Q$ polinomios y $Q \\neq 0$. No está definida en los valores que **anulan el denominador**." },
        { kind: "example", lines: [
          { math: "\\dfrac{x + 1}{x^2 - 5x + 6},\\qquad x \\neq 2,\\ x \\neq 3" },
        ] },
        { kind: "text", text: "En general **no** es un polinomio, aunque a veces se pueda simplificar hasta serlo." },
      ],
      visual: { kind: "tool", tool: "fraccion-alg-explorador", params: { a: 0, b: 3 }, hint: "Mueve x y busca el valor donde la fracción original no existe pero la simplificada sí." },
    },
    {
      id: "simplificar",
      type: "slide",
      help: [{ label: "Solo factores", message: "Se simplifican **factores**, nunca sumandos: $\\frac{x+2}{x}$ no es $\\frac{2}{1}$." }],
      title: "Simplificar: factorizar y tachar",
      blocks: [
        { kind: "steps", items: [
          "Factorizar numerador y denominador.",
          "Tachar los factores comunes.",
          "Anotar los valores excluidos del denominador **original**.",
        ] },
        { kind: "example", lines: [
          { math: "\\dfrac{x^2 - 4}{x^2 - 4x + 4} = \\dfrac{(x-2)(x+2)}{(x-2)^2} = \\dfrac{x + 2}{x - 2}\\quad (x \\neq 2)" },
        ] },
        { kind: "warning", text: "No se pueden tachar sumandos: $\\dfrac{x+2}{x} \\neq 2$." },
      ],
      arrange: "stack",
    },
    {
      id: "check-simplificar",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$x^2 - 1 = (x-1)(x+1)$ y $x^2 + x = x(x+1)$." }],
      title: "Simplifica",
      question: "Simplifica $\\dfrac{x^2 - 1}{x^2 + x}$.",
      choices: [
        { id: "a", label: "$\\dfrac{x - 1}{x}$" },
        { id: "b", label: "$-1$", incorrectFeedback: "Has tachado los términos $x^2$ a la vez: solo se tachan **factores**." },
        { id: "c", label: "$\\dfrac{x - 1}{x + 1}$", incorrectFeedback: "El factor común es $x + 1$; en el denominador queda $x$, no $x + 1$." },
        { id: "d", label: "$\\dfrac{1}{x}$", incorrectFeedback: "Al tachar $x + 1$ en el numerador queda $x - 1$, no $1$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\dfrac{(x-1)(x+1)}{x(x+1)} = \\dfrac{x-1}{x}$, con $x \\neq 0$ y $x \\neq -1$.",
    },
    {
      id: "operaciones",
      type: "slide",
      help: [{ label: "Mínimo común denominador", message: "Se factorizan los denominadores y se toma cada factor con su mayor exponente. Con $(x-1)$ y $(x+1)$ el común es $(x-1)(x+1) = x^2 - 1$." }],
      title: "Suma, producto y cociente",
      blocks: [
        { kind: "example", title: "Suma: denominador común", lines: [
          { math: "\\dfrac{1}{x - 1} + \\dfrac{1}{x + 1} = \\dfrac{(x + 1) + (x - 1)}{(x-1)(x+1)} = \\dfrac{2x}{x^2 - 1}" },
        ] },
        { kind: "rule", title: "Producto y cociente", formula: "\\dfrac{A}{B}\\cdot\\dfrac{C}{D} = \\dfrac{AC}{BD}\\qquad \\dfrac{A}{B} : \\dfrac{C}{D} = \\dfrac{AD}{BC}" },
      ],
      arrange: "stack",
    },
    {
      id: "check-valor",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Usa el resultado $\\frac{2x}{x^2 - 1}$ con $x = 3$, o suma $\\frac{1}{2} + \\frac{1}{4}$." }],
      title: "Evaluar la suma",
      question: "¿Cuánto vale $\\dfrac{1}{x - 1} + \\dfrac{1}{x + 1}$ para $x = 3$? (con coma decimal)",
      correctAnswers: ["0,75", "0.75", "3/4"],
      explanation: "$\\frac{1}{2} + \\frac{1}{4} = \\frac{3}{4}$, y con la fórmula, $\\frac{2\\cdot 3}{9 - 1} = \\frac{6}{8} = \\frac{3}{4}$.",
    },
    {
      id: "check-excluidos",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Resuelve $x^2 - 5x + 6 = 0$." }],
      title: "Valores excluidos",
      question: "¿Para qué valores de $x$ **no está definida** $\\dfrac{x + 1}{x^2 - 5x + 6}$?",
      choices: [
        { id: "a", label: "$x = 2$ y $x = 3$" },
        { id: "b", label: "$x = -1$", incorrectFeedback: "Eso anula el numerador, no el denominador." },
        { id: "c", label: "$x = -2$ y $x = -3$", incorrectFeedback: "Las raíces de $x^2 - 5x + 6$ son $2$ y $3$, con signo positivo." },
        { id: "d", label: "Está definida para todo $x$", incorrectFeedback: "El denominador se anula en $x = 2$ y $x = 3$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$x^2 - 5x + 6 = (x - 2)(x - 3)$ se anula en $2$ y $3$.",
    },
  ],
};
