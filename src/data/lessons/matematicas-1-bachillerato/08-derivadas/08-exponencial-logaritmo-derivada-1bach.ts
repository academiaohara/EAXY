import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_8_SUBTITLE } from "@/data/lessons/shared";

export const exponencialLogaritmoDerivada1bachLesson: InteractiveLesson = {
  slug: "exponencial-logaritmo-derivada-1bach",
  title: "8. Derivadas de eˣ, aˣ y ln x; derivación logarítmica",
  subtitle: TEMA_1BACH_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "reglas",
      type: "slide",
      help: [{ label: "Una función muy especial", message: "$e^x$ es su propia derivada: la pendiente de su tangente en cada punto es igual a la altura de la curva." }],
      title: "Exponencial y logaritmo",
      blocks: [
        { kind: "facts", items: [
          { tex: "(e^x)' = e^x", label: "exponencial de base e" },
          { tex: "(a^x)' = a^x\\ln a", label: "exponencial de base a" },
          { tex: "(\\ln x)' = \\dfrac{1}{x}", label: "logaritmo neperiano" },
          { tex: "(\\log_a x)' = \\dfrac{1}{x\\ln a}", label: "logaritmo de base a" },
        ] },
        { kind: "text", text: "Con la regla de la cadena: $(e^{f})' = f'\\,e^{f}$ y $(\\ln f)' = \\dfrac{f'}{f}$." },
      ],
      visual: { kind: "tool", tool: "funcion-derivada-explorador", initial: [5, 10], hint: "Con eˣ las curvas azul y naranja coinciden: f′ = f. Cambia a ln x y mira que f′ = 1/x." },
    },
    {
      id: "logaritmica",
      type: "slide",
      help: [{ label: "Cuándo", message: "Es imprescindible cuando la variable está a la vez en la base y en el exponente, como $x^x$." }],
      title: "Derivación logarítmica",
      blocks: [
        { kind: "steps", items: [
          "Se toman **logaritmos** en los dos miembros: $\\ln f$.",
          "Se **simplifica** con las propiedades de los logaritmos.",
          "Se **deriva** en los dos miembros: $\\dfrac{f'}{f} = \\ldots$",
          "Se **despeja** $f' = f\\cdot(\\ldots)$.",
        ] },
        { kind: "example", title: "f(x) = xˣ", lines: [
          { math: "\\ln f = x\\ln x\\ \\Rightarrow\\ \\dfrac{f'}{f} = 1\\cdot\\ln x + x\\cdot\\dfrac{1}{x} = \\ln x + 1" },
          { math: "f'(x) = x^x\\,(\\ln x + 1)" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-ln",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$(\\ln f)' = \\frac{f'}{f}$ con $f = x^2 + 1$." }],
      title: "Derivada de un logaritmo",
      question: "Calcula la derivada de $y = \\ln(x^2 + 1)$ en $x = 1$. (solo el número)",
      correctAnswers: ["1"],
      explanation: "$y' = \\dfrac{2x}{x^2 + 1}$, y en $x = 1$ vale $\\dfrac{2}{2} = 1$.",
    },
    {
      id: "check-exp",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$(e^{3x})' = 3e^{3x}$ y $e^0 = 1$." }],
      title: "Derivada de una exponencial",
      question: "Calcula la derivada de $y = e^{3x}$ en $x = 0$. (solo el número)",
      correctAnswers: ["3"],
      explanation: "$y' = 3e^{3x}$, y en $x = 0$ vale $3\\cdot 1 = 3$.",
    },
    {
      id: "check-base",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$(a^x)' = a^x\\ln a$ con $a = 2$ y $x = 0$." }],
      title: "Derivada de 2ˣ en 0",
      question: "La pendiente de la tangente a $y = 2^x$ en $x = 0$ es…",
      choices: [
        { id: "a", label: "$\\ln 2 \\approx 0{,}693$" },
        { id: "b", label: "$1$", incorrectFeedback: "Eso ocurriría con $e^x$ (cuya derivada coincide con la función); con base $2$ aparece el factor $\\ln 2$." },
        { id: "c", label: "$2$", incorrectFeedback: "Falta el factor $\\ln a$, y $2^0 = 1$." },
        { id: "d", label: "$0$", incorrectFeedback: "La exponencial es siempre creciente: su derivada nunca se anula." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(2^x)' = 2^x\\ln 2$, y en $x = 0$ vale $1\\cdot\\ln 2 \\approx 0{,}693$.",
    },
    {
      id: "check-xx",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$f'(x) = x^x(\\ln x + 1)$ y $\\ln 1 = 0$." }],
      title: "xˣ en x = 1",
      question: "Con $f(x) = x^x$, ¿cuánto vale $f'(1)$? (solo el número)",
      correctAnswers: ["1"],
      explanation: "$f'(1) = 1^1\\,(\\ln 1 + 1) = 1\\cdot(0 + 1) = 1$.",
    },
  ],
};
