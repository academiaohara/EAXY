import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_10_SUBTITLE } from "@/data/lessons/shared";

export const volumenEsfera3esoLesson: InteractiveLesson = {
  slug: "volumen-esfera-3eso",
  title: "8. Volumen de la esfera y de la zona esférica",
  subtitle: TEMA_3ESO_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "esfera",
      type: "slide",
      help: [
        {
          label: "Cilindro envolvente",
          message: "El cilindro que envuelve a la esfera tiene volumen $\\pi R^2 \\cdot 2R = 2\\pi R^3$; la esfera ocupa dos tercios de él.",
        },
        {
          label: "Cono, esfera, cilindro",
          message: "Con la misma base y la misma altura $2R$, cono, esfera y cilindro están en proporción $1 : 2 : 3$.",
        },
      ],
      title: "La esfera ocupa dos tercios del cilindro",
      blocks: [
        {
          kind: "rule",
          text: "El volumen de una esfera de radio $R$ es dos tercios del cilindro que la envuelve:",
          formula: "V = \\dfrac{2}{3} \\cdot 2\\pi R^3 = \\dfrac{4}{3}\\pi R^3",
        },
        {
          kind: "example",
          title: "Esfera de radio 3 cm",
          lines: [
            { math: "V = \\tfrac{4}{3} \\cdot 3{,}14 \\cdot 27 = 113{,}04\\ \\text{cm}^3" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "arquimedes-volumenes" },
    },
    {
      id: "zona",
      type: "slide",
      help: [
        {
          label: "La misma relación",
          message: "También las porciones entre planos paralelos cumplen: semiesfera $= \\frac{2}{3}$ cilindro, y cono $= \\frac{1}{3}$ cilindro.",
        },
        {
          label: "Resta",
          message: "El volumen de la zona esférica es el de la porción de cilindro menos el tronco de cono interior.",
        },
      ],
      title: "Zona esférica",
      blocks: [
        {
          kind: "rule",
          text: "El volumen de una porción de esfera entre dos planos paralelos se obtiene restando:",
          formula: "V_{\\text{zona}} = V_{\\text{porción de cilindro}} - V_{\\text{tronco de cono}}",
        },
        {
          kind: "example",
          title: "Esfera de radio 20 cm cortada por planos a 5 cm y 15 cm del centro",
          lines: [
            { math: "V_{\\text{cilindro}} = \\pi \\cdot 20^2 \\cdot 10 = 4\\,000\\pi" },
            { math: "V_{\\text{tronco}} = \\tfrac{1}{3}\\pi \\cdot 15^2 \\cdot 15 - \\tfrac{1}{3}\\pi \\cdot 5^2 \\cdot 5 \\approx 1\\,083{,}33\\pi" },
            { math: "V_{\\text{zona}} \\approx 2\\,916{,}67\\pi \\approx 9\\,158{,}34\\ \\text{cm}^3" },
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
          label: "Cubo del radio",
          message: "$6^3 = 216$. Después $\\frac{4}{3} \\cdot 3{,}14 \\cdot 216$.",
        },
      ],
      title: "Volumen de una esfera",
      question: "Calcula el volumen de una esfera de radio $6$ cm, con $\\pi \\approx 3{,}14$. (solo el número, en cm³)",
      correctAnswers: ["904,32", "904.32"],
      explanation: "$V = \\frac{4}{3} \\cdot 3{,}14 \\cdot 216 = 904{,}32$ cm³.",
    },
    {
      id: "check-cilindro",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Dos tercios",
          message: "La esfera es $\\frac{2}{3}$ del cilindro que la envuelve: $\\frac{2}{3} \\cdot 90$.",
        },
      ],
      title: "Cilindro envolvente",
      question: "El cilindro que envuelve a una esfera tiene un volumen de $90$ cm³. ¿Cuál es el volumen de la esfera? (solo el número, en cm³)",
      correctAnswers: ["60"],
      explanation: "$V_{\\text{esfera}} = \\frac{2}{3} \\cdot 90 = 60$ cm³.",
    },
    {
      id: "check-proporcion",
      type: "predict",
      help: [
        {
          label: "Misma altura",
          message: "Cono, esfera y cilindro de radio $R$ y altura $2R$: sus volúmenes son un tercio, dos tercios y el total del cilindro.",
        },
      ],
      title: "Cono, esfera y cilindro",
      question: "Un cono, una esfera y un cilindro tienen el mismo radio y la misma altura ($2R$). ¿En qué proporción están sus volúmenes?",
      mode: "choice",
      choices: [
        { id: "123", label: "$1 : 2 : 3$" },
        { id: "321", label: "$3 : 2 : 1$", incorrectFeedback: "El cono es el menor ($\\frac{1}{3}$ del cilindro) y el cilindro el mayor." },
        { id: "111", label: "$1 : 1 : 1$", incorrectFeedback: "Los tres cuerpos no ocupan el mismo volumen." },
      ],
      correctChoiceId: "123",
      shuffleChoices: true,
      explanation: "$V_{\\text{cono}} : V_{\\text{esfera}} : V_{\\text{cilindro}} = \\frac{1}{3} : \\frac{2}{3} : 1 = 1 : 2 : 3$.",
    },
  ],
};
