import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_10_SUBTITLE } from "@/data/lessons/shared";

export const areaEsfera3esoLesson: InteractiveLesson = {
  slug: "area-esfera-3eso",
  title: "5. Superficie de la esfera",
  subtitle: TEMA_3ESO_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "esfera-cilindro",
      type: "slide",
      help: [
        {
          label: "Arquímedes",
          message: "Arquímedes descubrió que la superficie de la esfera coincide con la superficie lateral del cilindro que la envuelve. Pidió que esa figura se grabara en su tumba.",
        },
        {
          label: "Cilindro envolvente",
          message: "El cilindro tiene el mismo radio $R$ que la esfera y altura $2R$.",
        },
      ],
      title: "La esfera y el cilindro que la envuelve",
      blocks: [
        {
          kind: "rule",
          text: "El área de la esfera es igual al área lateral del cilindro que la envuelve ($r = R$, $h = 2R$):",
          formula: "A = 2\\pi R \\cdot 2R = 4\\pi R^2",
        },
        {
          kind: "text",
          text: "Es **cuatro veces** el área de su círculo máximo.",
        },
      ],
      visual: { kind: "anim", scene: "esfera-cilindro" },
    },
    {
      id: "casquete",
      type: "slide",
      help: [
        {
          label: "La misma relación",
          message: "También las partes de la esfera entre planos paralelos coinciden con las del cilindro: el área solo depende de la altura de la zona.",
        },
        {
          label: "Altura del casquete",
          message: "Si el plano corta a distancia $y$ del centro, la altura del casquete es $R - y$, con $y = \\sqrt{R^2 - r^2}$ si conoces el radio $r$ de la sección.",
        },
      ],
      title: "Casquete y zona esférica",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "A_{\\text{casquete}} = 2\\pi R h", label: "h: altura del casquete" },
            { tex: "A_{\\text{zona}} = 2\\pi R h'", label: "h': altura de la zona" },
          ],
        },
        {
          kind: "example",
          title: "Esfera de radio 20 cm cortada con un círculo de radio 16 cm",
          lines: [
            { math: "y = \\sqrt{20^2 - 16^2} = 12 \\Rightarrow h = 20 - 12 = 8" },
            { math: "A = 2 \\cdot 3{,}14 \\cdot 20 \\cdot 8 = 1\\,004{,}8\\ \\text{cm}^2" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-esfera",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Radio",
          message: "Con $30$ cm de diámetro, el radio es $15$ cm.",
        },
      ],
      title: "Área de una esfera",
      question: "Calcula el área de una esfera de $30$ cm de diámetro, con $\\pi \\approx 3{,}14$. (solo el número, en cm²)",
      correctAnswers: ["2826"],
      explanation: "$R = 15$ y $A = 4 \\cdot 3{,}14 \\cdot 225 = 2\\,826$ cm².",
    },
    {
      id: "check-zona",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Altura",
          message: "$A = 2\\pi R h'$ con $R = 15$ y $h' = 6$.",
        },
      ],
      title: "Zona esférica",
      question: "En una esfera de $30$ cm de diámetro, ¿cuál es el área de una zona esférica de $6$ cm de altura, con $\\pi \\approx 3{,}14$? (solo el número, en cm²)",
      correctAnswers: ["565,2", "565.2"],
      explanation: "$A = 2 \\cdot 3{,}14 \\cdot 15 \\cdot 6 = 565{,}2$ cm².",
    },
    {
      id: "check-relacion",
      type: "predict",
      help: [
        {
          label: "Compara",
          message: "El círculo máximo tiene área $\\pi R^2$ y la esfera $4\\pi R^2$.",
        },
      ],
      title: "Cuántas veces el círculo máximo",
      question: "El área de una esfera, ¿cuántas veces es el área de su círculo máximo?",
      mode: "choice",
      choices: [
        { id: "4", label: "$4$ veces" },
        { id: "2", label: "$2$ veces", incorrectFeedback: "$4\\pi R^2$ entre $\\pi R^2$ da $4$, no $2$." },
        { id: "3", label: "$3$ veces", incorrectFeedback: "$3$ aparece en el volumen ($\\frac{4}{3}$), no en el área." },
      ],
      correctChoiceId: "4",
      shuffleChoices: true,
      explanation: "$\\frac{4\\pi R^2}{\\pi R^2} = 4$.",
    },
  ],
};
