import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_6_SUBTITLE } from "@/data/lessons/shared";

export const reglaCadenaCcss1Lesson: InteractiveLesson = {
  slug: "regla-cadena-ccss1",
  title: "7. La regla de la cadena",
  subtitle: TEMA_CCSS1_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "regla",
      type: "slide",
      help: [{ label: "De fuera hacia dentro", message: "Primero se deriva la función exterior **sin tocar** lo de dentro; después se multiplica por la derivada de lo de dentro." }],
      title: "Derivar una función compuesta",
      blocks: [
        { kind: "rule", title: "Regla de la cadena", formula: "(f\\circ g)'(x) = f'\\big(g(x)\\big)\\cdot g'(x)" },
        { kind: "text", text: "En notación de Leibniz: $\\dfrac{df}{dx} = \\dfrac{df}{dg}\\cdot\\dfrac{dg}{dx}$. Cada vez que aparece una función dentro de otra aparece un **factor extra**: la derivada de lo de dentro." },
      ],
      visual: { kind: "tool", tool: "cadena-explorador", initial: [2, 0, 2], hint: "Elige la función exterior f(u) y la interior g(x): la herramienta escribe la derivada y la comprueba numéricamente." },
    },
    {
      id: "ejemplos",
      type: "slide",
      help: [{ label: "Orden", message: "$\\sin(x^2)$ y $(\\sin x)^2$ parecen iguales pero son composiciones distintas: no se derivan igual." }],
      title: "Ejemplos",
      blocks: [
        { kind: "example", title: "(x³ + 3)²", lines: [
          { math: "y' = 2\\,(x^3 + 3)\\cdot 3x^2 = 6x^5 + 18x^2" },
          { math: "\\text{Comprobación: } (x^3 + 3)^2 = x^6 + 6x^3 + 9\\ \\Rightarrow\\ y' = 6x^5 + 18x^2" },
        ] },
        { kind: "example", title: "sen(x²) frente a (sen x)²", lines: [
          { math: "\\big(\\sin(x^2)\\big)' = \\cos(x^2)\\cdot 2x" },
          { math: "\\big((\\sin x)^2\\big)' = 2\\sin x\\cdot\\cos x" },
        ] },
        { kind: "example", title: "e^(2x)", lines: [
          { math: "(e^{2x})' = e^{2x}\\cdot 2 = 2e^{2x}" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-cuadrado",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "En $x = 1$: $2(x^3 + 3) = 8$ y $3x^2 = 3$." }],
      title: "(x³ + 3)² en x = 1",
      question: "Calcula la derivada de $y = (x^3 + 3)^2$ en $x = 1$. (solo el número)",
      correctAnswers: ["24"],
      explanation: "$y' = 2(x^3 + 3)\\cdot 3x^2 = 2\\cdot 4\\cdot 3 = 24$.",
    },
    {
      id: "check-potencia",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$y' = 5\\,(2x + 1)^4\\cdot 2$." }],
      title: "(2x + 1)⁵ en x = 0",
      question: "Calcula la derivada de $y = (2x + 1)^5$ en $x = 0$. (solo el número)",
      correctAnswers: ["10"],
      explanation: "$y' = 5(2x + 1)^4\\cdot 2 = 10(2x + 1)^4$, y en $x = 0$ vale $10$.",
    },
    {
      id: "check-sen",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$\\sin(x^2)$ es el seno **aplicado a** $x^2$: se deriva el seno y se multiplica por $2x$." }],
      title: "Seno de x²",
      question: "La derivada de $y = \\sin(x^2)$ es…",
      choices: [
        { id: "a", label: "$2x\\cos(x^2)$" },
        { id: "b", label: "$\\cos(x^2)$", incorrectFeedback: "Falta multiplicar por la derivada de lo de dentro, $2x$." },
        { id: "c", label: "$2\\sin x\\cos x$", incorrectFeedback: "Esa es la derivada de $(\\sin x)^2$, otra composición." },
        { id: "d", label: "$2x\\sin(x^2)$", incorrectFeedback: "La derivada del seno es el **coseno**." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(\\sin u)' = \\cos u\\cdot u'$ con $u = x^2$: $\\cos(x^2)\\cdot 2x$.",
    },
    {
      id: "check-tabla",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$(f\\circ g)'(2) = f'(g(2))\\cdot g'(2)$ y $g(2) = 6$." }],
      title: "Con valores tabulados",
      question: "Se sabe que $g(2) = 6$, $g'(2) = 3$ y $f'(6) = 4$. ¿Cuánto vale $(f\\circ g)'(2)$? (solo el número)",
      correctAnswers: ["12"],
      explanation: "$(f\\circ g)'(2) = f'(g(2))\\cdot g'(2) = f'(6)\\cdot 3 = 4\\cdot 3 = 12$.",
    },
  ],
};
