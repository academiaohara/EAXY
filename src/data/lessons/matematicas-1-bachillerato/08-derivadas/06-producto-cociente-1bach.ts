import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_8_SUBTITLE } from "@/data/lessons/shared";

export const productoCociente1bachLesson: InteractiveLesson = {
  slug: "producto-cociente-1bach",
  title: "6. Derivada de un producto y de un cociente",
  subtitle: TEMA_1BACH_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "reglas",
      type: "slide",
      help: [{ label: "Cuidado", message: "La derivada de un producto **no** es el producto de las derivadas, ni la del cociente el cociente de las derivadas." }],
      title: "Las reglas del producto y del cociente",
      blocks: [
        { kind: "rule", title: "Producto", formula: "(f\\cdot g)' = f'\\cdot g + f\\cdot g'" },
        { kind: "rule", title: "Cociente", formula: "\\left(\\dfrac{f}{g}\\right)' = \\dfrac{f'\\cdot g - f\\cdot g'}{g^2}" },
      ],
      visual: { kind: "tool", tool: "producto-cociente-explorador", initial: [0, 2, 0, 2], hint: "Elige f, g y una operación: la regla da el mismo valor que la derivada calculada con cocientes incrementales." },
    },
    {
      id: "ejemplos",
      type: "slide",
      help: [{ label: "Comprobar", message: "El producto también se puede multiplicar primero y derivar después: debe salir lo mismo." }],
      title: "Dos ejemplos resueltos",
      blocks: [
        { kind: "example", title: "(4x + 2)(3x⁷ + 2)", lines: [
          { math: "f' = 4\\,(3x^7 + 2) + (4x + 2)\\cdot 21x^6" },
          { math: "= 12x^7 + 8 + 84x^7 + 42x^6 = 96x^7 + 42x^6 + 8" },
        ] },
        { kind: "example", title: "(3x + 1)/(2x)", lines: [
          { math: "h' = \\dfrac{3\\cdot 2x - (3x + 1)\\cdot 2}{(2x)^2} = \\dfrac{-2}{4x^2} = -\\dfrac{1}{2x^2}" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-producto",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$f' = 2x\\,(6x^6 - 5) + (x^2 + 3)\\,36x^5$. Sustituye $x = 1$." }],
      title: "Un producto",
      question: "Calcula la derivada de $f(x) = (x^2 + 3)(6x^6 - 5)$ en $x = 1$. (solo el número)",
      correctAnswers: ["146"],
      explanation: "$f'(1) = 2\\cdot 1\\cdot (6 - 5) + (1 + 3)\\cdot 36 = 2 + 144 = 146$.",
    },
    {
      id: "check-cociente",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$\\left(\\dfrac{x}{x + 1}\\right)' = \\dfrac{1\\cdot(x + 1) - x\\cdot 1}{(x + 1)^2} = \\dfrac{1}{(x + 1)^2}$." }],
      title: "Un cociente",
      question: "Calcula la derivada de $f(x) = \\dfrac{x}{x + 1}$ en $x = 1$. (decimal)",
      correctAnswers: ["0,25", "0.25", "1/4"],
      explanation: "$f'(x) = \\dfrac{1}{(x + 1)^2}$, así que $f'(1) = \\dfrac{1}{4} = 0{,}25$.",
    },
    {
      id: "check-error",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Prueba con $f = g = x$: $(x\\cdot x)' = 2x$." }],
      title: "Un error muy común",
      question: "¿Cuál de estas afirmaciones es **falsa**?",
      choices: [
        { id: "a", label: "$(f\\cdot g)' = f'\\cdot g'$" },
        { id: "b", label: "$(f\\cdot g)' = f'\\cdot g + f\\cdot g'$", incorrectFeedback: "Esta es la regla correcta del producto." },
        { id: "c", label: "$(c\\cdot f)' = c\\cdot f'$ si $c$ es constante", incorrectFeedback: "Es cierta: es el caso particular de producto con $g = c$, $g' = 0$." },
        { id: "d", label: "$(f + g)' = f' + g'$", incorrectFeedback: "La suma sí se deriva término a término." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Con $f = g = x$: $(x\\cdot x)' = 2x$, pero $f'\\cdot g' = 1\\cdot 1 = 1$.",
    },
    {
      id: "check-cociente-signo",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "En el numerador va $f'g - fg'$; el orden importa." }],
      title: "El numerador del cociente",
      question: "En la regla del cociente, el numerador es…",
      choices: [
        { id: "a", label: "$f'\\cdot g - f\\cdot g'$" },
        { id: "b", label: "$f\\cdot g' - f'\\cdot g$", incorrectFeedback: "Está al revés: primero la derivada del numerador, después la del denominador." },
        { id: "c", label: "$f'\\cdot g + f\\cdot g'$", incorrectFeedback: "Esa es la del producto. En el cociente hay una **resta**." },
        { id: "d", label: "$f'\\cdot g'$", incorrectFeedback: "La derivada de un cociente no es el cociente de las derivadas." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\left(\\frac{f}{g}\\right)' = \\dfrac{f'g - fg'}{g^2}$: «derivada del de arriba por el de abajo, menos el de arriba por la derivada del de abajo».",
    },
  ],
};
