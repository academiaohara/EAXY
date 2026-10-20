import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_10_SUBTITLE } from "@/data/lessons/shared";

/** Todo el LaTeX lleva DOBLE barra (`\\sqrt`). */
export const volumenPrismasCilindros2esoLesson: InteractiveLesson = {
  slug: "volumen-prismas-cilindros-2eso",
  title: "2. Volumen del prisma y del cilindro",
  subtitle: TEMA_2ESO_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "formula",
      type: "slide",
      help: [
        {
          label: "Capas iguales",
          message: "Cortando un prisma o un cilindro por planos paralelos a la base, todas las secciones son iguales a la base. El volumen es como apilar capas iguales.",
        },
        {
          label: "También los oblicuos",
          message: "La altura es la distancia entre las bases, no la longitud de la arista lateral. Por eso un prisma oblicuo tiene el mismo volumen que uno recto con la misma base y altura.",
        },
      ],
      title: "Volumen de una figura prismática",
      blocks: [
        {
          kind: "rule",
          title: "Prismas y cilindros",
          text: "El volumen es el **área de la base por la altura**.",
          formula: "V = A_{base} \\cdot h",
        },
        {
          kind: "compare",
          left: {
            title: "Prisma",
            text: "La base depende del polígono.",
            math: ["V = A_{base} \\cdot h"],
            tone: "ok",
          },
          right: {
            title: "Cilindro",
            text: "La base es un círculo.",
            math: ["V = \\pi r^2 \\cdot h"],
            tone: "info",
          },
        },
      ],
      arrange: "stack",
    },
    {
      id: "hexagonal",
      type: "slide",
      help: [
        {
          label: "Apotema",
          message: "En un hexágono regular el radio es igual al lado. La mitad del lado, la apotema y el radio forman un triángulo rectángulo: $a = \\sqrt{30^2 - 15^2} \\approx 26$.",
        },
        {
          label: "Todo en cm",
          message: "La altura es $1$ m $= 100$ cm: trabaja en cm para que el volumen salga en cm³ y después pasa a litros ($1\\,000$ cm³ $= 1$ l).",
        },
      ],
      title: "Un prisma hexagonal y un cilindro",
      blocks: [
        {
          kind: "example",
          title: "Prisma hexagonal regular: lado 30 cm, altura 1 m",
          lines: [
            { math: "a = \\sqrt{30^2 - 15^2} \\approx 26\\,\\text{cm}" },
            { math: "A_{base} = \\dfrac{(30 \\cdot 6) \\cdot 26}{2} = 2\\,340\\,\\text{cm}^2" },
            { math: "V = 2\\,340 \\cdot 100 = 234\\,000\\,\\text{cm}^3 = 234\\,\\text{l}" },
          ],
        },
        {
          kind: "example",
          title: "Cilindro: radio 30 cm, altura 1 m",
          lines: [
            { math: "V = 3{,}14 \\cdot 30^2 \\cdot 100 = 282\\,600\\,\\text{cm}^3 = 282{,}6\\,\\text{l}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-ortoedro",
      type: "fill_in_blank",
      help: [
        {
          label: "Base por altura",
          message: "La base es $9 \\cdot 15 = 135$ dm² y la altura $8$ dm.",
        },
      ],
      title: "Un ortoedro",
      question: "Calcula el volumen de un ortoedro de $9$ dm $\\times$ $15$ dm $\\times$ $8$ dm, en dm³. (solo el número)",
      correctAnswers: ["1080"],
      explanation: "$V = 9 \\cdot 15 \\cdot 8 = 1\\,080$ dm³.",
    },
    {
      id: "check-triangular",
      type: "fill_in_blank",
      help: [
        {
          label: "Base triangular",
          message: "La base es un triángulo rectángulo: $A = \\frac{12 \\cdot 15}{2} = 90$ cm². La altura del prisma son $2$ dm $= 20$ cm.",
        },
      ],
      title: "Prisma de base triangular",
      question: "La base de un prisma recto es un triángulo rectángulo de catetos $12$ cm y $15$ cm, y su altura es $2$ dm. ¿Cuál es su volumen en cm³? (solo el número)",
      correctAnswers: ["1800"],
      explanation: "$A_{base} = \\frac{12 \\cdot 15}{2} = 90$ cm². $V = 90 \\cdot 20 = 1\\,800$ cm³.",
    },
    {
      id: "check-rombo",
      type: "predict",
      help: [
        {
          label: "Mismas unidades",
          message: "Pasa la altura a dm: $1{,}2$ m $= 12$ dm. Así el volumen sale en dm³.",
        },
        {
          label: "Área del rombo",
          message: "$A = \\frac{D \\cdot d}{2} = \\frac{40 \\cdot 28}{2}$.",
        },
      ],
      title: "Base en forma de rombo",
      question: "Un prisma tiene por base un rombo de diagonales $40$ dm y $28$ dm, y una altura de $1{,}2$ m. ¿Cuál es su volumen?",
      mode: "choice",
      choices: [
        { id: "6.72", label: "$6{,}72$ m³" },
        { id: "672", label: "$672$ m³", incorrectFeedback: "Has mezclado unidades: $6\\,720$ dm³ son $6{,}72$ m³ (no $672$)." },
        { id: "67.2", label: "$67{,}2$ m³", incorrectFeedback: "Comprueba el cambio de unidades: $1\\ \\text{m}^3 = 1\\,000\\ \\text{dm}^3$." },
        { id: "13.44", label: "$13{,}44$ m³", incorrectFeedback: "Has olvidado dividir entre $2$ en el área del rombo." },
      ],
      correctChoiceId: "6.72",
      shuffleChoices: true,
      explanation: "$A_{base} = \\frac{40 \\cdot 28}{2} = 560$ dm². $V = 560 \\cdot 12 = 6\\,720$ dm³ $= 6{,}72$ m³.",
    },
    {
      id: "check-cilindro",
      type: "predict",
      calculator: true,
      help: [
        {
          label: "Fórmula",
          message: "$V = \\pi r^2 h = 3{,}14 \\cdot 10^2 \\cdot 20$.",
        },
      ],
      title: "Un cilindro",
      question: "Halla el volumen de un cilindro de $10$ cm de radio y $20$ cm de altura (usa $\\pi \\approx 3{,}14$).",
      mode: "choice",
      choices: [
        { id: "6280", label: "$6\\,280$ cm³" },
        { id: "628", label: "$628$ cm³", incorrectFeedback: "Has multiplicado por $2r$ en vez de por $r^2$: el radio va al cuadrado." },
        { id: "1256", label: "$1\\,256$ cm³", incorrectFeedback: "Has hecho $2\\pi r h$ (el área lateral), no el volumen." },
        { id: "12560", label: "$12\\,560$ cm³", incorrectFeedback: "Has usado el diámetro como radio: el radio son $10$ cm." },
      ],
      correctChoiceId: "6280",
      shuffleChoices: true,
      explanation: "$V = 3{,}14 \\cdot 10^2 \\cdot 20 = 6\\,280$ cm³ $= 6{,}28$ l.",
    },
  ],
};
