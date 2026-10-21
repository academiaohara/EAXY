import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_9_SUBTITLE } from "@/data/lessons/shared";

export const circuloLongitudArea3esoLesson: InteractiveLesson = {
  slug: "circulo-longitud-area-3eso",
  title: "8. Longitud de la circunferencia y área del círculo",
  subtitle: TEMA_3ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "longitud",
      type: "slide",
      help: [
        {
          label: "Un poco más de tres",
          message: "Midiendo, la circunferencia siempre es algo más de tres veces su diámetro: ese factor es $\\pi \\approx 3{,}14$.",
        },
        {
          label: "Radio y diámetro",
          message: "$d = 2r$, así que $2\\pi r = \\pi d$.",
        },
      ],
      title: "Longitud de la circunferencia",
      blocks: [
        {
          kind: "rule",
          text: "La longitud de una circunferencia es $\\pi$ veces su diámetro.",
          formula: "L = \\pi d = 2\\pi r",
        },
        {
          kind: "example",
          title: "Circunferencia de radio 5 cm",
          lines: [
            { math: "L = 2\\pi \\cdot 5 \\approx 31{,}4\\ \\text{cm}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "longitud-pi" },
    },
    {
      id: "area",
      type: "slide",
      help: [
        {
          label: "Muchos triángulos",
          message: "Si partes el círculo en muchísimos triángulos finos, parece un polígono regular con perímetro $2\\pi r$ y apotema $r$.",
        },
        {
          label: "Cuadrado de r",
          message: "El resultado es $\\pi$ veces el área de un cuadrado de lado $r$.",
        },
      ],
      title: "Área del círculo",
      blocks: [
        {
          kind: "rule",
          text: "Como un polígono regular de perímetro $2\\pi r$ y apotema $r$:",
          formula: "A = \\dfrac{2\\pi r \\cdot r}{2} = \\pi r^2",
        },
        {
          kind: "example",
          title: "Círculo de radio 5 cm",
          lines: [
            { math: "A = \\pi \\cdot 5^2 \\approx 78{,}5\\ \\text{cm}^2" },
          ],
        },
      ],
      visual: { kind: "tool", tool: "circulo-explorador", params: { a: 5 }, hint: "Cambia el radio y observa la longitud y el área." },
    },
    {
      id: "check-longitud",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Radio",
          message: "$L = 2\\pi r$ con $r = 7$.",
        },
      ],
      title: "Longitud",
      question: "Calcula la longitud de una circunferencia de radio $7$ cm, con $\\pi \\approx 3{,}14$. (solo el número, en cm)",
      correctAnswers: ["43,96", "43.96"],
      explanation: "$L = 2 \\cdot 3{,}14 \\cdot 7 = 43{,}96$ cm.",
    },
    {
      id: "check-area",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Cuadrado del radio",
          message: "$r^2 = 100$.",
        },
      ],
      title: "Área",
      question: "Calcula el área de un círculo de radio $10$ cm, con $\\pi \\approx 3{,}14$. (solo el número, en cm²)",
      correctAnswers: ["314"],
      explanation: "$A = 3{,}14 \\cdot 10^2 = 314$ cm².",
    },
    {
      id: "check-diametro",
      type: "predict",
      help: [
        {
          label: "Radio y diámetro",
          message: "Si el diámetro mide $12$ cm, el radio mide $6$ cm.",
        },
      ],
      title: "Dato en diámetro",
      question: "Una rueda tiene $12$ cm de diámetro. ¿Qué fórmula da su área?",
      mode: "choice",
      choices: [
        { id: "a", label: "$A = \\pi \\cdot 6^2$" },
        { id: "b", label: "$A = \\pi \\cdot 12^2$", incorrectFeedback: "Se ha usado el diámetro como radio; el radio es la mitad: $6$." },
        { id: "c", label: "$A = 2\\pi \\cdot 6$", incorrectFeedback: "Esa es la longitud de la circunferencia, no el área." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$r = 6$ cm y $A = \\pi r^2 = \\pi \\cdot 36 \\approx 113$ cm².",
    },
  ],
};
