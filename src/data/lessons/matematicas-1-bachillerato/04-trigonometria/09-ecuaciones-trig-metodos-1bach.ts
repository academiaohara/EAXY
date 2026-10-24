import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_4_SUBTITLE } from "@/data/lessons/shared";

export const ecuacionesTrigMetodos1bachLesson: InteractiveLesson = {
  slug: "ecuaciones-trig-metodos-1bach",
  title: "9. Resolver ecuaciones: métodos",
  subtitle: TEMA_1BACH_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "estrategia",
      type: "slide",
      help: [{ label: "Comprobar", message: "Al elevar al cuadrado, dividir entre una razón o usar fórmulas pueden aparecer soluciones que no son válidas. Conviene **comprobar** en la ecuación original." }],
      title: "Reducir a una sola razón",
      blocks: [
        { kind: "steps", title: "Estrategia", items: [
          "Dejar **una sola razón** del **mismo ángulo** (usando $\\sin^2 + \\cos^2 = 1$ y las fórmulas del ángulo doble, suma…).",
          "Resolver la ecuación algebraica en esa razón (a veces de 2.º grado).",
          "Resolver cada ecuación trigonométrica básica resultante.",
          "Comprobar las soluciones y escribirlas con sus vueltas.",
        ] },
      ],
      visual: { kind: "tool", tool: "ecuacion-trig-explorador", initial: [0, -1], hint: "Con sen x = −0,5 hay dos soluciones por vuelta: 210° y 330°." },
    },
    {
      id: "cuadratica",
      type: "slide",
      help: [{ label: "Cambio de variable", message: "Llamando $t = \\sin x$ la ecuación es $2t^2 - t - 1 = 0$, de segundo grado. No olvides que $t$ debe estar en $[-1, 1]$." }],
      title: "Ecuación de segundo grado en sen x",
      blocks: [
        { kind: "example", title: "2 sen² x − sen x − 1 = 0", lines: [
          { math: "t = \\sin x:\\quad 2t^2 - t - 1 = 0 \\Rightarrow t = \\dfrac{1 \\pm 3}{4} = 1,\\ -\\dfrac{1}{2}" },
          { math: "\\sin x = 1 \\Rightarrow x = 90^\\circ" },
          { math: "\\sin x = -\\tfrac{1}{2} \\Rightarrow x = 210^\\circ,\\ 330^\\circ" },
        ] },
        { kind: "text", text: "Las soluciones en $[0^\\circ, 360^\\circ)$ son $90^\\circ$, $210^\\circ$ y $330^\\circ$." },
      ],
      arrange: "stack",
    },
    {
      id: "check-cuadratica",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Una solución $\\sin x = 1$ (una) y otra $\\sin x = -\\frac{1}{2}$ (dos)." }],
      title: "Cuántas soluciones",
      question: "¿Cuántas soluciones tiene $2\\sin^2 x - \\sin x - 1 = 0$ en $[0^\\circ, 360^\\circ)$? (solo el número)",
      correctAnswers: ["3"],
      explanation: "$\\sin x = 1$ da $90^\\circ$ y $\\sin x = -\\frac{1}{2}$ da $210^\\circ$ y $330^\\circ$: en total tres.",
    },
    {
      id: "doble",
      type: "slide",
      help: [{ label: "Qué fórmula elegir", message: "Se escoge la forma de $\\cos 2x$ que deja la **misma razón** que el resto de la ecuación: aquí $\\cos 2x = 2\\cos^2 x - 1$." }],
      title: "Usar el ángulo doble",
      blocks: [
        { kind: "example", title: "cos 2x = cos x", lines: [
          { math: "2\\cos^2 x - 1 = \\cos x \\Rightarrow 2\\cos^2 x - \\cos x - 1 = 0" },
          { math: "\\cos x = \\dfrac{1 \\pm 3}{4} = 1,\\ -\\dfrac{1}{2}" },
          { math: "\\cos x = 1 \\Rightarrow x = 0^\\circ\\qquad \\cos x = -\\tfrac{1}{2} \\Rightarrow x = 120^\\circ,\\ 240^\\circ" },
        ] },
        { kind: "text", text: "Soluciones en $[0^\\circ, 360^\\circ)$: $0^\\circ$, $120^\\circ$ y $240^\\circ$. Comprobación con $x = 120^\\circ$: $\\cos 240^\\circ = -\\frac{1}{2} = \\cos 120^\\circ$ ✓." },
      ],
      arrange: "stack",
    },
    {
      id: "check-doble",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Sustituye $\\cos 2x = 1 - 2\\sin^2 x$ para dejarlo todo en seno." }],
      title: "Elegir la fórmula",
      question: "Para resolver $\\cos 2x + 3\\sin x = 2$ conviene escribir $\\cos 2x$ como…",
      choices: [
        { id: "a", label: "$1 - 2\\sin^2 x$, para que quede solo $\\sin x$" },
        { id: "b", label: "$\\cos^2 x - \\sin^2 x$", incorrectFeedback: "Es correcta, pero deja $\\cos x$ y $\\sin x$ juntos: habría que cambiar $\\cos^2 x = 1 - \\sin^2 x$ después. La forma $1 - 2\\sin^2 x$ es más directa." },
        { id: "c", label: "$2\\cos^2 x - 1$", incorrectFeedback: "Dejaría $\\cos x$ junto a $\\sin x$ y no se podría reducir a una sola razón." },
        { id: "d", label: "$2\\sin x\\cos x$", incorrectFeedback: "Esa es la fórmula del **seno** del ángulo doble." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$1 - 2\\sin^2 x + 3\\sin x = 2 \\Rightarrow 2\\sin^2 x - 3\\sin x + 1 = 0$, una ecuación de segundo grado en $\\sin x$ (con $\\sin x = 1$ y $\\sin x = \\frac{1}{2}$).",
    },
    {
      id: "sistema",
      type: "slide",
      help: [{ label: "Sistemas", message: "En un sistema se despeja una incógnita de la ecuación lineal y se sustituye en la trigonométrica, reduciendo a una sola razón." }],
      title: "Un sistema sencillo",
      blocks: [
        { kind: "example", title: "x + y = 90° y sen x + cos y = 1, con 0° < x < 90°", lines: [
          { math: "y = 90^\\circ - x \\Rightarrow \\cos y = \\cos(90^\\circ - x) = \\sin x" },
          { math: "2\\sin x = 1 \\Rightarrow \\sin x = \\tfrac{1}{2} \\Rightarrow x = 30^\\circ,\\ y = 60^\\circ" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-sistema",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$y = 90^\\circ - x$ con $x = 30^\\circ$." }],
      title: "El valor de y",
      question: "En el sistema anterior, ¿cuánto vale $y$ (en grados)? (solo el número)",
      correctAnswers: ["60"],
      explanation: "$y = 90^\\circ - 30^\\circ = 60^\\circ$. Comprobación: $\\sin 30^\\circ + \\cos 60^\\circ = \\frac{1}{2} + \\frac{1}{2} = 1$ ✓.",
    },
  ],
};
