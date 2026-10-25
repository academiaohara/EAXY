import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_5_SUBTITLE } from "@/data/lessons/shared";

export const ecuacionesRecta1bachLesson: InteractiveLesson = {
  slug: "ecuaciones-recta-1bach",
  title: "5. Ecuaciones de la recta",
  subtitle: TEMA_1BACH_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "lugar",
      type: "slide",
      help: [{ label: "Lugar geométrico", message: "Una recta es el lugar geométrico de los puntos que cumplen una ecuación lineal; una circunferencia, el de los que están a una distancia fija de un centro." }],
      title: "Una recta queda fijada por un punto y una dirección",
      blocks: [
        { kind: "definition", text: "Un **lugar geométrico** es el conjunto de puntos que cumplen una propiedad. Una **recta** queda determinada por un punto $P(p_1, p_2)$ y un **vector director** $\\vec{d} = (d_1, d_2)$ que marca su dirección." },
        { kind: "rule", title: "Ecuación vectorial y paramétricas", formula: "(x, y) = (p_1, p_2) + t\\,(d_1, d_2)\\qquad \\begin{cases} x = p_1 + t\\,d_1 \\\\ y = p_2 + t\\,d_2 \\end{cases}" },
        { kind: "text", text: "Cada valor del parámetro $t$ da un punto de la recta: $t = 0$ es $P$; $t = 1$ es $P + \\vec{d}$." },
      ],
      visual: { kind: "tool", tool: "recta-formas-explorador", initial: [1, 2, 2, 3], hint: "Mueve el punto y el vector director y observa cómo cambian todas las ecuaciones." },
    },
    {
      id: "formas",
      type: "slide",
      help: [{ label: "Vector normal", message: "En la forma general $Ax + By + C = 0$, el vector $(A, B)$ es **perpendicular** a la recta, y $(B, -A)$ es un vector director." }],
      title: "De la paramétrica a la general",
      blocks: [
        { kind: "steps", items: [
          "**Continua:** se despeja $t$ en las dos paramétricas y se igualan: $\\dfrac{x - p_1}{d_1} = \\dfrac{y - p_2}{d_2}$.",
          "**General:** se quitan denominadores: $d_2(x - p_1) - d_1(y - p_2) = 0$, es decir $Ax + By + C = 0$.",
          "**Explícita:** se despeja $y$: $y = mx + n$, con **pendiente** $m = \\dfrac{d_2}{d_1}$.",
        ] },
        { kind: "example", title: "P(1, 2), d = (2, 3)", lines: [
          { math: "\\dfrac{x - 1}{2} = \\dfrac{y - 2}{3} \\Rightarrow 3x - 2y + 1 = 0 \\Rightarrow y = \\tfrac{3}{2}x + \\tfrac{1}{2}" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-general",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Vector director $\\vec{AB} = (2, 4)$; la recta es $4(x - 1) - 2(y - 1) = 0$." }],
      title: "Recta por dos puntos",
      question: "¿Cuál es la ecuación general de la recta que pasa por $A(1, 1)$ y $B(3, 5)$?",
      choices: [
        { id: "a", label: "$2x - y - 1 = 0$" },
        { id: "b", label: "$x - 2y + 1 = 0$", incorrectFeedback: "Esa recta tiene pendiente $\\frac{1}{2}$; la de $AB$ tiene pendiente $2$." },
        { id: "c", label: "$2x + y - 3 = 0$", incorrectFeedback: "Tiene pendiente $-2$. Comprueba con $B$: $6 + 5 - 3 \\neq 0$." },
        { id: "d", label: "$x + 2y - 3 = 0$", incorrectFeedback: "Comprueba con $B(3, 5)$: $3 + 10 - 3 \\neq 0$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\vec{AB} = (2, 4)$ y $\\frac{x - 1}{2} = \\frac{y - 1}{4} \\Rightarrow 4(x - 1) = 2(y - 1) \\Rightarrow 2x - y - 1 = 0$.",
    },
    {
      id: "check-director",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Un vector director de $Ax + By + C = 0$ es $(B, -A)$ (o $(-B, A)$)." }],
      title: "Vector director de una recta general",
      question: "¿Cuál es un vector director de la recta $2x - 3y + 6 = 0$?",
      choices: [
        { id: "a", label: "$(3,\\ 2)$" },
        { id: "b", label: "$(2,\\ -3)$", incorrectFeedback: "Es el vector **normal** $(A, B)$, perpendicular a la recta." },
        { id: "c", label: "$(2,\\ 3)$", incorrectFeedback: "Ni es el normal ni el director: $(2, 3)\\cdot(2, -3) = -5$." },
        { id: "d", label: "$(-2,\\ 3)$", incorrectFeedback: "Es el opuesto del normal, perpendicular a la recta." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(B, -A) = (-3, -2)$, paralelo a $(3, 2)$. Se comprueba: $(3, 2)\\cdot(2, -3) = 0$, luego es perpendicular al normal.",
    },
    {
      id: "pendiente",
      type: "slide",
      help: [{ label: "Vertical", message: "Una recta vertical $x = c$ tiene vector director $(0, 1)$ y no tiene pendiente: no se puede escribir como $y = mx + n$." }],
      title: "La pendiente",
      blocks: [
        { kind: "rule", title: "Pendiente y ángulo", formula: "m = \\dfrac{d_2}{d_1} = \\tan\\alpha" },
        { kind: "text", text: "La pendiente es lo que **sube** la recta por cada unidad que avanza en horizontal, y es la **tangente del ángulo** que forma con el eje $X$. Dos rectas son **paralelas** si tienen la misma pendiente y **perpendiculares** si $m_1\\cdot m_2 = -1$." },
        { kind: "example", lines: [
          { math: "y - 3 = 2(x - 1) \\quad\\text{(punto-pendiente)} \\Rightarrow y = 2x + 1" },
          { math: "\\text{Perpendicular por el mismo punto: } m = -\\tfrac{1}{2} \\Rightarrow y - 3 = -\\tfrac{1}{2}(x - 1)" },
        ] },
      ],
      visual: { kind: "anim", scene: "punto-pendiente", params: { nums: [1, 3, 2, 1] } },
    },
    {
      id: "check-pendiente",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$m = \\frac{d_2}{d_1}$ con $\\vec{d} = (2, 3)$." }],
      title: "Una pendiente",
      question: "¿Cuál es la pendiente de la recta de vector director $(2, 3)$? (con coma decimal)",
      correctAnswers: ["1,5", "1.5", "3/2"],
      explanation: "$m = \\frac{3}{2} = 1{,}5$.",
    },
  ],
};
