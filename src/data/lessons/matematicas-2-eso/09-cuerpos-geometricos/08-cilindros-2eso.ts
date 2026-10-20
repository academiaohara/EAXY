import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_9_SUBTITLE } from "@/data/lessons/shared";

export const cilindros2esoLesson: InteractiveLesson = {
  slug: "cilindros-2eso",
  title: "8. Cilindros",
  subtitle: TEMA_2ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "revolucion",
      type: "slide",
      help: [
        {
          label: "Cuerpo de revolución",
          message: "Es un cuerpo que se genera al girar una figura plana alrededor de una recta, el eje.",
        },
        {
          label: "Qué se obtiene",
          message: "Un rectángulo girando alrededor de uno de sus lados genera un cilindro recto.",
        },
      ],
      title: "El cilindro",
      blocks: [
        {
          kind: "definition",
          text: "Al girar un **rectángulo** alrededor de uno de sus lados se genera un **cilindro recto**: un **cuerpo de revolución**.",
        },
        {
          kind: "text",
          text: "Sus **bases** son círculos y la **altura** $h$ es la distancia entre ellas.",
        },
      ],
      visual: { kind: "anim", scene: "revolucion-giro", beatMs: 3500 },
    },
    {
      id: "desarrollo",
      type: "slide",
      help: [
        {
          label: "Por qué 2πr",
          message: "Al desenrollar la pared lateral, el borde de arriba es la circunferencia de la base, que mide $2\\pi r$.",
        },
        {
          label: "π",
          message: "En los cálculos se usa $\\pi \\approx 3{,}14$, y el resultado es aproximado.",
        },
      ],
      title: "Desarrollo y superficie",
      blocks: [
        {
          kind: "rule",
          title: "Cilindro recto",
          text: "La pared lateral es un **rectángulo** de base $2\\pi r$ y altura $h$. Se suman las **dos bases**.",
          formula: "A_{lat} = 2\\pi r h \\qquad A_{total} = 2\\pi r h + 2\\pi r^2",
        },
        {
          kind: "example",
          lines: [
            { math: "r = 3,\\ h = 5: \\quad A_{lat} = 2 \\cdot 3{,}14 \\cdot 3 \\cdot 5 = 94{,}2\\,\\text{dm}^2" },
            { math: "A_{total} = 94{,}2 + 2 \\cdot 3{,}14 \\cdot 3^2 = 150{,}72\\,\\text{dm}^2" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "desarrollo-cilindro", params: { a: 3, b: 5 }, beatMs: 3400 },
    },
    {
      id: "check-lateral",
      type: "fill_in_blank",
      help: [
        {
          label: "Fórmula",
          message: "$A_{lat} = 2\\pi r h = 2 \\cdot 3{,}14 \\cdot 2 \\cdot 10$.",
        },
      ],
      title: "Área lateral",
      question: "Calcula el área lateral de un cilindro de radio $2$ cm y altura $10$ cm, con $\\pi \\approx 3{,}14$, en cm². (escribe el número con coma si hace falta)",
      correctAnswers: ["125,6", "125.6"],
      explanation: "$2 \\cdot 3{,}14 \\cdot 2 \\cdot 10 = 125{,}6$ cm².",
    },
    {
      id: "check-deposito",
      type: "predict",
      calculator: true,
      help: [
        {
          label: "Depósito cerrado",
          message: "Cerrado significa que hay que contar la pared lateral y las dos bases.",
        },
        {
          label: "Cálculo",
          message: "$A_{lat} = 2\\pi \\cdot 0{,}6 \\cdot 1{,}8$ y $2A_{base} = 2\\pi \\cdot 0{,}6^2$.",
        },
      ],
      title: "Un depósito de chapa",
      question: "¿Cuánta chapa se necesita para construir un depósito cilíndrico cerrado de $0{,}6$ m de radio y $1{,}8$ m de altura? (usa $\\pi \\approx 3{,}14$)",
      mode: "choice",
      choices: [
        { id: "9.05", label: "$9{,}05$ m²" },
        { id: "6.78", label: "$6{,}78$ m²", incorrectFeedback: "Es solo la pared lateral; está cerrado: faltan las dos bases." },
        { id: "2.26", label: "$2{,}26$ m²", incorrectFeedback: "Son únicamente las dos bases; falta la pared lateral." },
        { id: "4.52", label: "$4{,}52$ m²", incorrectFeedback: "Has contado una sola base y has olvidado el lateral." },
      ],
      correctChoiceId: "9.05",
      shuffleChoices: true,
      explanation: "$A_{lat} = 2 \\cdot 3{,}14 \\cdot 0{,}6 \\cdot 1{,}8 \\approx 6{,}78$ y $2A_{base} = 2 \\cdot 3{,}14 \\cdot 0{,}36 \\approx 2{,}26$. Total: $9{,}05$ m².",
    },
    {
      id: "check-aljibe",
      type: "fill_in_blank",
      help: [
        {
          label: "Abierto por arriba",
          message: "Solo hay una base (el suelo) y la pared lateral.",
        },
      ],
      title: "Un aljibe",
      question: "Se impermeabilizan el suelo y las paredes de un aljibe cilíndrico abierto por arriba, de $4$ m de radio y $5$ m de altura. ¿Cuántos m² hay que cubrir? (usa $\\pi \\approx 3{,}14$; escribe el número con coma)",
      correctAnswers: ["175,84", "175.84"],
      explanation: "$A_{lat} = 2 \\cdot 3{,}14 \\cdot 4 \\cdot 5 = 125{,}6$ y $A_{base} = 3{,}14 \\cdot 4^2 = 50{,}24$. Total: $175{,}84$ m².",
    },
  ],
};
