import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_5_SUBTITLE } from "@/data/lessons/shared";

export const parabola1bachLesson: InteractiveLesson = {
  slug: "parabola-1bach",
  title: "12. La parábola",
  subtitle: TEMA_1BACH_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [{ label: "Antenas y faros", message: "Todos los rayos paralelos al eje que llegan a una parábola se reflejan pasando por el foco: por eso las antenas parabólicas concentran la señal en el foco, y los faros hacen lo contrario." }],
      title: "Equidistar de un punto y de una recta",
      blocks: [
        { kind: "definition", text: "La **parábola** es el lugar geométrico de los puntos que **equidistan de un punto fijo** (el **foco** $F$) y de una **recta fija** (la **directriz** $d$)." },
      ],
      visual: { kind: "anim", scene: "conica-lugar", params: { conica: "parabola" } },
    },
    {
      id: "ecuacion",
      type: "slide",
      help: [{ label: "De dónde sale", message: "Con $F(\\frac{p}{2}, 0)$ y directriz $x = -\\frac{p}{2}$: $\\sqrt{(x - \\frac{p}{2})^2 + y^2} = x + \\frac{p}{2}$. Elevando al cuadrado queda $y^2 = 2px$." }],
      title: "Ecuación reducida",
      blocks: [
        { kind: "rule", title: "Vértice en el origen, eje horizontal", formula: "y^2 = 2p\\,x\\qquad F\\left(\\dfrac{p}{2}, 0\\right)\\qquad \\text{directriz: } x = -\\dfrac{p}{2}\\qquad e = 1" },
        { kind: "example", title: "y² = 8x", lines: [
          { math: "2p = 8 \\Rightarrow p = 4\\Rightarrow F(2, 0),\\quad \\text{directriz } x = -2" },
        ] },
        { kind: "text", text: "Si $p > 0$, la parábola se abre hacia la derecha; si $p < 0$, hacia la izquierda. $x^2 = 2py$ es la misma curva abierta hacia arriba o hacia abajo." },
      ],
      visual: { kind: "tool", tool: "conica-explorador", initial: [3, 4, 3, 0, 0], hint: "Sube p: el foco se aleja del vértice y la parábola se abre. La directriz está tan lejos del vértice como el foco." },
    },
    {
      id: "check-foco",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$2p = 12 \\Rightarrow p = 6$ y el foco está en $\\left(\\frac{p}{2}, 0\\right)$." }],
      title: "El foco",
      question: "¿Cuál es la abscisa del foco de la parábola $y^2 = 12x$? (solo el número)",
      correctAnswers: ["3"],
      explanation: "$2p = 12 \\Rightarrow p = 6$ y $F = \\left(\\frac{p}{2}, 0\\right) = (3, 0)$.",
    },
    {
      id: "check-directriz",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "La directriz es $x = -\\frac{p}{2}$ y el foco $\\left(\\frac{p}{2}, 0\\right)$." }],
      title: "La directriz",
      question: "¿Cuál es la directriz de $y^2 = 8x$?",
      choices: [
        { id: "a", label: "$x = -2$" },
        { id: "b", label: "$x = 2$", incorrectFeedback: "$x = 2$ es la abscisa del foco; la directriz está al otro lado del vértice: $x = -2$." },
        { id: "c", label: "$x = -4$", incorrectFeedback: "$p = 4$, pero la directriz es $x = -\\frac{p}{2} = -2$." },
        { id: "d", label: "$y = -2$", incorrectFeedback: "Con eje horizontal ($y^2 = 2px$) la directriz es una recta vertical $x = c$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$p = 4$: foco $(2, 0)$ y directriz $x = -\\frac{p}{2} = -2$.",
    },
    {
      id: "check-distancia",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$P(2, 4)$ está en $y^2 = 8x$ ($16 = 16$). Distancia a la directriz $x = -2$: $2 - (-2)$." }],
      title: "Equidistancia",
      question: "El punto $P(2, 4)$ pertenece a $y^2 = 8x$. ¿A qué distancia está de la directriz $x = -2$? (solo el número)",
      correctAnswers: ["4"],
      explanation: "Distancia a la directriz: $2 - (-2) = 4$. Al foco $F(2, 0)$: $\\sqrt{0 + 16} = 4$. Coinciden, como exige la definición.",
    },
  ],
};
