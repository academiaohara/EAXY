import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_9_SUBTITLE } from "@/data/lessons/shared";

export const aplicacionesPitagoras3esoLesson: InteractiveLesson = {
  slug: "aplicaciones-pitagoras-3eso",
  title: "2. Aplicaciones del teorema de Pitágoras",
  subtitle: TEMA_3ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "tipo-triangulo",
      type: "slide",
      help: [
        {
          label: "El lado mayor",
          message: "Siempre se compara el cuadrado del lado **mayor** con la suma de los cuadrados de los otros dos.",
        },
        {
          label: "Un caso",
          message: "Con $5, 12, 13$: $25 + 144 = 169 = 13^2$, rectángulo.",
        },
      ],
      title: "Cómo saber si un triángulo es rectángulo",
      blocks: [
        {
          kind: "text",
          text: "Si $a$ es el lado **mayor** de un triángulo de lados $a$, $b$, $c$:",
        },
        {
          kind: "relations",
          items: [
            { left: "$b^2 + c^2 = a^2$", relation: "→", right: "rectángulo", tone: "ok" },
            { left: "$b^2 + c^2 < a^2$", relation: "→", right: "obtusángulo", tone: "warn" },
            { left: "$b^2 + c^2 > a^2$", relation: "→", right: "acutángulo", tone: "info" },
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "5, 12, 13:\\ 25 + 144 = 169 \\Rightarrow \\text{rectángulo}" },
            { math: "3, 12, 13:\\ 9 + 144 < 169 \\Rightarrow \\text{obtusángulo}" },
            { math: "7, 12, 13:\\ 49 + 144 > 169 \\Rightarrow \\text{acutángulo}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "tangente",
      type: "slide",
      help: [
        {
          label: "Tangente y radio",
          message: "La tangente a una circunferencia es perpendicular al radio en el punto de contacto: por eso hay un triángulo rectángulo.",
        },
        {
          label: "Cuál es la hipotenusa",
          message: "La hipotenusa es el segmento del punto exterior al centro, $PO$.",
        },
      ],
      title: "Segmentos en una circunferencia",
      blocks: [
        {
          kind: "example",
          title: "Tangente desde un punto a 130 cm del centro (radio 80 cm)",
          lines: [
            { math: "\\text{Triángulo } PTO \\text{ rectángulo en } T,\\ \\text{hipotenusa } PO = 130" },
            { math: "PT = \\sqrt{130^2 - 80^2} = \\sqrt{10\\,500} \\approx 102{,}47\\ \\text{cm}" },
          ],
        },
        {
          kind: "example",
          title: "Cuerda a cierta distancia del centro",
          lines: [
            { math: "r = 15,\\ \\text{cuerda } AB = 18:\\ \\text{mitad de la cuerda } 9" },
            { math: "d = \\sqrt{15^2 - 9^2} = \\sqrt{144} = 12\\ \\text{cm}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "figuras",
      type: "slide",
      help: [
        {
          label: "Busca el triángulo",
          message: "En el rombo, las diagonales se cortan en perpendicular: forman cuatro triángulos rectángulos con el lado como hipotenusa.",
        },
        {
          label: "Mitades",
          message: "Los catetos son las **mitades** de las diagonales.",
        },
      ],
      title: "Triángulos rectángulos escondidos",
      blocks: [
        {
          kind: "example",
          title: "Rombo de lado 13 cm y una diagonal de 24 cm",
          lines: [
            { math: "\\text{semidiagonal conocida} = 12,\\ \\text{lado} = 13" },
            { math: "\\text{semidiagonal} = \\sqrt{13^2 - 12^2} = 5 \\Rightarrow \\text{otra diagonal} = 10\\ \\text{cm}" },
          ],
        },
        {
          kind: "example",
          title: "Altura de un trapecio isósceles de bases 37 y 55 cm y lado 14 cm",
          lines: [
            { math: "(55 - 37) : 2 = 9" },
            { math: "h = \\sqrt{14^2 - 9^2} = \\sqrt{115} \\approx 10{,}7\\ \\text{cm}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-tipo",
      type: "predict",
      help: [
        {
          label: "Compara",
          message: "$7^2 + 8^2 = 113$ y $11^2 = 121$.",
        },
      ],
      title: "Tipo de triángulo",
      question: "¿Cómo es el triángulo de lados $7$ cm, $8$ cm y $11$ cm?",
      mode: "choice",
      choices: [
        { id: "obt", label: "Obtusángulo: $49 + 64 = 113 < 121$" },
        { id: "rec", label: "Rectángulo", incorrectFeedback: "$49 + 64 = 113 \\ne 121$." },
        { id: "acu", label: "Acutángulo", incorrectFeedback: "$49 + 64 = 113 < 121$: la suma es menor, no mayor." },
      ],
      correctChoiceId: "obt",
      shuffleChoices: true,
      explanation: "Con el lado mayor $11$: $7^2 + 8^2 = 113 < 11^2 = 121$, obtusángulo.",
    },
    {
      id: "check-rombo",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Semidiagonales",
          message: "Un cateto vale $12$ (mitad de $24$), la hipotenusa $13$. El otro cateto es la mitad de la otra diagonal.",
        },
      ],
      title: "Diagonal de un rombo",
      question: "Un rombo tiene lado $13$ cm y una diagonal de $24$ cm. ¿Cuánto mide la otra diagonal? (solo el número, en cm)",
      correctAnswers: ["10"],
      explanation: "Semidiagonal $= \\sqrt{169 - 144} = 5$, así que la otra diagonal mide $10$ cm.",
    },
    {
      id: "check-distancia",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Mitad de la cuerda",
          message: "Una cuerda de $18$ cm se parte por la mitad en $9$ cm. El radio $15$ es la hipotenusa.",
        },
      ],
      title: "Cuerda y centro",
      question: "En una circunferencia de radio $15$ cm, una cuerda mide $18$ cm. ¿A qué distancia del centro está? (solo el número, en cm)",
      correctAnswers: ["12"],
      explanation: "$d = \\sqrt{15^2 - 9^2} = 12$ cm.",
    },
  ],
};
