import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_4_SUBTITLE } from "@/data/lessons/shared";

export const sumaRestaAngulos1bachLesson: InteractiveLesson = {
  slug: "suma-resta-angulos-1bach",
  title: "5. Razones de la suma y la resta de ángulos",
  subtitle: TEMA_1BACH_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "formulas",
      type: "slide",
      help: [{ label: "Error clásico", message: "$\\sin(a + b)$ **no** es $\\sin a + \\sin b$. Por ejemplo $\\sin 90^\\circ = 1$, pero $\\sin 45^\\circ + \\sin 45^\\circ = \\sqrt{2} \\approx 1{,}41$." }],
      title: "Suma y resta",
      blocks: [
        { kind: "rule", title: "Suma", formula: "\\sin(a + b) = \\sin a\\cos b + \\cos a\\sin b\\qquad \\cos(a + b) = \\cos a\\cos b - \\sin a\\sin b" },
        { kind: "rule", title: "Resta", formula: "\\sin(a - b) = \\sin a\\cos b - \\cos a\\sin b\\qquad \\cos(a - b) = \\cos a\\cos b + \\sin a\\sin b" },
        { kind: "rule", title: "Tangente", formula: "\\tan(a \\pm b) = \\dfrac{\\tan a \\pm \\tan b}{1 \\mp \\tan a\\,\\tan b}" },
      ],
      visual: { kind: "tool", tool: "suma-angulos-explorador", initial: [45, 30, 0], hint: "Con 45° y 30° sale sen 75° ≈ 0,9659. Comprueba que el «error típico» da otro valor." },
    },
    {
      id: "check-error",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Prueba con $a = b = 45^\\circ$: $\\sin 90^\\circ = 1$ frente a $\\sin 45^\\circ + \\sin 45^\\circ$." }],
      title: "¿Cuál es cierta?",
      question: "¿Cuál de estas igualdades es **cierta** para todo par de ángulos?",
      choices: [
        { id: "a", label: "$\\cos(a - b) = \\cos a\\cos b + \\sin a\\sin b$" },
        { id: "b", label: "$\\sin(a + b) = \\sin a + \\sin b$", incorrectFeedback: "Falla con $a = b = 45^\\circ$: $\\sin 90^\\circ = 1 \\neq \\sqrt{2}$." },
        { id: "c", label: "$\\cos(a + b) = \\cos a + \\cos b$", incorrectFeedback: "Falla con $a = b = 60^\\circ$: $\\cos 120^\\circ = -\\frac{1}{2} \\neq 1$." },
        { id: "d", label: "$\\tan(a + b) = \\tan a + \\tan b$", incorrectFeedback: "Falla con $a = b = 45^\\circ$: $\\tan 90^\\circ$ no existe y $\\tan 45^\\circ + \\tan 45^\\circ = 2$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Es la fórmula del coseno de la resta. Las otras tres son errores muy habituales: las razones **no** son lineales.",
    },
    {
      id: "ejemplo",
      type: "slide",
      help: [{ label: "Para qué", message: "Permiten calcular con exactitud razones de ángulos que no son notables pero se pueden escribir como suma o resta de notables: $15^\\circ, 75^\\circ, 105^\\circ, 120^\\circ\\ldots$" }],
      title: "Razones exactas de 75° y de 15°",
      blocks: [
        { kind: "example", title: "sen 75° = sen(45° + 30°)", lines: [
          { math: "= \\sin 45^\\circ\\cos 30^\\circ + \\cos 45^\\circ\\sin 30^\\circ" },
          { math: "= \\dfrac{\\sqrt{2}}{2}\\cdot\\dfrac{\\sqrt{3}}{2} + \\dfrac{\\sqrt{2}}{2}\\cdot\\dfrac{1}{2} = \\dfrac{\\sqrt{6} + \\sqrt{2}}{4} \\approx 0{,}9659" },
        ] },
        { kind: "example", title: "cos 15° = cos(45° − 30°)", lines: [
          { math: "= \\dfrac{\\sqrt{2}}{2}\\cdot\\dfrac{\\sqrt{3}}{2} + \\dfrac{\\sqrt{2}}{2}\\cdot\\dfrac{1}{2} = \\dfrac{\\sqrt{6} + \\sqrt{2}}{4}" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-tg75",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$\\tan(45^\\circ + 30^\\circ) = \\frac{1 + \\frac{\\sqrt{3}}{3}}{1 - \\frac{\\sqrt{3}}{3}} = 2 + \\sqrt{3}$." }],
      title: "tg 75°",
      question: "Con $\\tan 75^\\circ = \\tan(45^\\circ + 30^\\circ) = 2 + \\sqrt{3}$, ¿cuánto vale aproximadamente, redondeado a **dos decimales**? (con coma decimal)",
      correctAnswers: ["3,73", "3.73"],
      explanation: "$2 + \\sqrt{3} \\approx 2 + 1{,}7321 = 3{,}7321 \\approx 3{,}73$.",
    },
    {
      id: "check-105",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$105^\\circ = 60^\\circ + 45^\\circ$. Con $\\sin$ en el cuadrante II es positivo." }],
      title: "sen 105°",
      question: "¿Cuánto vale $\\sin 105^\\circ = \\sin(60^\\circ + 45^\\circ)$?",
      choices: [
        { id: "a", label: "$\\dfrac{\\sqrt{6} + \\sqrt{2}}{4}$" },
        { id: "b", label: "$\\dfrac{\\sqrt{6} - \\sqrt{2}}{4}$", incorrectFeedback: "Eso es $\\sin 15^\\circ$ (o $\\cos 75^\\circ$). Con la suma, los dos productos se **suman**." },
        { id: "c", label: "$\\dfrac{\\sqrt{3} + \\sqrt{2}}{2}$", incorrectFeedback: "Has sumado $\\sin 60^\\circ + \\sin 45^\\circ$, que no es la fórmula." },
        { id: "d", label: "$1$", incorrectFeedback: "$\\sin\\theta = 1$ solo en $90^\\circ$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\sin 105^\\circ = \\sin 60^\\circ\\cos 45^\\circ + \\cos 60^\\circ\\sin 45^\\circ = \\frac{\\sqrt{6}}{4} + \\frac{\\sqrt{2}}{4}$.",
    },
    {
      id: "check-calculo",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$\\sin(a - b) = \\sin a\\cos b - \\cos a\\sin b$; con $a = 90^\\circ$: $\\sin 90^\\circ = 1$ y $\\cos 90^\\circ = 0$." }],
      title: "Una resta",
      question: "Sabiendo que $\\sin a = \\dfrac{1}{2}$ y $\\cos a = \\dfrac{\\sqrt{3}}{2}$ ($a = 30^\\circ$), calcula $\\sin(90^\\circ - a)$. (con coma decimal, redondeado a **dos decimales**)",
      correctAnswers: ["0,87", "0.87"],
      explanation: "$\\sin(90^\\circ - a) = \\cos a = \\frac{\\sqrt{3}}{2} \\approx 0{,}87$.",
    },
  ],
};
