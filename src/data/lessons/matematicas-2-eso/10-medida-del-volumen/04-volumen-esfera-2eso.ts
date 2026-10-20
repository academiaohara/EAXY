import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_10_SUBTITLE } from "@/data/lessons/shared";

export const volumenEsfera2esoLesson: InteractiveLesson = {
  slug: "volumen-esfera-2eso",
  title: "4. Volumen de la esfera",
  subtitle: TEMA_2ESO_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "formula",
      type: "slide",
      help: [
        {
          label: "El cilindro que la envuelve",
          message: "Su radio es $R$ y su altura $2R$: $V = \\pi R^2 \\cdot 2R = 2\\pi R^3$.",
        },
        {
          label: "Dos tercios",
          message: "$\\frac{2}{3} \\cdot 2\\pi R^3 = \\frac{4}{3}\\pi R^3$.",
        },
      ],
      title: "Dos tercios del cilindro",
      blocks: [
        {
          kind: "text",
          text: "El volumen de una esfera es igual a los **dos tercios** del volumen del cilindro en el que está inscrita (radio $R$ y altura $2R$).",
        },
        {
          kind: "rule",
          title: "Volumen de la esfera",
          formula: "V = \\dfrac{4}{3}\\pi R^3",
        },
      ],
      visual: { kind: "anim", scene: "arquimedes-volumenes", beatMs: 3600 },
    },
    {
      id: "ejemplos",
      type: "slide",
      help: [
        {
          label: "Del diámetro al radio",
          message: "Si te dan el diámetro, el radio es la mitad: $12$ cm de diámetro son $R = 6$ cm.",
        },
        {
          label: "Un sector",
          message: "Una cuña esférica de $60^\\circ$ es $\\frac{60}{360} = \\frac{1}{6}$ de la esfera.",
        },
      ],
      title: "Ejemplos",
      blocks: [
        {
          kind: "example",
          title: "Esfera de 12 cm de diámetro",
          lines: [
            { math: "R = 6\\,\\text{cm}" },
            { math: "V = \\dfrac{4}{3} \\cdot 3{,}14 \\cdot 6^3 = 904{,}32\\,\\text{cm}^3" },
          ],
        },
        {
          kind: "example",
          title: "Cuña esférica de 60° en una esfera de 9 cm de radio",
          lines: [
            { math: "V = \\dfrac{1}{6} \\cdot \\dfrac{4}{3} \\cdot 3{,}14 \\cdot 9^3 \\approx 509\\,\\text{cm}^3" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-proporcion",
      type: "predict",
      help: [
        {
          label: "Mira los tres volúmenes",
          message: "Cono $\\frac{2}{3}\\pi r^3$, esfera $\\frac{4}{3}\\pi r^3$, cilindro $2\\pi r^3$: en unidades de $\\frac{2}{3}\\pi r^3$ son $1$, $2$ y $3$.",
        },
      ],
      title: "Cono, esfera y cilindro",
      question: "Un cono, una esfera y un cilindro tienen el mismo radio $r$ y altura $2r$ (el cono y el cilindro). Sus volúmenes están en proporción:",
      mode: "choice",
      choices: [
        { id: "123", label: "$1 : 2 : 3$" },
        { id: "111", label: "$1 : 1 : 1$", incorrectFeedback: "Los cuerpos tienen formas muy distintas: el cilindro ocupa mucho más que el cono." },
        { id: "234", label: "$2 : 3 : 4$", incorrectFeedback: "La esfera es $\\frac{2}{3}$ del cilindro: $2$ de cada $3$ partes." },
        { id: "132", label: "$1 : 3 : 2$", incorrectFeedback: "El orden es cono, esfera, cilindro: $1, 2, 3$." },
      ],
      correctChoiceId: "123",
      shuffleChoices: true,
      explanation: "Cono $= \\frac{2}{3}\\pi r^3$, esfera $= \\frac{4}{3}\\pi r^3$, cilindro $= 2\\pi r^3$: proporción $1 : 2 : 3$.",
    },
    {
      id: "check-esfera",
      type: "fill_in_blank",
      help: [
        {
          label: "Fórmula",
          message: "$V = \\frac{4}{3} \\cdot 3{,}14 \\cdot 3^3 = \\frac{4}{3} \\cdot 3{,}14 \\cdot 27$.",
        },
      ],
      title: "Volumen de una esfera",
      question: "Calcula el volumen de una esfera de $3$ cm de radio, con $\\pi \\approx 3{,}14$, en cm³. (escribe el número con coma)",
      correctAnswers: ["113,04", "113.04"],
      explanation: "$\\frac{4}{3} \\cdot 3{,}14 \\cdot 27 = 4 \\cdot 3{,}14 \\cdot 9 = 113{,}04$ cm³.",
    },
    {
      id: "check-balon",
      type: "predict",
      calculator: true,
      help: [
        {
          label: "Radio exterior e interior",
          message: "El grosor de $3$ mm $= 0{,}3$ cm: el radio interior es $25 - 0{,}3 = 24{,}7$ cm. La goma es la diferencia de los dos volúmenes.",
        },
      ],
      title: "Un balón de goma",
      question: "Un balón tiene $25$ cm de radio y la goma de $3$ mm de grosor. Los volúmenes de la esfera exterior y la interior son $65\\,417$ cm³ y $63\\,090$ cm³ aproximadamente. ¿Cuántos litros de goma hay?",
      mode: "choice",
      choices: [
        { id: "2.33", label: "$2{,}33$ l" },
        { id: "65.4", label: "$65{,}4$ l", incorrectFeedback: "Es el volumen de todo el balón, no solo de la goma." },
        { id: "63.1", label: "$63{,}1$ l", incorrectFeedback: "Es el volumen del hueco interior." },
        { id: "128.5", label: "$128{,}5$ l", incorrectFeedback: "Has sumado en lugar de restar los dos volúmenes." },
      ],
      correctChoiceId: "2.33",
      shuffleChoices: true,
      explanation: "$65\\,417 - 63\\,090 = 2\\,327$ cm³ $\\approx 2{,}33$ l de goma.",
    },
  ],
};
