import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_5_SUBTITLE } from "@/data/lessons/shared";

export const operacionesVectores1bachLesson: InteractiveLesson = {
  slug: "operaciones-vectores-1bach",
  title: "2. Operaciones con vectores",
  subtitle: TEMA_1BACH_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "suma",
      type: "slide",
      help: [{ label: "Dos lecturas", message: "Poner un vector a continuación de otro (regla del triángulo) y la diagonal del paralelogramo dan el mismo resultado." }],
      title: "Suma y producto por un número",
      blocks: [
        { kind: "rule", title: "Con coordenadas", formula: "\\vec{u} + \\vec{v} = (u_1 + v_1,\\ u_2 + v_2)\\qquad k\\,\\vec{u} = (k\\,u_1,\\ k\\,u_2)" },
        { kind: "example", title: "u = (1, 2), v = (3, −1)", lines: [
          { math: "\\vec{u} + \\vec{v} = (4, 1)\\qquad 2\\vec{u} - \\vec{v} = (2 - 3,\\ 4 + 1) = (-1, 5)" },
        ] },
        { kind: "text", text: "Multiplicar por $k > 0$ estira el vector sin cambiar su sentido; con $k < 0$ lo invierte; con $k = 0$ da el vector nulo." },
      ],
      visual: { kind: "anim", scene: "suma-vectores", params: { nums: [1, 2, 3, -1] } },
    },
    {
      id: "check-suma",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$3\\vec{u} = (3, 6)$ y $2\\vec{v} = (6, -2)$; después resta." }],
      title: "Combinación",
      question: "Con $\\vec{u} = (1, 2)$ y $\\vec{v} = (3, -1)$, ¿cuánto vale $3\\vec{u} - 2\\vec{v}$?",
      choices: [
        { id: "a", label: "$(-3,\\ 8)$" },
        { id: "b", label: "$(9,\\ 4)$", incorrectFeedback: "Has sumado $3\\vec{u} + 2\\vec{v}$. Hay que **restar**." },
        { id: "c", label: "$(-3,\\ 4)$", incorrectFeedback: "$6 - 2\\cdot(-1) = 8$, no $4$: cuidado con el signo de la segunda coordenada de $\\vec{v}$." },
        { id: "d", label: "$(-1,\\ 5)$", incorrectFeedback: "Esa es $2\\vec{u} - \\vec{v}$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$3\\vec{u} - 2\\vec{v} = (3, 6) - (6, -2) = (3 - 6,\\ 6 + 2) = (-3, 8)$.",
    },
    {
      id: "combinacion",
      type: "slide",
      help: [{ label: "Base", message: "Dos vectores no paralelos forman una **base** del plano: cualquier vector se escribe de forma única como combinación lineal de ellos." }],
      title: "Combinación lineal y base",
      blocks: [
        { kind: "definition", text: "Un vector $\\vec{w}$ es **combinación lineal** de $\\vec{u}$ y $\\vec{v}$ si $\\vec{w} = a\\vec{u} + b\\vec{v}$. Si $\\vec{u}$ y $\\vec{v}$ **no son paralelos**, forman una **base** y cada $\\vec{w}$ tiene unas coordenadas $(a, b)$ únicas." },
        { kind: "example", title: "w = (5, 3) en la base u = (1, 2), v = (3, −1)", lines: [
          { math: "a + 3b = 5,\\quad 2a - b = 3 \\Rightarrow a = 2,\\ b = 1" },
          { math: "\\vec{w} = 2\\vec{u} + \\vec{v}" },
        ] },
      ],
      visual: { kind: "tool", tool: "vectores-operaciones-explorador", initial: [1, 2, 3, -1, 2, 1], hint: "Con k = 2 y m = 1 sale w = (5, 3). Cambia k y m para alcanzar otros vectores." },
    },
    {
      id: "check-paralelos",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Dos vectores son paralelos si uno es múltiplo del otro: $\\vec{v} = k\\vec{u}$." }],
      title: "¿Forman base?",
      question: "¿Cuál de estos pares de vectores **no** forma una base del plano?",
      choices: [
        { id: "a", label: "$(2, 4)$ y $(-1, -2)$" },
        { id: "b", label: "$(1, 0)$ y $(0, 1)$", incorrectFeedback: "Forman la base canónica: no son paralelos." },
        { id: "c", label: "$(1, 2)$ y $(3, -1)$", incorrectFeedback: "No son paralelos: forman base." },
        { id: "d", label: "$(1, 1)$ y $(1, -1)$", incorrectFeedback: "No son paralelos: forman base." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(2, 4) = -2\\cdot(-1, -2)$: son paralelos y no generan todo el plano.",
    },
    {
      id: "check-coord",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$a + 3b = 5$ y $2a - b = 3$; despeja $b = 2a - 3$ y sustituye." }],
      title: "Coordenadas en una base",
      question: "En la base $\\vec{u} = (1, 2)$, $\\vec{v} = (3, -1)$, el vector $(5, 3)$ es $a\\vec{u} + b\\vec{v}$. ¿Cuánto vale $a$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$a + 3b = 5$ y $2a - b = 3$ dan $a = 2$, $b = 1$. Comprobación: $2(1, 2) + (3, -1) = (5, 3)$.",
    },
    {
      id: "check-resultante",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "El módulo es $\\sqrt{x^2 + y^2}$ del vector suma." }],
      title: "Módulo de una suma",
      question: "Si $\\vec{u} = (3, 0)$ y $\\vec{v} = (0, 4)$, ¿cuánto mide $\\vec{u} + \\vec{v}$? (solo el número)",
      correctAnswers: ["5"],
      explanation: "$\\vec{u} + \\vec{v} = (3, 4)$ y $|(3, 4)| = 5$. Los vectores son perpendiculares y el resultado es la hipotenusa.",
    },
  ],
};
