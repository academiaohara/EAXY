import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_2_SUBTITLE } from "@/data/lessons/shared";

export const polinomiosOperaciones1bachLesson: InteractiveLesson = {
  slug: "polinomios-operaciones-1bach",
  title: "1. Polinomios y operaciones",
  subtitle: TEMA_1BACH_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [{ label: "Variable", message: "Se usa $x$ por costumbre, pero puede ser cualquier letra. Lo importante es que los exponentes sean enteros no negativos." }],
      title: "Polinomio, grado y valor numérico",
      blocks: [
        { kind: "definition", text: "Un **polinomio** es una suma de monomios con la misma variable: $P(x) = a_n x^n + \\cdots + a_1 x + a_0$. Los $a_i$ son los **coeficientes**, $a_0$ es el **término independiente** y el mayor exponente con coeficiente no nulo es el **grado**." },
        { kind: "example", title: "P(x) = 3x³ − 4x² + x − 3", lines: [
          { math: "\\text{grado } 3,\\quad \\text{coeficiente principal } 3,\\quad \\text{término independiente } -3" },
          { math: "P(2) = 3\\cdot 8 - 4\\cdot 4 + 2 - 3 = 7" },
        ] },
        { kind: "text", text: "El **valor numérico** $P(a)$ es lo que resulta al sustituir $x$ por $a$." },
      ],
      visual: { kind: "tool", tool: "polinomio-explorador", initial: [3, -4, 1, -3], params: { a: 2 }, hint: "Cambia los coeficientes y el valor de x. Comprueba que P(2) = 7 con los valores iniciales." },
    },
    {
      id: "check-valor",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Sustituye $x = -1$: $2(-1)^3 - (-1) + 4$." }],
      title: "Valor numérico",
      question: "Si $P(x) = 2x^3 - x + 4$, ¿cuánto vale $P(-1)$? (solo el número)",
      correctAnswers: ["3"],
      explanation: "$P(-1) = 2\\cdot(-1) - (-1) + 4 = -2 + 1 + 4 = 3$.",
    },
    {
      id: "operaciones",
      type: "slide",
      help: [{ label: "Grado del producto", message: "Al multiplicar, los grados se suman: $\\text{gr}(P\\cdot Q) = \\text{gr}(P) + \\text{gr}(Q)$. En la suma, el grado es como mucho el mayor." }],
      title: "Sumar, restar y multiplicar",
      blocks: [
        { kind: "rule", title: "Suma y resta", text: "Se agrupan los monomios del **mismo grado**. En la resta, el signo menos cambia todos los términos del sustraendo." },
        { kind: "example", title: "Producto: distributiva", lines: [
          { math: "(x^2 + 2x - 1)(x - 3)" },
          { math: "= x^3 - 3x^2 + 2x^2 - 6x - x + 3" },
          { math: "= x^3 - x^2 - 7x + 3" },
        ] },
      ],
      visual: { kind: "tool", tool: "polinomios-operador", initial: [0, 3, -1, 2, 0, 1, 4, -5, 0], hint: "Haz que A y B tengan el mismo coeficiente de x³ y resta: ¿qué pasa con el grado?" },
    },
    {
      id: "check-grado",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "En el producto se suman los grados: $2 + 3$." }],
      title: "Grado de un producto",
      question: "¿Cuál es el grado de $(x^2 + 1)(x^3 - 2x)$?",
      choices: [
        { id: "a", label: "$5$" },
        { id: "b", label: "$6$", incorrectFeedback: "Has multiplicado los grados ($2\\cdot 3$). Se **suman**: $2 + 3 = 5$." },
        { id: "c", label: "$3$", incorrectFeedback: "Has tomado el mayor grado, que sirve para la suma, no para el producto." },
        { id: "d", label: "$2$", incorrectFeedback: "El producto tiene grado $5$: $x^2 \\cdot x^3 = x^5$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "El término de mayor grado es $x^2\\cdot x^3 = x^5$.",
    },
    {
      id: "check-coef",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Desarrolla $(x+2)(x^2-3x+1)$ y agrupa." }],
      title: "Un coeficiente del producto",
      question: "Al desarrollar $(x + 2)(x^2 - 3x + 1)$ queda un polinomio de grado $3$. ¿Cuál es el coeficiente de $x$? (solo el número)",
      correctAnswers: ["-5", "−5"],
      explanation: "$(x+2)(x^2-3x+1) = x^3 - 3x^2 + x + 2x^2 - 6x + 2 = x^3 - x^2 - 5x + 2$. El coeficiente de $x$ es $-5$.",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Un polinomio solo tiene potencias enteras no negativas de $x$ (sin $x$ en el denominador, sin raíces de $x$, sin $x$ en el exponente)." }],
      title: "¿Es un polinomio?",
      question: "Clasifica cada expresión.",
      groups: [
        { id: "si", label: "Es un polinomio", tone: "emerald" },
        { id: "no", label: "No es un polinomio", tone: "amber" },
      ],
      items: [
        { id: "a", text: "$3x^2 - 5$", group: "si" },
        { id: "b", text: "$\\dfrac{1}{x} + 2$", group: "no" },
        { id: "c", text: "$\\dfrac{x^3}{4}$", group: "si" },
        { id: "d", text: "$\\sqrt{x} + 1$", group: "no" },
        { id: "e", text: "$2^x$", group: "no" },
        { id: "f", text: "$7$", group: "si" },
      ],
      hint: "Una constante también es un polinomio (de grado 0).",
    },
  ],
};
