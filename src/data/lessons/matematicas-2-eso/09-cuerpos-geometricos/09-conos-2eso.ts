import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_9_SUBTITLE } from "@/data/lessons/shared";

/** Todo el LaTeX lleva DOBLE barra (`\\sqrt`). */
export const conos2esoLesson: InteractiveLesson = {
  slug: "conos-2eso",
  title: "9. Conos",
  subtitle: TEMA_2ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "generatriz",
      type: "slide",
      help: [
        {
          label: "La hipotenusa gira",
          message: "Al girar un triángulo rectángulo, el cateto sobre el eje es la altura, el otro es el radio de la base y la hipotenusa es la generatriz.",
        },
        {
          label: "Pitágoras",
          message: "Como $g$ es la hipotenusa del triángulo rectángulo de catetos $h$ y $r$: $g^2 = h^2 + r^2$.",
        },
      ],
      title: "El cono",
      blocks: [
        {
          kind: "definition",
          text: "Al girar un **triángulo rectángulo** alrededor de uno de sus catetos se genera un **cono recto**. La **altura** $h$ va del vértice a la base y la **generatriz** $g$ es la hipotenusa.",
        },
        {
          kind: "rule",
          formula: "g^2 = h^2 + r^2",
        },
      ],
      visual: { kind: "anim", scene: "revolucion-giro", beatMs: 3500 },
    },
    {
      id: "desarrollo",
      type: "slide",
      help: [
        {
          label: "El arco es 2πr",
          message: "Al enrollar el sector, su arco forma la circunferencia de la base: mide $2\\pi r$.",
        },
        {
          label: "Área del sector",
          message: "Un sector de radio $g$ y arco $L$ tiene área $\\frac{L \\cdot g}{2}$. Con $L = 2\\pi r$: $\\pi r g$.",
        },
      ],
      title: "Desarrollo y superficie",
      blocks: [
        {
          kind: "rule",
          title: "Cono recto",
          text: "La superficie lateral es un **sector circular** de radio $g$ y arco $2\\pi r$. Se suma el **círculo** de la base.",
          formula: "A_{lat} = \\pi r g \\qquad A_{total} = \\pi r g + \\pi r^2",
        },
        {
          kind: "example",
          lines: [
            { math: "r = 6,\\ g = 10: \\quad A_{total} = 3{,}14 \\cdot 6 \\cdot 10 + 3{,}14 \\cdot 6^2 = 188{,}4 + 113{,}04 = 301{,}44" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "desarrollo-cono", params: { a: 6, b: 10 }, beatMs: 3400 },
    },
    {
      id: "con-altura",
      type: "slide",
      help: [
        {
          label: "Primero la generatriz",
          message: "Si te dan $r$ y $h$, no puedes usar la fórmula todavía: antes calcula $g$.",
        },
      ],
      title: "Cuando se conoce la altura",
      blocks: [
        {
          kind: "example",
          title: "r = 5 cm y h = 12 cm",
          lines: [
            { math: "g = \\sqrt{5^2 + 12^2} = \\sqrt{169} = 13\\,\\text{cm}" },
            { math: "A_{total} = 3{,}14 \\cdot 5 \\cdot 13 + 3{,}14 \\cdot 5^2 = 204{,}1 + 78{,}5 = 282{,}6\\,\\text{cm}^2" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-g",
      type: "fill_in_blank",
      help: [
        {
          label: "Pitágoras",
          message: "$g = \\sqrt{3^2 + 4^2}$.",
        },
      ],
      title: "Generatriz",
      question: "Un cono tiene radio $3$ cm y altura $4$ cm. ¿Cuánto mide su generatriz, en cm? (solo el número)",
      correctAnswers: ["5"],
      explanation: "$g = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$ cm.",
    },
    {
      id: "check-total",
      type: "predict",
      calculator: true,
      help: [
        {
          label: "Con g = 5",
          message: "$A_{lat} = 3{,}14 \\cdot 3 \\cdot 5 = 47{,}1$ y $A_{base} = 3{,}14 \\cdot 9 = 28{,}26$.",
        },
      ],
      title: "Área total",
      question: "Con $r = 3$ cm y $g = 5$ cm, ¿cuál es el área total del cono? (usa $\\pi \\approx 3{,}14$)",
      mode: "choice",
      choices: [
        { id: "75.36", label: "$75{,}36$ cm²" },
        { id: "47.1", label: "$47{,}1$ cm²", incorrectFeedback: "Es solo el área lateral; falta la base." },
        { id: "28.26", label: "$28{,}26$ cm²", incorrectFeedback: "Es solo la base; falta el área lateral." },
        { id: "94.2", label: "$94{,}2$ cm²", incorrectFeedback: "Has usado $2\\pi r g$ (cilindro); en el cono el área lateral es $\\pi r g$." },
      ],
      correctChoiceId: "75.36",
      shuffleChoices: true,
      explanation: "$A_{total} = 47{,}1 + 28{,}26 = 75{,}36$ cm².",
    },
  ],
};
