import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_4_SUBTITLE } from "@/data/lessons/shared";

export const identidadesTransformaciones1bachLesson: InteractiveLesson = {
  slug: "identidades-transformaciones-1bach",
  title: "7. Identidades y transformación de sumas en productos",
  subtitle: TEMA_1BACH_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "producto",
      type: "slide",
      help: [{ label: "De dónde salen", message: "Se obtienen sumando y restando las fórmulas de $\\sin(a + b)$ y $\\sin(a - b)$ y llamando $A = a + b$, $B = a - b$." }],
      title: "De suma a producto",
      blocks: [
        { kind: "rule", title: "Senos", formula: "\\sin A + \\sin B = 2\\sin\\dfrac{A + B}{2}\\cos\\dfrac{A - B}{2}\\qquad \\sin A - \\sin B = 2\\cos\\dfrac{A + B}{2}\\sin\\dfrac{A - B}{2}" },
        { kind: "rule", title: "Cosenos", formula: "\\cos A + \\cos B = 2\\cos\\dfrac{A + B}{2}\\cos\\dfrac{A - B}{2}\\qquad \\cos A - \\cos B = -2\\sin\\dfrac{A + B}{2}\\sin\\dfrac{A - B}{2}" },
        { kind: "text", text: "Sirven para **factorizar** una suma de razones, algo muy útil en ecuaciones." },
      ],
      visual: { kind: "tool", tool: "suma-producto-explorador", initial: [75, 15], hint: "Cambia A y B: cada igualdad se cumple siempre. Con A = 75° y B = 15° la suma de senos vale √6/2 ≈ 1,2247." },
    },
    {
      id: "check-suma",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$\\sin 75^\\circ + \\sin 15^\\circ = 2\\sin 45^\\circ\\cos 30^\\circ$." }],
      title: "Una suma de senos",
      question: "Calcula $\\sin 75^\\circ + \\sin 15^\\circ$ transformándolo en producto. (redondeado a **dos decimales**, con coma)",
      correctAnswers: ["1,22", "1.22"],
      explanation: "$2\\sin 45^\\circ\\cos 30^\\circ = 2\\cdot\\frac{\\sqrt{2}}{2}\\cdot\\frac{\\sqrt{3}}{2} = \\frac{\\sqrt{6}}{2} \\approx 1{,}2247 \\approx 1{,}22$.",
    },
    {
      id: "identidad",
      type: "slide",
      help: [{ label: "Estrategia", message: "Para demostrar una identidad se transforma **uno solo** de los miembros hasta llegar al otro: pasar todo a seno y coseno suele funcionar." }],
      title: "Demostrar una identidad",
      blocks: [
        { kind: "definition", text: "Una **identidad trigonométrica** es una igualdad que se cumple para **todos** los ángulos en los que están definidos ambos miembros. Se demuestra transformando un miembro hasta obtener el otro." },
        { kind: "example", title: "(sen x + cos x)² = 1 + sen 2x", lines: [
          { math: "(\\sin x + \\cos x)^2 = \\sin^2 x + 2\\sin x\\cos x + \\cos^2 x" },
          { math: "= (\\sin^2 x + \\cos^2 x) + 2\\sin x\\cos x = 1 + \\sin 2x" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-identidad",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$\\tan x + \\frac{1}{\\tan x} = \\frac{\\sin x}{\\cos x} + \\frac{\\cos x}{\\sin x}$. Reduce a común denominador." }],
      title: "Simplificar",
      question: "¿A qué es igual $\\tan x + \\dfrac{1}{\\tan x}$?",
      choices: [
        { id: "a", label: "$\\dfrac{1}{\\sin x\\cos x}$" },
        { id: "b", label: "$1$", incorrectFeedback: "$\\tan x + \\frac{1}{\\tan x}$ nunca es menor que $2$ en módulo (con $x = 45^\\circ$ vale $2$)." },
        { id: "c", label: "$\\sin x + \\cos x$", incorrectFeedback: "Comprueba con $x = 45^\\circ$: el primer miembro vale $2$ y $\\sin 45^\\circ + \\cos 45^\\circ = \\sqrt{2}$." },
        { id: "d", label: "$\\dfrac{1}{\\cos^2 x}$", incorrectFeedback: "Eso es $1 + \\tan^2 x$. Aquí se suma $\\frac{1}{\\tan x}$, no $\\tan x$ de nuevo." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\frac{\\sin x}{\\cos x} + \\frac{\\cos x}{\\sin x} = \\frac{\\sin^2 x + \\cos^2 x}{\\sin x\\cos x} = \\frac{1}{\\sin x\\cos x}$.",
    },
    {
      id: "check-cuadrado",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Con $x = 30^\\circ$: $\\sin 60^\\circ = \\frac{\\sqrt{3}}{2} \\approx 0{,}866$ y $(\\sin x + \\cos x)^2 = 1 + \\sin 2x$." }],
      title: "Comprobar una identidad con un valor",
      question: "Con $x = 30^\\circ$, ¿cuánto vale $(\\sin x + \\cos x)^2$? (redondeado a **dos decimales**, con coma)",
      correctAnswers: ["1,87", "1.87"],
      explanation: "$(\\sin 30^\\circ + \\cos 30^\\circ)^2 = 1 + \\sin 60^\\circ = 1 + 0{,}866 \\approx 1{,}87$.",
    },
  ],
};
