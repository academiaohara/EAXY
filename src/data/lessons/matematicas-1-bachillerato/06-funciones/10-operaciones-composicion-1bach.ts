import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_6_SUBTITLE } from "@/data/lessons/shared";

export const operacionesComposicion1bachLesson: InteractiveLesson = {
  slug: "operaciones-composicion-1bach",
  title: "10. Operaciones y composición de funciones",
  subtitle: TEMA_1BACH_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "basicas",
      type: "slide",
      help: [{ label: "Dominio", message: "El dominio de $f + g$, $f - g$ y $f\\cdot g$ es la intersección de los dominios de $f$ y $g$. En $\\frac{f}{g}$ además se quitan los puntos donde $g(x) = 0$." }],
      title: "Suma, resta, producto y cociente",
      blocks: [
        { kind: "facts", items: [
          { tex: "(f + g)(x) = f(x) + g(x)", label: "" },
          { tex: "(f - g)(x) = f(x) - g(x)", label: "" },
          { tex: "(f\\cdot g)(x) = f(x)\\cdot g(x)", label: "" },
          { tex: "\\left(\\tfrac{f}{g}\\right)(x) = \\tfrac{f(x)}{g(x)},\\ g(x) \\neq 0", label: "" },
        ] },
        { kind: "example", title: "f(x) = x², g(x) = x − 1", lines: [
          { math: "(f + g)(x) = x^2 + x - 1\\qquad (f\\cdot g)(x) = x^3 - x^2" },
          { math: "\\left(\\tfrac{f}{g}\\right)(x) = \\dfrac{x^2}{x - 1},\\quad \\text{Dom} = \\mathbb{R} - \\{1\\}" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "composicion",
      type: "slide",
      help: [{ label: "De dentro afuera", message: "En $(f\\circ g)(x)$ se aplica **primero** $g$ y después $f$: $x \\xrightarrow{g} g(x) \\xrightarrow{f} f(g(x))$." }],
      title: "Composición: f∘g",
      blocks: [
        { kind: "definition", text: "La **composición** de $g$ seguida de $f$ es $(f\\circ g)(x) = f\\big(g(x)\\big)$: se aplica primero $g$ y a su resultado, $f$. Su dominio son los $x$ del dominio de $g$ cuya imagen $g(x)$ está en el dominio de $f$." },
        { kind: "example", title: "f(x) = x², g(x) = x + 2", lines: [
          { math: "(f\\circ g)(x) = f(x + 2) = (x + 2)^2" },
          { math: "(g\\circ f)(x) = g(x^2) = x^2 + 2" },
        ] },
        { kind: "warning", text: "En general $f\\circ g \\neq g\\circ f$: **el orden importa**." },
      ],
      visual: { kind: "tool", tool: "composicion-explorador", initial: [2, 0, 4], hint: "Cambia el orden de f y g: las expresiones y los valores casi nunca coinciden. Prueba f = √x y g = x + 2 con x negativo." },
    },
    {
      id: "check-fog",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$(f\\circ g)(1) = f(g(1)) = f(3)$." }],
      title: "(f∘g)(1)",
      question: "Con $f(x) = x^2$ y $g(x) = x + 2$, ¿cuánto vale $(f\\circ g)(1)$? (solo el número)",
      correctAnswers: ["9"],
      explanation: "$g(1) = 3$ y $f(3) = 9$.",
    },
    {
      id: "check-gof",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$(g\\circ f)(1) = g(f(1)) = g(1)$." }],
      title: "(g∘f)(1)",
      question: "Con las mismas funciones, ¿cuánto vale $(g\\circ f)(1)$? (solo el número)",
      correctAnswers: ["3"],
      explanation: "$f(1) = 1$ y $g(1) = 3$: $(g\\circ f)(1) = 3 \\neq 9 = (f\\circ g)(1)$.",
    },
    {
      id: "check-expresion",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Sustituye $g(x) = 2x$ en $f$: $f(2x) = 2x + 2$... aquí $f(x) = x^2$." }],
      title: "Escribir la composición",
      question: "Con $f(x) = \\sqrt{x}$ y $g(x) = x + 2$, ¿cuánto es $(f\\circ g)(x)$ y para qué $x$ está definida?",
      choices: [
        { id: "a", label: "$\\sqrt{x + 2}$, definida para $x \\geq -2$" },
        { id: "b", label: "$\\sqrt{x} + 2$, definida para $x \\geq 0$", incorrectFeedback: "Esa es $g\\circ f$. En $f\\circ g$ se aplica **primero** $g$: $\\sqrt{g(x)}$." },
        { id: "c", label: "$\\sqrt{x + 2}$, definida para $x \\geq 2$", incorrectFeedback: "$x + 2 \\geq 0$ da $x \\geq -2$, no $x \\geq 2$." },
        { id: "d", label: "$\\sqrt{2x}$, definida para $x \\geq 0$", incorrectFeedback: "$g(x) = x + 2$, no $2x$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(f\\circ g)(x) = f(x + 2) = \\sqrt{x + 2}$, que existe cuando $x + 2 \\geq 0$.",
    },
    {
      id: "check-cociente",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "En el cociente se excluyen los $x$ donde $g(x) = 0$." }],
      title: "Dominio de un cociente",
      question: "¿Cuál es el dominio de $\\dfrac{f}{g}$ con $f(x) = x^2$ y $g(x) = x - 1$?",
      choices: [
        { id: "a", label: "$\\mathbb{R} - \\{1\\}$" },
        { id: "b", label: "$\\mathbb{R}$", incorrectFeedback: "$g(1) = 0$, así que $x = 1$ no está en el dominio del cociente." },
        { id: "c", label: "$\\mathbb{R} - \\{0\\}$", incorrectFeedback: "$f(0) = 0$ no es problema: lo que no puede anularse es el **denominador** $g(x)$." },
        { id: "d", label: "$\\mathbb{R} - \\{0, 1\\}$", incorrectFeedback: "Solo hay que quitar los ceros del denominador, $x = 1$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "El cociente $\\frac{x^2}{x - 1}$ existe salvo donde $x - 1 = 0$.",
    },
  ],
};
