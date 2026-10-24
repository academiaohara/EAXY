import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_5_SUBTITLE } from "@/data/lessons/shared";

export const vectoresPlano1bachLesson: InteractiveLesson = {
  slug: "vectores-plano-1bach",
  title: "1. Puntos y vectores en el plano",
  subtitle: TEMA_1BACH_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "vector",
      type: "slide",
      help: [{ label: "Fijo y libre", message: "Un vector fijo tiene origen concreto. Los vectores con el mismo módulo, dirección y sentido son equivalentes y forman un vector libre: se representan por el mismo par de coordenadas." }],
      title: "Un vector une dos puntos",
      blocks: [
        { kind: "definition", text: "Un **vector** $\\vec{AB}$ es un segmento orientado: tiene **módulo** (longitud), **dirección** y **sentido**. Sus coordenadas son **extremo menos origen**." },
        { kind: "rule", title: "Coordenadas y módulo", formula: "\\vec{AB} = (b_1 - a_1,\\ b_2 - a_2)\\qquad |\\vec{AB}| = \\sqrt{(b_1 - a_1)^2 + (b_2 - a_2)^2}" },
        { kind: "example", title: "A(1, 2) y B(4, 6)", lines: [
          { math: "\\vec{AB} = (4 - 1,\\ 6 - 2) = (3, 4)\\qquad |\\vec{AB}| = \\sqrt{9 + 16} = 5" },
        ] },
      ],
      visual: { kind: "tool", tool: "vector-explorador", initial: [1, 2, 4, 6], hint: "Mueve A y B: las coordenadas del vector son siempre extremo − origen." },
    },
    {
      id: "check-modulo",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$\\vec{AB} = (3, 4)$ y $|\\vec{AB}| = \\sqrt{3^2 + 4^2}$." }],
      title: "Distancia entre dos puntos",
      question: "¿Cuál es la distancia entre $A(1, 2)$ y $B(4, 6)$? (solo el número)",
      correctAnswers: ["5"],
      explanation: "$|\\vec{AB}| = \\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{9 + 16} = 5$.",
    },
    {
      id: "punto-medio",
      type: "slide",
      help: [{ label: "Semisuma", message: "El punto medio tiene como coordenadas la media de las coordenadas: es la semisuma de los extremos." }],
      title: "Punto medio y simétrico",
      blocks: [
        { kind: "rule", title: "Punto medio de AB", formula: "M = \\left(\\dfrac{a_1 + b_1}{2},\\ \\dfrac{a_2 + b_2}{2}\\right)" },
        { kind: "example", lines: [
          { math: "A(1, 2),\\ B(4, 6):\\quad M = \\left(\\tfrac{5}{2},\\ 4\\right)" },
          { math: "\\text{Simétrico de } A \\text{ respecto de } M:\\ A' = 2M - A = (4, 6) = B" },
        ] },
      ],
      visual: { kind: "tool", tool: "punto-medio-explorador", initial: [1, 2, 4, 6], hint: "Fíjate en que M está a igual distancia de A y de B y en que su abscisa es la media de las abscisas." },
    },
    {
      id: "check-medio",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Abscisa del punto medio: $\\frac{1 + 4}{2}$." }],
      title: "Abscisa del punto medio",
      question: "¿Cuál es la abscisa del punto medio de $A(1, 2)$ y $B(4, 6)$? (con coma decimal)",
      correctAnswers: ["2,5", "2.5", "5/2"],
      explanation: "$\\frac{1 + 4}{2} = \\frac{5}{2} = 2{,}5$. Su ordenada es $\\frac{2 + 6}{2} = 4$.",
    },
    {
      id: "check-coord",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Extremo menos origen: $B - A$." }],
      title: "Coordenadas de un vector",
      question: "Si $A(3, -1)$ y $B(-2, 4)$, ¿cuáles son las coordenadas de $\\vec{AB}$?",
      choices: [
        { id: "a", label: "$(-5,\\ 5)$" },
        { id: "b", label: "$(5,\\ -5)$", incorrectFeedback: "Esas son las coordenadas de $\\vec{BA}$ (origen menos extremo)." },
        { id: "c", label: "$(1,\\ 3)$", incorrectFeedback: "Has sumado las coordenadas en lugar de restarlas." },
        { id: "d", label: "$(-1,\\ 3)$", incorrectFeedback: "$-2 - 3 = -5$, no $-1$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\vec{AB} = (-2 - 3,\\ 4 - (-1)) = (-5, 5)$.",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Dos vectores son equivalentes si tienen las mismas coordenadas, aunque empiecen en puntos distintos." }],
      title: "¿Mismo vector?",
      question: "El vector $\\vec{u} = (2, 1)$. Clasifica los segmentos orientados según representen o no a $\\vec{u}$.",
      groups: [
        { id: "si", label: "Representa a u", tone: "emerald" },
        { id: "no", label: "No representa a u", tone: "amber" },
      ],
      items: [
        { id: "a", text: "De $A(0, 0)$ a $B(2, 1)$", group: "si" },
        { id: "b", text: "De $C(1, 3)$ a $D(3, 4)$", group: "si" },
        { id: "c", text: "De $E(2, 1)$ a $F(0, 0)$", group: "no" },
        { id: "d", text: "De $G(0, 0)$ a $H(1, 2)$", group: "no" },
        { id: "e", text: "De $I(-1, -1)$ a $J(1, 0)$", group: "si" },
        { id: "f", text: "De $K(4, 2)$ a $L(2, 1)$", group: "no" },
      ],
      hint: "Calcula extremo menos origen en cada uno y compara con $(2, 1)$. El de $E$ a $F$ es el opuesto: $(-2, -1)$.",
    },
  ],
};
