import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_10_SUBTITLE } from "@/data/lessons/shared";

export const problemasVolumen2esoLesson: InteractiveLesson = {
  slug: "problemas-volumen-2eso",
  title: "5. Problemas de volumen",
  subtitle: TEMA_2ESO_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "estrategia",
      type: "slide",
      help: [
        {
          label: "Unidades",
          message: "Antes de calcular, pasa todas las medidas a la misma unidad. Un volumen en cm³ se pasa a litros dividiendo entre $1\\,000$.",
        },
        {
          label: "Volumen que sobra",
          message: "En muchos problemas el resultado es una resta de volúmenes: el del recipiente menos el de lo que ya hay dentro.",
        },
      ],
      title: "Cómo plantear un problema de volumen",
      blocks: [
        {
          kind: "steps",
          items: [
            "Identifica los **cuerpos** y dibuja un esquema con las medidas.",
            "Pasa todo a la **misma unidad**.",
            "Calcula cada **volumen** con su fórmula.",
            "**Suma o resta** según lo que pida el enunciado y expresa el resultado en la unidad pedida.",
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "botellas",
      type: "slide",
      help: [
        {
          label: "Pasa a litros",
          message: "$1$ dam³ $= 1\\,000$ m³ y $1$ m³ $= 1\\,000$ l.",
        },
      ],
      title: "Botellas de agua",
      blocks: [
        {
          kind: "text",
          text: "¿Cuántas botellas de $\\frac{3}{4}$ l se pueden llenar con $0{,}45$ dam³ de agua?",
        },
        {
          kind: "example",
          lines: [
            { math: "0{,}45\\,\\text{dam}^3 = 450\\,\\text{m}^3 = 450\\,000\\,\\text{l}" },
            { math: "450\\,000 : 0{,}75 = 600\\,000\\,\\text{botellas}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-bolas",
      type: "predict",
      calculator: true,
      help: [
        {
          label: "Volumen de la caja",
          message: "$25 \\cdot 20 \\cdot 16 = 8\\,000$ cm³.",
        },
        {
          label: "Volumen de las bolas",
          message: "Cada bola: $\\frac{4}{3} \\cdot 3{,}14 \\cdot 2{,}5^3 \\approx 65{,}4$ cm³; las $60$ ocupan $\\approx 3\\,925$ cm³.",
        },
      ],
      title: "Bolas en una caja",
      question: "En una caja ortoédrica de base $25$ cm por $20$ cm y altura $16$ cm se meten $60$ bolas de radio $2{,}5$ cm. ¿Cuántos litros de aceite caben todavía en la caja? (usa $\\pi \\approx 3{,}14$)",
      mode: "choice",
      choices: [
        { id: "4.08", label: "$4{,}08$ l" },
        { id: "8", label: "$8$ l", incorrectFeedback: "Es el volumen de toda la caja; hay que restar el de las bolas." },
        { id: "3.93", label: "$3{,}93$ l", incorrectFeedback: "Es el volumen ocupado por las bolas ($3\\,925$ cm³), no el espacio que queda." },
        { id: "4075", label: "$4\\,075$ l", incorrectFeedback: "Está en cm³: $4\\,075$ cm³ son $4{,}075$ l." },
      ],
      correctChoiceId: "4.08",
      shuffleChoices: true,
      explanation: "Caja: $8\\,000$ cm³. Bolas: $60 \\cdot 65{,}4 \\approx 3\\,925$ cm³. Quedan $\\approx 4\\,075$ cm³ $\\approx 4{,}08$ l.",
    },
    {
      id: "check-vaso",
      type: "predict",
      calculator: true,
      help: [
        {
          label: "Hueco libre",
          message: "El vaso está medio lleno: queda libre la mitad de su volumen. Compáralo con el volumen de las canicas.",
        },
        {
          label: "Una canica",
          message: "Diámetro $2$ cm → radio $1$ cm: $\\frac{4}{3} \\cdot 3{,}14 \\cdot 1^3 \\approx 4{,}19$ cm³.",
        },
      ],
      title: "Un vaso con canicas",
      question: "Un vaso de $9$ cm de diámetro y $10$ cm de altura está medio lleno de agua. Se echan $50$ canicas de $2$ cm de diámetro. ¿Se derrama el agua? (usa $\\pi \\approx 3{,}14$)",
      mode: "choice",
      choices: [
        { id: "no", label: "No: las canicas ocupan unos $209$ cm³ y caben unos $318$ cm³" },
        { id: "si", label: "Sí: las canicas ocupan más que el hueco libre", incorrectFeedback: "El hueco libre es $\\approx 318$ cm³ y las canicas ocupan $\\approx 209$ cm³: caben." },
        { id: "justo", label: "Justo llega al borde", incorrectFeedback: "Quedaría espacio libre: $318 - 209 \\approx 109$ cm³." },
        { id: "no-se", label: "No se puede saber con esos datos", incorrectFeedback: "Se pueden calcular los dos volúmenes con los datos del enunciado." },
      ],
      correctChoiceId: "no",
      shuffleChoices: true,
      explanation: "Vaso: $3{,}14 \\cdot 4{,}5^2 \\cdot 10 \\approx 636$ cm³; mitad libre: $\\approx 318$ cm³. Canicas: $50 \\cdot 4{,}19 \\approx 209$ cm³. No se derrama.",
    },
    {
      id: "check-serrin",
      type: "predict",
      calculator: true,
      help: [
        {
          label: "Tres cuartos",
          message: "Cajón de $40$ cm de arista: $V = 64\\,000$ cm³. Tres cuartos: $48\\,000$ cm³ de serrín.",
        },
        {
          label: "El balón desplaza serrín",
          message: "Al meter el balón (radio $16$ cm, $\\approx 17\\,148$ cm³), el espacio que queda para el serrín es $64\\,000 - 17\\,148$.",
        },
      ],
      title: "Un balón en un cajón",
      question: "Un cajón cúbico de $40$ cm de arista está lleno en sus tres cuartas partes de serrín. Se oculta dentro un balón de $32$ cm de diámetro. ¿Qué volumen de serrín sobra, aproximadamente? (usa $\\pi \\approx 3{,}14$)",
      mode: "choice",
      choices: [
        { id: "1148", label: "$1\\,148$ cm³" },
        { id: "17148", label: "$17\\,148$ cm³", incorrectFeedback: "Es el volumen del balón; el serrín que sobra es lo que no cabe en el espacio libre." },
        { id: "48000", label: "$48\\,000$ cm³", incorrectFeedback: "Es todo el serrín; cabe una parte, la que sobra es la diferencia." },
        { id: "46852", label: "$46\\,852$ cm³", incorrectFeedback: "Es el espacio libre para el serrín ($64\\,000 - 17\\,148$); sobra lo que excede de él: $48\\,000 - 46\\,852$." },
      ],
      correctChoiceId: "1148",
      shuffleChoices: true,
      explanation: "Espacio para serrín: $64\\,000 - 17\\,148 = 46\\,852$ cm³. Hay $48\\,000$ cm³ de serrín: sobran $48\\,000 - 46\\,852 \\approx 1\\,148$ cm³.",
    },
    {
      id: "check-densidad",
      type: "predict",
      calculator: true,
      help: [
        {
          label: "Volumen de acero",
          message: "Es la esfera exterior menos la interior: $\\frac{4}{3} \\cdot 3{,}14 \\cdot (20^3 - 19^3) \\approx 4\\,777$ cm³.",
        },
        {
          label: "Densidad",
          message: "$7\\,850$ kg/m³ $= 7{,}85$ g/cm³. Multiplica el volumen por la densidad.",
        },
      ],
      title: "Una esfera hueca de acero",
      question: "Una esfera hueca tiene $20$ cm de radio exterior y $1$ cm de grosor. La densidad del acero es $7\\,850$ kg/m³. ¿Cuál es su masa, aproximadamente?",
      mode: "choice",
      choices: [
        { id: "37.5", label: "$37{,}5$ kg" },
        { id: "263", label: "$263$ kg", incorrectFeedback: "Has calculado la masa de una esfera maciza de $20$ cm de radio: la esfera es hueca." },
        { id: "4.78", label: "$4{,}78$ kg", incorrectFeedback: "$4\\,777$ cm³ es el volumen del acero; hay que multiplicar por la densidad ($7{,}85$ g/cm³)." },
        { id: "375", label: "$375$ kg", incorrectFeedback: "Has corrido la coma: $4\\,777 \\cdot 7{,}85 \\approx 37\\,500$ g $= 37{,}5$ kg." },
      ],
      correctChoiceId: "37.5",
      shuffleChoices: true,
      explanation: "$V = \\frac{4}{3} \\cdot 3{,}14 \\cdot (20^3 - 19^3) \\approx 4\\,777$ cm³. Masa $\\approx 4\\,777 \\cdot 7{,}85 \\approx 37\\,500$ g $\\approx 37{,}5$ kg.",
    },
  ],
};
