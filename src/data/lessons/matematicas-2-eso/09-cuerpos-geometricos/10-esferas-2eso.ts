import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_9_SUBTITLE } from "@/data/lessons/shared";

export const esferas2esoLesson: InteractiveLesson = {
  slug: "esferas-2eso",
  title: "10. Esferas",
  subtitle: TEMA_2ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "esfera",
      type: "slide",
      help: [
        {
          label: "Semicírculo que gira",
          message: "Al girar un semicírculo alrededor de su diámetro se genera una esfera.",
        },
        {
          label: "No se desarrolla",
          message: "La superficie esférica no se puede extender en el plano sin deformarla; por eso se calcula su área con una fórmula.",
        },
      ],
      title: "La esfera",
      blocks: [
        {
          kind: "definition",
          text: "La **esfera** se genera al girar un **semicírculo** alrededor de su diámetro. Queda determinada por su **radio** $R$.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "superficie",
      type: "slide",
      help: [
        {
          label: "Un resultado de Arquímedes",
          message: "Arquímedes descubrió que la superficie de una esfera coincide con la superficie lateral del cilindro que la envuelve.",
        },
        {
          label: "Compruébalo",
          message: "$2\\pi R \\cdot 2R = 4\\pi R^2$.",
        },
      ],
      title: "Superficie de la esfera",
      blocks: [
        {
          kind: "rule",
          title: "Superficie esférica",
          formula: "A = 4\\pi R^2",
        },
        {
          kind: "text",
          text: "Es el área lateral del cilindro de radio $R$ y altura $2R$ que envuelve a la esfera.",
        },
      ],
      visual: { kind: "anim", scene: "esfera-cilindro", beatMs: 3400 },
    },
    {
      id: "casquete",
      type: "slide",
      help: [
        {
          label: "La misma idea",
          message: "Una porción de esfera entre dos planos paralelos tiene el mismo área que la porción del cilindro tangente de la misma altura.",
        },
        {
          label: "La cúpula",
          message: "$R = 9$ y $h = 4$: $2\\pi \\cdot 9 \\cdot 4 = 72\\pi$.",
        },
      ],
      title: "Casquetes y zonas esféricas",
      blocks: [
        {
          kind: "rule",
          text: "El área de un **casquete esférico** o de una **zona esférica** de altura $h$ es la de la porción correspondiente del cilindro tangente.",
          formula: "A = 2\\pi R h",
        },
        {
          kind: "example",
          title: "Una cúpula de 4 m de altura en una esfera de 9 m de radio",
          lines: [{ math: "A = 2 \\cdot 3{,}14 \\cdot 9 \\cdot 4 \\approx 226\\,\\text{m}^2" }],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-esfera",
      type: "fill_in_blank",
      help: [
        {
          label: "Fórmula",
          message: "$A = 4\\pi R^2 = 4 \\cdot 3{,}14 \\cdot 5^2$.",
        },
      ],
      title: "Superficie de una esfera",
      question: "Calcula la superficie de una esfera de $5$ cm de radio, con $\\pi \\approx 3{,}14$, en cm². (solo el número)",
      correctAnswers: ["314"],
      explanation: "$4 \\cdot 3{,}14 \\cdot 25 = 314$ cm².",
    },
    {
      id: "check-polar",
      type: "predict",
      calculator: true,
      help: [
        {
          label: "Casquete polar",
          message: "$A = 2\\pi R h$ con $R = 20$ y $h = 2$.",
        },
      ],
      title: "Una esfera terrestre escolar",
      question: "En una esfera terrestre escolar de $20$ cm de radio, cada casquete polar tiene $2$ cm de altura. ¿Cuál es su superficie? (usa $\\pi \\approx 3{,}14$)",
      mode: "choice",
      choices: [
        { id: "251.2", label: "$251{,}2$ cm²" },
        { id: "125.6", label: "$125{,}6$ cm²", incorrectFeedback: "Es la mitad: falta multiplicar por el $2$ de $2\\pi R h$." },
        { id: "5024", label: "$5\\,024$ cm²", incorrectFeedback: "Es la superficie total de la esfera, no la de un casquete." },
        { id: "1256", label: "$1\\,256$ cm²", incorrectFeedback: "Es la de una zona templada ($h = 10$), no la del casquete polar ($h = 2$)." },
      ],
      correctChoiceId: "251.2",
      shuffleChoices: true,
      explanation: "$A = 2 \\cdot 3{,}14 \\cdot 20 \\cdot 2 = 251{,}2$ cm².",
    },
  ],
};
