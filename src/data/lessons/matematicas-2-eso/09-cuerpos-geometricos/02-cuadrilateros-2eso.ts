import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_9_SUBTITLE } from "@/data/lessons/shared";

/** Todo el LaTeX lleva DOBLE barra (`\\sqrt`). */
export const cuadrilateros2esoLesson: InteractiveLesson = {
  slug: "cuadrilateros-2eso",
  title: "2. Cuadriláteros",
  subtitle: TEMA_2ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "familia",
      type: "slide",
      help: [
        {
          label: "Siempre 360°",
          message: "Un cuadrilátero se puede partir en dos triángulos con una diagonal: $2 \\cdot 180^\\circ = 360^\\circ$.",
        },
        {
          label: "Un cuadrado es varias cosas",
          message: "El cuadrado es a la vez rectángulo, rombo y paralelogramo: cumple las condiciones de todos.",
        },
      ],
      title: "Familia de los cuadriláteros",
      blocks: [
        {
          kind: "text",
          text: "Un cuadrilátero tiene **4 lados**, **2 diagonales** y sus ángulos suman **$360^\\circ$**.",
        },
        {
          kind: "compare",
          left: {
            title: "Paralelogramos",
            text: "Lados opuestos **paralelos**: rectángulo (ángulos rectos), rombo (lados iguales), romboide y cuadrado (ambas cosas).",
            tone: "ok",
          },
          right: {
            title: "No paralelogramos",
            text: "**Trapecio**: solo dos lados paralelos. **Trapezoide**: ningún par de lados paralelos.",
            tone: "info",
          },
        },
      ],
      visual: { kind: "anim", scene: "cuadrilateros-familia", beatMs: 3000 },
    },
    {
      id: "explorador",
      type: "slide",
      help: [
        {
          label: "Cuatro nombres",
          message: "Según los lados y el ángulo salen romboide, rombo, rectángulo o cuadrado.",
        },
      ],
      title: "Explora los paralelogramos",
      blocks: [
        {
          kind: "text",
          text: "Cambia los lados y el ángulo y observa qué paralelogramo se forma.",
        },
      ],
      visual: { kind: "tool", tool: "paralelogramo-explorador", params: { a: 5, b: 3, c: 70 }, hint: "Haz que los lados sean iguales o que el ángulo sea recto y mira cómo cambia el nombre." },
    },
    {
      id: "trapecio",
      type: "slide",
      help: [
        {
          label: "Las bases",
          message: "Las bases son los lados paralelos y la altura es la distancia perpendicular entre ellas.",
        },
      ],
      title: "Trapecios",
      blocks: [
        {
          kind: "text",
          text: "Un **trapecio** tiene dos lados paralelos (las **bases**) y otros dos no paralelos. La **altura** es la distancia entre las bases.",
        },
        {
          kind: "compare",
          left: {
            title: "Trapecio rectángulo",
            text: "Tiene **dos ángulos rectos**.",
            tone: "ok",
          },
          right: {
            title: "Trapecio isósceles",
            text: "Los **dos lados no paralelos** son iguales.",
            tone: "info",
          },
        },
        {
          kind: "text",
          text: "Los **trapezoides** no tienen ningún par de lados paralelos y pueden ser cóncavos.",
        },
      ],
      visual: { kind: "anim", scene: "trapecio-tipos", beatMs: 3200 },
    },
    {
      id: "check-clasificar",
      type: "classify",
      help: [
        {
          label: "Lados paralelos",
          message: "Primero mira si tiene lados paralelos: si hay dos pares, es paralelogramo; si hay un solo par, trapecio.",
        },
      ],
      title: "Clasifica",
      question: "Clasifica cada cuadrilátero por sus lados paralelos.",
      groups: [
        { id: "paralelogramo", label: "Paralelogramo", tone: "emerald" },
        { id: "trapecio", label: "Trapecio", tone: "cobalt" },
        { id: "trapezoide", label: "Trapezoide", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Rectángulo", group: "paralelogramo" },
        { id: "b", text: "Rombo", group: "paralelogramo" },
        { id: "c", text: "Dos lados paralelos y dos no paralelos", group: "trapecio" },
        { id: "d", text: "Ningún par de lados paralelos", group: "trapezoide" },
        { id: "e", text: "Cuadrado", group: "paralelogramo" },
      ],
      explanation: "Paralelogramos: dos pares de lados paralelos. Trapecio: exactamente un par. Trapezoide: ninguno.",
    },
    {
      id: "check-rombo",
      type: "fill_in_blank",
      help: [
        {
          label: "Diagonales perpendiculares",
          message: "Las diagonales de un rombo se cortan en perpendicular en su punto medio: forman cuatro triángulos rectángulos con catetos $3$ y $4$.",
        },
      ],
      title: "Lado de un rombo",
      question: "Las diagonales de un rombo miden $6$ cm y $8$ cm. ¿Cuánto mide su lado, en cm? (solo el número)",
      correctAnswers: ["5"],
      explanation: "$l = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$ cm.",
    },
    {
      id: "check-angulos",
      type: "predict",
      help: [
        {
          label: "360°",
          message: "La suma de los ángulos es $360^\\circ$: resta los tres que conoces.",
        },
      ],
      title: "El cuarto ángulo",
      question: "Un cuadrilátero tiene ángulos de $80^\\circ$, $100^\\circ$ y $75^\\circ$. ¿Cuánto mide el cuarto?",
      mode: "choice",
      choices: [
        { id: "105", label: "$105^\\circ$" },
        { id: "95", label: "$95^\\circ$", incorrectFeedback: "Comprueba: $80 + 100 + 75 + 95 = 350 \\ne 360$." },
        { id: "85", label: "$85^\\circ$", incorrectFeedback: "$80 + 100 + 75 + 85 = 340$: faltan $20^\\circ$." },
        { id: "115", label: "$115^\\circ$", incorrectFeedback: "$80 + 100 + 75 + 115 = 370$: se pasa." },
      ],
      correctChoiceId: "105",
      shuffleChoices: true,
      explanation: "$360 - (80 + 100 + 75) = 360 - 255 = 105^\\circ$.",
    },
  ],
};
